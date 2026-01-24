import React, { useState, useEffect, useRef } from "react";
import Navigation from "@/util/libs/navigation";
import Swal from "sweetalert2";
import DataTable from "@/components/common/DataTable";

const URL = import.meta.env.VITE_API_BACK_URL;

const SubGodownPage = () => {
  const [godowns, setGodowns] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editData, setEditData] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [filter, setFilter] = useState("all");
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 10,
    total: 0,
    totalPages: 0
  });

  // Fetch sub-godown data
  const fetchGodowns = async (page = 1) => {
    try {
      setLoading(true);
      let endpoint = `${URL}/api/subgodowns`;
      if (filter === "active") endpoint = `${URL}/api/subgodowns/active`;
      if (filter === "inactive") endpoint = `${URL}/api/subgodowns/inactive`;

      const response = await fetch(`${endpoint}?page=${page}&limit=${pagination.limit}`);
      if (!response.ok) throw new Error("Failed to fetch data");

      const result = await response.json();
      setGodowns(result.data || []);
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

  // Fetch data when filter or page changes
  useEffect(() => {
    fetchGodowns(pagination.page);
  }, [filter, pagination.page]);

  // Handle delete (deactivate godown)
  const handleDelete = async (uuid) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, deactivate it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const response = await fetch(`${URL}/api/subgodowns/${uuid}`, {
            method: "DELETE",
          });
          if (response.ok) {
            Swal.fire("Deactivated!", "Sub Godown deactivated successfully!", "success");
            fetchGodowns();
          } else {
            Swal.fire("Error", "Failed to deactivate sub godown.", "error");
          }
        } catch (err) {
          console.error("Error deactivating sub godown:", err);
          Swal.fire("Error", "Error deactivating data.", "error");
        }
      }
    });
  };

  // Handle edit
  const handleEdit = (godown) => {
    setEditData(godown);
    setShowForm(true);
  };

  // Handle save after adding/editing a godown
  const handleSave = async () => {
    setShowForm(false);
    setEditData(null);
    fetchGodowns();
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
          <SubGodownForm onClose={() => setShowForm(false)} onSave={handleSave} editData={editData} />
        </div>
      )}

      {/* Filter Dropdown */}
      <div className="my-4">
        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="px-2 py-2 border border-gray-300 rounded-md bg-white shadow-md focus:outline-none"
        >
          <option value="all">All</option>
          <option value="active">Active</option>
          <option value="inactive">Inactive</option>
        </select>
      </div>

      {error && <p className="text-red-500">{error}</p>}

      <DataTable
        data={godowns}
        pagination={pagination}
        onPageChange={(newPage) => setPagination(prev => ({ ...prev, page: newPage }))}
        columns={[
          {
            key: "subgodown_id",
            header: "ID",
            render: (g) => g.subgodown_id
          },
          {
            key: "parentGodown",
            header: "MSWC Godown",
            render: (g) => g.parentGodown
          },
          {
            key: "subGodown",
            header: "Sub Godown Name",
            render: (g) => g.subGodown
          },
          {
            key: "status",
            header: "Status",
            render: (g) => g.status
          }
        ]}
        loading={loading}
        error={error}
        onEdit={handleEdit}
        onDeactivate={handleDelete}
        actionType="deactivate"
        emptyMessage="No records found"
        actionColumnClassName="border p-2 flex justify-center space-x-2"
      />
    </div>
  );
};

export default SubGodownPage;

