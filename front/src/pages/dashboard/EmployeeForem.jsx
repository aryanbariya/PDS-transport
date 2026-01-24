import React, { useState, useEffect, useRef } from "react";
import Swal from "sweetalert2";

const URL = import.meta.env.VITE_API_BACK_URL;

const EmployeeForm = ({ onClose, onSave, editData }) => {
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
    contact: "",
  });

  const [godownList, setGodownList] = useState([]);
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  const [categoryList, setCategoryList] = useState([]);
  const [categorySearch, setCategorySearch] = useState("");
  const [showCategoryDropdown, setShowCategoryDropdown] = useState(false);


  useEffect(() => {
    const fetchGodowns = async () => {
      try {
        const response = await fetch(`${URL}/api/employees/subgodowns?nopagination=true`);
        if (!response.ok) throw new Error("Failed to fetch godowns");
        const data = await response.json();
        setGodownList(data || []);
      } catch (error) {
        console.error("Error fetching godowns:", error);
        setGodownList([]);
      }
    };

    const fetchCategories = async () => {
      try {
        const response = await fetch(`${URL}/api/employees/categories?nopagination=true`);
        if (!response.ok) throw new Error("Failed to fetch categories");
        const data = await response.json();
        setCategoryList(data || []);
      } catch (error) {
        console.error("Error fetching categories:", error);
        setCategoryList([]);
      }
    };

    fetchGodowns();
    fetchCategories();
  }, []);

  useEffect(() => {
    if (editData) {
      setFormData({
        category: editData.category || "",
        fullName: editData.fullName || "",
        username: editData.username || "",
        password: "", // Keep it empty when editing
        address: editData.address || "",
        aadharNo: editData.aadharNo || "",
        panNo: editData.panNo || "",
        bankName: editData.bankName || "",
        accountNumber: editData.accountNumber || "",
        ifscCode: editData.ifscCode || "",
        branchName: editData.branchName || "",
        subGodown: editData.subGodown || "",
        contact: editData.contact || "",
      });
      setSearch(editData.subGodown || "");
      setCategorySearch(editData.category || "");
    }
  }, [editData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    let updatedValue = value;

    if (name === "contact") {
      updatedValue = value.replace(/\D/g, "").slice(0, 10);
    }

    if (["fullName", "bankName"].includes(name)) {
      updatedValue = value.charAt(0).toUpperCase() + value.slice(1);
    }

    setFormData({ ...formData, [name]: updatedValue });
    if (errors[name]) {
      setErrors(prevErrors => ({ ...prevErrors, [name]: "" }));
    }
  };

  const handleSelectGodown = (subGodown) => {
    setFormData({ ...formData, subGodown });
    setSearch(subGodown);
    setShowDropdown(false);
  };

  const handleSelectCategory = (category) => {
    setFormData({ ...formData, category });
    setCategorySearch(category);
    setShowCategoryDropdown(false);
  };






  const validateForm = () => {
    let newErrors = {};

    if (!formData.category) newErrors.category = "Category is required";
    if (!formData.fullName) newErrors.fullName = "Full Name is required";
    if (!formData.username) newErrors.username = "Username is required";
    if (!editData && !formData.password) newErrors.password = "Password is required";
    if (!formData.subGodown) newErrors.subGodown = "Sub Godown is required";
    if (!formData.contact) newErrors.contact = "Contact is required";

    if (formData.aadharNo && !formData.aadharNo.match(/^\d{12}$/)) {
      newErrors.aadharNo = "Aadhar No must be 12 digits";
    }
    if (formData.panNo && !formData.panNo.match(/^[A-Z]{5}\d{4}[A-Z]{1}$/)) {
      newErrors.panNo = "Invalid PAN No format";
    }
    if (formData.accountNumber && !formData.accountNumber.match(/^\d{9,18}$/)) {
      newErrors.accountNumber = "Account Number must be 9-18 digits";
    }
    if (formData.ifscCode && !formData.ifscCode.match(/^[A-Z]{4}0[A-Z0-9]{6}$/)) {
      newErrors.ifscCode = "Invalid IFSC Code format";
    }
    if (formData.contact && !formData.contact.match(/^\d{10}$/)) {
      newErrors.contact = "Contact must be exactly 10 digits";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsLoading(true);
    try {
      const method = editData ? "PUT" : "POST";
      const url = editData ? `${URL}/api/employees/${editData.uuid}` : `${URL}/api/employees`;

      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        Swal.fire({
          icon: "success",
          title: editData ? "Employee updated successfully!" : "Employee added successfully!",
          showConfirmButton: false,
          timer: 1500,
        }).then(() => {
          onSave();
          onClose();
        });
      } else {
        Swal.fire({ icon: "error", title: "Error", text: "Failed to submit form" });
      }
    } catch (error) {
      console.error("Error submitting data:", error);
      Swal.fire({ icon: "error", title: "Error", text: "Error submitting data" });
    } finally {
      setIsLoading(false);
    }
  };

  const renderInputField = (field, label, type = "text") => {
    return (
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          {label}
          {["category", "fullName", "username", "password", "subGodown", "contact"].includes(field) &&
            <span className="text-red-500 ml-1">*</span>}
        </label>
        <input
          type={type}
          name={field}
          value={formData[field]}
          onChange={handleChange}
          className={`p-2 border ${errors[field] ? 'border-red-500' : 'border-gray-300'} rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500`}
          placeholder={`Enter ${label}`}
        />
        {errors[field] && <p className="text-red-500 text-xs mt-1">{errors[field]}</p>}
      </div>
    );
  };

  const renderDropdown = (field, label, options, searchValue, setSearchValue, showDropdown, setShowDropdown, handleSelect) => {
    return (
      <div className="mb-4 relative">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          {label}
          <span className="text-red-500 ml-1">*</span>
        </label>
        <input
          type="text"
          value={searchValue}
          onClick={() => setShowDropdown(true)}
          onChange={(e) => {
            setSearchValue(e.target.value);
            setShowDropdown(true);
          }}
          className={`p-2 border ${errors[field] ? 'border-red-500' : 'border-gray-300'} rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500`}
          placeholder={`Search ${label}`}
        />
        {showDropdown && (
          <div className="absolute z-10 bg-white border rounded-md w-full max-h-40 overflow-auto shadow-lg mt-1">
            {options
              .filter((option) =>
                option[field === "category" ? "category_name" : "subGodown"]
                  .toLowerCase()
                  .includes(searchValue.toLowerCase())
              )
              .map((option, index) => (
                <div
                  key={index}
                  onClick={() => handleSelect(option[field === "category" ? "category_name" : "subGodown"])}
                  className="p-2 hover:bg-gray-200 cursor-pointer"
                >
                  {option[field === "category" ? "category_name" : "subGodown"]}
                </div>
              ))}
          </div>
        )}
        {errors[field] && <p className="text-red-500 text-xs mt-1">{errors[field]}</p>}
      </div>
    );
  };

  if (isLoading) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 z-50">
        <div className="bg-white rounded-lg shadow-lg p-6">
          <div className="flex items-center space-x-3">
            <div className="w-6 h-6 border-t-2 border-blue-500 border-solid rounded-full animate-spin"></div>
            <span>Loading...</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 z-50">
      <div className="bg-white rounded-lg shadow-lg w-4/5 max-w-3xl p-6">
        <h2 className="bg--600 text-black text-xl font-semibold py-3 px-4 rounded-t-lg text-center">
          {editData ? "Edit Employee" : "Employee"}
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-x-6">
            {/* Section: Basic Information */}
            <div className="md:col-span-1 bg-gray-50 p-4 rounded-lg">
              <h3 className="font-medium text-gray-700 mb-3 border-b pb-2">Basic Information</h3>
              {renderDropdown("category", "Category", categoryList, categorySearch, setCategorySearch, showCategoryDropdown, setShowCategoryDropdown, handleSelectCategory)}
              {renderInputField("fullName", "Full Name")}
              {renderInputField("contact", "Contact Number")}
              {renderInputField("address", "Address")}
            </div>

            {/* Section: Login Information */}
            <div className="md:col-span-1 bg-gray-50 p-4 rounded-lg">
              <h3 className="font-medium text-gray-700 mb-3 border-b pb-2">Login Information</h3>
              {renderInputField("username", "Username")}
              {renderInputField("password", "Password", "password")}
              {renderDropdown("subGodown", "Sub Godown", godownList, search, setSearch, showDropdown, setShowDropdown, handleSelectGodown)}
            </div>

            {/* Section: Bank Information */}
            <div className="md:col-span-1 bg-gray-50 p-4 rounded-lg">
              <h3 className="font-medium text-gray-700 mb-3 border-b pb-2">Bank Information</h3>
              {renderInputField("bankName", "Bank Name")}
              {renderInputField("accountNumber", "Account Number")}
              {renderInputField("ifscCode", "IFSC Code")}
              {renderInputField("branchName", "Branch Name")}
              {renderInputField("aadharNo", "Aadhar Number")}
              {renderInputField("panNo", "PAN Number")}
            </div>
          </div>

          <div className="flex justify-end space-x-3 mt-6 pt-4 border-t">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              {editData ? "Update" : "Submit"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EmployeeForm;


