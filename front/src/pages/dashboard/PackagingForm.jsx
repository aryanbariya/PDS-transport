import React, { useState, useEffect } from "react";

const PackagingForm = ({ onClose, onSave, editData }) => {
  const [formData, setFormData] = useState({
    materialName: "",
    weight: "",
    status: "Start",
  });

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (editData) {
      setFormData({
        materialName: editData.materialName || "",
        weight: editData.weight || "",
        status: editData.status || "Start",
      });
    } else {
      setFormData({
        materialName: "",
        weight: "",
        status: "Start",
      });
    }
  }, [editData]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const isFormValid = formData.materialName.trim() !== "" && formData.weight.trim() !== "";

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isFormValid || loading) return;

    setLoading(true);
    console.log("Data fetch start...");

    try {
      const response = await fetch(
        editData
          ? `http://localhost:5000/api/packaging/${editData.uuid}`
          : "http://localhost:5000/api/packaging",
        {
          method: editData ? "PUT" : "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        }
      );

      const data = await response.json();

      if (response.ok) {
        alert(editData ? "Packaging updated successfully!" : "Packaging added successfully!");
        onSave();
        onClose();
      } else {
        alert(data.message || "Failed to submit form");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Error submitting data");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 z-50">
      <div className="bg-white rounded-lg shadow-lg w-4/5 max-w-3xl p-6">
        <h2 className="bg-blue-600 text-white text-xl font-semibold py-3 px-4 rounded-t-lg text-center">
          {editData ? "Edit Packaging" : "Add New Packaging"}
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            {/* Input Fields */}
            {[
              { name: "materialName", label: "Packaging Material", type: "text" },
              { name: "weight", label: "Weight", type: "number", step: "0.000001" },
            ].map((field) => (
              <div key={field.name}>
                <label className="block text-sm font-medium text-gray-700">{field.label}</label>
                <input
                  type={field.type}
                  name={field.name}
                  placeholder={`Enter ${field.label}`}
                  value={formData[field.name]}
                  onChange={handleChange}
                  required
                  step={field.step || ""}
                  className="p-2 border rounded-lg w-full"
                />
              </div>
            ))}

            {/* Status Dropdown */}
            <div>
              <label className="block text-sm font-medium text-gray-700">Status</label>
              <select
                name="status"
                value={formData.status}
                onChange={handleChange}
                required
                className="p-2 border rounded-lg w-full"
              >
                <option value="Start">Start</option>
                <option value="In Progress">In Progress</option>
                <option value="Completed">Completed</option>
              </select>
            </div>
          </div>

          {/* Buttons */}
          <div className="flex justify-between">
            <button
              type="submit"
              disabled={!isFormValid || loading}
              className={`py-2 px-4 rounded-lg ${
                isFormValid && !loading
                  ? "bg-blue-600 text-white hover:bg-blue-700"
                  : "bg-gray-400 text-gray-700 cursor-not-allowed"
              }`}
            >
              {loading ? "Submitting..." : editData ? "Update" : "Submit"}
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

export default PackagingForm;
