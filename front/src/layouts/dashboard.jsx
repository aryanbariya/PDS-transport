import { useState } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { Sidenav, DashboardNavbar, Footer } from "@/widgets/layout";
import routes from "@/routes";
import {
  Navbar,
  Typography,
  Button,
  Input,
  IconButton,
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
  Avatar,
} from "@material-tailwind/react"

export function Dashboard() {
  const [openSidenav, setOpenSidenav] = useState(false);
  const location = useLocation();

  return (
    <div className="min-h-screen bg-blue-gray-50/50 flex">
      {/* Fixed Sidebar */}
      <div className="fixed top-0 left-0 h-full z-50">
        <Sidenav open={openSidenav} setOpen={setOpenSidenav} routes={routes} />
      </div>

      {/* Main Content Wrapper */}
      <div className="flex flex-col w-full xl:w-[calc(100%-260px)] xl:ml-[260px] min-h-screen">
        {/* Fixed Navbar */}
        <div className="fixed top-0 left-0 xl:left-[260px] w-full xl:w-[calc(100%-260px)] bg-white shadow-md h-16 z-40">
          <DashboardNavbar setOpenSidenav={setOpenSidenav} />
        </div>

        {/* Scrollable Content */}
        <div className="mt-20 p-4 flex-1 overflow-y-auto">
          <Routes>
            {routes.map(({ layout, pages }) =>
              pages.map(({ path, element }) => (
                <Route key={path} path={path} element={element} />
              ))
            )}
            {routes.flatMap(({ layout, pages }) =>
              pages.flatMap(({ subPages }) =>
                subPages ? subPages.map(({ path, element }) => <Route key={path} path={path} element={element} />) : []
              )
            )}
          </Routes>
        </div>

        {/* Fixed Footer */}
        <div className="fixed bottom-0 left-0 xl:left-[260px] w-full xl:w-[calc(100%-260px)] bg-white shadow-md z-40">
          <Footer />
        </div>
      </div>
    </div>
  );
}

export default Dashboard;



