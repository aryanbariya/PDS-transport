import React, { useState, useEffect, useRef } from "react";
import TruckForm from "./TruckForm";
import { formatDate } from "@/util/libs/formatDate";
import Navigation from "@/util/libs/navigation";
import Swal from "sweetalert2";
import DataTable from "@/components/common/DataTable";

const URL = import.meta.env.VITE_API_BACK_URL;

const TruckPage = () => {
  const [trucks, setTrucks] = useState([]);
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
  const tableRef = useRef(null);


  const fetchTrucks = async (page = 1) => {
    try {
      setLoading(true);
      let endpoint = `${URL}/api/trucks`;
      if (filter === "active") endpoint = `${URL}/api/trucks/active`;
      if (filter === "inactive") endpoint = `${URL}/api/trucks/inactive`;

      const response = await fetch(`${endpoint}?page=${page}&limit=${pagination.limit}`);
      if (!response.ok) throw new Error("Failed to fetch data");

      const result = await response.json();
      setTrucks(result.data || []);
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
    fetchTrucks(pagination.page);
  }, [filter, pagination.page]);

  // Removed jQuery logic

  const handleSave = () => {
    setShowForm(false);
    setEditData(null);
    fetchTrucks();

  };

  const handleEdit = (driver) => {
    setEditData(driver);
    setShowForm(true);
  };

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
          const response = await fetch(`${URL}/api/trucks/${uuid}`, {
            method: "DELETE"
          });
          if (response.ok) {
            Swal.fire("Deleted!", "Truck deleted successfully!", "success");
            fetchTrucks();
          } else {
            Swal.fire("Error", "Failed to delete Truck.", "error");
          }
        } catch (err) {
          console.error("Error deleting truck:", err);
          Swal.fire("Error", "Error deleting data.", "error");
        }
      }
    });
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
          <TruckForm onClose={() => setShowForm(false)} onSave={handleSave} editData={editData} />
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

      <DataTable
        data={trucks}
        pagination={pagination}
        onPageChange={(newPage) => setPagination(prev => ({ ...prev, page: newPage }))}
        columns={[
          { key: "truck_id", header: "ID" },
          { key: "truck_name", header: "Truck No." },
          { key: "truck_status", header: "Status" },
          { key: "empty_weight", header: "Empty Weight" },
          { key: "company", header: "Company" },
          { key: "gvw", header: "GVW" },
          {
            key: "reg_date",
            header: "Reg Date",
            render: (t) => t.reg_date ? formatDate(t.reg_date) : "No Date Provided"
          },
          { key: "truck_owner_name", header: "Owner" },
          {
            key: "tax_validity",
            header: "Tax Validity",
            render: (t) => t.tax_validity ? formatDate(t.tax_validity) : "No Date Provided"
          },
          {
            key: "insurance_validity",
            header: "Insurance Validity",
            render: (t) => t.insurance_validity ? formatDate(t.insurance_validity) : "No Date Provided"
          }
        ]}
        loading={loading}
        error={error}
        onEdit={handleEdit}
        onDeactivate={handleDelete}
        actionType="deactivate"
        emptyMessage="No records found"
      />
    </div>
  );
};

export default TruckPage;
