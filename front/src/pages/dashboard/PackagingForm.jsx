import React, { useState, useEffect } from "react";
const PackagingForm = ({ onClose, onSave, editData }) => {
  const [formData, setFormData] = useState({
    material_name: "",
    weight: "",
    status: "Active",
  });

  useEffect(() => {
    if (editData) {
      setFormData({
        material_name: editData.material_name || "",
        weight: editData.weight || "",
        status: editData.status || "Active",
      });
    } else {
      setFormData({
        material_name: "",
        weight: "",
        status: "Active",
      });
    }
  }, [editData]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.material_name.trim() || !formData.weight.trim()) return;

    try {
      const response = await fetch(
        editData
          ? `http://localhost:5000/api/packaging/${editData.pack_id}`
          : "http://localhost:5000/api/packaging",
        {
          method: editData ? "PUT" : "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        }
      );

      if (response.ok) {
        alert(editData ? "Packaging updated successfully!" : "Packaging added successfully!");
        onSave();
        onClose(); // Close form after saving
      } else {
        const data = await response.json();
        alert(data.message || "Failed to submit form");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Error submitting data");
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 z-50">
      <div className="bg-white rounded-lg shadow-lg w-4/5 max-w-3xl p-6">
        <h2 className="bg-blue-600 text-white text-xl font-semibold py-3 px-4 rounded-t-lg text-center">
          {editData ? "Edit Packaging" : "Add New Packaging"}
        </h2>
        <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4 p-4">
          <div className="col-span-2">
            <label className="block text-gray-700">Packaging Material</label>
            <input
              type="text"
              name="material_name"
              value={formData.material_name}
              onChange={handleChange}
              placeholder="Enter material name"
              className="p-2 border rounded-lg w-full"
              required
            />
          </div>

          <div className="col-span-2">
            <label className="block text-gray-700">Weight</label>
            <input
              type="number"
              name="weight"
              value={formData.weight}
              onChange={handleChange}
              placeholder="Enter weight"
              className="p-2 border rounded-lg w-full"
              required
            />
          </div>

          <div className="col-span-2 flex justify-between">
            <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded-lg">
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

export default PackagingForm;
