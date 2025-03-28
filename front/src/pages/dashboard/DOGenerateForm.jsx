// import React, { useState } from "react";
// import Swal from "sweetalert2";

// const DOGenerateForm = ({ onClose }) => {
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

//   const [previousFormData, setPreviousFormData] = useState(null);
//   const [secondForm, setSecondForm] = useState({
//     godown: "",
//     vahtuk: "Godown",
//     quantity: "",
//   });

//   const [addedEntries, setAddedEntries] = useState([]);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });
//   };

//   const handleSaveAndNext = () => {
//     if (!formData.doNo || !formData.quantity) {
//       Swal.fire({
//         icon: "warning",
//         title: "DO Number and Quantity are required!",
//       });
//       return;
//     }

//     setPreviousFormData({
//       doNo: formData.doNo,
//       quantity: formData.quantity,
//     });

//     Swal.fire({
//       icon: "success",
//       title: "Data saved successfully!",
//       showConfirmButton: false,
//       timer: 1500,
//     });

//     setFormData({
//       doNo: "",
//       baseDepot: "",
//       doDate: "",
//       doExpiryDate: "",
//       scheme: "",
//       grain: "",
//       quota: "",
//       quantity: "",
//     });
//   };

//   const handleSecondFormChange = (e) => {
//     const { name, value } = e.target;
//     setSecondForm({ ...secondForm, [name]: value });
//   };

//   const handleAddEntry = () => {
//     if (!secondForm.godown || !secondForm.quantity) {
//       Swal.fire({
//         icon: "warning",
//         title: "All fields are required!",
//       });
//       return;
//     }

//     setAddedEntries([...addedEntries, secondForm]);
//     setSecondForm({ godown: "", vahtuk: "Godown", quantity: "" });
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     console.log("Final Submission Data:", addedEntries);

//     Swal.fire({
//       icon: "success",
//       title: "Data Submitted Successfully!",
//       showConfirmButton: false,
//       timer: 1500,
//     });

//     setPreviousFormData(null);
//     setAddedEntries([]);
//   };

//   return (
//     <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 z-50">
//       <div className="bg-white rounded-lg shadow-lg w-4/5 max-w-3xl p-6">
//         {/* Header */}
//         <div className="flex justify-between items-center mb-6 border-b pb-2">
//           <h2 className="text-2xl font-semibold text-gray-800">
//             Delivery Order Form
//           </h2>
//           <button
//             onClick={onClose}
//             className="text-gray-500 hover:text-gray-700 focus:outline-none"
//           >
//             <svg
//               className="h-6 w-6"
//               fill="none"
//               viewBox="0 0 24 24"
//               stroke="currentColor"
//             >
//               <path
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//                 strokeWidth="2"
//                 d="M6 18L18 6M6 6l12 12"
//               />
//             </svg>
//           </button>
//         </div>

//         {/* Form Content */}
//         <div className="space-y-6">
//           {!previousFormData ? (
//             // First Form
//             <form onSubmit={(e) => e.preventDefault()} className="space-y-4">
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                 {/* D.O No */}
//                 <div>
//                   <label
//                     htmlFor="doNo"
//                     className="block text-sm font-medium text-gray-700"
//                   >
//                     D.O No
//                   </label>
//                   <input
//                     type="text"
//                     id="doNo"
//                     name="doNo"
//                     value={formData.doNo}
//                     onChange={handleChange}
//                     className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
//                     placeholder="Enter D.O Number"
//                   />
//                 </div>

//                 {/* Base Depot */}
//                 <div>
//                   <label
//                     htmlFor="baseDepot"
//                     className="block text-sm font-medium text-gray-700"
//                   >
//                     Base Depot
//                   </label>
//                   <input
//                     type="text"
//                     id="baseDepot"
//                     name="baseDepot"
//                     value={formData.baseDepot}
//                     onChange={handleChange}
//                     className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
//                     placeholder="Enter Base Depot"
//                   />
//                 </div>

//                 {/* D.O Date */}
//                 <div>
//                   <label
//                     htmlFor="doDate"
//                     className="block text-sm font-medium text-gray-700"
//                   >
//                     D.O Date
//                   </label>
//                   <input
//                     type="date"
//                     id="doDate"
//                     name="doDate"
//                     value={formData.doDate}
//                     onChange={handleChange}
//                     className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
//                   />
//                 </div>

//                 {/* Quantity */}
//                 <div>
//                   <label
//                     htmlFor="quantity"
//                     className="block text-sm font-medium text-gray-700"
//                   >
//                     Quantity
//                   </label>
//                   <input
//                     type="text"
//                     id="quantity"
//                     name="quantity"
//                     value={formData.quantity}
//                     onChange={handleChange}
//                     className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
//                     placeholder="Enter Quantity"
//                   />
//                 </div>

//                 {/* Quota */}
//                 <div>
//                   <label
//                     htmlFor="quota"
//                     className="block text-sm font-medium text-gray-700"
//                   >
//                     Quota
//                   </label>
//                   <input
//                     type="text"
//                     id="quota"
//                     name="quota"
//                     value={formData.quota}
//                     onChange={handleChange}
//                     className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
//                     placeholder="Enter Quota"
//                   />
//                 </div>

//                 {/* Grain */}
//                 <div>
//                   <label
//                     htmlFor="grain"
//                     className="block text-sm font-medium text-gray-700"
//                   >
//                     Grain
//                   </label>
//                   <input
//                     type="text"
//                     id="grain"
//                     name="grain"
//                     value={formData.grain}
//                     onChange={handleChange}
//                     className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
//                     placeholder="Enter Grain"
//                   />
//                 </div>

//                 {/* Scheme */}
//                 <div>
//                   <label
//                     htmlFor="scheme"
//                     className="block text-sm font-medium text-gray-700"
//                   >
//                     Scheme
//                   </label>
//                   <input
//                     type="text"
//                     id="scheme"
//                     name="scheme"
//                     value={formData.scheme}
//                     onChange={handleChange}
//                     className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
//                     placeholder="Enter Scheme"
//                   />
//                 </div>

//                 {/* DO Expiry Date */}
//                 <div>
//                   <label
//                     htmlFor="doExpiryDate"
//                     className="block text-sm font-medium text-gray-700"
//                   >
//                     D.O Expiry Date
//                   </label>
//                   <input
//                     type="date"
//                     id="doExpiryDate"
//                     name="doExpiryDate"
//                     value={formData.doExpiryDate}
//                     onChange={handleChange}
//                     className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
//                   />
//                 </div>
//               </div>

//               {/* Save & Next Button */}
//               <button
//                 type="button"
//                 onClick={handleSaveAndNext}
//                 className="w-full bg-blue-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
//               >
//                 Save & Next
//               </button>
//             </form>
//           ) : (
//             // Second Form
//             <>
//               {/* Display Previous Form Data */}
//               <div className="bg-gray-50 p-4 rounded-md shadow-inner">
//                 <h3 className="text-lg font-semibold text-gray-700 mb-2">
//                   Previous Entry
//                 </h3>
//                 <p>
//                   <strong>DO Number:</strong> {previousFormData.doNo}
//                 </p>
//                 <p>
//                   <strong>Quantity:</strong> {previousFormData.quantity}
//                 </p>
//               </div>

//               {/* Second Form */}
//               <form onSubmit={(e) => e.preventDefault()} className="space-y-4">
//                 <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//                   {/* Godown */}
//                   <div>
//                     <label
//                       htmlFor="godown"
//                       className="block text-sm font-medium text-gray-700"
//                     >
//                       Godown
//                     </label>
//                     <input
//                       type="text"
//                       id="godown"
//                       name="godown"
//                       value={secondForm.godown}
//                       onChange={handleSecondFormChange}
//                       className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
//                       placeholder="Enter Godown"
//                     />
//                   </div>

//                   {/* Vahtuk */}
//                   <div>
//                     <label
//                       htmlFor="vahtuk"
//                       className="block text-sm font-medium text-gray-700"
//                     >
//                       Vahtuk
//                     </label>
//                     <select
//                       id="vahtuk"
//                       name="vahtuk"
//                       value={secondForm.vahtuk}
//                       onChange={handleSecondFormChange}
//                       className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
//                     >
//                       <option value="Godown">Godown</option>
//                       <option value="Thet">Thet</option>
//                     </select>
//                   </div>

//                   {/* Quantity */}
//                   /* <div>
//                     <label
//                       htmlFor="secondFormQuantity"
//                       className="block text-sm font-medium text-gray-700"
//                     >
//                       Quantity
//                     </label>
//                     <input
//                       type="text"
//                       id="secondFormQuantity"
//                       name="quantity"
//                       value={secondForm.quantity}
//                       onChange={handleSecondFormChange}
//                       className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
//                       placeholder="Enter Quantity"
//                     />
//                   </div>
//                 </div> */

//                 {/* Add Entry Button */}
//                 <button
//                   type="button"
//                   onClick={handleAddEntry}
//                   className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
//                 >
//                   Add Entry
//                 </button>
//               </form>

//               {/* Table for Added Entries */}
//               {addedEntries.length > 0 && (
//                 <div className="overflow-x-auto">
//                   <table className="min-w-full divide-y divide-gray-200 mt-4">
//                     <thead className="bg-gray-50">
//                       <tr>
//                         <th
//                           scope="col"
//                           className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
//                         >
//                           Godown
//                         </th>
//                         <th
//                           scope="col"
//                           className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
//                         >
//                           Vahtuk
//                         </th>
//                         <th
//                           scope="col"
//                           className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
//                         >
//                           Quantity
//                         </th>
//                       </tr>
//                     </thead>
//                     <tbody className="bg-white divide-y divide-gray-200">
//                       {addedEntries.map((entry, index) => (
//                         <tr key={index}>
//                           <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
//                             {entry.godown}
//                           </td>
//                           <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
//                             {entry.vahtuk}
//                           </td>
//                           <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
//                             {entry.quantity}
//                           </td>
//                         </tr>
//                       ))}
//                     </tbody>
//                   </table>
//                 </div>
//               )}

//               {/* Submit Button */}
//               <button
//                 onClick={handleSubmit}
//                 className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
//               >
//                 Submit
//               </button>
//             </>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default DOGenerateForm;


import React, { useState } from "react";
import Swal from "sweetalert2";

const DOGenerateForm = ({ onClose }) => {
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

  const [previousFormData, setPreviousFormData] = useState(null);
  const [secondForm, setSecondForm] = useState({
    godown: "",
    vahtuk: "Godown",
    quantity: "",
  });

  const [addedEntries, setAddedEntries] = useState([]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleNumberChange = (e) => {
    const { name, value } = e.target;
    const onlyDigits = value.replace(/[^0-9]/g, "");
    setFormData({ ...formData, [name]: onlyDigits });
  };

  const handleSecondFormNumberChange = (e) => {
    const { name, value } = e.target;
    const onlyDigits = value.replace(/[^0-9]/g, "");
    setSecondForm({ ...secondForm, [name]: onlyDigits });
  };

  const handleSaveAndNext = () => {
    if (!formData.doNo || !formData.quantity || !formData.quota) {
      Swal.fire({
        icon: "warning",
        title: "DO Number, Quantity, and Quota are required!",
      });
      return;
    }

    setPreviousFormData({
      doNo: formData.doNo,
      quantity: formData.quantity,
    });

    Swal.fire({
      icon: "success",
      title: "Basic D.O. Information Saved!",
      showConfirmButton: false,
      timer: 1500,
    });

    setFormData({
      doNo: "",
      baseDepot: "",
      doDate: "",
      doExpiryDate: "",
      scheme: "",
      grain: "",
      quota: "",
      quantity: "",
    });
  };

  const handleSecondFormChange = (e) => {
    const { name, value } = e.target;
    setSecondForm({ ...secondForm, [name]: value });
  };

  const handleAddEntry = () => {
    if (!secondForm.godown || !secondForm.quantity) {
      Swal.fire({
        icon: "warning",
        title: "Godown and Quantity are required for each entry!",
      });
      return;
    }

    setAddedEntries([...addedEntries, secondForm]);
    setSecondForm({ godown: "", vahtuk: "Godown", quantity: "" });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Final Submission Data:", addedEntries);

    Swal.fire({
      icon: "success",
      title: "Distribution Details Submitted Successfully!",
      showConfirmButton: false,
      timer: 1500,
    });

    setPreviousFormData(null);
    setAddedEntries([]);
    onClose(); // Close the modal after submission
  };

  const handleGoBack = () => {
    setPreviousFormData(null);
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 z-50">
      <div className="bg-white rounded-xl shadow-lg w-full max-w-2xl overflow-hidden">
        {/* Header */}
        <div className="bg-gray-100 py-4 px-6 border-b">
          <h2 className="text-xl font-semibold text-gray-800">
            Delivery Order Generation
          </h2>
          <p className="text-gray-600 text-sm">
            Fill in the details to generate a new Delivery Order.
          </p>
        </div>

        {/* Form Content */}
        <div className="p-6">
          {!previousFormData ? (
            // First Form Card
            <div className="bg-white rounded-md shadow-sm p-4 mb-4 border">
              <h3 className="text-lg font-semibold text-gray-700 mb-3">
                Basic D.O. Information
              </h3>
              <form onSubmit={(e) => e.preventDefault()} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* D.O No */}
                <div>
                  <label
                    htmlFor="doNo"
                    className="block text-lg font-medium text-gray-700"
                  >
                    D.O No
                  </label>
                  <input
                    type="text"
                    id="doNo"
                    name="doNo"
                    value={formData.doNo}
                    onChange={handleNumberChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-lg"
                    placeholder="Enter D.O. Number"
                  />
                </div>

                {/* Base Depot */}
                <div>
                  <label
                    htmlFor="baseDepot"
                    className="block text-lg font-medium text-gray-700"
                  >
                    Base Depot
                  </label>
                  <input
                    type="text"
                    id="baseDepot"
                    name="baseDepot"
                    value={formData.baseDepot}
                    onChange={handleChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-lg"
                    placeholder="Enter Base Depot"
                  />
                </div>

                {/* D.O Date */}
                <div>
                  <label
                    htmlFor="doDate"
                    className="block text-lg font-medium text-gray-700"
                  >
                    D.O Date
                  </label>
                  <input
                    type="date"
                    id="doDate"
                    name="doDate"
                    value={formData.doDate}
                    onChange={handleChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-lg"
                  />
                </div>

                {/* D.O Expiry Date */}
                <div>
                  <label
                    htmlFor="doExpiryDate"
                    className="block text-lg font-medium text-gray-700"
                  >
                    D.O Expiry Date
                  </label>
                  <input
                    type="date"
                    id="doExpiryDate"
                    name="doExpiryDate"
                    value={formData.doExpiryDate}
                    onChange={handleChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-lg"
                  />
                </div>

                {/* Scheme */}
                <div>
                  <label
                    htmlFor="scheme"
                    className="block text-lg font-medium text-gray-700"
                  >
                    Scheme
                  </label>
                  <input
                    type="text"
                    id="scheme"
                    name="scheme"
                    value={formData.scheme}
                    onChange={handleChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-lg"
                    placeholder="Enter Scheme"
                  />
                </div>

                {/* Grain */}
                <div>
                  <label
                    htmlFor="grain"
                    className="block text-lg font-medium text-gray-700"
                  >
                    Grain
                  </label>
                  <input
                    type="text"
                    id="grain"
                    name="grain"
                    value={formData.grain}
                    onChange={handleChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-lg"
                    placeholder="Enter Grain"
                  />
                </div>

                {/* Quota */}
                <div>
                  <label
                    htmlFor="quota"
                    className="block text-lg font-medium text-gray-700"
                  >
                    Quota
                  </label>
                  <input
                    type="text"
                    id="quota"
                    name="quota"
                    value={formData.quota}
                    onChange={handleNumberChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-lg"
                    placeholder="Enter Quota"
                  />
                </div>

                {/* Quantity */}
                <div>
                  <label
                    htmlFor="quantity"
                    className="block text-lg font-medium text-gray-700"
                  >
                    Quantity
                  </label>
                  <input
                    type="text"
                    id="quantity"
                    name="quantity"
                    value={formData.quantity}
                    onChange={handleNumberChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-lg"
                    placeholder="Enter Total Quantity"
                  />
                </div>
              </form>

              {/* Buttons */}
              <div className="mt-5 flex justify-end">
                <button
                  type="button"
                  onClick={onClose}
                  className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-3 px-4 rounded focus:outline-none focus:shadow-outline mr-2 text-lg"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleSaveAndNext}
                  className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded focus:outline-none focus:shadow-outline text-lg"
                >
                  Save & Add Distribution Details
                </button>
              </div>
            </div>
          ) : (
            // Second Form Card
            <div className="bg-white rounded-md shadow-sm p-4 border">
              <h3 className="text-lg font-semibold text-gray-700 mb-3">
                Add Distribution Details
              </h3>

              {/* Display Previous Form Data */}
              <div className="bg-gray-50 p-3 rounded-md shadow-inner mb-4">
                <p className="text-sm text-gray-600">
                  <span className="font-semibold">D.O Number:</span>{" "}
                  {previousFormData.doNo}
                </p>
                <p className="text-sm text-gray-600">
                  <span className="font-semibold">Total Quantity:</span>{" "}
                  {previousFormData.quantity}
                </p>
              </div>

              <form onSubmit={(e) => e.preventDefault()} className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                {/* Godown */}
                <div>
                  <label
                    htmlFor="godown"
                    className="block text-lg font-medium text-gray-700"
                  >
                    Godown
                  </label>
                  <input
                    type="text"
                    id="godown"
                    name="godown"
                    value={secondForm.godown}
                    onChange={handleSecondFormChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-lg"
                    placeholder="Enter Godown Name"
                  />
                </div>

                {/* Vahtuk */}
                <div>
                  <label
                    htmlFor="vahtuk"
                    className="block text-lg font-medium text-gray-700"
                  >
                    Vahtuk
                  </label>
                  <select
                    id="vahtuk"
                    name="vahtuk"
                    value={secondForm.vahtuk}
                    onChange={handleSecondFormChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-lg"
                  >
                    <option value="Godown">Godown</option>
                    <option value="Thet">Thet</option>
                  </select>
                </div>

                {/* Quantity */}
                <div>
                  <label
                    htmlFor="secondFormQuantity"
                    className="block text-lg font-medium text-gray-700"
                  >
                    Quantity
                  </label>
                  <input
                    type="text"
                    id="secondFormQuantity"
                    name="quantity"
                    value={secondForm.quantity}
                    onChange={handleSecondFormNumberChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-lg"
                    placeholder="Enter Quantity"
                  />
                </div>
              </form>

              {/* Add Entry Button */}
              <div className="mb-4">
                <button
                  type="button"
                  onClick={handleAddEntry}
                  className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-4 rounded focus:outline-none focus:shadow-outline text-lg"
                >
                  Add Distribution Entry
                </button>
              </div>

              {/* Table for Added Entries */}
              {addedEntries.length > 0 && (
                <div className="overflow-x-auto mb-4 border rounded-md">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th
                          scope="col"
                          className="px-4 py-3 text-left text-sm font-medium text-gray-500 uppercase tracking-wider"
                        >
                          Godown
                        </th>
                        <th
                          scope="col"
                          className="px-4 py-3 text-left text-sm font-medium text-gray-500 uppercase tracking-wider"
                        >
                          Vahtuk
                        </th>
                        <th
                          scope="col"
                          className="px-4 py-3 text-left text-sm font-medium text-gray-500 uppercase tracking-wider"
                        >
                          Quantity
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {addedEntries.map((entry, index) => (
                        <tr key={index}>
                          <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">
                            {entry.godown}
                          </td>
                          <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">
                            {entry.vahtuk}
                          </td>
                          <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">
                            {entry.quantity}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}

              {/* Buttons for Second Form */}
              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={handleGoBack}
                  className="bg-gray-400 hover:bg-gray-500 text-gray-800 font-bold py-3 px-4 rounded focus:outline-none focus:shadow-outline mr-2 text-lg"
                >
                  Back
                </button>
                <button
                  type="button"
                  onClick={onClose}
                  className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-3 px-4 rounded focus:outline-none focus:shadow-outline mr-2 text-lg"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSubmit}
                  className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-4 rounded focus:outline-none focus:shadow-outline text-lg"
                >
                  Submit D.O.
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DOGenerateForm;