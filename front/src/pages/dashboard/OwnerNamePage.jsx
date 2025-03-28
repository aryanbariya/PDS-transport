import React, { useState, useEffect, useRef } from "react";
import { Button } from "@material-tailwind/react";
import $ from "jquery";
import "datatables.net-dt/css/dataTables.dataTables.min.css";
import "datatables.net-dt";
import "datatables.net-buttons-dt/css/buttons.dataTables.min.css";
import "datatables.net-buttons-dt";
import { Player } from "@lottiefiles/react-lottie-player";
import truckLoader from "@/util/Animation.json";
import OwnerNameForm from "./OwnerNameForm";
import Navigation from "@/util/libs/navigation";
import Swal from "sweetalert2"; // Import SweetAlert2

const URL = import.meta.env.VITE_API_BACK_URL;

const OwnerNamePage = () => {
  const [owners, setOwners] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editData, setEditData] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [selectedOwner, setSelectedOwner] = useState(null);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768); // Track mobile screen size
  const tableRef = useRef(null);

  useEffect(() => {
    fetchOwners();
  }, []);

  useEffect(() => {
    if (owners.length > 0 && tableRef.current) {
      $(tableRef.current).DataTable();
    }
  }, [owners]);


  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

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
          const response = await fetch(`${URL}/api/owners/${uuid}`, {
            method: "DELETE",
          });
          if (response.ok) {
            Swal.fire("Deleted!", "Owner deleted successfully!", "success");
            fetchOwners();
          } else {
            Swal.fire("Error", "Failed to delete owner.", "error");
          }
        } catch (err) {
          console.error("Error deleting owner:", err);
          Swal.fire("Error", "Error deleting data.", "error");
        }
      }
    });
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
          <OwnerNameForm onClose={() => setShowForm(false)} onSave={fetchOwners} editData={editData} />
        </div>
      )}

      {loading && (
        <div className="flex justify-center items-center h-64">
          <Player autoplay loop src={truckLoader} className="w-48 h-48" />
        </div>
      )}

      {error && <p className="text-red-500">{error}</p>}

      {!loading && (
        <div className="bg-white mt-3 w-full rounded-md shadow-md p-4 overflow-auto flex-1">
          <table ref={tableRef} className="display w-full border border-gray-300 bg-white shadow-md rounded-md">
            <thead>
              <tr className="bg-gray-200 text-start">
                <th className="border p-2">ID</th>
                <th className="border p-2">Owner Name</th>
                {!isMobile && <th className="border p-2">Contact</th>}
                {!isMobile && <th className="border p-2">Address</th>}
                {!isMobile && <th className="border p-2">Email</th>}
                {isMobile ? <th className="border p-2">More Info</th> : <th className="border p-2">Actions</th>}
              </tr>
            </thead>
            <tbody>
              {owners.map((o) => (
                <tr key={o.uuid} className="text-start hover:bg-gray-100">
                  <td className="border p-2">{o.order_number}</td>
                  <td className="border p-2">{o.ownerName}</td>
                  {!isMobile && <td className="border p-2">{o.contact}</td>}
                  {!isMobile && <td className="border p-2">{o.address}</td>}
                  {!isMobile && <td className="border p-2">{o.emailID}</td>}
                  {isMobile ? (
                    <td className="border p-2">
                      <button
                        className="bg-blue-500 text-white px-3 py-1 rounded-lg hover:bg-blue-700"
                        onClick={() => setSelectedOwner(o)}
                      >
                        More Info
                      </button>
                    </td>
                  ) : (
                    <td className="border p-2 flex justify-center space-x-2">
                      <Button
                        onClick={() => handleEdit(o)}
                        className="bg-blue-500 text-white px-3 py-1 rounded-lg hover:bg-blue-700"
                      >
                        Edit
                      </Button>
                      <button
                        onClick={() => handleDelete(o.uuid)}
                        className="bg-red-500 text-white px-3 py-1 rounded-lg hover:bg-red-700"
                      >
                        Delete
                      </button>
                    </td>
                  )}

                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Mobile Pop-up Modal */}
      {isMobile && selectedOwner && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h2 className="text-xl font-semibold mb-3">Owner Details</h2>
            <p><strong>ID:</strong> {selectedOwner.order_number}</p>
            <p><strong>Name:</strong> {selectedOwner.ownerName}</p>
            <p><strong>Contact:</strong> {selectedOwner.contact}</p>
            <p><strong>Address:</strong> {selectedOwner.address}</p>
            <p><strong>Email:</strong> {selectedOwner.emailID}</p>

            <div className="mt-4 flex justify-start space-x-2">
              <button
              
                onClick={() => handleEdit(selectedOwner)}
                className="bg-blue-500 text-white px-3 py-1 rounded-lg hover:bg-blue-700"
              >
                Edit
              </button>
              <button
                onClick={() => setSelectedOwner(null)}
                className="bg-gray-500 text-white px-3 py-1 rounded-lg hover:bg-gray-700 "
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default OwnerNamePage;
