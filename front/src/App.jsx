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
import FirstTapa from "./pages/dashboard/FirstTapa";
import FirstTapaReport from "./pages/dashboard/FirstTapaReport";

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

      {/* Dashboard Root Route */}
      <Route path="/dashboard/*" element={<PrivateRoute><Dashboard /></PrivateRoute>} />

      {/* All Dashboard Protected Routes - Using Dashboard Layout */}
      <Route path="/owners" element={<PrivateRoute><Dashboard><OwnerNamePage /></Dashboard></PrivateRoute>} />
      <Route path="/employee" element={<PrivateRoute><Dashboard><EmployeePage /></Dashboard></PrivateRoute>} />
      <Route path="/mswc" element={<PrivateRoute><Dashboard><MSWCGodownPage /></Dashboard></PrivateRoute>} />
      <Route path="/godown" element={<PrivateRoute><Dashboard><SubGodownPage /></Dashboard></PrivateRoute>} />
      <Route path="/driver" element={<PrivateRoute><Dashboard><DriverPage /></Dashboard></PrivateRoute>} />
      <Route path="/truck" element={<PrivateRoute><Dashboard><TruckPage /></Dashboard></PrivateRoute>} />
      <Route path="/scheme" element={<PrivateRoute><Dashboard><SchemePage /></Dashboard></PrivateRoute>} />
      <Route path="/packaging" element={<PrivateRoute><Dashboard><PackagingPage /></Dashboard></PrivateRoute>} />
      <Route path="/notifications" element={<PrivateRoute><Dashboard><Notifications /></Dashboard></PrivateRoute>} />
      <Route path="/HomePage/*" element={<PrivateRoute><Dashboard><HomePage /></Dashboard></PrivateRoute>} />
      <Route path="/grain/*" element={<PrivateRoute><Dashboard><GrainPage /></Dashboard></PrivateRoute>} />
      <Route path="/category/*" element={<PrivateRoute><Dashboard><CategoryPage /></Dashboard></PrivateRoute>} />

      {/* First Transport Route */}
      <Route path="/firstTransport" element={<PrivateRoute><Dashboard><FirstTransport /></Dashboard></PrivateRoute>} />
      <Route path="/firstTapa" element={<PrivateRoute><Dashboard><FirstTapa /></Dashboard></PrivateRoute>} />
      <Route path="/firstTapareport" element={<PrivateRoute><Dashboard><FirstTapaReport /></Dashboard></PrivateRoute>} />

      {/* DO Related Routes */}
      <Route path="/DOGeneratePage" element={<PrivateRoute><Dashboard><DOGeneratePage /></Dashboard></PrivateRoute>} />
      <Route path="/DOAllocationPage" element={<PrivateRoute><Dashboard><DOAllocationPage /></Dashboard></PrivateRoute>} />

      {/* Redirect to default dashboard */}
      <Route path="/" element={<Navigate to="/dashboard/home" replace />} />
      
      {/* Redirect to Sign-In by default if no valid route */}
      <Route path="*" element={<Navigate to="/auth/sign-in" replace />} />
    </Routes>
  );
}

export default App;
