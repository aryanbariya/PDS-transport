// import React, { useState, useEffect } from "react";
// const URL = import.meta.env.VITE_API_BACK_URL;

// const DriverForm = ({ onClose, onSave, editData }) => {
//   const [formData, setFormData] = useState({
//     driver_name: "",
//     aadhar_card_no: "",
//     contact: "",
//     driving_license_no: "",
//   });

//   useEffect(() => {
//     if (editData) {
//       setFormData({
//         driver_name: editData.driver_name || "",
//         aadhar_no: editData.aadhar_card_no || "",
//         contact: editData.contact || "",
//         license_no: editData.driving_license_no || "",
//       });
//     }
//   }, [editData]);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     const method = editData ? "PUT" : "POST";
//     const url = editData
//       ? `${URL}/api/drivers/${editData.uuid}`
//       : `${URL}/api/drivers`;

//     try {
//       const response = await fetch (url, {
//         method,
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(formData),
//       });

//       if (response.ok) {
//         alert(editData ? "Driver updated successfully!" : "Driver added successfully!");
//         onSave();
//         onClose();
//       } else {
//         alert("Error submitting form");
//       }
//     } catch (error) {
//       console.error("Error submitting data:", error);
//       alert("Error submitting form");
//     }
//   };

//   return (
//     <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 z-50">
//       <div className="bg-white rounded-lg shadow-lg w-4/5 max-w-2xl p-6">
//         <h2 className="bg-white-600 text-Black text-xl font-semibold py-3 px-4 rounded-t-lg text-center">
//           {editData ? "Edit Driver" : "Driver"}
//         </h2>
//         <form onSubmit={handleSubmit} className="space-y-4">
//           <div className="grid grid-cols-2 gap-4">
//             {["driver_name", "aadhar_card_no", "contact", "driving_license_no"].map((field) => (
//               <div key={field}>
//                 <label className="block text-sm font-medium text-gray-700">
//                   {field.replace("_", " ").toUpperCase()}
//                 </label>
//                 <input
//                   type="text"
//                   name={field}
//                   value={formData[field]}
//                   onChange={handleChange}
//                   className="p-2 border rounded-lg w-full"
//                 />
//               </div>
//             ))}
//           </div>
//           <div className="flex justify-between">
//             <button type="submit" className="bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700">
//               {editData ? "Update" : "Submit"}
//             </button>
//             <button type="button" className="bg-red-600 text-white py-2 px-4 rounded-lg hover:bg-red-700" onClick={onClose}>
//               Close
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default DriverForm;



// import React, { useState, useEffect } from "react";
// const URL = import.meta.env.VITE_API_BACK_URL;

// const DriverForm = ({ onClose, onSave, editData }) => {
//   const [formData, setFormData] = useState({
//     driver_name: "",
//     aadhar_card_no: "",
//     contact: "",
//     driving_license_no: "",
//   });

//   useEffect(() => {
//     if (editData) {
//       setFormData({
//         driver_name: editData.driver_name || "",
//         aadhar_card_no: editData.aadhar_card_no || "",
//         contact: editData.contact || "",
//         driving_license_no: editData.driving_license_no || "",
//       });
//     }
//   }, [editData]);

//   const handleChange = (e) => {
//     const { name, value } = e.target;

//     // Auto-capitalize first letter for driver_name
//     const newValue =
//       name === "driver_name" ? value.charAt(0).toUpperCase() + value.slice(1) : value;

//     setFormData({ ...formData, [name]: newValue });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     const method = editData ? "PUT" : "POST";
//     const url = editData
//       ? `${URL}/api/drivers/${editData.uuid}`
//       : `${URL}/api/drivers`;

//     try {
//       const response = await fetch(url, {
//         method,
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(formData),
//       });

//       if (response.ok) {
//         alert(editData ? "Driver updated successfully!" : "Driver added successfully!");
//         onSave();
//         onClose();
//       } else {
//         alert("Error submitting form");
//       }
//     } catch (error) {
//       console.error("Error submitting data:", error);
//       alert("Error submitting form");
//     }
//   };

//   return (
//     <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 z-50">
//       <div className="bg-white rounded-lg shadow-lg w-4/5 max-w-2xl p-6">
//         <h2 className="bg-white-600 text-black text-xl font-semibold py-3 px-4 rounded-t-lg text-center">
//           {editData ? "Edit Driver" : "Driver"}
//         </h2>
//         <form onSubmit={handleSubmit} className="space-y-4">
//           <div className="grid grid-cols-2 gap-4">
//             {["driver_name", "aadhar_card_no", "contact", "driving_license_no"].map((field) => (
//               <div key={field}>
//                 <label className="block text-sm font-medium text-gray-700">
//                   {field.replace("_", " ").toUpperCase()}
//                 </label>
//                 <input
//                   type="text"
//                   name={field}
//                   value={formData[field]}
//                   onChange={handleChange}
//                   className="p-2 border rounded-lg w-full"
//                 />
//               </div>
//             ))}
//           </div>
//           {/* Buttons aligned to the right */}
//           <div className="flex justify-end space-x-4">
//             <button type="submit" className="bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700">
//               {editData ? "Update" : "Submit"}
//             </button>
//             <button type="button" className="bg-red-600 text-white py-2 px-4 rounded-lg hover:bg-red-700" onClick={onClose}>
//               Close
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default DriverForm;



// import React, { useState, useEffect } from "react";
// const URL = import.meta.env.VITE_API_BACK_URL;

// const DriverForm = ({ onClose, onSave, editData }) => {
//   const [formData, setFormData] = useState({
//     driver_name: "",
//     aadhar_card_no: "",
//     contact: "",
//     driving_license_no: "",
//   });
//   const [errors, setErrors] = useState({});

//   useEffect(() => {
//     if (editData) {
//       setFormData({
//         driver_name: editData.driver_name || "",
//         aadhar_card_no: editData.aadhar_card_no || "",
//         contact: editData.contact || "",
//         driving_license_no: editData.driving_license_no || "",
//       });
//     }
//   }, [editData]);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     let newValue = value;

//     if (name === "driver_name") {
//       newValue = value.charAt(0).toUpperCase() + value.slice(1);
//     }

//     setFormData({ ...formData, [name]: newValue });
//     setErrors({ ...errors, [name]: "" }); // Clear errors on change
//   };

//   const validateForm = () => {
//     let newErrors = {};
//     if (!formData.driver_name.trim()) {
//       newErrors.driver_name = "Driver name is required";
//     }
//     setErrors(newErrors);
//     return Object.keys(newErrors).length === 0;
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!validateForm()) return;

//     const method = editData ? "PUT" : "POST";
//     const url = editData ? `${URL}/api/drivers/${editData.uuid}` : `${URL}/api/drivers`;

//     try {
//       const response = await fetch(url, {
//         method,
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(formData),
//       });

//       if (response.ok) {
//         alert(editData ? "Driver updated successfully!" : "Driver added successfully!");
//         onSave();
//         onClose();
//       } else {
//         alert("Error submitting form");
//       }
//     } catch (error) {
//       console.error("Error submitting data:", error);
//       alert("Error submitting form");
//     }
//   };

//   return (
//     <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 z-50">
//       <div className="bg-white rounded-lg shadow-lg w-4/5 max-w-2xl p-6">
//         <h2 className="bg-white-600 text-black text-xl font-semibold py-3 px-4 rounded-t-lg text-center">
//           {editData ? "Edit Driver" : "Driver"}
//         </h2>
//         <form onSubmit={handleSubmit} className="space-y-4">
//           <div className="grid grid-cols-2 gap-4">
//             {["driver_name", "aadhar_card_no", "contact", "driving_license_no"].map((field) => (
//               <div key={field}>
//                 <label className="block text-sm font-medium text-gray-700">
//                   {field.replace("_", " ").toUpperCase()}
//                 </label>
//                 <input
//                   type="text"
//                   name={field}
//                   value={formData[field]}
//                   onChange={handleChange}
//                   className="p-2 border rounded-lg w-full"
//                 />
//                 {errors[field] && <p className="text-red-500 text-xs mt-1">{errors[field]}</p>}
//               </div>
//             ))}
//           </div>
//           <div className="flex justify-end space-x-4">
//             <button type="submit" className="bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700">
//               {editData ? "Update" : "Submit"}
//             </button>
//             <button type="button" className="bg-red-600 text-white py-2 px-4 rounded-lg hover:bg-red-700" onClick={onClose}>
//               Close
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default DriverForm;
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// import React, { useState, useEffect } from "react";
// import Swal from "sweetalert2"; // Import SweetAlert2
// const URL = import.meta.env.VITE_API_BACK_URL;

// const DriverForm = ({ onClose, onSave, editData }) => {
//   const [formData, setFormData] = useState({
//     driver_name: "",
//     aadhar_card_no: "",
//     contact: "",
//     driving_license_no: "",
//   });
//   const [errors, setErrors] = useState({});

//   useEffect(() => {
//     if (editData) {
//       setFormData({
//         driver_name: editData.driver_name || "",
//         aadhar_card_no: editData.aadhar_card_no || "",
//         contact: editData.contact || "",
//         driving_license_no: editData.driving_license_no || "",
//       });
//     }
//   }, [editData]);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     let newValue = value;

//     if (name === "driver_name") {
//       newValue = value.charAt(0).toUpperCase() + value.slice(1);
//     }

//     setFormData({ ...formData, [name]: newValue });
//     setErrors({ ...errors, [name]: "" }); // Clear errors on change
//   };

//   const validateForm = () => {
//     let newErrors = {};
//     if (!formData.driver_name.trim()) {
//       newErrors.driver_name = "Driver name is required";
//     }
//     setErrors(newErrors);
//     return Object.keys(newErrors).length === 0;
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!validateForm()) return;

//     const method = editData ? "PUT" : "POST";
//     const url = editData ? `${URL}/api/drivers/${editData.uuid}` : `${URL}/api/drivers`;

//     try {
//       const response = await fetch(url, {
//         method,
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(formData),
//       });

//       if (response.ok) {
//         Swal.fire({
//           icon: "success",
//           title: editData ? "Driver updated successfully!" : "Driver added successfully!",
//           showConfirmButton: false,
//           timer: 1500,
//         }).then(() => {
//           onSave();
//           onClose();
//         });
//       } else {
//         Swal.fire({
//           icon: "error",
//           title: "Error",
//           text: "Failed to submit form",
//         });
//       }
//     } catch (error) {
//       console.error("Error submitting data:", error);
//       Swal.fire({
//         icon: "error",
//         title: "Error",
//         text: "Error submitting data",
//       });
//     }
//   };

//   return (
//     <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 z-50">
//       <div className="bg-white rounded-lg shadow-lg w-4/5 max-w-2xl p-6">
//         <h2 className="bg-white-600 text-black text-xl font-semibold py-3 px-4 rounded-t-lg text-center">
//           {editData ? "Edit Driver" : "Driver"}
//         </h2>
//         <form onSubmit={handleSubmit} className="space-y-4">
//           <div className="grid grid-cols-2 gap-4">
//             {["driver_name", "aadhar_card_no", "contact", "driving_license_no"].map((field) => (
//               <div key={field}>
//                 <label className="block text-sm font-medium text-gray-700">
//                   {field.replace("_", " ").toUpperCase()}
//                 </label>
//                 <input
//                   type="text"
//                   name={field}
//                   value={formData[field]}
//                   onChange={handleChange}
//                   autoComplete="off" // Prevent autocomplete
//                   className="p-2 border rounded-lg w-full"
//                 />
//                 {errors[field] && <p className="text-red-500 text-xs mt-1">{errors[field]}</p>}
//               </div>
//             ))}
//           </div>
//           <div className="flex justify-end space-x-4">
//             <button type="submit" className="bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700">
//               {editData ? "Update" : "Submit"}
//             </button>
//             <button type="button" className="bg-red-600 text-white py-2 px-4 rounded-lg hover:bg-red-700" onClick={onClose}>
//               Close
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default DriverForm;



import React, { useState, useEffect } from "react";
import Swal from "sweetalert2"; // Import SweetAlert2
const URL = import.meta.env.VITE_API_BACK_URL;

const DriverForm = ({ onClose, onSave, editData }) => {
  const [formData, setFormData] = useState({
    driver_name: "",
    aadhar_card_no: "",
    contact: "",
    driving_license_no: "",
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (editData) {
      setFormData({
        driver_name: editData.driver_name || "",
        aadhar_card_no: editData.aadhar_card_no || "",
        contact: editData.contact || "",
        driving_license_no: editData.driving_license_no || "",
      });
    }
  }, [editData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    let newValue = value;

    if (name === "driver_name") {
      newValue = value.charAt(0).toUpperCase() + value.slice(1);
    }
    if (name === "contact") {
      // Allow only digits and limit to 10 characters
      newValue = value.replace(/\D/g, "").slice(0, 10);
    }

    setFormData({ ...formData, [name]: newValue });
    setErrors({ ...errors, [name]: "" }); // Clear errors on change
  };

  const validateForm = () => {
    let newErrors = {};
  
    // Validate Driver Name (Required)
    if (!formData.driver_name.trim()) {
      newErrors.driver_name = "Driver name is required";
    } else if (!/^[A-Za-z\s]+$/.test(formData.driver_name)) {
      newErrors.driver_name = "Driver name should only contain alphabets";
    }
  
    // Validate Aadhar Card Number (Optional, but should be 12 digits if entered)
    if (formData.aadhar_card_no.trim() && !/^\d{12}$/.test(formData.aadhar_card_no)) {
      newErrors.aadhar_card_no = "Aadhar Card Number must be exactly 12 digits";
    }
  
    // Validate Contact Number (Optional, but should be 10 digits if entered)
    if (formData.contact.trim() && !/^\d{10}$/.test(formData.contact)) {
      newErrors.contact = "Contact number must be exactly 10 digits";
    }
  
    // Validate Driving License Number (Optional, but should be alphanumeric)
    if (formData.driving_license_no.trim() && !/^[A-Za-z0-9]+$/.test(formData.driving_license_no)) {
      newErrors.driving_license_no = "Invalid Driving License format";
    }
  
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    const method = editData ? "PUT" : "POST";
    const url = editData ? `${URL}/api/drivers/${editData.uuid}` : `${URL}/api/drivers`;

    try {
      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        Swal.fire({
          icon: "success",
          title: editData ? "Driver updated successfully!" : "Driver added successfully!",
          showConfirmButton: false,
          timer: 1500,
        }).then(() => {
          onSave();
          onClose();
        });
      } else {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "Failed to submit form",
        });
      }
    } catch (error) {
      console.error("Error submitting data:", error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Error submitting data",
      });
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 z-50">
      <div className="bg-white rounded-lg shadow-lg w-4/5 max-w-2xl p-6">
        <h2 className="bg-white-600 text-black text-xl font-semibold py-3 px-4 rounded-t-lg text-center">
          {editData ? "Edit Driver" : "Driver"}
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            {["driver_name", "aadhar_card_no", "contact", "driving_license_no"].map((field) => (
              <div key={field}>
                <label className="block text-sm font-medium text-gray-700">
                  {field.replace("_", " ").toUpperCase()}
                </label>
                <input
                  type="text"
                  name={field}
                  value={formData[field]}
                  onChange={handleChange}
                  autoComplete="off" // Prevent autocomplete
                  className="p-2 border rounded-lg w-full"
                />
                {errors[field] && <p className="text-red-500 text-xs mt-1">{errors[field]}</p>}
              </div>
            ))}
          </div>
          <div className="flex justify-end space-x-4">
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

export default DriverForm;
