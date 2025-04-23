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
import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";
const URL = import.meta.env.VITE_API_BACK_URL;

function FirstTapaReport() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all");
  const [error, setError] = useState(null);
  const tableRef = useRef(null);
  
const [expandedRow, setExpandedRow] = useState(null);


  const toggleAllocation = (id) => {
    setExpandedRow((prevId) => (prevId === id ? null : id));
  };

  const fetchTransportData = async () => {
    try {
      setLoading(true);
      let endpoint = `${URL}/api/fristreport`;
      if (filter === "active") endpoint = `${URL}/api/fristreport/active`;
      if (filter === "inactive") endpoint = `${URL}/api/fristreport/inactive`;

      const response = await fetch(endpoint);
      if (!response.ok) throw new Error("Failed to fetch data");

      const data = await response.json();


      setData(data || []);

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
    if (tableRef.current && data.length > 0) {
      const dataTable = new DataTable(tableRef.current, {
        destroy: true,
        responsive: true,
      });

      return () => {
        dataTable.destroy();
      };
    }
  }, [data]);
  const generatePDF = (tp) => {
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
              ["TP No", tp.tpNo || "N/A"],
              ["Base Depo", tp.baseDepoName || "N/A"],
              ["Truck No", tp.truckName || "N/A"],
              ["D.O Number", tp.donumber || "N/A"],
              ["Quota", tp.quota ? formatDate(tp.quota) : "N/A"],
              ["Scheme", tp.schemeName || "N/A"],
              ["Gross Weight", tp.grossWeight || "N/A"],
              ["NetWeight", tp.netWeight || "N/A"],
              ["LoadedNetWeight Weight", tp.loadedNetWeight || "N/A"],
              ["Godowns", tp.godown || "N/A"],
              ["Vahtuks", tp.vahtuk || "N/A"],
              ["Quantites", tp.quantity || "N/A"]
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
            doc.save(`Transport_${tp.tpNo || 'Details'}.pdf`);
            
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

      </div>

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
                <th className="border p-2">Allocation</th>
                <th className="border p-2">Base Depo</th>
                <th className="border p-2">Truck No</th>
                <th className="border p-2">D.O Number</th>
                <th className="border p-2">Quota</th>
                <th className="border p-2">Scheme</th>
                <th className="border p-2">No of Bags</th>
                <th className="border p-2">Gross Weight</th>
                <th className="border p-2">Net Weight</th>
                <th className="border p-2">Loaded Net Weight</th>
                <th className="border p-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {data.length > 0 ? (
                data.map((tp, index) => {
                  const godowns = tp.godown?.split("|") || [];
                  const vahtuks = tp.vahtuk?.split("|") || [];
                  const quantities = tp.quantity?.split("|") || [];

                  return (
                    <React.Fragment key={tp.trans_id}>
                      <tr className="text-start hover:bg-gray-100">
                        <td className="border p-2">{index + 1}</td>
                        <td className="border p-2">
                          <button
                            onClick={() => generatePDF(tp)}
                            className="bg-blue-500 text-white px-3 py-1 rounded-lg hover:bg-blue-700"
                          >
                            View
                          </button>
                        </td>
                        <td className="border p-2">{tp.tpNo}</td>

                        {/* Godown column with Allocation button */}
                        <td className="border p-2">
                          <div className="flex flex-col">
                            <button
                              onClick={() => toggleAllocation(tp.uuid)}
                              className="text-l text-blue-500 underline mt-1"
                            >
                              {expandedRow === tp.uuid ? "Hide Allocation" : "See Allocation"}
                            </button>
                          </div>
                        </td>
                        <td className="border p-2">{tp.baseDepoName}</td>
                        <td className="border p-2">{tp.truckName}</td>
                        <td className="border p-2">{tp.do_id}</td>
                        <td className="border p-2">{formatDate(tp.quota)}</td>
                        <td className="border p-2">{tp.schemeName}</td>
                        <td className="border p-2">{tp.noOfBags}</td>
                        <td className="border p-2">{tp.grossWeight}</td>
                        <td className="border p-2">{tp.netWeight}</td>
                        <td className="border p-2">{tp.loadedNetWeight}</td>
                        <td className="border p-2 flex justify-center space-x-2">
                          Start
                          {/* <Button onClick={() => handleEdit(tp)} className="bg-blue-500 text-white px-3 py-1 rounded-lg hover:bg-blue-700">
                            Edit
                          </Button>
                          <Button onClick={() => handleDelete(tp.uuid)} className="bg-red-500 text-white px-3 py-1 rounded-lg hover:bg-red-700">
                            Delete
                          </Button> */}
                        </td>
                      </tr>

                      {/* Allocation Detail Row (conditionally rendered) */}
                      {expandedRow === tp.uuid && (
                        <tr className="bg-gray-50">
                          <td colSpan="14" className="p-3">
                            <div className="text-sm">
                              <strong>Allocation Details:</strong>
                              <ul className="mt-2 list-disc pl-6">
                                {godowns.map((g, i) => (
                                  <li key={i}>
                                    Godown: <strong>{g}</strong>, Vahtuk: <strong>{vahtuks[i]}</strong>, Quantity: <strong>{quantities[i]}</strong>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          </td>
                        </tr>
                      )}
                    </React.Fragment>
                  );
                })
              ) : (
                <tr>
                  <td colSpan="14" className="text-center p-4">No records found</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default FirstTapaReport


