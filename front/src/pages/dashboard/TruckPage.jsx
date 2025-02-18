import React, { useEffect, useState } from "react";
import TruckForm from "./TruckForm";
import { formatDate } from "@/util/libs/formatDate";

const TruckPage = () => {
  const [trucks, setTrucks] = useState([]);
  const [loading, setLoading] = useState();
  const [error, setError] = useState(null);
  const [editData, setEditData] = useState(null);
  const [showForm, setShowForm] = useState(false); // To manage visibility of the form
  const [searchTerm, setSearchTerm] = useState("");


  const fetchTrucks = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/truck");
      if (!response.ok) throw new Error("Failed to fetch data");

      const data = await response.json();
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
        alert("Failed to delete Truck.");
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

  const filteredGodowns = trucks.filter((truck) =>
    truck.truck_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    truck.truck_owner_name?.toLowerCase().includes(searchTerm.toLowerCase())
  );




  return (
    <div className="p-4 bg-gray-100 min-h-screen">
      <div className="bg-blue-600 text-white p-4 rounded-md shadow-md">
        <h2 className="text-lg font-semibold">Truck Details</h2>
      </div>
      <div className="mt-4 flex items-center gap-2">
        <input
          type="text"
          placeholder="Search Trucks..."
          className="border p-2 rounded-md w-full"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button
          className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600"
          onClick={() => {
            setEditData(null);
            setShowForm(!showForm);
          }} // Show form when clicking Add
        >
          {showForm ? "Close" : "Add"}
        </button>
      </div>


      {searchTerm && (
        <div className="mt-2 bg-white p-3 rounded-md shadow-md">
          <p className="text-gray-700 font-semibold">Showing results for: "{searchTerm}"</p>
        </div>
      )}


      {showForm && (
        <div className="mt-3 bg-white p-4 rounded-md shadow-md">
          <TruckForm onClose={() => setShowForm(false)} onSave={handleSave} editData={editData} />
        </div>
      )}


      {loading && <p>Loading...</p>}
      {error && <p className="text-red-500">{error}</p>}

      <div className="bg-white p-4 mt-4 rounded-md shadow-md overflow-x-auto">
        <table className="w-full border-collapse border border-gray-300 mt-4 bg-white shadow-md rounded-md">
          <thead>
            <tr className="bg-gray-200">
              <th className="border p-2">ID</th>
              <th className="border p-2">Truck Name</th>
              <th className="border p-2">Status</th>
              <th className="border p-2">Empty Weight</th>
              <th className="border p-2">Company</th>
              <th className="border p-2">GVW</th>
              <th className="border p-2">Reg Date</th>
              <th className="border p-2">Owner Name</th>
              <th className="border p-2">Owner ID</th>
              <th className="border p-2">Tax Validity</th>
              <th className="border p-2">Insurance</th>
              <th className="border p-2">Fitness</th>
              <th className="border p-2">Permit</th>
              <th className="border p-2">Direct Sale</th>
              <th className="border p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredGodowns.length > 0 ? (
              filteredGodowns.map((truck) => (
                <tr key={truck.uuid} className="text-center hover:bg-gray-100">
                  <td className="border p-2">{truck.truck_id}</td>
                  <td className="border p-2">{truck.truck_name}</td>
                  <td className="border p-2">{truck.truck_status}</td>
                  <td className="border p-2">{truck.empty_weight}</td>
                  <td className="border p-2">{truck.company}</td>
                  <td className="border p-2">{truck.gvw}</td>
                  <td className="border p-2">{formatDate(truck.reg_date)}</td>
                  <td className="border p-2">{truck.truck_owner_name}</td>
                  <td className="border p-2">{formatDate(truck.owner_id)}</td>
                  <td className="border p-2">{formatDate(truck.tax_validity)}</td>
                  <td className="border p-2">{formatDate(truck.insurance_validity)}</td>
                  <td className="border p-2">{formatDate(truck.fitness_validity)}</td>
                  <td className="border p-2">{formatDate(truck.permit_validity)}</td>
                  <td className="border p-2">{truck.direct_sale}</td>
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
                <td colSpan="5" className="text-center p-4">No records found</td>
              </tr>
            )}
          </tbody>
        </table>

      </div>



    </div>
  );
};

export default TruckPage;
