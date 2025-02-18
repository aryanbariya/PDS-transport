import React, { useState } from "react";



const TruckForm = ({ onClose, onSave, editData }) => {
  const [truck, setTruck] = useState({
    truck_name: "",
    truck_status: "Active", // Default value
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

  const [loading, setLoading] = useState(false);


  // If editData is provided, set the form data
  React.useEffect(() => {
    if (editData) {
      setTruck({
        truck_name: editData.truck_name || "",
        truck_status: editData.truck_status || "Active",
        empty_weight: editData.empty_weight || "",
        company: editData.company || "",
        gvw: editData.gvw || "",
        reg_date: editData.reg_date || "",
        truck_owner_name: editData.truck_owner_name || "",
        owner_id: editData.owner_id || "",
        tax_validity: editData.tax_validity || "",
        insurance_validity: editData.insurance_validity || "",
        fitness_validity: editData.fitness_validity || "",
        permit_validity: editData.permit_validity || "",
        direct_sale: editData.direct_sale || "",
      });
    } else {
      setTruck({
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
    }
  }, [editData]);

  const handleChange = (e) => {
    setTruck({ ...truck, [e.target.name]: e.target.value });
  };

  const isFormValid = Object.values(truck).every(
    (value) => typeof value === "string" ? value.trim() !== "" : false
  );

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isFormValid || loading) return;

    setLoading(true);
    console.log('data fetch start')

    try {
      const response = await fetch(
        editData
          ? `http://localhost:5000/api/truck/${editData.uuid}`
          : "http://localhost:5000/api/truck",
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
        onClose(); // Close the modal after successful submit
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
          {editData ? "Edit Truck" : "Add New Truck"}
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            {[
              { name: "truck_name", label: "Truck Name", type: "text" },
              { name: "truck_status", label: "Truck Status", type: "text" },
              { name: "empty_weight", label: "Empty Weight", type: "text" },
              { name: "company", label: "Company", type: "text" },
              { name: "gvw", label: "GVW", type: "text" },
              { name: "reg_date", label: "Registration Date", type: "date" },
              { name: "truck_owner_name", label: "Truck Owner Name", type: "text" },
              { name: "owner_id", label: "Owner ID", type: "text" },
              { name: "tax_validity", label: "Tax Validity", type: "date" },
              { name: "insurance_validity", label: "Insurance Validity", type: "date" },
              { name: "fitness_validity", label: "Fitness Validity", type: "date" },
              { name: "permit_validity", label: "Permit Validity", type: "date" },
              { name: "direct_sale", label: "Direct Sale", type: "text" },
            ].map((field) => (
              <div key={field.name}>
                <label className="block text-sm font-medium text-gray-700">{field.label}</label>
                <input
                  type={field.type}
                  name={field.name}
                  placeholder={`Enter ${field.label}`}
                  value={truck[field.name]}
                  onChange={handleChange}
                  required
                  className="p-2 border rounded-lg w-full"
                />
              </div>
            ))}

            {/* New Status Field */}
            <div>
              <label className="block text-sm font-medium text-gray-700">Status</label>
              <select
                name="truck_status"
                value={truck.truck_status}
                onChange={handleChange}
                required
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
              onClick={onClose} // Triggers the onClose prop when clicked
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
