import React, { Suspense, lazy } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { Dashboard, Auth } from "@/layouts";

// Lazy loading components
const SignIn = lazy(() => import("./pages/auth/sign-in").then(module => ({ default: module.SignIn })));
const HomePage = lazy(() => import("./layouts/HomePage"));
const OwnerNamePage = lazy(() => import("./pages/dashboard/OwnerNamePage"));
const EmployeePage = lazy(() => import("./pages/dashboard/EmployeePage"));
const MSWCGodownPage = lazy(() => import("./pages/dashboard/MSWCGodown"));
const SubGodownPage = lazy(() => import("./pages/dashboard/SubGodownPage"));
const PackagingPage = lazy(() => import("./pages/dashboard/PackagingPage"));
const SchemePage = lazy(() => import("./pages/dashboard/SchemePage"));
const TruckPage = lazy(() => import("./pages/dashboard/TruckPage"));
const DriverPage = lazy(() => import("./pages/dashboard/DriverPage"));
const Notifications = lazy(() => import("./pages/dashboard").then(module => ({ default: module.Notifications })));
const GrainPage = lazy(() => import("./pages/dashboard/GrainPage"));
const CategoryPage = lazy(() => import("./pages/dashboard/CategoryPage"));
const DOGeneratePage = lazy(() => import("./pages/dashboard/DOGeneratePage"));
const DOAllocationPage = lazy(() => import("./pages/dashboard/DOAllocationPage"));
const FirstTransport = lazy(() => import("@/pages/dashboard/FirstTransport"));
const FirstTapa = lazy(() => import("./pages/dashboard/FirstTapa"));
const FirstTapaReport = lazy(() => import("./pages/dashboard/FirstTapaReport"));

// Loading Fallback Component
const PageLoader = () => (
  <div className="flex h-screen w-full items-center justify-center">
    <div className="h-12 w-12 animate-spin rounded-full border-4 border-blue-500 border-t-transparent" />
  </div>
);

function PrivateRoute({ children }) {
  const token = localStorage.getItem("token");

  if (!token) {
    return <Navigate to="/auth/sign-in" replace />;
  }

  return children;
}

function App() {
  return (
    <Suspense fallback={<PageLoader />}>
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
    </Suspense>
  );
}

export default App;
