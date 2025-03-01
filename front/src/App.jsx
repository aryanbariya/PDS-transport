import { Routes, Route, Navigate } from "react-router-dom";
import { Auth, Dashboard } from "@/layouts";
import HomePage from "./layouts/HomePage";
import OwnerNamePage from "./pages/dashboard/OwnerNamePage";
import EmployeePage from "./pages/dashboard/EmployeePage";
import MSWCGodownPage from "./pages/dashboard/MSWCGodown";
import SubGodownPage from "./pages/dashboard/SubGodownPage";
import PackagingPage from "./pages/dashboard/PackagingPage";
import SchemePage from "./pages/dashboard/SchemePage";
import TruckPage from "./pages/dashboard/TruckPage";
import DriverPage from "./pages/dashboard/DriverPage";
import { Notifications } from "./pages/dashboard";
import GrainPage from "./pages/dashboard/GrainPage";
import CategoryPage from "./pages/dashboard/CategoryPage";

function App() {
  return (
    <Routes>
      
      <Route path="/dashboard/*" element={<Dashboard />} />
      <Route path="/auth/*" element={<Auth />} />
      <Route path="*" element={<Navigate to="/dashboard" replace />} />
      <Route path="/owners" element={<OwnerNamePage />} />
      <Route path="/employee" element={<EmployeePage />} />
      <Route path="/mswc" element={<MSWCGodownPage />} />
      <Route path="/godown" element={<SubGodownPage />} />
      <Route path="/driver" element={<DriverPage />} />
      <Route path="/truck" element={<TruckPage />} />
      <Route path="/scheme" element={<SchemePage />} />
      <Route path="/packaging" element={<PackagingPage />} />
      <Route path="/notifications" element={<Notifications />} />
      <Route path="/HomePage/*" element={<HomePage />} />
      <Route path="/grain/*" element={<GrainPage />} />
      <Route path="/category/*" element={<CategoryPage />} />
      
    </Routes>
  );
}

export default App;

// import { Routes, Route, Navigate } from "react-router-dom";
// import { Dashboard } from "@/layouts";
// import { SignIn, SignUp } from "@/pages/auth";
// import HomePage from "./layouts/HomePage";
// import OwnerNamePage from "./pages/dashboard/OwnerNamePage";
// import EmployeePage from "./pages/dashboard/EmployeePage";
// import MSWCGodownPage from "./pages/dashboard/MSWCGodown";
// import SubGodownPage from "./pages/dashboard/SubGodownPage";
// import PackagingPage from "./pages/dashboard/PackagingPage";
// import SchemePage from "./pages/dashboard/SchemePage";
// import TruckPage from "./pages/dashboard/TruckPage";
// import DriverPage from "./pages/dashboard/DriverPage";

// function PrivateRoute({ element }) {
//   const isAuthenticated = !!localStorage.getItem("token"); // Check if user is logged in
//   return isAuthenticated ? element : <Navigate to="/auth/sign-in" replace />;
// }

// function App() {
//   return (
//     <Routes>
//       {/* Landing Page */}
//       <Route path="/" element={<HomePage />} />

//       {/* Auth Routes */}
//       <Route path="/auth/sign-in" element={<SignIn />} />
//       <Route path="/auth/sign-up" element={<SignUp />} />

//       {/* Protected Dashboard Routes */}
//       <Route path="/dashboard/*" element={<PrivateRoute element={<Dashboard />} />} />
//       <Route path="/owners" element={<PrivateRoute element={<OwnerNamePage />} />} />
//       <Route path="/employee" element={<PrivateRoute element={<EmployeePage />} />} />
//       <Route path="/mswc" element={<PrivateRoute element={<MSWCGodownPage />} />} />
//       <Route path="/godown" element={<PrivateRoute element={<SubGodownPage />} />} />
//       <Route path="/driver" element={<PrivateRoute element={<DriverPage />} />} />
//       <Route path="/truck" element={<PrivateRoute element={<TruckPage />} />} />
//       <Route path="/scheme" element={<PrivateRoute element={<SchemePage />} />} />
//       <Route path="/packaging" element={<PrivateRoute element={<PackagingPage />} />} />

//       {/* Redirect unknown routes to HomePage */}
//       <Route path="*" element={<Navigate to="/" replace />} />
//     </Routes>
//   );
// }

// export default App;
