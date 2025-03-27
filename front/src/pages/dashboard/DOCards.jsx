// import React from 'react';

// const DOCards = () => {
//   // Click handler functions
//   const handleGenerateDO = () => {
//     console.log('DO Generate clicked');
//     // Add your DO generation logic here
//     alert('Initiating DO Generation...');
//   };

//   const handleAllocateDO = () => {
//     console.log('DO Allocation clicked');
//     // Add your DO allocation logic here
//     alert('Opening DO Allocation...');
//   };

//   return (
//     <div className="min-h-screen bg-gray-50 p-8">
//       <div className="max-w-4xl mx-auto">
//         <h1 className="text-3xl font-bold text-gray-800 mb-8">Document Orders</h1>
        
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//           {/* DO Generate Card */}
//           <div 
//             onClick={handleGenerateDO}
//             className="bg-white rounded-lg shadow-md p-6 cursor-pointer
//                      transition-all duration-300 hover:shadow-lg
//                      hover:transform hover:scale-105 border-2 border-blue-100
//                      hover:border-blue-200"
//           >
//             <div className="text-center">
//               <h2 className="text-xl font-semibold text-blue-600 mb-3">
//                 DO Generate
//               </h2>
//               <p className="text-gray-600">
//                 Click to create new Document Orders and initiate workflow processes
//               </p>
//             </div>
//           </div>

//           {/* DO Allocation Card */}
//           <div 
//             onClick={handleAllocateDO}
//             className="bg-white rounded-lg shadow-md p-6 cursor-pointer
//                      transition-all duration-300 hover:shadow-lg
//                      hover:transform hover:scale-105 border-2 border-green-100
//                      hover:border-green-200"
//           >
//             <div className="text-center">
//               <h2 className="text-xl font-semibold text-green-600 mb-3">
//                 DO Allocation
//               </h2>
//               <p className="text-gray-600">
//                 Click to manage resource allocation and assignment for active Document Orders
//               </p>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default DOCards;


import React, { useState } from 'react';
import DOGenerateForm from './DOGenerateForm'; // Import the DOGenerateForm

const DOCards = () => {
  const [isDOFormOpen, setIsDOFormOpen] = useState(false);

  // Click handler functions
  const handleGenerateDO = () => {
    console.log('DO Generate clicked');
    setIsDOFormOpen(true); // Open the DO Generate form
  };

  const handleAllocateDO = () => {
    console.log('DO Allocation clicked');
    // Add your DO allocation logic here
    alert('Opening DO Allocation...');
  };

  const handleDOFormClose = () => {
    setIsDOFormOpen(false); // Function to close the DO Generate form
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-8">Delivery Orders</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* DO Generate Card */}
          <div
            onClick={handleGenerateDO}
            className="bg-white rounded-lg shadow-md p-6 cursor-pointer
                     transition-all duration-300 hover:shadow-lg
                     hover:transform hover:scale-105 border-2 border-blue-100
                     hover:border-blue-200"
          >
            <div className="text-center">
              <h2 className="text-xl font-semibold text-blue-600 mb-3">
                DO Generate
              </h2>
              <p className="text-gray-600">
                Create new Delivery Orderd
              </p>
            </div>
          </div>

          {/* DO Allocation Card */}
          <div
            onClick={handleAllocateDO}
            className="bg-white rounded-lg shadow-md p-6 cursor-pointer
                     transition-all duration-300 hover:shadow-lg
                     hover:transform hover:scale-105 border-2 border-green-100
                     hover:border-green-200"
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
