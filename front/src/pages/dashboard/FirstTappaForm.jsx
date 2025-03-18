// import React, { useState, useEffect } from "react";
// import Swal from "sweetalert2";

// const URL = import.meta.env.VITE_API_BACK_URL;

// const TransportForm = ({ onClose, onSave, editData }) => {
//   const [formData, setFormData] = useState({
//     baseDepo: "",
//     doNo: "",
//     godown: "",
//     truck: "",
//     owner: "",
//     driver: "",
//     allocation: "",
//     packaging: "",
//     noOfBags: "",
//     grossWeight: "",
//     bardanWeight: "",
//     netWeight: "",
//     tpDate: "",
//     tpNo: "",
//   });

//   const [errors, setErrors] = useState({});
//   const [baseDepoList, setBaseDepoList] = useState([]);
//   const [doNoList, setDoNoList] = useState([]);
//   const [godownList, setGodownList] = useState([]);
//   const [truckList, setTruckList] = useState([]);
//   const [ownerList, setOwnerList] = useState([]);
//   const [driverList, setDriverList] = useState([]);

//   useEffect(() => {
//     fetchDropdownData();
//   }, []);

//   useEffect(() => {
//     if (editData) {
//       setFormData(editData);
//     }
//   }, [editData]);

//   const fetchDropdownData = async () => {
//     try {
//       const [
//         baseDepoRes,
//         doNoRes,
//         godownsRes,
//         trucksRes,
//         ownersRes,
//         driversRes
//       ] = await Promise.all([
//         fetch(`${URL}/tapa/mswc`),  // Fetch Base Depo data
//         fetch(`${URL}/tapa/mswc`), // Fetch DO Number data
//         fetch(`${URL}/tapa/subgodown`),
//         fetch(`${URL}/tapa/truck`),
//         fetch(`${URL}/tapa/owner`),
//         fetch(`${URL}/tapa/driver`)
//       ]);

//       const baseDepos = await baseDepoRes.json();
//       const doNumbers = await doNoRes.json();
//       const godowns = await godownsRes.json();
//       const trucks = await trucksRes.json();
//       const owners = await ownersRes.json();
//       const drivers = await driversRes.json();

//       setBaseDepoList(baseDepos);
//       setDoNoList(doNumbers);
//       setGodownList(godowns);
//       setTruckList(trucks);
//       setOwnerList(owners);
//       setDriverList(drivers);
//     } catch (error) {
//       console.error("Error fetching dropdown data:", error);
//       Swal.fire({ icon: "error", title: "Error", text: "Failed to fetch dropdown data" });
//     }
//   };

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
//     if (!formData.doNo) newErrors.doNo = "DO Number is required";
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

//   const renderField = (field) => {
//     switch (field) {
//       case "baseDepo":
//         return (
//           <select name={field} value={formData[field]} onChange={handleChange} className="p-2 border rounded-lg w-full">
//             <option value="">Select Base Depo</option>
//             {baseDepoList.map((depo) => (
//               <option key={depo.godownName} value={depo.godownName}>{depo.godownName}</option>
//             ))}
//           </select>
//         );
//       case "doNo":
//         return (
//           <select name={field} value={formData[field]} onChange={handleChange} className="p-2 border rounded-lg w-full">
//             <option value="">Select DO Number</option>
//             {doNoList.map((doItem) => (
//               <option key={doItem.id} value={doItem.id}>{doItem.godownName}</option>
//             ))}
//           </select>
//         );
//       case "godown":
//         return (
//           <select name={field} value={formData[field]} onChange={handleChange} className="p-2 border rounded-lg w-full">
//             <option value="">Select Godown</option>
//             {godownList.map((godown) => (
//               <option key={godown.id} value={godown.subGodown}>{godown.subGodown}</option>
//             ))}
//           </select>
//         );
//       case "truck":
//         return (
//           <select name={field} value={formData[field]} onChange={handleChange} className="p-2 border rounded-lg w-full">
//             <option value="">Select Truck</option>
//             {truckList.map((truck) => (
//               <option key={truck.uuid} value={truck.truck_name}>{truck.truck_name}</option>
//             ))}
//           </select>
//         );
//       case "owner":
//         return (
//           <select name={field} value={formData[field]} onChange={handleChange} className="p-2 border rounded-lg w-full">
//             <option value="">Select Owner</option>
//             {ownerList.map((owner) => (
//               <option key={owner.id} value={owner.id}>{owner.ownerName}</option>
//             ))}
//           </select>
//         );
//       case "driver":
//         return (
//           <select name={field} value={formData[field]} onChange={handleChange} className="p-2 border rounded-lg w-full">
//             <option value="">Select Driver</option>
//             {driverList.map((driver) => (
//               <option key={driver.id} value={driver.id}>{driver.driver_name}</option>
//             ))}
//           </select>
//         );
//       case "tpDate":
//         return <input type="date" name={field} value={formData[field]} onChange={handleChange} className="p-2 border rounded-lg w-full" />;
//       default:
//         return <input type="text" name={field} value={formData[field]} onChange={handleChange} className="p-2 border rounded-lg w-full" placeholder={`Enter ${field.replace(/([A-Z])/g, " $1").trim()}`} />;
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
//                 <label className="block text-sm font-medium text-gray-700">{field.replace(/([A-Z])/g, " $1").trim().replace(/^./, (str) => str.toUpperCase())}</label>
//                 {renderField(field)}
//                 {errors[field] && <p className="text-red-500 text-sm">{errors[field]}</p>}
//               </div>
//             ))}
//           </div>
//           <div className="flex justify-end space-x-2 mt-4">
//             <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded">Submit</button>
//             <button type="button" onClick={onClose} className="px-4 py-2 bg-red-500 text-white rounded">Cancel</button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default TransportForm;



import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";

const URL = import.meta.env.VITE_API_BACK_URL;

const TransportForm = ({ onClose, onSave, editData }) => {
  const [formData, setFormData] = useState({
    baseDepo: "",
    doNo: "",
    godown: "",
    truck: "",
    owner: "",
    driver: "",
    emptyWeight: "",
    allocation: "",
    scheme: "",
    packaging: "",
    noOfBags: "",
    grossWeight: "",
    bardanWeight: "",
    netWeight: "",
    tpDate: "",
    tpNo: "",
  });

  const [errors, setErrors] = useState({});
  const [baseDepoList, setBaseDepoList] = useState([]);
  const [doNoList, setDoNoList] = useState([]);
  const [godownList, setGodownList] = useState([]);
  const [truckList, setTruckList] = useState([]);
  const [ownerList, setOwnerList] = useState([]);
  const [driverList, setDriverList] = useState([]);
  const [scheme, setscheme] = useState([]);
  const [packaging, setpackaging] = useState([])

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
      const [
        baseDepoRes,
        doNoRes,
        godownsRes,
        trucksRes,
        ownersRes,
        driversRes,
        schemeRes,
        packagingRes
      ] = await Promise.all([
        fetch(`${URL}/tapa/mswc`),  // Fetch Base Depo data
        fetch(`${URL}/tapa/mswc`), // Fetch DO Number data
        fetch(`${URL}/tapa/subgodown`),
        fetch(`${URL}/tapa/truck`),
        fetch(`${URL}/tapa/owner`),
        fetch(`${URL}/tapa/driver`),
        fetch(`${URL}/tapa/scheme`),
        fetch(`${URL}/tapa/pkg`)
      ]);

      const baseDepos = await baseDepoRes.json();
      const doNumbers = await doNoRes.json();
      const godowns = await godownsRes.json();
      const trucks = await trucksRes.json();
      const owners = await ownersRes.json();
      const drivers = await driversRes.json();
      const schemes = await schemeRes.json();
      const packaging = await packagingRes.json();

      setBaseDepoList(baseDepos);
      setDoNoList(doNumbers);
      setGodownList(godowns);
      setTruckList(trucks);
      setOwnerList(owners);
      setDriverList(drivers);
      setscheme(schemes);
      setpackaging(packaging);
    } catch (error) {
      console.error("Error fetching dropdown data:", error);
      Swal.fire({ icon: "error", title: "Error", text: "Failed to fetch dropdown data" });
    }
  };

  // const handleChange = (e) => {
  //   const { name, value } = e.target;
  //   setFormData({ ...formData, [name]: value });
  //   if (errors[name]) {
  //     setErrors({ ...errors, [name]: "" });
  //   }
  // };

  const handleChange = (e) => {
    const { name, value } = e.target;
  
    // If truck is selected, find and update empty weight
    if (name === "truck") {
      const selectedTruck = truckList.find(truck => truck.truck_name === value);
      if (selectedTruck) {
        setFormData(prevState => ({
          ...prevState,
          [name]: value,
          emptyWeight: selectedTruck.empty_weight || ""  // Update empty weight
        }));
      } else {
        setFormData(prevState => ({ ...prevState, [name]: value }));
      }
    } else {
      setFormData(prevState => ({ ...prevState, [name]: value }));
    }
  
    // Clear errors
    if (errors[name]) {
      setErrors(prevErrors => ({ ...prevErrors, [name]: "" }));
    }
  };
  

  const validateForm = () => {
    let newErrors = {};
    if (!formData.baseDepo) newErrors.baseDepo = "Base Depo is required";
    if (!formData.doNo) newErrors.doNo = "DO Number is required";
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
      case "baseDepo":
        return (
          <select name={field} value={formData[field]} onChange={handleChange} className="p-2 border rounded-lg w-full">
            <option value="">Select Base Depo</option>
            {baseDepoList.map((depo) => (
              <option key={depo.godownName} value={depo.godownName}>{depo.godownName}</option>
            ))}
          </select>
        );
      case "doNo":
        return (
          <select name={field} value={formData[field]} onChange={handleChange} className="p-2 border rounded-lg w-full">
            <option value="">Select DO Number</option>
            {doNoList.map((doItem) => (
              <option key={doItem.id} value={doItem.id}>{doItem.Name}</option>
            ))}
          </select>
        );
      case "godown":
        return (
          <select name={field} value={formData[field]} onChange={handleChange} className="p-2 border rounded-lg w-full">
            <option value="">Select Godown</option>
            {godownList.map((godown) => (
              <option key={godown.id} value={godown.subGodown}>{godown.subGodown}</option>
            ))}
          </select>
        );
      case "truck":
        return (
          <select name={field} value={formData[field]} onChange={handleChange} className="p-2 border rounded-lg w-full">
            <option value="">Select Truck</option>
            {truckList.map((truck) => (
              <option key={truck.uuid} value={truck.truck_name}>{truck.truck_name}</option>
            ))}
          </select>
        );
      case "owner":
        return (
          <select name={field} value={formData[field]} onChange={handleChange} className="p-2 border rounded-lg w-full">
            <option value="">Select Owner</option>
            {ownerList.map((owner) => (
              <option key={owner.id} value={owner.id}>{owner.ownerName}</option>
            ))}
          </select>
        );
      case "driver":
        return (
          <select name={field} value={formData[field]} onChange={handleChange} className="p-2 border rounded-lg w-full">
            <option value="">Select Driver</option>
            {driverList.map((driver) => (
              <option key={driver.id} value={driver.id}>{driver.driver_name}</option>
            ))}
          </select>
        );
        case "scheme":
          return (
            <select name={field} value={formData[field]} onChange={handleChange} className="p-2 border rounded-lg w-full">
              <option value="">Select Scheme</option>
              {scheme.map((sch) => (
                <option key={sch.id} value={sch.id}>{sch.scheme_name}</option>
              ))}
            </select>
          );
          case "packaging":
            return (
              <select name={field} value={formData[field]} onChange={handleChange} className="p-2 border rounded-lg w-full">
                <option value="">Select one</option>
                {packaging.map((p) => (
                  <option key={p.id} value={p.id}>{p.material_name}</option>
                ))}
              </select>
            );
      case "tpDate":
        return <input type="date" name={field} value={formData[field]} onChange={handleChange} className="p-2 border rounded-lg w-full" />;
      default:
        return <input type="text" name={field} value={formData[field]} onChange={handleChange} className="p-2 border rounded-lg w-full" placeholder={`Enter ${field.replace(/([A-Z])/g, " $1").trim()}`} />;
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 z-50">
      <div className="bg-white rounded-lg shadow-lg w-4/5 max-w-4xl p-6">
        <h2 className="text-xl font-semibold py-3 px-4 text-start ">Transport Form</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-3 gap-4">
            {Object.keys(formData).map((field) => (
              <div key={field}>
                <label className="block text-sm font-medium text-gray-700">{field.replace(/([A-Z])/g, " $1").trim().replace(/^./, (str) => str.toUpperCase())}</label>
                {renderField(field)}
                {errors[field] && <p className="text-red-500 text-sm">{errors[field]}</p>}
              </div>
            ))}
          </div>
          <div className="flex justify-end space-x-2 mt-4">
            <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded">Submit</button>
            <button type="button" onClick={onClose} className="px-4 py-2 bg-red-500 text-white rounded">Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TransportForm;
