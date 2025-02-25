import React, { useState, useEffect } from "react";
const URL = import.meta.env.VITE_API_BACK_URL;

const DriverForm = ({ onClose, onSave, editData }) => {
  const [formData, setFormData] = useState({
    driver_name: "",
    aadhar_card_no: "",
    contact: "",
    driving_license_no: "",
  });

  useEffect(() => {
    if (editData) {
      setFormData({
        driver_name: editData.driver_name || "",
        aadhar_no: editData.aadhar_card_no || "",
        contact: editData.contact || "",
        license_no: editData.driving_license_no || "",
      });
    }
  }, [editData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const method = editData ? "PUT" : "POST";
    const url = editData
      ? `${URL}/api/drivers/${editData.uuid}`
      : `${URL}/api/drivers`;

    try {
      const response = await fetch (url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        alert(editData ? "Driver updated successfully!" : "Driver added successfully!");
        onSave();
        onClose();
      } else {
        alert("Error submitting form");
      }
    } catch (error) {
      console.error("Error submitting data:", error);
      alert("Error submitting form");
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 z-50">
      <div className="bg-white rounded-lg shadow-lg w-4/5 max-w-2xl p-6">
        <h2 className="bg-blue-600 text-white text-xl font-semibold py-3 px-4 rounded-t-lg text-center">
          {editData ? "Edit Driver" : "Add Driver"}
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            {["driver_name", "aadhar_card_no", "contact", "driving_license_no"].map((field) => (
              <div key={field}>
                <label className="block text-sm font-medium text-gray-700">
                  {field.replace("_", " ").toUpperCase()}
                </label>
                <input
                  type="text"
                  name={field}
                  value={formData[field]}
                  onChange={handleChange}
                  className="p-2 border rounded-lg w-full"
                />
              </div>
            ))}
          </div>
          <div className="flex justify-between">
            <button type="submit" className="bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700">
              {editData ? "Update" : "Submit"}
            </button>
            <button type="button" className="bg-red-600 text-white py-2 px-4 rounded-lg hover:bg-red-700" onClick={onClose}>
              Close
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default DriverForm;
