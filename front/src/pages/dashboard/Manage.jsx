import { Outlet } from "react-router-dom"; // Ensure Outlet is imported

const Manage = () => {
  return (
    <div>
      <Outlet /> {/* This ensures subpages are rendered inside Manage */}
    </div>
  );
};

export default Manage;
