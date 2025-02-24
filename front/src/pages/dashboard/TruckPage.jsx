// import React, { useState, useEffect } from "react";
// import TruckForm from "./TruckForm";
// import { formatDate } from "@/util/libs/formatDate";

// const TruckPage = () => {
//   const [trucks, setTrucks] = useState([]);
//   const [editData, setEditData] = useState(null);
//   const [showForm, setShowForm] = useState(false);

//   useEffect(() => {
//     fetchTrucks();
//   }, []);

//   const fetchTrucks = async () => {
//     try {
//       const response = await fetch("http://localhost:5000/api/truck");
//       const data = await response.json();
//       setTrucks(data);
//     } catch (error) {
//       console.error("Error fetching trucks:", error);
//     }
//   };

//   const handleSave = () => {
//     fetchTrucks();
//     setShowForm(false);
//     setEditData(null);
//   };

//   const handleEdit = (truck) => {
//     setEditData(truck);
//     setShowForm(true);
//   };

//   const handleDelete = async (uuid) => {
//     if (window.confirm("Are you sure you want to delete this truck?")) {
//       try {
//         await fetch(`http://localhost:5000/api/truck/${uuid}`, { method: "DELETE" });
//         fetchTrucks();
//       } catch (error) {
//         console.error("Error deleting truck:", error);
//       }
//     }
//   };

//   return (

//     <>
//     <div className="p-6">
//       <h1 className="text-2xl font-bold mb-4">Truck Management</h1>
//       <button onClick={() => setShowForm(true)} className="bg-green-600 text-white py-2 px-4 rounded-lg mb-4">
//         Add Truck
//       </button>
//       {showForm && <TruckForm onClose={() => setShowForm(false)} onSave={handleSave} editData={editData} />}
//       <div className="overflow-x-auto">
//         <table className="min-w-full bg-white border border-gray-300">
//           <thead>
//             <tr className="bg-gray-200">
//               <th className="border px-4 py-2">Name</th>
//               <th className="border px-4 py-2">Status</th>
//               <th className="border px-4 py-2">Empty Weight</th>
//               <th className="border px-4 py-2">Company</th>
//               <th className="border px-4 py-2">GVW</th>
//               <th className="border px-4 py-2">Reg Date</th>
//               <th className="border px-4 py-2">Owner</th>
//               <th className="border px-4 py-2">Owner ID</th>
//               <th className="border px-4 py-2">Tax Validity</th>
//               <th className="border px-4 py-2">Insurance Validity</th>
//               <th className="border px-4 py-2">Fitness Validity</th>
//               <th className="border px-4 py-2">Permit Validity</th>
//               <th className="border px-4 py-2">Direct Sale</th>
//               <th className="border px-4 py-2">Actions</th>
//             </tr>
//           </thead>
//           <tbody>
//             {trucks.map((truck) => (
//               <tr key={truck.uuid} className="border">
//                 <td className="border px-4 py-2">{truck.truck_name}</td>
//                 <td className="border px-4 py-2">{truck.truck_status}</td>
//                 <td className="border px-4 py-2">{truck.empty_weight}</td>
//                 <td className="border px-4 py-2">{truck.company}</td>
//                 <td className="border px-4 py-2">{truck.gvw}</td>
//                 <td className="border px-4 py-2">{formatDate(truck.reg_date)}</td>
//                 <td className="border px-4 py-2">{truck.truck_owner_name}</td>
//                 <td className="border px-4 py-2">{truck.owner_id}</td>
//                 <td className="border px-4 py-2">{formatDate(truck.tax_validity)}</td>
//                 <td className="border px-4 py-2">{formatDate(truck.insurance_validity)}</td>
//                 <td className="border px-4 py-2">{formatDate(truck.fitness_validity)}</td>
//                 <td className="border px-4 py-2">{formatDate(truck.permit_validity)}</td>
//                 <td className="border px-4 py-2">{truck.direct_sale}</td>
//                 <td className="border px-4 py-2 flex space-x-2">
//                   <button
//                     onClick={() => handleEdit(truck)}
//                     className="bg-blue-600 text-white px-3 py-1 rounded-lg"
//                   >
//                     Edit
//                   </button>
//                   <button
//                     onClick={() => handleDelete(truck.uuid)}
//                     className="bg-red-600 text-white px-3 py-1 rounded-lg"
//                   >
//                     Delete
//                   </button>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     </div>
//     </>
//   );
// };

// export default TruckPage;






import React, { useState, useEffect } from "react";
import TruckForm from "./TruckForm";
import { formatDate } from "@/util/libs/formatDate";

const TruckPage = () => {
  const [trucks, setTrucks] = useState([]);
  const [editData, setEditData] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchTrucks();
  }, []);

  const fetchTrucks = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/truck");
      const data = await response.json();
      setTrucks(data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching trucks:", error);
      setError("Failed to fetch data");
      setLoading(false);
    }
  };

  const handleSave = () => {
    fetchTrucks();
    setShowForm(false);
    setEditData(null);
  };

  const handleEdit = (truck) => {
    setEditData(truck);
    setShowForm(true);
  };

  const handleDelete = async (uuid) => {
    if (window.confirm("Are you sure you want to delete this truck?")) {
      try {
        await fetch(`http://localhost:5000/api/truck/${uuid}`, { method: "DELETE" });
        fetchTrucks();
      } catch (error) {
        console.error("Error deleting truck:", error);
        alert("Error deleting data.");
      }
    }
  };

  const filteredTrucks = trucks.filter((t) =>
    t.truck_name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="flex flex-col h-full w-full p-4 bg-gray-100">
      <div className="bg-blue-600 text-white text-lg font-semibold py-4 px-6 rounded-md w-full">
        Truck Management
      </div>
      <div className="flex justify-between items-center bg-white p-3 mt-2 rounded-md shadow-md">
        <input
          type="text"
          placeholder="Search Truck..."
          className="border p-2 rounded-md w-full max-w-lg"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button
          className="ml-3 bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700"
          onClick={() => {
            setEditData(null);
            setShowForm(!showForm);
          }}
        >
          {showForm ? "Close" : "Add"}
        </button>
      </div>

      {showForm && (
        <div className="mt-3 bg-white p-4 rounded-md shadow-md">
          <TruckForm onClose={() => setShowForm(false)} onSave={handleSave} editData={editData} />
        </div>
      )}

      {loading && <p>Loading...</p>}
      {error && <p className="text-red-500">{error}</p>}

      <table className="w-full border-collapse border border-gray-300 mt-4 bg-white shadow-md rounded-md">
        <thead>
          <tr className="bg-gray-200">
          <th className="border p-2">ID</th>
            <th className="border p-2">Name</th>
            <th className="border p-2">Status</th>
            <th className="border p-2">Empty Weight</th>
            <th className="border p-2">Company</th>
            <th className="border p-2">GVW</th>
            <th className="border p-2">Reg Date</th>
            <th className="border p-2">Owner</th>
            <th className="border p-2">Tax Validity</th>
            <th className="border p-2">Insurance Validity</th>
            <th className="border p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredTrucks.length > 0 ? (
            filteredTrucks.map((truck) => (
              <tr key={truck.uuid} className="text-center hover:bg-gray-100">
                <td className="border p-2">{truck.order_number}</td>
                <td className="border p-2">{truck.truck_name}</td>
                <td className="border p-2">{truck.truck_status}</td>
                <td className="border p-2">{truck.empty_weight}</td>
                <td className="border p-2">{truck.company}</td>
                <td className="border p-2">{truck.gvw}</td>
                <td className="border p-2">{formatDate(truck.reg_date)}</td>
                <td className="border p-2">{truck.truck_owner_name}</td>
                <td className="border p-2">{formatDate(truck.tax_validity)}</td>
                <td className="border p-2">{formatDate(truck.insurance_validity)}</td>
                <td className="border p-2">
                  <div className="flex justify-center space-x-2">
                    <button
                      onClick={() => handleEdit(truck)}
                      className="bg-blue-500 text-white px-3 py-1 rounded-lg hover:bg-blue-700"
                    >
                      ✏️
                    </button>
                    <button
                      onClick={() => handleDelete(truck.uuid)}
                      className="bg-red-500 text-white px-3 py-1 rounded-lg hover:bg-red-700"
                    >
                      🗑️
                    </button>
                  </div>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="10" className="text-center p-4">No records found</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default TruckPage;
