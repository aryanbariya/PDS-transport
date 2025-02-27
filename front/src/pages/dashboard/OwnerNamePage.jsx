// import React, { useState, useEffect } from "react";
// import OwnerNameForm from "./OwnerNameForm";
// const URL = import.meta.env.VITE_API_BACK_URL

// const OwnerNamePage = () => {
//   const [owners, setOwners] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [editData, setEditData] = useState(null);
//   const [showForm, setShowForm] = useState(false);
//   const [searchTerm, setSearchTerm] = useState("");

//   // ✅ Fetch owners from backend
//   const fetchOwners = async () => {
//     try {
//       const response = await fetch(`${URL}/api/owners`);
//       if (!response.ok) throw new Error("Failed to fetch data");
//       const data = await response.json();
//       setOwners(data || []);
//       setLoading(false);
//     } catch (err) {
//       setError(err.message);
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchOwners();
//   }, []);

//   // ✅ Handle Delete
//   const handleDelete = async (uuid) => {
//     if (!window.confirm("Are you sure you want to delete this owner?")) return;
//     try {
//       const response = await fetch(`${URL}/api/owners/${uuid}`, {
//         method: "DELETE",
//       });
//       if (response.ok) {
//         alert("Owner deleted successfully!");
//         fetchOwners();
//       } else {
//         alert("Failed to delete owner.");
//       }
//     } catch (err) {
//       console.error("Error deleting owner:", err);
//       alert("Error deleting data.");
//     }
//   };

//   // ✅ Handle Edit
//   const handleEdit = (owner) => {
//     setEditData(owner);
//     setShowForm(true);
//   };

//   // ✅ Handle Save after Form Submission
//   const handleSave = async () => {
//     setShowForm(false);
//     setEditData(null);
//     fetchOwners();
//   };

//   // ✅ Filter Owners by Search Term
//   const filteredOwners = owners.filter(
//     (o) =>
//       o.ownerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       o.contact.toLowerCase().includes(searchTerm.toLowerCase())
//   );

//   return (
//     <div className="flex flex-col h-full w-full p-4 bg-gray-100">
//       <div className="bg-blue-600 text-white text-lg font-semibold py-4 px-6 rounded-md w-full">
//         Owner List
//       </div>

//       <div className="flex justify-between items-center bg-white p-3 mt-2 rounded-md shadow-md">
//         <input
//           type="text"
//           placeholder="Search Owner..."
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
//           <OwnerNameForm onClose={() => setShowForm(false)} onSave={handleSave} editData={editData} />
//         </div>
//       )}

//       {loading && <p>Loading...</p>}
//       {error && <p className="text-red-500">{error}</p>}

//       <table className="w-full border-collapse border border-gray-300 mt-4 bg-white shadow-md rounded-md">
//         <thead>
//           <tr className="bg-gray-200">
//             <th className="border p-2">ID</th>
//             <th className="border p-2">Owner Name</th>
//             <th className="border p-2">Contact</th>
//             <th className="border p-2">Address</th>
//             <th className="border p-2">Email ID</th>
//             <th className="border p-2">Actions</th>
//           </tr>
//         </thead>
//         <tbody>
//           {filteredOwners.length > 0 ? (
//             filteredOwners.map((o) => (
//               <tr key={o.uuid} className="text-center hover:bg-gray-100">
//                 <td className="border p-2">{o.order_number}</td>
//                 <td className="border p-2">{o.ownerName}</td>
//                 <td className="border p-2">{o.contact}</td>
//                 <td className="border p-2">{o.address}</td>
//                 <td className="border p-2">{o.emailID}</td>
//                 <td className="border p-2">
//                   <div className="flex justify-center space-x-2">
//                     <button onClick={() => handleEdit(o)} className="bg-blue-500 text-white px-3 py-1 rounded-lg hover:bg-blue-700">
//                       ✏️
//                     </button>
//                     <button onClick={() => handleDelete(o.uuid)} className="bg-red-500 text-white px-3 py-1 rounded-lg hover:bg-red-700">
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

// export default OwnerNamePage;




import React, { useState, useEffect, useRef } from "react";
import OwnerNameForm from "./OwnerNameForm";
import $ from "jquery";
import "datatables.net";

const URL = import.meta.env.VITE_API_BACK_URL;

const OwnerNamePage = () => {
  const [owners, setOwners] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editData, setEditData] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const tableRef = useRef(null);

  // ✅ Fetch owners from backend
  const fetchOwners = async () => {
    try {
      const response = await fetch(`${URL}/api/owners`);
      if (!response.ok) throw new Error("Failed to fetch owner records");
      const data = await response.json();
      setOwners(data || []);
      setLoading(false);
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOwners();
  }, []);

  useEffect(() => {
    if (owners.length > 0) {
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
  }, [owners]);

  // ✅ Handle Delete
  const handleDelete = async (uuid) => {
    if (!window.confirm("Are you sure you want to delete this owner?")) return;
    try {
      const response = await fetch(`${URL}/api/owners/${uuid}`, {
        method: "DELETE",
      });
      if (response.ok) {
        alert("Owner deleted successfully!");
        fetchOwners();
      } else {
        alert("Failed to delete owner.");
      }
    } catch (err) {
      console.error("Error deleting owner:", err);
      alert("Error deleting data.");
    }
  };

  // ✅ Handle Edit
  const handleEdit = (owner) => {
    setEditData(owner);
    setShowForm(true);
  };

  // ✅ Handle Save after Form Submission
  const handleSave = () => {
    setShowForm(false);
    setEditData(null);
    fetchOwners();
  };

  return (
    <div className="flex flex-col h-full w-full p-4 bg-gray-100">
      <div className="bg-blue-600 text-white text-lg font-semibold py-4 px-6 rounded-md w-full">
        Owner List
      </div>

      <div className="flex justify-between items-center bg-white p-3 mt-2 rounded-md shadow-md">
        <button
          className="ml-3 bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700"
          onClick={() => {
            setEditData(null);
            setShowForm(!showForm);
          }}
        >
          {showForm ? "Close" : "Add Owner"}
        </button>
      </div>

      {showForm && (
        <div className="mt-3 bg-white p-4 rounded-md shadow-md">
          <OwnerNameForm onClose={() => setShowForm(false)} onSave={handleSave} editData={editData} />
        </div>
      )}

      {loading && <p className="text-center text-gray-500">Loading...</p>}
      {error && <p className="text-red-500">{error}</p>}

      <table ref={tableRef} className="w-full text-sm text-left text-gray-600 mt-4 bg-white shadow-md rounded-md">
        <thead className="bg-gray-200 text-gray-700 uppercase">
          <tr>
            <th className="px-4 py-3">Sr. No</th>
            <th className="px-4 py-3">Owner Name</th>
            <th className="px-4 py-3">Contact</th>
            <th className="px-4 py-3">Address</th>
            <th className="px-4 py-3">Email ID</th>
            <th className="px-4 py-3">Actions</th>
          </tr>
        </thead>
        <tbody>
          {owners.map((o) => (
            <tr key={o.uuid} className="border-b hover:bg-gray-100">
              <td className="px-4 py-3">{o.order_number}</td>
              <td className="px-4 py-3 font-semibold">{o.ownerName}</td>
              <td className="px-4 py-3">{o.contact}</td>
              <td className="px-4 py-3">{o.address}</td>
              <td className="px-4 py-3">{o.emailID}</td>
              <td className="px-4 py-3 flex space-x-2">
                <button
                  onClick={() => handleEdit(o)}
                  className="bg-blue-500 text-white px-3 py-1 rounded-lg hover:bg-blue-700"
                >
                  ✏️
                </button>
                <button
                  onClick={() => handleDelete(o.uuid)}
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

export default OwnerNamePage;
