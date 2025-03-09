// import React, { useState, useEffect, useRef } from "react";
// import $ from "jquery";
// import "datatables.net-dt/css/dataTables.dataTables.min.css";
// import "datatables.net-dt";
// import { Player } from "@lottiefiles/react-lottie-player";
// import Navigation from "@/util/libs/navigation";
// import truckLoader from "@/util/Animation.json";
// import DriverForm from "./DriverForm";


// const URL = import.meta.env.VITE_API_BACK_URL;

// const DriverPage = () => {
//   const [drivers, setDrivers] = useState([]);
//   const [editData, setEditData] = useState(null);
//   const [showForm, setShowForm] = useState(false);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const tableRef = useRef(null);


//   useEffect(() => {
//     fetchDrivers();
//   }, []);

//   useEffect(() => {
//     if (drivers.length > 0 && tableRef.current) {
//       $(tableRef.current).DataTable();
//     }
//   }, [drivers]);


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
//           {showForm ? "Close" : "Add"}
//         </button>
//       </div>

//       {showForm && (
//         <div className="mt-3 bg-white p-4 rounded-md shadow-md">
//           <DriverForm onClose={() => setShowForm(false)} onSave={handleSave} editData={editData} />
//         </div>
//       )}

//       {loading && <div className="flex justify-center items-center h-64">
//         <Player autoplay loop src={truckLoader} className="w-48 h-48" />
//       </div>}
//       {error && <p className="text-red-500">{error}</p>}
//       {!loading && (
//         <div className="bg-white mt-3 rounded-md shadow-md p-4 overflow-auto flex-1">
//           <table ref={tableRef} className="display w-full border border-gray-300 bg-white shadow-md rounded-md">
//             <thead>
//               <tr className="bg-gray-200">
//                 <th className="border p-2">ID</th>
//                 <th className="border p-2">Driver Name</th>
//                 <th className="border p-2">Aadhar Card No.</th>
//                 <th className="border p-2">Contact</th>
//                 <th className="border p-2">Driving License No.</th>
//                 <th className="border p-2">Actions</th>
//               </tr>
//             </thead>
//             <tbody>
//               {drivers.length > 0 ? (
//                 drivers.map((driver) => (
//                   <tr key={driver.uuid} className="text-start hover:bg-gray-100">
//                     <td className="border p-2">{driver.order_number}</td>
//                     <td className="border p-2">{driver.driver_name}</td>
//                     <td className="border p-2">{driver.aadhar_card_no}</td>
//                     <td className="border p-2">{driver.contact}</td>
//                     <td className="border p-2">{driver.driving_license_no}</td>
//                     <td className="border p-2">
//                       <div className="flex justify-start space-x-2">
//                         <button
//                           onClick={() => handleEdit(driver)}
//                           className="bg-blue-500 text-white px-3 py-1 rounded-lg hover:bg-blue-700"
//                         >
//                           Edit
//                         </button>
//                         <button
//                           onClick={() => handleDelete(driver.uuid)}
//                           className="bg-red-500 text-white px-3 py-1 rounded-lg hover:bg-red-700"
//                         >
//                           Delete
//                         </button>
//                       </div>
//                     </td>
//                   </tr>
//                 ))
//               ) : (
//                 <tr>
//                   <td colSpan="6" className="text-center p-4">No records found</td>
//                 </tr>
//               )}
//             </tbody>
//           </table>
//         </div>)}

//     </div>
//   );
// };

// export default DriverPage;




import React, { useState, useEffect, useRef } from "react";
import $ from "jquery";
import "datatables.net-dt/css/dataTables.dataTables.min.css";
import "datatables.net-dt";
import { Player } from "@lottiefiles/react-lottie-player";
import Navigation from "@/util/libs/navigation";
import truckLoader from "@/util/Animation.json";
import DriverForm from "./DriverForm";
import Swal from "sweetalert2"; // Import SweetAlert2

const URL = import.meta.env.VITE_API_BACK_URL;

const DriverPage = () => {
  const [drivers, setDrivers] = useState([]);
  const [editData, setEditData] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const tableRef = useRef(null);

  useEffect(() => {
    fetchDrivers();
  }, []);

  useEffect(() => {
    if (drivers.length > 0 && tableRef.current) {
      $(tableRef.current).DataTable();
    }
  }, [drivers]);

  const fetchDrivers = async () => {
    try {
      const response = await fetch(`${URL}/api/drivers`);
      const data = await response.json();
      setDrivers(data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching drivers:", error);
      setError("Failed to fetch data");
      setLoading(false);
    }
  };

  const handleSave = () => {
    fetchDrivers();
    setShowForm(false);
    setEditData(null);
  };

  const handleEdit = (driver) => {
    setEditData(driver);
    setShowForm(true);
  };

  const handleDelete = async (uuid) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const response = await fetch(`${URL}/api/driver/${uuid}`, { method: "DELETE" });
          if (response.ok) {
            Swal.fire("Deleted!", "Driver deleted successfully!", "success");
            fetchDrivers();
          } else {
            Swal.fire("Error", "Failed to delete driver.", "error");
          }
        } catch (error) {
          console.error("Error deleting driver:", error);
          Swal.fire("Error", "Error deleting data.", "error");
        }
      }
    });
  };

  return (
    <div className="flex flex-col h-full w-full p-4 bg-gray-100">
      <div className="bg-[#2A3042] text-white text-lg font-semibold py-2 px-6 rounded-md w-full flex justify-between items-center">
        <span><Navigation/></span>
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
                <th className="border p-2">Driver Name</th>
                <th className="border p-2">Aadhar Card No.</th>
                <th className="border p-2">Contact</th>
                <th className="border p-2">Driving License No.</th>
                <th className="border p-2">Status</th>
                <th className="border p-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {drivers.length > 0 ? (
                drivers.map((driver) => (
                  <tr key={driver.uuid} className="text-start hover:bg-gray-100">
                    <td className="border p-2">{driver.order_number}</td>
                    <td className="border p-2">{driver.driver_name}</td>
                    <td className="border p-2">{driver.aadhar_card_no}</td>
                    <td className="border p-2">{driver.contact}</td>
                    <td className="border p-2">{driver.driving_license_no}</td>
                    <td className="border p-2">{driver.status}</td>
                    <td className="border p-2">
                      <div className="flex justify-start space-x-2">
                        <button
                          onClick={() => handleEdit(driver)}
                          className="bg-blue-500 text-white px-3 py-1 rounded-lg hover:bg-blue-700"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete(driver.uuid)}
                          className="bg-red-500 text-white px-3 py-1 rounded-lg hover:bg-red-700"
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="text-center p-4">No records found</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>)}

    </div>
  );
};

export default DriverPage;


