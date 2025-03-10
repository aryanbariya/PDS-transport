// import React, { useState, useEffect } from "react";
// import Swal from "sweetalert2"; // Import SweetAlert2
// const URL = import.meta.env.VITE_API_BACK_URL;

// const TruckForm = ({ onClose, onSave, editData }) => {
//   const [formData, setFormData] = useState({
//     order_number: '',
//     truck_name: "",
//     truck_status: "Active",
//     empty_weight: "",
//     company: "",
//     gvw: "",
//     reg_date: "",
//     truck_owner_name: "",
//     owner_id: "",
//     tax_validity_date: "",
//     insurance_validity_date: "",
//     fitness_validity_date: "",
//     permit_validity_date: "",
//     direct_sale: "",
//   });

//   const [errors, setErrors] = useState({});

//   useEffect(() => {
//     if (editData) {
//       setFormData({
//         truck_name: editData.truck_name || "",
//         truck_status: editData.truck_status || "Active",
//         empty_weight: editData.empty_weight || "",
//         company: editData.company || "",
//         gvw: editData.gvw || "",
//         reg_date: editData.reg_date || "",
//         truck_owner_name: editData.truck_owner_name || "",
//         owner_id: editData.owner_id || "",
//         tax_validity_date: editData.tax_validity_date || "",
//         insurance_validity_date: editData.insurance_validity_date || "",
//         fitness_validity_date: editData.fitness_validity_date || "", // Corrected field name
//         permit_validity_date: editData.permit_validity_date || "",
//         direct_sale: editData.direct_sale || "",
//       });
//     }
//   }, [editData]);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     if (name === "truck_name") {
//       setFormData({ ...formData, [name]: value.charAt(0).toUpperCase() + value.slice(1).toLowerCase() });
//     } else {
//       setFormData({ ...formData, [name]: value });
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!formData.truck_name.trim()) {
//       setErrors({ truck_name: "Truck name is required" });
//       return;
//     }

//     console.log(formData); // Log formData for inspection

//     const method = editData ? "PUT" : "POST";
//     const url = editData
//       ? `${URL}/api/truck/${editData.uuid}`
//       : `${URL}/api/truck`;

//     try {
//       const response = await fetch(url, {
//         method,
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(formData),
//       });

//       if (response.ok) {
//         Swal.fire({
//           icon: "success",
//           title: editData ? "Truck updated successfully!" : "Truck added successfully!",
//           showConfirmButton: false,
//           timer: 1500,
//         }).then(() => {
//           onSave();
//           onClose();
//         });
//       } else {
//         const errorData = await response.json();
//         console.error("Error submitting data:", errorData);
//         Swal.fire({
//           icon: "error",
//           title: "Error",
//           text: errorData.message || "Error submitting form",
//         });
//       }
//     } catch (error) {
//       console.error("Error submitting data:", error);
//       Swal.fire({
//         icon: "error",
//         title: "Error",
//         text: "Error submitting form",
//       });
//     }
//   };

//   return (
//     <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 z-50">
//       <div className="bg-white rounded-lg shadow-lg w-4/5 max-w-3xl p-6">
//         <h2 className="bg--600 text-black text-xl font-semibold py-3 px-4 rounded-t-lg text-center">
//           {editData ? "Edit Truck" : "Truck"}
//         </h2>
//         <form onSubmit={handleSubmit} className="space-y-4">
//           <div className="grid grid-cols-2 gap-4">
//             {["truck_name", "empty_weight", "company", "gvw", "reg_date", "truck_owner_name", "owner_id", "tax_validity_date", "insurance_validity_date", "fitness_validity_date", "permit_validity_date", "direct_sale"].map((field) => (
//               <div key={field}>
//                 <label className="block text-sm font-medium text-gray-700">
//                   {field.replace("_", " ").toUpperCase()}
//                 </label>
//                 <input
//                   type={field.includes("date") ? "date" : "text"}
//                   name={field}
//                   value={formData[field]}
//                   onChange={handleChange}
//                   autoComplete="off" // Prevent autocomplete
//                   className={`p-2 border rounded-lg w-full ${field === "truck_name" && errors.truck_name ? "border-red-500" : ""}`}
//                 />
//                 {field === "truck_name" && errors.truck_name && (
//                   <p className="text-red-500 text-sm">{errors.truck_name}</p>
//                 )}
//               </div>
//             ))}
//             <div>
//               <label className="block text-sm font-medium text-gray-700">Truck Status</label>
//               <select
//                 name="truck_status"
//                 value={formData.truck_status}
//                 onChange={handleChange}
//                 className="p-2 border rounded-lg w-full"
//               >
//                 <option value="Active">Active</option>
//                 <option value="Inactive">Inactive</option>
//               </select>
//             </div>
//           </div>
//           <div className="flex justify-end  gap-2">
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

// export default TruckForm;



import React, { useState, useEffect } from "react";
import { formatDate } from "@/util/libs/formatDate";
import Swal from "sweetalert2"; // Import SweetAlert2
const URL = import.meta.env.VITE_API_BACK_URL;

const TruckForm = ({ onClose, onSave, editData }) => {
  const [formData, setFormData] = useState({
    order_number: '',
    truck_name: "",

    empty_weight: "",
    company: "",
    gvw: "",
    reg_date: "",
    truck_owner_name: "",
    owner_id: "",
    tax_validity_date: "",
    insurance_validity_date: "",
    fitness_validity_date: "",
    permit_validity_date: "",
    direct_sale: "",
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (editData) {
      setFormData({
        truck_name: editData.truck_name || "",
        empty_weight: editData.empty_weight || "",
        company: editData.company || "",
        gvw: editData.gvw || "",
        reg_date: editData.reg_date ? new Date(editData.reg_date).toISOString().split('T')[0] : "",
        truck_owner_name: editData.truck_owner_name || "",
        owner_id: editData.owner_id || "",
        tax_validity_date: editData.tax_validity_date && !isNaN(new Date(editData.tax_validity_date)) 
          ? new Date(editData.tax_validity_date).toISOString().split('T')[0] 
          : "",
        insurance_validity_date: editData.insurance_validity_date && !isNaN(new Date(editData.insurance_validity_date)) 
          ? new Date(editData.insurance_validity_date).toISOString().split('T')[0] 
          : "",
        fitness_validity_date: editData.fitness_validity_date && !isNaN(new Date(editData.fitness_validity_date)) 
          ? new Date(editData.fitness_validity_date).toISOString().split('T')[0] 
          : "",
        permit_validity_date: editData.permit_validity_date && !isNaN(new Date(editData.permit_validity_date)) 
          ? new Date(editData.permit_validity_date).toISOString().split('T')[0] 
          : "",
        direct_sale: editData.direct_sale || "",
      });
      console.log("Edit Dataaaaaaaaaaaaaaaaa:", editData); 
    }
  }, [editData]);
  
  // useEffect(() => {
  //   if (editData) {
  //     setFormData({
  //       truck_name: editData.truck_name || "",
  //       empty_weight: editData.empty_weight || "",
  //       company: editData.company || "",
  //       gvw: editData.gvw || "",
  //       reg_date: editData.reg_date ? new Date(editData.reg_date).toISOString().split('T')[0] : "",
  //       truck_owner_name: editData.truck_owner_name || "",
  //       owner_id: editData.owner_id || "",
  //       tax_validity_date: editData.tax_validity_date ? new Date(editData.tax_validity_date).toISOString().split('T')[0] : "",
  //       insurance_validity_date: editData.insurance_validity_date ? new Date(editData.insurance_validity_date).toISOString().split('T')[0] : "",
  //       fitness_validity_date: editData.fitness_validity_date ? new Date(editData.fitness_validity_date).toISOString().split('T')[0] : "",
  //       permit_validity_date: editData.permit_validity_date ? new Date(editData.permit_validity_date).toISOString().split('T')[0] : "",
  //       direct_sale: editData.direct_sale || "",
  //     });
  //   }
  // }, [editData]);
  /////////////////////////////////////////////////////////////
  // useEffect(() => {
  //   if (editData) {
  //     setFormData({
  //       truck_name: editData.truck_name || "",
  //       empty_weight: editData.empty_weight || "",
  //       company: editData.company || "",
  //       gvw: editData.gvw || "",
  //       reg_date: editData.reg_date || "",
  //       truck_owner_name: editData.truck_owner_name || "",
  //       owner_id: editData.owner_id || "",
  //       tax_validity_date: editData.tax_validity_date || "",
  //       insurance_validity_date: editData.insurance_validity_date || "",
  //       fitness_validity_date: editData.fitness_validity_date || "",
  //       permit_validity_date: editData.permit_validity_date || "",
  //       direct_sale: editData.direct_sale || "",
  //     });
  //   }
  // }, [editData]);

  // const handleChange = (e) => {
  //   const { name, value } = e.target;
  //   setFormData({ ...formData, [name]: value });
  // };

  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    setErrors((prevErrors) => {
      const newErrors = { ...prevErrors };
      if (value.trim() === "") {
        newErrors[name] = `${name.replace("_", " ").toUpperCase()} is required`;
      } else {
        delete newErrors[name];
      }
      return newErrors;
    });
  };



  // const validateForm = () => {
  //   const newErrors = {};

  //   const requiredFields = [
  //     "truck_name",
  //     "empty_weight",
  //     "company",
  //     "gvw",
  //     "reg_date",
  //     "truck_owner_name",
  //     "owner_id",
  //     "direct_sale" // Ensure this field is validated
  //   ];

  //   requiredFields.forEach((field) => {
  //     if (!formData[field] || formData[field].trim() === "") {
  //       newErrors[field] = `${field.replace("_", " ").toUpperCase()} is required`;
  //     }
  //   });

  //   setErrors(newErrors);
  //   return Object.keys(newErrors).length === 0; // Return true if no errors
  // };
  const validateForm = () => {
    const newErrors = {};

    ["truck_name", "empty_weight", "company", "gvw", "reg_date", "truck_owner_name", "owner_id"].forEach((field) => {
      if (!String(formData[field] || "").trim()) { // ✅ Convert to string safely
        newErrors[field] = `${field.replace("_", " ").toUpperCase()} is required`;
      }
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };



  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    const method = editData ? "PUT" : "POST";
    const url = editData
      ? `${URL}/api/truck/${editData.uuid}`
      : `${URL}/api/truck`;
    console.log("Submitting Data:", formData);
    try {
      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),

      });
      const responseData = await response.json(); // Read JSON response
      console.log("Response:", responseData); // Debug response
      if (response.ok) {
        Swal.fire({
          icon: "success",
          title: editData ? "Truck updated successfully!" : "Truck added successfully!",
          showConfirmButton: false,
          timer: 1500,
        }).then(() => {
          onSave();
          onClose();
        });
      } else {
        const errorData = await response.json();
        Swal.fire({
          icon: "error",
          title: "Error",
          text: errorData.message || "Error submitting form",
        });
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Error submitting form",
      });
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 z-50">
      <div className="bg-white rounded-lg shadow-lg w-4/5 max-w-3xl p-6">
        <h2 className="bg--600 text-black text-xl font-semibold py-3 px-4 rounded-t-lg text-center">
          {editData ? "Edit Truck" : "Truck"}
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            {["truck_name", "empty_weight", "company", "gvw", "reg_date", "truck_owner_name", "owner_id", "tax_validity_date", "insurance_validity_date", "fitness_validity_date", "permit_validity_date"].map((field) => (
              <div key={field}>
                <label className="block text-sm font-medium text-gray-700">
                  {field.replace("_", " ").toUpperCase()}
                </label>
                <input
                  type={field.includes("date") ? "date" : "text"}
                  name={field}
                  value={formData[field]}
                  onChange={handleChange}
                  autoComplete="off"
                  className={`p-2 border rounded-lg w-full ${errors[field] ? "border-red-500" : ""}`}
                />
                {errors[field] && <p className="text-red-500 text-sm">{errors[field]}</p>}
              </div>
            ))}
            <div>
              <label className="block text-sm font-medium text-gray-700">Direct Sale</label>
              <select
                name="direct_sale"
                value={formData.direct_sale}
                onChange={handleChange}
                className="p-2 border rounded-lg w-full"
              >
                <option value="">Select an option</option>
                <option value="Yes">Yes</option>
                <option value="No">No</option>
              </select>
            </div>
          </div>
          {/* <div className="grid grid-cols-2 gap-4">
            {[
              "truck_name",
              "empty_weight",
              "company",
              "gvw",
              "reg_date",
              "truck_owner_name",
              "owner_id",
              "tax_validity_date",
              "insurance_validity_date",
              "fitness_validity_date",
              "permit_validity_date"
            ].map((field) => (
              <div key={field}>
                <label className="block text-sm font-medium text-gray-700">
                  {field.replace("_", " ").toUpperCase()}
                </label>

                {field.includes("date") ? (
                  editData ? (
                    <input
                      type="date"
                      name={field}
                      value={formData[field] || ""}
                      onChange={handleChange}
                      className={`p-2 border rounded-lg w-full ${errors[field] ? "border-red-500" : ""}`}
                    />
                  ) : (
                    <p className="p-2 border rounded-lg bg-gray-100">
                      {formData[field] ? formatDate(formData[field]) : "No Date Provided"}
                    </p>
                  )
                ) : (
                  <input
                    type="text"
                    name={field}
                    value={formData[field]}
                    onChange={handleChange}
                    autoComplete="off"
                    className={`p-2 border rounded-lg w-full ${errors[field] ? "border-red-500" : ""}`}
                  />
                )}

                {errors[field] && <p className="text-red-500 text-sm">{errors[field]}</p>}
              </div>
            ))}

            <div>
              <label className="block text-sm font-medium text-gray-700">Direct Sale</label>
              <select
                name="direct_sale"
                value={formData.direct_sale}
                onChange={handleChange}
                className="p-2 border rounded-lg w-full"
              >
                <option value="">Select an option</option>
                <option value="Yes">Yes</option>
                <option value="No">No</option>
              </select>
            </div>
          </div> */}
          <div className="flex justify-end gap-2">
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

export default TruckForm;
