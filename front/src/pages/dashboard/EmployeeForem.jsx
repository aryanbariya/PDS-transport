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

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const isFormValid = Object.values(formData).every((value) => value.trim() !== "");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!isFormValid) return;
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
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
      <div className="bg-white rounded-lg shadow-lg w-4/5 max-w-3xl p-6">
        <h2 className="bg-blue-600 text-white text-xl font-semibold py-3 px-4 rounded-t-lg text-center">
          Add Employee
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            {/* Input Fields */}
            {[
              { name: "category", label: "Category", type: "select", options: ["Admin", "Manager", "Worker"] },
              { name: "fullName", label: "Full Name", type: "text" },
              { name: "username", label: "Username", type: "text" },
              { name: "password", label: "Password", type: "password" },
              { name: "address", label: "Address", type: "text" },
              { name: "aadharNo", label: "Aadhar No", type: "text" },
              { name: "panNo", label: "PAN No", type: "text" },
              { name: "bankName", label: "Bank Name", type: "text" },
              { name: "accountNumber", label: "Account Number", type: "text" },
              { name: "ifscCode", label: "IFSC Code", type: "text" },
              { name: "branchName", label: "Branch Name", type: "text" },
              { name: "subGodown", label: "Sub Godown", type: "select", options: ["Warehouse 1", "Warehouse 2"] },
            ].map((field) => (
              <div key={field.name}>
                <label className="block text-sm font-medium text-gray-700">{field.label}</label>
                {field.type === "select" ? (
                  <select
                    name={field.name}
                    value={formData[field.name]}
                    onChange={handleChange}
                    required
                    className="p-2 border rounded-lg w-full"
                  >
                    <option value="">-- Select {field.label} --</option>
                    {field.options.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                ) : (
                  <input
                    type={field.type}
                    name={field.name}
                    placeholder={`Enter ${field.label}`}
                    value={formData[field.name]}
                    onChange={handleChange}
                    required
                    className="p-2 border rounded-lg w-full"
                  />
                )}
              </div>
            ))}
          </div>

          {/* Buttons */}
          <div className="flex justify-between">
            <button
              type="submit"
              disabled={!isFormValid}
              className={`py-2 px-4 rounded-lg ${
                isFormValid ? "bg-blue-600 text-white hover:bg-blue-700" : "bg-gray-400 text-gray-700 cursor-not-allowed"
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

export default EmployeeForm;

