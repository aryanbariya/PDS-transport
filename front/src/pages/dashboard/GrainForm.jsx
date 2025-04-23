import React, { useState, useEffect } from "react";
const URL = import.meta.env.VITE_API_BACK_URL

const GrainForm = ({ onClose, onSave, editData }) => {
    const [formData, setFormData] = useState({
        grainName: "",
        godownName: "",
    });

    const [mswcGodowns, setMswcGodowns] = useState([]);
    const [subGodowns, setSubGodowns] = useState([]);
    const [selectedDropdown, setSelectedDropdown] = useState(""); // "MSWC" or "Sub"

    useEffect(() => {
        if (editData) {
            setFormData({
                grainName: editData.grainName || "",
                godownName: editData.godownName || "",
            });
        }

        // ✅ Fetch MSWC Godowns
        fetch(`${URL}/api/mswc/active`)
            .then((res) => res.json())
            .then((data) => setMswcGodowns(data))
            .catch((err) => console.error("Error fetching MSWC Godowns:", err));

        // ✅ Fetch Sub-Godowns
        fetch(`${URL}/api/subgodowns/active`)
            .then((res) => res.json())
            .then((data) => setSubGodowns(data))
            .catch((err) => console.error("Error fetching Sub-Godowns:", err));
    }, [editData]);

    // ✅ Handle Input Change
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    // ✅ Handle Dropdown Selection
    //   const handleDropdownChange = (e) => {
    //     setSelectedDropdown(e.target.value);
    //     setFormData({ ...formData, godownName: "" }); // Reset previous selection
    //   };
    const handleDropdownChange = (e) => {
        setSelectedDropdown(e.target.value);
        setFormData({ ...formData, godownName: "" }); // Reset selection
    };

    // Handle selecting an MSWC Godown
    const handleMswcSelect = (e) => {
        setFormData({ ...formData, godownName: e.target.value });
    };

    // Handle selecting a Sub-Godown
    const handleSubSelect = (e) => {
        setFormData({ ...formData, godownName: e.target.value });
    };


    // ✅ Handle Form Submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("Submitting Data:", formData); // Debugging log

        if (!formData.grainName || !formData.godownName) {
            alert("Please fill in all fields.");
            return;
        }

        const method = editData ? "PUT" : "POST";
        const url = editData
            ? `${URL}/api/grains/${editData.uuid}`
            : `${URL}/api/grains`;

        try {
            const response = await fetch(url, {
                method,
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ grainName: formData.grainName, godownName: formData.godownName }),
            });

            if (response.ok) {
                alert(editData ? "Grain updated successfully!" : "Grain added successfully!");
                onSave();
                onClose();
            } else {
                const errorData = await response.json();
                console.error("Error Response:", errorData);
                alert(errorData.error || "Error submitting form");
            }
        } catch (error) {
            console.error("Error submitting data:", error);
            alert("Error submitting form");
        }
    };


    // const handleSubmit = async (e) => {
    //     e.preventDefault();
    //     console.log("Submitting Data:", formData); // 🔍 Debugging log

    //     if (!formData.grainName || !formData.godownName) {
    //       alert("Please fill in all fields.");
    //       return;
    //     }

    //     const method = editData ? "PUT" : "POST";
    //     const url = editData
    //       ? `http://localhost:5000/api/grains/${editData.uuid}`
    //       : "http://localhost:5000/api/grains";

    //     try {
    //       const response = await fetch(url, {
    //         method,
    //         headers: { "Content-Type": "application/json" },
    //         body: JSON.stringify(formData),
    //       });

    //       if (response.ok) {
    //         alert(editData ? "Grain updated successfully!" : "Grain added successfully!");
    //         onSave();
    //         onClose();
    //       } else {
    //         const errorData = await response.json();
    //         console.error("Error Response:", errorData);
    //         alert(errorData.error || "Error submitting form");
    //       }
    //     } catch (error) {
    //       console.error("Error submitting data:", error);
    //       alert("Error submitting form");
    //     }
    //   };



    // const handleSubmit = async (e) => {
    //     e.preventDefault();
    //     if (!formData.grainName || !formData.godownName) {
    //         alert("Please fill in all fields.");
    //         return;
    //     }

    //     const method = editData ? "PUT" : "POST";
    //     const url = editData
    //         ? `http://localhost:5000/api/grains/${editData.uuid}`
    //         : "http://localhost:5000/api/grains";

    //     try {
    //         const response = await fetch(url, {
    //             method,
    //             headers: { "Content-Type": "application/json" },
    //             body: JSON.stringify(formData),
    //         });

    //         if (response.ok) {
    //             alert(editData ? "Grain updated successfully!" : "Grain added successfully!");
    //             onSave();
    //             onClose();
    //         } else {
    //             alert("Error submitting form");
    //         }
    //     } catch (error) {
    //         console.error("Error submitting data:", error);
    //         alert("Error submitting form");
    //     }
    // };

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 z-50">
            <div className="bg-white rounded-lg shadow-lg w-4/5 max-w-3xl p-6">
                <h2 className="bg-blue-600 text-white text-xl font-semibold py-3 px-4 rounded-t-lg text-center">
                    {editData ? "Edit Grain" : "Add Grain"}
                </h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    {/* Grain Name */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Grain Name</label>
                        <input
                            type="text"
                            name="grainName"
                            placeholder="Enter Grain Name"
                            value={formData.grainName}
                            onChange={handleChange}
                            required
                            className="p-2 border rounded-lg w-full"
                        />
                    </div>

                    {/* Dropdown Selection */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Select Godown Type</label>
                        <select
                            value={selectedDropdown}
                            onChange={handleDropdownChange}
                            required
                            className="p-2 border rounded-lg w-full"
                        >
                            <option value="">Select...</option>
                            <option value="MSWC">MSWC Godown</option>
                            <option value="Sub">Sub-Godown</option>
                        </select>
                    </div>

                    {/* Conditional Dropdown for MSWC Godown */}
                    {selectedDropdown === "MSWC" && (
                        <select name="godownName" value={formData.godownName} onChange={handleMswcSelect} required>
                            <option value="">Select MSWC Godown</option>
                            {mswcGodowns.map((g) => (
                                <option key={g.uuid} value={g.godownName}>{g.godownName}</option>
                            ))}
                        </select>
                    )}

                    {selectedDropdown === "Sub" && (
                        <select name="godownName" value={formData.subGodown} onChange={handleSubSelect} required>
                            <option value="">Select Sub-Godown</option>
                            {subGodowns.map((g) => (
                                <option key={g.uuid} value={g.subGodown}>{g.subGodown}</option>
                            ))}
                        </select>
                    )}

                    {/* Buttons */}
                    <div className="flex justify-between">
                        <button
                            type="submit"
                            disabled={!formData.grainName || !formData.godownName}
                            className={`py-2 px-4 rounded-lg ${formData.grainName && formData.godownName
                                ? "bg-blue-600 text-white hover:bg-blue-700"
                                : "bg-gray-400 text-gray-700 cursor-not-allowed"
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

export default GrainForm;
