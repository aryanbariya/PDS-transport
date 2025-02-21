import React, { useState, useEffect } from "react";

const OwnerNameForm = ({ onClose, onSave, editData }) => {
  const [formData, setFormData] = useState({
    ownerName: "",
    contact: "",
    address: "",
    emailID: "",
  });

  const [errors, setErrors] = useState({
    ownerName: "",
    contact: "",
    address: "",
    emailID: "",
  });

  useEffect(() => {
    if (editData) {
      setFormData({
        ownerName: editData.ownerName || "",
        contact: editData.contact || "",
        address: editData.address || "",
        emailID: editData.emailID || "",
      });
    } else {
      setFormData({ ownerName: "", contact: "", address: "", emailID: "" });
    }
  }, [editData]);

  const validateField = (name, value) => {
    let errorMsg = "";

    switch (name) {
      case "ownerName":
        if (!/^[A-Za-z ]{3,}$/.test(value)) {
          errorMsg = "Owner Name must be at least 3 letters (no numbers).";
        }
        break;
      case "contact":
        if (!/^\d{10}$/.test(value)) {
          errorMsg = "Contact must be exactly 10 digits.";
        }
        break;
      case "address":
        if (value.trim().length < 5) {
          errorMsg = "Address must be at least 5 characters.";
        }
        break;
      case "emailID":
        if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(value)) {
          errorMsg = "Enter a valid email address.";
        }
        break;
      default:
        break;
    }

    setErrors((prevErrors) => ({ ...prevErrors, [name]: errorMsg }));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    validateField(name, value);
  };

  const isFormValid = Object.values(errors).every((error) => error === "") &&
                      Object.values(formData).every((value) => value.trim() !== "");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isFormValid) {
      alert("Please fill in all fields correctly.");
      return;
    }

    const method = editData ? "PUT" : "POST";
    const url = editData
      ? `http://localhost:5000/api/owners/${editData.uuid}`
      : "http://localhost:5000/api/owners";

    try {
      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        alert(editData ? "Owner updated successfully!" : "Owner added successfully!");
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
          {editData ? "Edit Owner" : "Add Owner"}
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          {["ownerName", "contact", "address", "emailID"].map((field) => (
            <div key={field}>
              <label className="block text-sm font-medium text-gray-700">
                {field.replace(/([A-Z])/g, " $1").trim()}
              </label>
              <input
                type={field === "emailID" ? "email" : "text"}
                name={field}
                placeholder={`Enter ${field}`}
                value={formData[field]}
                onChange={handleChange}
                required
                className="p-2 border rounded-lg w-full"
              />
              {errors[field] && (
                <p className="text-red-600 text-sm mt-1">{errors[field]}</p>
              )}
            </div>
          ))}
          <div className="flex justify-between">
            <button
              type="submit"
              disabled={!isFormValid}
              className={`py-2 px-4 rounded-lg ${
                isFormValid ? "bg-blue-600 text-white hover:bg-blue-700" : "bg-gray-400 text-gray-700 cursor-not-allowed"
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

export default OwnerNameForm;
