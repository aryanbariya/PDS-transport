import { Routes, Route, Navigate } from "react-router-dom";
import { Dashboard, Auth } from "@/layouts";
import { SignIn } from "./pages/auth/sign-in";
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
import DOGeneratePage from "./pages/dashboard/DOGeneratePage";
import DOAllocationPage from "./pages/dashboard/DOAllocationPage";
import FirstTransport from "@/pages/dashboard/FirstTransport";

function PrivateRoute({ children }) {
  const token = localStorage.getItem("token");

  if (!token) {
    return <Navigate to="/auth/sign-in" replace />;
  }

  return children;
}

function App() {
  return (
    <Routes>
      {/* Authentication Routes */}
      <Route path="/auth/*" element={<Auth />} />
      <Route path="/auth/sign-in" element={<SignIn />} />

      {/* Private Dashboard Routes */}
      <Route path="/dashboard/*" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
      <Route path="/owners" element={<PrivateRoute><OwnerNamePage /></PrivateRoute>} />
      <Route path="/employee" element={<PrivateRoute><EmployeePage /></PrivateRoute>} />
      <Route path="/mswc" element={<PrivateRoute><MSWCGodownPage /></PrivateRoute>} />
      <Route path="/godown" element={<PrivateRoute><SubGodownPage /></PrivateRoute>} />
      <Route path="/driver" element={<PrivateRoute><DriverPage /></PrivateRoute>} />
      <Route path="/truck" element={<PrivateRoute><TruckPage /></PrivateRoute>} />
      <Route path="/scheme" element={<PrivateRoute><SchemePage /></PrivateRoute>} />
      <Route path="/packaging" element={<PrivateRoute><PackagingPage /></PrivateRoute>} />
      <Route path="/notifications" element={<PrivateRoute><Notifications /></PrivateRoute>} />
      <Route path="/HomePage/*" element={<PrivateRoute><HomePage /></PrivateRoute>} />
      <Route path="/grain/*" element={<PrivateRoute><GrainPage /></PrivateRoute>} />
      <Route path="/category/*" element={<PrivateRoute><CategoryPage /></PrivateRoute>} />

      {/* First Transport Route */}
      <Route path="/firstTransport" element={<PrivateRoute><Dashboard><FirstTransport /></Dashboard></PrivateRoute>} />

      {/* DO Related Routes */}
      <Route path="/DOGeneratePage" element={<PrivateRoute><Dashboard><DOGeneratePage /></Dashboard></PrivateRoute>} />
      <Route path="/DOAllocationPage" element={<PrivateRoute><Dashboard><DOAllocationPage /></Dashboard></PrivateRoute>} />

      {/* Redirect to Sign-In by default if no valid route */}
      <Route path="*" element={<Navigate to="/auth/sign-in" replace />} />
    </Routes>
  );
}

export default App;
