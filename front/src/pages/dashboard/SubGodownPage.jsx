import React, { useState, useEffect } from "react";
import SubGodownForm from "./SubGodownForm";

const SubGodownPage = () => {
  const [godowns, setGodowns] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editData, setEditData] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const fetchGodowns = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/subgodown");
      if (!response.ok) throw new Error("Failed to fetch data");
      const data = await response.json();
      setGodowns(data || []);
      setLoading(false);
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchGodowns();
  }, []);

  const handleDelete = async (uuid) => {
    if (!window.confirm("Are you sure you want to delete this godown?")) return;
    try {
      const response = await fetch(`http://localhost:5000/api/subgodown/${uuid}`, {
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

  const filteredGodowns = godowns.filter((g) =>
    g.parentGodown.toLowerCase().includes(searchTerm.toLowerCase()) ||
    g.subGodownName?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="flex flex-col h-full w-full p-4 bg-gray-100">
      <div className="bg-blue-600 text-white text-lg font-semibold py-4 px-6 rounded-md w-full">
        Parent Godown List
      </div>
      <div className="flex justify-between items-center bg-white p-3 mt-2 rounded-md shadow-md">
        <input
          type="text"
          placeholder="Search Parent Godown..."
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
      <table className="w-full border-collapse border border-gray-300 mt-4 bg-white shadow-md rounded-md">
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
          {filteredGodowns.length > 0 ? (
            filteredGodowns.map((g) => (
              <tr key={g.uuid} className="text-center hover:bg-gray-100">
                <td className="border p-2">{g.order_number}</td>
                <td className="border p-2">{g.parentGodown}</td>
                <td className="border p-2">{g.subGodownName || "N/A"}</td>
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
  );
};

export default SubGodownPage;

