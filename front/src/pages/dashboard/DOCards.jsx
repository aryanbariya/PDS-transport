import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Tooltip } from "@material-tailwind/react";
import "../../../src/widgets/cards/card-styles.css"; // Import our custom styles

const DOCards = () => {
  const navigate = useNavigate();
  const [hoveredCard, setHoveredCard] = useState(null);

  const handleGenerateDO = () => {
    const token = localStorage.getItem("token");
    if (token) {
      navigate("/dashboard/DOGeneratePage");
    } else {
      navigate("/auth/sign-in");
    }
  };

  const handleAllocateDO = () => {
    const token = localStorage.getItem("token");
    if (token) {
      navigate("/dashboard/DOAllocationPage");
    } else {
      navigate("/auth/sign-in");
    }
  };

  return (
    <div className="p-8">
      <div className="max-w-4xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* DO Generate Card */}
          <Tooltip content="Create new Delivery Orders">
            <div
              onMouseEnter={() => setHoveredCard("generate")}
              onMouseLeave={() => setHoveredCard(null)}
              onClick={handleGenerateDO}
              className="relative overflow-hidden rounded-xl backdrop-blur-sm cursor-pointer 
                       border border-gray-200 transition-all duration-300
                       hover:shadow-lg hover:shadow-purple-100/40 hover:transform hover:scale-[1.02]"
            >
              {/* Background gradient with reduced opacity */}
              <div className="absolute inset-0 opacity-10 bg-gradient-to-r from-amber-500 to-yellow-600"></div>
              
              {/* Glass effect overlay */}
              <div className="absolute inset-0 bg-white/80 dark:bg-gray-900/80 backdrop-blur-[2px]"></div>
              
              <div className="relative z-10 p-6">
                <div className="flex items-center gap-4 mb-4">
                  <div className={`
                    w-14 h-14 grid place-items-center rounded-lg shadow-lg
                    bg-gradient-to-tr from-amber-600 to-amber-400
                    transition-transform duration-300 ${hoveredCard === "generate" ? 'transform -translate-y-1' : ''}
                  `}>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 text-white">
                      <path fillRule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zM12.75 9a.75.75 0 00-1.5 0v2.25H9a.75.75 0 000 1.5h2.25V15a.75.75 0 001.5 0v-2.25H15a.75.75 0 000-1.5h-2.25V9z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div>
                    <h2 className={`text-xl font-bold ${hoveredCard === "generate" ? 'text-amber-600' : 'text-gray-800'} transition-colors duration-300`}>
                      DO Generate
                    </h2>
                    <p className="text-gray-600 mt-1">Create new Delivery Order</p>
                  </div>
                </div>
                
                {/* Animated border on hover */}
                <div 
                  className={`h-1 bg-gradient-to-r from-amber-400 to-yellow-500 rounded-full transition-all duration-300 ${
                    hoveredCard === "generate" ? 'w-full opacity-100' : 'w-0 opacity-0'
                  }`}
                ></div>
              </div>
              
              {/* Highlight border on hover */}
              <div className={`
                absolute inset-0 border-2 rounded-xl pointer-events-none
                transition-opacity duration-300
                ${hoveredCard === "generate" ? 'opacity-100' : 'opacity-0'}
                border-purple-400/50
              `}></div>
            </div>
          </Tooltip>

          {/* DO Allocation Card */}
          <Tooltip content="Allocation and assignment for Delivery Orders">
            <div
              onMouseEnter={() => setHoveredCard("allocation")}
              onMouseLeave={() => setHoveredCard(null)}
              onClick={handleAllocateDO}
              className="relative overflow-hidden rounded-xl backdrop-blur-sm cursor-pointer 
                       border border-gray-200 transition-all duration-300
                       hover:shadow-lg hover:shadow-amber-100/40 hover:transform hover:scale-[1.02]"
            >
              {/* Background gradient with reduced opacity */}
              <div className="absolute inset-0 opacity-10 bg-gradient-to-r from-amber-500 to-yellow-400"></div>
              
              {/* Glass effect overlay */}
              <div className="absolute inset-0 bg-white/80 dark:bg-gray-900/80 backdrop-blur-[2px]"></div>
              
              <div className="relative z-10 p-6">
                <div className="flex items-center gap-4 mb-4">
                  <div className={`
                    w-14 h-14 grid place-items-center rounded-lg shadow-lg
                    bg-gradient-to-tr from-amber-600 to-amber-400
                    transition-transform duration-300 ${hoveredCard === "allocation" ? 'transform -translate-y-1' : ''}
                  `}>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 text-white">
                      <path d="M11.644 1.59a.75.75 0 01.712 0l9.75 5.25a.75.75 0 010 1.32l-9.75 5.25a.75.75 0 01-.712 0l-9.75-5.25a.75.75 0 010-1.32l9.75-5.25z" />
                      <path d="M3.265 10.602l7.668 4.129a2.25 2.25 0 002.134 0l7.668-4.13 1.37.739a.75.75 0 010 1.32l-9.75 5.25a.75.75 0 01-.71 0l-9.75-5.25a.75.75 0 010-1.32l1.37-.738z" />
                      <path d="M10.933 19.231l-7.668-4.13-1.37.739a.75.75 0 000 1.32l9.75 5.25c.221.12.489.12.71 0l9.75-5.25a.75.75 0 000-1.32l-1.37-.738-7.668 4.13a2.25 2.25 0 01-2.134-.001z" />
                    </svg>
                  </div>
                  <div>
                    <h2 className={`text-xl font-bold ${hoveredCard === "allocation" ? 'text-amber-600' : 'text-gray-800'} transition-colors duration-300`}>
                      DO Allocation
                    </h2>
                    <p className="text-gray-600 mt-1">
                      Allocation and Assignment for active Delivery Orders
                    </p>
                  </div>
                </div>
                
                {/* Animated border on hover */}
                <div 
                  className={`h-1 bg-gradient-to-r from-amber-400 to-yellow-500 rounded-full transition-all duration-300 ${
                    hoveredCard === "allocation" ? 'w-full opacity-100' : 'w-0 opacity-0'
                  }`}
                ></div>
              </div>
              
              {/* Highlight border on hover */}
              <div className={`
                absolute inset-0 border-2 rounded-xl pointer-events-none
                transition-opacity duration-300
                ${hoveredCard === "allocation" ? 'opacity-100' : 'opacity-0'}
                border-amber-400/50
              `}></div>
            </div>
          </Tooltip>
        </div>
      </div>
    </div>
  );
};

export default DOCards;
