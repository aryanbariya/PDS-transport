// import React, { useState, useEffect } from "react";
// import Swal from 'sweetalert2';

// const DOGenerateForm = ({ onClose }) => {
//   // State for form data
//   const [formData, setFormData] = useState({
//     doNo: "",
//     baseDepot: "",
//     doDate: "",
//     doExpiryDate: "",
//     scheme: "",
//     grain: "",
//     quota: "",
//     quantity: "",
//   });

//   // State for dropdown options
//   const [dropdownOptions, setDropdownOptions] = useState({
//     baseDepots: [],
//     schemes: [],
//     grains: []
//   });

//   // Simulated data fetching (replace with actual API calls)
//   useEffect(() => {
//     // Simulate fetching base depots
//     const fetchBaseDepots = async () => {
//       // In a real scenario, this would be an API call
//       const baseDepots = [
//         { id: 1, name: "MSWC MIDC DHULE GOC" },
//         { id: 2, name: "Central Warehouse" },
//         { id: 3, name: "Northern Depot" },
//         { id: 4, name: "Southern Depot" }
//       ];
//       setDropdownOptions(prev => ({ ...prev, baseDepots }));
//     };

//     // Simulate fetching schemes
//     const fetchSchemes = async () => {
//       const schemes = [
//         { id: 1, name: "NFSA (AAY)" },
//         { id: 2, name: "NFSA (PHH)" },
//         { id: 3, name: "Public Distribution" },
//         { id: 4, name: "Targeted PDS" }
//       ];
//       setDropdownOptions(prev => ({ ...prev, schemes }));
//     };

//     // Simulate fetching grains
//     const fetchGrains = async () => {
//       const grains = [
//         { id: 1, name: "WHEAT" },
//         { id: 2, name: "RICE" },
//         { id: 3, name: "MAIZE" },
//         { id: 4, name: "BAJRA" }
//       ];
//       setDropdownOptions(prev => ({ ...prev, grains }));
//     };

//     // Call fetch functions
//     fetchBaseDepots();
//     fetchSchemes();
//     fetchGrains();
//   }, []);

//   // Handle input changes
//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });
//   };

//   // Save and Next handler
//   const handleSaveAndNext = () => {
//     console.log("Form Data Saved:", formData);
//     Swal.fire({
//       icon: 'success',
//       title: 'Data saved successfully!',
//       showConfirmButton: false,
//       timer: 1500
//     });
//   };

//   // Submit handler
//   const handleSubmit = (e) => {
//     e.preventDefault();
//     console.log("Form Data Submitted:", formData);
//     Swal.fire({
//       icon: 'success',
//       title: 'DO Generated Successfully!',
//       showConfirmButton: false,
//       timer: 1500
//     }).then(() => {
//       onClose();
//     });
//   };

//   //cancel handler
//   const handleCancel = (e) => {
//     e.preventDefault(); // Prevent default form submission
//     Swal.fire({
//       title: 'Are you sure?',
//       text: "You won't be able to revert this!",
//       icon: 'warning',
//       showCancelButton: true,
//       confirmButtonColor: '#3085d6',
//       cancelButtonColor: '#d33',
//       confirmButtonText: 'Yes, close it!'
//     }).then((result) => {
//       if (result.isConfirmed) {
//         onClose();
//         Swal.fire(
//           'Closed!',
//           'The form has been closed.',
//           'success'
//         );
//       }
//     })
//   };

//   return (
//     <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 z-50">
//       <div className="bg-white rounded-lg shadow-lg w-4/5 max-w-4xl overflow-hidden">
//         {/* Header */}
//         <div className="bg-blue-500 text-white py-4 px-6 flex justify-between items-center">
//           <h2 className="text-xl font-semibold">D.O</h2>
//           <button
//             onClick={onClose}
//             className="text-white hover:text-gray-200 focus:outline-none"
//           >
//             <svg
//               xmlns="http://www.w3.org/2000/svg"
//               className="h-6 w-6"
//               fill="none"
//               viewBox="0 0 24 24"
//               stroke="currentColor"
//             >
//               <path
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//                 strokeWidth={2}
//                 d="M6 18L18 6M6 6l12 12"
//               />
//             </svg>
//           </button>
//         </div>

//         {/* Form */}
//         <form onSubmit={handleSubmit} className="p-6">
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//             {/* DO No */}
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-1">
//                 D.O No
//               </label>
//               <input
//                 type="text"
//                 name="doNo"
//                 value={formData.doNo}
//                 onChange={handleChange}
//                 placeholder="Enter D.O No"
//                 className="p-2 border border-gray-300 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
//               />
//             </div>

//             {/* Base Depot */}
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-1">
//                 Base Depot
//               </label>
//               <select
//                 name="baseDepot"
//                 value={formData.baseDepot}
//                 onChange={handleChange}
//                 className="p-2 border border-gray-300 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
//               >
//                 <option value="">Select Base Depot</option>
//                 {dropdownOptions.baseDepots.map((depot) => (
//                   <option key={depot.id} value={depot.name}>
//                     {depot.name}
//                   </option>
//                 ))}
//               </select>
//             </div>

//             {/* DO Date */}
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-1">
//                 D.O Date
//               </label>
//               <input
//                 type="date"
//                 name="doDate"
//                 value={formData.doDate}
//                 onChange={handleChange}
//                 className="p-2 border border-gray-300 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
//               />
//             </div>

//             {/* DO Expiry Date */}
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-1">
//                 D.O Expiry Date
//               </label>
//               <input
//                 type="date"
//                 name="doExpiryDate"
//                 value={formData.doExpiryDate}
//                 onChange={handleChange}
//                 className="p-2 border border-gray-300 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
//               />
//             </div>

//             {/* Scheme */}
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-1">
//                 Scheme
//               </label>
//               <select
//                 name="scheme"
//                 value={formData.scheme}
//                 onChange={handleChange}
//                 className="p-2 border border-gray-300 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
//               >
//                 <option value="">Select Scheme</option>
//                 {dropdownOptions.schemes.map((scheme) => (
//                   <option key={scheme.id} value={scheme.name}>
//                     {scheme.name}
//                   </option>
//                 ))}
//               </select>
//             </div>

//             {/* Grain */}
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-1">
//                 Grain
//               </label>
//               <select
//                 name="grain"
//                 value={formData.grain}
//                 onChange={handleChange}
//                 className="p-2 border border-gray-300 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
//               >
//                 <option value="">Select Grain</option>
//                 {dropdownOptions.grains.map((grain) => (
//                   <option key={grain.id} value={grain.name}>
//                     {grain.name}
//                   </option>
//                 ))}
//               </select>
//             </div>

//             {/* Quota */}
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-1">
//                 Quota
//               </label>
//               <input
//                 type="text"
//                 name="quota"
//                 value={formData.quota}
//                 onChange={handleChange}
//                 placeholder="Enter Quota"
//                 className="p-2 border border-gray-300 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
//               />
//             </div>

//             {/* Quantity */}
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-1">
//                 Quantity
//               </label>
//               <input
//                 type="number"
//                 name="quantity"
//                 value={formData.quantity}
//                 onChange={handleChange}
//                 placeholder="Enter Quantity"
//                 className="p-2 border border-gray-300 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
//               />
//             </div>
//           </div>

//           {/* Buttons */}
//           <div className="flex justify-end space-x-3 mt-6">
//             {/* Cancel Button */}
//             <button
//               type="button"
//               onClick={handleCancel}
//               className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-300 hover:shadow-md transition duration-300"
//             >
//               Cancel
//             </button>
//             {/* Save & Next Button */}
//             <button
//               type="button"
//               onClick={handleSaveAndNext}
//               className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 hover:shadow-md transition duration-300"
//             >
//               Save & Next
//             </button>

//             {/* Submit Button */}
//             <button
//               type="submit"
//               className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 hover:shadow-md transition duration-300"
//             >
//               Submit
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default DOGenerateForm;



import React, { useState, useEffect } from "react";
import Swal from 'sweetalert2';

const DOGenerateForm = ({ onClose }) => {
  // State for form data
  const [formData, setFormData] = useState({
    doNo: "",
    baseDepot: "",
    doDate: "",
    doExpiryDate: "",
    scheme: "",
    grain: "",
    quota: "",
    quantity: "",
  });

  // State to store the previous form data
  const [previousFormData, setPreviousFormData] = useState(null);

  // State for dropdown options
  const [dropdownOptions, setDropdownOptions] = useState({
    baseDepots: [],
    schemes: [],
    grains: []
  });

  // Simulated data fetching (replace with actual API calls)
  useEffect(() => {
    // Simulate fetching base depots
    const fetchBaseDepots = async () => {
      // In a real scenario, this would be an API call
      const baseDepots = [
        { id: 1, name: "MSWC MIDC DHULE GOC" },
        { id: 2, name: "Central Warehouse" },
        { id: 3, name: "Northern Depot" },
        { id: 4, name: "Southern Depot" }
      ];
      setDropdownOptions(prev => ({ ...prev, baseDepots }));
    };

    // Simulate fetching schemes
    const fetchSchemes = async () => {
      const schemes = [
        { id: 1, name: "NFSA (AAY)" },
        { id: 2, name: "NFSA (PHH)" },
        { id: 3, name: "Public Distribution" },
        { id: 4, name: "Targeted PDS" }
      ];
      setDropdownOptions(prev => ({ ...prev, schemes }));
    };

    // Simulate fetching grains
    const fetchGrains = async () => {
      const grains = [
        { id: 1, name: "WHEAT" },
        { id: 2, name: "RICE" },
        { id: 3, name: "MAIZE" },
        { id: 4, name: "BAJRA" }
      ];
      setDropdownOptions(prev => ({ ...prev, grains }));
    };

    // Call fetch functions
    fetchBaseDepots();
    fetchSchemes();
    fetchGrains();
  }, []);

  // Load previous form data on component mount (if available)
  useEffect(() => {
    if (previousFormData) {
      setFormData({
        ...formData,
        quota: previousFormData.quota,
        quantity: previousFormData.quantity,
        doNo: previousFormData.doNo,
      });
    }
  }, [previousFormData]);


  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Save and Next handler
  const handleSaveAndNext = () => {
    console.log("Form Data Saved:", formData);

    // Save the current form data to previousFormData state
    setPreviousFormData({
      quota: formData.quota,
      quantity: formData.quantity,
      doNo: formData.doNo,
    });

    Swal.fire({
      icon: 'success',
      title: 'Data saved successfully!',
      showConfirmButton: false,
      timer: 1500
    });

    // Reset only relevant fields, not all
    setFormData(prev => ({
      ...prev,
      doNo: '', // Clear DO No
      quota: '',   // Clear Quota
      quantity: ''  // Clear Quantity
    }));
  };

  // Submit handler
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Data Submitted:", formData);
    Swal.fire({
      icon: 'success',
      title: 'DO Generated Successfully!',
      showConfirmButton: false,
      timer: 1500
    }).then(() => {
      onClose();
    });
  };

  //cancel handler
  const handleCancel = (e) => {
    e.preventDefault(); // Prevent default form submission
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, close it!'
    }).then((result) => {
      if (result.isConfirmed) {
        onClose();
        Swal.fire(
          'Closed!',
          'The form has been closed.',
          'success'
        );
      }
    })
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 z-50">
      <div className="bg-white rounded-lg shadow-lg w-4/5 max-w-4xl overflow-hidden">
        {/* Header */}
        <div className="bg-blue-500 text-white py-4 px-6 flex justify-between items-center">
          <h2 className="text-xl font-semibold">D.O</h2>
          <button
            onClick={onClose}
            className="text-white hover:text-gray-200 focus:outline-none"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* DO No */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                D.O No
              </label>
              <input
                type="text"
                name="doNo"
                value={formData.doNo}
                onChange={handleChange}
                placeholder="Enter D.O No"
                className="p-2 border border-gray-300 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Base Depot */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Base Depot
              </label>
              <select
                name="baseDepot"
                value={formData.baseDepot}
                onChange={handleChange}
                className="p-2 border border-gray-300 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Select Base Depot</option>
                {dropdownOptions.baseDepots.map((depot) => (
                  <option key={depot.id} value={depot.name}>
                    {depot.name}
                  </option>
                ))}
              </select>
            </div>

            {/* DO Date */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                D.O Date
              </label>
              <input
                type="date"
                name="doDate"
                value={formData.doDate}
                onChange={handleChange}
                className="p-2 border border-gray-300 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* DO Expiry Date */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                D.O Expiry Date
              </label>
              <input
                type="date"
                name="doExpiryDate"
                value={formData.doExpiryDate}
                onChange={handleChange}
                className="p-2 border border-gray-300 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Scheme */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Scheme
              </label>
              <select
                name="scheme"
                value={formData.scheme}
                onChange={handleChange}
                className="p-2 border border-gray-300 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Select Scheme</option>
                {dropdownOptions.schemes.map((scheme) => (
                  <option key={scheme.id} value={scheme.name}>
                    {scheme.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Grain */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Grain
              </label>
              <select
                name="grain"
                value={formData.grain}
                onChange={handleChange}
                className="p-2 border border-gray-300 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Select Grain</option>
                {dropdownOptions.grains.map((grain) => (
                  <option key={grain.id} value={grain.name}>
                    {grain.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Quota */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Quota
              </label>
              <input
                type="text"
                name="quota"
                value={formData.quota}
                onChange={handleChange}
                placeholder="Enter Quota"
                className="p-2 border border-gray-300 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            {/* Quantity */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Quantity
              </label>
              <input
                type="number"
                name="quantity"
                value={formData.quantity}
                onChange={handleChange}
                placeholder="Enter Quantity"
                className="p-2 border border-gray-300 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          {/* Buttons */}
          <div className="flex justify-end space-x-3 mt-6">
            {/* Cancel Button */}
            <button
              type="button"
              onClick={handleCancel}
              className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-300 hover:shadow-md transition duration-300"
            >
              Cancel
            </button>
            {/* Save & Next Button */}
            <button
              type="button"
              onClick={handleSaveAndNext}
              className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 hover:shadow-md transition duration-300"
            >
              Save & Next
            </button>

            {/* Submit Button */}
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 hover:shadow-md transition duration-300"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default DOGenerateForm;
