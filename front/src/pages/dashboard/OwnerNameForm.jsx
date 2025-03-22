// import React, { useState, useEffect } from "react";
// import Swal from "sweetalert2"; // Import SweetAlert2
// const URL = import.meta.env.VITE_API_BACK_URL;

// const OwnerNameForm = ({ onClose, onSave, editData }) => {
//   const [formData, setFormData] = useState({
//     ownerName: "",
//     contact: "",
//     address: "",
//     emailID: "",
//   });

//   const [ownerNameError, setOwnerNameError] = useState(""); // Track error
//   const [loading, setLoading] = useState(false);

//   useEffect(() => {
//     if (editData) {
//       setFormData({
//         ownerName: editData.ownerName || "",
//         contact: editData.contact || "",
//         address: editData.address || "",
//         emailID: editData.emailID || "",
//       });
//     } else {
//       setFormData({ ownerName: "", contact: "", address: "", emailID: "" });
//     }
//   }, [editData]);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     let updatedValue = value;

//     if (name === "ownerName") {
//       updatedValue = value
//         .toLowerCase()
//         .split(" ")
//         .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
//         .join(" ");
//       setOwnerNameError(""); // Clear error when user types
//     }

//     if (name === "contact") {
//       // Allow only digits and limit to 10 characters
//       updatedValue = value.replace(/\D/g, "").slice(0, 10);
//     }

//     setFormData({ ...formData, [name]: updatedValue });
//   };

//   // New focus handler to clear input field
//   const handleFocus = (name) => {
//     setFormData({ ...formData, [name]: "" });
//   };

//   // const handleSubmit = async (e) => {
//   //   e.preventDefault();

//   //   if (!formData.ownerName.trim()) {
//   //     setOwnerNameError("Owner Name is required."); // Show error message
//   //     return;
//   //   }

//   //   setLoading(true); // Start loading

//   //   const method = editData ? "PUT" : "POST";
//   //   const url = editData
//   //     ? `${URL}/api/owners/${editData.uuid}`
//   //     : `${URL}/api/owners`;

//   //   try {
//   //     const response = await fetch(url, {
//   //       method,
//   //       headers: { "Content-Type": "application/json" },
//   //       body: JSON.stringify(formData),
//   //     });

//   //     const data = await response.json();

//   //     if (response.ok) {
//   //       Swal.fire({
//   //         icon: "success",
//   //         title: editData ? "Owner updated successfully!" : "Owner added successfully!",
//   //         showConfirmButton: false,
//   //         timer: 1500,
//   //       }).then(() => {
//   //         onSave();
//   //         onClose();
//   //       });
//   //     } else {
//   //       console.error("Server error:", data);
//   //       Swal.fire({
//   //         icon: "error",
//   //         title: "Error",
//   //         text: data.error || "Error submitting form",
//   //       });
//   //     }
//   //   } catch (error) {
//   //     console.error("Error submitting data:", error);
//   //     Swal.fire({
//   //       icon: "error",
//   //       title: "Error",
//   //       text: "Error submitting form",
//   //     });
//   //   } finally {
//   //     setLoading(false); // Stop loading after request is completed
//   //   }
//   // };
//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     // Validation: Only `ownerName` is required in both Add and Edit
//     if (!formData.ownerName.trim()) {
//         Swal.fire({
//             icon: "error",
//             title: "Validation Error",
//             text: "Owner Name is required.",
//         });
//         return;
//     }

//     setLoading(true); // Start loading

//     const method = editData ? "PUT" : "POST";
//     const url = editData
//         ? `${URL}/api/owners/${editData.uuid}`
//         : `${URL}/api/owners`;

//     // Send only modified fields during update
//     const updatedData = editData
//         ? Object.fromEntries(
//               Object.entries(formData).filter(([key, value]) => value !== editData[key])
//           )
//         : formData;

//     // Ensure at least `ownerName` is sent in update
//     if (editData && !updatedData.ownerName) {
//         updatedData.ownerName = formData.ownerName;
//     }

//     try {
//         const response = await fetch(url, {
//             method,
//             headers: { "Content-Type": "application/json" },
//             body: JSON.stringify(updatedData),
//         });

//         const data = await response.json();

//         if (response.ok) {
//             Swal.fire({
//                 icon: "success",
//                 title: editData ? "Owner updated successfully!" : "Owner added successfully!",
//                 showConfirmButton: false,
//                 timer: 1500,
//             }).then(() => {
//                 onSave();
//                 onClose();
//             });
//         } else {
//             console.error("Server error:", data);
//             Swal.fire({
//                 icon: "error",
//                 title: "Error",
//                 text: data.error || "Error submitting form",
//             });
//         }
//     } catch (error) {
//         console.error("Error submitting data:", error);
//         Swal.fire({
//             icon: "error",
//             title: "Error",
//             text: "Error submitting form",
//         });
//     } finally {
//         setLoading(false); // Stop loading after request is completed
//     }
// };


//   return (
//     <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 z-50">
//       <div className="bg-white rounded-lg shadow-lg w-4/5 max-w-3xl p-6">
//         <h2 className="text-xl font-semibold text-center py-3">
//           {editData ? "Edit Owner" : "Owner"}
//         </h2>
//         <form onSubmit={handleSubmit} className="space-y-4">
//           {Object.keys(formData).map((field) => (
//             <div key={field}>
//               <label className="block text-sm font-medium text-gray-700">
//                 {field
//                   .replace(/([A-Z])/g, " $1")
//                   .replace(/\b\w/g, (char) => char.toUpperCase())
//                   .trim()}
//               </label>
//               <input
//                 type={field === "emailID" ? "email" : "text"}
//                 name={field}
//                 placeholder={`Enter ${field}`}
//                 value={formData[field]}
//                 onChange={handleChange}
//                 onFocus={() => handleFocus(field)} // Attach focus handler here
//                 className={`p-2 border rounded-lg w-full ${field === "ownerName" && ownerNameError ? "border-red-500" : ""
//                   }`}
//               />
//               {field === "ownerName" && ownerNameError && (
//                 <p className="text-red-500 text-sm mt-1">{ownerNameError}</p>
//               )}
//             </div>
//           ))}
//           <div className="flex justify-end space-x-2">
//             <button
//               type="submit"
//               className="py-2 px-4 rounded-lg bg-blue-600 text-white hover:bg-blue-700"
//               disabled={loading}
//             >
//               {loading ? "Submitting..." : editData ? "Update" : "Submit"}
//             </button>
//             <button
//               type="button"
//               className="bg-gray-600 text-white py-2 px-4 rounded-lg hover:bg-gray-700"
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

// export default OwnerNameForm;



import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";

const URL = import.meta.env.VITE_API_BACK_URL;

const OwnerNameForm = ({ onClose, onSave, editData }) => {
  const [formData, setFormData] = useState({
    ownerName: "",
    contact: "",
    address: "",
    emailID: "",
  });

  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (editData) {
      setFormData(editData);
    }
  }, [editData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    let updatedValue = value;

    if (name === "ownerName") {
      updatedValue = value
        .toLowerCase()
        .split(" ")
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ");
    }

    if (name === "contact") {
      updatedValue = value.replace(/\D/g, "").slice(0, 10);
    }

    setFormData({ ...formData, [name]: updatedValue });

    if (errors[name]) {
      setErrors(prevErrors => ({ ...prevErrors, [name]: "" }));
    }
  };

  const validateForm = () => {
    let newErrors = {};
    if (!formData.ownerName.trim()) newErrors.ownerName = "Owner Name is required";
    if (!formData.contact.trim()) newErrors.contact = "Contact is required";
    // Add more validation as needed
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsLoading(true);
    try {
      const method = editData ? "PUT" : "POST";
      const url = editData ? `${URL}/api/owners/${editData.uuid}` : `${URL}/api/owners`;

      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        Swal.fire({
          icon: "success",
          title: editData ? "Owner updated successfully!" : "Owner added successfully!",
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
          text: "Failed to submit form" 
        });
      }
    } catch (error) {
      console.error("Error submitting data:", error);
      Swal.fire({ 
        icon: "error", 
        title: "Error", 
        text: "Error submitting data" 
      });
    } finally {
      setIsLoading(false);
    }
  };

  const renderInputField = (field, label, type = "text") => {
    return (
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          {label}
          {field === "ownerName" && <span className="text-red-500 ml-1">*</span>}
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
      <div className="bg-white rounded-lg shadow-lg w-4/5 max-w-3xl p-6 max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center border-b pb-4 mb-6">
          <h2 className="text-xl font-semibold">{editData ? "Edit Owner Details" : "Add New Owner"}</h2>
          <button 
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 focus:outline-none"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6">
            <div className="md:col-span-1 bg-gray-50 p-4 rounded-lg">
              <h3 className="font-medium text-gray-700 mb-3 border-b pb-2">Owner Information</h3>
              {renderInputField("ownerName", "Owner Name")}
              {renderInputField("contact", "Contact")}
            </div>

            <div className="md:col-span-1 bg-gray-50 p-4 rounded-lg">
              <h3 className="font-medium text-gray-700 mb-3 border-b pb-2">Additional Information</h3>
              {renderInputField("address", "Address")}
              {renderInputField("emailID", "Email", "email")}
            </div>
          </div>

          <div className="flex justify-end space-x-3 mt-6 pt-4 border-t">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
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

export default OwnerNameForm;