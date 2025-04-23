import React, { useState, useEffect } from "react";
import Swal from "sweetalert2"; // Import SweetAlert2
const URL = import.meta.env.VITE_API_BACK_URL;

const SubGodownForm = ({ onClose, onSave, editData }) => {
  const [formData, setFormData] = useState({
    parentGodown: "",
    subGodown: "",
  });

  const [godownList, setGodownList] = useState([]);
  const [search, setSearch] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchGodowns = async () => {
      try {
        const response = await fetch(`${URL}/api/subgodowns/godowns`);
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

  useEffect(() => {
    if (editData) {
      setFormData({
        parentGodown: editData.parentGodown || "",
        subGodown: editData.subGodown || "",
      });
      setSearch(editData.parentGodown || "");
    } else {
      setFormData({ parentGodown: "", subGodown: "" });
    }
  }, [editData]);

  const capitalizeFirstLetter = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: capitalizeFirstLetter(e.target.value),
    });
  };

  const handleSelectGodown = (godownName) => {
    setFormData({ ...formData, parentGodown: capitalizeFirstLetter(godownName) });
    setSearch(godownName);
    setShowDropdown(false);
  };

  const isFormValid = formData.parentGodown.trim() !== "";

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isFormValid || loading) return;

    setLoading(true);

    try {
      const response = await fetch(
        editData
          ? `${URL}/api/subgodowns/${editData.uuid}`
          : `${URL}/api/subgodowns`,
        {
          method: editData ? "PUT" : "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        }
      );

      const data = await response.json();

      if (response.ok) {
        Swal.fire({
          icon: "success",
          title: editData ? "Godown updated successfully!" : "Parent Godown added successfully!",
          showConfirmButton: false,
          timer: 1500,
        }).then(() => {
          onSave();
          onClose();
        });
      } else {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: data.message || "Failed to submit form",
        });
      }
    } catch (error) {
      console.error("Error:", error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Error submitting data",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 z-50">
      <div className="bg-white rounded-lg shadow-lg w-4/5 max-w-3xl p-6">
        <h2 className="bg--600 text-black text-xl font-semibold py-3 px-4 rounded-t-lg text-center">
          {editData ? "Edit Sub Godown" : "Sub Godown"}
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="relative">
              <label className="block text-sm font-medium text-gray-700">MSWCGodown </label>
              <input
                type="text"
                name="MSWCGodown"
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

            <div>
              <label className="block text-sm font-medium text-gray-700">Sub-Godown Name</label>
              <input
                type="text"
                name="subGodown"
                placeholder="Enter Sub-Godown Name (Optional)"
                value={formData.subGodown}
                onChange={handleChange}
                className="p-2 border rounded-lg w-full"
              />
            </div>
          </div>

          <div className="flex justify-end gap-2">
            <button
              type="submit"
              disabled={loading}
              className={`py-2 px-4 rounded-lg ${
                !loading
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
