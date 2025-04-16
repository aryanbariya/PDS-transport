import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";

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

  const [secondForm, setSecondForm] = useState({
    current: {
      godown: "",
      vahtuk: "",
      quantity: ""
    },
    entries: [],
  });
  

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
        doDate: editData.do_date ? new Date(editData.do_date).toISOString().split('T')[0] : "",
        doExpiryDate: editData.cota ? new Date(editData.cota).toISOString().split('T')[0] : "",
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
    if (name === "quantity") {
      if (value === "" || /^\d+$/.test(value)) {
        setSecondForm((prev) => ({
          ...prev,
          current: {
            ...prev.current,
            [name]: value,
          },
        }));
      }
    } else {
      setSecondForm((prev) => ({
        ...prev,
        current: {
          ...prev.current,
          [name]: value,
        },
      }));
    }
  };
  
  const handleAddEntry = () => {
    const { godown, vahtuk, quantity } = secondForm.current;
    if (!godown || !vahtuk || !quantity) {
      Swal.fire({
        icon: "error",
        title: "Error!",
        text: "Please fill all fields",
      });
      return;
    }
  
    setSecondForm((prev) => ({
      current: { godown: "", vahtuk: "", quantity: "" },
      entries: [...prev.entries, { godown, vahtuk, quantity }],
    }));
  };
  
  const handleFirstFormSubmit = async (e) => {
    e.preventDefault();
    setShowSecondForm(true);
  };


  const handleRemoveEntry = (index) => {
    setSecondForm((prev) => {
      const updatedEntries = [...prev.entries];
      updatedEntries.splice(index, 1);
      return { ...prev, entries: updatedEntries };
    });
  };
  

  const handleFinalSubmit = async () => {
    try {
      const url = editData 
        ? `${URL}/api/do/${editData.stock_id}`
        : `${URL}/api/do`;
      
      const method = editData ? "PUT" : "POST";

      const requestData = {
        doNo: formData.doNo,
        baseDepot: formData.baseDepot,
        doDate: formData.doDate,
        doExpiryDate: formData.doExpiryDate,
        scheme: formData.scheme,
        grain: formData.grain,
        quantity: formData.quantity,
        quintal: formData.quantity,
        total_amount: 0,
        expire_date: formData.doExpiryDate,
        entries: secondForm.entries
      };

      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to save data");
      }

      Swal.fire({
        icon: "success",
        title: "Success!",
        text: editData ? "Data updated successfully!" : "Data saved successfully!",
        showConfirmButton: false,
        timer: 1500,
      });

      onSave();
      onClose();
    } catch (err) {
      console.error("Error saving data:", err);
      Swal.fire({
        icon: "error",
        title: "Error!",
        text: err.message || "Failed to save data",
      });
    }
  };
  console.log("second",secondForm);
  
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
                  <option key={godown.mswc_id} value={godown.mswc_id}>
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
                  <option key={scheme.scheme_id} value={scheme.scheme_id}>
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
                  <option key={grain.grain_id} value={grain.grain_id}>
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
                value={secondForm.current.godown}
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
                value={secondForm.current.vahtuk}
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
                value={secondForm.current.quantity}
                onChange={handleSecondFormChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter Quantity"
                pattern="[0-9]*"
                inputMode="numeric"
                required
              />
              {secondForm.quantity && !/^\d+$/.test(secondForm.current.quantity) && (
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
          {secondForm.entries.length > 0 && (
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
                  {secondForm.entries.map((entry,index) => (
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



