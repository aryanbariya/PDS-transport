import React, { useState, useEffect, useRef } from "react";
import SchemeForm from "./SchemeForm";
import Navigation from "@/util/libs/navigation";
import Swal from "sweetalert2";
import DataTable from "@/components/common/DataTable";

const URL = import.meta.env.VITE_API_BACK_URL;

const SchemePage = () => {
  const [schemes, setSchemes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [editData, setEditData] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const tableRef = useRef(null);

  const [pagination, setPagination] = useState({
    page: 1,
    limit: 10,
    total: 0,
    totalPages: 0
  });

  useEffect(() => {
    fetchSchemes(pagination.page);
  }, [pagination.page]);

  const fetchSchemes = async (page = 1) => {
    setLoading(true);
    try {
      const response = await fetch(`${URL}/api/schemes?page=${page}&limit=${pagination.limit}`);
      if (!response.ok) throw new Error("Failed to fetch scheme");
      const result = await response.json();

      setSchemes(result.data || []);
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
          const response = await fetch(`${URL}/api/schemes/${uuid}`, {
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
          <SchemeForm onClose={() => setShowForm(false)} onSave={handleSave} editData={editData} />
        </div>
      )}

      {error && <p className="text-red-500">{error}</p>}
      <DataTable
        data={schemes}
        pagination={pagination}
        onPageChange={(newPage) => setPagination(prev => ({ ...prev, page: newPage }))}
        columns={[
          {
            key: "scheme_id",
            header: "ID",
            render: (scheme) => scheme.scheme_id
          },
          {
            key: "scheme_name",
            header: "Scheme Name",
            render: (scheme) => scheme.scheme_name
          },
          {
            key: "scheme_status",
            header: "Status",
            render: (scheme) => scheme.scheme_status
          }
        ]}
        loading={loading}
        error={error}
        onEdit={handleEdit}
        onDelete={handleDelete}
        actionType="delete"
        emptyMessage="No records found"
      />

    </div>
  );
};

export default SchemePage;
