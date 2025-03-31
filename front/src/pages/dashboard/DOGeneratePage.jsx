// import React, { useState, useEffect, useRef } from "react";
// import { Button } from "@material-tailwind/react";
// import $ from "jquery";
// import "datatables.net-dt/css/dataTables.dataTables.min.css";
// import "datatables.net-dt";
// import "datatables.net-buttons-dt/css/buttons.dataTables.min.css";
// import "datatables.net-buttons-dt";
// import { Player } from "@lottiefiles/react-lottie-player";
// import loadingAnimation from "@/util/Animation.json";
// import DOGenerateForm from "./DOGenerateForm";
// import Navigation from "@/util/libs/navigation";
// import Swal from "sweetalert2";

// const URL = import.meta.env.VITE_API_BACK_URL;

// const DOGeneratePage = () => {
//   const [orders, setOrders] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [editData, setEditData] = useState(null);
//   const [showForm, setShowForm] = useState(false);
//   const [selectedOrder, setSelectedOrder] = useState(null);
//   const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
//   const tableRef = useRef(null);

//   useEffect(() => {
//     fetchOrders();
//   }, []);

//   useEffect(() => {
//     if (orders.length > 0 && tableRef.current) {
//       $(tableRef.current).DataTable();
//     }
//   }, [orders]);

//   useEffect(() => {
//     const handleResize = () => setIsMobile(window.innerWidth < 768);
//     window.addEventListener("resize", handleResize);
//     return () => window.removeEventListener("resize", handleResize);
//   }, []);

//   const fetchOrders = async () => {
//     try {
//       const response = await fetch(`${URL}/api/orders`);
//       if (!response.ok) throw new Error("Failed to fetch data");
//       const data = await response.json();
//       setOrders(data || []);
//       setLoading(false);
//     } catch (err) {
//       setError(err.message);
//       setLoading(false);
//     }
//   };

//   const handleDelete = async (uuid) => {
//     Swal.fire({
//       title: "Are you sure?",
//       text: "You won't be able to revert this!",
//       icon: "warning",
//       showCancelButton: true,
//       confirmButtonColor: "#3085d6",
//       cancelButtonColor: "#d33",
//       confirmButtonText: "Yes, delete it!",
//     }).then(async (result) => {
//       if (result.isConfirmed) {
//         try {
//           const response = await fetch(`${URL}/api/orders/${uuid}`, { method: "DELETE" });
//           if (response.ok) {
//             Swal.fire("Deleted!", "Order deleted successfully!", "success");
//             fetchOrders();
//           } else {
//             Swal.fire("Error", "Failed to delete order.", "error");
//           }
//         } catch (err) {
//           Swal.fire("Error", "Error deleting data.", "error");
//         }
//       }
//     });
//   };

//   return (
//     <div className="flex flex-col h-full w-full p-4 bg-gray-100">
//       <div className="bg-[#2A3042] text-white text-lg font-semibold py-2 px-6 rounded-md w-full flex justify-between items-center">
//         <span><Navigation/></span>
//         <button
//           className="ml-3 bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700"
//           onClick={() => setShowForm(!showForm)}
//         >
//           {showForm ? "Close" : "Add"}
//         </button>
//       </div>

//       {showForm && (
//         <div className="mt-3 bg-white p-4 rounded-md shadow-md">
//           <DOGenerateForm onClose={() => setShowForm(false)} onSave={fetchOrders} editData={editData} />
//         </div>
//       )}

//       {loading && (
//         <div className="flex justify-center items-center h-64">
//           <Player autoplay loop src={loadingAnimation} className="w-48 h-48" />
//         </div>
//       )}

//       {error && <p className="text-red-500">{error}</p>}

//       {!loading && (
//         <div className="bg-white mt-3 w-full rounded-md shadow-md p-4 overflow-auto flex-1">
//           <table ref={tableRef} className="display w-full border border-gray-300 bg-white shadow-md rounded-md">
//             <thead>
//               <tr className="bg-gray-200 text-start">
//                 <th className="border p-2">ID</th>
//                 <th className="border p-2">Order Name</th>
//                 {!isMobile && <th className="border p-2">Customer</th>}
//                 {!isMobile && <th className="border p-2">Status</th>}
//                 <th className="border p-2">Actions</th>
//               </tr>
//             </thead>
//             <tbody>
//               {orders.map((order) => (
//                 <tr key={order.uuid} className="text-start hover:bg-gray-100">
//                   <td className="border p-2">{order.order_number}</td>
//                   <td className="border p-2">{order.orderName}</td>
//                   {!isMobile && <td className="border p-2">{order.customer}</td>}
//                   {!isMobile && <td className="border p-2">{order.status}</td>}
//                   <td className="border p-2 flex justify-center space-x-2">
//                     <Button
//                       onClick={() => setEditData(order)}
//                       className="bg-blue-500 text-white px-3 py-1 rounded-lg hover:bg-blue-700"
//                     >
//                       Edit
//                     </Button>
//                     <button
//                       onClick={() => handleDelete(order.uuid)}
//                       className="bg-red-500 text-white px-3 py-1 rounded-lg hover:bg-red-700"
//                     >
//                       Delete
//                     </button>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       )}
//     </div>
//   );
// };

// export default DOGeneratePage;



import React, { useState, useEffect, useRef } from "react";
import { Button } from "@material-tailwind/react";
import $ from "jquery";
import "datatables.net-dt/css/dataTables.dataTables.min.css";
import "datatables.net-dt";
import "datatables.net-buttons-dt/css/buttons.dataTables.min.css";
import "datatables.net-buttons-dt";
import { Player } from "@lottiefiles/react-lottie-player";
import loadingAnimation from "@/util/Animation.json";
import DOGenerateForm from "./DOGenerateForm";
import Navigation from "@/util/libs/navigation";
import Swal from "sweetalert2";

const URL = import.meta.env.VITE_API_BACK_URL;

const DOGeneratePage = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editData, setEditData] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const tableRef = useRef(null);

  useEffect(() => {
    fetchOrders();
  }, []);

  useEffect(() => {
    if (orders.length > 0 && tableRef.current) {
      $(tableRef.current).DataTable();
    }
  }, [orders]);

  const fetchOrders = async () => {
    try {
      const response = await fetch(`${URL}/api/do`);
      if (!response.ok) throw new Error("Failed to fetch data");
      const data = await response.json();
      setOrders(data || []);
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
          const response = await fetch(`${URL}/api/do/${uuid}`, { method: "DELETE" });
          if (response.ok) {
            Swal.fire("Deleted!", "Order deleted successfully!", "success");
            fetchOrders();
          } else {
            Swal.fire("Error", "Failed to delete order.", "error");
          }
        } catch (err) {
          Swal.fire("Error", "Error deleting data.", "error");
        }
      }
    });
  };

  return (
    <div className="flex flex-col h-full w-full p-4 bg-gray-100">
      <div className="bg-[#2A3042] text-white text-lg font-semibold py-2 px-6 rounded-md w-full flex justify-between items-center">
        <span><Navigation/></span>
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

      {loading && (
        <div className="flex justify-center items-center h-64">
          <Player autoplay loop src={loadingAnimation} className="w-48 h-48" />
        </div>
      )}

      {error && <p className="text-red-500">{error}</p>}

      {!loading && (
        <div className="bg-white mt-3 w-full rounded-md shadow-md p-4 overflow-auto flex-1">
          <table ref={tableRef} className="display w-full border border-gray-300 bg-white shadow-md rounded-md">
            <thead>
              <tr className="bg-gray-200 text-start">
                <th className="border p-2">Sr. No.</th>
                <th className="border p-2">D.O. No.</th>
                <th className="border p-2">Base Godown</th>
                <th className="border p-2">D.O. Date</th>
                <th className="border p-2">Quota Validity Date</th>
                <th className="border p-2">Scheme</th>
                <th className="border p-2">Grain</th>
                <th className="border p-2">Quantity</th>
                <th className="border p-2">Action</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order, index) => (
                <tr key={order.uuid} className="text-start hover:bg-gray-100">
                  <td className="border p-2">{index + 1}</td>
                  <td className="border p-2">{order.do_number}</td>
                  <td className="border p-2">{order.base_godown}</td>
                  <td className="border p-2">{order.do_date}</td>
                  <td className="border p-2">{order.quota_validity_date}</td>
                  <td className="border p-2">{order.scheme}</td>
                  <td className="border p-2">{order.grain}</td>
                  <td className="border p-2">{order.quantity}</td>
                  <td className="border p-2 flex justify-center space-x-2">
                    <Button
                      onClick={() => setEditData(order)}
                      className="bg-blue-500 text-white px-3 py-1 rounded-lg hover:bg-blue-700"
                    >
                      Edit
                    </Button>
                    <button
                      onClick={() => handleDelete(order.uuid)}
                      className="bg-red-500 text-white px-3 py-1 rounded-lg hover:bg-red-700"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default DOGeneratePage;
