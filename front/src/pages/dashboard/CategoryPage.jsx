import React, { useState, useEffect } from "react";
import CategoryForm from "./CategoryForm";

const CategoryPage = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [editData, setEditData] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const fetchCategories = async () => {
    setLoading(true);
    try {
      const response = await fetch("http://localhost:5000/api/categories");
      if (!response.ok) throw new Error("Failed to fetch categories");

      const data = await response.json();
      setCategories(data || []);
      setLoading(false);
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this category?")) return;

    try {
      const response = await fetch(`http://localhost:5000/api/categories/${id}`, { method: "DELETE" });
      if (response.ok) {
        alert("Category deleted successfully!");
        fetchCategories();
      } else {
        alert("Failed to delete category.");
      }
    } catch (err) {
      alert("Error deleting category.");
    }
  };

  const handleEdit = (category) => {
    setEditData(category);
    setShowForm(true);
  };

  const handleSave = async () => {
    setShowForm(false);
    setEditData(null);
    fetchCategories();
  };

  const filteredCategories = categories.filter((category) =>
    category.category_name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-4 bg-gray-100 min-h-screen">
      <div className="bg-blue-600 text-white p-4 rounded-md shadow-md">
        <h2 className="text-lg font-semibold">Category Management</h2>
      </div>

      <div className="mt-4 flex items-center gap-2">
        <input
          type="text"
          placeholder="Search Categories..."
          className="border p-2 rounded-md w-full"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button
          className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600"
          onClick={() => {
            setEditData(null);
            setShowForm(!showForm);
          }}
        >
          {showForm ? "Close" : "Add"}
        </button>
      </div>

      {searchTerm && (
        <div className="mt-2 bg-white p-3 rounded-md shadow-md">
          <p className="text-gray-700 font-semibold">Showing results for: "{searchTerm}"</p>
        </div>
      )}

      {showForm && (
        <div className="mt-3 bg-white p-4 rounded-md shadow-md">
          <CategoryForm onClose={() => setShowForm(false)} onSave={handleSave} editData={editData} />
        </div>
      )}

      {loading && <p>Loading...</p>}
      {error && <p className="text-red-500">{error}</p>}

      <div className="bg-white p-4 mt-4 rounded-md shadow-md overflow-x-auto">
        <table className="w-full border-collapse border border-gray-300 mt-4 bg-white shadow-md rounded-md">
          <thead>
            <tr className="bg-gray-200">
              <th className="border p-2">ID</th>
              <th className="border p-2">Category Name</th>
              <th className="border p-2">Status</th>
              <th className="border p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredCategories.length > 0 ? (
              filteredCategories.map((category) => (
                <tr key={category.category_id} className="text-center hover:bg-gray-100">
                  <td className="border p-2">{category.category_id}</td>
                  <td className="border p-2">{category.category_name}</td>
                  <td className="border p-2">{category.status}</td>
                  <td className="border p-2">
                    <div className="flex justify-center space-x-2">
                      <button
                        onClick={() => handleEdit(category)}
                        className="bg-blue-500 text-white px-3 py-1 rounded-lg hover:bg-blue-700"
                      >
                        ✏️
                      </button>
                      <button
                        onClick={() => handleDelete(category.category_id)}
                        className="bg-red-500 text-white px-3 py-1 rounded-lg hover:bg-red-700"
                      >
                        🗑️
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="text-center p-4">No records found</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CategoryPage;
