// import React, { useState, useEffect, useRef } from "react";
// import $ from "jquery";
// import "datatables.net-dt/css/dataTables.dataTables.min.css";
// import "datatables.net-dt";
// import { Player } from "@lottiefiles/react-lottie-player";
// import truckLoader from "@/util/Animation.json";
// import MSWCGodownForm from "./MSWCGodownForm";
// import Navigation from "@/util/libs/navigation";

// const URL = import.meta.env.VITE_API_BACK_URL;

// const MSWCGodownPage = () => {
//   const [godowns, setGodowns] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [editData, setEditData] = useState(null);
//   const [showForm, setShowForm] = useState(false);
//   const [filter, setFilter] = useState("all");
//   const tableRef = useRef(null);

//   useEffect(() => {
//     fetchGodowns();
//   }, []);

//   useEffect(() => {
//     if (godowns.length > 0 && tableRef.current) {
//       $(tableRef.current).DataTable();
//     }
//   }, [godowns]);


//   useEffect(() => {
//     fetchGodowns();
//   }, [filter]);

//   const fetchGodowns = async () => {
//     try {
//       let endpoint = `${URL}/api/mswcgodown`;
//       if (filter === "active") endpoint = `${URL}/api/mswcgodown/active`;
//       if (filter === "inactive") endpoint = `${URL}/api/mswcgodown/inactive`;

//       const response = await fetch(endpoint);
//       if (!response.ok) throw new Error("Failed to fetch data");

//       const data = await response.json();

//       if (tableRef.current) {
//         $(tableRef.current).DataTable().destroy();
//       }

//       setGodowns(data || []);

//       setTimeout(() => {
//         if (tableRef.current) {
//           $(tableRef.current).DataTable();
//         }
//       }, 0);

//       setLoading(false);
//     } catch (err) {
//       setError(err.message);
//       setLoading(false);
//     }
//   };




//   const handleDelete = async (uuid) => {
//     if (!window.confirm("Are you sure you want to deactive this godown?")) return;
//     try {
//       const response = await fetch(`${URL}/api/mswcgodown/${uuid}`, {
//         method: "DELETE"
//       });
//       if (response.ok) {
//         alert("Godown deactive successfully!");
//         fetchGodowns();
//       } else {
//         alert("Failed to deactive godown.");
//       }
//     } catch (err) {
//       console.error("Error deactivating godown:", err);
//       alert("Error deactivating data.");
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

//     <div className="flex flex-col h-full w-full p-4 bg-gray-100">
//       <div className="bg-[#2A3042] text-white text-lg font-semibold py-2 px-6 rounded-md w-full flex justify-between items-center">
//         <span><Navigation /></span>
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
//           <MSWCGodownForm onClose={() => setShowForm(false)} onSave={handleSave} editData={editData} />
//         </div>
//       )}
//       {/* Filter Buttons */}
//       {/* <div className="flex space-x-3 my-4">
//       <button 
//         className={`px-4 py-2 rounded-md ${filter === "all" ? "bg-blue-600 text-white" : "bg-gray-300"}`}
//         onClick={() => setFilter("all")}
//       >
//         All
//       </button>
//       <button 
//         className={`px-4 py-2 rounded-md ${filter === "active" ? "bg-green-600 text-white" : "bg-gray-300"}`}
//         onClick={() => setFilter("active")}
//       >
//         Active
//       </button>
//       <button 
//         className={`px-4 py-2 rounded-md ${filter === "inactive" ? "bg-red-600 text-white" : "bg-gray-300"}`}
//         onClick={() => setFilter("inactive")}
//       >
//         Inactive
//       </button>
//     </div> */}



//       {loading && <div className="flex justify-center items-center h-64">
//         <Player autoplay loop src={truckLoader} className="w-48 h-48" />
//       </div>}
//       {error && <p className="text-red-500">{error}</p>}
//       {!loading && (
//         <div className="bg-white mt-3 rounded-md shadow-md p-4 overflow-auto flex-1">
//           {/* Filter Dropdown */}
//           <div className="my-4">
//             <select
//               value={filter}
//               onChange={(e) => setFilter(e.target.value)}
//               className="px-2 py-2 border border-gray-300 rounded-md bg-white shadow-md focus:outline-none"
//             >
//               <option value="all">All</option>
//               <option value="active">Active</option>
//               <option value="inactive">Inactive</option>
//             </select>
//           </div>
//           <table ref={tableRef} className="display w-full border border-gray-300 bg-white shadow-md rounded-md">
//             <thead>
//               <tr className="bg-gray-200">
//                 <th className="border p-2">ID</th>
//                 <th className="border p-2">Godown Name</th>
//                 <th className="border p-2">Godown Under</th>
//                 <th className="border p-2">Status</th>
//                 <th className="border p-2">Actions</th>
//               </tr>
//             </thead>
//             <tbody>
//               {godowns.length > 0 ? (
//                 godowns.map((g) => (
//                   <tr key={g.uuid} className="text-start hover:bg-gray-100">
//                     <td className="border p-2">{g.order_number}</td>
//                     <td className="border p-2">{g.godownName}</td>
//                     <td className="border p-2">{g.godownUnder || "N/A"}</td>
//                     <td className="border p-2">{g.status}</td>
//                     <td className="border p-2">
//                       <div className="flex justify-center space-x-2">
//                         <button onClick={() => handleEdit(g)} className="bg-blue-500 text-white px-3 py-1 rounded-lg hover:bg-blue-700">Edit</button>
//                         <button onClick={() => handleDelete(g.uuid)} className="bg-red-500 text-white px-2 py-1 rounded-lg hover:bg-red-700">Deactive</button>
//                       </div>
//                     </td>
//                   </tr>
//                 ))
//               ) : (
//                 <tr>
//                   <td colSpan="5" className="text-center p-4">No records found</td>
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






import React, { useState, useEffect, useRef } from "react";
import $ from "jquery";
import "datatables.net-dt/css/dataTables.dataTables.min.css";
import "datatables.net-dt";
import { Player } from "@lottiefiles/react-lottie-player";
import truckLoader from "@/util/Animation.json";
import MSWCGodownForm from "./MSWCGodownForm";
import Navigation from "@/util/libs/navigation";
import Swal from "sweetalert2"; // Import SweetAlert2

const URL = import.meta.env.VITE_API_BACK_URL;

const MSWCGodownPage = () => {
  const [godowns, setGodowns] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editData, setEditData] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [filter, setFilter] = useState("all");
  const tableRef = useRef(null);

  useEffect(() => {
    fetchGodowns();
  }, []);

  useEffect(() => {
    if (godowns.length > 0 && tableRef.current) {
      $(tableRef.current).DataTable();
    }
  }, [godowns]);

  useEffect(() => {
    fetchGodowns();
  }, [filter]);

  const fetchGodowns = async () => {
    try {
      let endpoint = `${URL}/api/mswcgodown`;
      if (filter === "active") endpoint = `${URL}/api/mswcgodown/active`;
      if (filter === "inactive") endpoint = `${URL}/api/mswcgodown/inactive`;

      const response = await fetch(endpoint);
      if (!response.ok) throw new Error("Failed to fetch data");

      const data = await response.json();

      if (tableRef.current) {
        $(tableRef.current).DataTable().destroy();
      }

      setGodowns(data || []);

      setTimeout(() => {
        if (tableRef.current) {
          $(tableRef.current).DataTable();
        }
      }, 0);

      setLoading(false);
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  const handleDelete = async (uuid) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, deactive it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const response = await fetch(`${URL}/api/mswcgodown/${uuid}`, {
            method: "DELETE"
          });
          if (response.ok) {
            Swal.fire("Deactivated!", "Godown deactivated successfully!", "success");
            fetchGodowns();
          } else {
            Swal.fire("Error", "Failed to deactive godown.", "error");
          }
        } catch (err) {
          console.error("Error deactivating godown:", err);
          Swal.fire("Error", "Error deactivating data.", "error");
        }
      }
    });
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
        <span><Navigation /></span>
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
      {/* Filter Buttons */}
      {/* <div className="flex space-x-3 my-4">
      <button 
        className={`px-4 py-2 rounded-md ${filter === "all" ? "bg-blue-600 text-white" : "bg-gray-300"}`}
        onClick={() => setFilter("all")}
      >
        All
      </button>
      <button 
        className={`px-4 py-2 rounded-md ${filter === "active" ? "bg-green-600 text-white" : "bg-gray-300"}`}
        onClick={() => setFilter("active")}
      >
        Active
      </button>
      <button 
        className={`px-4 py-2 rounded-md ${filter === "inactive" ? "bg-red-600 text-white" : "bg-gray-300"}`}
        onClick={() => setFilter("inactive")}
      >
        Inactive
      </button>
    </div> */}

      {loading && <div className="flex justify-center items-center h-64">
        <Player autoplay loop src={truckLoader} className="w-48 h-48" />
      </div>}
      {error && <p className="text-red-500">{error}</p>}
      {!loading && (
        <div className="bg-white mt-3 rounded-md shadow-md p-4 overflow-auto flex-1">
          {/* Filter Dropdown */}
          <div className="my-4">
            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="px-2 py-2 border border-gray-300 rounded-md bg-white shadow-md focus:outline-none"
            >
              <option value="all">All</option>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
          </div>
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
                  <tr key={g.uuid} className="text-start hover:bg-gray-100">
                    <td className="border p-2">{g.order_number}</td>
                    <td className="border p-2">{g.godownName}</td>
                    <td className="border p-2">{g.godownUnder || "N/A"}</td>
                    <td className="border p-2">{g.status}</td>
                    <td className="border p-2">
                      <div className="flex justify-center space-x-2">
                        <button onClick={() => handleEdit(g)} className="bg-blue-500 text-white px-3 py-1 rounded-lg hover:bg-blue-700">Edit</button>
                        <button onClick={() => handleDelete(g.uuid)} className="bg-red-500 text-white px-2 py-1 rounded-lg hover:bg-red-700">Deactive</button>
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
