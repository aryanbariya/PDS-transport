// import React, { useState, useEffect } from "react";
// const URL = import.meta.env.VITE_API_BACK_URL;

// const MSWCGodownForm = ({ onClose, onSave, editData }) => {
//   const [formData, setFormData] = useState({
//     godownName: "",
//     godownUnder: "",
//   });

//   const [errors, setErrors] = useState({});
//   const [loading, setLoading] = useState(false);

//   useEffect(() => {
//     if (editData) {
//       setFormData({
//         godownName: editData.godownName || "",
//         godownUnder: editData.godownUnder || "",
//       });
//     } else {
//       setFormData({ godownName: "", godownUnder: "" });
//     }
//   }, [editData]);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     let updatedValue = value;

//     if (name === "godownName" ) {
//       updatedValue = value
//         .toLowerCase()
//         .split(" ")
//         .map(word => word.charAt(0).toUpperCase() + word.slice(1))
//         .join(" ");
//     }

//     if (name === "godownUnder") {
//       updatedValue = value.toUpperCase().replace(/[^A-Z ]/g, ""); // Allow only letters
//     }

//     setErrors({ ...errors, [name]: "" });
//     setFormData({ ...formData, [name]: updatedValue });
//   };

//   const validate = () => {
//     let newErrors = {};

//     if (!formData.godownName.trim()) {
//       newErrors.godownName = "MSWC Godown Name is required.";
//     }

//     setErrors(newErrors);
//     return Object.keys(newErrors).length === 0;
//   };


//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!validate() || loading) return;

//     setLoading(true);
//     try {
//       const endpoint = editData
//         ? `${URL}/api/mswcgodown/${editData.uuid}`
//         : `${URL}/api/mswcgodown`;
//       const method = editData ? "PUT" : "POST";

//       console.log("Submitting to:", endpoint, "with method:", method);
//       console.log("Payload:", formData);

//       const response = await fetch(endpoint, {
//         method,
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(formData),
//       });

//       const data = await response.json();
//       console.log("Response:", data);

//       if (response.ok) {
//         alert(editData ? "Godown updated successfully!" : "MSWC Godown added successfully!");
//         onSave();
//         onClose();
//       } else {
//         alert(data.message || "Failed to submit form");
//       }
//     } catch (error) {
//       console.error("Error:", error);
//       alert("Error submitting data");
//     } finally {
//       setLoading(false);
//     }
//   };


//   return (
//     <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-60 z-50">
//       <div className="bg-white rounded-lg shadow-lg w-4/5 max-w-3xl p-8">
//         <h2 className="text-xl font-semibold text-center py-3">
//           {editData ? "Edit MSWC Godown" : "MSWC Godown"}
//         </h2>
//         <form onSubmit={handleSubmit} className="space-y-6">
//           <div className="grid grid-cols-2 gap-6">
//             {[{ name: "godownName", label: "MSWC Godown Name" }, { name: "godownUnder", label: "Godown Under" }].map((field) => (
//               <div key={field.name}>
//                 <label className="block text-sm font-medium text-gray-700">
//                   {field.label}
//                 </label>
//                 <input
//                   type="text"
//                   name={field.name}
//                   placeholder={`Enter ${field.label}`}
//                   value={formData[field.name]}
//                   onChange={handleChange}
//                   className={`p-3 border rounded-lg w-full focus:ring-2 focus:ring-blue-500 focus:outline-none transition duration-300 ${
//                     errors[field.name] ? "border-red-500" : ""
//                   }`}
//                 />
//                 {errors[field.name] && <p className="text-red-500 text-sm">{errors[field.name]}</p>}
//               </div>
//             ))}
//           </div>

//           <div className="flex justify-end space-x-4">
//             <button
//               type="button"
//               className="bg-red-600 text-white py-2 px-5 rounded-lg hover:bg-red-700 transition duration-300"
//               onClick={onClose}
//             >
//               Close
//             </button>
//             <button
//               type="submit"
//               disabled={loading}
//               className={`py-2 px-5 rounded-lg text-white transition duration-300 ${
//                 loading "bg-blue-600 hover:bg-blue-700" : "bg-gray-400 cursor-not-allowed"
//               }`}
//             >
//               {loading ? "Submitting..." : editData ? "Update" : "Submit"}
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default MSWCGodownForm;


import React, { useState, useEffect } from "react";
import Swal from "sweetalert2"; // Import SweetAlert2
const URL = import.meta.env.VITE_API_BACK_URL;

const MSWCGodownForm = ({ onClose, onSave, editData }) => {
  const [formData, setFormData] = useState({
    godownName: "",
    godownUnder: "",
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [inputNames, setInputNames] = useState({}); // New state for dynamic input names

  useEffect(() => {
    const generateRandomNames = () => {
      const randomNames = {};
      ["godownName", "godownUnder"].forEach((field) => {
        randomNames[field] = `${field}_${Math.random().toString(36).substr(2, 9)}`;
      });
      setInputNames(randomNames);
    };

    generateRandomNames(); // Generate random names on mount

    if (editData) {
      setFormData({
        godownName: editData.godownName || "",
        godownUnder: editData.godownUnder || "",
      });
    } else {
      setFormData({ godownName: "", godownUnder: "" });
    }
  }, [editData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    let updatedValue = value;

    if (name.includes("godownName")) {
      updatedValue = value
        .toLowerCase()
        .split(" ")
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ");
    }

    if (name.includes("godownUnder")) {
      updatedValue = value.toUpperCase().replace(/[^A-Z ]/g, ""); // Allow only letters
    }

    const fieldName = name.split("_")[0]; // Extract the original field name
    setErrors({ ...errors, [fieldName]: "" });
    setFormData({ ...formData, [fieldName]: updatedValue });
  };

  const validate = () => {
    let newErrors = {};

    if (!formData.godownName.trim()) {
      newErrors.godownName = "MSWC Godown Name is required.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate() || loading) return;

    setLoading(true);
    try {
      const endpoint = editData
        ? `${URL}/api/mswcgodown/${editData.uuid}`
        : `${URL}/api/mswcgodown`;
      const method = editData ? "PUT" : "POST";

      console.log("Submitting to:", endpoint, "with method:", method);
      console.log("Payload:", formData);

      const response = await fetch(endpoint, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      console.log("Response:", data);

      if (response.ok) {
        Swal.fire({
          icon: "success",
          title: editData ? "Godown updated successfully!" : "MSWC Godown added successfully!",
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
          text: data.message || "Failed to submit form",
        });
      }
    } catch (error) {
      console.error("Error:", error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Error submitting data",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-60 z-50">
      <div className="bg-white rounded-lg shadow-lg w-4/5 max-w-3xl p-8">
        <h2 className="text-xl font-semibold text-center py-3">
          {editData ? "Edit MSWC Godown" : "MSWC Godown"}
        </h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-2 gap-6">
            {[{ name: "godownName", label: "MSWC Godown Name" }, { name: "godownUnder", label: "Godown Under" }].map((field) => (
              <div key={field.name}>
                <label className="block text-sm font-medium text-gray-700">
                  {field.label}
                </label>
                <input
                  type="text"
                  name={inputNames[field.name]} // Use dynamic name
                  placeholder={`Enter ${field.label}`}
                  value={formData[field.name]}
                  onChange={handleChange}
                  className={`p-3 border rounded-lg w-full focus:ring-2 focus:ring-blue-500 focus:outline-none transition duration-300 ${errors[field.name] ? "border-red-500" : ""
                    }`}
                />
                {errors[field.name] && <p className="text-red-500 text-sm">{errors[field.name]}</p>}
              </div>
            ))}
          </div>

          <div className="flex justify-end space-x-4">
            <button
              type="submit"
              disabled={loading}
              className={`py-2 px-5 rounded-lg  ${!loading ? "bg-blue-600 text-white hover:bg-blue-700" : "bg-gray-400 text-gray-700 cursor-not-allowed"
                }`}
            >
              {loading ? "Submitting..." : editData ? "Update" : "Submit"}
            </button>
            <button
              type="button"
              className="bg-red-600 text-white py-2 px-5 rounded-lg hover:bg-red-700 transition duration-300"
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

export default MSWCGodownForm;
