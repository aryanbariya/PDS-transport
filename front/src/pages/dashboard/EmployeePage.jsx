import React, { useState, useEffect } from "react";
import EmployeeForm from "./EmployeeForem";
const URL = import.meta.env.VITE_API_BACK_URL;

const EmployeePage = () => {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editData, setEditData] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const fetchEmployees = async () => {
    try {
      const response = await fetch(`${URL}/api/employees`);
      if (!response.ok) throw new Error("Failed to fetch data");
      const data = await response.json();
      setEmployees(data || []);
      setLoading(false);
    } catch (err) {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  const handleDelete = async (uuid) => {
    if (!window.confirm("Are you sure you want to delete this employee?")) return;
    try {
      const response = await fetch(`${URL}/api/employees/${uuid}`, {
        method: "DELETE",
      });
      if (response.ok) {
        alert("Employee deleted successfully!");
        fetchEmployees();
      } else {
        alert("Failed to delete Employee.");
      }
    } catch (err) {
      alert("Error deleting data.");
    }
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

  const filteredEmployees = employees.filter(
    (emp) =>
      emp.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      emp.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="flex flex-col h-full w-full p-4 bg-gray-100">
      <div className="bg-blue-600 text-white text-lg font-semibold py-4 px-6 rounded-md w-full">
        Employees Details
      </div>

      <div className="flex flex-col md:flex-row justify-between items-center bg-white p-3 mt-2 rounded-md shadow-md">
        <input
          type="text"
          placeholder="Search Employees..."
          className="border p-2 rounded-md w-full md:max-w-lg"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button
          className="mt-2 md:mt-0 md:ml-3 bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700"
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

      {loading && <p className="text-center text-gray-500">Loading...</p>}

      <div className="bg-white mt-3 rounded-md shadow-md p-4 overflow-auto flex-1">
        <table className="w-full border-collapse text-xs md:text-sm">
          <thead>
            <tr className="bg-gray-200 text-gray-700">
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
            {filteredEmployees.length > 0 ? (
              filteredEmployees.map((emp) => (
                <tr key={emp.uuid} className="text-gray-600 text-center hover:bg-gray-100">
                  <td className="border p-2">{emp.order_number}</td>
                  <td className="border p-2 font-semibold">{emp.category}</td>
                  <td className="border p-2">
                    <div className="font-semibold">{emp.fullName}</div>
                    <div className="text-xs md:text-sm">{emp.address}</div>
                  </td>
                  <td className="border p-2">
                    <div className="font-semibold">{emp.username}</div>
                    <div className="text-xs md:text-sm">{emp.password}</div>
                  </td>
                  <td className="border p-2">
                    <div>{emp.bankName || "N/A"}</div>
                    <div>{emp.accountNumber || "N/A"}</div>
                    <div>{emp.ifscCode || "N/A"}</div>
                    <div>{emp.branchName || "N/A"}</div>
                  </td>
                  <td className="border p-2 flex justify-center gap-2 text-xs md:text-base">
                    <button onClick={() => handleEdit(emp)} className="text-green-500 hover:text-green-700">✏️</button>
                    <button onClick={() => handleDelete(emp.uuid)} className="text-red-500 hover:text-red-700">🗑️</button>
                  </td>
                  <td className="border p-2 text-blue-500 cursor-pointer">📄</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" className="p-3 text-center text-gray-500">No Employees Found</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default EmployeePage;


// import React, { useState, useEffect, useRef } from "react";
// import EmployeeForm from "./EmployeeForem";
// import $ from "jquery";
// import "datatables.net";

// const URL = import.meta.env.VITE_API_BACK_URL;

// const EmployeePage = () => {
//   const [employees, setEmployees] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [editData, setEditData] = useState(null);
//   const [showForm, setShowForm] = useState(false);
//   const tableRef = useRef(null);

//   const fetchEmployees = async () => {
//     try {
//       const response = await fetch(`${URL}/api/employees`);
//       if (!response.ok) throw new Error("Failed to fetch employee records");
//       const data = await response.json();
//       setEmployees(data || []);
//       setLoading(false);
//     } catch (err) {
//       setError(err.message);
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchEmployees();
//   }, []);

//   useEffect(() => {
//     if (employees.length > 0) {
//       if (!$.fn.DataTable.isDataTable(tableRef.current)) {
//         $(tableRef.current).DataTable({
//           paging: true,
//           searching: true,
//           info: true,
//           responsive: true,
//           autoWidth: false,
//           lengthMenu: [5, 10, 25, 50],
//         });
//       }
//     }
//   }, [employees]);

//   const handleDelete = async (uuid) => {
//     if (!window.confirm("Are you sure you want to delete this employee?")) return;
//     try {
//       const response = await fetch(`${URL}/api/employees/${uuid}`, { method: "DELETE" });
//       if (response.ok) {
//         alert("Employee deleted successfully!");
//         fetchEmployees();
//       } else {
//         alert("Failed to delete employee.");
//       }
//     } catch (err) {
//       console.error("Error deleting employee:", err);
//       alert("Error deleting data.");
//     }
//   };

//   const handleEdit = (emp) => {
//     setEditData(emp);
//     setShowForm(true);
//   };

//   const handleSave = () => {
//     setShowForm(false);
//     setEditData(null);
//     fetchEmployees();
//   };

//   return (
//     <div className="flex flex-col h-full w-full p-4 bg-gray-100">
//       <div className="bg-blue-600 text-white text-lg font-semibold py-4 px-6 rounded-md w-full">
//         Employees List
//       </div>

//       <div className="flex justify-between items-center bg-white p-3 mt-2 rounded-md shadow-md">
//         <button
//           className="ml-3 bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700"
//           onClick={() => {
//             setEditData(null);
//             setShowForm(!showForm);
//           }}
//         >
//           {showForm ? "Close" : "Add Employee"}
//         </button>
//       </div>

//       {showForm && (
//         <div className="mt-3 bg-white p-4 rounded-md shadow-md">
//           <EmployeeForm onClose={() => setShowForm(false)} onSave={handleSave} editData={editData} />
//         </div>
//       )}

//       {loading && <p className="text-center text-gray-500">Loading...</p>}
//       {error && <p className="text-red-500">{error}</p>}

//       <table ref={tableRef} className="w-full text-sm text-left text-gray-600 mt-4 bg-white shadow-md rounded-md">
//         <thead className="bg-gray-200 text-gray-700 uppercase">
//           <tr>
//             <th className="px-4 py-3">Sr. No</th>
//             <th className="px-4 py-3">Category</th>
//             <th className="px-4 py-3">Employee</th>
//             <th className="px-4 py-3">Login Info</th>
//             <th className="px-4 py-3">Bank Info</th>
//             <th className="px-4 py-3">Actions</th>
//             <th className="px-4 py-3">Docs</th>
//           </tr>
//         </thead>
//         <tbody>
//           {employees.map((emp) => (
//             <tr key={emp.uuid} className="border-b hover:bg-gray-100">
//               <td className="px-4 py-3">{emp.order_number}</td>
//               <td className="px-4 py-3 font-semibold">{emp.category}</td>
//               <td className="px-4 py-3">
//                 <div className="font-semibold">{emp.fullName}</div>
//                 <div className="text-xs md:text-sm">{emp.address}</div>
//               </td>
//               <td className="px-4 py-3">
//                 <div className="font-semibold">{emp.username}</div>
//                 <div className="text-xs md:text-sm">{emp.password}</div>
//               </td>
//               <td className="px-4 py-3">
//                 <div>{emp.bankName || "N/A"}</div>
//                 <div>{emp.accountNumber || "N/A"}</div>
//                 <div>{emp.ifscCode || "N/A"}</div>
//                 <div>{emp.branchName || "N/A"}</div>
//               </td>
//               <td className="px-4 py-3 flex space-x-2">
//                 <button
//                   onClick={() => handleEdit(emp)}
//                   className="bg-blue-500 text-white px-3 py-1 rounded-lg hover:bg-blue-700"
//                 >
//                   ✏️
//                 </button>
//                 <button
//                   onClick={() => handleDelete(emp.uuid)}
//                   className="bg-red-500 text-white px-3 py-1 rounded-lg hover:bg-red-700"
//                 >
//                   🗑️
//                 </button>
//               </td>
//               <td className="px-4 py-3 text-blue-500 cursor-pointer">📄</td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default EmployeePage;
