// import React, { useState, useEffect,useRef } from "react";
// import Swal from "sweetalert2"; // Import SweetAlert2

// const URL = import.meta.env.VITE_API_BACK_URL;

// const EmployeeForm = ({ onClose, onSave, editData }) => {
//   const [formData, setFormData] = useState({
//     category: "",
//     fullName: "",
//     username: "",
//     password: "",
//     address: "",
//     aadharNo: "",
//     panNo: "",
//     bankName: "",
//     accountNumber: "",
//     ifscCode: "",
//     branchName: "",
//     subGodown: "",
//     contact:"",
//   });


//   const [godownList, setGodownList] = useState([]);
//   const [errors, setErrors] = useState({});
//   const [search, setSearch] = useState("");
//   const [showDropdown, setShowDropdown] = useState(false);
//   const dropdownRef = useRef(null);

//   useEffect(() => {
//     const fetchGodowns = async () => {
//       try {
//         const response = await fetch(`${URL}/api/dropsubgodown`);
//         if (!response.ok) throw new Error("Failed to fetch godowns");

//         const data = await response.json();
//         setGodownList(data || []);
//       } catch (error) {
//         console.error("Error fetching godowns:", error);
//         setGodownList([]);
//       }
//     };

//     fetchGodowns();
//   }, []);

//   // useEffect(() => {
//   //   if (editData) {
//   //     setFormData({
//   //       category: editData.category || "",
//   //       fullName: editData.fullName || "",
//   //       username: editData.username || "",
//   //       password: editData.password || "",
//   //       address: editData.address || "",
//   //       aadharNo: editData.aadharNo || "",
//   //       panNo: editData.panNo || "",
//   //       bankName: editData.bankName || "",
//   //       accountNumber: editData.accountNumber || "",
//   //       ifscCode: editData.ifscCode || "",
//   //       branchName: editData.branchName || "",
//   //       subGodown: editData.subGodown || "",
//   //     });
//   //   }
//   // }, [editData]);
//   useEffect(() => {
//     if (editData) {
//       setFormData({
//         category: editData.category || "",
//         fullName: editData.fullName || "",
//         username: editData.username || "",
//         password: "", // Keep it empty when editing
//         address: editData.address || "",
//         aadharNo: editData.aadharNo || "",
//         panNo: editData.panNo || "",
//         bankName: editData.bankName || "",
//         accountNumber: editData.accountNumber || "",
//         ifscCode: editData.ifscCode || "",
//         branchName: editData.branchName || "",
//         subGodown: editData.subGodown || "",
//         contact: editData.contact || "",
//       });

//       setSearch(editData.subGodown || ""); // Set search to match subGodown
//     }
//   }, [editData]);

//   const handleChange = (e) => {
//     const { name, value } = e.target;

//     let updatedValue = value;

//     if (name === "contact") {
//       updatedValue = value.replace(/\D/g, ""); // Remove non-numeric characters
//       if (updatedValue.length > 10) return; // Restrict to 10 digits
//     }

//     updatedValue = ["fullName", "bankName"].includes(name)
//       ? updatedValue.charAt(0).toUpperCase() + updatedValue.slice(1)
//       : updatedValue;

//     setFormData({ ...formData, [name]: updatedValue });

//     if (errors[name]) {
//       setErrors({ ...errors, [name]: "" });
//     }
//   };

//   // const handleSelectGodown = (subGodown) => {
//   //   setFormData({ ...formData, subGodown });
//   //   setSearch(subGodown);
//   //   setShowDropdown(false);

//   //   // Remove error when a valid subGodown is selected
//   //   if (errors.subGodown) {
//   //     setErrors({ ...errors, subGodown: "" });
//   //   }
//   // };
//   const handleSelectGodown = (subGodown) => {
//     setFormData({ ...formData, subGodown });
//     setSearch(subGodown); // Update search field to display selected godown
//     setShowDropdown(false);
//   };

//   const validateForm = () => {
//     let newErrors = {};

//     if (!formData.category) newErrors.category = "Category is required";
//     if (!formData.fullName) newErrors.fullName = "Full Name is required";
//     if (!formData.username) newErrors.username = "Username is required";
//     if (!editData && !formData.password) newErrors.password = "Password is required";
//     if (!formData.subGodown) newErrors.subGodown = "Sub Godown is required";

//     if (formData.aadharNo && !formData.aadharNo.match(/^\d{12}$/)) {
//       newErrors.aadharNo = "Aadhar No must be 12 digits";
//     }
//     if (formData.panNo && !formData.panNo.match(/^[A-Z]{5}\d{4}[A-Z]{1}$/)) {
//       newErrors.panNo = "Invalid PAN No format";
//     }
//     if (formData.accountNumber && !formData.accountNumber.match(/^\d{9,18}$/)) {
//       newErrors.accountNumber = "Account Number must be 9-18 digits";
//     }
//     if (formData.ifscCode && !formData.ifscCode.match(/^[A-Z]{4}0[A-Z0-9]{6}$/)) {
//       newErrors.ifscCode = "Invalid IFSC Code format";
//     }
//     if (!formData.contact.match(/^\d{10}$/)) {
//       newErrors.contact = "Contact must be exactly 10 digits";
//     }

//     setErrors(newErrors);
//     return Object.keys(newErrors).length === 0;
//   };



//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!validateForm()) return;

//     const method = editData ? "PUT" : "POST";
//     const url = editData
//       ? `${URL}/api/employees/${editData.uuid}`
//       : `${URL}/api/employees`;

//     try {
//       const response = await fetch(url, {
//         method,
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(formData),
//       });

//       if (response.ok) {
//         Swal.fire({
//           icon: "success",
//           title: editData ? "Employee updated successfully!" : "Employee added successfully!",
//           showConfirmButton: false,
//           timer: 1500,
//         }).then(() => {
//           onSave();
//           onClose();
//         });
//       } else {
//         Swal.fire({ icon: "error", title: "Error", text: "Failed to submit form" });
//       }
//     } catch (error) {
//       console.error("Error submitting data:", error);
//       Swal.fire({ icon: "error", title: "Error", text: "Error submitting data" });
//     }
//   };

//   return (
//     <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 z-50">
//       <div className="bg-white rounded-lg shadow-lg w-4/5 max-w-3xl p-6">
//         <h2 className="text-xl font-semibold py-3 px-4 text-center">Employee</h2>
//         <form onSubmit={handleSubmit} className="space-y-4">
//           <div className="grid grid-cols-2 gap-4">
//             <div>
//               <label className="block text-sm font-medium text-gray-700">Category</label>
//               <select name="category" value={formData.category} onChange={handleChange} className="p-2 border rounded-lg w-full">
//                 <option value="">-- Select Category --</option>
//                 <option value="Admin">Admin</option>
//                 <option value="Manager">Manager</option>
//                 <option value="Worker">Worker</option>
//               </select>
//               {errors.category && <p className="text-red-500 text-sm">{errors.category}</p>}
//             </div>

//             {["fullName", "username", "password", "address", "aadharNo", "panNo", "bankName", "accountNumber", "ifscCode", "branchName", "contact"].map((field) => (
//               <div key={field}>
//                 <label className="block text-sm font-medium text-gray-700">{field.replace(/([A-Z])/g, " $1").trim().replace(/^./, (str) => str.toUpperCase())}</label>
//                 <input type={field === "password" ? "password" : "text"} name={field} value={formData[field]} onChange={handleChange} className="p-2 border rounded-lg w-full" placeholder={field === "password" ? (editData ? "Enter new password to update" : "") : `Enter ${field.replace(/([A-Z])/g, " $1").trim()}`}  />
//                 {errors[field] && <p className="text-red-500 text-sm">{errors[field]}</p>}
//               </div>
//             ))}
//             <div className="relative">
//               <label className="block text-sm font-medium text-gray-700">Sub Godown</label>
//               <input
//                 type="text"
//                 name="subGodown"
//                 placeholder="Search or Select Godown"
//                 value={search}
//                 onClick={() => setShowDropdown(true)}
//                 onChange={(e) => {
//                   setSearch(e.target.value);
//                   setShowDropdown(true);
//                 }}
//                 required
//                 className="p-2 border rounded-lg w-full"
//               />
//               {showDropdown && (
//                 <div
//                   ref={dropdownRef}
//                   className="absolute z-10 bg-white border bottom-full rounded-md w-full max-h-40 overflow-auto shadow-lg mt-1"
//                 >
//                   {godownList
//                     .filter((godown) =>
//                       godown.subGodown.toLowerCase().includes(search.toLowerCase())
//                     )
//                     .map((godown, index) => (
//                       <div
//                         key={index}
//                         onClick={() => handleSelectGodown(godown.subGodown)}
//                         className="p-2 hover:bg-gray-200 cursor-pointer"
//                       >
//                         {godown.subGodown}
//                       </div>
//                     ))}
//                 </div>
//               )}
//             </div>
//           </div>
//           <div className="flex justify-end space-x-4">
//             <button
//               type="submit"
//               className="bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700"
//             >
//               {editData ? "Update" : "Submit"}
//             </button>
//             <button
//               type="button"
//               className="bg-red-600 text-white py-2 px-4 rounded-lg hover:bg-red-700"
//               onClick={onClose}
//             >
//               Close
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default EmployeeForm;

import { autocompleteClasses } from "@mui/material";
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
  const [search, setSearch] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  const [categoryList, setCategoryList] = useState([]);
  const [categorySearch, setCategorySearch] = useState("");
  const [showCategoryDropdown, setShowCategoryDropdown] = useState(false);
  const categoryDropdownRef = useRef(null);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const fetchGodowns = async () => {
      try {
        const response = await fetch(`${URL}/api/dropsubgodown`);
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
    const fetchCategories = async () => {
      try {
        const response = await fetch(`${URL}/api/dropcategory`);
        if (!response.ok) throw new Error("Failed to fetch categories");

        const data = await response.json();
        setCategoryList(data || []);
      } catch (error) {
        console.error("Error fetching categories:", error);
        setCategoryList([]);
      }
    };

    fetchCategories();
  }, []);


  // useEffect(() => {
  //   if (editData) {
  //     setFormData({
  //       category: editData.category || "",
  //       fullName: editData.fullName || "",
  //       username: editData.username || "",
  //       password: editData.password || "",
  //       address: editData.address || "",
  //       aadharNo: editData.aadharNo || "",
  //       panNo: editData.panNo || "",
  //       bankName: editData.bankName || "",
  //       accountNumber: editData.accountNumber || "",
  //       ifscCode: editData.ifscCode || "",
  //       branchName: editData.branchName || "",
  //       subGodown: editData.subGodown || "",
  //     });
  //   }
  // }, [editData]);
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

      setSearch(editData.subGodown || ""); // Set search to match subGodown
    }
  }, [editData]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    let updatedValue = value;

    if (name === "contact") {
      updatedValue = value.replace(/\D/g, ""); // Remove non-numeric characters
      if (updatedValue.length > 10) return; // Restrict to 10 digits
    }

    updatedValue = ["fullName", "bankName"].includes(name)
      ? updatedValue.charAt(0).toUpperCase() + updatedValue.slice(1)
      : updatedValue;

    setFormData({ ...formData, [name]: updatedValue });

    if (errors[name]) {
      setErrors({ ...errors, [name]: "" });
    }
  };

  // const handleSelectGodown = (subGodown) => {
  //   setFormData({ ...formData, subGodown });
  //   setSearch(subGodown);
  //   setShowDropdown(false);

  //   // Remove error when a valid subGodown is selected
  //   if (errors.subGodown) {
  //     setErrors({ ...errors, subGodown: "" });
  //   }
  // };
  const handleSelectGodown = (subGodown) => {
    setFormData({ ...formData, subGodown });
    setSearch(subGodown); // Update search field to display selected godown
    setShowDropdown(false);
  };

  const validateForm = () => {
    let newErrors = {};

    if (!formData.category) newErrors.category = "Category is required";
    if (!formData.fullName) newErrors.fullName = "Full Name is required";
    if (!formData.username) newErrors.username = "Username is required";
    if (!editData && !formData.password) newErrors.password = "Password is required";
    if (!formData.subGodown) newErrors.subGodown = "Sub Godown is required";

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
    if (!formData.contact.match(/^\d{10}$/)) {
      newErrors.contact = "Contact must be exactly 10 digits";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };



  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    const method = editData ? "PUT" : "POST";
    const url = editData
      ? `${URL}/api/employees/${editData.uuid}`
      : `${URL}/api/employees`;

    try {
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
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 z-50">
      <div className="bg-white rounded-lg shadow-lg w-4/5 max-w-3xl p-6">
        <h2 className="text-xl font-semibold py-3 px-4 text-center">Employee</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="relative">
              <label className="block text-sm font-medium text-gray-700">Category</label>
              <input
                type="text"
                name="category"
                placeholder="Search or Select Category"
                value={categorySearch}
                onClick={() => setShowCategoryDropdown(true)}
                onChange={(e) => {
                  setCategorySearch(e.target.value);
                  setShowCategoryDropdown(true);
                }}
                required
                className="p-2 border rounded-lg w-full"
              />
              {showCategoryDropdown && (
                <div
                  ref={categoryDropdownRef}
                  className="absolute z-10 bg-white border  rounded-md w-full max-h-40 overflow-auto shadow-lg mt-1"
                >
                  {categoryList
                    .filter((cat) =>
                      cat.category_name.toLowerCase().includes(categorySearch.toLowerCase())
                    )
                    .map((cat, index) => (
                      <div
                        key={index}
                        onClick={() => {
                          setFormData({ ...formData, category: cat.category_name });
                          setCategorySearch(cat.category_name);
                          setShowCategoryDropdown(false);
                        }}
                        className="p-2 hover:bg-gray-200 cursor-pointer"
                      >
                        {cat.category_name}
                      </div>
                    ))}
                </div>
              )}
            </div>
            {/* <div>
              <label className="block text-sm font-medium text-gray-700">Category</label>
              <select name="category" value={formData.category} onChange={handleChange} className="p-2 border rounded-lg w-full">
                <option value="">-- Select Category --</option>
                <option value="Admin">Admin</option>
                <option value="Manager">Manager</option>
                <option value="Worker">Worker</option>
              </select>
              {errors.category && <p className="text-red-500 text-sm">{errors.category}</p>}
            </div> */}

            {["fullName", "username", "password", "address", "aadharNo", "panNo", "bankName", "accountNumber", "ifscCode", "branchName", "contact"].map((field) => (
              <div key={field}>
                <label className="block text-sm font-medium text-gray-700">{field.replace(/([A-Z])/g, " $1").trim().replace(/^./, (str) => str.toUpperCase())}</label>
                <input type={field === "password" ? "password" : "text"} name={field} value={formData[field]} onChange={handleChange} className="p-2 border rounded-lg w-full" placeholder={field === "password" ? (editData ? "Enter new password to update" : "") : `Enter ${field.replace(/([A-Z])/g, " $1").trim()}`} />
                {errors[field] && <p className="text-red-500 text-sm">{errors[field]}</p>}
              </div>
            ))}
            <div className="relative">
              <label className="block text-sm font-medium text-gray-700">Sub Godown</label>
              <input
                type="text"
                name="subGodown"
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
                <div
                  ref={dropdownRef}
                  className="absolute z-10 bg-white border bottom-full rounded-md w-full max-h-40 overflow-auto shadow-lg mt-1"
                >
                  {godownList
                    .filter((godown) =>
                      godown.subGodown.toLowerCase().includes(search.toLowerCase())
                    )
                    .map((godown, index) => (
                      <div
                        key={index}
                        onClick={() => handleSelectGodown(godown.subGodown)}
                        className="p-2 hover:bg-gray-200 cursor-pointer"
                      >
                        {godown.subGodown}
                      </div>
                    ))}
                </div>
              )}
            </div>
          </div>
          <div className="flex justify-end space-x-4">
            <button
              type="submit"
              className="bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700"
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

export default EmployeeForm;


