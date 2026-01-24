import React, { useState, useEffect, useRef } from "react";
import PackagingForm from "./PackagingForm";
import Navigation from "@/util/libs/navigation";
import Swal from "sweetalert2";
import DataTable from "@/components/common/DataTable";

const URL = import.meta.env.VITE_API_BACK_URL;

const PackagingPage = () => {
  const [packagingList, setPackagingList] = useState([]);
  const [loading, setLoading] = useState(true);
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
    fetchPackaging(pagination.page);
  }, [pagination.page]);

  const fetchPackaging = async (page = 1) => {
    setLoading(true);
    try {
      const response = await fetch(`${URL}/api/packaging?page=${page}&limit=${pagination.limit}`);
      if (!response.ok) throw new Error("Failed to fetch packaging records");
      const result = await response.json();

      setPackagingList(result.data || []);
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
          const response = await fetch(`${URL}/api/packaging/${uuid}`, {
            method: "DELETE",
          });
          if (response.ok) {
            Swal.fire("Deleted!", "Packaging record deleted successfully!", "success");
            fetchPackaging();
          } else {
            Swal.fire("Error", "Failed to delete packaging record.", "error");
          }
        } catch (err) {
          console.error("Error deleting record:", err);
          Swal.fire("Error", "Error deleting data.", "error");
        }
      }
    });
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
          <PackagingForm onClose={() => setShowForm(false)} onSave={handleSave} editData={editData} />
        </div>
      )}

      {error && <p className="text-red-500">{error}</p>}
      <DataTable
        data={packagingList}
        pagination={pagination}
        onPageChange={(newPage) => setPagination(prev => ({ ...prev, page: newPage }))}
        columns={[
          {
            key: "pack_id",
            header: "ID",
            render: (p) => p.pack_id
          },
          {
            key: "material_name",
            header: "Material Name",
            render: (p) => p.material_name
          },
          {
            key: "weight",
            header: "Weight",
            render: (p) => p.weight
          },
          {
            key: "status",
            header: "Status",
            render: (p) => p.status
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

export default PackagingPage;
