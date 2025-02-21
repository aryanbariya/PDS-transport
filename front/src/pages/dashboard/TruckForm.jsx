import React, { useState, useEffect } from "react";

const TruckForm = ({ onClose, onSave, editData }) => {
  const [truck, setTruck] = useState({
    truck_name: "",
    truck_status: "Active",
    empty_weight: "",
    company: "",
    gvw: "",
    reg_date: "",
    truck_owner_name: "",
    owner_id: "",
    tax_validity: "",
    insurance_validity: "",
    fitness_validity: "",
    permit_validity: "",
    direct_sale: "",
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (editData) {
      setTruck(editData);
    }
  }, [editData]);

  const validateField = (name, value) => {
    let error = "";
    if (!value.trim()) {
      error = `${name.replace(/_/g, ' ')} is required.`;
    } else {
      switch (name) {
        case "empty_weight":
        case "gvw":
          if (isNaN(value) || Number(value) <= 0) {
            error = `${name.replace(/_/g, ' ')} must be a positive number.`;
          }
          break;
        case "reg_date":
        case "tax_validity":
        case "insurance_validity":
        case "fitness_validity":
        case "permit_validity":
          if (new Date(value) < new Date("2000-01-01")) {
            error = `Invalid ${name.replace(/_/g, ' ')}.`;
          }
          break;
        default:
          break;
      }
    }
    setErrors((prev) => ({ ...prev, [name]: error }));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTruck({ ...truck, [name]: value });
    validateField(name, value);
  };

  const isFormValid = Object.values(errors).every((err) => !err) &&
                      Object.values(truck).every((val) => val.trim() !== "");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isFormValid || loading) return;

    setLoading(true);
    try {
      const response = await fetch(
        editData ? `http://localhost:5000/api/truck/${editData.uuid}` : "http://localhost:5000/api/truck",
        {
          method: editData ? "PUT" : "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(truck),
        }
      );
      const data = await response.json();
      if (response.ok) {
        alert(editData ? "Truck updated successfully!" : "Truck added successfully!");
        onSave();
        onClose();
      } else {
        alert(data.message || "Failed to submit form");
      }
    } catch (error) {
      alert("Error submitting data");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 z-50">
      <div className="bg-white rounded-lg shadow-lg w-4/5 max-w-3xl p-6">
        <h2 className="bg-blue-600 text-white text-xl font-semibold py-3 px-4 rounded-t-lg text-center">
          {editData ? "Edit Truck" : "Add New Truck"}
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            {["truck_name", "empty_weight", "company", "gvw", "reg_date", "truck_owner_name", "owner_id", "tax_validity", "insurance_validity", "fitness_validity", "permit_validity", "direct_sale"].map((field) => (
              <div key={field}>
                <label className="block text-sm font-medium text-gray-700">{field.replace(/_/g, ' ')}</label>
                <input
                  type={field.includes("date") ? "date" : "text"}
                  name={field}
                  value={truck[field]}
                  onChange={handleChange}
                  className="p-2 border rounded-lg w-full"
                />
                {errors[field] && <p className="text-red-500 text-sm">{errors[field]}</p>}
              </div>
            ))}

            <div>
              <label className="block text-sm font-medium text-gray-700">Truck Status</label>
              <select
                name="truck_status"
                value={truck.truck_status}
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
              disabled={!isFormValid || loading}
              className={`py-2 px-4 rounded-lg ${isFormValid && !loading ? "bg-blue-600 text-white hover:bg-blue-700" : "bg-gray-400 text-gray-700 cursor-not-allowed"}`}
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

export default TruckForm;