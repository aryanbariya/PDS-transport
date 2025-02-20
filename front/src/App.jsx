import { Routes, Route, Navigate } from "react-router-dom";
import { Auth, Dashboard } from "@/layouts";
import HomePage from "./layouts/HomePage";

function App() {
  return (
    <Routes>
      
      <Route path="/dashboard/*" element={<Dashboard />} />
      <Route path="/auth/*" element={<Auth />} />
      <Route path="*" element={<Navigate to="/dashboard" replace />} />
      <Route path="/HomePage/*" element={<HomePage />} />
    </Routes>
  );
}

export default App;



