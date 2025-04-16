import React, { useState, useEffect, useRef } from "react";
import { Button } from "@material-tailwind/react";
import $ from "jquery";
import "datatables.net-dt/css/dataTables.dataTables.min.css";
import "datatables.net-dt";
import "datatables.net-buttons-dt/css/buttons.dataTables.min.css";
import "datatables.net-buttons-dt";
import { Player } from "@lottiefiles/react-lottie-player";
import loadingAnimation from "@/util/Animation.json";
import DOGenerateForm from "./DOGenerateForm";
import Navigation from "@/util/libs/navigation";
import Swal from "sweetalert2";
import {formatDate} from "@/util/libs/formatDate"; 

const URL = import.meta.env.VITE_API_BACK_URL;

const DOGeneratePage = () => {
  const [orders, setOrders] = useState([]);
  const [godowns, setgodown] = useState([]);
  const [schemes, setSchemes] = useState([]);
  const [grains, setGrains] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editData, setEditData] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const tableRef = useRef(null);

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    if (orders.length > 0 && tableRef.current) {
      $(tableRef.current).DataTable();
    }
  }, [orders]);

  const fetchData = async () => {
    try {
      const [ordersRes, grainsRes, godownRes, schemeRes ] = await Promise.all([
        fetch(`${URL}/api/do`),
        fetch(`${URL}/api/grains`),
        fetch(`${URL}/api/mswcgodown`),
        fetch(`${URL}/api/scheme`)
      ]);

      if (!ordersRes.ok) throw new Error("Failed to fetch orders");
      if (!grainsRes.ok) throw new Error("Failed to fetch grains");
      if (!godownRes.ok) throw new Error("Failed to fetch grains");
      if (!schemeRes.ok) throw new Error("Failed to fetch grains");

      const ordersData = await ordersRes.json();
      const grainsData = await grainsRes.json();
      const godownData = await godownRes.json();
      const schemesData = await schemeRes.json();

      setOrders(ordersData);
      setGrains(grainsData);
      setgodown(godownData);
      setSchemes(schemesData);
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
          const response = await fetch(`${URL}/api/do/${uuid}`, { method: "DELETE" });
          if (response.ok) {
            Swal.fire("Deleted!", "Order deleted successfully!", "success");
            fetchData();
          } else {
            Swal.fire("Error", "Failed to delete order.", "error");
          }
        } catch (err) {
          Swal.fire("Error", "Error deleting data.", "error");
        }
      }
    });
  };

  const getGrainName = (grainId) => {
    const grain = grains.find(g => g.grain_id === grainId);
    return grain ? grain.grainName : "Unknown Grain";
  };
  const getSchemeName = (schemeId) => {
    const scheme = schemes.find(s => String(s.scheme_id) === String(schemeId));
    return scheme ? scheme.scheme_name : "Unknown Scheme";
  }
  const getGodownName = (godownId) => {
    const godown = godowns.find(g => String(g.mswc_id) === String(godownId));
    return godown ? godown.godownName : "Unknown Godown";
  };
  const getGroupUnder = (godownId) => {
    const group = godowns.find(j => String(j.mswc_id) === String(godownId));
    return group ? group.godownUnder : "Unknown";
  };
  

  return (
    <div className="flex flex-col h-full w-full p-4 bg-gray-100">
      <div className="bg-[#2A3042] text-white text-lg font-semibold py-2 px-6 rounded-md w-full flex justify-between items-center">
        <span><Navigation/></span>
        <button
          className="ml-3 bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700"
          onClick={() => setShowForm(!showForm)}
        >
          {showForm ? "Close" : "Add"}
        </button>
      </div>

      {showForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-4xl max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold text-gray-800">
                {editData ? "Edit DO" : "Generate DO"}
              </h2>
              <button
                onClick={() => {
                  setShowForm(false);
                  setEditData(null);
                }}
                className="text-gray-500 hover:text-gray-700"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <DOGenerateForm 
              onClose={() => {
                setShowForm(false);
                setEditData(null);
              }} 
              onSave={() => {
                fetchData();
                setShowForm(false);
                setEditData(null);
              }} 
              editData={editData} 
            />
          </div>
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
              <tr className="bg-gray-200">
                <th className="border p-2 text-left">D.O. No.</th>
                <th className="border p-2 text-left">Base Godown</th>
                <th className="border p-2 text-left">D.O. Date</th>
                <th className="border p-2 text-left">Quota Validity Date</th>
                <th className="border p-2 text-left">Scheme</th>
                <th className="border p-2 text-left">Grain</th>
                <th className="border p-2 text-left">Quantity</th>
                <th className="border p-2 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order.stock_id} className="hover:bg-gray-100">
                  <td className="border p-2 text-left">{order.do_no + ' - ' + getGroupUnder(order.godown_id)}</td>
                  <td className="border p-2 text-left">{getGodownName(order.godown_id)}</td>
                  <td className="border p-2 text-left">{formatDate(order.do_date)}</td>
                  <td className="border p-2 text-left">{formatDate(order.cota)}</td>
                  <td className="border p-2 text-left">{getSchemeName(order.scheme_id)}</td>
                  <td className="border p-2 text-left">{getGrainName(order.grain_id)}</td>
                  <td className="border p-2 text-left">{order.quantity}</td>
                  <td className="border p-2 text-left">
                    <div className="flex justify-start space-x-2">
                      <Button
                        onClick={() => {setEditData(order)
                        setShowForm(true)}
                        }
                        className="bg-blue-500 text-white px-3 py-1 rounded-lg hover:bg-blue-700"
                      >
                        Edit
                      </Button>
                      <Button
                        onClick={() => handleDelete(order.stock_id)}
                        className="bg-red-500 text-white px-3 py-1 rounded-lg hover:bg-red-700"
                      >
                        Delete
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default DOGeneratePage;
