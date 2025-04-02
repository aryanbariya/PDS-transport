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
    quota: "",
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
  const [schemes, setSchemes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchGodowns();
    fetchSchemes();
    if (editData) {
      setFormData({
        doNo: editData.do_number || "",
        baseDepot: editData.base_godown || "",
        doDate: editData.do_date || "",
        doExpiryDate: editData.quota_validity_date || "",
        scheme: editData.scheme || "",
        grain: editData.grain || "",
        quota: editData.quota || "",
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

  const fetchSchemes = async () => {
    try {
      const response = await fetch(`${URL}/api/scheme`);
      if (!response.ok) throw new Error("Failed to fetch schemes");
      const data = await response.json();
      setSchemes(data || []);
    } catch (err) {
      setError("Error fetching schemes: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSecondFormChange = (e) => {
    const { name, value } = e.target;
    setSecondFormData({ ...secondFormData, [name]: value });
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const url = editData 
        ? `${URL}/api/do/${editData.stock_id}`
        : `${URL}/api/do`;
      
      const method = editData ? "PUT" : "POST";

      const requestData = {
        do_number: formData.doNo,
        base_godown: formData.baseDepot,
        do_date: formData.doDate,
        quota_validity_date: formData.doExpiryDate,
        scheme: formData.scheme,
        grain: formData.grain,
        quota: formData.quota,
        quantity: formData.quantity,
      };

      console.log('Sending request to:', url);
      console.log('Request data:', requestData);

      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestData),
      });

      const responseData = await response.json();

      if (!response.ok) {
        throw new Error(responseData.error || "Failed to save data");
      }

    Swal.fire({
      icon: "success",
        title: "Success!",
        text: "Data saved successfully!",
      showConfirmButton: false,
      timer: 1500,
    });

      onSave();
      setShowSecondForm(true);
    } catch (err) {
      console.error("Error saving data:", err);
      Swal.fire({
        icon: "error",
        title: "Error!",
        text: err.message || "Failed to save data",
      });
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <form onSubmit={handleSubmit} className="space-y-4">
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
              required
                  />
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
                  <input
                    type="text"
                    id="grain"
                    name="grain"
                    value={formData.grain}
                    onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Enter Grain"
              required
                  />
                </div>

                {/* Quota */}
                <div>
            <label htmlFor="quota" className="block text-sm font-medium text-gray-700 mb-1">
                    Quota
                  </label>
                  <input
                    type="text"
                    id="quota"
                    name="quota"
                    value={formData.quota}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Enter Quota"
              required
                  />
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
              required
                  />
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

      {/* Second Form */}
      {showSecondForm && (
        <div className="mt-8 border-t pt-6">
          <h3 className="text-lg font-semibold mb-4">Additional Details</h3>
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
                {godowns.map((godown) => (
                  <option key={godown.uuid} value={godown.godownName}>
                    {godown.godownName}
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
                required
                  />
                </div>
          </div>

          <div className="mt-4">
                <button
                  type="button"
                  onClick={handleAddEntry}
              className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
                >
              Add Entry
                </button>
              </div>

          {/* Display Added Entries */}
          {secondFormEntries.length > 0 && (
            <div className="mt-4">
              <h4 className="text-md font-semibold mb-2">Added Entries</h4>
              <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Godown</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Vahtuk</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Quantity</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                    {secondFormEntries.map((entry, index) => (
                        <tr key={index}>
                        <td className="px-6 py-4 whitespace-nowrap">{entry.godown}</td>
                        <td className="px-6 py-4 whitespace-nowrap">{entry.vahtuk}</td>
                        <td className="px-6 py-4 whitespace-nowrap">{entry.quantity}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default DOGenerateForm;