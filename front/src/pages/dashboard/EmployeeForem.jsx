import React, { useState } from "react";

const EmployeeForm = ({ onClose, onSave }) => {
  const [formData, setFormData] = useState({
    category: "",
    fullName: "",
    username: "",
    password: "",
    address: "",
    aadharNo: "",
    panNo: "",
    bankName: "",
    accountNumber: "",
    ifscCode: "",
    branchName: "",
    subGodown: "",
  });

  const [errors, setErrors] = useState({});
  
  const validateField = (name, value) => {
    let error = "";
    switch (name) {
      case "aadharNo":
        if (!/^[0-9]{12}$/.test(value)) error = "Aadhar must be 12 digits";
        break;
      case "panNo":
        if (!/^[A-Z]{5}[0-9]{4}[A-Z]$/.test(value)) error = "Invalid PAN format";
        break;
      case "accountNumber":
        if (!/^[0-9]{9,18}$/.test(value)) error = "Account number must be 9-18 digits";
        break;
      case "ifscCode":
        if (!/^[A-Z]{4}[0-9]{7}$/.test(value)) error = "Invalid IFSC format";
        break;
      case "username":
        if (value.length < 5) error = "Username must be at least 5 characters";
        break;
      case "password":
        if (!/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/.test(value))
          error = "Password must be 6+ chars with letters & numbers";
        break;
      default:
        if (!value.trim()) error = "This field is required";
    }
    return error;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setErrors({ ...errors, [name]: validateField(name, value) });
  };

  const isFormValid = Object.values(formData).every((value) => value.trim() !== "") &&
                       Object.values(errors).every((error) => !error);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isFormValid) return;

    try {
      const response = await fetch("http://localhost:5000/employees", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        alert("Employee added successfully!");
        onSave(formData);
        setFormData({
          category: "",
          fullName: "",
          username: "",
          password: "",
          address: "",
          aadharNo: "",
          panNo: "",
          bankName: "",
          accountNumber: "",
          ifscCode: "",
          branchName: "",
          subGodown: "",
        });
        setErrors({});
      } else {
        alert("Failed to add employee");
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
          Add Employee
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            {[{
              name: "category", label: "Category", type: "select", options: ["Admin", "Manager", "Worker"]
            }, {
              name: "fullName", label: "Full Name", type: "text"
            }, {
              name: "username", label: "Username", type: "text"
            }, {
              name: "password", label: "Password", type: "password"
            }, {
              name: "address", label: "Address", type: "text"
            }, {
              name: "aadharNo", label: "Aadhar No", type: "text"
            }, {
              name: "panNo", label: "PAN No", type: "text"
            }, {
              name: "bankName", label: "Bank Name", type: "text"
            }, {
              name: "accountNumber", label: "Account Number", type: "text"
            }, {
              name: "ifscCode", label: "IFSC Code", type: "text"
            }, {
              name: "branchName", label: "Branch Name", type: "text"
            }, {
              name: "subGodown", label: "Sub Godown", type: "select", options: ["Warehouse 1", "Warehouse 2"]
            }].map((field) => (
              <div key={field.name}>
                <label className="block text-sm font-medium text-gray-700">{field.label}</label>
                {field.type === "select" ? (
                  <select
                    name={field.name}
                    value={formData[field.name]}
                    onChange={handleChange}
                    className="p-2 border rounded-lg w-full"
                  >
                    <option value="">-- Select {field.label} --</option>
                    {field.options.map((option) => (
                      <option key={option} value={option}>{option}</option>
                    ))}
                  </select>
                ) : (
                  <input
                    type={field.type}
                    name={field.name}
                    placeholder={`Enter ${field.label}`}
                    value={formData[field.name]}
                    onChange={handleChange}
                    className="p-2 border rounded-lg w-full"
                  />
                )}
                {errors[field.name] && <p className="text-red-600 text-xs">{errors[field.name]}</p>}
              </div>
            ))}
          </div>
          <div className="flex justify-between">
            <button type="submit" disabled={!isFormValid} className="py-2 px-4 rounded-lg bg-blue-600 text-white hover:bg-blue-700">
              Submit
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

export default EmployeeForm;