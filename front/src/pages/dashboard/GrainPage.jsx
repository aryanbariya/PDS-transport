import React, { useState, useEffect, useRef } from "react";
import GrainForm from "./GrainForm";
import Navigation from "@/util/libs/navigation";
import Swal from "sweetalert2";
import DataTable from "@/components/common/DataTable";

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
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 10,
    total: 0,
    totalPages: 0
  });

  // Fetch grains from backend
  const fetchGrains = async (page = 1) => {
    try {
      setLoading(true);
      const response = await fetch(`${URL}/api/grains?page=${page}&limit=${pagination.limit}`);
      if (!response.ok) throw new Error("Failed to fetch data");
      const result = await response.json();

      setGrains(result.data || []);
      setPagination(prev => ({
        ...prev,
        page: result.pagination.page,
        total: result.pagination.total,
        totalPages: result.pagination.totalPages
      }));
      setLoading(false);
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchGrains(pagination.page);
  }, [pagination.page]);

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

      {error && <p className="text-red-500">{error}</p>}

      {error && <p className="text-red-500">{error}</p>}

      <DataTable
        data={grains}
        pagination={pagination}
        onPageChange={(newPage) => setPagination(prev => ({ ...prev, page: newPage }))}
        columns={[
          {
            key: "grain_id",
            header: "ID",
            render: (grain) => grain.grain_id
          },
          {
            key: "grainName",
            header: "Grain Name",
            render: (grain) => grain.grainName
          },
          {
            key: "godownName",
            header: "Godown Name",
            render: (grain) => grain.godownName
          }
        ]}
        loading={loading}
        error={error}
        onEdit={handleEdit}
        onDelete={handleDelete}
        actionType="delete"
        emptyMessage="No grains found"
      />
    </div>
  );
};

export default GrainPage;
