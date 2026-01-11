import React, { useState, useEffect } from "react";
import { Player } from "@lottiefiles/react-lottie-player";
import truckLoader from "@/util/Animation.json";
import EmployeeForm from "./EmployeeForem";
import Navigation from "@/util/libs/navigation";
import Swal from "sweetalert2";
import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";
import DataTable from "@/components/common/DataTable";

const URL = import.meta.env.VITE_API_BACK_URL;

const EmployeePage = () => {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editData, setEditData] = useState(null);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    fetchEmployees();
  }, []);

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

  const generatePDF = (employee) => {
    Swal.fire({
      title: "Download PDF",
      text: "Do you want to download the employee details as PDF?",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, download it!",
      cancelButtonText: "No, cancel"
    }).then((result) => {
      if (result.isConfirmed) {
        try {
          const doc = new jsPDF();
          
          // Add title with larger font and centered
          doc.setFontSize(20);
          doc.setTextColor(0, 0, 0); // Black color
          doc.text("Employee Details", 105, 20, { align: 'center' });
          
          // Add employee details with improved formatting
          doc.setFontSize(14);
          const details = [
            ["Employee ID", employee.order_number || "N/A"],
            ["Category", employee.category || "N/A"],
            ["Sub Godown", employee.subGodown || "N/A"],
            ["Full Name", employee.fullName || "N/A"],
            ["Address", employee.address || "N/A"],
            ["Contact", employee.contact || "N/A"],
            ["PAN No", employee.panNo || "N/A"],
            ["Username", employee.username || "N/A"],
            ["Bank Name", employee.bankName || "N/A"],
            ["Account Number", employee.accountNumber || "N/A"],
            ["IFSC Code", employee.ifscCode || "N/A"],
            ["Branch Name", employee.branchName || "N/A"]
          ];

          autoTable(doc, {
            startY: 30,
            head: [['Field', 'Value']],
            body: details,
            theme: 'grid',
            headStyles: { 
              fillColor: [42, 48, 66],
              textColor: [255, 255, 255],
              fontSize: 14,
              halign: 'center',
              fontStyle: 'bold'
            },
            bodyStyles: {
              fontSize: 12,
              halign: 'center',
              cellPadding: 6,
              textColor: [0, 0, 0] // Black color
            },
            styles: {
              cellPadding: 6,
              fontSize: 12,
              lineColor: [0, 0, 0], // Black borders
              lineWidth: 0.5
            },
            columnStyles: {
              0: { cellWidth: 60, fontStyle: 'bold' },
              1: { cellWidth: 120 }
            },
            margin: { left: 15, right: 15 }
          });

          // Save the PDF
          doc.save(`Employee_${employee.fullName || 'Details'}.pdf`);
          
          // Show success message
          Swal.fire({
            icon: "success",
            title: "PDF Downloaded",
            text: "The employee details have been downloaded successfully!",
            timer: 1500,
            showConfirmButton: false
          });
        } catch (error) {
          console.error("Error generating PDF:", error);
          Swal.fire({
            icon: "error",
            title: "Error",
            text: "Failed to generate PDF. Please try again."
          });
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
          <EmployeeForm onClose={() => setShowForm(false)} onSave={handleSave} editData={editData} />
        </div>
      )}

      {loading && (
        <div className="flex justify-center items-center h-64">
          <Player autoplay loop src={truckLoader} className="w-48 h-48" />
        </div>
      )}
      
      <DataTable
        data={employees}
        columns={[
          {
            key: "order_number",
            header: "Sr. No",
            render: (emp) => emp.order_number
          },
          {
            key: "category",
            header: "Category",
            render: (emp) => (
              <div>
                      <div className="font-normal">{emp.category}</div>
                <div className="text-xs md:text-sm font-semibold">
                  <span className="font-normal">Godown:</span>{emp.subGodown}
                </div>
              </div>
            )
          },
          {
            key: "employee",
            header: "Employee",
            render: (emp) => (
              <div>
                <div className="font-semibold">
                  <span className="font-normal">Name:</span>{emp.fullName}
                </div>
                <div className="text-sm md:text-sm font-semibold">
                  <span className="font-normal">Address:</span>{emp.address}
                </div>
                <div className="text-sm md:text-sm font-semibold">
                  <span className="font-normal">Contact:</span>{emp.contact}
                </div>
                <div className="text-sm md:text-sm font-semibold">
                  <span className="font-normal">Pan No:</span>{emp.panNo}
                </div>
              </div>
            )
          },
          {
            key: "login",
            header: "Login Info",
            render: (emp) => (
              <div>
                <div className="font-semibold">
                  <span className="font-normal">Username:</span>{emp.username}
                </div>
                <div className="text-xs md:text-sm font-semibold">
                  <span className="font-normal">Password:</span>{emp.password}
                </div>
              </div>
            )
          },
          {
            key: "bank",
            header: "Bank Info",
            render: (emp) => (
              <div>
                <div className="font-semibold">
                  <span className="font-normal">Bank:</span>{emp.bankName || "N/A"}
                </div>
                <div className="font-semibold">
                  <span className="font-normal">A/C No:</span>{emp.accountNumber || "N/A"}
                </div>
                <div className="font-semibold">
                  <span className="font-normal">IFSC:</span>{emp.ifscCode || "N/A"}
                </div>
                <div className="font-semibold">
                  <span className="font-normal">Branch:</span>{emp.branchName || "N/A"}
                </div>
        </div>
            )
          }
        ]}
        loading={loading}
        error={error}
        onEdit={handleEdit}
        onDelete={handleDelete}
        actionType="delete"
        showDocsButton={true}
        onDocsClick={generatePDF}
        emptyMessage="No Employees Found"
      />
    </div>
  );
};

export default EmployeePage;


