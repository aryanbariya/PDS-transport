import React, { useState, useEffect, useRef } from "react";
import GrainForm from "./GrainForm";
import $ from "jquery";
import "datatables.net-dt/css/dataTables.dataTables.min.css";
import "datatables.net-dt";
import { Player } from "@lottiefiles/react-lottie-player";
import loadingAnimation from "@/util/Animation.json";
import Navigation from "@/util/libs/navigation";
import Swal from "sweetalert2";

const URL = import.meta.env.VITE_API_BACK_URL;

const GrainPage = () => {
  const [grains, setGrains] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editData, setEditData] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const tableRef = useRef(null);

  // Fetch grains from backend
  const fetchGrains = async () => {
    try {
      const response = await fetch(`${URL}/api/grains`);
      if (!response.ok) throw new Error("Failed to fetch data");
      const data = await response.json();
      setGrains(data || []);
      setLoading(false);
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchGrains();
  }, []);

  useEffect(() => {
    if (grains.length > 0 && tableRef.current) {
      $(tableRef.current).DataTable();
    }
  }, [grains]);

  // Handle Delete
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
          const response = await fetch(`${URL}/api/grains/${uuid}`, {
            method: "DELETE",
          });
          if (response.ok) {
            Swal.fire("Deleted!", "Grain deleted successfully!", "success");
            fetchGrains();
          } else {
            Swal.fire("Error", "Failed to delete grain.", "error");
          }
        } catch (err) {
          console.error("Error deleting grain:", err);
          Swal.fire("Error", "Error deleting data.", "error");
        }
      }
    });
  };

  // Handle Edit
  const handleEdit = (grain) => {
    setEditData(grain);
    setShowForm(true);
  };

  // Handle Save after Form Submission
  const handleSave = async () => {
    setShowForm(false);
    setEditData(null);
    fetchGrains();
  };

  // Filter Grains by Search Term
  const filteredGrains = grains.filter(
    (g) =>
      g.grainName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      g.godownName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="flex flex-col h-full w-full p-4 bg-gray-100">
      <div className="bg-[#2A3042] text-white text-lg font-semibold py-2 px-6 rounded-md w-full flex justify-between items-center">
        <span><Navigation /></span>
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
          <GrainForm onClose={() => setShowForm(false)} onSave={handleSave} editData={editData} />
        </div>
      )}

      {loading && (
        <div className="flex justify-center items-center h-64">
          <Player autoplay loop src={loadingAnimation} className="w-48 h-48" />
        </div>
      )}

      {error && <p className="text-red-500">{error}</p>}

      {!loading && (
        <div className="bg-white mt-3 rounded-md shadow-md p-4 overflow-auto flex-1">
          <table ref={tableRef} className="display w-full border border-gray-300 bg-white shadow-md rounded-md">
            <thead>
              <tr className="bg-gray-200">
                <th className="border p-2">ID</th>
                <th className="border p-2">Grain Name</th>
                <th className="border p-2">Godown Name</th>
                <th className="border p-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredGrains.length > 0 ? (
                filteredGrains.map((grain) => (
                  <tr key={grain.uuid} className="text-start hover:bg-gray-100">
                    <td className="border p-2">{grain.order_number}</td>
                    <td className="border p-2">{grain.grainName}</td>
                    <td className="border p-2">{grain.godownName}</td>
                    <td className="border p-2 flex justify-start space-x-2">
                      <button
                        onClick={() => handleEdit(grain)}
                        className="bg-blue-500 text-white px-3 py-1 rounded-lg hover:bg-blue-700"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(grain.uuid)}
                        className="bg-red-500 text-white px-3 py-1 rounded-lg hover:bg-red-700"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4" className="text-center p-4">No grains found</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default GrainPage;
