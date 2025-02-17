import React, { useState, useEffect } from "react";
<<<<<<< HEAD

const TruckForm = ({ onClose, onSave, editData }) => {
  const [formData, setFormData] = useState({
    truckNo: "",
    company: "",
    gvw: "",
    registrationDate: "",
    owner: "",
    unloadedWeight: "",
    taxValidity: "",
    insuranceValidity: "",
    fitnessValidity: "",
    permitValidity: "",
    directTruck: "",
  });

  useEffect(() => {
    if (editData) {
      setFormData({
        truckNo: editData.truckNo || "",
        company: editData.company || "",
        gvw: editData.gvw || "",
        registrationDate: editData.registrationDate || "",
        owner: editData.owner || "",
        unloadedWeight: editData.unloadedWeight || "",
        taxValidity: editData.taxValidity || "",
        insuranceValidity: editData.insuranceValidity || "",
        fitnessValidity: editData.fitnessValidity || "",
        permitValidity: editData.permitValidity || "",
        directTruck: editData.directTruck || "",
      });
    }
  }, [editData]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const isFormValid = Object.values(formData).every((value) => value.trim() !== "");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isFormValid) {
      alert("Please fill in all fields.");
      return;
    }

    const method = editData ? "PUT" : "POST";
    const url = editData
      ? `http://localhost:5000/api/truck/${editData.uuid}`
      : "http://localhost:5000/api/truck";

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
        <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4 p-4">
          
          {/* Truck No. */}
          <div>
            <label className="block text-gray-700">Truck No.</label>
            <input type="text" name="truckNo" value={formData.truckNo} onChange={handleChange} required className="p-2 border rounded-lg w-full" />
          </div>

          {/* Company */}
          <div>
            <label className="block text-gray-700">Company</label>
            <input type="text" name="company" value={formData.company} onChange={handleChange} required className="p-2 border rounded-lg w-full" />
          </div>

          {/* GVW */}
          <div>
            <label className="block text-gray-700">GVW</label>
            <input type="text" name="gvw" value={formData.gvw} onChange={handleChange} required className="p-2 border rounded-lg w-full" />
          </div>

          {/* Registration Date */}
          <div>
            <label className="block text-gray-700">Registration Date</label>
            <input type="date" name="registrationDate" value={formData.registrationDate} onChange={handleChange} required className="p-2 border rounded-lg w-full" />
          </div>

          {/* Owner */}
          <div>
            <label className="block text-gray-700">Owner</label>
            <select name="owner" value={formData.owner} onChange={handleChange} required className="p-2 border rounded-lg w-full">
              <option value="">-- Choose one --</option>
              <option value="Owner1">Owner 1</option>
              <option value="Owner2">Owner 2</option>
            </select>
          </div>

          {/* Unloaded Weight */}
          <div>
            <label className="block text-gray-700">Unloaded Weight</label>
            <input type="text" name="unloadedWeight" value={formData.unloadedWeight} onChange={handleChange} required className="p-2 border rounded-lg w-full" />
          </div>

          {/* Tax Validity */}
          <div>
            <label className="block text-gray-700">Tax Validity</label>
            <input type="date" name="taxValidity" value={formData.taxValidity} onChange={handleChange} required className="p-2 border rounded-lg w-full" />
          </div>

          {/* Insurance Validity */}
          <div>
            <label className="block text-gray-700">Insurance Validity</label>
            <input type="date" name="insuranceValidity" value={formData.insuranceValidity} onChange={handleChange} required className="p-2 border rounded-lg w-full" />
          </div>

          {/* Fitness Validity */}
          <div>
            <label className="block text-gray-700">Fitness Validity</label>
            <input type="date" name="fitnessValidity" value={formData.fitnessValidity} onChange={handleChange} required className="p-2 border rounded-lg w-full" />
          </div>

          {/* Permit Validity */}
          <div>
            <label className="block text-gray-700">Permit Validity</label>
            <input type="date" name="permitValidity" value={formData.permitValidity} onChange={handleChange} required className="p-2 border rounded-lg w-full" />
          </div>

          {/* Direct Truck */}
          <div>
            <label className="block text-gray-700">Direct Truck?</label>
            <select name="directTruck" value={formData.directTruck} onChange={handleChange} required className="p-2 border rounded-lg w-full">
              <option value="">-- Select Direct Truck --</option>
              <option value="Yes">Yes</option>
              <option value="No">No</option>
            </select>
          </div>

          {/* Buttons */}
          <div className="col-span-2 flex justify-between">
            <button type="submit" disabled={!isFormValid} className={`py-2 px-4 rounded-lg ${isFormValid ? "bg-blue-600 text-white hover:bg-blue-700" : "bg-gray-400 text-gray-700 cursor-not-allowed"}`}>
              {editData ? "Update" : "Submit"}
            </button>
            <button type="button" className="bg-gray-500 text-white py-2 px-4 rounded-lg hover:bg-gray-600" onClick={onClose}>
              Close
            </button>
          </div>

        </form>
      </div>
    </div>
  );
};

export default TruckForm;
=======
import axios from "axios";

const TruckForm = ({ fetchTrucks, selectedTruck, setSelectedTruck }) => {
    const [formData, setFormData] = useState({
        order_number:"",
        truck_no: "",
        company: "",
        gvw: "",
        registration_date: "",
        owner: "",
        unloaded_weight: "",
        tax_validity: "",
        insurance_validity: "",
        fitness_validity: "",
        permit_validity: "",
        direct_truck: "",
        created_at: "", // Added the "Created At" field
    });

    useEffect(() => {
        if (selectedTruck) setFormData(selectedTruck);
    }, [selectedTruck]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const endpoint = selectedTruck
            ? `http://localhost:5000/api/trucks/${selectedTruck.uuid}` // Using UUID for the PUT request
            : "http://localhost:5000/api/trucks";

        try {
            if (selectedTruck) {
                // Update existing truck
                await axios.put(endpoint, formData);
            } else {
                // Add new truck
                await axios.post(endpoint, formData);
            }
            fetchTrucks();
            resetForm();
        } catch (error) {
            console.error("Error submitting the form:", error);
            alert("Failed to submit the form.");
        }
    };

    const resetForm = () => {
        setFormData({
            order_number:"",
            truck_no: "",
            company: "",
            gvw: "",
            registration_date: "",
            owner: "",
            unloaded_weight: "",
            tax_validity: "",
            insurance_validity: "",
            fitness_validity: "",
            permit_validity: "",
            direct_truck: "",
            created_at: "", // Reset "Created At" field
        });
        setSelectedTruck(null);
    };

    const isFormValid = Object.values(formData).every((field) => field !== "");

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <input
                type="text"
                className="border p-2 w-full"
                placeholder="Truck Number"
                value={formData.truck_no}
                onChange={(e) => setFormData({ ...formData, truck_no: e.target.value })}
                required
            />
            <input
                type="text"
                className="border p-2 w-full"
                placeholder="Company"
                value={formData.company}
                onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                required
            />
            <input
                type="text"
                className="border p-2 w-full"
                placeholder="GVW"
                value={formData.gvw}
                onChange={(e) => setFormData({ ...formData, gvw: e.target.value })}
                required
            />
            <input
                type="date"
                className="border p-2 w-full"
                placeholder="Registration Date"
                value={formData.registration_date}
                onChange={(e) => setFormData({ ...formData, registration_date: e.target.value })}
                required
            />
            <input
                type="text"
                className="border p-2 w-full"
                placeholder="Owner"
                value={formData.owner}
                onChange={(e) => setFormData({ ...formData, owner: e.target.value })}
                required
            />
            <input
                type="text"
                className="border p-2 w-full"
                placeholder="Unloaded Weight"
                value={formData.unloaded_weight}
                onChange={(e) => setFormData({ ...formData, unloaded_weight: e.target.value })}
                required
            />
            <input
                type="date"
                className="border p-2 w-full"
                placeholder="Tax Validity"
                value={formData.tax_validity}
                onChange={(e) => setFormData({ ...formData, tax_validity: e.target.value })}
                required
            />
            <input
                type="date"
                className="border p-2 w-full"
                placeholder="Insurance Validity"
                value={formData.insurance_validity}
                onChange={(e) => setFormData({ ...formData, insurance_validity: e.target.value })}
                required
            />
            <input
                type="date"
                className="border p-2 w-full"
                placeholder="Fitness Validity"
                value={formData.fitness_validity}
                onChange={(e) => setFormData({ ...formData, fitness_validity: e.target.value })}
                required
            />
            <input
                type="date"
                className="border p-2 w-full"
                placeholder="Permit Validity"
                value={formData.permit_validity}
                onChange={(e) => setFormData({ ...formData, permit_validity: e.target.value })}
                required
            />
            <input
                type="text"
                className="border p-2 w-full"
                placeholder="Direct Truck"
                value={formData.direct_truck}
                onChange={(e) => setFormData({ ...formData, direct_truck: e.target.value })}
                required
            />
            <input
                type="date"
                className="border p-2 w-full"
                placeholder="Created At"
                value={formData.created_at}
                onChange={(e) => setFormData({ ...formData, created_at: e.target.value })}
                required
            />
            <button
                type="submit"
                className="bg-blue-600 text-white px-4 py-2 rounded-md w-full hover:bg-blue-700"
                disabled={!isFormValid}
            >
                {selectedTruck ? "Update" : "Add"} Truck
            </button>
        </form>
    );
};

export default TruckForm;

>>>>>>> 59f95b0 (Resolved merge conflicts)
