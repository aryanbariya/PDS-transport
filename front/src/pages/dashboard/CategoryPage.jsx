import React, { useState, useEffect, useRef } from "react";
import CategoryForm from "./CategoryForm";
import Navigation from "@/util/libs/navigation";
import Swal from "sweetalert2";
import DataTable from "@/components/common/DataTable";

const URL = import.meta.env.VITE_API_BACK_URL;

const CategoryPage = () => {
  const [categories, setCategories] = useState([]);
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
    fetchCategories(pagination.page);
  }, [pagination.page]);

  const fetchCategories = async (page = 1) => {
    setLoading(true);
    try {
      const response = await fetch(`${URL}/api/categories?page=${page}&limit=${pagination.limit}`);
      if (!response.ok) throw new Error("Failed to fetch categories");

      const result = await response.json();
      setCategories(result.data || []);
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

  const handleDelete = async (id) => {
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
          const response = await fetch(`${URL}/api/categories/${id}`, { method: "DELETE" });
          if (response.ok) {
            Swal.fire("Deleted!", "Category deleted successfully!", "success");
            fetchCategories();
          } else {
            Swal.fire("Error", "Failed to delete category.", "error");
          }
        } catch (err) {
          console.error("Error deleting record:", err);
          Swal.fire("Error", "Error deleting data.", "error");
        }
      }
    });
  };

  const handleEdit = (category) => {
    setEditData(category);
    setShowForm(true);
  };

  const handleSave = () => {
    setShowForm(false);
    setEditData(null);
    fetchCategories();
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
          <CategoryForm onClose={() => setShowForm(false)} onSave={handleSave} editData={editData} />
        </div>
      )}

      {error && <p className="text-red-500">{error}</p>}
      <DataTable
        data={categories}
        pagination={pagination}
        onPageChange={(newPage) => setPagination(prev => ({ ...prev, page: newPage }))}
        columns={[
          {
            key: "category_id",
            header: "ID",
            render: (category) => category.category_id
          },
          {
            key: "category_name",
            header: "Category Name",
            render: (category) => category.category_name
          },
          {
            key: "status",
            header: "Status",
            render: (category) => category.status
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

export default CategoryPage;
