// import React, { useState, useEffect, useRef } from "react";
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
//     // Fetch godowns, trucks, owners, and drivers from your API
//     // Update the respective state variables
//   }, []);

//   useEffect(() => {
//     if (editData) {
//       setFormData(editData);
//     }
//   }, [editData]);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });
//     if (errors[name]) {
//       setErrors({ ...errors, [name]: "" });
//     }
//   };

//   const validateForm = () => {
//     let newErrors = {};
//     // Add validation logic for each field
//     if (!formData.baseDepo) newErrors.baseDepo = "Base Depo is required";

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
//       console.error("Error submitting data:", error);
//       Swal.fire({ icon: "error", title: "Error", text: "Error submitting data" });
//     }
//   };

//   return (
//     <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 z-50">
//       <div className="bg-white rounded-lg shadow-lg w-4/5 max-w-4xl p-6">
//         <h2 className="text-xl font-semibold py-3 px-4 text-center">Transport Form</h2>
//         <form onSubmit={handleSubmit} className="space-y-4">
//           <div className="grid grid-cols-3 gap-4">
//             {Object.keys(formData).map((field) => (
//               <div key={field}>
//                 <label className="block text-sm font-medium text-gray-700">
//                   {field.replace(/([A-Z])/g, " $1").trim().replace(/^./, (str) => str.toUpperCase())}
//                 </label>
//                 <input
//                   type={field === "tpDate" ? "date" : "text"}
//                   name={field}
//                   value={formData[field]}
//                   onChange={handleChange}
//                   className="p-2 border rounded-lg w-full"
//                   placeholder={`Enter ${field.replace(/([A-Z])/g, " $1").trim()}`}
//                 />
//                 {errors[field] && <p className="text-red-500 text-sm">{errors[field]}</p>}
//               </div>
//             ))}
//           </div>
//           <div className="flex justify-end space-x-2 mt-4">
//             <button
//               type="submit"
//               className="px-4 py-2 bg-gray-300 text-gray-800 rounded hover:bg-blue-600"
//             >
//               {editData ? "Update" : "Submit"}
//             </button>
//             <button
//               type="button"
//               onClick={onClose}
//               className="px-4 py-2 bg-gray-300 text-gray-800 rounded hover:bg-red-400"
//             >
//               Cancel
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default TransportForm;



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
    fetchDropdownData();
  }, []);

  useEffect(() => {
    if (editData) {
      setFormData(editData);
    }
  }, [editData]);

  const fetchDropdownData = async () => {
    try {
      const [godownsRes, trucksRes, ownersRes, driversRes] = await Promise.all([
        fetch(`${URL}/api/godowns`),
        fetch(`${URL}/api/trucks`),
        fetch(`${URL}/api/owners`),
        fetch(`${URL}/api/drivers`)
      ]);

      const godowns = await godownsRes.json();
      const trucks = await trucksRes.json();
      const owners = await ownersRes.json();
      const drivers = await driversRes.json();

      setGodownList(godowns);
      setTruckList(trucks);
      setOwnerList(owners);
      setDriverList(drivers);
    } catch (error) {
      console.error("Error fetching dropdown data:", error);
      Swal.fire({ icon: "error", title: "Error", text: "Failed to fetch dropdown data" });
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    if (errors[name]) {
      setErrors({ ...errors, [name]: "" });
    }
  };

  const validateForm = () => {
    let newErrors = {};
    if (!formData.baseDepo) newErrors.baseDepo = "Base Depo is required";
    // Add more validation as needed

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

  const renderField = (field) => {
    switch (field) {
      case "godown":
        return (
          <select
            name={field}
            value={formData[field]}
            onChange={handleChange}
            className="p-2 border rounded-lg w-full"
          >
            <option value="">Select Godown</option>
            {godownList.map((godown) => (
              <option key={godown.id} value={godown.id}>
                {godown.name}
              </option>
            ))}
          </select>
        );
      case "truck":
        return (
          <select
            name={field}
            value={formData[field]}
            onChange={handleChange}
            className="p-2 border rounded-lg w-full"
          >
            <option value="">Select Truck</option>
            {truckList.map((truck) => (
              <option key={truck.id} value={truck.id}>
                {truck.number}
              </option>
            ))}
          </select>
        );
      case "owner":
        return (
          <select
            name={field}
            value={formData[field]}
            onChange={handleChange}
            className="p-2 border rounded-lg w-full"
          >
            <option value="">Select Owner</option>
            {ownerList.map((owner) => (
              <option key={owner.id} value={owner.id}>
                {owner.name}
              </option>
            ))}
          </select>
        );
      case "driver":
        return (
          <select
            name={field}
            value={formData[field]}
            onChange={handleChange}
            className="p-2 border rounded-lg w-full"
          >
            <option value="">Select Driver</option>
            {driverList.map((driver) => (
              <option key={driver.id} value={driver.id}>
                {driver.name}
              </option>
            ))}
          </select>
        );
      case "tpDate":
        return (
          <input
            type="date"
            name={field}
            value={formData[field]}
            onChange={handleChange}
            className="p-2 border rounded-lg w-full"
          />
        );
      default:
        return (
          <input
            type="text"
            name={field}
            value={formData[field]}
            onChange={handleChange}
            className="p-2 border rounded-lg w-full"
            placeholder={`Enter ${field.replace(/([A-Z])/g, " $1").trim()}`}
          />
        );
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
                {renderField(field)}
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