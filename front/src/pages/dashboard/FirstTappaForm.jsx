import React, { useState, useEffect, useRef } from "react";
import Swal from "sweetalert2";

const URL = import.meta.env.VITE_API_BACK_URL;

const TransportForm = ({ onClose, onSave, editData }) => {
  const [formData, setFormData] = useState({
    baseDepo: "",
    doNo: "",
    godown: "",
    truck: "",
    packaging: "",
    allocation: "",
    tpDate: "",
    owner: "",
    driver: "",
    grossWeight: "",
    noOfBags: "",
    bardanWeight: "",
    netWeight: "",
    tpNo: "",
  });

  const [errors, setErrors] = useState({});
  const [godownList, setGodownList] = useState([]);
  const [truckList, setTruckList] = useState([]);
  const [ownerList, setOwnerList] = useState([]);
  const [driverList, setDriverList] = useState([]);

  useEffect(() => {
    // Fetch godowns, trucks, owners, and drivers from your API
    // Update the respective state variables
  }, []);

  useEffect(() => {
    if (editData) {
      setFormData(editData);
    }
  }, [editData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    if (errors[name]) {
      setErrors({ ...errors, [name]: "" });
    }
  };

  const validateForm = () => {
    let newErrors = {};
    // Add validation logic for each field
    if (!formData.baseDepo) newErrors.baseDepo = "Base Depo is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      const response = await fetch(`${URL}/api/transport`, {
        method: editData ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        Swal.fire({
          icon: "success",
          title: editData ? "Transport updated successfully!" : "Transport added successfully!",
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
      <div className="bg-white rounded-lg shadow-lg w-4/5 max-w-4xl p-6">
        <h2 className="text-xl font-semibold py-3 px-4 text-center">Transport Form</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-3 gap-4">
            {Object.keys(formData).map((field) => (
              <div key={field}>
                <label className="block text-sm font-medium text-gray-700">
                  {field.replace(/([A-Z])/g, " $1").trim().replace(/^./, (str) => str.toUpperCase())}
                </label>
                <input
                  type={field === "tpDate" ? "date" : "text"}
                  name={field}
                  value={formData[field]}
                  onChange={handleChange}
                  className="p-2 border rounded-lg w-full"
                  placeholder={`Enter ${field.replace(/([A-Z])/g, " $1").trim()}`}
                />
                {errors[field] && <p className="text-red-500 text-sm">{errors[field]}</p>}
              </div>
            ))}
          </div>
          <div className="flex justify-end space-x-2 mt-4">
            <button
              type="submit"
              className="px-4 py-2 bg-gray-300 text-gray-800 rounded hover:bg-blue-600"
            >
              {editData ? "Update" : "Submit"}
            </button>
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-300 text-gray-800 rounded hover:bg-red-400"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TransportForm;



// import React, { useState, useEffect } from "react";
// import Swal from "sweetalert2";

// const URL = import.meta.env.VITE_API_BACK_URL;

// const TransportForm = ({ onClose, onSave, editData }) => {
//   const [formData, setFormData] = useState({
//     baseDepo: "",
//     doNo: "",
//     godown: "",
//     truck: "",
//     packaging: "",
//     allocation: "",
//     tpDate: "",
//     owner: "",
//     driver: "",
//     grossWeight: "",
//     noOfBags: "",
//     bardanWeight: "",
//     netWeight: "",
//     tpNo: "",
//   });

//   const [errors, setErrors] = useState({});
//   const [godownList, setGodownList] = useState([]);
//   const [truckList, setTruckList] = useState([]);
//   const [ownerList, setOwnerList] = useState([]);
//   const [driverList, setDriverList] = useState([]);

//   useEffect(() => {
//     if (editData) {
//       setFormData(editData);
//     }
//   }, [editData]);

//   useEffect(() => {
//     // Fetching options for dropdowns (simulate API calls)
//     setGodownList(["Godown A", "Godown B"]);
//     setTruckList(["Truck 1", "Truck 2"]);
//     setOwnerList(["Owner X", "Owner Y"]);
//     setDriverList(["Driver 1", "Driver 2"]);
//   }, []);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });
//     if (errors[name]) {
//       setErrors({ ...errors, [name]: "" });
//     }
//   };

//   const validateForm = () => {
//     let newErrors = {};
//     if (!formData.baseDepo) newErrors.baseDepo = "Base Depo is required";
//     if (!formData.grossWeight) newErrors.grossWeight = "Gross Weight is required";
//     if (!formData.tpDate) newErrors.tpDate = "TP Date is required";
//     setErrors(newErrors);
//     return Object.keys(newErrors).length === 0;
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!validateForm()) return;

//     try {
//       const response = await fetch(`${URL}/api/transport`, {
//         method: editData ? "PUT" : "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(formData),
//       });

//       if (response.ok) {
//         Swal.fire({
//           icon: "success",
//           title: editData ? "Transport updated successfully!" : "Transport added successfully!",
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
//       Swal.fire({ icon: "error", title: "Error", text: "Error submitting data" });
//     }
//   };

//   return (
//     <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 z-50 p-4">
//       <div className="bg-white rounded-lg shadow-lg w-full max-w-4xl p-6">
//         <h2 className="text-2xl font-semibold text-gray-800 text-center mb-4">
//           {editData ? "Edit Transport Details" : "Add Transport Details"}
//         </h2>

//         <form onSubmit={handleSubmit} className="space-y-6">
//           {/* First Row */}
//           <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//             <div>
//               <label className="text-gray-700 font-medium">Base Depo</label>
//               <input
//                 type="text"
//                 name="baseDepo"
//                 value={formData.baseDepo}
//                 onChange={handleChange}
//                 className="input-field"
//                 placeholder="Enter Base Depo"
//               />
//               {errors.baseDepo && <p className="text-red-500 text-sm">{errors.baseDepo}</p>}
//             </div>

//             <div>
//               <label className="text-gray-700 font-medium">DO No</label>
//               <input
//                 type="text"
//                 name="doNo"
//                 value={formData.doNo}
//                 onChange={handleChange}
//                 className="input-field"
//                 placeholder="Enter DO No"
//               />
//             </div>

//             <div>
//               <label className="text-gray-700 font-medium">TP No</label>
//               <input
//                 type="text"
//                 name="tpNo"
//                 value={formData.tpNo}
//                 onChange={handleChange}
//                 className="input-field"
//                 placeholder="Enter TP No"
//               />
//             </div>
//           </div>

//           {/* Second Row */}
//           <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//             <div>
//               <label className="text-gray-700 font-medium">Godown</label>
//               <select name="godown" value={formData.godown} onChange={handleChange} className="input-field">
//                 <option value="">Select Godown</option>
//                 {godownList.map((item) => (
//                   <option key={item} value={item}>{item}</option>
//                 ))}
//               </select>
//             </div>

//             <div>
//               <label className="text-gray-700 font-medium">Truck</label>
//               <select name="truck" value={formData.truck} onChange={handleChange} className="input-field">
//                 <option value="">Select Truck</option>
//                 {truckList.map((item) => (
//                   <option key={item} value={item}>{item}</option>
//                 ))}
//               </select>
//             </div>

//             <div>
//               <label className="text-gray-700 font-medium">Gross Weight</label>
//               <input
//                 type="text"
//                 name="grossWeight"
//                 value={formData.grossWeight}
//                 onChange={handleChange}
//                 className="input-field"
//                 placeholder="Enter Gross Weight"
//               />
//               {errors.grossWeight && <p className="text-red-500 text-sm">{errors.grossWeight}</p>}
//             </div>
//           </div>

//           {/* Third Row */}
//           <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//             <div>
//               <label className="text-gray-700 font-medium">TP Date</label>
//               <input
//                 type="date"
//                 name="tpDate"
//                 value={formData.tpDate}
//                 onChange={handleChange}
//                 className="input-field"
//               />
//               {errors.tpDate && <p className="text-red-500 text-sm">{errors.tpDate}</p>}
//             </div>

//             <div>
//               <label className="text-gray-700 font-medium">No. of Bags</label>
//               <input
//                 type="text"
//                 name="noOfBags"
//                 value={formData.noOfBags}
//                 onChange={handleChange}
//                 className="input-field"
//                 placeholder="Enter No. of Bags"
//               />
//             </div>

//             <div>
//               <label className="text-gray-700 font-medium">Bardan Weight</label>
//               <input
//                 type="text"
//                 name="bardanWeight"
//                 value={formData.bardanWeight}
//                 onChange={handleChange}
//                 className="input-field"
//                 placeholder="Enter Bardan Weight"
//               />
//             </div>
//           </div>

//           {/* Buttons */}
//           <div className="flex justify-end space-x-4 mt-6">
//             <button type="button" onClick={onClose} className="btn-cancel">Cancel</button>
//             <button type="submit" className="btn-submit">{editData ? "Update" : "Submit"}</button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default TransportForm;
