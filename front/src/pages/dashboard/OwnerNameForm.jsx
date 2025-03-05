// import React, { useState, useEffect } from "react";

// const URL = import.meta.env.VITE_API_BACK_URL

// const OwnerNameForm = ({ onClose, onSave, editData }) => {
//   const [formData, setFormData] = useState({
//     ownerName: "",
//     contact: "",
//     address: "",
//     emailID: ""
//   });

//   useEffect(() => {
//     if (editData) {
//       setFormData({
//         ownerName: editData.ownerName || "",
//         contact: editData.contact || "",
//         address: editData.address || "",
//         emailID: editData.emailID || ""
//       });
//     } else {
//       setFormData({ ownerName: "", contact: "", address: "", emailID: "" });
//     }
//   }, [editData]);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
    
//     let updatedValue = value;
//     if (name === "ownerName") {
//       updatedValue = value.charAt(0).toUpperCase() + value.slice(1);
//     }
    
//     setFormData({ ...formData, [name]: updatedValue });
//   };

//   const isFormValid = formData.ownerName.trim() !== "" &&
//                       formData.contact.trim() !== "" &&
//                       formData.emailID.trim() !== "";

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!isFormValid) {
//       alert("Owner Name, Contact, and Email Address are required.");
//       return;
//     }

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

//       if (response.ok) {
//         alert(editData ? "Owner updated successfully!" : "Owner added successfully!");
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
//       <div className="bg-white rounded-lg shadow-lg w-4/5 max-w-3xl p-6">
//         <h2 className="bg-blue-600 text-white text-xl font-semibold py-3 px-4 rounded-t-lg text-center">
//           {editData ? "Edit Owner" : "Add Owner"}
//         </h2>
//         <form onSubmit={handleSubmit} className="space-y-4">
//           {Object.keys(formData).map((field) => (
//             <div key={field}>
//               <label className="block text-sm font-medium text-gray-700">
//                 {field.replace(/([A-Z])/g, " $1").trim()}
//               </label>
//               <input
//                 type={field === "emailID" ? "email" : "text"}
//                 name={field}
//                 placeholder={`Enter ${field}`}
//                 value={formData[field]}
//                 onChange={handleChange}
//                 className="p-2 border rounded-lg w-full"
//                 required={["ownerName", "contact", "emailID"].includes(field)}
//               />
//             </div>
//           ))}
//           <div className="flex justify-between">
//             <button
//               type="submit"
//               disabled={!isFormValid}
//               className={`py-2 px-4 rounded-lg ${isFormValid ? "bg-blue-600 text-white hover:bg-blue-700" : "bg-gray-400 text-gray-700 cursor-not-allowed"}`}
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

// export default OwnerNameForm;


import React, { useState, useEffect } from "react";

const URL = import.meta.env.VITE_API_BACK_URL;

const OwnerNameForm = ({ onClose, onSave, editData }) => {
  const [formData, setFormData] = useState({
    ownerName: "",
    contact: "",
    address: "",
    emailID: ""
  });

  useEffect(() => {
    if (editData) {
      setFormData({
        ownerName: editData.ownerName || "",
        contact: editData.contact || "",
        address: editData.address || "",
        emailID: editData.emailID || ""
      });
    } else {
      setFormData({ ownerName: "", contact: "", address: "", emailID: "" });
    }
  }, [editData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    let updatedValue = value;

    if (name === "ownerName") {
      // Capitalize first letter of each word
      updatedValue = value
        .toLowerCase()
        .split(" ")
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ");
    }

    setFormData({ ...formData, [name]: updatedValue });
  };

  const isFormValid = formData.ownerName.trim() !== "" &&
                      formData.contact.trim() !== "" &&
                      formData.emailID.trim() !== "";

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isFormValid) {
      alert("Owner Name, Contact, and Email Address are required.");
      return;
    }

    const method = editData ? "PUT" : "POST";
    const url = editData
      ? `${URL}/api/owners/${editData.uuid}`
      : `${URL}/api/owners`;

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
        <h2 className="text-xl font-semibold text-center py-3">
          {editData ? "Edit Owner" : "Owner"}
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          {Object.keys(formData).map((field) => (
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
                className="p-2 border rounded-lg w-full"
                required={["ownerName", "contact", "emailID"].includes(field)}
              />
            </div>
          ))}
          <div className="flex justify-end space-x-2">
            <button
              type="submit"
              disabled={!isFormValid}
              className={`py-2 px-4 rounded-lg ${isFormValid ? "bg-blue-600 text-white hover:bg-blue-700" : "bg-gray-400 text-gray-700 cursor-not-allowed"}`}
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
