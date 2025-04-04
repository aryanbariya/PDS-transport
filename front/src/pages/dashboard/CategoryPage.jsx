import React, { useState, useEffect, useRef } from "react";
import CategoryForm from "./CategoryForm";
import $ from "jquery";
import "datatables.net-dt/css/dataTables.dataTables.min.css";
import "datatables.net-dt";
import { Player } from "@lottiefiles/react-lottie-player";
import truckLoader from "@/util/Animation.json";
import Navigation from "@/util/libs/navigation";
import Swal from "sweetalert2";

const URL = import.meta.env.VITE_API_BACK_URL;

const CategoryPage = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editData, setEditData] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const tableRef = useRef(null);

  useEffect(() => {
    fetchCategories();
  }, []);

  useEffect(() => {
    if (categories.length > 0 && tableRef.current) {
      $(tableRef.current).DataTable();
    }
  }, [categories]);

  const fetchCategories = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${URL}/api/categories`);
      if (!response.ok) throw new Error("Failed to fetch categories");
      const data = await response.json();
      setCategories(data || []);
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
          const response = await fetch(`${URL}/api/categories/${uuid}`, {
            method: "DELETE",
          });
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
          <CategoryForm onClose={() => setShowForm(false)} onSave={handleSave} editData={editData} />
        </div>
      )}

      {loading && <div className="flex justify-center items-center h-64">
        <Player autoplay loop src={truckLoader} className="w-48 h-48" />
      </div>}
      {error && <p className="text-red-500">{error}</p>}
      {!loading && (
        <div className="bg-white mt-3 rounded-md shadow-md p-4 overflow-auto flex-1">
          <table ref={tableRef} className="display w-full border border-gray-300 bg-white shadow-md rounded-md">
            <thead>
              <tr className="bg-gray-200">
                <th className="border p-2">ID</th>
                <th className="border p-2">Category Name</th>
                <th className="border p-2">Status</th>
                <th className="border p-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {categories.length > 0 ? (
                categories.map((category) => (
                  <tr key={category.uuid} className="text-start hover:bg-gray-100">
                    <td className="border p-2">{category.category_id}</td>
                    <td className="border p-2">{category.category_name}</td>
                    <td className="border p-2">{category.status}</td>
                    <td className="border p-2">
                      <div className="flex justify-start space-x-2">
                        <button
                          onClick={() => handleEdit(category)}
                          className="bg-blue-500 text-white px-3 py-1 rounded-lg hover:bg-blue-700"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete(category.uuid)}
                          className="bg-red-500 text-white px-3 py-1 rounded-lg hover:bg-red-700"
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4" className="text-center p-4">
                    No records found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>)}
    </div>
  );
};

export default CategoryPage;
