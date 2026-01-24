import React, { useState, useEffect, useRef } from "react";
import DOGenerateForm from "./DOGenerateForm";
import Navigation from "@/util/libs/navigation";
import { formatDate } from "@/util/libs/formatDate"
import Swal from "sweetalert2";

const URL = import.meta.env.VITE_API_BACK_URL;

const DOAllocationPage = () => {
  const [orders, setOrders] = useState([]);
  const [subGodowns, setSubGodowns] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editData, setEditData] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [godowns, setgodown] = useState([]);
  const [doop, setdoop] = useState([]);
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 10,
    total: 0,
    totalPages: 0
  });

  useEffect(() => {
    fetchSubGodowns();
    fetchData();
  }, []);

  useEffect(() => {
    fetchOrders(pagination.page);
  }, [pagination.page]);

  const fetchData = async () => {
    try {
      const [doopRes, godownRes] = await Promise.all([
        fetch(`${URL}/api/do?nopagination=true`),
        fetch(`${URL}/api/mswc?nopagination=true`)
      ]);

      if (!doopRes.ok) throw new Error("Failed to fetch orders");
      if (!godownRes.ok) throw new Error("Failed to fetch mswc godowns");

      const doopData = await doopRes.json();
      const godownData = await godownRes.json();

      setdoop(doopData);
      setgodown(godownData);
    } catch (err) {
      console.error("Error fetching lookup data:", err);
    }
  };

  const fetchOrders = async (page = 1) => {
    try {
      setLoading(true);
      const response = await fetch(`${URL}/api/alloc?page=${page}&limit=${pagination.limit}`);
      if (!response.ok) throw new Error("Failed to fetch allocations");

      const result = await response.json();

      // Transform pipeline strings into arrays
      const transformedData = (result.data || []).map((entry) => {
        return {
          ...entry,
          godown: entry.godown.split("|"),
          vahtuk: entry.vahtuk.split("|"),
          quantity: entry.quantity.split("|")
        };
      });

      setOrders(transformedData);
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

  // Fetch SubGodown Data
  const fetchSubGodowns = async () => {
    try {
      const response = await fetch(`${URL}/api/subgodowns?nopagination=true`);
      if (!response.ok) throw new Error("Failed to fetch subgodowns");

      const data = await response.json();
      if (Array.isArray(data)) {
        setSubGodowns(data.map((sg) => sg.subGodown));
      } else {
        setSubGodowns([]);
      }
    } catch (err) {
      console.error("Error fetching subgodowns:", err);
    }
  };

  const getGroupUnder = (godId) => {
    const group = doop.find(j => String(j.do_no) === String(godId));
    if (!group) return "Unknown";
    const down = godowns.find(g => String(g.mswc_id) === String(group.godown_id));
    return down ? down.godownUnder : "Unknown";
  };
  const getcota = (Id) => {
    const nope = doop.find(j => String(j.do_no) === String(Id));
    return nope ? nope.cota : "Unknown";

  };






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
        <div className="mt-3 bg-white p-4 rounded-md shadow-md">
          <DOGenerateForm onClose={() => setShowForm(false)} onSave={fetchOrders} editData={editData} />
        </div>
      )}

      {error && <p className="text-red-500">{error}</p>}

      {!loading && (
        <div className="bg-white mt-3 w-full rounded-md shadow-md p-4 overflow-auto flex-1 flex flex-col">
          <div className="overflow-auto flex-1">
            <table className="display w-full border border-gray-300 bg-white shadow-md rounded-md">
              <thead className="sticky top-0 z-10 bg-white">
                <tr className="bg-gray-200 text-start">
                  <th className="border p-2">Sr. No.</th>
                  <th className="border p-2">D.O. No.</th>
                  {subGodowns.map((name) => (
                    <th key={name} className="border p-2">{name}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {orders.length > 0 ? (
                  orders.map((entry, index) => (
                    <tr key={entry.do_id} className="text-start hover:bg-gray-100">
                      <td className="border p-2">{(pagination.page - 1) * pagination.limit + index + 1}</td>
                      <td className="border p-2">{entry.do_id + ' - ' + getGroupUnder(entry.do_id) + '-' + formatDate(getcota(entry.do_id))}</td>
                      {
                        subGodowns.map((name) => {
                          const godownIndex = entry.godown.findIndex(g => g.trim().toLowerCase() === name.trim().toLowerCase());
                          return (
                            <td key={name} className="border p-2">
                              {
                                godownIndex !== -1 ? (
                                  <>
                                    {entry.quantity[godownIndex]}<br />
                                    {entry.vahtuk[godownIndex]}
                                  </>
                                ) : ""
                              }
                            </td>
                          );
                        })
                      }
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={subGodowns.length + 2} className="text-center p-4">No allocations found</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination Controls */}
          <div className="flex justify-between items-center mt-4 border-t pt-4">
            <div className="text-sm text-gray-700">
              Showing <span className="font-semibold">{(pagination.page - 1) * pagination.limit + 1}</span> to <span className="font-semibold">{Math.min(pagination.page * pagination.limit, pagination.total)}</span> of <span className="font-semibold">{pagination.total}</span> entries
            </div>
            <div className="flex items-center space-x-2">
              <button
                disabled={pagination.page === 1}
                onClick={() => setPagination(prev => ({ ...prev, page: parseInt(prev.page) - 1 }))}
                className={`px-3 py-1 rounded-md border ${pagination.page === 1 ? 'bg-gray-100 text-gray-400 cursor-not-allowed' : 'bg-white text-gray-700 hover:bg-gray-50'}`}
              >
                Previous
              </button>
              <span className="text-sm font-medium">Page {pagination.page} of {pagination.totalPages}</span>
              <button
                disabled={pagination.page === pagination.totalPages}
                onClick={() => setPagination(prev => ({ ...prev, page: parseInt(prev.page) + 1 }))}
                className={`px-3 py-1 rounded-md border ${pagination.page === pagination.totalPages ? 'bg-gray-100 text-gray-400 cursor-not-allowed' : 'bg-white text-gray-700 hover:bg-gray-50'}`}
              >
                Next
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DOAllocationPage;
