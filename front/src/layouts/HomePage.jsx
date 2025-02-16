import React from "react";

const HomePage = () => {
  return (
    <div className="flex flex-col h-screen bg-gray-100">
      {/* Navbar */}
      <div className="w-full bg-white p-4 shadow-md flex justify-between items-center">
        <h1 className="text-2xl font-bold">PDS</h1>
        <div>
          <button className="px-4 py-2 bg-blue-500 text-white rounded-md mr-2">Sign In</button>
          <button className="px-4 py-2 bg-green-500 text-white rounded-md">Sign Up</button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex flex-1 p-6 justify-between">
        {/* Notice Section */}
        <div className="w-1/4 bg-white p-4 shadow-md rounded-lg">
          <h3 className="text-lg font-bold mb-2">Notices</h3>
          <ul>
            <li className="border-b py-2">Notice 1: Important update</li>
            <li className="border-b py-2">Notice 2: Upcoming event</li>
            <li className="py-2">Notice 3: Maintenance alert</li>
          </ul>
        </div>

        {/* Latest Updates/Schemes Section */}
        <div className="w-1/4 bg-white p-4 shadow-md rounded-lg">
          <h3 className="text-lg font-bold mb-2">Latest Updates/Schemes</h3>
          <ul>
            <li className="border-b py-2">Scheme 1: New subsidy</li>
            <li className="border-b py-2">Scheme 2: Government support</li>
            <li className="py-2">Scheme 3: Registration open</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
