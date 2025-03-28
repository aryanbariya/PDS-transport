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
//     <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 z-50 p-4">
//       <div className="bg-white rounded-lg shadow-lg w-full max-w-4xl p-6 overflow-y-auto max-h-[90vh]">
//         {/* Header */}
//         <div className="flex justify-between items-center border-b pb-4">
//           <h2 className="text-xl font-semibold">D.O Form</h2>
//           <button onClick={onClose} className="text-gray-600 hover:text-gray-800">
//             ✖
//           </button>
//         </div>

//         {/* First Form */}
//         {!previousFormData ? (
//           <form onSubmit={(e) => e.preventDefault()} className="mt-4 space-y-4">
//             <div className="grid grid-cols-2 gap-4">
//               <div>
//                 <label className="block text-sm font-medium">D.O No</label>
//                 <input
//                   type="text"
//                   name="doNo"
//                   value={formData.doNo}
//                   onChange={handleChange}
//                   className="border p-2 rounded w-full"
//                 />
//               </div>
//               <div>
//                 <label className="block text-sm font-medium">Base Depot</label>
//                 <input
//                   type="text"
//                   name="baseDepot"
//                   value={formData.baseDepot}
//                   onChange={handleChange}
//                   className="border p-2 rounded w-full"
//                 />
//               </div>
//             </div>

//             <div className="grid grid-cols-2 gap-4">
//               <div>
//                 <label className="block text-sm font-medium">D.O Date</label>
//                 <input
//                   type="date"
//                   name="doDate"
//                   value={formData.doDate}
//                   onChange={handleChange}
//                   className="border p-2 rounded w-full"
//                 />
//               </div>
//               <div>
//                 <label className="block text-sm font-medium">Quantity</label>
//                 <input
//                   type="text"
//                   name="quantity"
//                   value={formData.quantity}
//                   onChange={handleChange}
//                   className="border p-2 rounded w-full"
//                 />
//               </div>
//             </div>
//                         {/* Quota */}
//                         <div>
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

//                          {/* Grain */}
//                          <div>
//               <label className="block text-sm font-medium text-gray-700 mb-1">
//                 Grain
//               </label>
//               <input
//                 name="grain"
//                 value={formData.grain}
//                 onChange={handleChange}
//                 placeholder="Enter Grain"
//                 className="p-2 border border-gray-300 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
//               />
//             </div>
            
//                         {/* Scheme */}
//                         <div>
//               <label className="block text-sm font-medium text-gray-700 mb-1">
//                 Scheme
//               </label>
//                <input
//                 name="scheme"
//                 value={formData.scheme}
//                 onChange={handleChange}
//                 placeholder="Enter Scheme"
//                 className="p-2 border border-gray-300 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
//               />
//             </div>

//                         {/* DO Expiry Date */}
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

//             <button
//               type="button"
//               onClick={handleSaveAndNext}
//               className="mt-4 bg-blue-500 text-white px-4 py-2 rounded w-full"
//             >
//               Save & Next
//             </button>
//           </form>
//         ) : (
//           <>
//             {/* Display Previous Form Data */}
//             <div className="mt-4 p-4 bg-gray-100 rounded-lg">
//               <p><strong>DO Number:</strong> {previousFormData.doNo}</p>
//               <p><strong>Quantity:</strong> {previousFormData.quantity}</p>
//             </div>

//             {/* Second Form */}
//             <form onSubmit={(e) => e.preventDefault()} className="mt-4 space-y-4">
//               <div className="grid grid-cols-3 gap-4">
//                 <div>
//                   <label className="block text-sm font-medium">Godown</label>
//                   <input
//                     type="text"
//                     name="godown"
//                     value={secondForm.godown}
//                     onChange={handleSecondFormChange}
//                     className="border p-2 rounded w-full"
//                   />
//                 </div>
//                 <div>
//                   <label className="block text-sm font-medium">Vahtuk</label>
//                   <select
//                     name="vahtuk"
//                     value={secondForm.vahtuk}
//                     onChange={handleSecondFormChange}
//                     className="border p-2 rounded w-full"
//                   >
//                     <option value="Godown">Godown</option>
//                     <option value="Thet">Thet</option>
//                   </select>
//                 </div>
//                 <div>
//                   <label className="block text-sm font-medium">Quantity</label>
//                   <input
//                     type="text"
//                     name="quantity"
//                     value={secondForm.quantity}
//                     onChange={handleSecondFormChange}
//                     className="border p-2 rounded w-full"
//                   />
//                 </div>
//               </div>
//               <button
//                 type="button"
//                 onClick={handleAddEntry}
//                 className="mt-4 bg-green-500 text-white px-4 py-2 rounded w-full"
//               >
//                 Add
//               </button>
//             </form>

//             {/* Table for Added Entries */}
//             {addedEntries.length > 0 && (
//               <table className="mt-4 w-full border">
//                 <thead>
//                   <tr className="bg-gray-200">
//                     <th className="p-2 border">Godown</th>
//                     <th className="p-2 border">Vahtuk</th>
//                     <th className="p-2 border">Quantity</th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {addedEntries.map((entry, index) => (
//                     <tr key={index}>
//                       <td className="p-2 border">{entry.godown}</td>
//                       <td className="p-2 border">{entry.vahtuk}</td>
//                       <td className="p-2 border">{entry.quantity}</td>
//                     </tr>
//                   ))}
//                 </tbody>
//               </table>
//             )}

//             <button onClick={handleSubmit} className="mt-4 bg-blue-600 text-white px-4 py-2 rounded w-full">
//               Submit
//             </button>
//           </>
//         )}
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

  const handleSaveAndNext = () => {
    if (!formData.doNo || !formData.quantity) {
      Swal.fire({
        icon: "warning",
        title: "DO Number and Quantity are required!",
      });
      return;
    }

    setPreviousFormData({
      doNo: formData.doNo,
      quantity: formData.quantity,
    });

    Swal.fire({
      icon: "success",
      title: "Data saved successfully!",
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
        title: "All fields are required!",
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
      title: "Data Submitted Successfully!",
      showConfirmButton: false,
      timer: 1500,
    });

    setPreviousFormData(null);
    setAddedEntries([]);
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 z-50 p-4 opeacity-25">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-5xl p-8 overflow-y-auto max-h-[90vh]">
        {/* Header */}
        <div className="flex justify-between items-center mb-6 border-b pb-2">
          <h2 className="text-2xl font-semibold text-gray-800">
            Delivery Order Form
          </h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 focus:outline-none"
          >
            <svg
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        {/* Form Content */}
        <div className="space-y-6">
          {!previousFormData ? (
            // First Form
            <form onSubmit={(e) => e.preventDefault()} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* D.O No */}
                <div>
                  <label
                    htmlFor="doNo"
                    className="block text-sm font-medium text-gray-700"
                  >
                    D.O No
                  </label>
                  <input
                    type="text"
                    id="doNo"
                    name="doNo"
                    value={formData.doNo}
                    onChange={handleChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    placeholder="Enter D.O Number"
                  />
                </div>

                {/* Base Depot */}
                <div>
                  <label
                    htmlFor="baseDepot"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Base Depot
                  </label>
                  <input
                    type="text"
                    id="baseDepot"
                    name="baseDepot"
                    value={formData.baseDepot}
                    onChange={handleChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    placeholder="Enter Base Depot"
                  />
                </div>

                {/* D.O Date */}
                <div>
                  <label
                    htmlFor="doDate"
                    className="block text-sm font-medium text-gray-700"
                  >
                    D.O Date
                  </label>
                  <input
                    type="date"
                    id="doDate"
                    name="doDate"
                    value={formData.doDate}
                    onChange={handleChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  />
                </div>

                {/* Quantity */}
                <div>
                  <label
                    htmlFor="quantity"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Quantity
                  </label>
                  <input
                    type="text"
                    id="quantity"
                    name="quantity"
                    value={formData.quantity}
                    onChange={handleChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    placeholder="Enter Quantity"
                  />
                </div>

                {/* Quota */}
                <div>
                  <label
                    htmlFor="quota"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Quota
                  </label>
                  <input
                    type="text"
                    id="quota"
                    name="quota"
                    value={formData.quota}
                    onChange={handleChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    placeholder="Enter Quota"
                  />
                </div>

                {/* Grain */}
                <div>
                  <label
                    htmlFor="grain"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Grain
                  </label>
                  <input
                    type="text"
                    id="grain"
                    name="grain"
                    value={formData.grain}
                    onChange={handleChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    placeholder="Enter Grain"
                  />
                </div>

                {/* Scheme */}
                <div>
                  <label
                    htmlFor="scheme"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Scheme
                  </label>
                  <input
                    type="text"
                    id="scheme"
                    name="scheme"
                    value={formData.scheme}
                    onChange={handleChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    placeholder="Enter Scheme"
                  />
                </div>

                {/* DO Expiry Date */}
                <div>
                  <label
                    htmlFor="doExpiryDate"
                    className="block text-sm font-medium text-gray-700"
                  >
                    D.O Expiry Date
                  </label>
                  <input
                    type="date"
                    id="doExpiryDate"
                    name="doExpiryDate"
                    value={formData.doExpiryDate}
                    onChange={handleChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  />
                </div>
              </div>

              {/* Save & Next Button */}
              <button
                type="button"
                onClick={handleSaveAndNext}
                className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              >
                Save & Next
              </button>
            </form>
          ) : (
            // Second Form
            <>
              {/* Display Previous Form Data */}
              <div className="bg-gray-50 p-4 rounded-md shadow-inner">
                <h3 className="text-lg font-semibold text-gray-700 mb-2">
                  Previous Entry
                </h3>
                <p>
                  <strong>DO Number:</strong> {previousFormData.doNo}
                </p>
                <p>
                  <strong>Quantity:</strong> {previousFormData.quantity}
                </p>
              </div>

              {/* Second Form */}
              <form onSubmit={(e) => e.preventDefault()} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {/* Godown */}
                  <div>
                    <label
                      htmlFor="godown"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Godown
                    </label>
                    <input
                      type="text"
                      id="godown"
                      name="godown"
                      value={secondForm.godown}
                      onChange={handleSecondFormChange}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                      placeholder="Enter Godown"
                    />
                  </div>

                  {/* Vahtuk */}
                  <div>
                    <label
                      htmlFor="vahtuk"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Vahtuk
                    </label>
                    <select
                      id="vahtuk"
                      name="vahtuk"
                      value={secondForm.vahtuk}
                      onChange={handleSecondFormChange}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    >
                      <option value="Godown">Godown</option>
                      <option value="Thet">Thet</option>
                    </select>
                  </div>

                  {/* Quantity */}
                  <div>
                    <label
                      htmlFor="secondFormQuantity"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Quantity
                    </label>
                    <input
                      type="text"
                      id="secondFormQuantity"
                      name="quantity"
                      value={secondForm.quantity}
                      onChange={handleSecondFormChange}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                      placeholder="Enter Quantity"
                    />
                  </div>
                </div>

                {/* Add Entry Button */}
                <button
                  type="button"
                  onClick={handleAddEntry}
                  className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                >
                  Add Entry
                </button>
              </form>

              {/* Table for Added Entries */}
              {addedEntries.length > 0 && (
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200 mt-4">
                    <thead className="bg-gray-50">
                      <tr>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          Godown
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          Vahtuk
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          Quantity
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {addedEntries.map((entry, index) => (
                        <tr key={index}>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {entry.godown}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {entry.vahtuk}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {entry.quantity}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}

              {/* Submit Button */}
              <button
                onClick={handleSubmit}
                className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              >
                Submit
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default DOGenerateForm;
