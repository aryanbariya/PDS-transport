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

function FirstTapaReport() {
  const [data, setData] = useState([]);
   const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState("all");
      const [error, setError] = useState(null);
    const tableRef = useRef(null);

  // useEffect(() => {
  //   axios.get(`${URL}/api/fristreport`)
  //     .then((res) => {
  //       setData(res.data);
  //     })
  //     .catch((err) => {
  //       console.error('Error fetching transport data:', err);
  //     });
  // }, []);

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

  return (
    <div className="p-4">
    <h2 className="text-xl font-bold mb-4">First Transport Report</h2>

    {loading ? (
      <p>Loading...</p>
    ) : (
      <div className="overflow-x-auto">
        <table ref={tableRef} className="min-w-full bg-white shadow-md rounded-lg">
          <thead className="bg-gray-200">
            <tr>
              <th className="px-4 py-2">DO No</th>
              <th className="px-4 py-2">Quota</th>
              <th className="px-4 py-2">IQOO</th>
              <th className="px-4 py-2">Driver</th>
              <th className="px-4 py-2">Empty Weight</th>
              <th className="px-4 py-2">Gross Weight</th>
              <th className="px-4 py-2">Net Weight</th>
              <th className="px-4 py-2">Dispatch Date</th>
            </tr>
          </thead>
          <tbody>
            {data.map((row, index) => (
              <tr key={index} className="border-t">
                <td className="px-4 py-2">{row.doNo}</td>
                <td className="px-4 py-2">{row.truck}</td>
                <td className="px-4 py-2">{row.owner}</td>
                <td className="px-4 py-2">{row.driver}</td>
                <td className="px-4 py-2">{row.emptyWeight}</td>
                <td className="px-4 py-2">{row.grossWeight}</td>
                <td className="px-4 py-2">{row.netWeight}</td>
                <td className="px-4 py-2">{row.dispatchDate?.slice(0,10)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    )}
  </div>
  )
}

export default FirstTapaReport


