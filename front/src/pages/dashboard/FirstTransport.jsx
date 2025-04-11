import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Tooltip } from "@material-tailwind/react";
import "../../../src/widgets/cards/card-styles.css"; // Import our custom styles

const FirstTransport = () => {
  const navigate = useNavigate();
  const [hoveredCard, setHoveredCard] = useState(null);

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
          <Tooltip content="Create and manage First Transport Orders">
            <div
              onMouseEnter={() => setHoveredCard("order")}
              onMouseLeave={() => setHoveredCard(null)}
              onClick={handleFirstTransportOrder}
              className="relative overflow-hidden rounded-xl backdrop-blur-sm cursor-pointer 
                       border border-gray-200 transition-all duration-300
                       hover:shadow-lg hover:shadow-blue-100/40 hover:transform hover:scale-[1.02]"
            >
              {/* Background gradient with reduced opacity */}
              <div className="absolute inset-0 opacity-10 bg-gradient-to-r from-blue-500 to-indigo-600"></div>
              
              {/* Glass effect overlay */}
              <div className="absolute inset-0 bg-white/80 dark:bg-gray-900/80 backdrop-blur-[2px]"></div>
              
              <div className="relative z-10 p-6">
                <div className="flex items-center gap-4 mb-4">
                  <div className={`
                    w-14 h-14 grid place-items-center rounded-lg shadow-lg
                    bg-gradient-to-tr from-blue-600 to-blue-400
                    transition-transform duration-300 ${hoveredCard === "order" ? 'transform -translate-y-1' : ''}
                  `}>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 text-white">
                      <path d="M3.375 4.5C2.339 4.5 1.5 5.34 1.5 6.375V13.5h12V6.375c0-1.036-.84-1.875-1.875-1.875h-8.25zM13.5 15h-12v2.625c0 1.035.84 1.875 1.875 1.875h8.25c1.035 0 1.875-.84 1.875-1.875V15z" />
                      <path d="M8.25 19.5a1.5 1.5 0 10-3 0 1.5 1.5 0 003 0zM15.75 6.75a.75.75 0 00-.75.75v11.25c0 .087.015.17.042.248a3 3 0 005.958.464c.853-.175 1.522-.935 1.464-1.883a18.659 18.659 0 00-3.732-10.104 1.837 1.837 0 00-1.47-.725H15.75z" />
                      <path d="M19.5 19.5a1.5 1.5 0 10-3 0 1.5 1.5 0 003 0z" />
                    </svg>
                  </div>
                  <div>
                    <h2 className={`text-xl font-bold ${hoveredCard === "order" ? 'text-blue-600' : 'text-gray-800'} transition-colors duration-300`}>
                      First Transport Order
                    </h2>
                    <p className="text-gray-600 mt-1">Create new First Transport Order</p>
                  </div>
                </div>
                
                {/* Animated border on hover */}
                <div 
                  className={`h-1 bg-gradient-to-r from-blue-400 to-indigo-500 rounded-full transition-all duration-300 ${
                    hoveredCard === "order" ? 'w-full opacity-100' : 'w-0 opacity-0'
                  }`}
                ></div>
              </div>
              
              {/* Highlight border on hover */}
              <div className={`
                absolute inset-0 border-2 rounded-xl pointer-events-none
                transition-opacity duration-300
                ${hoveredCard === "order" ? 'opacity-100' : 'opacity-0'}
                border-blue-400/50
              `}></div>
            </div>
          </Tooltip>

          {/* First Transport Report Card */}
          <Tooltip content="View and analyze First Transport Reports">
            <div
              onMouseEnter={() => setHoveredCard("report")}
              onMouseLeave={() => setHoveredCard(null)}
              onClick={handleFirstTransportReport}
              className="relative overflow-hidden rounded-xl backdrop-blur-sm cursor-pointer 
                       border border-gray-200 transition-all duration-300
                       hover:shadow-lg hover:shadow-green-100/40 hover:transform hover:scale-[1.02]"
            >
              {/* Background gradient with reduced opacity */}
              <div className="absolute inset-0 opacity-10 bg-gradient-to-r from-green-500 to-teal-500"></div>
              
              {/* Glass effect overlay */}
              <div className="absolute inset-0 bg-white/80 dark:bg-gray-900/80 backdrop-blur-[2px]"></div>
              
              <div className="relative z-10 p-6">
                <div className="flex items-center gap-4 mb-4">
                  <div className={`
                    w-14 h-14 grid place-items-center rounded-lg shadow-lg
                    bg-gradient-to-tr from-green-600 to-green-400
                    transition-transform duration-300 ${hoveredCard === "report" ? 'transform -translate-y-1' : ''}
                  `}>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 text-white">
                      <path fillRule="evenodd" d="M5.625 1.5H9a3.75 3.75 0 013.75 3.75v1.875c0 1.036.84 1.875 1.875 1.875H16.5a3.75 3.75 0 013.75 3.75v7.875c0 1.035-.84 1.875-1.875 1.875H5.625a1.875 1.875 0 01-1.875-1.875V3.375c0-1.036.84-1.875 1.875-1.875zm5.845 17.03a.75.75 0 001.06 0l3-3a.75.75 0 10-1.06-1.06l-1.72 1.72V12a.75.75 0 00-1.5 0v4.19l-1.72-1.72a.75.75 0 00-1.06 1.06l3 3z" clipRule="evenodd" />
                      <path d="M14.25 5.25a5.23 5.23 0 00-1.279-3.434 9.768 9.768 0 016.963 6.963A5.23 5.23 0 0016.5 7.5h-1.875a.375.375 0 01-.375-.375V5.25z" />
                    </svg>
                  </div>
                  <div>
                    <h2 className={`text-xl font-bold ${hoveredCard === "report" ? 'text-green-600' : 'text-gray-800'} transition-colors duration-300`}>
                      First Transport Report
                    </h2>
                    <p className="text-gray-600 mt-1">
                      View and analyze First Transport Reports
                    </p>
                  </div>
                </div>
                
                {/* Animated border on hover */}
                <div 
                  className={`h-1 bg-gradient-to-r from-green-400 to-teal-500 rounded-full transition-all duration-300 ${
                    hoveredCard === "report" ? 'w-full opacity-100' : 'w-0 opacity-0'
                  }`}
                ></div>
              </div>
              
              {/* Highlight border on hover */}
              <div className={`
                absolute inset-0 border-2 rounded-xl pointer-events-none
                transition-opacity duration-300
                ${hoveredCard === "report" ? 'opacity-100' : 'opacity-0'}
                border-green-400/50
              `}></div>
            </div>
          </Tooltip>
        </div>
      </div>
    </div>
  );
};

export default FirstTransport; 