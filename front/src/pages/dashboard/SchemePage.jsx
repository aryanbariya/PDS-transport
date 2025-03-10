import React, { useState, useEffect, useRef } from "react";
import SchemeForm from "./SchemeForm";
import $ from "jquery";
import "datatables.net-dt/css/dataTables.dataTables.min.css";
import "datatables.net-dt";
import { Player } from "@lottiefiles/react-lottie-player";
import truckLoader from "@/util/Animation.json";
import Navigation from "@/util/libs/navigation";
import Swal from "sweetalert2"; // Import SweetAlert2

const URL = import.meta.env.VITE_API_BACK_URL;

const SchemePage = () => {
  const [schemes, setSchemes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [editData, setEditData] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const tableRef = useRef(null);

  useEffect(() => {
    fetchSchemes();
  }, []);

  useEffect(() => {
    if (schemes.length > 0 && tableRef.current) {
      $(tableRef.current).DataTable();
    }
  }, [schemes]);

  const fetchSchemes = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${URL}/api/scheme`);
      if (!response.ok) throw new Error("Failed to fetch scheme");
      const data = await response.json();
      setSchemes(data);
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
          const response = await fetch(`${URL}/api/scheme/${uuid}`, {
            method: "DELETE",
          });
          if (response.ok) {
            Swal.fire("Deleted!", "Scheme deleted successfully!", "success");
            fetchSchemes();
          } else {
            Swal.fire("Error", "Failed to delete scheme.", "error");
          }
        } catch (err) {
          console.error("Error deleting scheme:", err);
          Swal.fire("Error", "Error deleting scheme.", "error");
        }
      }
    });
  };

  const handleEdit = (scheme) => {
    setEditData(scheme);
    setShowForm(true);
  };

  const handleSave = async () => {
    setShowForm(false);
    setEditData(null);
    fetchSchemes();
  };

  return (
    <div className="flex flex-col h-full w-full p-4 bg-gray-100">
      <div className="bg-[#2A3042] text-white text-lg font-semibold py-2 px-6 rounded-md w-full flex justify-between items-center">
        <span><Navigation/></span>
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
          <SchemeForm onClose={() => setShowForm(false)} onSave={handleSave} editData={editData} />
        </div>
      )}

      {loading && <div className="flex justify-center items-center h-64">
        <Player autoplay loop src={truckLoader} className="w-48 h-48" />
      </div>}
      {error && <p className="text-red-500">{error}</p>}
      {!loading && (
        <div className="bg-white mt-3 rounded-md shadow-md p-4 overflow-auto flex-1">
          <table ref={tableRef} className="display w-full border border-gray-300 bg-white shadow-md rounded-md">
            <thead>
              <tr className="bg-gray-200">
                <th className="border p-2">ID</th>
                <th className="border p-2">Scheme Name</th>
                <th className="border p-2">Status</th>
                <th className="border p-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {schemes.length > 0 ? (
                schemes.map((scheme) => (
                  <tr key={scheme.uuid} className="text-start hover:bg-gray-100">
                    <td className="border p-2">{scheme.order_number}</td>
                    <td className="border p-2">{scheme.scheme_name}</td>
                    <td className="border p-2">{scheme.scheme_status}</td>
                    <td className="border p-2">
                      <div className="flex justify-start space-x-2">
                        <button
                          onClick={() => handleEdit(scheme)}
                          className="bg-blue-500 text-white px-3 py-1 rounded-lg hover:bg-blue-700"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete(scheme.uuid)}
                          className="bg-red-500 text-white px-3 py-1 rounded-lg hover:bg-red-700"
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4" className="text-center p-4">No records found</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>)}

    </div>
  );
};

export default SchemePage;
