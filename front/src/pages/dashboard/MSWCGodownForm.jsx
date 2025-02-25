import React, { useState, useEffect } from "react";
const URL = import.meta.env.VITE_API_BACK_URL

const MSWCGodownForm = ({ onClose, onSave, editData }) => {
  const [formData, setFormData] = useState({
    godownName: "",
    godownUnder: "",
    status: "Active", // Default value
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (editData) {
      setFormData({
        godownName: editData.godownName || "",
        godownUnder: editData.godownUnder || "",
        status: editData.status || "Active",
      });
    } else {
      setFormData({ godownName: "", godownUnder: "", status: "Active" });
    }
  }, [editData]);

  const validate = () => {
    let newErrors = {};

    if (!formData.godownName.trim()) {
      newErrors.godownName = "MSWC Godown Name is required";
    } else if (formData.godownName.length < 3) {
      newErrors.godownName = "Must be at least 3 characters";
    }

    if (!formData.godownUnder.trim()) {
      newErrors.godownUnder = "Godown Under is required";
    } else if (formData.godownUnder.length < 3) {
      newErrors.godownUnder = "Must be at least 3 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate() || loading) return;

    setLoading(true);
    try {
      const response = await fetch(
        editData
          ? `${URL}/api/mswcgodown/${editData.uuid}`
          : `${URL}/api/mswcgodown`,
        {
          method: editData ? "PUT" : "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        }
      );
      const data = await response.json();

      if (response.ok) {
        alert(editData ? "Godown updated successfully!" : "MSWC Godown added successfully!");
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
          {editData ? "Edit MSWC Godown" : "Add MSWC Godown"}
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            {[{ name: "godownName", label: "MSWC Godown Name" }, { name: "godownUnder", label: "Godown Under" }].map((field) => (
              <div key={field.name}>
                <label className="block text-sm font-medium text-gray-700">{field.label}</label>
                <input
                  type="text"
                  name={field.name}
                  placeholder={`Enter ${field.label}`}
                  value={formData[field.name]}
                  onChange={handleChange}
                  className="p-2 border rounded-lg w-full"
                />
                {errors[field.name] && <p className="text-red-500 text-sm">{errors[field.name]}</p>}
              </div>
            ))}

            {/* Status Field */}
            <div>
              <label className="block text-sm font-medium text-gray-700">Status</label>
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
          </div>

          <div className="flex justify-between">
            <button
              type="submit"
              disabled={loading}
              className={`py-2 px-4 rounded-lg ${
                !loading ? "bg-blue-600 text-white hover:bg-blue-700" : "bg-gray-400 text-gray-700 cursor-not-allowed"
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

export default MSWCGodownForm;
