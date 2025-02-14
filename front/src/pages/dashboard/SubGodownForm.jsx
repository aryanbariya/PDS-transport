import React, { useState, useEffect } from "react";

const MSWCGodownForm = ({ onClose, onSave }) => {
  const [formData, setFormData] = useState({
    godownName: "",
    godownUnder: "",
  });

  const [godownList, setGodownList] = useState([]);
  const [search, setSearch] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);

  // Fetch Godown List from API
  useEffect(() => {
    const fetchGodowns = async () => {
      try {
        const response = await fetch("http://localhost:5000/subgodown");
        if (response.ok) {
          const data = await response.json();
          setGodownList(data);
        }
      } catch (error) {
        console.error("Error fetching godowns:", error);
      }
    };
    fetchGodowns();
  }, []);

  // Handle Input Change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle Dropdown Selection
  const handleSelectGodown = (godown) => {
    setFormData({ ...formData, godownName: godown });
    setSearch(godown);
    setShowDropdown(false);
  };

  const isFormValid = Object.values(formData).every((value) => value.trim() !== "");

  // Handle Form Submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isFormValid) return;

    try {
      const response = await fetch("http://localhost:5000/subgodown", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        alert("MSWC Godown added successfully!");
        onSave(formData);
        setFormData({ godownName: "", godownUnder: "" });
        setSearch("");
      } else {
        alert("Failed to add MSWC Godown");
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
          Add MSWC Godown
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            {/* Searchable Dropdown */}
            <div className="relative">
              <label className="block text-sm font-medium text-gray-700">MSWC Sub-Godown Name</label>
              <input
                type="text"
                name="godownName"
                placeholder="Search or Select Godown"
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);
                  setShowDropdown(true);
                }}
                required
                className="p-2 border rounded-lg w-full"
              />
              {/* Dropdown List */}
              {showDropdown && (
                <div className="absolute z-10 bg-white border rounded-md w-full mt-1 max-h-40 overflow-auto">
                  {godownList
                    .filter((godown) => godown.toLowerCase().includes(search.toLowerCase()))
                    .map((godown, index) => (
                      <div
                        key={index}
                        onClick={() => handleSelectGodown(godown)}
                        className="p-2 hover:bg-gray-200 cursor-pointer"
                      >
                        {godown}
                      </div>
                    ))}
                </div>
              )}
            </div>

            {/* Godown Under Input */}
            <div>
              <label className="block text-sm font-medium text-gray-700">Parent Godown</label>
              <input
                type="text"
                name="godownUnder"
                placeholder="Enter Godown Under"
                value={formData.godownUnder}
                onChange={handleChange}
                required
                className="p-2 border rounded-lg w-full"
              />
            </div>
          </div>

          {/* Buttons */}
          <div className="flex justify-between">
            <button
              type="submit"
              disabled={!isFormValid}
              className={`py-2 px-4 rounded-lg ${
                isFormValid
                  ? "bg-blue-600 text-white hover:bg-blue-700"
                  : "bg-gray-400 text-gray-700 cursor-not-allowed"
              }`}
            >
              Submit
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
