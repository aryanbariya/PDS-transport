import React, { useState, useEffect } from "react";
import MSWCGodownForm from "./MSWCGodownForm"; // Import the form component

const MSWCGodownPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [godowns, setGodowns] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingGodown, setEditingGodown] = useState(null); // To track which godown is being edited

  // Fetch MSWC Godowns from backend
  useEffect(() => {
    fetch("http://localhost:5000/mswc-godowns") // Change API URL as per your backend
      .then((res) => res.json())
      .then((data) => setGodowns(data))
      .catch((err) => console.error("Error fetching Godowns:", err));
  }, []);

  // Handle Delete Action
  const deleteGodown = (id) => {
    fetch(`http://localhost:5000/mswc-godowns/${id}`, {
      method: "DELETE",
    })
      .then(() => {
        setGodowns(godowns.filter((godown) => godown.id !== id));
      })
      .catch((err) => console.error("Error deleting Godown:", err));
  };

  // Filtered Godowns based on search input
  const filteredGodowns = godowns.filter((godown) =>
    godown.godown_name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="flex flex-col h-full w-full p-4 bg-gray-100">
      {/* Title Bar */}
      <div className="bg-blue-600 text-white text-lg font-semibold py-4 px-6 rounded-md w-full">
        Fetch MSWC Godown
      </div>

      {/* Search & Add Section */}
      <div className="flex justify-between items-center bg-white p-3 mt-2 rounded-md shadow-md">
        <input
          type="text"
          placeholder="Search MSWC Godown..."
          className="border p-2 rounded-md w-full max-w-lg"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button
          className="ml-3 bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700"
          onClick={() => {
            setEditingGodown(null);
            setShowForm(!showForm);
          }}
        >
          {showForm ? "Close" : "Add"}
        </button>
      </div>

      {/* Show Form when Add/Edit button is clicked */}
      {showForm && (
        <div className="mt-3 bg-white p-4 rounded-md shadow-md">
          <MSWCGodownForm
            onClose={() => setShowForm(false)}
            existingData={editingGodown}
          />
        </div>
      )}

      {/* Table Section */}
      <div className="bg-white mt-3 rounded-md shadow-md p-4 overflow-auto flex-1">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-200 text-gray-700">
              <th className="border border-gray-300 p-2">Sr. No</th>
              <th className="border border-gray-300 p-2">MSWC Godown Name</th>
              <th className="border border-gray-300 p-2">Group Under</th>
              <th className="border border-gray-300 p-2">Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredGodowns.length > 0 ? (
              filteredGodowns.map((godown, index) => (
                <tr key={godown.id} className="text-gray-600 text-center">
                  <td className="border border-gray-300 p-2">{index + 1}</td>
                  <td className="border border-gray-300 p-2 font-semibold">
                    {godown.godown_name}
                  </td>
                  <td className="border border-gray-300 p-2">
                    {godown.godown_under}
                  </td>
                  <td className="border border-gray-300 p-2 flex justify-center gap-2">
                    {/* Edit Button */}
                    <button
                      onClick={() => {
                        setEditingGodown(godown);
                        setShowForm(true);
                      }}
                      className="text-green-500 hover:text-green-700"
                    >
                      ✏️
                    </button>

                    {/* Delete Button */}
                    <button
                      onClick={() => deleteGodown(godown.id)}
                      className="text-red-500 hover:text-red-700"
                    >
                      🗑️
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="p-3 text-center text-gray-500">
                  No MSWC Godowns found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MSWCGodownPage;
