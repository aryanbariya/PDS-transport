import React, { useState, useEffect, useRef} from "react";
import TruckForm from "./TruckForm";
import $ from "jquery";
import "datatables.net-dt/css/dataTables.dataTables.min.css";
import "datatables.net-dt";
import { formatDate } from "@/util/libs/formatDate";

const URL = import.meta.env.VITE_API_BACK_URL;

const TruckPage = () => {
  const [trucks, setTrucks] = useState([]);
  const [editData, setEditData] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
const tableRef = useRef(null);

  useEffect(() => {
    fetchTrucks();
  }, []);

  useEffect(() => {
    if (trucks.length > 0 && tableRef.current) {
      $(tableRef.current).DataTable();
    }
  }, [trucks]);

  const fetchTrucks = async () => {
    try {
      const response = await fetch(`${URL}/api/truck`);
      if (!response.ok) throw new Error("Failed to fetch data");
      const data = await response.json();
      setTrucks(data);
      setLoading(false);
    } catch (error) {
      setError(error.message);
      setLoading(false);
    }
  };

  const handleSave = () => {
    setShowForm(false);
    setEditData(null);
    fetchTrucks();
  };

  const handleEdit = (truck) => {
    setEditData(truck);
    setShowForm(true);
  };


  const handleDelete = async (uuid) => {
    if (!window.confirm("Are you sure you want to delete this truck?")) return;
    try {
      const response = await fetch(`${URL}/api/truck/${uuid}`, { 
        method: "DELETE" });
      if (response.ok) {
        alert("Truck deleted successfully!");
        fetchTrucks();
      } else {
        alert("Failed to delete Truck.");
      }
    } catch (err) {
      console.error("Error deleting truck:", err);
      alert("Error deleting data.");
    }
  };



  return (
    <div className="flex flex-col h-full w-full p-4 bg-gray-100">
      <div className="bg-blue-600 text-white text-lg font-semibold py-2 px-6 rounded-md w-full">
        Truck Management
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
          <TruckForm onClose={() => setShowForm(false)} onSave={handleSave} editData={editData} />
        </div>
      )}

      {loading && <p>Loading...</p>}
      {error && <p className="text-red-500">{error}</p>}

      <div className="bg-white mt-3 rounded-md shadow-md p-4 overflow-auto flex-1" >
      <table  ref={tableRef} className="display w-full border border-gray-300 bg-white shadow-md rounded-md">
        <thead>
          <tr className="bg-gray-200">
            <th className="border p-2">ID</th>
            <th className="border p-2">Name</th>
            <th className="border p-2">Status</th>
            <th className="border p-2">Empty Weight</th>
            <th className="border p-2">Company</th>
            <th className="border p-2">GVW</th>
            <th className="border p-2">Reg Date</th>
            <th className="border p-2">Owner</th>
            <th className="border p-2">Tax Validity</th>
            <th className="border p-2">Insurance Validity</th>
            <th className="border p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {trucks.length > 0 ? (
            trucks.map((truck) => (
              <tr key={truck.uuid} className="text-center hover:bg-gray-100">
                <td className="border p-2">{truck.order_number}</td>
                <td className="border p-2">{truck.truck_name}</td>
                <td className="border p-2">{truck.truck_status}</td>
                <td className="border p-2">{truck.empty_weight}</td>
                <td className="border p-2">{truck.company}</td>
                <td className="border p-2">{truck.gvw}</td>
                <td className="border p-2">{formatDate(truck.reg_date)}</td>
                <td className="border p-2">{truck.truck_owner_name}</td>
                <td className="border p-2">{formatDate(truck.tax_validity)}</td>
                <td className="border p-2">{formatDate(truck.insurance_validity)}</td>
                <td className="border p-2">
                  <div className="flex justify-center space-x-2">
                    <button
                      onClick={() => handleEdit(truck)}
                      className="bg-blue-500 text-white px-3 py-1 rounded-lg hover:bg-blue-700"
                    >
                      ✏️
                    </button>
                    <button
                      onClick={() => handleDelete(truck.uuid)}
                      className="bg-red-500 text-white px-3 py-1 rounded-lg hover:bg-red-700"
                    >
                      🗑️
                    </button>
                  </div>
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




    </div>
  );
};

export default TruckPage;