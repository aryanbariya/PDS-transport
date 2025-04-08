import React from "react";
import { useNavigate } from "react-router-dom";

const FirstTransport = () => {
  const navigate = useNavigate();

  const handleFirstTransportOrder = () => {
    const token = localStorage.getItem("token");
    if (token) {
      navigate("/firstTapa");
    } else {
      navigate("/auth/sign-in");
    }
  };

  const handleFirstTransportReport = () => {
    const token = localStorage.getItem("token");
    if (token) {
      navigate("/firstTapareport");
    } else {
      navigate("/auth/sign-in");
    }
  };

  return (
    <div className="p-8">
      <div className="max-w-4xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* First Transport Order Card */}
          <div
            onClick={handleFirstTransportOrder}
            className="bg-white rounded-lg shadow-md p-6 cursor-pointer 
                     transition-all duration-300 hover:shadow-lg 
                     hover:scale-105 border-2 border-blue-100 hover:border-blue-200"
          >
            <div className="text-center">
              <h2 className="text-xl font-semibold text-blue-600 mb-3">
                First Transport Order
              </h2>
              <p className="text-gray-600">Create new First Transport Order</p>
            </div>
          </div>

          {/* First Transport Report Card */}
          <div
            onClick={handleFirstTransportReport}
            className="bg-white rounded-lg shadow-md p-6 cursor-pointer 
                     transition-all duration-300 hover:shadow-lg 
                     hover:scale-105 border-2 border-green-100 hover:border-green-200"
          >
            <div className="text-center">
              <h2 className="text-xl font-semibold text-green-600 mb-3">
                First Transport Report
              </h2>
              <p className="text-gray-600">
                View and manage First Transport Reports
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FirstTransport; 