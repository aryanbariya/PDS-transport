import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";

const URL = import.meta.env.VITE_API_BACK_URL;

const DriverForm = ({ onClose, onSave, editData }) => {
  const [formData, setFormData] = useState({
    driver_name: "",
    aadhar_card_no: "",
    contact: "",
    driving_license_no: "",
  });

  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (editData) {
      setFormData({
        driver_name: editData.driver_name || "",
        aadhar_card_no: editData.aadhar_card_no || "",
        contact: editData.contact || "",
        driving_license_no: editData.driving_license_no || "",
      });
    }
  }, [editData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    let updatedValue = value;

    if (name === "driver_name") {
      updatedValue = value.charAt(0).toUpperCase() + value.slice(1);
    }

    if (name === "contact") {
      updatedValue = value.replace(/\D/g, "").slice(0, 10);
    }

    setFormData({ ...formData, [name]: updatedValue });
    if (errors[name]) {
      setErrors(prevErrors => ({ ...prevErrors, [name]: "" }));
    }
  };

  const validateForm = () => {
    let newErrors = {};
  
    if (!formData.driver_name.trim()) newErrors.driver_name = "Driver Name is required";
    if (!formData.contact.trim()) newErrors.contact = "Contact is required";
    if (formData.contact && !/^\d{10}$/.test(formData.contact)) {
      newErrors.contact = "Contact must be exactly 10 digits";
    }
    if (formData.aadhar_card_no && !/^\d{12}$/.test(formData.aadhar_card_no)) {
      newErrors.aadhar_card_no = "Aadhar Number must be 12 digits";
    }
    if (formData.driving_license_no && !/^[A-Z]{2}\d{2}\d{4}\d{7}$/.test(formData.driving_license_no)) {
      newErrors.driving_license_no = "Invalid Driving License format";
    }
  
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsLoading(true);
    try {
    const method = editData ? "PUT" : "POST";
    const url = editData ? `${URL}/api/drivers/${editData.uuid}` : `${URL}/api/drivers`;

      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        Swal.fire({
          icon: "success",
          title: editData ? "Driver updated successfully!" : "Driver added successfully!",
          showConfirmButton: false,
          timer: 1500,
        }).then(() => {
          onSave();
          onClose();
        });
      } else {
        Swal.fire({ icon: "error", title: "Error", text: "Failed to submit form" });
      }
    } catch (error) {
      console.error("Error submitting data:", error);
      Swal.fire({ icon: "error", title: "Error", text: "Error submitting data" });
    } finally {
      setIsLoading(false);
    }
  };

  const renderInputField = (field, label) => {
  return (
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          {label}
          {["driver_name", "contact"].includes(field) && <span className="text-red-500 ml-1">*</span>}
                </label>
                <input
                  type="text"
                  name={field}
                  value={formData[field]}
                  onChange={handleChange}
          className={`p-2 border ${errors[field] ? 'border-red-500' : 'border-gray-300'} rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500`}
          placeholder={`Enter ${label}`}
                />
                {errors[field] && <p className="text-red-500 text-xs mt-1">{errors[field]}</p>}
              </div>
    );
  };

  if (isLoading) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 z-50">
        <div className="bg-white rounded-lg shadow-lg p-6">
          <div className="flex items-center space-x-3">
            <div className="w-6 h-6 border-t-2 border-blue-500 border-solid rounded-full animate-spin"></div>
            <span>Loading...</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 z-50">
      <div className="bg-white rounded-lg shadow-lg w-4/5 max-w-3xl p-6 max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center border-b pb-4 mb-6">
          <h2 className="text-xl font-semibold">{editData ? "Edit Driver Details" : "Add New Driver"}</h2>
          <button 
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 focus:outline-none"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-x-6">
            {/* Section: Basic Information */}
            <div className="md:col-span-1 bg-gray-50 p-4 rounded-lg">
              <h3 className="font-medium text-gray-700 mb-3 border-b pb-2">Basic Information</h3>
              {renderInputField("driver_name", "Driver Name")}
              {renderInputField("contact", "Contact Number")}
            </div>

            {/* Section: Identification */}
            <div className="md:col-span-1 bg-gray-50 p-4 rounded-lg">
              <h3 className="font-medium text-gray-700 mb-3 border-b pb-2">Identification</h3>
              {renderInputField("aadhar_card_no", "Aadhar Number")}
            </div>

            {/* Section: License Information */}
            <div className="md:col-span-1 bg-gray-50 p-4 rounded-lg">
              <h3 className="font-medium text-gray-700 mb-3 border-b pb-2">License Information</h3>
              {renderInputField("driving_license_no", "Driving License Number")}
            </div>
          </div>

          <div className="flex justify-end space-x-3 mt-6 pt-4 border-t">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              {editData ? "Update" : "Submit"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default DriverForm;
