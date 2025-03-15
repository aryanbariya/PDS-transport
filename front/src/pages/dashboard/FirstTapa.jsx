// import React, { useState, useEffect, useRef } from "react";
// import $ from "jquery";
// import "datatables.net-dt/css/dataTables.dataTables.min.css";
// import "datatables.net-dt";
// import { Player } from "@lottiefiles/react-lottie-player";
// import truckLoader from "@/util/Animation.json";
// import TransportForm from "./FirstTappaForm";
// import Navigation from "@/util/libs/navigation";
// import Swal from "sweetalert2";

// const URL = import.meta.env.VITE_API_BACK_URL;

// const TransportPage = () => {
//   const [transports, setTransports] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [editData, setEditData] = useState(null);
//   const [showForm, setShowForm] = useState(false);
//   const tableRef = useRef(null);

//   useEffect(() => {
//     fetchTransports();
//   }, []);

//   useEffect(() => {
//     if (transports.length > 0 && tableRef.current) {
//       $(tableRef.current).DataTable();
//     }
//   }, [transports]);

//   const fetchTransports = async () => {
//     try {
//       const response = await fetch(`${URL}/api/tapa`);
//       if (!response.ok) throw new Error("Failed to fetch data");
//       const data = await response.json();
//       setTransports(data || []);
//       setLoading(false);
//     } catch (err) {
//       setError(err.message);
//       setLoading(false);
//     }
//   };

//   const handleDelete = async (uuid) => {
//     Swal.fire({
//       title: "Are you sure?",
//       text: "You won't be able to revert this!",
//       icon: "warning",
//       showCancelButton: true,
//       confirmButtonColor: "#3085d6",
//       cancelButtonColor: "#d33",
//       confirmButtonText: "Yes, delete it!",
//     }).then(async (result) => {
//       if (result.isConfirmed) {
//         try {
//           const response = await fetch(`${URL}/api/transports/${uuid}`, {
//             method: "DELETE",
//           });
//           if (response.ok) {
//             Swal.fire("Deleted!", "Transport record deleted successfully!", "success");
//             fetchTransports();
//           } else {
//             Swal.fire("Error", "Failed to delete transport record.", "error");
//           }
//         } catch (err) {
//           console.error("Error deleting transport record:", err);
//           Swal.fire("Error", "Error deleting data.", "error");
//         }
//       }
//     });
//   };

//   const handleEdit = (transport) => {
//     setEditData(transport);
//     setShowForm(true);
//   };

//   const handleSave = async () => {
//     setShowForm(false);
//     setEditData(null);
//     fetchTransports();
//   };

//   return (
//     <div className="flex flex-col h-full w-full p-4 bg-gray-100">
//       <div className="bg-[#2A3042] text-white text-lg font-semibold py-2 px-6 rounded-md w-full flex justify-between items-center">
//         <span><Navigation/></span>
//         <button
//           className="ml-3 bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700"
//           onClick={() => {
//             setEditData(null);
//             setShowForm(!showForm);
//           }}
//         >
//           {showForm ? "Close" : "Add TP"}
//         </button>
//       </div>
//       {showForm && (
//         <div className="mt-3 bg-white p-4 rounded-md shadow-md">
//           <TransportForm onClose={() => setShowForm(false)} onSave={handleSave} editData={editData} />
//         </div>
//       )}

//       {loading && (
//         <div className="flex justify-center items-center h-64">
//           <Player autoplay loop src={truckLoader} className="w-48 h-48" />
//         </div>
//       )}
//       {error && <p className="text-red-500">{error}</p>}
//       {!loading && (
//         <div className="bg-white mt-3 rounded-md shadow-md p-4 overflow-auto flex-1">
//           <table ref={tableRef} className="display w-full border border-gray-300 bg-white shadow-md rounded-md">
//             <thead>
//               <tr className="bg-gray-200">
//                 <th className="border p-2">Sr.No</th>
//                 <th className="border p-2">View TP</th>
//                 <th className="border p-2">TP No</th>
//                 <th className="border p-2">Dispatch Date</th>
//                 <th className="border p-2">Base Depo</th>
//                 <th className="border p-2">Truck No</th>
//                 <th className="border p-2">D.O Number</th>
//                 <th className="border p-2">Quota</th>
//                 <th className="border p-2">Scheme</th>
//                 <th className="border p-2">No of Bags</th>
//                 <th className="border p-2">Packaging</th>
//                 <th className="border p-2">Gross Weight</th>
//                 <th className="border p-2">Tare Weight</th>
//                 <th className="border p-2">Action</th>
//               </tr>
//             </thead>
//             <tbody>
//               {transports.length > 0 ? (
//                 transports.map((transport) => (
//                   <tr key={transport.trans_id} className="text-start hover:bg-gray-100">
//                     <td className="border p-2">{trans_id}</td>
//                     <td className="border p-2">👁️</td>
//                     <td className="border p-2">{transport.tp_no}</td>
//                     <td className="border p-2">{transport.dispatchDate}</td>
//                     <td className="border p-2">{transport.group_under}</td>
//                     <td className="border p-2">{transport.truckNo}</td>
//                     <td className="border p-2">{transport.do_no}</td>
//                     <td className="border p-2">{transport.cota}</td>
//                     <td className="border p-2">{transport.scheme}</td>
//                     <td className="border p-2">{transport.noOfBags}</td>
//                     <td className="border p-2">{transport.packaging}</td>
//                     <td className="border p-2">{transport.gross_weight}</td>
//                     <td className="border p-2">{transport.tareWeight}</td>
//                     <td className="border p-2 flex justify-start gap-2 text-xs md:text-base">
//                       <button
//                         onClick={() => handleEdit(transport)}
//                         className="bg-blue-500 text-white px-3 py-1 rounded-lg hover:bg-blue-700"
//                       >
//                         Edit
//                       </button>
//                       <button
//                         onClick={() => handleDelete(transport.uuid)}
//                         className="bg-red-500 text-white px-3 py-1 rounded-lg hover:bg-red-700"
//                       >
//                         Delete
//                       </button>
//                     </td>
//                   </tr>
//                 ))
//               ) : (
//                 <tr>
//                   <td colSpan="14" className="p-3 text-start text-gray-500">No Transport Records Found</td>
//                 </tr>
//               )}
//             </tbody>
//           </table>
//         </div>
//       )}
//     </div>
//   );
// };

// export default TransportPage;



import React, { useState, useEffect, useRef } from "react";
import { Button } from "@material-tailwind/react";
import $ from "jquery";
import "datatables.net-dt/css/dataTables.dataTables.min.css";
import "datatables.net-dt";
import DataTable from "datatables.net-dt";
import { Player } from "@lottiefiles/react-lottie-player";
import truckLoader from "@/util/Animation.json";
import { formatDate } from "@/util/libs/formatDate";
import Navigation from "@/util/libs/navigation";
import Swal from "sweetalert2";

const URL = import.meta.env.VITE_API_BACK_URL;

const TransportPage = () => {
  const [transportData, setTransportData] = useState([]);
  const [editData, setEditData] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState("all");
  const tableRef = useRef(null);



  const fetchTransportData = async () => {
    try {
      setLoading(true);
      let endpoint = `${URL}/api/tapa`;
      if (filter === "active") endpoint = `${URL}/api/truck/active`;
      if (filter === "inactive") endpoint = `${URL}/api/truck/inactive`;

      const response = await fetch(endpoint);
      if (!response.ok) throw new Error("Failed to fetch data");

      const data = await response.json();
      setTransportData(data || []);

      setTimeout(() => {
        if (tableRef.current) {
          $(tableRef.current).DataTable().destroy(); // Destroy existing DataTable
          $(tableRef.current).DataTable({
            responsive: true,
          });
        }
      }, 0);

      setLoading(false);
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }

  };

  useEffect(() => {
    fetchTransportData();
  }, [filter]);

  // Reinitialize DataTable when godowns data changes
  useEffect(() => {
    if (tableRef.current && transportData.length > 0) {
      const dataTable = new DataTable(tableRef.current, {
        destroy: true,
        responsive: true,
      });

      return () => {
        dataTable.destroy();
      };
    }
  }, [transportData]);

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
          <TruckForm onClose={() => setShowForm(false)} onSave={handleSave} editData={editData} />
        </div>
      )}
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

      {loading && (
        <div className="flex justify-center items-center h-64">
          <Player autoplay loop src={truckLoader} className="w-48 h-48" />
        </div>
      )}

      {error && <p className="text-red-500">{error}</p>}

      {!loading && (
        <div className="bg-white mt-3 w-full rounded-md shadow-md p-4 overflow-auto flex-1">
          <table ref={tableRef} className="display w-full border border-gray-300 bg-white shadow-md rounded-md">
            <thead>
              <tr className="bg-gray-200 text-start">
                <th className="border p-2">Sr.No</th>
                <th className="border p-2">View TP</th>
                <th className="border p-2">TP No</th>
                <th className="border p-2">Dispatch Date</th>
                <th className="border p-2">Base Depo</th>
                <th className="border p-2">Truck No</th>
                <th className="border p-2">D.O Number</th>
                <th className="border p-2">Quota</th>
                <th className="border p-2">Scheme</th>
                <th className="border p-2">No of Bags</th>
                <th className="border p-2">Packaging</th>
                <th className="border p-2">Gross Weight</th>
                <th className="border p-2">Tare Weight</th>
                <th className="border p-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {transportData.length > 0 ? (
                transportData.map((tp) => (
                  <tr key={tp.uuid} className="text-start hover:bg-gray-100">
                    <td className="border p-2">{tp.trans_id}</td>
                    <td className="border p-2">View</td>
                    <td className="border p-2">{tp.tp_no}</td>
                    <td className="border p-2">{tp.dispatch_date}</td>
                    <td className="border p-2">{tp.base_depot}</td>
                    <td className="border p-2">{tp.truck_no}</td>
                    <td className="border p-2">{tp.do_no}</td>
                    <td className="border p-2">{tp.cota}</td>
                    <td className="border p-2">{tp.scheme}</td>
                    <td className="border p-2">{tp.bags_weight}</td>
                    <td className="border p-2">{tp.packaging}</td>
                    <td className="border p-2">{tp.gross_weight}</td>
                    <td className="border p-2">{tp.tare_weight}</td>
                    <td className="border p-2 flex justify-center space-x-2">
                      <Button className="bg-blue-500 text-white px-3 py-1 rounded-lg hover:bg-blue-700">
                        Edit
                      </Button>
                      <button className="bg-red-500 text-white px-3 py-1 rounded-lg hover:bg-red-700">
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              ) : (<tr>
                <td colSpan="10" className="text-center p-4">No records found</td>
              </tr>)

              }
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default TransportPage;
