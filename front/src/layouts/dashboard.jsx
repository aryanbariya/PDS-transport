// import { useState } from "react";
// import { Routes, Route } from "react-router-dom";
// import { Sidenav, DashboardNavbar, Footer } from "@/widgets/layout";
// import routes from "@/routes";

// export function Dashboard() {
//   const [openSidenav, setOpenSidenav] = useState(false);

//   return (
//     <div className="min-h-screen bg-blue-gray-50/50">
//       {/* Sidenav */}
//       <Sidenav open={openSidenav} setOpen={setOpenSidenav} routes={routes} />

//       {/* Main Content */}
//       <div className="p-4 xl:ml-80">
//         <DashboardNavbar setOpenSidenav={setOpenSidenav} />

//         {/* Routes */}
//         <Routes>
//           {routes.map(({ layout, pages }) =>
//             layout === "dashboard"
//               ? pages.map(({ path, element }) => (
//                   <Route key={path} exact path={path} element={element} />
//                 ))
//               : null
//           )}
//         </Routes>

//         {/* Footer */}
//         <div className="text-blue-gray-600">
//           <Footer />
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Dashboard;



// import { useState } from "react";
// import { Routes, Route } from "react-router-dom";
// import { Sidenav, DashboardNavbar, Footer } from "@/widgets/layout";
// import routes from "@/routes";

// export function Dashboard() {
//   const [openSidenav, setOpenSidenav] = useState(false);


//   return (
//     <div className="min-h-screen bg-blue-gray-50/50">
//       {/* Sidenav */}

//       <Sidenav open={openSidenav} setOpen={setOpenSidenav} routes={routes} />

//       {/* Main Content */}
//       <div className=" xl:ml-[260px] ">

//         <DashboardNavbar setOpenSidenav={setOpenSidenav} />

//         {/* Routes */}
//         <div  className="flex-1 mb-72">
//         <Routes>
//           {routes.map(({ layout, pages }) =>
//             pages.map(({ path, element, subPages }) => (
//               <Route key={path} path={path} element={element} />
//             ))
//           )}
//           {/* Add Subpage Routes */}
//           {routes.flatMap(({ layout, pages }) =>
//             pages.flatMap(({ subPages }) =>
//               subPages ? subPages.map(({ path, element }) => <Route key={path} path={path} element={element} />) : []
//             )
//           )}
//         </Routes>
//         </div>

//         {/* Footer */}
//         <div className="text-blue-gray-600 ">
//           <Footer />
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Dashboard;




// import { useState } from "react";
// import { Routes, Route } from "react-router-dom";
// import { Sidenav, DashboardNavbar, Footer } from "@/widgets/layout";
// import routes from "@/routes";

// export function Dashboard() {
//   const [openSidenav, setOpenSidenav] = useState(false);

//   return (
//     <div className="min-h-screen bg-blue-gray-50/50 flex">
//       {/* Sidebar - Sidenav */}
//       <Sidenav open={openSidenav} setOpen={setOpenSidenav} routes={routes} />

//       {/* Main Content Wrapper */}
//       <div className="flex flex-col w-full xl:ml-[260px] min-h-screen">

//         {/* Fixed Navbar */}
//         <div className="fixed top-0 left-0 xl:left-[260px] md:z-0 w-full xl:w-[calc(100%-260px)] bg-white   shadow-md ">
//           <DashboardNavbar setOpenSidenav={setOpenSidenav} />
//         </div>

//         {/* Scrollable Content */}
//         <div className="mt-[64px]  overflow-auto p-4 h-[calc(100vh-80px)]">
//           <Routes>
//             {routes.map(({ layout, pages }) =>
//               pages.map(({ path, element, subPages }) => (
//                 <Route key={path} path={path} element={element} />
//               ))
//             )}
//             {routes.flatMap(({ layout, pages }) =>
//               pages.flatMap(({ subPages }) =>
//                 subPages ? subPages.map(({ path, element }) => <Route key={path} path={path} element={element} />) : []
//               )
//             )}
//           </Routes>
//         </div>

//         {/* Footer */}
//         <Footer />
//       </div>
//     </div>
//   );
// }

// export default Dashboard;


// import { useState } from "react";
// import { Routes, Route } from "react-router-dom";
// import { Sidenav, DashboardNavbar, Footer } from "@/widgets/layout";
// import routes from "@/routes";

// export function Dashboard() {
//   const [openSidenav, setOpenSidenav] = useState(false);

//   return (
//     <div className="min-h-screen bg-blue-gray-50/50 flex">
//       {/* Sidebar - Sidenav */}
//       <Sidenav open={openSidenav} setOpen={setOpenSidenav} routes={routes} />

//       {/* Main Content Wrapper */}
//       <div className="flex flex-col w-full xl:ml-[260px] min-h-screen">

//         {/* Fixed Navbar */}
//         <div className="fixed top-0 left-0 xl:left-[260px] w-full xl:w-[calc(100%-260px)] bg-white shadow-md h-16 z-40">
//           <DashboardNavbar setOpenSidenav={setOpenSidenav} />
//         </div>

//         {/* Scrollable Content */}
//         <div className="pt-20 overflow-y-auto h-[calc(100vh-64px)] p-4">
//           <Routes>
//             {routes.map(({ layout, pages }) =>
//               pages.map(({ path, element, subPages }) => (
//                 <Route key={path} path={path} element={element} />
//               ))
//             )}
//             {routes.flatMap(({ layout, pages }) =>
//               pages.flatMap(({ subPages }) =>
//                 subPages ? subPages.map(({ path, element }) => <Route key={path} path={path} element={element} />) : []
//               )
//             )}
//           </Routes>
//         </div>

//         {/* Footer */}
//         <Footer />
//       </div>
//     </div>
//   );
// }

// export default Dashboard;



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
  const location = useLocation(); // Get the current route

  // const { pathname } = useLocation();


  // Check if the current route corresponds to "dashboard"
  const isDashboard = routes.some(({ pages }) => {
    return pages.some(({ name, path }) => {
      return name === "dashboard" && location.pathname === "/dashboard/home";
    });
  });
  // const path = location.pathname.startsWith("/")
  // ? location.pathname.substring(1)
  // : location.pathname;


  return (
    <div className="min-h-screen bg-blue-gray-50/50 flex ">
      {/* Sidebar - Sidenav */}
      <Sidenav open={openSidenav} setOpen={setOpenSidenav} routes={routes} />

      {/* Main Content Wrapper */}
      <div className="flex flex-col w-full xl:ml-[260px] min-h-screen ">

        {/* Fixed Navbar */}
        <div className="fixed top-0 left-0 xl:left-[260px] w-full xl:w-[calc(100%-260px)] bg-white shadow-md h-16 z-40">
          <DashboardNavbar setOpenSidenav={setOpenSidenav} />
        </div>

        {/* Routes Container - Fixed if Dashboard, Scrollable otherwise */}
        <div
          className={`mt-20 md:mt-5 pt-16 p-4 flex-1  h-[calc(100vh-64px)] ${isDashboard ? "" : "overflow-hidden"
            }`}
        >
          <Routes>
            {routes.map(({ layout, pages }) =>
              pages.map(({ path, element, name }) => (
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
        {/* Footer */}
        <Footer />
      </div>
    </div>
  );
}

export default Dashboard;



