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

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (!formData.ownerName.trim()) {
//       setOwnerNameError("Owner Name is required."); // Show error message
//       return;
//     }

//     setLoading(true); // Start loading

//     const method = editData ? "PUT" : "POST";
//     const url = editData
//       ? `${URL}/api/owners/${editData.uuid}`
//       : `${URL}/api/owners`;

//     try {
//       const response = await fetch(url, {
//         method,
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(formData),
//       });

//       const data = await response.json();

//       if (response.ok) {
//         Swal.fire({
//           icon: "success",
//           title: editData ? "Owner updated successfully!" : "Owner added successfully!",
//           showConfirmButton: false,
//           timer: 1500,
//         }).then(() => {
//           onSave();
//           onClose();
//         });
//       } else {
//         console.error("Server error:", data);
//         Swal.fire({
//           icon: "error",
//           title: "Error",
//           text: data.error || "Error submitting form",
//         });
//       }
//     } catch (error) {
//       console.error("Error submitting data:", error);
//       Swal.fire({
//         icon: "error",
//         title: "Error",
//         text: "Error submitting form",
//       });
//     } finally {
//       setLoading(false); // Stop loading after request is completed
//     }
//   };

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
//                 className={`p-2 border rounded-lg w-full ${field === "ownerName" && ownerNameError ? "border-red-500" : ""
//                   }`}
//               />
//               {field === "ownerName" && ownerNameError && (
//                 <p className="text-red-500 text-sm mt-1">{ownerNameError}</p>
//               )}
//             </div>
//           ))}
//           <div className="flex justify-end space-x-2">
//   <button
//     type="submit"
//     className="py-2 px-4 rounded-lg bg-blue-600 text-white hover:bg-blue-700"
//     disabled={loading}
//   >
//     {loading ? "Submitting..." : editData ? "Update" : "Submit"}
//   </button>
//   {editData && (
//     <button
//       type="button"
//       className="bg-red-600 text-white py-2 px-4 rounded-lg hover:bg-red-700"
//       onClick={() => handleDelete(editData.uuid)}
//     >
//       Delete
//     </button>
//   )}
//   <button
//     type="button"
//     className="bg-gray-600 text-white py-2 px-4 rounded-lg hover:bg-gray-700"
//     onClick={onClose}
//   >
//     Close
//   </button>
// </div>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default OwnerNameForm;




import React, { useState, useEffect } from "react";
import Swal from "sweetalert2"; // Import SweetAlert2
const URL = import.meta.env.VITE_API_BACK_URL;

const OwnerNameForm = ({ onClose, onSave, editData }) => {
  const [formData, setFormData] = useState({
    ownerName: "",
    contact: "",
    address: "",
    emailID: "",
  });

  const [ownerNameError, setOwnerNameError] = useState(""); // Track error
  const [loading, setLoading] = useState(false);

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

  const handleChange = (e) => {
    const { name, value } = e.target;
    let updatedValue = value;

    if (name === "ownerName") {
      updatedValue = value
        .toLowerCase()
        .split(" ")
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ");
      setOwnerNameError(""); // Clear error when user types
    }

    if (name === "contact") {
      // Allow only digits and limit to 10 characters
      updatedValue = value.replace(/\D/g, "").slice(0, 10);
    }

    setFormData({ ...formData, [name]: updatedValue });
  };

  // New focus handler to clear input field
  const handleFocus = (name) => {
    setFormData({ ...formData, [name]: "" });
  };

  // const handleSubmit = async (e) => {
  //   e.preventDefault();

  //   if (!formData.ownerName.trim()) {
  //     setOwnerNameError("Owner Name is required."); // Show error message
  //     return;
  //   }

  //   setLoading(true); // Start loading

  //   const method = editData ? "PUT" : "POST";
  //   const url = editData
  //     ? `${URL}/api/owners/${editData.uuid}`
  //     : `${URL}/api/owners`;

  //   try {
  //     const response = await fetch(url, {
  //       method,
  //       headers: { "Content-Type": "application/json" },
  //       body: JSON.stringify(formData),
  //     });

  //     const data = await response.json();

  //     if (response.ok) {
  //       Swal.fire({
  //         icon: "success",
  //         title: editData ? "Owner updated successfully!" : "Owner added successfully!",
  //         showConfirmButton: false,
  //         timer: 1500,
  //       }).then(() => {
  //         onSave();
  //         onClose();
  //       });
  //     } else {
  //       console.error("Server error:", data);
  //       Swal.fire({
  //         icon: "error",
  //         title: "Error",
  //         text: data.error || "Error submitting form",
  //       });
  //     }
  //   } catch (error) {
  //     console.error("Error submitting data:", error);
  //     Swal.fire({
  //       icon: "error",
  //       title: "Error",
  //       text: "Error submitting form",
  //     });
  //   } finally {
  //     setLoading(false); // Stop loading after request is completed
  //   }
  // };
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation: Only `ownerName` is required in both Add and Edit
    if (!formData.ownerName.trim()) {
        Swal.fire({
            icon: "error",
            title: "Validation Error",
            text: "Owner Name is required.",
        });
        return;
    }

    setLoading(true); // Start loading

    const method = editData ? "PUT" : "POST";
    const url = editData
        ? `${URL}/api/owners/${editData.uuid}`
        : `${URL}/api/owners`;

    // Send only modified fields during update
    const updatedData = editData
        ? Object.fromEntries(
              Object.entries(formData).filter(([key, value]) => value !== editData[key])
          )
        : formData;

    // Ensure at least `ownerName` is sent in update
    if (editData && !updatedData.ownerName) {
        updatedData.ownerName = formData.ownerName;
    }

    try {
        const response = await fetch(url, {
            method,
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(updatedData),
        });

        const data = await response.json();

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
            console.error("Server error:", data);
            Swal.fire({
                icon: "error",
                title: "Error",
                text: data.error || "Error submitting form",
            });
        }
    } catch (error) {
        console.error("Error submitting data:", error);
        Swal.fire({
            icon: "error",
            title: "Error",
            text: "Error submitting form",
        });
    } finally {
        setLoading(false); // Stop loading after request is completed
    }
};


  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 z-50">
      <div className="bg-white rounded-lg shadow-lg w-4/5 max-w-3xl p-6">
        <h2 className="text-xl font-semibold text-center py-3">
          {editData ? "Edit Owner" : "Owner"}
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          {Object.keys(formData).map((field) => (
            <div key={field}>
              <label className="block text-sm font-medium text-gray-700">
                {field
                  .replace(/([A-Z])/g, " $1")
                  .replace(/\b\w/g, (char) => char.toUpperCase())
                  .trim()}
              </label>
              <input
                type={field === "emailID" ? "email" : "text"}
                name={field}
                placeholder={`Enter ${field}`}
                value={formData[field]}
                onChange={handleChange}
                onFocus={() => handleFocus(field)} // Attach focus handler here
                className={`p-2 border rounded-lg w-full ${field === "ownerName" && ownerNameError ? "border-red-500" : ""
                  }`}
              />
              {field === "ownerName" && ownerNameError && (
                <p className="text-red-500 text-sm mt-1">{ownerNameError}</p>
              )}
            </div>
          ))}
          <div className="flex justify-end space-x-2">
            <button
              type="submit"
              className="py-2 px-4 rounded-lg bg-blue-600 text-white hover:bg-blue-700"
              disabled={loading}
            >
              {loading ? "Submitting..." : editData ? "Update" : "Submit"}
            </button>
            <button
              type="button"
              className="bg-gray-600 text-white py-2 px-4 rounded-lg hover:bg-gray-700"
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
