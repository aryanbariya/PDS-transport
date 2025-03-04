// import PropTypes from "prop-types";
// import { Link, NavLink } from "react-router-dom";
// import { XMarkIcon } from "@heroicons/react/24/outline";
// import {
//   Avatar,
//   Button,
//   IconButton,
//   Typography,
// } from "@material-tailwind/react";
// import { useMaterialTailwindController, setOpenSidenav } from "@/context";

// export function Sidenav({ brandImg, brandName, routes }) {
//   const [controller, dispatch] = useMaterialTailwindController();
//   const { sidenavColor, sidenavType, openSidenav } = controller;
//   const sidenavTypes = {
//     dark: "bg-gradient-to-br from-gray-800 to-gray-900",
//     white: "bg-white shadow-sm",
//     transparent: "bg-transparent",
//   };
//    Sidenav = {
//     brandImg: "/img/pds-logo.png",
//     brandName: "PDS",
//   };


//   return (
//     <aside
//       className={`${sidenavTypes[sidenavType]} ${openSidenav ? "translate-x-0" : "-translate-x-80"
//         } fixed inset-0 z-50 my-4 ml-4 h-[calc(100vh-32px)] w-72 rounded-xl transition-transform duration-300 xl:translate-x-0 border border-blue-gray-100`}
//     >
//       <div
//         className={`relative`}
//       >
//         <Link to="/" className="py-6 px-8 text-center space-y-3 flex flex-col items-center justify-center">
//           <img
//             src={Sidenav.brandImg}
//             alt={Sidenav.brandName}
//             className="h-20 w-20 "
//           />
//           <Typography
//             variant="h6"
//             // color={sidenavType === "dark" ? "white" : "blue-gray"}
//             className="text-4xl "
//           >
//             {Sidenav.brandName}
//           </Typography>
//         </Link>
//         <IconButton
//           variant="text"
//           color="white"
//           size="sm"
//           ripple={false}
//           className="absolute right-0 top-0 grid rounded-br-none rounded-tl-none xl:hidden"
//           onClick={() => setOpenSidenav(dispatch, false)}
//         >
//           <XMarkIcon strokeWidth={2.5} className="h-5 w-5 text-white" />
//         </IconButton>
//       </div>
//       <div className="m-4">
//         {routes.map(({ layout, title, pages }, key) => (
//           <ul key={key} className="mb-4 flex flex-col gap-1">
//             {title && (
//               <li className="mx-3.5 mt-4 mb-2">
//                 <Typography
//                   variant="small"
//                   color={sidenavType === "dark" ? "white" : "blue-gray"}
//                   className="font-black uppercase opacity-75"
//                 >
//                   {title}
//                 </Typography>
//               </li>
//             )}
//             {pages.map(({ icon, name, path }) => (
//               <li key={name}>
//                 <NavLink to={`/${layout}${path}`}>
//                   {({ isActive }) => (
//                     <Button
//                       variant={isActive ? "gradient" : "text"}
//                       color={
//                         isActive
//                           ? sidenavColor
//                           : sidenavType === "dark"
//                             ? "white"
//                             : "blue-gray"
//                       }
//                       className="flex items-center gap-4 px-4 capitalize"
//                       fullWidth
//                     >
//                       {icon}
//                       <Typography
//                         color="inherit"
//                         className="font-medium capitalize"
//                       >
//                         {name}
//                       </Typography>
//                     </Button>
//                   )}
//                 </NavLink>
//               </li>
//             ))}
//           </ul>
//         ))}
//       </div>
//     </aside>
//   );
// }


// Sidenav.displayName = "/src/widgets/layout/sidnave.jsx";

// export default Sidenav;
//////////////////////////////////////////////////////////////////////////////////////////////////////////////


// import { useState } from "react";
// import PropTypes from "prop-types";
// import { Link, NavLink } from "react-router-dom";
// import { XMarkIcon, ChevronDownIcon, ChevronUpIcon } from "@heroicons/react/24/outline";
// import { Button, IconButton, Typography } from "@material-tailwind/react";
// import { FaPlay } from "react-icons/fa";

// export function Sidenav({ open, setOpen, routes }) {
//   const [manageOpen, setManageOpen] = useState(false);

//   const sidenavTypes = {
//     dark: "bg-gradient-to-br from-gray-800 to-gray-900",
//     white: "bg-white shadow-sm",
//     transparent: "bg-transparent",
//   };

//   const sidenavColor = "blue"; // Default color for active links
//   const sidenavType = "white"; // Default sidenav type

//   const handleWheel = (event) => {
//     // Stop the scroll event from propagating to the parent element
//     event.stopPropagation();
//   };

//   return (
//     <aside
//       className={`${sidenavTypes[sidenavType]} ${open ? "translate-x-0" : "-translate-x-80"
//         } fixed inset-0 z-50   h-[calc(120vh-32px)] w-[272px]  transition-transform duration-300 xl:translate-x-0 border border-blue-gray-100`}
//     >
//       {/* Logo */}
//       <div className="relative p-4" >
//         <Link to="/" className="flex flex-row items-center space-x-4 ml-4 mb-4">
//           <img src="/img/pds-logo.png" alt="PDS" className="h-20 w-20" />
//           <Typography variant="h6" className="text-4xl">
//              PDS
//           </Typography>
//         </Link>

//         {/* Close Button (Only for Mobile) */}
//         <IconButton
//           variant="primary"
//           color="white"
//           size="sm"
//           className="absolute right-0 xl:hidden"
//           onClick={() => setOpen(false)}
//         >
//           <XMarkIcon strokeWidth={2.5} className="h-5 w-5 text-gray-600" />
//         </IconButton>
//       </div>
//       {/* Navigation Links */}
//       <div className="m-4 flex flex-col max-h-[calc(100vh-120px)] overflow-y-auto" onWheel={handleWheel}>
//         {routes.map(({ layout, title, pages }, key) => (
//           <ul key={key} className="mb-4">
//             {pages.map(({ icon, name, path, subPages }) => (
//               <li key={name}>
//                 {name === "manage" ? (
//                   <>
//                     <Button
//                       // variant="text"
//                       // className="flex justify-between items-center w-full px-4 capitalize"
//                       variant= "link" 
//                       className="flex items-center  px-4  capitalize w-full" 
//                       onClick={() => setManageOpen(!manageOpen)}
//                     >
//                       <div className="flex items-center gap-4">
//                         {icon}
//                         <Typography className="font-medium capitalize">{name}</Typography>
//                       </div>
//                       {manageOpen ? <ChevronUpIcon className="w-5 h-5" /> : <ChevronDownIcon className="w-5 h-5" />}
//                     </Button>
//                     {manageOpen && (
//                       <ul className="ml-6">
//                         {subPages?.map(({ name, path }) => (
//                           <li key={name}>
//                             <NavLink to={`/${layout}${path}`} className="block p-2">
//                               {({ isActive }) => (
//                                 <Button variant={isActive ? "gradient " : "outlined"} color={isActive ? "blue":"outlined"}  className=" flex items-center gap-4 px-4 capitalize " fullWidth>
//                                  <FaPlay className="w-3 h-3 text-gray-500" /> {/* Triangle Icon */}
//                                   <Typography className="font-medium capitalize">{name}</Typography>
//                                 </Button>
//                               )}
//                             </NavLink>
//                           </li>
//                         ))}
//                       </ul>
//                     )}
//                   </>
//                 ) : (
//                   <NavLink to={`/${layout}${path}`}className="block p-2">
//                     {({ isActive }) => (
//                       <Button variant={isActive ? "gradient" : "outlined"} color={isActive ? "blue":"outlined"}   className="flex items-center gap-4 px-4 capitalize" fullWidth>
//                         {icon}
//                         <Typography className="font-medium capitalize">{name}</Typography>
//                       </Button>
//                     )}
//                   </NavLink>
//                 )}
//               </li>
//             ))}
//           </ul>
//         ))}
//       </div>

//     </aside>
//   );
// }

// Sidenav.propTypes = {
//   open: PropTypes.bool.isRequired,
//   setOpen: PropTypes.func.isRequired,
//   routes: PropTypes.array.isRequired,
// };

// export default Sidenav;
////////////////////////////////////////////////////////



import { useState } from "react";
import PropTypes from "prop-types";
import { Link, NavLink } from "react-router-dom";
import { XMarkIcon, ChevronDownIcon, ChevronUpIcon } from "@heroicons/react/24/outline";
import { Button, IconButton, Typography } from "@material-tailwind/react";
import { FaPlay, FaCog } from "react-icons/fa";
import { XCircleIcon } from "@heroicons/react/24/solid";
import {  DashboardNavbar, Footer } from "@/widgets/layout";


export function Sidenav({ open, setOpen,  routes }) {
  const [manageOpen, setManageOpen] = useState(false);

  return (
 
    <aside
      className={`bg-[#2A3042] text-white fixed inset-y-0 left-0 z-50 h-screen w-[260px] 
        transition-transform duration-300 ${open ? "translate-x-0" : "-translate-x-full"} 
        xl:translate-x-0 shadow-lg  `}
    >
      {/* Logo */}
      <div className="relative p-4" >
        <Link to="/" className="flex flex-row items-center space-x-4 ml-4 mb-4">
          <img src="/img/pds-logo.png" alt="PDS" className="h-20 w-20" />
          <Typography variant="h6" className="text-4xl">
            PDS
          </Typography>
        </Link>

        {/* Close Button (Only for Mobile) */}
        <IconButton
          variant="text"
          color="white"
          size="sm"
          className={`absolute right-0 top-5 xl:hidden bg-[#2A3042] text-white 
    rounded-md p-2 transition-all duration-500 ease-in-out 
    ${open ? "translate-x-0" : "translate-x-full opacity-0"}`}
          onClick={() => setOpen(false)}
        >
          <XCircleIcon strokeWidth={2.5} className="h-6 w-6 text-white" />
        </IconButton>
      </div>

      {/* Sidebar Navigation */}
      <nav className="p-4 space-y-2 overflow-y-auto h-[calc(100vh-64px)]">
        {routes.map(({ layout, title, pages }, key) => (
          <div key={key}>
            <Typography variant="small" className="text-gray-400 uppercase mb-2 px-4">
              {title || "Unnamed"}
            </Typography>
            <ul className="space-y-1">
              {pages.map(({ icon, name, path, subPages }) => (
                <li key={name || "Unnamed"}>
                  {name === "manage" ? (
                    <>
                      <button
                        className="flex items-center justify-between w-full px-4 py-2 rounded-md hover:bg-gray-700"
                        onClick={() => setManageOpen(!manageOpen)}
                      >
                        <div className="flex items-center gap-3">
                          {/* Rotating Settings Icon */}
                          <div
                            className={`flex items-center justify-center w-8 h-8 rounded-full bg-blue-500 text-white 
                                      transition-transform duration-990 ease-in-out ${manageOpen ? "rotate-180" : "rotate-0"}`}
                          >
                            <FaCog className="w-5 h-5" />
                          </div>



                          <span className="text-sm font-medium text-white">Manage</span>
                        </div>

                        {/* Dropdown Arrow Toggle */}
                        {manageOpen ? (
                          <ChevronUpIcon className="w-5 h-5 text-white" />
                        ) : (
                          <ChevronDownIcon className="w-5 h-5 text-white" />
                        )}
                      </button>
                      {manageOpen && (
                        <ul className="ml-6 mt-2 space-y-1 border-l-2 border-blue-500 pl-3">
                          {subPages?.map(({ name, path }) => (
                            <li key={name}>
                              <NavLink
                                to={`/${layout}${path}`}
                                className={({ isActive }) =>
                                  `flex items-center gap-3 w-full text-left px-4 py-2 rounded-md transition-all duration-300 
             ${isActive ? "text-blue-500 border border-blue-500 bg-transparent" : "text-white hover:text-blue-500 hover:bg-blue-50"}`
                                }
                              >
                                <FaPlay className={({ isActive }) => `w-3 h-3 ${isActive ? "text-blue-500" : "text-white"}`} />
                                <Typography variant="small" className={({ isActive }) => `text-sm ${isActive ? "text-blue-500" : "text-white"}`}>
                                  {name || "Unnamed"}
                                </Typography>
                              </NavLink>
                            </li>
                          ))}
                        </ul>
                      )}
                    </>
                  ) : (
                    <NavLink
                      to={`/${layout}${path}`}
                      className={({ isActive }) =>
                        `flex items-center gap-3 px-4 py-2 rounded-md transition-all duration-300 
     ${isActive ? "border-l-2 border-blue-500 text-blue-500 bg-transparent" : "text-white hover:text-blue-500 hover:bg-blue-50"}`
                      }
                    >
                      {icon}
                      <Typography className="text-sm">{name || "Unnamed"}</Typography>
                    </NavLink>

                  )}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </nav>
    </aside>
  );
}

Sidenav.propTypes = {
  open: PropTypes.bool.isRequired,
  setOpen: PropTypes.func.isRequired,
  routes: PropTypes.array.isRequired,
};

export default Sidenav;



