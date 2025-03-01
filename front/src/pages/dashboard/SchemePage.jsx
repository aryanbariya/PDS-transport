// import React, { useState, useEffect } from "react";
// import SchemeForm from "./SchemeForm";
// const URL = import.meta.env.VITE_API_BACK_URL

// const SchemePage = () => {
//   const [schemes, setSchemes] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);
//   const [editData, setEditData] = useState(null);
//   const [showForm, setShowForm] = useState(false);
//   const [searchTerm, setSearchTerm] = useState("");

//   // Fetch schemes from API
//   const fetchSchemes = async () => {
//     setLoading(true);
//     try {
//       const response = await fetch(`${URL}/api/scheme`);
//       if (!response.ok) throw new Error("Failed to fetch scheme");
//       const data = await response.json();
//       setSchemes(data || []);
//       setLoading(false);
//     } catch (err) {
//       setError(err.message);
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchSchemes();
//   }, []);

//   // Delete scheme
//   const handleDelete = async (uuid) => {
//     if (!window.confirm("Are you sure you want to delete this scheme?")) return;

//     try {
//       const response = await fetch(`${URL}/api/scheme/${uuid}`, {
//         method: "DELETE",
//       });
//       if (response.ok) {
//         alert("Scheme deleted successfully!");
//         fetchSchemes();
//       } else {
//         alert("Failed to delete scheme.");
//       }
//     } catch (err) {
//       alert("Error deleting scheme.");
//     }
//   };

//   // Edit scheme
//   const handleEdit = (scheme) => {
//     setEditData(scheme);
//     setShowForm(true);
//   };

//   // Refresh data after adding/editing a scheme
//   const handleSave = async () => {
//     setShowForm(false);
//     setEditData(null);
//     fetchSchemes();
//   };

//   // Filter schemes based on search term
//   const filteredSchemes = schemes.filter((scheme) =>
//     scheme.scheme_name.toLowerCase().includes(searchTerm.toLowerCase())
//   );

//   return (
//     <div className="p-4 bg-gray-100 min-h-screen">
//       {/* Header */}
//       <div className="bg-blue-600 text-white p-4 rounded-md shadow-md">
//         <h2 className="text-lg font-semibold">Scheme Management</h2>
//       </div>

//       {/* Search and Add Button */}
//       <div className="mt-4 flex items-center gap-2">
//         <input
//           type="text"
//           placeholder="Search Schemes..."
//           className="border p-2 rounded-md w-full"
//           value={searchTerm}
//           onChange={(e) => setSearchTerm(e.target.value)}
//         />
//         <button
//           className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-700"
//           onClick={() => {
//             setEditData(null);
//             setShowForm(!showForm);
//           }}
//         >
//           {showForm ? "Close" : "Add"}
//         </button>
//       </div>

//       {/* Search Results Display */}
//       {searchTerm && (
//         <div className="mt-2 bg-white p-3 rounded-md shadow-md">
//           <p className="text-gray-700 font-semibold">Showing results for: "{searchTerm}"</p>
//         </div>
//       )}

//       {/* Scheme Form */}
//       {showForm && (
//         <div className="mt-3 bg-white p-4 rounded-md shadow-md">
//           <SchemeForm onClose={() => setShowForm(false)} onSave={handleSave} editData={editData} />
//         </div>
//       )}

//       {/* Error & Loading Messages */}
//       {loading && <p>Loading...</p>}
//       {error && <p className="text-red-500">{error}</p>}

//       {/* Scheme Table */}
//       <div className="bg-white p-4 mt-4 rounded-md shadow-md overflow-x-auto">
//         <table className="w-full border-collapse border border-gray-300 bg-white shadow-md rounded-md">
//           <thead>
//             <tr className="bg-gray-200">
//               <th className="border p-2">ID</th>
//               <th className="border p-2">Scheme Name</th>
//               <th className="border p-2">Status</th>
//               <th className="border p-2">Actions</th>
//             </tr>
//           </thead>
//           <tbody>
//             {filteredSchemes.length > 0 ? (
//               filteredSchemes.map((scheme) => (
//                 <tr key={scheme.uuid} className="text-center hover:bg-gray-100">
//                   <td className="border p-2">{scheme.order_number}</td>
//                   <td className="border p-2">{scheme.scheme_name}</td>
//                   <td className="border p-2">{scheme.status}</td>
//                   <td className="border p-2">
//                     <div className="flex justify-center space-x-2">
//                       <button
//                         onClick={() => handleEdit(scheme)}
//                         className="bg-blue-500 text-white px-3 py-1 rounded-lg hover:bg-blue-700"
//                       >
//                         ✏️
//                       </button>
//                       <button
//                         onClick={() => handleDelete(scheme.uuid)}
//                         className="bg-red-500 text-white px-3 py-1 rounded-lg hover:bg-red-700"
//                       >
//                         🗑️
//                       </button>
//                     </div>
//                   </td>
//                 </tr>
//               ))
//             ) : (
//               <tr>
//                 <td colSpan="4" className="text-center p-4">No records found</td>
//               </tr>
//             )}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// };

// export default SchemePage;


import React, { useState, useEffect,useRef } from "react";
import SchemeForm from "./SchemeForm";
import $ from "jquery";
import "datatables.net-dt/css/dataTables.dataTables.min.css";
import "datatables.net-dt";

const URL = import.meta.env.VITE_API_BACK_URL;

const SchemePage = () => {
  const [schemes, setSchemes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [editData, setEditData] = useState(null);
  const [showForm, setShowForm] = useState(false);
 const tableRef = useRef(null);


 useEffect(() => {
  fetchSchemes();
}, []);

useEffect(() => {
  if (schemes.length > 0 && tableRef.current) {
    $(tableRef.current).DataTable();
  }
}, [schemes]);

  const fetchSchemes = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${URL}/api/scheme`);
      if (!response.ok) throw new Error("Failed to fetch scheme");
      const data = await response.json();
      setSchemes(data);
      setLoading(false);
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
   
  };


  const handleDelete = async (uuid) => {
    if (!window.confirm("Are you sure you want to delete this scheme?")) return;

    try {
      const response = await fetch(`${URL}/api/scheme/${uuid}`, {
        method: "DELETE",
      });
      if (response.ok) {
        alert("Scheme deleted successfully!");
        fetchSchemes();
      } else {
        alert("Failed to delete scheme.");
      }
    } catch (err) {
      alert("Error deleting scheme.");
    }
  };

  const handleEdit = (scheme) => {
    setEditData(scheme);
    setShowForm(true);
  };

  const handleSave = async () => {
    setShowForm(false);
    setEditData(null);
    fetchSchemes();
  };

 
  return (
    <div className="p-4 bg-gray-100 min-h-screen">
      <div className="bg-blue-600 text-white p-4 rounded-md shadow-md">
        <h2 className="text-lg font-semibold">Scheme Management</h2>
      </div>

      <div className="mt-4 flex items-center gap-2">
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-700"
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
          <SchemeForm onClose={() => setShowForm(false)} onSave={handleSave} editData={editData} />
        </div>
      )}

      {loading && <p>Loading...</p>}
      {error && <p className="text-red-500">{error}</p>}

      <div className="bg-white p-4 mt-4 rounded-md shadow-md overflow-x-auto">
        <table ref={tableRef}  className="w-full border-collapse border border-gray-300 bg-white shadow-md rounded-md">
          <thead>
            <tr className="bg-gray-200">
              <th className="border p-2">ID</th>
              <th className="border p-2">Scheme Name</th>
              <th className="border p-2">Status</th>
              <th className="border p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {schemes.length > 0 ? (
              schemes.map((scheme) => (
                <tr key={scheme.uuid} className="text-center hover:bg-gray-100">
                  <td className="border p-2">{scheme.order_number}</td>
                  <td className="border p-2">{scheme.scheme_name}</td>
                  <td className="border p-2">{scheme.status}</td>
                  <td className="border p-2">
                    <div className="flex justify-center space-x-2">
                      <button
                        onClick={() => handleEdit(scheme)}
                        className="bg-blue-500 text-white px-3 py-1 rounded-lg hover:bg-blue-700"
                      >
                        ✏️
                      </button>
                      <button
                        onClick={() => handleDelete(scheme.uuid)}
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
                <td colSpan="4" className="text-center p-4">No records found</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

    </div>
  );
};

export default SchemePage;
