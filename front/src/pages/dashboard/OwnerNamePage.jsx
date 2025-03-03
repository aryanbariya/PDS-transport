import React, { useState, useEffect, useRef } from "react";
import $ from "jquery";
import "datatables.net-dt/css/dataTables.dataTables.min.css";
import "datatables.net-dt";
import { Player } from "@lottiefiles/react-lottie-player";
import truckLoader from "@/util/Animation.json"; // ✅ Import JSON animation
import OwnerNameForm from "./OwnerNameForm";

const URL = import.meta.env.VITE_API_BACK_URL;

const OwnerNamePage = () => {
  const [owners, setOwners] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editData, setEditData] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const tableRef = useRef(null);


  useEffect(() => {
    fetchOwners();
  }, []);

  useEffect(() => {
    if (owners.length > 0 && tableRef.current) {
      $(tableRef.current).DataTable();
    }
  }, [owners]);


  const fetchOwners = async () => {
    try {
      const response = await fetch(`${URL}/api/owners`);
      if (!response.ok) throw new Error("Failed to fetch data");
      const data = await response.json();
      setOwners(data || []);
      setLoading(false);
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  const handleDelete = async (uuid) => {
    if (!window.confirm("Are you sure you want to delete this owner?")) return;
    try {
      const response = await fetch(`${URL}/api/owners/${uuid}`, {
        method: "DELETE",
      });
      if (response.ok) {
        alert("Owner deleted successfully!");
        fetchOwners();
      } else {
        alert("Failed to delete owner.");
      }
    } catch (err) {
      console.error("Error deleting owner:", err);
      alert("Error deleting data.");
    }
  };

  const handleEdit = (owner) => {
    setEditData(owner);
    setShowForm(true);
  };

  const handleSave = () => {
    setShowForm(false);
    setEditData(null);
    fetchOwners();
  };

  return (
    <div className="flex flex-col h-full w-full p-4 bg-gray-100">
      <div className="bg-blue-600 text-white text-lg font-semibold py-2 px-6 rounded-md w-full">
        Owner List
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
          <OwnerNameForm onClose={() => setShowForm(false)} onSave={handleSave} editData={editData} />
        </div>
      )}

      {loading && (
        <div className="flex justify-center items-center h-64">
          <Player autoplay loop src={truckLoader} className="w-48 h-48" />
        </div>
      )}

      {/* {loading && <p>Loading...</p>} */}
      {error && <p className="text-red-500">{error}</p>}
      {!loading && (
        <div className="bg-white mt-3 rounded-md shadow-md p-4 overflow-auto flex-1">
          <table ref={tableRef} className="display w-full border border-gray-300 bg-white shadow-md rounded-md">
            <thead>
              <tr className="bg-gray-200 text-center">
                <th className="border p-2">ID</th>
                <th className="border p-2">Owner Name</th>
                <th className="border p-2">Contact</th>
                <th className="border p-2">Address</th>
                <th className="border p-2">Email ID</th>
                <th className="border p-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {owners.map((o) => (
                <tr key={o.uuid} className="text-center hover:bg-gray-100">
                  <td className="border p-2">{o.order_number}</td>
                  <td className="border p-2">{o.ownerName}</td>
                  <td className="border p-2">{o.contact}</td>
                  <td className="border p-2">{o.address}</td>
                  <td className="border p-2">{o.emailID}</td>
                  <td className="border p-2">
                    <div className="flex justify-center space-x-2">
                      <button onClick={() => handleEdit(o)} className="bg-blue-500 text-white px-3 py-1 rounded-lg hover:bg-blue-700">
                        ✏️
                      </button>
                      <button onClick={() => handleDelete(o.uuid)} className="bg-red-500 text-white px-3 py-1 rounded-lg hover:bg-red-700">
                        🗑️
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>)}
    </div>
  );
};

export default OwnerNamePage;
