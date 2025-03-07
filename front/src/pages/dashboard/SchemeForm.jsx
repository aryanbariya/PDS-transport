// import React, { useState, useEffect } from "react";

// const URL = import.meta.env.VITE_API_BACK_URL

// const SchemeForm = ({ onClose, onSave, editData }) => {
//   const [formData, setFormData] = useState({
//      scheme_name: "", 
//      scheme_status: "Start",

//   });

//   useEffect(() => {
//     if (editData) {
//       setFormData({
//         scheme_name: editData.scheme_name || "",
//         scheme_status: editData.scheme_status || "Start",
//       });
//     } else {
//       setFormData({ scheme_name: "", scheme_status: "Start"});
//     }
//   }, [editData]);

//   // const handleChange = (e) => {
//   //   setFormData({ ...formData, [e.target.name]: e.target.value });
//   // };
//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });
//     // validateField(name, value);
//   };


//   const isFormValid = formData.scheme_name.trim() !== "";

//   // const handleSubmit = async (e) => {
//   //   e.preventDefault();
//   //   if (!isFormValid) {
//   //     alert("Please enter the Scheme Name.");
//   //     return;
//   //   }

//   //   const method = editData ? "PUT" : "POST";
//   //   const url = editData
//   //     ? `http://localhost:5000/api/scheme/${editData.scheme_id}`
//   //     : "http://localhost:5000/api/scheme";

//   //   try {
//   //     const response = await fetch(url, {
//   //       method,
//   //       headers: { "Content-Type": "application/json" },
//   //       body: JSON.stringify(formData),
//   //     });

//   //     if (response.ok) {
//   //       alert(editData ? "Scheme updated successfully!" : "Scheme added successfully!");
//   //       onSave();
//   //       onClose();
//   //     } else {
//   //       alert("Error submitting the form. Please try again.");
//   //     }
//   //   } catch (error) {
//   //     console.error("Error submitting data:", error);
//   //     alert("An error occurred while submitting the form.");
//   //   }
//   // };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!isFormValid) {
//       alert("Please fill in all fields correctly.");
//       return;
//     }

//     const method = editData ? "PUT" : "POST";
//     const url = editData
//       ? `${URL}/api/scheme/${editData.uuid}`
//       : `${URL}/api/scheme`;

//     try {
//       const response = await fetch(url, {
//         method,
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(formData),
//       });

//       if (response.ok) {
//         alert(editData ? "Scheme updated successfully!" : "Scheme added successfully!");
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
//         <h2 className="bg--600 text-black text-xl font-semibold py-3 px-4 rounded-t-lg text-center">
//           {editData ? "Edit Scheme" : "Scheme"}
//         </h2>
//         <form onSubmit={handleSubmit} className="space-y-4">
//           <div>
//             <label className="block text-sm font-medium text-gray-700">Scheme Name</label>
//             <input
//               type="text"
//               name="scheme_name"
//               placeholder="Enter Scheme Name"
//               value={formData.scheme_name}
//               onChange={handleChange}
//               required
//               className="p-2 border rounded-lg w-full"
//             />
//           </div>
//           <div>
//             <label className="block text-sm font-medium text-gray-700">Scheme Status</label>
//             <select
//               name="scheme_status"
//               value={formData.scheme_status}
//               onChange={handleChange}
//               className="p-2 border rounded-lg w-full"
//             >
//               <option value="Start">Start</option>
//               <option value="Pending">Pending</option>
//               <option value="Completed">Completed</option>
//             </select>
//           </div>
//           <div className="flex justify-end gap-2">
//             <button
//               type="submit"
//               disabled={!isFormValid}
//               className={`py-2 px-4 rounded-lg ${
//                 isFormValid ? "bg-blue-600 text-white hover:bg-blue-700" : "bg-gray-400 text-gray-700 cursor-not-allowed"
//               }`}
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

// export default SchemeForm;



import React, { useState, useEffect } from "react";

const URL = import.meta.env.VITE_API_BACK_URL;

const SchemeForm = ({ onClose, onSave, editData }) => {
  const [formData, setFormData] = useState({
    scheme_name: "",
    scheme_status: "Start",
  });

  useEffect(() => {
    if (editData) {
      setFormData({
        scheme_name: editData.scheme_name || "",
        scheme_status: editData.scheme_status || "Start",
      });
    } else {
      setFormData({ scheme_name: "", scheme_status: "Start"});
    }
  }, [editData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const isFormValid = formData.scheme_name.trim() !== "";

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isFormValid) {
      alert("Please fill in all fields correctly.");
      return;
    }

    const method = editData ? "PUT" : "POST";
    const url = editData
      ? `${URL}/api/scheme/${editData.uuid}`
      : `${URL}/api/scheme`;

    try {
      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        alert(editData ? "Scheme updated successfully!" : "Scheme added successfully!");
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
        <h2 className="bg--600 text-black text-xl font-semibold py-3 px-4 rounded-t-lg text-center">
          {editData ? "Edit Scheme" : "Scheme"}
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Scheme Name</label>
            <input
              type="text"
              name="scheme_name"
              placeholder="Enter Scheme Name"
              value={formData.scheme_name}
              onChange={handleChange}
              required
              autoComplete="off" // Prevent autocomplete
              className="p-2 border rounded-lg w-full"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Scheme Status</label>
            <select
              name="scheme_status"
              value={formData.scheme_status}
              onChange={handleChange}
              className="p-2 border rounded-lg w-full"
            >
              <option value="Start">Start</option>
              <option value="Pending">Pending</option>
              <option value="Completed">Completed</option>
            </select>
          </div>
          <div className="flex justify-end gap-2">
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

export default SchemeForm;
