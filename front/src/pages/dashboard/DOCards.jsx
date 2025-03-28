import React, { useState } from "react";
import DOGenerateForm from "./DOGeneratePage"; // Import the DOGenerateForm

const DOCards = () => {
  const [isDOFormOpen, setIsDOFormOpen] = useState(false);

  // Click handler functions
  const handleGenerateDO = () => {
    console.log("DO Generate clicked");
    setIsDOFormOpen(true); // Open the DO Generate form
  };
  

  const handleAllocateDO = () => {
    console.log("DO Allocation clicked");
    alert("Opening DO Allocation...");
  };

  const handleDOFormClose = () => {
    setIsDOFormOpen(false);
  };

  return (
    <div className="p-8">
      <div className="max-w-4xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* DO Generate Card */}
          <div
            onClick={handleGenerateDO}
            className="bg-white rounded-lg shadow-md p-6 cursor-pointer 
                     transition-all duration-300 hover:shadow-lg 
                     hover:scale-105 border-2 border-blue-100 hover:border-blue-200"
          >
            <div className="text-center">
              <h2 className="text-xl font-semibold text-blue-600 mb-3">
                DO Generate
              </h2>
              <p className="text-gray-600">Create new Delivery Order</p>
            </div>
          </div>

          {/* DO Allocation Card */}
          <div
            onClick={handleAllocateDO}
            className="bg-white rounded-lg shadow-md p-6 cursor-pointer 
                     transition-all duration-300 hover:shadow-lg 
                     hover:scale-105 border-2 border-green-100 hover:border-green-200"
          >
            <div className="text-center">
              <h2 className="text-xl font-semibold text-green-600 mb-3">
                DO Allocation
              </h2>
              <p className="text-gray-600">
                Allocation and Assignment for active Delivery Orders
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Render the DOGenerateForm conditionally */}
      {isDOFormOpen && <DOGenerateForm onClose={handleDOFormClose} />}
    </div>
  );
};

export default DOCards;

