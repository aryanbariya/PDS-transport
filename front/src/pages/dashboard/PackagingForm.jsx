// import React, { useState, useEffect } from "react";
// import Swal from "sweetalert2"; // Import SweetAlert2
// const URL = import.meta.env.VITE_API_BACK_URL;

// const PackagingForm = ({ onClose, onSave, editData }) => {
//   const [formData, setFormData] = useState({
//     material_name: "",
//     weight: "",
//     status: "Active",
//   });

//   const [errors, setErrors] = useState({});

//   useEffect(() => {
//     if (editData) {
//       setFormData({
//         material_name: editData.material_name || "",
//         weight: editData.weight || "",
//         status: editData.status || "Active",
//       });
//     } else {
//       setFormData({ material_name: "", weight: "", status: "Active" });
//     }
//   }, [editData]);

//   const validateForm = () => {
//     let newErrors = {};
//     if (!formData.material_name.trim()) {
//       newErrors.material_name = "Material name is required";
//     } else if (!/^[a-zA-Z\s]{3,}$/.test(formData.material_name)) {
//       newErrors.material_name = "Material name must be at least 3 characters and contain only letters";
//     }

//     if (!formData.weight.trim()) {
//       newErrors.weight = "Weight is required";
//     } else if (isNaN(formData.weight) || Number(formData.weight) <= 0) {
//       newErrors.weight = "Weight must be a positive number";
//     }

//     setErrors(newErrors);
//     return Object.keys(newErrors).length === 0;
//   };

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!validateForm()) return;

//     try {
//       const response = await fetch(
//         editData
//           ? `${URL}/api/packaging/${editData.uuid}`
//           : `${URL}/api/packaging`,
//         {
//           method: editData ? "PUT" : "POST",
//           headers: { "Content-Type": "application/json" },
//           body: JSON.stringify(formData),
//         }
//       );

//       if (response.ok) {
//         Swal.fire({
//           icon: "success",
//           title: editData ? "Packaging updated successfully!" : "Packaging added successfully!",
//           showConfirmButton: false,
//           timer: 1500,
//         }).then(() => {
//           onSave();
//           onClose();
//         });
//       } else {
//         const data = await response.json();
//         Swal.fire({
//           icon: "error",
//           title: "Error",
//           text: data.message || "Failed to submit form",
//         });
//       }
//     } catch (error) {
//       console.error("Error:", error);
//       Swal.fire({
//         icon: "error",
//         title: "Error",
//         text: "Error submitting data",
//       });
//     }
//   };

//   return (
//     <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 z-50">
//       <div className="bg-white rounded-lg shadow-lg w-4/5 max-w-3xl p-6">
//         <h2 className="bg--600 text-black text-xl font-semibold py-3 px-4 rounded-t-lg text-center">
//           {editData ? "Edit Packaging" : "Packaging"}
//         </h2>
//         <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4 p-4">
//           <div className="col-span-2">
//             <label className="block text-gray-700">Packaging Material</label>
//             <input
//               type="text"
//               name="material_name"
//               value={formData.material_name}
//               onChange={handleChange}
//               placeholder="Enter material name"
//               autoComplete="off" // Prevent autocomplete
//               className="p-2 border rounded-lg w-full"
//               required
//             />
//             {errors.material_name && <p className="text-red-500 text-sm">{errors.material_name}</p>}
//           </div>

//           <div className="col-span-2">
//             <label className="block text-gray-700">Weight</label>
//             <input
//               type="number"
//               name="weight"
//               value={formData.weight}
//               onChange={handleChange}
//               placeholder="Enter weight"
//               autoComplete="off" // Prevent autocomplete
//               className="p-2 border rounded-lg w-full"
//               required
//             />
//             {errors.weight && <p className="text-red-500 text-sm">{errors.weight}</p>}
//           </div>

//           <div className="col-span-2 flex justify-end gap-2">
//             <button
//               type="submit"
//               className={`px-4 py-2 rounded-lg ${
//                 Object.keys(errors).length === 0 ? "bg-blue-600 text-white hover:bg-blue-700" : "bg-gray-400 text-gray-700 cursor-not-allowed"
//               }`}
//               disabled={Object.keys(errors).length > 0}
//             >
//               {editData ? "Update" : "Submit"}
//             </button>
//             <button onClick={onClose} className="bg-red-600 text-white px-4 py-2 rounded-lg">
//               Close
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default PackagingForm;




import React, { useState, useEffect } from "react";
import Swal from "sweetalert2"; // Import SweetAlert2
const URL = import.meta.env.VITE_API_BACK_URL;

const PackagingForm = ({ onClose, onSave, editData }) => {
  const [formData, setFormData] = useState({
    material_name: "",
    weight: "",
    status: "Active",
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (editData) {
      setFormData({
        material_name: editData.material_name || "",
        weight: editData.weight || "",
        status: editData.status || "Active",
      });
    } else {
      setFormData({ material_name: "", weight: "", status: "Active" });
    }
  }, [editData]);

  const validateForm = () => {
    let newErrors = {};
    if (!formData.material_name.trim()) {
      newErrors.material_name = "Material name is required";
    } else if (!/^[a-zA-Z\s]{2,}$/.test(formData.material_name)) {
      newErrors.material_name = "Material name must be at least 2 characters and contain only letters";
    }

    if (!formData.weight.trim()) {
      newErrors.weight = "Weight is required";
    } else if (isNaN(formData.weight) || Number(formData.weight) <= 0) {
      newErrors.weight = "Weight must be a positive number";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      const response = await fetch(
        editData
          ? `${URL}/api/packaging/${editData.uuid}`
          : `${URL}/api/packaging`,
        {
          method: editData ? "PUT" : "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        }
      );

      if (response.ok) {
        Swal.fire({
          icon: "success",
          title: editData ? "Packaging updated successfully!" : "Packaging added successfully!",
          showConfirmButton: false,
          timer: 1500,
        }).then(() => {
          onSave();
          onClose();
        });
      } else {
        const data = await response.json();
        console.error("Error submitting data:", data); // Log server response error
        Swal.fire({
          icon: "error",
          title: "Error",
          text: data.message || "Failed to submit form",
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
      <div className="bg-white rounded-lg shadow-lg w-4/5 max-w-3xl p-6">
        <h2 className="bg--600 text-black text-xl font-semibold py-3 px-4 rounded-t-lg text-center">
          {editData ? "Edit Packaging" : "Packaging"}
        </h2>
        <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4 p-4">
          <div className="col-span-2">
            <label className="block text-gray-700">Packaging Material</label>
            <input
              type="text"
              name="material_name"
              value={formData.material_name}
              onChange={handleChange}
              placeholder="Enter material name"
              autoComplete="off" // Prevent autocomplete
              className="p-2 border rounded-lg w-full"
              required
            />
            {errors.material_name && <p className="text-red-500 text-sm">{errors.material_name}</p>}
          </div>

          <div className="col-span-2">
            <label className="block text-gray-700">Weight</label>
            <input
              type="number"
              name="weight"
              value={formData.weight}
              onChange={handleChange}
              placeholder="Enter weight"
              autoComplete="off" // Prevent autocomplete
              className="p-2 border rounded-lg w-full"
              required
            />
            {errors.weight && <p className="text-red-500 text-sm">{errors.weight}</p>}
          </div>

          <div className="col-span-2 flex justify-end gap-2">
            <button
              type="submit"
              className={`px-4 py-2 rounded-lg ${
                Object.keys(errors).length === 0 ? "bg-blue-600 text-white hover:bg-blue-700" : "bg-gray-400 text-gray-700 cursor-not-allowed"
              }`}
              disabled={Object.keys(errors).length > 0}
            >
              {editData ? "Update" : "Submit"}
            </button>
            <button onClick={onClose} className="bg-red-600 text-white px-4 py-2 rounded-lg">
              Close
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PackagingForm;
