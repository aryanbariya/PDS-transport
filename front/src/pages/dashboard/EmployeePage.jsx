// import React, { useState, useEffect, useRef } from "react";
// import $ from "jquery";
// import "datatables.net-dt/css/dataTables.dataTables.min.css";
// import "datatables.net-dt";
// import { Player } from "@lottiefiles/react-lottie-player";
// import truckLoader from "@/util/Animation.json";
// import EmployeeForm from "./EmployeeForem";
// import Navigation from "@/util/libs/navigation";
// import Swal from "sweetalert2"; // Import SweetAlert2

// const URL = import.meta.env.VITE_API_BACK_URL;

// const EmployeePage = () => {
//   const [employees, setEmployees] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [editData, setEditData] = useState(null);
//   const [showForm, setShowForm] = useState(false);
//   const tableRef = useRef(null);

//   useEffect(() => {
//     fetchEmployees();
//   }, []);

//   useEffect(() => {
//     if (employees.length > 0 && tableRef.current) {
//       $(tableRef.current).DataTable();
//     }
//   }, [employees]);

//   const fetchEmployees = async () => {
//     try {
//       const response = await fetch(`${URL}/api/employees`);
//       if (!response.ok) throw new Error("Failed to fetch data");
//       const data = await response.json();
//       setEmployees(data || []);
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
//           const response = await fetch(`${URL}/api/employees/${uuid}`, {
//             method: "DELETE",
//           });
//           if (response.ok) {
//             Swal.fire("Deleted!", "Employee deleted successfully!", "success");
//             fetchEmployees();
//           } else {
//             Swal.fire("Error", "Failed to delete Employee.", "error");
//           }
//         } catch (err) {
//           console.error("Error deleting employee:", err);
//           Swal.fire("Error", "Error deleting data.", "error");
//         }
//       }
//     });
//   };

//   const handleEdit = (emp) => {
//     setEditData(emp);
//     setShowForm(true);
//   };

//   const handleSave = async () => {
//     setShowForm(false);
//     setEditData(null);
//     fetchEmployees();
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
//           <EmployeeForm onClose={() => setShowForm(false)} onSave={handleSave} editData={editData} />
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
//               <tr className="bg-gray-200 ">
//                 <th className="border p-2">Sr. No</th>
//                 <th className="border p-2">Category</th>
//                 <th className="border p-2">Employee</th>
//                 <th className="border p-2">Login Info</th>
//                 <th className="border p-2">Bank Info</th>
//                 <th className="border p-2">Action</th>
//                 <th className="border p-2">Docs</th>
//               </tr>
//             </thead>
//             <tbody>
//               {employees.length > 0 ? (
//                 employees.map((emp) => (
//                   <tr key={emp.uuid} className="text-start hover:bg-gray-100">
//                     <td className="border p-2">{emp.order_number}</td>
//                     <td className="border p-2 font-semibold">{emp.category}</td>
//                     <td className="border p-2">
//                       <div className="font-semibold">{emp.fullName}</div>
//                       <div className="text-xs md:text-sm">{emp.address}</div>
//                     </td>
//                     <td className="border p-2">
//                       <div className="font-semibold">{emp.username}</div>
//                       <div className="text-xs md:text-sm">{emp.password}</div>
//                     </td>
//                     <td className="border p-2">
//                       <div>{emp.bankName || "N/A"}</div>
//                       <div>{emp.accountNumber || "N/A"}</div>
//                       <div>{emp.ifscCode || "N/A"}</div>
//                       <div>{emp.branchName || "N/A"}</div>
//                     </td>
//                     <td className="border p-2 flex justify-start gap-2 text-xs md:text-base">
//                       <button
//                         onClick={() => handleEdit(emp)}
//                         className="bg-blue-500 text-white px-3 py-1 rounded-lg hover:bg-blue-700"
//                       >
//                         Edit
//                       </button>
//                       <button
//                         onClick={() => handleDelete(emp.uuid)}
//                         className="bg-red-500 text-white px-3 py-1 rounded-lg hover:bg-red-700"
//                       >
//                         Delete
//                       </button>
//                     </td>
//                     <td className="border p-2 text-blue-500 cursor-pointer">📄</td>
//                   </tr>
//                 ))
//               ) : (
//                 <tr>
//                   <td colSpan="7" className="p-3 text-start text-gray-500">No Employees Found</td>
//                 </tr>
//               )}
//             </tbody>
//           </table>
//         </div>
//       )}
//     </div>
//   );
// };

// export default EmployeePage;


import React, { useState, useEffect, useRef } from "react";
import $ from "jquery";
import "datatables.net-dt/css/dataTables.dataTables.min.css";
import "datatables.net-dt";
import { Player } from "@lottiefiles/react-lottie-player";
import truckLoader from "@/util/Animation.json";
import EmployeeForm from "./EmployeeForem";
import Navigation from "@/util/libs/navigation";
import Swal from "sweetalert2"; // Import SweetAlert2

const URL = import.meta.env.VITE_API_BACK_URL;

const EmployeePage = () => {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editData, setEditData] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const tableRef = useRef(null);

  useEffect(() => {
    fetchEmployees();
  }, []);

  useEffect(() => {
    if (employees.length > 0 && tableRef.current) {
      $(tableRef.current).DataTable();
    }
  }, [employees]);

  const fetchEmployees = async () => {
    try {
      const response = await fetch(`${URL}/api/employees`);
      if (!response.ok) throw new Error("Failed to fetch data");
      const data = await response.json();
      setEmployees(data || []);
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
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const response = await fetch(`${URL}/api/employees/${uuid}`, {
            method: "DELETE",
          });
          if (response.ok) {
            Swal.fire("Deleted!", "Employee deleted successfully!", "success");
            fetchEmployees();
          } else {
            Swal.fire("Error", "Failed to delete Employee.", "error");
          }
        } catch (err) {
          console.error("Error deleting employee:", err);
          Swal.fire("Error", "Error deleting data.", "error");
        }
      }
    });
  };

  const handleEdit = (emp) => {
    setEditData(emp);
    setShowForm(true);
  };

  const handleSave = async () => {
    setShowForm(false);
    setEditData(null);
    fetchEmployees();
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
          <EmployeeForm onClose={() => setShowForm(false)} onSave={handleSave} editData={editData} />
        </div>
      )}

      {loading && (
        <div className="flex justify-center items-center h-64">
          <Player autoplay loop src={truckLoader} className="w-48 h-48" />
        </div>
      )}
      {error && <p className="text-red-500">{error}</p>}
      {!loading && (
        <div className="bg-white mt-3 rounded-md shadow-md p-4 overflow-auto flex-1">
          <table ref={tableRef} className="display w-full border border-gray-300 bg-white shadow-md rounded-md">
            <thead>
              <tr className="bg-gray-200 ">
                <th className="border p-2">Sr. No</th>
                <th className="border p-2">Category</th>
                <th className="border p-2">Employee</th>
                <th className="border p-2">Login Info</th>
                <th className="border p-2">Bank Info</th>
                <th className="border p-2">Action</th>
                <th className="border p-2">Docs</th>
              </tr>
            </thead>
            <tbody>
              {employees.length > 0 ? (
                employees.map((emp) => (
                  <tr key={emp.uuid} className="text-start hover:bg-gray-100">
                    <td className="border p-2">{emp.order_number}</td>
                    <td className="border p-2 ">
                      <div className="font-normal">{emp.category}</div>
                      <div className="text-xs md:text-sm font-semibold"><span className="font-normal">Godown:</span>{emp.subGodown}</div>
                    </td>
                    <td className="border p-2">
                      <div className="font-semibold"><span className="font-normal">Name:</span>{emp.fullName}</div>
                      <div className="text-sm md:text-sm font-semibold"><span className="font-normal">Address:</span>{emp.address}</div>
                      <div className="text-sm md:text-sm font-semibold"><span className="font-normal">Contact:</span>{emp.contact}</div>
                      <div className="text-sm md:text-sm font-semibold"><span className="font-normal">Pan No:</span>{emp.panNo}</div>
                    </td>
                    <td className="border p-2">
                      <div className="font-semibold"><span className="font-normal">Username:</span>{emp.username}</div>
                      <div className="text-xs md:text-sm font-semibold"><span className="font-normal">Password:</span>{emp.password}</div>
                    </td>
                    <td className="border p-2">
                      <div className="font-semibold "><span className="font-normal">Username:</span>{emp.bankName || "N/A"}</div>
                      <div className="font-semibold "><span className="font-normal">A/C No:</span>{emp.accountNumber || "N/A"}</div>
                      <div className="font-semibold "><span className="font-normal">IFSC:</span>{emp.ifscCode || "N/A"}</div>
                      <div className="font-semibold "><span className="font-normal">Branch:</span>{emp.branchName || "N/A"}</div>
                    </td>
                    <td className="border p-2 flex justify-start gap-2 text-xs md:text-base">
                      <button
                        onClick={() => handleEdit(emp)}
                        className="bg-blue-500 text-white px-3 py-1 rounded-lg hover:bg-blue-700"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(emp.uuid)}
                        className="bg-red-500 text-white px-3 py-1 rounded-lg hover:bg-red-700"
                      >
                        Delete
                      </button>
                    </td>
                    <td className="border p-2 text-blue-500 cursor-pointer">📄</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="7" className="p-3 text-start text-gray-500">No Employees Found</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default EmployeePage;
