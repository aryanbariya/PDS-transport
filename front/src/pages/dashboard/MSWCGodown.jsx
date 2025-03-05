import React, { useState, useEffect, useRef } from "react";
import $ from "jquery";
import "datatables.net-dt/css/dataTables.dataTables.min.css";
import "datatables.net-dt";
import { Player } from "@lottiefiles/react-lottie-player";
import truckLoader from "@/util/Animation.json";
import MSWCGodownForm from "./MSWCGodownForm";

const URL = import.meta.env.VITE_API_BACK_URL;

const MSWCGodownPage = () => {
  const [godowns, setGodowns] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editData, setEditData] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const tableRef = useRef(null);

  useEffect(() => {
    fetchGodowns();
  }, []);

  useEffect(() => {
    if (godowns.length > 0 && tableRef.current) {
      $(tableRef.current).DataTable();
    }
  }, [godowns]);


  const fetchGodowns = async () => {
    try {
      const response = await fetch(`${URL}/api/mswcgodown`);
      if (!response.ok) throw new Error("Failed to fetch data");
      const data = await response.json();
      setGodowns(data || []);
      setLoading(false);
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };



  const handleDelete = async (uuid) => {
    if (!window.confirm("Are you sure you want to delete this godown?")) return;
    try {
      const response = await fetch(`${URL}/api/mswcgodown/${uuid}`, {
        method: "DELETE"
      });
      if (response.ok) {
        alert("Godown deleted successfully!");
        fetchGodowns();
      } else {
        alert("Failed to delete godown.");
      }
    } catch (err) {
      console.error("Error deleting godown:", err);
      alert("Error deleting data.");
    }
  };

  const handleEdit = (godown) => {
    setEditData(godown);
    setShowForm(true);
  };

  const handleSave = async () => {
    setShowForm(false);
    setEditData(null);
    fetchGodowns();
  };



  return (

    <div className="flex flex-col h-full w-full p-4 bg-gray-100">
      <div className="bg-[#2A3042] text-white text-lg font-semibold py-2 px-6 rounded-md w-full flex justify-between items-center">
        <span> MSWC Godown List</span>
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
          <MSWCGodownForm onClose={() => setShowForm(false)} onSave={handleSave} editData={editData} />
        </div>
      )}

      {loading && <div className="flex justify-center items-center h-64">
        <Player autoplay loop src={truckLoader} className="w-48 h-48" />
      </div>}
      {error && <p className="text-red-500">{error}</p>}
      {!loading && (
        <div className="bg-white mt-3 rounded-md shadow-md p-4 overflow-auto flex-1">
          <table ref={tableRef} className="display w-full border border-gray-300 bg-white shadow-md rounded-md">
            <thead>
              <tr className="bg-gray-200">
                <th className="border p-2">ID</th>
                <th className="border p-2">Godown Name</th>
                <th className="border p-2">Godown Under</th>
                <th className="border p-2">Status</th>
                <th className="border p-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {godowns.length > 0 ? (
                godowns.map((g) => (
                  <tr key={g.uuid} className="text-center hover:bg-gray-100">
                    <td className="border p-2">{g.order_number}</td>
                    <td className="border p-2">{g.godownName}</td>
                    <td className="border p-2">{g.godownUnder || "N/A"}</td>
                    <td className="border p-2">{g.status || "Active"}</td>
                    <td className="border p-2">
                      <div className="flex justify-center space-x-2">
                        <button onClick={() => handleEdit(g)} className="bg-blue-500 text-white px-3 py-1 rounded-lg hover:bg-blue-700">✏️</button>
                        <button onClick={() => handleDelete(g.uuid)} className="bg-red-500 text-white px-3 py-1 rounded-lg hover:bg-red-700">🗑️</button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="text-center p-4">No records found</td>
                </tr>
              )}
            </tbody>
          </table>

        </div>
      )}


    </div>
  );
};

export default MSWCGodownPage;


// import React, { useState, useEffect, useRef } from "react";
// import $ from "jquery";
// import "datatables.net-dt/css/dataTables.dataTables.min.css";
// import "datatables.net-dt";
// import { Player } from "@lottiefiles/react-lottie-player";
// import truckLoader from "@/util/Animation.json";
// import MSWCGodownForm from "./MSWCGodownForm";

// const URL = import.meta.env.VITE_API_BACK_URL;

// const MSWCGodownPage = () => {
//   const [godowns, setGodowns] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [editData, setEditData] = useState(null);
//   const [showForm, setShowForm] = useState(false);
//   const tableRef = useRef(null);

//   useEffect(() => {
//     fetchGodowns();
//   }, []);

//   useEffect(() => {
//     if (godowns.length > 0 && tableRef.current) {
//       $(tableRef.current).DataTable({
//         destroy: true, // Prevent duplicate initialization
//         autoWidth: false, // Allow dynamic width
//         responsive: true,
//       });
//     }
//   }, [godowns]);

//   const fetchGodowns = async () => {
//     try {
//       const response = await fetch(`${URL}/api/mswcgodown`);
//       if (!response.ok) throw new Error("Failed to fetch data");
//       const data = await response.json();
//       setGodowns(
//         (data || []).map((g) => ({
//           ...g,
//           godownName: g.godownName
//             ? g.godownName.charAt(0).toUpperCase() + g.godownName.slice(1)
//             : "",
//         }))
//       );
//       setLoading(false);
//     } catch (err) {
//       setError(err.message);
//       setLoading(false);
//     }
//   };

//   const handleDelete = async (uuid) => {
//     if (!window.confirm("Are you sure you want to delete this godown?")) return;
//     try {
//       const response = await fetch(`${URL}/api/mswcgodown/${uuid}`, {
//         method: "DELETE",
//       });
//       if (response.ok) {
//         alert("Godown deleted successfully!");
//         fetchGodowns();
//       } else {
//         alert("Failed to delete godown.");
//       }
//     } catch (err) {
//       console.error("Error deleting godown:", err);
//       alert("Error deleting data.");
//     }
//   };

//   const handleEdit = (godown) => {
//     setEditData(godown);
//     setShowForm(true);
//   };

//   const handleSave = async () => {
//     setShowForm(false);
//     setEditData(null);
//     fetchGodowns();
//   };

//   return (
//     <div className="flex flex-col h-full w-full p-6 bg-gray-100">
//       <div className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white text-xl font-semibold py-3 px-6 rounded-lg shadow-md flex justify-between items-center">
//         <span>MSWC Godown List</span>
//         <button
//           className="ml-3 bg-green-500 text-white px-5 py-2 rounded-lg shadow-md hover:bg-green-700 transition duration-300"
//           onClick={() => {
//             setEditData(null);
//             setShowForm(!showForm);
//           }}
//         >
//           {showForm ? "Close" : "Add Godown"}
//         </button>
//       </div>

//       {showForm && (
//         <div className="mt-4 bg-white p-5 rounded-lg shadow-md border">
//           <MSWCGodownForm
//             onClose={() => setShowForm(false)}
//             onSave={handleSave}
//             editData={editData}
//           />
//         </div>
//       )}

//       {loading && (
//         <div className="flex justify-center items-center h-64">
//           <Player autoplay loop src={truckLoader} className="w-48 h-48" />
//         </div>
//       )}
//       {error && <p className="text-red-500">{error}</p>}

//       {!loading && (
//         <div className="bg-white mt-4 rounded-lg shadow-md p-5 overflow-x-auto w-full">
//           <table
//             ref={tableRef}
//             className="display w-full table-auto border border-gray-300 bg-white shadow-lg rounded-md text-left"
//           >
//             {/* Table Head with Centered Headers */}
//             <thead>
//               <tr className="bg-blue-100 text-gray-700">
//                 <th className="border p-3 text-center">ID</th>
//                 <th className="border p-3 text-center">Godown Name</th>
//                 <th className="border p-3 text-center">Godown Under</th>
//                 <th className="border p-3 text-center">Actions</th>
//               </tr>
//             </thead>

//             {/* Table Body */}
//             <tbody>
//               {godowns.length > 0 ? (
//                 godowns.map((g) => (
//                   <tr key={g.uuid} className="text-center hover:bg-gray-100">
//                     <td className="border p-3 text-center">{g.order_number}</td>
//                     <td className="border p-3">{g.godownName}</td>
//                     <td className="border p-3">{g.godownUnder || "N/A"}</td>
//                     <td className="border p-3">
//                       <div className="flex justify-center space-x-3">
//                         <button
//                           onClick={() => handleEdit(g)}
//                           className="bg-blue-500 text-white px-3 py-1 rounded-lg shadow-md hover:bg-blue-700 transition duration-300"
//                         >
//                           ✏️ Edit
//                         </button>
//                         <button
//                           onClick={() => handleDelete(g.uuid)}
//                           className="bg-red-500 text-white px-3 py-1 rounded-lg shadow-md hover:bg-red-700 transition duration-300"
//                         >
//                           🗑️ Delete
//                         </button>
//                       </div>
//                     </td>
//                   </tr>
//                 ))
//               ) : (
//                 <tr>
//                   <td colSpan="4" className="text-center p-5 text-gray-500">
//                     No records found
//                   </td>
//                 </tr>
//               )}
//             </tbody>
//           </table>
//         </div>
//       )}
//     </div>
//   );
// };

// export default MSWCGodownPage;
