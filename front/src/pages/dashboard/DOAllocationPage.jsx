import React, { useState, useEffect, useRef } from "react";
import { Button } from "@material-tailwind/react";
import $ from "jquery";
import "datatables.net-dt/css/dataTables.dataTables.min.css";
import "datatables.net-dt";
import { Player } from "@lottiefiles/react-lottie-player";
import loadingAnimation from "@/util/Animation.json";
import DOGenerateForm from "./DOGenerateForm";
import Navigation from "@/util/libs/navigation";
import Swal from "sweetalert2";

const URL = import.meta.env.VITE_API_BACK_URL;

const DOAllocationPage = () => {
  const [orders, setOrders] = useState([]);
  const [subGodowns, setSubGodowns] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editData, setEditData] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const tableRef = useRef(null);

  useEffect(() => {
    fetchOrders();
    fetchSubGodowns();
  }, []);
  useEffect(() => {
    if (orders.length > 0 && subGodowns.length > 0 && tableRef.current) {
      $(tableRef.current).DataTable();
    }
  }, [orders, subGodowns]);

  // Fetch Orders Data
  // const fetchOrders = async () => {
  //   try {
  //     const response = await fetch(`${URL}/api/alloc`);
  //     if (!response.ok) throw new Error("Failed to fetch data");
  //     const data = await response.json();
  //     setOrders(data || []);
  //     setLoading(false);
  //   } catch (err) {
  //     setError(err.message);
  //     setLoading(false);
  //   }
  // };
  const fetchOrders = async () => {
    try {
      const response = await fetch(`${URL}/api/alloc`);
      if (!response.ok) throw new Error("Failed to fetch data");

      const data = await response.json();

      // Transform pipeline strings into arrays
      const transformedData = data.map((entry) => {
        return {
          ...entry,
          godown: entry.godown.split("|"),
          vahtuk: entry.vahtuk.split("|"),
          quantity: entry.quantity.split("|")
        };
      });

      setOrders(transformedData || []);
      setLoading(false);
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  // Fetch SubGodown Data
  const fetchSubGodowns = async () => {
    try {
      const response = await fetch(`${URL}/api/dropsubgodown`);
      if (!response.ok) throw new Error("Failed to fetch subgodowns");

      const data = await response.json();
      console.log("Fetched SubGodowns:", data); // Debugging

      if (Array.isArray(data)) {
        setSubGodowns(data.map((sg) => sg.subGodown)); // Fix: Use correct key
      } else {
        console.error("Unexpected subgodown data format:", data);
        setSubGodowns([]);
      }
    } catch (err) {
      console.error("Error fetching subgodowns:", err);
    }
  };



  return (
    <div className="flex flex-col h-full w-full p-4 bg-gray-100">
      <div className="bg-[#2A3042] text-white text-lg font-semibold py-2 px-6 rounded-md w-full flex justify-between items-center">
        <span><Navigation /></span>
        <button
          className="ml-3 bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700"
          onClick={() => setShowForm(!showForm)}
        >
          {showForm ? "Close" : "Add"}
        </button>
      </div>

      {showForm && (
        <div className="mt-3 bg-white p-4 rounded-md shadow-md">
          <DOGenerateForm onClose={() => setShowForm(false)} onSave={fetchOrders} editData={editData} />
        </div>
      )}

      {loading && (
        <div className="flex justify-center items-center h-64">
          <Player autoplay loop src={loadingAnimation} className="w-48 h-48" />
        </div>
      )}

      {error && <p className="text-red-500">{error}</p>}

      {!loading && (
        <div className="bg-white mt-3 w-full rounded-md shadow-md p-4 overflow-auto flex-1">
          <table ref={tableRef} className="display w-full border border-gray-300 bg-white shadow-md rounded-md">
            <thead>
              <tr className="bg-gray-200 text-start">
                <th className="border p-2">Sr. No.</th>
                <th className="border p-2">D.O. No.</th>
                {subGodowns.map((name) => (
                  <th key={name} className="border p-2">{name}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {
                orders.map((entry, index) => (
                  <tr key={entry.do_id} className="text-start hover:bg-gray-100">
                    <td className="border p-2">{index + 1}</td>
                    <td className="border p-2">{entry.do_id}</td>
                    {
                      subGodowns.map((name) => {
                        const godownIndex = entry.godown.findIndex(g => g.trim().toLowerCase() === name.trim().toLowerCase());
                        return (
                          <td key={name} className="border p-2">
                            {
                              godownIndex !== -1 ? (
                                <>
                                  {entry.quantity[godownIndex]}<br />
                                  {entry.vahtuk[godownIndex]}
                                </>
                              ) : ""
                            }
                          </td>
                        );
                      })
                    }
                  </tr>
                ))
              }
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default DOAllocationPage;
