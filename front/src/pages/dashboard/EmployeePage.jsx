// import React, { useState } from "react";
// import EmployeeForm from "./EmployeeForem";

// const EmployeePage = () => {
//   const [employees, setEmployees] = useState([]);
//   const [showForm, setShowForm] = useState(false);
//   const [editingEmployee, setEditingEmployee] = useState(null);

//   // Function to add a new employee
//   const addEmployee = (newEmployee) => {
//     setEmployees([...employees, { id: employees.length + 1, ...newEmployee }]);
//     setShowForm(false);
//   };

//   // Function to update an existing employee
//   const updateEmployee = (updatedEmployee) => {
//     setEmployees(
//       employees.map(emp => emp.id === updatedEmployee.id ? updatedEmployee : emp)
//     );
//     setEditingEmployee(null);
//     setShowForm(false);
//   };

//   // Function to delete an employee
//   const deleteEmployee = (id) => {
//     setEmployees(employees.filter(emp => emp.id !== id));
//   };

//   return (
//     <div className="p-6 bg-gray-100 min-h-screen">
//       <div className="flex justify-between items-center mb-4">
//         <button className="bg-green-600 text-white py-2 px-4 rounded-lg flex items-center shadow hover:bg-green-700 transition">
//           <span className="mr-2">👥</span> Employees Details
//         </button>
//         <button
//           onClick={() => { setEditingEmployee(null); setShowForm(true); }}
//           className="bg-blue-600 text-white py-2 px-4 rounded-lg shadow flex items-center hover:bg-blue-700 transition"
//         >
//           ➕ Add
//         </button>
//       </div>

//       <div className="bg-white p-4 rounded-lg shadow overflow-x-auto">
//         <table className="w-full border-collapse border border-gray-300">
//           <thead>
//             <tr className="bg-gray-200 text-gray-700">
//               <th className="border border-gray-300 p-2">Sr.No</th>
//               <th className="border border-gray-300 p-2">Category Name</th>
//               <th className="border border-gray-300 p-2">Employees Name</th>
//               <th className="border border-gray-300 p-2">Login Info</th>
//               <th className="border border-gray-300 p-2">Bank Info</th>
//               <th className="border border-gray-300 p-2">Action</th>
//               <th className="border border-gray-300 p-2">Docs</th>
//             </tr>
//           </thead>
//           <tbody>
//             {employees.map((emp, index) => (
//               <tr key={emp.id} className="text-gray-600 text-center">
//                 <td className="border border-gray-300 p-2">{index + 1}</td>
//                 <td className="border border-gray-300 p-2">
//                   <div className="font-semibold">{emp.category}</div>
//                   {emp.godown && <div className="text-sm text-gray-500">Godown Name: {emp.godown}</div>}
//                 </td>
//                 <td className="border border-gray-300 p-2">
//                   <div>Name: <span className="font-semibold">{emp.fullName}</span></div>
//                   <div>Address: {emp.address}</div>
//                 </td>
//                 <td className="border border-gray-300 p-2">
//                   <div>Username: <span className="font-semibold">{emp.username}</span></div>
//                   <div>Password: <span className="font-semibold">{emp.password}</span></div>
//                 </td>
//                 <td className="border border-gray-300 p-2">
//                   <div>Bank Name: {emp.bankName || "N/A"}</div>
//                   <div>A/C No: {emp.accountNumber || "N/A"}</div>
//                   <div>IFSC Code: {emp.ifscCode || "N/A"}</div>
//                   <div>Branch Name: {emp.branchName || "N/A"}</div>
//                 </td>
//                 <td className="border border-gray-300 p-2 flex justify-center gap-2">
//                   <button 
//                     onClick={() => { setEditingEmployee(emp); setShowForm(true); }} 
//                     className="text-green-500 hover:text-green-700">
//                     ✏️
//                   </button>
//                   <button 
//                     onClick={() => deleteEmployee(emp.id)} 
//                     className="text-red-500 hover:text-red-700">
//                     🗑️
//                   </button>
//                 </td>
//                 <td className="border border-gray-300 p-2 text-blue-500 cursor-pointer">📄</td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>

//       {showForm && (
//         <EmployeeForm 
//           onClose={() => setShowForm(false)} 
//           onSave={editingEmployee ? updateEmployee : addEmployee}
//           employee={editingEmployee} 
//         />
//       )}
//     </div>
//   );
// };

// export default EmployeePage;





import React, { useState, useEffect } from "react";
import EmployeeForm from "./EmployeeForem";
import axios from "axios";

const EmployeePage = () => {
  const [employees, setEmployees] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingEmployee, setEditingEmployee] = useState(null);

  // Fetch employees from database
  useEffect(() => {
    fetchEmployees();
  }, []);

  const fetchEmployees = async () => {
    try {
      const response = await axios.get("http://localhost:5000/employees");
      setEmployees(response.data);
    } catch (error) {
      console.error("Error fetching employees:", error);
    }
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <div className="flex justify-between items-center mb-4">
        <button   onClick={fetchEmployees}  className="bg-green-600 text-white py-2 px-4 rounded-lg flex items-center shadow hover:bg-green-700 transition">
          <span className="mr-2">👥</span> Employees Details
        </button>
        <button
          onClick={() => { setEditingEmployee(null); setShowForm(true); }}
          className="bg-blue-600 text-white py-2 px-4 rounded-lg shadow flex items-center hover:bg-blue-700 transition"
        >
          ➕ Add
        </button>
      </div>

      <div className="bg-white p-4 rounded-lg shadow overflow-x-auto">
        <table className="w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-200 text-gray-700">
              <th className="border border-gray-300 p-2">Sr.No</th>
              <th className="border border-gray-300 p-2">Category Name</th>
              <th className="border border-gray-300 p-2">Employees Name</th>
              <th className="border border-gray-300 p-2">Login Info</th>
              <th className="border border-gray-300 p-2">Bank Info</th>
              <th className="border border-gray-300 p-2">Action</th>
              <th className="border border-gray-300 p-2">Docs</th>
            </tr>
          </thead>
          <tbody>
            {employees.map((emp, index) => (
              <tr key={emp.id} className="text-gray-600 text-center">
                <td className="border border-gray-300 p-2">{index + 1}</td>
                <td className="border border-gray-300 p-2">
                  <div className="font-semibold">{emp.category}</div>
                  {emp.subGodown && <div className="text-sm text-gray-500">Godown Name: {emp.subGodown}</div>}
                </td>
                <td className="border border-gray-300 p-2">
                  <div>Name: <span className="font-semibold">{emp.fullName}</span></div>
                  <div>Address: {emp.address}</div>
                </td>
                <td className="border border-gray-300 p-2">
                  <div>Username: <span className="font-semibold">{emp.username}</span></div>
                  <div>Password: <span className="font-semibold">{emp.password}</span></div>
                </td>
                <td className="border border-gray-300 p-2">
                  <div>Bank Name: {emp.bankName || "N/A"}</div>
                  <div>A/C No: {emp.accountNumber || "N/A"}</div>
                  <div>IFSC Code: {emp.ifscCode || "N/A"}</div>
                  <div>Branch Name: {emp.branchName || "N/A"}</div>
                </td>
                <td className="border border-gray-300 p-2 flex justify-center gap-2">
                  <button 
                    onClick={() => { setEditingEmployee(emp); setShowForm(true); }} 
                    className="text-green-500 hover:text-green-700">
                    ✏️
                  </button>
                  <button 
                    onClick={() => deleteEmployee(emp.id)} 
                    className="text-red-500 hover:text-red-700">
                    🗑️
                  </button>
                </td>
                <td className="border border-gray-300 p-2 text-blue-500 cursor-pointer">📄</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showForm && (
        <EmployeeForm 
          onClose={() => setShowForm(false)} 
          onSave={fetchEmployees} // Refresh data after adding/updating
          employee={editingEmployee} 
        />
      )}
    </div>
  );
};

export default EmployeePage;
