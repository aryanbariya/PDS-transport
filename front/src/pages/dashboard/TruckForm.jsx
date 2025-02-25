import React, { useState, useEffect } from "react";
const URL = import.meta.env.VITE_API_BACK_URL

const TruckForm = ({ onClose, onSave, editData }) => {
  const [formData, setFormData] = useState({
    order_number: '',
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

  useEffect(() => {
    if (editData) {
      setFormData({
        truck_name: editData.truck_name || "",
        truck_status: editData.truck_status || "Active",
        empty_weight: editData.empty_weight || "",
        company: editData.company || "",
        gvw: editData.gvw || "",
        reg_date: editData.reg_date || "",
        truck_owner_name: editData.truck_owner_name || "",
        owner_id: editData.owner_id || "",
        tax_validity_date: editData.tax_validity_date || "",
        insurance_validity_date: editData.insurance_validity_date || "",
        fitness_validity_date: editData.fitness_validity || "",
        permit_validity_date: editData.permit_validity_date || "",
        direct_sale: editData.direct_sale || "",
      });
    }
  }, [editData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const method = editData ? "PUT" : "POST";
    const url = editData
      ? `${URL}/api/truck/${editData.uuid}`
      : `${URL}/api/truck`;

    try {
      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        alert(editData ? "Truck updated successfully!" : "Truck added successfully!");
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
          {editData ? "Edit Truck" : "Add Truck"}
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            {["truck_name", "empty_weight", "company", "gvw", "reg_date", "truck_owner_name", "owner_id", "tax_validity_date", "insurance_validity_date", "fitness_validity_date", "permit_validity_date", "direct_sale"].map((field) => (
              <div key={field}>
                <label className="block text-sm font-medium text-gray-700">
                  {field.replace("_", " ").toUpperCase()}
                </label>
                <input
                  type={field.includes("date") ? "date" : "text"}
                  name={field}
                  value={formData[field]}
                  onChange={handleChange}
                  className="p-2 border rounded-lg w-full"
                />
              </div>
            ))}
            <div>
              <label className="block text-sm font-medium text-gray-700">Truck Status</label>
              <select
                name="truck_status"
                value={formData.truck_status}
                onChange={handleChange}
                className="p-2 border rounded-lg w-full"
              >
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
              </select>
            </div>
          </div>
          <div className="flex justify-between">
            <button type="submit" className="bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700">
              {editData ? "Update" : "Submit"}
            </button>
            <button type="button" className="bg-red-600 text-white py-2 px-4 rounded-lg hover:bg-red-700" onClick={onClose}>
              Close
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TruckForm;
