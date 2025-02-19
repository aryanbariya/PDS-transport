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

// import React, { useState } from "react";
// import { Routes, Route, Navigate } from "react-router-dom";
// import HomePage from "./layouts/HomePage";
// import SignIn  from "./pages/auth/sign-in";  // Your SignIn component
// import SignUp  from "./pages/auth/sign-up";  // Your SignUp component
// import Dashboard  from "./layouts/dashboard";  // Your Dashboard


// const App = () => {
//   const [user, setUser] = useState(null); // Authentication state

//   return (
//     <Routes>
//       <Route path="*" element={<HomePage />} />
//       <Route path="/signin" element={<SignIn setUser={setUser} />} />
//       <Route path="/signup" element={<SignUp />} />
//       <Route path="/dashboard" element={user ? <Dashboard /> : <Navigate to="/signin" />} />
//     </Routes>
//   );
// };

// export default App;
