import React, { useState, useEffect } from "react";

const CategoryForm = ({ onClose, onSave, editData }) => {
  const [formData, setFormData] = useState({
    category_name: "",
    status: "Active",
  });

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

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const isFormValid = Object.values(formData).every((value) => value.trim() !== "");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isFormValid) {
      alert("Please fill in all fields.");
      return;
    }

    const method = editData ? "PUT" : "POST";
    const url = editData
      ? `http://localhost:5000/api/categories/${editData.uuid}`
      : "http://localhost:5000/api/categories";

    try {
      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        alert(editData ? "Category updated successfully!" : "Category added successfully!");
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
      <div className="bg-white rounded-lg shadow-lg w-4/5 max-w-3xl p-6">
        <h2 className="bg-blue-600 text-white text-xl font-semibold py-3 px-4 rounded-t-lg text-center">
          {editData ? "Edit Category" : "Add Category"}
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          {["category_name", "status"].map((field) => (
            <div key={field}>
              <label className="block text-sm font-medium text-gray-700">
                {field.replace(/_/g, " ").replace(/\b\w/g, (c) => c.toUpperCase())}
              </label>
              {field === "status" ? (
                <select
                  name={field}
                  value={formData[field]}
                  onChange={handleChange}
                  className="p-2 border rounded-lg w-full"
                >
                  <option value="Active">Active</option>
                  <option value="Inactive">Inactive</option>
                </select>
              ) : (
                <input
                  type="text"
                  name={field}
                  placeholder={`Enter ${field.replace(/_/g, " ")}`}
                  value={formData[field]}
                  onChange={handleChange}
                  required
                  className="p-2 border rounded-lg w-full"
                />
              )}
            </div>
          ))}
          <div className="flex justify-between">
            <button
              type="submit"
              disabled={!isFormValid}
              className={`py-2 px-4 rounded-lg ${
                isFormValid ? "bg-blue-600 text-white hover:bg-blue-700" : "bg-gray-400 text-gray-700 cursor-not-allowed"
              }`}
            >
              {editData ? "Update" : "Submit"}
            </button>
            <button
              type="button"
              className="bg-red-600 text-white py-2 px-4 rounded-lg hover:bg-red-700"
              onClick={onClose}
            >
              Close
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CategoryForm;
