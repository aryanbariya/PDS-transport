// import { Routes, Route, Navigate } from "react-router-dom";
// import { Auth, Dashboard } from "@/layouts";
// import HomePage from "./layouts/HomePage";

// function App() {
//   return (
//     <Routes>
//       <Route path="/dashboard/*" element={<Dashboard />} />
//       <Route path="/auth/*" element={<Auth />} />
//       <Route path="*" element={<Navigate to="/dashboard" replace />} />
//       <Route path="/HomePage/*" element={<HomePage />} />
//     </Routes>
//   );
// }

// export default App;

// // import React, { useState } from "react";
// // import { Routes, Route, Navigate } from "react-router-dom";
// // import HomePage from "./layouts/HomePage";
// // import SignIn  from "./pages/auth/sign-in";  // Your SignIn component
// // import SignUp  from "./pages/auth/sign-up";  // Your SignUp component
// // import Dashboard  from "./layouts/dashboard";  // Your Dashboard


// // const App = () => {
// //   const [user, setUser] = useState(null); // Authentication state

// //   return (
// //     <Routes>
// //       <Route path="*" element={<HomePage />} />
// //       <Route path="/signin" element={<SignIn setUser={setUser} />} />
// //       <Route path="/signup" element={<SignUp />} />
// //       <Route path="/dashboard" element={user ? <Dashboard /> : <Navigate to="/signin" />} />
// //     </Routes>
// //   );
// // };

// // export default App;


import { Routes, Route, Navigate } from "react-router-dom";
import { Auth, Dashboard } from "@/layouts";
import HomePage from "./layouts/HomePage";

// Import all new pages
import OwnerNamePage from "../src/pages/dashboard/OwnerNamePage";
import EmployeePage from "../src/pages/dashboard/EmployeePage";
import MSWCGodownPage from "../src/pages/dashboard/MSWCGodown";
import SubGodownPage from "../src/pages/dashboard/SubGodownPage";
import CategoryPage from "../src/pages/dashboard/CategoryPage";
import TruckPage from "../src/pages/dashboard/TruckPage";
import SchemePage from "../src/pages/dashboard/SchemePage";
import PackagingPage from "../src/pages/dashboard/PackagingPage";

function App() {
  return (
    <Routes>
      <Route path="/dashboard/*" element={<Dashboard />} />
      <Route path="/auth/*" element={<Auth />} />
      <Route path="/HomePage/*" element={<HomePage />} />
      
      {/* Add new routes for statistics card pages */}
      <Route path="../src/pages/dashboard/OwnerNamePage" element={<EmployeePage />} />
      <Route path="../src/pages/dashboard/EmployeePage"element={<OwnerNamePage />} />
      <Route path="../src/pages/dashboard/MSWCGodown" element={<MSWCGodownPage />} />
      <Route path="../src/pages/dashboard/SubGodownPage" element={<SubGodownPage />} />
      <Route path="../src/pages/dashboard/CategoryPage" element={<CategoryPage />} />
      <Route path="../src/pages/dashboard/TruckPage" element={<TruckPage />} />
      <Route path="../src/pages/dashboard/SchemePage" element={<SchemePage />} />
      <Route path="../src/pages/dashboard/PackagingPage" element={<PackagingPage />} />

      <Route path="*" element={<Navigate to="/dashboard" replace />} />
    </Routes>
  );
}

export default App;

