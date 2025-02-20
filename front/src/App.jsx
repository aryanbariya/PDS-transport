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

function App() {
  return (
    <Routes>
      
      <Route path="/dashboard/*" element={<Dashboard />} />
      <Route path="/auth/*" element={<Auth />} />
      <Route path="*" element={<Navigate to="/dashboard" replace />} />
      <Route path="/HomePage/*" element={<HomePage />} />
      <Route path="/owners" element={<OwnerNamePage />} />
      <Route path="/employee" element={<EmployeePage />} />
      <Route path="/mswc" element={<MSWCGodownPage />} />
      <Route path="/godown" element={<SubGodownPage />} />
      <Route path="/driver" element={<Dashboard />} />
      <Route path="/truck" element={<TruckPage />} />
      <Route path="/scheme" element={<SchemePage />} />
      <Route path="/packaging" element={<PackagingPage />} />
      
    </Routes>
  );
}

export default App;



