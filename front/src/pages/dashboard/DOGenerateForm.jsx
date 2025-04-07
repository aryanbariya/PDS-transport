import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";
// import { toast } from "react-hot-toast";

const URL = import.meta.env.VITE_API_BACK_URL;

const DOGenerateForm = ({ onClose, onSave, editData }) => {
  const [formData, setFormData] = useState({
    doNo: "",
    baseDepot: "",
    doDate: "",
    doExpiryDate: "",
    scheme: "",
    grain: "",
    quantity: "",
  });

  const [secondFormData, setSecondFormData] = useState({
    godown: "",
    vahtuk: "",
    quantity: "",
  });

  const [secondFormEntries, setSecondFormEntries] = useState([]);
  const [showSecondForm, setShowSecondForm] = useState(false);
  const [godowns, setGodowns] = useState([]);
  const [subgodowns, setsubGodowns] = useState([]);
  const [schemes, setSchemes] = useState([]);
  const [grains, setGrains] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchGodowns();
    fetchSchemes();
    fetchGrains();
    fetchsubGodowns();
    if (editData) {
      setFormData({
        doNo: editData.do_no || "",
        baseDepot: editData.godown_id || "",
        doDate: editData.do_date || "",
        doExpiryDate: editData.cota || "",
        scheme: editData.scheme_id || "",
        grain: editData.grain_id || "",
        quantity: editData.quantity || "",
      });
    }
  }, [editData]);

  const fetchGodowns = async () => {
    try {
      const response = await fetch(`${URL}/api/mswcgodown`);
      if (!response.ok) throw new Error("Failed to fetch godowns");
      const data = await response.json();
      setGodowns(data || []);
    } catch (err) {
      setError("Error fetching godowns: " + err.message);
    }
  };
  const fetchsubGodowns = async () => {
    try {
      const response = await fetch(`${URL}/api/subgodown`);
      if (!response.ok) throw new Error("Failed to fetch godowns");
      const data = await response.json();
      setsubGodowns(data || []);
    } catch (err) {
      setError("Error fetching godowns: " + err.message);
    }
  };

  const fetchSchemes = async () => {
    try {
      const response = await fetch(`${URL}/api/scheme`);
      if (!response.ok) throw new Error("Failed to fetch schemes");
      const data = await response.json();
      setSchemes(data || []);
    } catch (err) {
      setError("Error fetching schemes: " + err.message);
    }
  };

  const fetchGrains = async () => {
    try {
      const response = await fetch(`${URL}/api/grains`);
      if (!response.ok) throw new Error("Failed to fetch grains");
      const data = await response.json();
      setGrains(data || []);
    } catch (err) {
      setError("Error fetching grains: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    
    // Validation for numeric fields
    if (name === 'doNo' || name === 'quantity') {
      // Only allow numbers and empty string
      if (value === '' || /^\d+$/.test(value)) {
        setFormData({ ...formData, [name]: value });
      }
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSecondFormChange = (e) => {
    const { name, value } = e.target;
    if (name === 'quantity') {
      // Only allow numbers and empty string
      if (value === '' || /^\d+$/.test(value)) {
        setSecondFormData({ ...secondFormData, [name]: value });
      }
    } else {
      setSecondFormData({ ...secondFormData, [name]: value });
    }
  };

  const handleAddEntry = () => {
    if (!secondFormData.godown || !secondFormData.vahtuk || !secondFormData.quantity) {
      Swal.fire({
        icon: "error",
        title: "Error!",
        text: "Please fill all fields",
      });
      return;
    }

    setSecondFormEntries([...secondFormEntries, { ...secondFormData }]);
    setSecondFormData({
      godown: "",
      vahtuk: "",
      quantity: "",
    });
  };

  const handleRemoveEntry = (index) => {
    const newEntries = [...secondFormEntries];
    newEntries.splice(index, 1);
    setSecondFormEntries(newEntries);
  };

  const handleFirstFormSubmit = async (e) => {
    e.preventDefault();
    
    // If editing, directly submit the update
    if (editData) {
      try {
        const response = await fetch(`${URL}/api/do/${editData.stock_id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            doNo: formData.doNo,
            baseDepot: formData.baseDepot,
            doDate: formData.doDate,
            doExpiryDate: formData.doExpiryDate,
            scheme: formData.scheme,
            grain: formData.grain,
            quantity: formData.quantity,
            quintal: formData.quintal,
            total_amount: formData.total_amount,
            expire_date: formData.expire_date
          }),
        });

        if (!response.ok) {
          throw new Error('Failed to update DO');
        }

        const data = await response.json();
        toast.success('DO updated successfully!');
        onClose();
        onSave();
      } catch (error) {
        console.error('Error updating DO:', error);
        toast.error('Failed to update DO. Please try again.');
      }
      return;
    }

    // For new DO, show the second form
    setShowSecondForm(true);
  };

  const handleFinalSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${URL}/api/do`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          doNo: formData.doNo,
          baseDepot: formData.baseDepot,
          doDate: formData.doDate,
          doExpiryDate: formData.doExpiryDate,
          scheme: formData.scheme,
          grain: formData.grain,
          quantity: formData.quantity,
          quintal: formData.quintal,
          total_amount: formData.total_amount,
          expire_date: formData.expire_date
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to create DO');
      }

      const data = await response.json();
      toast.success('DO created successfully!');
      onClose();
      onSave();
    } catch (error) {
      console.error('Error creating DO:', error);
      toast.error('Failed to create DO. Please try again.');
    }
  };
  
  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      {!showSecondForm ? (
        <form onSubmit={handleFirstFormSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* D.O No */}
            <div>
              <label htmlFor="doNo" className="block text-sm font-medium text-gray-700 mb-1">
                D.O No
              </label>
              <input
                type="text"
                id="doNo"
                name="doNo"
                value={formData.doNo}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter D.O Number"
                pattern="[0-9]*"
                inputMode="numeric"
                required
              />
              {formData.doNo && !/^\d+$/.test(formData.doNo) && (
                <p className="mt-1 text-sm text-red-600">Please enter only numbers</p>
              )}
            </div>

            {/* Base Depot */}
            <div>
              <label htmlFor="baseDepot" className="block text-sm font-medium text-gray-700 mb-1">
                Base Depot
              </label>
              <select
                id="baseDepot"
                name="baseDepot"
                value={formData.baseDepot}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                required
              >
                <option value="">Select Base Depot</option>
                {godowns.map((godown) => (
                  <option key={godown.uuid} value={godown.godownName}>
                    {godown.godownName}
                  </option>
                ))}
              </select>
            </div>

            {/* D.O Date */}
            <div>
              <label htmlFor="doDate" className="block text-sm font-medium text-gray-700 mb-1">
                D.O Date
              </label>
              <input
                type="date"
                id="doDate"
                name="doDate"
                value={formData.doDate}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>

            {/* Quota Validity Date */}
            <div>
              <label htmlFor="doExpiryDate" className="block text-sm font-medium text-gray-700 mb-1">
                Quota Validity Date
              </label>
              <input
                type="date"
                id="doExpiryDate"
                name="doExpiryDate"
                value={formData.doExpiryDate}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>

            {/* Scheme */}
            <div>
              <label htmlFor="scheme" className="block text-sm font-medium text-gray-700 mb-1">
                Scheme
              </label>
              <select
                id="scheme"
                name="scheme"
                value={formData.scheme}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                required
              >
                <option value="">Select Scheme</option>
                {schemes.map((scheme) => (
                  <option key={scheme.uuid} value={scheme.scheme_name}>
                    {scheme.scheme_name}
                  </option>
                ))}
              </select>
            </div>

            {/* Grain */}
            <div>
              <label htmlFor="grain" className="block text-sm font-medium text-gray-700 mb-1">
                Grain
              </label>
              <select
                id="grain"
                name="grain"
                value={formData.grain}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                required
              >
                <option value="">Select Grain</option>
                {grains.map((grain) => (
                  <option key={grain.uuid} value={grain.order_number}>
                    {grain.grainName}
                  </option>
                ))}
              </select>
            </div>

            {/* Quantity */}
            <div>
              <label htmlFor="quantity" className="block text-sm font-medium text-gray-700 mb-1">
                Quantity
              </label>
              <input
                type="text"
                id="quantity"
                name="quantity"
                value={formData.quantity}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter Quantity"
                pattern="[0-9]*"
                inputMode="numeric"
                required
              />
              {formData.quantity && !/^\d+$/.test(formData.quantity) && (
                <p className="mt-1 text-sm text-red-600">Please enter only numbers</p>
              )}
            </div>
          </div>

          {/* Form Actions */}
          <div className="flex justify-end space-x-3 mt-6 pt-4 border-t">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-gray-500"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              Save & Next
            </button>
          </div>
        </form>
      ) : (
        <div className="space-y-6">
          {/* Display DO Number and Quantity from first form */}
          <div className="bg-gray-50 p-4 rounded-md">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">DO Number</label>
                <p className="mt-1 text-lg font-semibold">{formData.doNo}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Quantity</label>
                <p className="mt-1 text-lg font-semibold">{formData.quantity}</p>
              </div>
            </div>
          </div>

          {/* Second Form */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label htmlFor="godown" className="block text-sm font-medium text-gray-700 mb-1">
                Godown
              </label>
              <select
                id="godown"
                name="godown"
                value={secondFormData.godown}
                onChange={handleSecondFormChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                required
              >
                <option value="">Select Godown</option>
                {subgodowns.map((godown) => (
                  <option key={godown.uuid} value={godown.subGodown}>
                    {godown.subGodown}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label htmlFor="vahtuk" className="block text-sm font-medium text-gray-700 mb-1">
                Vahtuk
              </label>
              <select
                id="vahtuk"
                name="vahtuk"
                value={secondFormData.vahtuk}
                onChange={handleSecondFormChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                required
              >
                <option value="">Select Vahtuk</option>
                <option value="Thet">Thet</option>
                <option value="Godown">Godown</option>
              </select>
            </div>

            <div>
              <label htmlFor="quantity" className="block text-sm font-medium text-gray-700 mb-1">
                Quantity
              </label>
              <input
                type="text"
                id="quantity"
                name="quantity"
                value={secondFormData.quantity}
                onChange={handleSecondFormChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter Quantity"
                pattern="[0-9]*"
                inputMode="numeric"
                required
              />
              {secondFormData.quantity && !/^\d+$/.test(secondFormData.quantity) && (
                <p className="mt-1 text-sm text-red-600">Please enter only numbers</p>
              )}
            </div>
          </div>

          <div className="flex justify-end">
            <button
              type="button"
              onClick={handleAddEntry}
              className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
            >
              Add Entry
            </button>
          </div>

          {/* Table for entries */}
          {secondFormEntries.length > 0 && (
            <div className="mt-4">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Sr. No.</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Godown</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Vahtuk</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Quantity</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {secondFormEntries.map((entry, index) => (
                    <tr key={index}>
                      <td className="px-6 py-4 whitespace-nowrap">{index + 1}</td>
                      <td className="px-6 py-4 whitespace-nowrap">{entry.godown}</td>
                      <td className="px-6 py-4 whitespace-nowrap">{entry.vahtuk}</td>
                      <td className="px-6 py-4 whitespace-nowrap">{entry.quantity}</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <button
                          onClick={() => handleRemoveEntry(index)}
                          className="text-red-600 hover:text-red-900"
                        >
                          Remove
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {/* Final Submit Button */}
          <div className="flex justify-end space-x-3 mt-6 pt-4 border-t">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-gray-500"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleFinalSubmit}
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              Submit
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default DOGenerateForm;