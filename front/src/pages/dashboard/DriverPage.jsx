// import React, { useState, useEffect } from "react";
// import DriverForm from "./DriverForm";
// const URL = import.meta.env.VITE_API_BACK_URL;

// const DriverPage = () => {
//   const [drivers, setDrivers] = useState([]);
//   const [editData, setEditData] = useState(null);
//   const [showForm, setShowForm] = useState(false);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     fetchDrivers();
//   }, []);

//   const fetchDrivers = async () => {
//     try {
//       const response = await fetch(`${URL}/api/drivers`);
//       const data = await response.json();
//       setDrivers(data);
//       setLoading(false);
//     } catch (error) {
//       console.error("Error fetching drivers:", error);
//       setError("Failed to fetch data");
//       setLoading(false);
//     }
//   };

//   const handleSave = () => {
//     fetchDrivers();
//     setShowForm(false);
//     setEditData(null);
//   };

//   const handleEdit = (driver) => {
//     setEditData(driver);
//     setShowForm(true);
//   };

//   const handleDelete = async (uuid) => {
//     if (window.confirm("Are you sure you want to delete this driver?")) {
//       try {
//         await fetch(`${URL}/api/driver/${uuid}`, { method: "DELETE" });
//         fetchDrivers();
//       } catch (error) {
//         console.error("Error deleting driver:", error);
//         alert("Error deleting data.");
//       }
//     }
//   };

//   const filteredDrivers = drivers.filter((d) =>
//     d.driver_name.toLowerCase().includes(searchTerm.toLowerCase())
//   );

//   return (
//     <div className="flex flex-col h-full w-full p-4 bg-gray-100">
//       <div className="bg-blue-600 text-white text-lg font-semibold py-4 px-6 rounded-md w-full">
//         Driver Management
//       </div>
//       <div className="flex justify-between items-center bg-white p-3 mt-2 rounded-md shadow-md">
//         <input
//           type="text"
//           placeholder="Search Driver..."
//           className="border p-2 rounded-md w-full max-w-lg"
//           value={searchTerm}
//           onChange={(e) => setSearchTerm(e.target.value)}
//         />
//         <button
//           className="ml-3 bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700"
//           onClick={() => {
//             setEditData(null);
//             setShowForm(!showForm);
//           }}
//         >
//           {showForm ? "Close" : "Add"}
//         </button>
//       </div>

//       {showForm && (
//         <div className="mt-3 bg-white p-4 rounded-md shadow-md">
//           <DriverForm onClose={() => setShowForm(false)} onSave={handleSave} editData={editData} />
//         </div>
//       )}

//       {loading && <p>Loading...</p>}
//       {error && <p className="text-red-500">{error}</p>}

//       <table className="w-full border-collapse border border-gray-300 mt-4 bg-white shadow-md rounded-md">
//         <thead>
//           <tr className="bg-gray-200">
//             <th className="border p-2">ID</th>
//             <th className="border p-2">Driver Name</th>
//             <th className="border p-2">Aadhar Card No.</th>
//             <th className="border p-2">Contact</th>
//             <th className="border p-2">Driving License No.</th>
//             <th className="border p-2">Actions</th>
//           </tr>
//         </thead>
//         <tbody>
//           {filteredDrivers.length > 0 ? (
//             filteredDrivers.map((driver) => (
//               <tr key={driver.uuid} className="text-center hover:bg-gray-100">
//                 <td className="border p-2">{driver.order_number}</td>
//                 <td className="border p-2">{driver.driver_name}</td>
//                 <td className="border p-2">{driver.aadhar_card_no}</td>
//                 <td className="border p-2">{driver.contact}</td>
//                 <td className="border p-2">{driver.driving_license_no}</td>
//                 <td className="border p-2">
//                   <div className="flex justify-center space-x-2">
//                     <button
//                       onClick={() => handleEdit(driver)}
//                       className="bg-blue-500 text-white px-3 py-1 rounded-lg hover:bg-blue-700"
//                     >
//                       ✏️
//                     </button>
//                     <button
//                       onClick={() => handleDelete(driver.uuid)}
//                       className="bg-red-500 text-white px-3 py-1 rounded-lg hover:bg-red-700"
//                     >
//                       🗑️
//                     </button>
//                   </div>
//                 </td>
//               </tr>
//             ))
//           ) : (
//             <tr>
//               <td colSpan="6" className="text-center p-4">No records found</td>
//             </tr>
//           )}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default DriverPage;




import React, { useState, useEffect, useRef } from "react";
import DriverForm from "./DriverForm";
import $ from "jquery";
import "datatables.net";

const URL = import.meta.env.VITE_API_BACK_URL;

const DriverPage = () => {
  const [drivers, setDrivers] = useState([]);
  const [editData, setEditData] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const tableRef = useRef(null);

  useEffect(() => {
    fetchDrivers();
  }, []);

  const fetchDrivers = async () => {
    try {
      const response = await fetch(`${URL}/api/drivers`);
      if (!response.ok) throw new Error("Failed to fetch data");
      const data = await response.json();
      setDrivers(data || []);
      setLoading(false);
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  useEffect(() => {
    if (drivers.length > 0) {
      if (!$.fn.DataTable.isDataTable(tableRef.current)) {
        $(tableRef.current).DataTable({
          paging: true,
          searching: true,
          info: true,
          responsive: true,
          autoWidth: false,
          lengthMenu: [5, 10, 25, 50],
        });
      }
    }
  }, [drivers]);

  const handleDelete = async (uuid) => {
    if (!window.confirm("Are you sure you want to delete this driver?")) return;
    try {
      const response = await fetch(`${URL}/api/driver/${uuid}`, {
        method: "DELETE",
      });
      if (response.ok) {
        alert("Driver deleted successfully!");
        fetchDrivers();
      } else {
        alert("Failed to delete driver.");
      }
    } catch (err) {
      console.error("Error deleting driver:", err);
      alert("Error deleting data.");
    }
  };

  const handleEdit = (driver) => {
    setEditData(driver);
    setShowForm(true);
  };

  const handleSave = async () => {
    setShowForm(false);
    setEditData(null);
    fetchDrivers();
  };

  const filteredDrivers = drivers.filter(
    (d) =>
      d.driver_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      d.aadhar_card_no.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="flex flex-col h-full w-full p-4 bg-gray-100">
      <div className="bg-blue-600 text-white text-lg font-semibold py-4 px-6 rounded-md w-full">
        Driver Management
      </div>
      <div className="flex justify-between items-center bg-white p-3 mt-2 rounded-md shadow-md">
        <input
          type="text"
          placeholder="Search Driver..."
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
          <DriverForm onClose={() => setShowForm(false)} onSave={handleSave} editData={editData} />
        </div>
      )}

      {loading && <p>Loading...</p>}
      {error && <p className="text-red-500">{error}</p>}

      <table
        ref={tableRef}
        className="w-full text-sm text-left text-gray-600 mt-4 bg-white shadow-md rounded-md"
      >
        <thead className="bg-gray-200 text-gray-700 uppercase">
          <tr>
            <th className="px-4 py-3">ID</th>
            <th className="px-4 py-3">Driver Name</th>
            <th className="px-4 py-3">Aadhar Card No.</th>
            <th className="px-4 py-3">Contact</th>
            <th className="px-4 py-3">Driving License No.</th>
            <th className="px-4 py-3">Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredDrivers.map((driver) => (
            <tr key={driver.uuid} className="border-b hover:bg-gray-100">
              <td className="px-4 py-3">{driver.order_number}</td>
              <td className="px-4 py-3">{driver.driver_name}</td>
              <td className="px-4 py-3">{driver.aadhar_card_no}</td>
              <td className="px-4 py-3">{driver.contact}</td>
              <td className="px-4 py-3">{driver.driving_license_no}</td>
              <td className="px-4 py-3 flex space-x-2">
                <button
                  onClick={() => handleEdit(driver)}
                  className="bg-blue-500 text-white px-3 py-1 rounded-lg hover:bg-blue-700"
                >
                  ✏️
                </button>
                <button
                  onClick={() => handleDelete(driver.uuid)}
                  className="bg-red-500 text-white px-3 py-1 rounded-lg hover:bg-red-700"
                >
                  🗑️
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DriverPage;
