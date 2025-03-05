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



import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import { Sidenav, DashboardNavbar, Footer } from "@/widgets/layout";
import routes from "@/routes";

export function Dashboard() {
  const [openSidenav, setOpenSidenav] = useState(false);
  

  return (
    <div className="min-h-screen bg-blue-gray-50/50">
      {/* Sidenav */}
      
      <Sidenav open={openSidenav} setOpen={setOpenSidenav} routes={routes} />

      {/* Main Content */}
      <div className="p-4 xl:ml-[260px] ">
        <DashboardNavbar setOpenSidenav={setOpenSidenav} />

        {/* Routes */}
        <div  className="flex-1 mb-72">
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
        </div>

        {/* Footer */}
        <div className="text-blue-gray-600 ">
          <Footer />
        </div>
      </div>
    </div>
  );
}

export default Dashboard;





// import { useState } from "react";
// import { Routes, Route, useLocation } from "react-router-dom";
// import { Sidenav, DashboardNavbar, Footer } from "@/widgets/layout";
// import routes from "@/routes";

// export function Dashboard() {
//   const [openSidenav, setOpenSidenav] = useState(false);
//   const location = useLocation(); // Get the current route path

//   // Check if the current route is a page, subpage, or empty
//   let marginClass = "mt-80"; // Default margin when no content is found

//   const isPage = !routes.some(({ pages }) =>
//     pages.some(({ path }) => path === location.pathname)
//   );

//   const isSubPage = !routes.some(({ pages }) =>
//     pages.some(({ subPages }) => subPages?.some(({ path }) => path === location.pathname))
//   );

//   // if (isPage) {
//   //   marginClass = "mt-2"; // If it's a page
//   // }
//   // if (isSubPage) {
//   //   marginClass = "mt-80"; // If it's a subpage
//   // }

//   return (
//     <div className="min-h-screen flex flex-col bg-blue-gray-50/50">
//       {/* Sidenav */}
//       <Sidenav open={openSidenav} setOpen={setOpenSidenav} routes={routes} />

//       {/* Main Content */}
//       <div className="flex flex-col flex-1 p-4 xl:ml-[260px]">
//         <DashboardNavbar setOpenSidenav={setOpenSidenav} />

//         {/* Routes */}
//         <div className="flex-1">
//           <Routes>
//             {routes.map(({ layout, pages }) =>
//               pages.map(({ path, element }) => <Route key={path} path={path} element={element} />)
//             )}
//             {routes.flatMap(({ layout, pages }) =>
//               pages.flatMap(({ subPages }) =>
//                 subPages ? subPages.map(({ path, element }) => <Route key={path} path={path} element={element} />) : []
//               )
//             )}
//           </Routes>
//         </div>
//               {/* Footer with Dynamic Margin */}
//       <div className={`text-blue-gray-600 ${isPage ? "mt-72" : "" || isSubPage? "mt-80" :""}`}>
//         <Footer />
//       </div>
//       </div>


//     </div>
//   );
// }

// export default Dashboard;
