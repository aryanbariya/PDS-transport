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
    <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 z-50">
      <div className="bg-white rounded-lg shadow-lg w-4/5 max-w-3xl p-6">
        <h2 className="bg--600 text-black text-xl font-semibold py-3 px-4 rounded-t-lg text-center">
          {editData ? "Edit Category" : "Category"}
        </h2>
        <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4 p-4">
          <div className="col-span-2">
            <label className="block text-gray-700">Category Name</label>
            <input
              type="text"
              name="category_name"
              value={formData.category_name}
              onChange={handleChange}
              placeholder="Enter category name"
              autoComplete="off" // Prevent autocomplete
              className="p-2 border rounded-lg w-full"
              required
            />
            {errors.category_name && <p className="text-red-500 text-sm">{errors.category_name}</p>}
          </div>

          <div className="col-span-2">
            <label className="block text-gray-700">Status</label>
            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
              className="p-2 border rounded-lg w-full"
            >
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
            </select>
          </div>

          <div className="col-span-2 flex justify-end gap-2">
            <button
              type="submit"
              className={`px-4 py-2 rounded-lg ${
                Object.keys(errors).length === 0 ? "bg-blue-600 text-white hover:bg-blue-700" : "bg-gray-400 text-gray-700 cursor-not-allowed"
              }`}
              disabled={Object.keys(errors).length > 0}
            >
              {editData ? "Update" : "Submit"}
            </button>
            <button onClick={onClose} className="bg-red-600 text-white px-4 py-2 rounded-lg">
              Close
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CategoryForm;
