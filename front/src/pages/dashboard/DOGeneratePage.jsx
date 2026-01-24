import React, { useState, useEffect, useRef } from "react";
import DOGenerateForm from "./DOGenerateForm";
import Navigation from "@/util/libs/navigation";
import Swal from "sweetalert2";
import DataTable from "@/components/common/DataTable";
import { formatDate } from "@/util/libs/formatDate";

const URL = import.meta.env.VITE_API_BACK_URL;

const DOGeneratePage = () => {
  const [orders, setOrders] = useState([]);
  const [godowns, setgodown] = useState([]);
  const [schemes, setSchemes] = useState([]);
  const [grains, setGrains] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editData, setEditData] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 10,
    total: 0,
    totalPages: 0
  });

  useEffect(() => {
    fetchLookups();
  }, []);

  useEffect(() => {
    fetchOrders(pagination.page);
  }, [pagination.page]);

  // DataTable will handle its own re-initialization


  const fetchLookups = async () => {
    try {
      const [grainsRes, godownRes, schemeRes] = await Promise.all([
        fetch(`${URL}/api/grains?nopagination=true`),
        fetch(`${URL}/api/mswc?nopagination=true`),
        fetch(`${URL}/api/schemes?nopagination=true`)
      ]);

      const grainsData = await grainsRes.json();
      const godownData = await godownRes.json();
      const schemesData = await schemeRes.json();

      setGrains(grainsData);
      setgodown(godownData);
      setSchemes(schemesData);
    } catch (err) {
      console.error("Error fetching lookups:", err);
    }
  };

  const fetchOrders = async (page = 1) => {
    try {
      setLoading(true);
      const ordersRes = await fetch(`${URL}/api/do?page=${page}&limit=${pagination.limit}`);
      if (!ordersRes.ok) throw new Error("Failed to fetch orders");

      const result = await ordersRes.json();
      setOrders(result.data || []);
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
  console.log("gogo", godowns);

  const handleEdit = async (doNo) => {
    try {
      const response = await fetch(`${URL}/api/do/${doNo}`);
      if (!response.ok) throw new Error("Failed to fetch DO data");

      const data = await response.json();
      setEditData(data); // Includes both the main DO data and the entries array
      setShowForm(true);
    } catch (err) {
      console.error("Error fetching DO data:", err);
      Swal.fire({
        icon: "error",
        title: "Error!",
        text: "Failed to load DO data for editing.",
      });
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
          const response = await fetch(`${URL}/api/do/${uuid}`, { method: "DELETE" });
          if (response.ok) {
            Swal.fire("Deleted!", "Order deleted successfully!", "success");
            fetchOrders();
          } else {
            Swal.fire("Error", "Failed to delete order.", "error");
          }
        } catch (err) {
          Swal.fire("Error", "Error deleting data.", "error");
        }
      }
    });
  };

  const getGrainName = (grainId) => {
    const grain = grains.find(g => g.grain_id === grainId);
    return grain ? grain.grainName : "Unknown Grain";
  };
  const getSchemeName = (schemeId) => {
    const scheme = schemes.find(s => String(s.scheme_id) === String(schemeId));
    return scheme ? scheme.scheme_name : "Unknown Scheme";
  }
  const getGodownName = (godownId) => {
    const godown = godowns.find(g => String(g.mswc_id) === String(godownId));
    return godown ? godown.godownName : "Unknown Godown";
  };
  const getGroupUnder = (godownId) => {
    const group = godowns.find(j => String(j.mswc_id) === String(godownId));
    return group ? group.godownUnder : "Unknown";
  };
  console.log("order", orders);

  return (
    <div className="flex flex-col h-full w-full p-4 bg-gray-100">
      <div className="bg-[#2A3042] text-white text-lg font-semibold py-2 px-6 rounded-md w-full flex justify-between items-center">
        <span><Navigation /></span>
        <button
          className="ml-3 bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700"
          onClick={() => setShowForm(!showForm)}
        >
          {showForm ? "Close" : "Add"}
        </button>
      </div>

      {showForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-4xl max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold text-gray-800">
                {editData ? "Edit DO" : "Generate DO"}
              </h2>
              <button
                onClick={() => {
                  setShowForm(false);
                  setEditData(null);
                }}
                className="text-gray-500 hover:text-gray-700"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <DOGenerateForm
              onClose={() => {
                setShowForm(false);
                setEditData(null);
              }}
              onSave={() => {
                fetchOrders();
                setShowForm(false);
                setEditData(null);
              }}
              editData={editData}
            />
          </div>
        </div>
      )}

      {error && <p className="text-red-500">{error}</p>}

      <DataTable
        data={orders}
        pagination={pagination}
        onPageChange={(newPage) => setPagination(prev => ({ ...prev, page: newPage }))}
        columns={[
          {
            key: "do_no",
            header: "D.O. No.",
            render: (order) => `${order.do_no} - ${getGroupUnder(order.godown_id)}`
          },
          {
            key: "godown_id",
            header: "Base Godown",
            render: (order) => getGodownName(order.godown_id)
          },
          {
            key: "do_date",
            header: "D.O. Date",
            render: (order) => formatDate(order.do_date)
          },
          {
            key: "cota",
            header: "Quota Validity Date",
            render: (order) => formatDate(order.cota)
          },
          {
            key: "scheme_id",
            header: "Scheme",
            render: (order) => getSchemeName(order.scheme_id)
          },
          {
            key: "grain_id",
            header: "Grain",
            render: (order) => getGrainName(order.grain_id)
          },
          {
            key: "quantity",
            header: "Quantity"
          }
        ]}
        loading={loading}
        error={error}
        onEdit={handleEdit}
        onDelete={handleDelete}
        actionType="delete"
        customActions={(order) => (
          <button className="text-light-blue-500 hover:text-blue-700 font-medium px-2 py-1">
            Allocation
          </button>
        )}
        emptyMessage="No orders found"
      />
    </div>
  );
};

export default DOGeneratePage;
