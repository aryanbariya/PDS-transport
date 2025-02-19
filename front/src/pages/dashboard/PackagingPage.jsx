import React, { useState, useEffect } from "react";
import PackagingForm from "./PackagingForm";

const PackagingPage = () => {
  const [packagingList, setPackagingList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editData, setEditData] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const fetchPackaging = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/packaging");
      if (!response.ok) throw new Error("Failed to fetch packaging records");
      const data = await response.json();
      setPackagingList(data || []);
      setLoading(false);
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPackaging();
  }, []);

  const handleDelete = async (pack_id) => {
    if (!window.confirm("Are you sure you want to delete this packaging record?")) return;
    try {
      const response = await fetch(`http://localhost:5000/api/packaging/${pack_id}`, {
        method: "DELETE",
      });
      if (response.ok) {
        alert("Packaging record deleted successfully!");
        fetchPackaging();
      } else {
        alert("Failed to delete packaging record.");
      }
    } catch (err) {
      console.error("Error deleting record:", err);
      alert("Error deleting data.");
    }
  };

  const handleEdit = (packaging) => {
    setEditData(packaging);
    setShowForm(true);
  };

  const handleSave = () => {
    setShowForm(false);
    setEditData(null);
    fetchPackaging();
  };

  const filteredPackaging = packagingList.filter((p) =>
    p.material_name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="flex flex-col h-full w-full p-4 bg-gray-100">
      <div className="bg-blue-600 text-white text-lg font-semibold py-4 px-6 rounded-md w-full">
        Packaging List
      </div>

      <div className="flex justify-between items-center bg-white p-3 mt-2 rounded-md shadow-md">
        <input
          type="text"
          placeholder="Search Packaging Material..."
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
          {showForm ? "Close" : "Add Packaging"}
        </button>
      </div>

      {showForm && (
        <div className="mt-3 bg-white p-4 rounded-md shadow-md">
          <PackagingForm onClose={() => setShowForm(false)} onSave={handleSave} editData={editData} />
        </div>
      )}

      {loading && <p>Loading...</p>}
      {error && <p className="text-red-500">{error}</p>}

      <table className="w-full border-collapse border border-gray-300 mt-4 bg-white shadow-md rounded-md">
        <thead>
          <tr className="bg-gray-200">
          <th className="border p-2">ID</th>
            <th className="border p-2">Material Name</th>
            <th className="border p-2">Weight</th>
            <th className="border p-2">Status</th>
            <th className="border p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredPackaging.length > 0 ? (
            filteredPackaging.map((p) => (
              <tr key={p.pack_id} className="text-center hover:bg-gray-100">
                <td className="border p-2">{p.pack_id}</td>
                <td className="border p-2">{p.material_name}</td>
                <td className="border p-2">{p.weight}</td>
                <td className="border p-2">{p.status}</td>
                <td className="border p-2">
                  <div className="flex justify-center space-x-2">
                    <button
                      onClick={() => handleEdit(p)}
                      className="bg-blue-500 text-white px-3 py-1 rounded-lg hover:bg-blue-700"
                    >
                      ✏️
                    </button>
                    <button
                      onClick={() => handleDelete(p.pack_id)}
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
              <td colSpan="4" className="text-center p-4">
                No records found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default PackagingPage;
