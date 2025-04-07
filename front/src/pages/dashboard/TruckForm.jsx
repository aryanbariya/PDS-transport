import React, { useState, useEffect } from "react";
import Swal from "sweetalert2"; // Import SweetAlert2

const URL = import.meta.env.VITE_API_BACK_URL;

const TruckForm = ({ onClose, onSave, editData }) => {
  const [formData, setFormData] = useState({
    order_number: '',
    truck_name: "",
    empty_weight: "",
    company: "",
    gvw: "",
    reg_date: "",
    truck_owner_name: "",
    owner_id: "",
    tax_validity_date: "",
    insurance_validity_date: "",
    fitness_validity_date: "",
    permit_validity_date: "",
    direct_sale: "",
  });

  const [errors, setErrors] = useState({});
  const [owners, setOwners] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchOwners = async () => {
      try {
        const response = await fetch(`${URL}/api/owners`);
        if (!response.ok) throw new Error("Failed to fetch owners");
        const data = await response.json();
        setOwners(data || []);
      } catch (error) {
        console.error("Error fetching owners:", error);
        setOwners([]);
      }
    };

    fetchOwners();
  }, []);

  useEffect(() => {
    if (editData) {
      setFormData({
        truck_name: editData.truck_name || "",
        empty_weight: editData.empty_weight || "",
        company: editData.company || "",
        gvw: editData.gvw || "",
        reg_date: editData.reg_date ? new Date(editData.reg_date).toISOString().split('T')[0] : "",
        truck_owner_name: editData.truck_owner_name || "",
        owner_id: editData.owner_id || "",
        tax_validity_date: editData.tax_validity ? new Date(editData.tax_validity).toISOString().split('T')[0] : "",
        insurance_validity_date: editData.insurance_validity ? new Date(editData.insurance_validity).toISOString().split('T')[0] : "",
        fitness_validity_date: editData.fitness_validity ? new Date(editData.fitness_validity).toISOString().split('T')[0] : "",
        permit_validity_date: editData.permit_validity ? new Date(editData.permit_validity).toISOString().split('T')[0] : "",
        direct_sale: editData.direct_sale || "",
      });
    }
  }, [editData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    let updatedValue = value;

    if (name === "truck_name") {
      updatedValue = value.toUpperCase();
    }

    if (name === "truck_owner_name") {
      const selectedOwner = owners.find(owner => owner.ownerName === value);
      if (selectedOwner) {
        setFormData(prev => ({
          ...prev,
          truck_owner_name: value,
          owner_id: selectedOwner._id
        }));
        return;
      }
    }

    setFormData({ ...formData, [name]: updatedValue });
    if (errors[name]) {
      setErrors(prevErrors => ({ ...prevErrors, [name]: "" }));
    }
  };

  const validateForm = () => {
    let newErrors = {};

    ["truck_name", "empty_weight", "company", "gvw", "reg_date", "truck_owner_name", "owner_id"].forEach((field) => {
      if (!String(formData[field] || "").trim()) {
        newErrors[field] = `${field.replace("_", " ").toUpperCase()} is required`;
      }
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsLoading(true);
    try {
      const method = editData ? "PUT" : "POST";
      const url = editData ? `${URL}/api/truck/${editData.uuid}` : `${URL}/api/truck`;

      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        Swal.fire({
          icon: "success",
          title: editData ? "Truck updated successfully!" : "Truck added successfully!",
          showConfirmButton: false,
          timer: 1500,
        }).then(() => {
          onSave();
          onClose();
        });
      } else {
        const errorData = await response.json();
        Swal.fire({
          icon: "error",
          title: "Error",
          text: errorData.message || "Error submitting form",
        });
      }
    } catch (error) {
      console.error("Error submitting data:", error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Error submitting form",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const renderInputField = (field, label, type = "text") => {
    return (
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          {label}
          {["truck_name", "empty_weight", "company", "gvw", "reg_date", "truck_owner_name", "owner_id"].includes(field) && 
            <span className="text-red-500 ml-1">*</span>}
        </label>
        <input
          type={type}
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

  const renderSelectField = (field, label, options) => {
    return (
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          {label}
          <span className="text-red-500 ml-1">*</span>
        </label>
        <select
          name={field}
          value={formData[field]}
          onChange={handleChange}
          className={`p-2 border ${errors[field] ? 'border-red-500' : 'border-gray-300'} rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500`}
        >
          <option value="">Select {label}</option>
          {options.map((option) => (
            <option key={option._id} value={option.ownerName}>
              {option.ownerName}
            </option>
          ))}
        </select>
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
      <div className="bg-white rounded-lg shadow-lg w-4/5 max-w-3xl p-6">
        <h2 className="bg--600 text-black text-xl font-semibold py-3 px-4 rounded-t-lg text-center">
          {editData ? "Edit Truck" : "Truck"}
        </h2>

        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-x-6">
            {/* Section: Basic Information */}
            <div className="md:col-span-1 bg-gray-50 p-4 rounded-lg">
              <h3 className="font-medium text-gray-700 mb-3 border-b pb-2">Basic Information</h3>
              {renderInputField("truck_name", "Truck Number")}
              {renderInputField("empty_weight", "Empty Weight")}
              {renderInputField("company", "Company")}
              {renderInputField("gvw", "GVW")}
            </div>

            {/* Section: Registration Information */}
            <div className="md:col-span-1 bg-gray-50 p-4 rounded-lg">
              <h3 className="font-medium text-gray-700 mb-3 border-b pb-2">Registration Information</h3>
              {renderInputField("reg_date", "Registration Date", "date")}
              {renderSelectField("truck_owner_name", "Truck Owner", owners)}
            </div>

            {/* Section: Validity Information */}
            <div className="md:col-span-1 bg-gray-50 p-4 rounded-lg">
              <h3 className="font-medium text-gray-700 mb-3 border-b pb-2">Validity Information</h3>
              {renderInputField("tax_validity_date", "Tax Validity", "date")}
              {renderInputField("insurance_validity_date", "Insurance Validity", "date")}
              {renderInputField("fitness_validity_date", "Fitness Validity", "date")}
              {renderInputField("permit_validity_date", "Permit Validity", "date")}
            </div>
          </div>

          <div className="flex justify-end space-x-3 mt-6 pt-4 border-t">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
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

export default TruckForm;