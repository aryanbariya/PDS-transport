import React, { useState, useEffect } from "react";

const PackagingForm = ({ onClose, onSave, editData }) => {
  const [formData, setFormData] = useState({
    materialName: "",
    weight: "",
    status: "Active",
  });

  useEffect(() => {
    if (editData) {
      setFormData({
        materialName: editData.materialName || "",
        weight: editData.weight || "",
        status: editData.status || "Start",
      });
    }
  }, [editData]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const isFormValid = formData.materialName.trim() !== "" && formData.weight.trim() !== "";

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isFormValid) {
      alert("Please fill in all fields.");
      return;
    }

    const method = editData ? "PUT" : "POST";
    const url = editData
      ? `http://localhost:5000/api/packaging/${editData.pack_id}`
      : "http://localhost:5000/api/packaging";

    try {
      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        alert(editData ? "Packaging updated successfully!" : "Packaging added successfully!");
        onSave();
        onClose();
      } else {
        alert("Error submitting form");
      }
    } catch (error) {
      console.log("Error submitting data:", error);
      alert("Error submitting form");
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 z-50">
      <div className="bg-white rounded-lg shadow-lg w-1/2 max-w-xl p-6">
        <h2 className="bg-blue-600 text-white text-xl font-semibold py-3 px-4 rounded-t-lg text-center">
          {editData ? "Edit Packaging" : "Add Packaging"}
        </h2>
        <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4 p-4">
          
          {/* Packaging Material */}
          <div className="col-span-2">
            <label className="block text-gray-700">Packaging Material</label>
            <input
              type="text"
              name="materialName"
              value={formData.materialName}
              onChange={handleChange}
              placeholder="Name of packaging material"
              required
              className="p-2 border rounded-lg w-full"
            />
          </div>

          {/* Weight */}
          <div className="col-span-2">
            <label className="block text-gray-700">Weight</label>
            <input
              type="number"
              name="weight"
              value={formData.weight}
              onChange={handleChange}
              placeholder="Weight of packaging material"
              required
              step="0.000001"
              className="p-2 border rounded-lg w-full"
            />
          </div>

           {/* New Status Field */}
           <div>
              <label className="block text-sm font-medium text-gray-700">Status</label>
              <select
                name="status"
                value={formData.status}
                onChange={handleChange}
                required
                className="p-2 border rounded-lg w-full"
              >
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
              </select>
            </div>

          {/* Buttons */}
          <div className="col-span-2 flex justify-between mt-4">
            <button
              type="submit"
              disabled={!isFormValid}
              className={`py-2 px-4 rounded-lg ${isFormValid ? "bg-blue-600 text-white hover:bg-blue-700" : "bg-gray-400 text-gray-700 cursor-not-allowed"}`}
            >
              {editData ? "Update" : "Submit"}
            </button>
            <button
              type="button"
              className="bg-gray-500 text-white py-2 px-4 rounded-lg hover:bg-gray-600"
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
