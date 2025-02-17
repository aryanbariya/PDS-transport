// import React, { useState, useEffect } from "react";
// <<<<<<< HEAD
// =======
// import axios from "axios";
// >>>>>>> 59f95b0 (Resolved merge conflicts)
// import TruckForm from "./TruckForm";

// const TruckPage = () => {
//   const [trucks, setTrucks] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
// <<<<<<< HEAD
//   const [editData, setEditData] = useState(null);
// =======
//   const [selectedTruck, setSelectedTruck] = useState(null);
// >>>>>>> 59f95b0 (Resolved merge conflicts)
//   const [showForm, setShowForm] = useState(false);
//   const [searchTerm, setSearchTerm] = useState("");

//   const fetchTrucks = async () => {
//     try {
// <<<<<<< HEAD
//       const response = await fetch("http://localhost:5000/api/truck");
//       if (!response.ok) throw new Error("Failed to fetch trucks");
//       const data = await response.json();
//       console.log('fafad',data)
//       setTrucks(data || []);
// =======
//       const response = await axios.get("http://localhost:5000/api/trucks");
//       setTrucks(response.data || []);
// >>>>>>> 59f95b0 (Resolved merge conflicts)
//       setLoading(false);
//     } catch (err) {
//       setError(err.message);
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchTrucks();
//   }, []);

//   const handleDelete = async (uuid) => {
//     if (!window.confirm("Are you sure you want to delete this truck?")) return;
//     try {
// <<<<<<< HEAD
//       const response = await fetch(`http://localhost:5000/api/truck/${uuid}`, {
//         method: "DELETE",
//       });
//       if (response.ok) {
// =======
//       const response = await axios.delete(`http://localhost:5000/api/trucks/${uuid}`);
//       if (response.status === 200) {
// >>>>>>> 59f95b0 (Resolved merge conflicts)
//         alert("Truck deleted successfully!");
//         fetchTrucks();
//       } else {
//         alert("Failed to delete truck.");
//       }
//     } catch (err) {
//       console.error("Error deleting truck:", err);
//       alert("Error deleting data.");
//     }
//   };

//   const handleEdit = (truck) => {
// <<<<<<< HEAD
//     setEditData(truck);
//     setShowForm(true);
//   };

//   const handleSave = async () => {
//     setShowForm(false);
//     setEditData(null);
//     fetchTrucks();
//   };

//   const filteredTrucks = trucks.filter(
//     (t) => t.truckNo.toLowerCase().includes(searchTerm.toLowerCase())
// =======
//     setSelectedTruck(truck);
//     setShowForm(true);
//   };

//   const filteredTrucks = trucks.filter(
//     (t) =>
//       t.truck_no.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       t.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       t.owner.toLowerCase().includes(searchTerm.toLowerCase())
// >>>>>>> 59f95b0 (Resolved merge conflicts)
//   );

//   return (
//     <div className="flex flex-col h-full w-full p-4 bg-gray-100">
//       <div className="bg-blue-600 text-white text-lg font-semibold py-4 px-6 rounded-md w-full">
//         Truck List
//       </div>

//       <div className="flex justify-between items-center bg-white p-3 mt-2 rounded-md shadow-md">
//         <input
//           type="text"
//           placeholder="Search Truck..."
//           className="border p-2 rounded-md w-full max-w-lg"
//           value={searchTerm}
//           onChange={(e) => setSearchTerm(e.target.value)}
//         />
//         <button
//           className="ml-3 bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700"
//           onClick={() => {
// <<<<<<< HEAD
//             setEditData(null);
//             setShowForm(!showForm);
//           }}
//         >
//           {showForm ? "Close" : "Add Truck"}
// =======
//             setSelectedTruck(null);  // Reset selectedTruck when adding a new truck
//             setShowForm(!showForm);
//           }}
//         >
//           {showForm ? "Close" : "Add"}
// >>>>>>> 59f95b0 (Resolved merge conflicts)
//         </button>
//       </div>

//       {showForm && (
//         <div className="mt-3 bg-white p-4 rounded-md shadow-md">
// <<<<<<< HEAD
//           <TruckForm onClose={() => setShowForm(false)} onSave={handleSave} editData={editData} />
// =======
//           <TruckForm fetchTrucks={fetchTrucks} selectedTruck={selectedTruck} setSelectedTruck={setSelectedTruck} />
// >>>>>>> 59f95b0 (Resolved merge conflicts)
//         </div>
//       )}

//       {loading && <p>Loading...</p>}
//       {error && <p className="text-red-500">{error}</p>}

//       <table className="w-full border-collapse border border-gray-300 mt-4 bg-white shadow-md rounded-md">
//         <thead>
//           <tr className="bg-gray-200">
// <<<<<<< HEAD
//             <th className="border p-2">Truck No</th>
//             <th className="border p-2">Company</th>
//             <th className="border p-2">GVW</th>
//             <th className="border p-2">Owner</th>
// =======
//             <th className="border p-2">Order Number</th>
//             <th className="border p-2">Truck No</th>
//             <th className="border p-2">Company</th>
//             <th className="border p-2">GVW</th>
//             <th className="border p-2">Registration Date</th>
//             <th className="border p-2">Owner</th>
//             <th className="border p-2">Unloaded Weight</th>
//             <th className="border p-2">Tax Validity</th>
//             <th className="border p-2">Insurance Validity</th>
//             <th className="border p-2">Fitness Validity</th>
//             <th className="border p-2">Permit Validity</th>
//             <th className="border p-2">Direct Truck</th>
//             <th className="border p-2">Created At</th>
// >>>>>>> 59f95b0 (Resolved merge conflicts)
//             <th className="border p-2">Actions</th>
//           </tr>
//         </thead>
//         <tbody>
//           {filteredTrucks.length > 0 ? (
// <<<<<<< HEAD
//             filteredTrucks.map((t) => (
//               <tr key={t.uuid} className="text-center hover:bg-gray-100">
//                 <td className="border p-2">{t.truckNo}</td>
//                 <td className="border p-2">{t.company}</td>
//                 <td className="border p-2">{t.gvw}</td>
//                 <td className="border p-2">{t.owner}</td>
//                 <td className="border p-2">
//                   <div className="flex justify-center space-x-2">
//                     <button onClick={() => handleEdit(t)} className="bg-blue-500 text-white px-3 py-1 rounded-lg hover:bg-blue-700">
//                       ✏️
//                     </button>
//                     <button onClick={() => handleDelete(t.uuid)} className="bg-red-500 text-white px-3 py-1 rounded-lg hover:bg-red-700">
// =======
//             filteredTrucks.map((truck) => (
//               <tr key={truck.uuid} className="text-center hover:bg-gray-100">
//                 <td className="border p-2">{truck.order_number}</td>
//                 <td className="border p-2">{truck.truck_no}</td>
//                 <td className="border p-2">{truck.company}</td>
//                 <td className="border p-2">{truck.gvw}</td>
//                 <td className="border p-2">{truck.registration_date}</td>
//                 <td className="border p-2">{truck.owner}</td>
//                 <td className="border p-2">{truck.unloaded_weight}</td>
//                 <td className="border p-2">{truck.tax_validity}</td>
//                 <td className="border p-2">{truck.insurance_validity}</td>
//                 <td className="border p-2">{truck.fitness_validity}</td>
//                 <td className="border p-2">{truck.permit_validity}</td>
//                 <td className="border p-2">{truck.direct_truck}</td>
//                 <td className="border p-2">{truck.created_at}</td>
//                 <td className="border p-2">
//                   <div className="flex justify-center space-x-2">
//                     <button
//                       onClick={() => handleEdit(truck)}
//                       className="bg-blue-500 text-white px-3 py-1 rounded-lg hover:bg-blue-700"
//                     >
//                       ✏️
//                     </button>
//                     <button
//                       onClick={() => handleDelete(truck.uuid)}  // Using UUID for delete
//                       className="bg-red-500 text-white px-3 py-1 rounded-lg hover:bg-red-700"
//                     >
// >>>>>>> 59f95b0 (Resolved merge conflicts)
//                       🗑️
//                     </button>
//                   </div>
//                 </td>
//               </tr>
//             ))
//           ) : (
//             <tr>
// <<<<<<< HEAD
//               <td colSpan="5" className="text-center p-4">No records found</td>
// =======
//               <td colSpan="13" className="text-center p-4">No records found</td>
// >>>>>>> 59f95b0 (Resolved merge conflicts)
//             </tr>
//           )}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// <<<<<<< HEAD
// export default TruckPage;
// =======
// export default TruckPage;
// >>>>>>> 59f95b0 (Resolved merge conflicts)


import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const TruckPage = () => {
  const [trucks, setTrucks] = useState([]);
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    axios.get("http://localhost:5000/trucks")
      .then((res) => setTrucks(res.data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div>
      <h2>Truck Information</h2>
      <input 
        type="text" 
        placeholder="Search Truck..." 
        onChange={(e) => setSearch(e.target.value)} 
      />
      <button onClick={() => navigate("/add-truck")}>Add Truck</button>
      <table border="1">
        <thead>
          <tr>
            <th>Truck Name</th>
            <th>Status</th>
            <th>Empty Weight</th>
            <th>Company</th>
            <th>GVW</th>
            <th>Reg Date</th>
            <th>Owner Name</th>
            <th>Owner ID</th>
            <th>Tax Validity</th>
            <th>Insurance</th>
            <th>Fitness</th>
            <th>Permit</th>
            <th>Direct Sale</th>
          </tr>
        </thead>
        <tbody>
          {trucks
            .filter(truck => truck.truck_name.toLowerCase().includes(search.toLowerCase()))
            .map((truck) => (
              <tr key={truck.uuid}>
                <td>{truck.truck_name}</td>
                <td>{truck.truck_status}</td>
                <td>{truck.empty_weight}</td>
                <td>{truck.company}</td>
                <td>{truck.gvw}</td>
                <td>{truck.reg_date}</td>
                <td>{truck.truck_owner_name}</td>
                <td>{truck.owner_id}</td>
                <td>{truck.tax_validity}</td>
                <td>{truck.insurance_validity}</td>
                <td>{truck.fitness_validity}</td>
                <td>{truck.permit_validity}</td>
                <td>{truck.direct_sale}</td>
              </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TruckPage;
