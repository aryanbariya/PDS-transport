import React, { useState, useEffect } from "react";
import Navigation from "@/util/libs/navigation";
import DriverForm from "./DriverForm";
import Swal from "sweetalert2";
import DataTable from "@/components/common/DataTable";

const URL = import.meta.env.VITE_API_BACK_URL;

const DriverPage = () => {
  const [drivers, setDrivers] = useState([]);
  const [editData, setEditData] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState("all");
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 10,
    total: 0,
    totalPages: 0
  });



  const fetchDrivers = async (page = 1) => {
    try {
      setLoading(true);
      let endpoint = `${URL}/api/drivers`;
      if (filter === "active") endpoint = `${URL}/api/drivers/active`;
      if (filter === "inactive") endpoint = `${URL}/api/drivers/inactive`;

      const response = await fetch(`${endpoint}?page=${page}&limit=${pagination.limit}`);
      if (!response.ok) throw new Error("Failed to fetch data");

      const result = await response.json();
      setDrivers(result.data || []);
      setPagination(prev => ({
        ...prev,
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
    fetchDrivers(pagination.page);
  }, [filter, pagination.page]);



  const handleSave = () => {
    setShowForm(false);
    setEditData(null);
    fetchDrivers();

  };

  const handleEdit = (driver) => {
    setEditData(driver);
    setShowForm(true);
  };

  const handleDeactivate = async (uuid) => {
    try {
      const response = await fetch(`${URL}/api/drivers/${uuid}`, { method: "DELETE" });
      if (response.ok) {
        Swal.fire("Deactivated!", "Driver deactivated successfully!", "success");
        fetchDrivers();
      } else {
        Swal.fire("Error", "Failed to deactivate driver.", "error");
      }
    } catch (error) {
      console.error("Error deactivating driver:", error);
      Swal.fire("Error", "Error deactivating data.", "error");
    }
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
          <DriverForm onClose={() => setShowForm(false)} onSave={handleSave} editData={editData} />
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
        data={drivers}
        pagination={pagination}
        onPageChange={(newPage) => setPagination(prev => ({ ...prev, page: newPage }))}
        columns={[
          {
            key: "driver_id",
            header: "ID",
            render: (driver) => driver.driver_id
          },
          {
            key: "driver_name",
            header: "Driver Name",
            render: (driver) => driver.driver_name
          },
          {
            key: "aadhar_card_no",
            header: "Aadhar Card No.",
            render: (driver) => driver.aadhar_card_no
          },
          {
            key: "contact",
            header: "Contact",
            render: (driver) => driver.contact
          },
          {
            key: "driving_license_no",
            header: "Driving License No.",
            render: (driver) => driver.driving_license_no
          },
          {
            key: "status",
            header: "Status",
            render: (driver) => driver.status
          }
        ]}
        loading={loading}
        error={error}
        onEdit={handleEdit}
        onDeactivate={handleDeactivate}
        actionType="deactivate"
        actionButtonText="Deactivate"
        emptyMessage="No records found"
        actionColumnClassName="border p-2 flex justify-start space-x-2"
      />

    </div>
  );
};

export default DriverPage;


