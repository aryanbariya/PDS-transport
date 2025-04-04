import React, { useState, useEffect } from "react";
import Swal from "sweetalert2"; // Import SweetAlert2
const URL = import.meta.env.VITE_API_BACK_URL;

const CategoryForm = ({ onClose, onSave, editData }) => {
  const [formData, setFormData] = useState({
    category_name: "",
    status: "Active",
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (editData) {
      setFormData({
        category_name: editData.category_name || "",
        status: editData.status || "Active",
      });
    } else {
      setFormData({ category_name: "", status: "Active" });
    }
  }, [editData]);

  const validateForm = () => {
    let newErrors = {};
    if (!formData.category_name.trim()) {
      newErrors.category_name = "Category name is required";
    } else if (!/^[a-zA-Z\s]{2,}$/.test(formData.category_name)) {
      newErrors.category_name = "Category name must be at least 2 characters and contain only letters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      const response = await fetch(
        editData
          ? `${URL}/api/categories/${editData.uuid}`
          : `${URL}/api/categories`,
        {
          method: editData ? "PUT" : "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        }
      );

      if (response.ok) {
        Swal.fire({
          icon: "success",
          title: editData ? "Category updated successfully!" : "Category added successfully!",
          showConfirmButton: false,
          timer: 1500,
        }).then(() => {
          onSave();
          onClose();
        });
      } else {
        const data = await response.json();
        console.error("Error submitting data:", data); // Log server response error
        Swal.fire({
          icon: "error",
          title: "Error",
          text: data.message || "Failed to submit form",
        });
      }
    } catch (error) {
      console.error("Error submitting data:", error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Error submitting data",
      });
    }
  };

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold py-2 px-4 border-b-2 border-gray-200">
        {editData ? "Edit Category" : "Add Category"}
      </h2>
      <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-4 p-4">
        <div className="col-span-1">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Category Name
          </label>
          <input
            type="text"
            name="category_name"
            value={formData.category_name}
            onChange={handleChange}
            placeholder="Enter category name"
            autoComplete="off"
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
          {errors.category_name && <p className="text-red-500 text-sm mt-1">{errors.category_name}</p>}
        </div>

        <div className="col-span-1">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Status
          </label>
          <select
            name="status"
            value={formData.status}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
          </select>
        </div>

        <div className="col-span-1 flex justify-end space-x-3 mt-6 pt-4 border-t">
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
            {editData ? "Update" : "Submit"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default CategoryForm;
