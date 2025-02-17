import React, { useState, useEffect } from "react";
import TruckForm from "./TruckForm";

const TruckPage = () => {
  const [trucks, setTrucks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editData, setEditData] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const fetchTrucks = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/truck");
      if (!response.ok) throw new Error("Failed to fetch trucks");
      const data = await response.json();
      console.log('fafad',data)
      setTrucks(data || []);
      setLoading(false);
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTrucks();
  }, []);

  const handleDelete = async (uuid) => {
    if (!window.confirm("Are you sure you want to delete this truck?")) return;
    try {
      const response = await fetch(`http://localhost:5000/api/truck/${uuid}`, {
        method: "DELETE",
      });
      if (response.ok) {
        alert("Truck deleted successfully!");
        fetchTrucks();
      } else {
        alert("Failed to delete truck.");
      }
    } catch (err) {
      console.error("Error deleting truck:", err);
      alert("Error deleting data.");
    }
  };

  const handleEdit = (truck) => {
    setEditData(truck);
    setShowForm(true);
  };

  const handleSave = async () => {
    setShowForm(false);
    setEditData(null);
    fetchTrucks();
  };

  const filteredTrucks = trucks.filter(
    (t) => t.truckNo.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="flex flex-col h-full w-full p-4 bg-gray-100">
      <div className="bg-blue-600 text-white text-lg font-semibold py-4 px-6 rounded-md w-full">
        Truck List
      </div>

      <div className="flex justify-between items-center bg-white p-3 mt-2 rounded-md shadow-md">
        <input
          type="text"
          placeholder="Search Truck..."
          className="border p-2 rounded-md w-full max-w-lg"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button
          className="ml-3 bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700"
          onClick={() => {
            setEditData(null);
            setShowForm(!showForm);
          }}
        >
          {showForm ? "Close" : "Add Truck"}
        </button>
      </div>

      {showForm && (
        <div className="mt-3 bg-white p-4 rounded-md shadow-md">
          <TruckForm onClose={() => setShowForm(false)} onSave={handleSave} editData={editData} />
        </div>
      )}

      {loading && <p>Loading...</p>}
      {error && <p className="text-red-500">{error}</p>}

      <table className="w-full border-collapse border border-gray-300 mt-4 bg-white shadow-md rounded-md">
        <thead>
          <tr className="bg-gray-200">
            <th className="border p-2">Truck No</th>
            <th className="border p-2">Company</th>
            <th className="border p-2">GVW</th>
            <th className="border p-2">Owner</th>
            <th className="border p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredTrucks.length > 0 ? (
            filteredTrucks.map((t) => (
              <tr key={t.uuid} className="text-center hover:bg-gray-100">
                <td className="border p-2">{t.truckNo}</td>
                <td className="border p-2">{t.company}</td>
                <td className="border p-2">{t.gvw}</td>
                <td className="border p-2">{t.owner}</td>
                <td className="border p-2">
                  <div className="flex justify-center space-x-2">
                    <button onClick={() => handleEdit(t)} className="bg-blue-500 text-white px-3 py-1 rounded-lg hover:bg-blue-700">
                      ✏️
                    </button>
                    <button onClick={() => handleDelete(t.uuid)} className="bg-red-500 text-white px-3 py-1 rounded-lg hover:bg-red-700">
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
  );
};

export default TruckPage;