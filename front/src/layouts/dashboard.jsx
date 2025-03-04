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
//       <div className="p-4 xl:ml-72">
//         <DashboardNavbar setOpenSidenav={setOpenSidenav} />

//         {/* Routes */}
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
//         {/* Footer */}
//         <div className="text-blue-gray-600">
//           <Footer />
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Dashboard;


import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import { Sidenav, DashboardNavbar, Footer } from "@/widgets/layout";
import routes from "@/routes";

export function Dashboard() {
  const [openSidenav, setOpenSidenav] = useState(false);
  const [collapsed, setCollapsed] = useState(false); // Added state to collapse sidenav
  

  return (
    <div className="min-h-screen bg-blue-gray-50/50">
      {/* Sidenav */}
      <Sidenav open={openSidenav} setOpen={setOpenSidenav} collapsed={collapsed} setCollapsed={setCollapsed} routes={routes} />

      {/* Main Content */}
      <div className={`p-4 transition-all duration-300 ${collapsed ? "ml-[100px]" : "ml-72"}`}>
        <DashboardNavbar setOpenSidenav={setOpenSidenav} collapsed={collapsed} setCollapsed={setCollapsed} />

        {/* Routes */}
        <Routes>
          {routes.map(({ layout, pages }) =>
            pages.map(({ path, element, subPages }) => (
              <Route key={path} path={path} element={element} />
            ))
          )}
          {/* Add Subpage Routes */}
          {routes.flatMap(({ layout, pages }) =>
            pages.flatMap(({ subPages }) =>
              subPages ? subPages.map(({ path, element }) => <Route key={path} path={path} element={element} />) : []
            )
          )}
        </Routes>
        {/* Footer */}
        <div className="text-blue-gray-600">
          <Footer />
        </div>
      </div>
    </div>
  );
}

export default Dashboard;



