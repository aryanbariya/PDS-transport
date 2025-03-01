import React, { useState, useEffect, useRef } from "react";
import $ from "jquery";
import "datatables.net-dt/css/dataTables.dataTables.min.css";
import "datatables.net-dt";
import SubGodownForm from "./SubGodownForm";

const URL = import.meta.env.VITE_API_BACK_URL;

const SubGodownPage = () => {
  const [godowns, setGodowns] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editData, setEditData] = useState(null);
  const [showForm, setShowForm] = useState(false);
 const tableRef = useRef(null);

 useEffect(() => {
  fetchGodowns();
}, []);

useEffect(() => {
  if (godowns.length > 0 && tableRef.current) {
    $(tableRef.current).DataTable();
    
  }
}, [godowns]);

  const fetchGodowns = async () => {
    try {
      const response = await fetch(`${URL}/api/subgodown`);
      if (!response.ok) throw new Error("Failed to fetch data");
      const data = await response.json();
      setGodowns(data || []);
      setLoading(false);
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };


  const handleDelete = async (uuid) => {
    if (!window.confirm("Are you sure you want to delete this godown?")) return;
    try {
      const response = await fetch(`${URL}/api/subgodown/${uuid}`, {
        method: "DELETE",
      });
      if (response.ok) {
        alert("Godown deleted successfully!");
        fetchGodowns();
      } else {
        alert("Failed to delete godown.");
      }
    } catch (err) {
      console.error("Error deleting godown:", err);
      alert("Error deleting data.");
    }
  };

  const handleEdit = (godown) => {
    setEditData(godown);
    setShowForm(true);
  };

  const handleSave = async () => {
    setShowForm(false);
    setEditData(null);
    fetchGodowns();
  };

  return (
    <div className="flex flex-col h-full w-full p-4 bg-gray-100">
      <div className="bg-blue-600 text-white text-lg font-semibold py-4 px-6 rounded-md w-full">
        Sub Godown List
      </div>
      <div className="flex justify-between items-center bg-white p-3 mt-2 rounded-md shadow-md">
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
          <SubGodownForm onClose={() => setShowForm(false)} onSave={handleSave} editData={editData} />
        </div>
      )}

      {loading && <p>Loading...</p>}
      {error && <p className="text-red-500">{error}</p>}

      <div className="overflow-x-auto mt-4">
      <table ref={tableRef} className="w-full border-collapse border border-gray-300 mt-4 bg-white shadow-md rounded-md">
        <thead>
          <tr className="bg-gray-200">
            <th className="border p-2">ID</th>
            <th className="border p-2">Parent Godown</th>
            <th className="border p-2">Sub Godown Name</th>
            <th className="border p-2">Status</th>
            <th className="border p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {godowns.length > 0 ? (
            godowns.map((g) => (
              <tr key={g.uuid} className="text-center hover:bg-gray-100">
                <td className="border p-2">{g.order_number}</td>
                <td className="border p-2">{g.parentGodown}</td>
                <td className="border p-2">{g.subGodown || "N/A"}</td>
                <td className="border p-2">{g.status || "N/A"}</td>
                <td className="border p-2">
                  <div className="flex justify-center space-x-2">
                    <button onClick={() => handleEdit(g)} className="bg-blue-500 text-white px-3 py-1 rounded-lg hover:bg-blue-700">
                      ✏️
                    </button>
                    <button onClick={() => handleDelete(g.uuid)} className="bg-red-500 text-white px-3 py-1 rounded-lg hover:bg-red-700">
                      🗑️
                    </button>
                  </div>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5" className="text-center p-4">No records found</td>
            </tr>
          )}
        </tbody>
      </table>

      </div>

    </div>
  );
};

export default SubGodownPage;
