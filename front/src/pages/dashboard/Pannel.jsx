import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const [data, setData] = useState({
    owners: 0,
    employees: 0,
    mswc: 0,
    godown: 0,
    drivers: 0,
    trucks: 0,
  });

  const navigate = useNavigate(); // Hook for navigation

  const fetchData = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/dashboard");
      setData(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
    const interval = setInterval(fetchData, 5000);
    return () => clearInterval(interval);
  }, []);

  // Define paths for each category
  const pageRoutes = {
    owners: "/dashboard/OwnerNamePage",
    employees: "/dashboard/EmployeePage",
    mswc: "/dashboard/MSWCGodown",
    godown: "/dashboard/SubGodownPage",
    drivers: "/dashboard/GrainPage",
    // trucks: "/dashboard/trucks",
  };

  return (
    <div className="flex justify-center space-x-4 p-4 bg-gray-100 min-h-screen">
      {Object.keys(data).map((key) => (
        <div
          key={key}
          className="p-4 bg-white shadow-md rounded-lg w-40 text-center cursor-pointer hover:bg-gray-200 transition duration-200"
          onClick={() => navigate(pageRoutes[key])} // Navigate to respective page
        >
          <h3 className="text-gray-500 font-semibold">{key.toUpperCase()}</h3>
          <p className="text-2xl font-bold">{data[key]}</p>
        </div>
      ))}
    </div>
  );
};

export default Dashboard;
