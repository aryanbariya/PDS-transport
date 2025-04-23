import React, { useState, useEffect, useRef } from "react";
import TransportForm from "./FirstTappaForm";
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
import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";

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
      let endpoint = `${URL}/api/transports`;
      if (filter === "active") endpoint = `${URL}/api/tapa/active`;
      if (filter === "inactive") endpoint = `${URL}/api/tapa/inactive`;

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
          const response = await fetch(`${URL}/api/transports/${uuid}`, {
            method: "DELETE",
          });
          if (response.ok) {
            Swal.fire("Deleted!", "Transport record deleted successfully!", "success");
            fetchTransportData();
          } else {
            Swal.fire("Error", "Failed to delete transport record.", "error");
          }
        } catch (err) {
          console.error("Error deleting transport record:", err);
          Swal.fire("Error", "Error deleting data.", "error");
        }
      }
    });
  };

  const handleEdit = (transport) => {
    setEditData(transport);
    setShowForm(true);
  };

  const handleSave = async () => {
    setShowForm(false);
    setEditData(null);
    fetchTransportData();
  };

  const generatePDF = (transport) => {
    Swal.fire({
      title: "Download PDF",
      text: "Do you want to download the transport details as PDF?",
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
          doc.text("Transport Details", 105, 20, { align: 'center' });
          
          // Add transport details with improved formatting
          doc.setFontSize(14);
          const details = [
            ["TP No", transport.tpNo || "N/A"],
            ["Dispatch Date", transport.dispatchDate ? formatDate(transport.dispatchDate) : "N/A"],
            ["Base Depo", transport.baseDepoName || "N/A"],
            ["Truck No", transport.truckName || "N/A"],
            ["D.O Number", transport.doNo || "N/A"],
            ["Quota", transport.quota ? formatDate(transport.quota) : "N/A"],
            ["Scheme", transport.schemeName || "N/A"],
            ["No of Bags", transport.bardanWeight || "N/A"],
            ["Packaging", transport.packagingName || "N/A"],
            ["Gross Weight", transport.grossWeight || "N/A"],
            ["Tare Weight", transport.emptyWeight || "N/A"]
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
          doc.save(`Transport_${transport.tpNo || 'Details'}.pdf`);
          
          // Show success message
          Swal.fire({
            icon: "success",
            title: "PDF Downloaded",
            text: "The transport details have been downloaded successfully!",
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
          <TransportForm onClose={() => setShowForm(false)} onSave={handleSave} editData={editData} />
        </div>
      )}
      {/* Filter Dropdown */}
      <div className="my-4">
        {/* <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="px-2 py-2 border border-gray-300 rounded-md bg-white shadow-md focus:outline-none"
        >
          {/* <option value="all">All</option> */}
          {/* <option value="active">Active</option>
          <option value="inactive">Inactive</option> */}
        {/* </select> */} 
      </div>

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
                    <td className="border p-2">
                      <button
                        onClick={() => generatePDF(tp)}
                        className="bg-blue-500 text-white px-3 py-1 rounded-lg hover:bg-blue-700"
                      >
                        View
                      </button>
                    </td>
                    <td className="border p-2">{tp.tpNo}</td>
                    <td className="border p-2">{formatDate(tp.dispatchDate)}</td>
                    <td className="border p-2">{tp.baseDepoName}</td>
                    <td className="border p-2">{tp.truckName}</td>
                    <td className="border p-2">{tp.donumber}</td>
                    <td className="border p-2">{formatDate(tp.quota)}</td>
                    <td className="border p-2">{tp.schemeName}</td>
                    <td className="border p-2">{tp.noOfBags}</td>
                    <td className="border p-2">{tp.packagingName}</td>
                    <td className="border p-2">{tp.grossWeight}</td>
                    <td className="border p-2">{tp.emptyWeight}</td>
                    <td className="border p-2 flex justify-center space-x-2">
                      <Button onClick={() => handleEdit(tp)} className="bg-blue-500 text-white px-3 py-1 rounded-lg hover:bg-blue-700">
                        Edit
                      </Button>
                      <Button onClick={() => handleDelete(tp.uuid)} className="bg-red-500 text-white px-3 py-1 rounded-lg hover:bg-red-700">
                        Delete
                      </Button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="10" className="text-center p-4">No records found</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default TransportPage;
