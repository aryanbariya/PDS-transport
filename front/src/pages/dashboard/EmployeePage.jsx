// import React, { useState, useEffect } from "react";
// import EmployeeForm from "./EmployeeForem";
// import axios from "axios";

// const EmployeePage = () => {
//   const [employees, setEmployees] = useState([]);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [showForm, setShowForm] = useState(false);
//   const [editingEmployee, setEditingEmployee] = useState(null);

//   // Fetch Employees
//   useEffect(() => {
//     fetchEmployees();
//   }, []);

//   const fetchEmployees = async () => {
//     try {
//       const response = await axios.get("http://localhost:5000/employees");
//       setEmployees(response.data);
//     } catch (error) {
//       console.error("Error fetching employees:", error);
//     }
//   };

//   // Delete Employee
//   const deleteEmployee = async (id) => {
//     try {
//       await axios.delete(`http://localhost:5000/employees/${id}`);
//       setEmployees(employees.filter((emp) => emp.id !== id));
//     } catch (error) {
//       console.error("Error deleting employee:", error);
//     }
//   };

//   // Filtered Employees based on search
//   const filteredEmployees = employees.filter(
//     (emp) =>
//       emp.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       emp.category.toLowerCase().includes(searchTerm.toLowerCase())
//   );

//   return (
//     <div className="flex flex-col h-full w-full p-4 bg-gray-100">
//       {/* Title Bar */}
//       <div className="bg-blue-600 text-white text-lg font-semibold py-4 px-6 rounded-md w-full">
//         Employees Details
//       </div>

//       {/* Search & Add Section */}
//       <div className="flex justify-between items-center bg-white p-3 mt-2 rounded-md shadow-md">
//         <input
//           type="text"
//           placeholder="Search Employees..."
//           className="border p-2 rounded-md w-full max-w-lg"
//           value={searchTerm}
//           onChange={(e) => setSearchTerm(e.target.value)}
//         />
//         <button
//           className="ml-3 bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700"
//           onClick={() => {
//             setEditingEmployee(null);
//             setShowForm(!showForm);
//           }}
//         >
//           {showForm ? "Close" : "Add"}
//         </button>
//       </div>

//       {/* Show Form when Add/Edit button is clicked */}
//       {showForm && (
//         <div className="mt-3 bg-white p-4 rounded-md shadow-md">
//           <EmployeeForm
//             onClose={() => setShowForm(false)}
//             onSave={fetchEmployees} // Refresh data after adding/updating
//             employee={editingEmployee}
//           />
//         </div>
//       )}

//       {/* Table Section */}
//       <div className="bg-white mt-3 rounded-md shadow-md p-4 overflow-auto flex-1">
//         <table className="w-full border-collapse">
//           <thead>
//             <tr className="bg-gray-200 text-gray-700">
//               <th className="border border-gray-300 p-2">Sr. No</th>
//               <th className="border border-gray-300 p-2">Category Name</th>
//               <th className="border border-gray-300 p-2">Employee Name</th>
//               <th className="border border-gray-300 p-2">Login Info</th>
//               <th className="border border-gray-300 p-2">Bank Info</th>
//               <th className="border border-gray-300 p-2">Action</th>
//               <th className="border border-gray-300 p-2">Docs</th>
//             </tr>
//           </thead>
          
//           <tbody>
//             {filteredEmployees.length > 0 ? (
//               filteredEmployees.map((emp, index) => (
//                 <tr key={emp.id} className="text-gray-600 text-center hover:bg-gray-100">
//                   <td className="border border-gray-300 p-2">{index + 1}</td>
//                   <td className="border border-gray-300 p-2 font-semibold">
//                     {emp.category}
//                     {emp.subGodown && (
//                       <div className="text-sm text-gray-500">
//                         Godown: {emp.subGodown}
//                       </div>
//                     )}
//                   </td>
//                   <td className="border border-gray-300 p-2">
//                     <div>Name: <span className="font-semibold">{emp.fullName}</span></div>
//                     <div>Address: {emp.address}</div>
//                   </td>
//                   <td className="border border-gray-300 p-2">
//                     <div>Username: <span className="font-semibold">{emp.username}</span></div>
//                     <div>Password: <span className="font-semibold">{emp.password}</span></div>
//                   </td>
//                   <td className="border border-gray-300 p-2">
//                     <div>Bank: {emp.bankName || "N/A"}</div>
//                     <div>A/C No: {emp.accountNumber || "N/A"}</div>
//                     <div>IFSC: {emp.ifscCode || "N/A"}</div>
//                     <div>Branch: {emp.branchName || "N/A"}</div>
//                   </td>
//                   <td className="border border-gray-300 p-2 flex justify-center gap-2">
//                     {/* Edit Button */}
//                     <button
//                       onClick={() => {
//                         setEditingEmployee(emp);
//                         setShowForm(true);
//                       }}
//                       className="text-green-500 hover:text-green-700"
//                     >
//                       ✏️
//                     </button>

//                     {/* Delete Button */}
//                     <button
//                       onClick={() => deleteEmployee(emp.id)}
//                       className="text-red-500 hover:text-red-700"
//                     >
//                       🗑️
//                     </button>
//                   </td>
//                   <td className="border border-gray-300 p-2 text-blue-500 cursor-pointer">
//                     📄
//                   </td>
//                 </tr>
//               ))
//             ) : (
//               <tr>
//                 <td colSpan="7" className="p-3 text-center text-gray-500">
//                   No Employees Found
//                 </td>
//               </tr>
//             )}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// };

// export default EmployeePage;

//////////////////////////////////////////////////////////////////////////////////


// import React, { useState, useEffect } from "react";
// import EmployeeForm from "./EmployeeForem";
// const URL = import.meta.env.VITE_API_BACK_URL

// const EmployeePage = () => {
//   const [employees, setEmployees] = useState([]);
//   const [loading, setLoading] = useState(true);

//   const [editData, setEditData] = useState(null);
//   const [showForm, setShowForm] = useState(false);
//   const [searchTerm, setSearchTerm] = useState("");
 

//   // Fetch Employees
//   const fetchEmployees = async () => {
//     try {
//       const response = await fetch(`${URL}/api/employees`);
//       if (!response.ok) throw new Error("Failed to fetch data");
//       const data = await response.json();
//       setEmployees(data || []);
//       setLoading(false);
//     } catch (err) {
//       // setError(err.message);
//       setLoading(false);
//     }
//   };
//     useEffect(() => {
//       fetchEmployees();
//     }, []);

//   const handleDelete = async (uuid) => {
//     if (!window.confirm("Are you sure you want to delete this employee?")) return;
//     try {
//       const response = await fetch(`${URL}/api/employees/${uuid}`, {
//         method: "DELETE",
//       });
//       if (response.ok) {
//         alert("Employee deleted successfully!");
//         fetchEmployees();
//       } else {
//         alert("Failed to delete Employee.");
//       }
//     } catch (err) {
//       console.error("Error deleting Employee:", err);
//       alert("Error deleting data.");
//     }
//   };

//     // ✅ Handle Edit
//     const handleEdit = (emp) => {
//       setEditData(emp);
//       setShowForm(true);
//     };
  
//     // ✅ Handle Save after Form Submission
//     const handleSave = async () => {
//       setShowForm(false);
//       setEditData(null);
//       fetchEmployees();
//     };


//   // Filtered Employees based on search
//   const filteredEmployees = employees.filter(
//     (emp) =>
//       emp.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       emp.category.toLowerCase().includes(searchTerm.toLowerCase())
//   );

//   return (
//     <div className="flex flex-col h-full w-full p-4 bg-gray-100">
//       {/* Title Bar */}
//       <div className="bg-blue-600 text-white text-lg font-semibold py-4 px-6 rounded-md w-full">
//         Employees Details
//       </div>

//       {/* Search & Add Section */}
//       <div className="flex justify-between items-center bg-white p-3 mt-2 rounded-md shadow-md">
//         <input
//           type="text"
//           placeholder="Search Employees..."
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

//       {/* Show Form when Add/Edit button is clicked */}
//       {showForm && (
//         <div className="mt-3 bg-white p-4 rounded-md shadow-md">
//           <EmployeeForm
//             onClose={() => setShowForm(false)}
//             onSave={handleSave} // Refresh data after adding/updating
//             editData={editData}
//           />
//         </div>
//       )}
//             {loading && <p>Loading...</p>}
//             {/* {error && <p className="text-red-500">{error}</p>} */}

//       {/* Table Section */}
//       <div className="bg-white mt-3 rounded-md shadow-md p-4 overflow-auto flex-1">
//         <table className="w-full border-collapse">
//           <thead>
//             <tr className="bg-gray-200 text-gray-700">
//               <th className="border border-gray-300 p-2">Sr. No</th>
//               <th className="border border-gray-300 p-2">Category Name</th>
//               <th className="border border-gray-300 p-2">Employee Name</th>
//               <th className="border border-gray-300 p-2">Login Info</th>
//               <th className="border border-gray-300 p-2">Bank Info</th>
//               <th className="border border-gray-300 p-2">Action</th>
//               <th className="border border-gray-300 p-2">Docs</th>
//             </tr>
//           </thead>
          
//           <tbody>
//             {filteredEmployees.length > 0 ? (
//               filteredEmployees.map((emp) => (
//                 <tr key={emp.uuid} className="text-gray-600 text-center hover:bg-gray-100">
//                   <td className="border border-gray-300 p-2">{emp.order_number}</td>
//                   <td className="border border-gray-300 p-2 font-semibold">
//                     {emp.category}
//                     {emp.subGodown && (
//                       <div className="text-sm text-gray-500">
//                         Godown: {emp.subGodown}
//                       </div>
//                     )}
//                   </td>
//                   <td className="border border-gray-300 p-2">
//                     <div>Name: <span className="font-semibold">{emp.fullName}</span></div>
//                     <div>Address: {emp.address}</div>
//                   </td>
//                   <td className="border border-gray-300 p-2">
//                     <div>Username: <span className="font-semibold">{emp.username}</span></div>
//                     <div>Password: <span className="font-semibold">{emp.password}</span></div>
//                   </td>
//                   <td className="border border-gray-300 p-2">
//                     <div>Bank: {emp.bankName || "N/A"}</div>
//                     <div>A/C No: {emp.accountNumber || "N/A"}</div>
//                     <div>IFSC: {emp.ifscCode || "N/A"}</div>
//                     <div>Branch: {emp.branchName || "N/A"}</div>
//                   </td>
//                   <td className="border border-gray-300 p-2 flex justify-center gap-2">
//                     {/* Edit Button */}
//                     <button
//                       onClick={() => {
//                         handleEdit(emp)
//                       }}
//                       className="text-green-500 hover:text-green-700"
//                     >
//                       ✏️
//                     </button>

//                     {/* Delete Button */}
//                     <button
//                       onClick={() => handleDelete(emp.uuid)}
//                       className="text-red-500 hover:text-red-700"
//                     >
//                       🗑️
//                     </button>
//                   </td>
//                   <td className="border border-gray-300 p-2 text-blue-500 cursor-pointer">
//                     📄
//                   </td>
//                 </tr>
//               ))
//             ) : (
//               <tr>
//                 <td colSpan="7" className="p-3 text-center text-gray-500">
//                   No Employees Found
//                 </td>
//               </tr>
//             )}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// };

// export default EmployeePage;

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
