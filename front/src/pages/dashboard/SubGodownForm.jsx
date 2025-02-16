import React, { useState, useEffect } from "react";

const SubGodownForm = ({ onClose, onSave, editData }) => {
  const [formData, setFormData] = useState({
    parentGodown: "",
    subGodownName: "",
    status: "Active", // Default value
  });

  const [godownList, setGodownList] = useState([]); // Stores fetched godowns
  const [search, setSearch] = useState(""); // For filtering dropdown list
  const [showDropdown, setShowDropdown] = useState(false); // Controls dropdown visibility
  const [loading, setLoading] = useState(false);

  // ✅ Fetch godown names from `mswcgodown` table
  useEffect(() => {
    const fetchGodowns = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/godowns");
        if (!response.ok) throw new Error("Failed to fetch godowns");

        const data = await response.json();
        setGodownList(data || []);
      } catch (error) {
        console.error("Error fetching godowns:", error);
        setGodownList([]);
      }
    };

    fetchGodowns();
  }, []);

  // ✅ Pre-fill form data if editing
  useEffect(() => {
    if (editData) {
      setFormData({
        parentGodown: editData.parentGodown || "",
        subGodownName: editData.subGodownName || "",
        status: editData.status || "Active",
      });
      setSearch(editData.parentGodown || ""); // Set search input for dropdown
    } else {
      setFormData({ parentGodown: "", subGodownName: "", status: "Active" });
    }
  }, [editData]);

  // ✅ Handle Input Change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // ✅ Handle Selecting a Godown from Dropdown
  const handleSelectGodown = (godownName) => {
    setFormData({ ...formData, parentGodown: godownName });
    setSearch(godownName);
    setShowDropdown(false);
  };

  // ✅ Check if the form is valid
  const isFormValid = Object.values(formData).every((value) =>
    typeof value === "string" ? value.trim() !== "" : false
  );

  // ✅ Handle Form Submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isFormValid || loading) return;

    setLoading(true);

    try {
      const response = await fetch(
        editData
          ? `http://localhost:5000/api/subgodown/${editData.uuid}`
          : "http://localhost:5000/api/subgodown",
        {
          method: editData ? "PUT" : "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        }
      );

      const data = await response.json();

      if (response.ok) {
        alert(editData ? "Godown updated successfully!" : "Parent Godown added successfully!");
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
          {editData ? "Edit Parent Godown" : "Add Parent Godown"}
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            {/* ✅ Parent Godown with Dropdown */}
            <div className="relative">
              <label className="block text-sm font-medium text-gray-700">Parent Godown</label>
              <input
                type="text"
                name="parentGodown"
                placeholder="Search or Select Godown"
                value={search}
                onClick={() => setShowDropdown(true)}
                onChange={(e) => {
                  setSearch(e.target.value);
                  setShowDropdown(true);
                }}
                required
                className="p-2 border rounded-lg w-full"
              />
              {/* ✅ Dropdown List */}
              {showDropdown && (
                <div className="absolute z-10 bg-white border rounded-md w-full mt-1 max-h-40 overflow-auto shadow-lg">
                  {godownList
                    .filter((godown) =>
                      godown.godownName.toLowerCase().includes(search.toLowerCase())
                    )
                    .map((godown, index) => (
                      <div
                        key={index}
                        onClick={() => handleSelectGodown(godown.godownName)}
                        className="p-2 hover:bg-gray-200 cursor-pointer"
                      >
                        {godown.godownName}
                      </div>
                    ))}
                </div>
              )}
            </div>

            {/* ✅ Sub-Godown Input */}
            <div>
              <label className="block text-sm font-medium text-gray-700">Sub-Godown Name</label>
              <input
                type="text"
                name="subGodownName"
                placeholder="Enter Sub-Godown Name"
                value={formData.subGodownName}
                onChange={handleChange}
                required
                className="p-2 border rounded-lg w-full"
              />
            </div>

            {/* ✅ Status Field */}
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
          </div>

          {/* ✅ Buttons */}
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

export default SubGodownForm;
