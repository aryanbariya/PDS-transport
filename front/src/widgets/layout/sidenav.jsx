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


// import PropTypes from "prop-types";
// import { Link, NavLink } from "react-router-dom";
// import { XMarkIcon } from "@heroicons/react/24/outline";
// import { Button, IconButton, Typography } from "@material-tailwind/react";

// export function Sidenav({ open, setOpen, routes }) {




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
//       className={`${sidenavTypes[sidenavType]} ${
//         open ? "translate-x-0" : "-translate-x-80"
//       } fixed inset-0 z-50 my-4 ml-4 h-[calc(100vh-32px)] w-72 rounded-xl transition-transform duration-300 xl:translate-x-0 border border-blue-gray-100`}
//     >
//       {/* Logo */}
//       <div className="relative p-4" >
//         <Link to="/" className="flex flex-col items-center space-y-3">
//           <img src="/img/pds-logo.png" alt="PDS" className="h-20 w-20" />
//           <Typography variant="h6" className="text-4xl">
//             PDS
//           </Typography>
//         </Link>

//         {/* Close Button (Only for Mobile) */}
//         <IconButton
//           variant="text"
//           color="white"
//           size="sm"
//           className="absolute right-0 top-0 xl:hidden"
//           onClick={() => setOpen(false)}
//         >
//           <XMarkIcon strokeWidth={2.5} className="h-5 w-5 text-gray-600" />
//         </IconButton>
//       </div>

//       {/* Navigation Links */}
//       <div className="m-4 flex flex-col max-h-[calc(80vh-120px)] overflow-y-auto" onWheel={handleWheel}>
//         {routes.map(({ layout, title, pages }, key) => (
//           <ul key={key} className="mb-4 flex flex-col gap-1">
//             {title && (
//               <li className="mx-3.5 mt-4 mb-2">
//                 <Typography variant="small" className="font-black uppercase opacity-75">
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
//                       color={isActive ? sidenavColor : "blue-gray"}
//                       className="flex items-center gap-4 px-4 capitalize"
//                       fullWidth
//                     >
//                       {icon}
//                       <Typography className="font-medium capitalize">{name}</Typography>
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

// Sidenav.propTypes = {
//   open: PropTypes.bool.isRequired,
//   setOpen: PropTypes.func.isRequired,
//   routes: PropTypes.array.isRequired,
// };

// export default Sidenav;





import { useState } from "react";
import PropTypes from "prop-types";
import { Link, NavLink } from "react-router-dom";
import { XMarkIcon, ChevronDownIcon, ChevronUpIcon } from "@heroicons/react/24/outline";
import { Button, IconButton, Typography } from "@material-tailwind/react";

export function Sidenav({ open, setOpen, routes }) {
  const [manageOpen, setManageOpen] = useState(false);

  const sidenavTypes = {
    dark: "bg-gradient-to-br from-gray-800 to-gray-900",
    white: "bg-white shadow-sm",
    transparent: "bg-transparent",
  };

  const sidenavColor = "blue"; // Default color for active links
  const sidenavType = "white"; // Default sidenav type

  const handleWheel = (event) => {
    // Stop the scroll event from propagating to the parent element
    event.stopPropagation();
  };

  return (
    // <aside
    //   className={`fixed inset-0 z-50 my-4 ml-4 h-[calc(100vh-32px)] w-72 rounded-xl transition-transform duration-300 xl:translate-x-0 border border-blue-gray-100 ${open ? "translate-x-0" : "-translate-x-80"
    //     }`}
    // >
    //   {/* Logo */}
    //   <div className="relative p-4">
    //     <Link to="/" className="flex flex-col items-center space-y-3">
    //       <img src="/img/pds-logo.png" alt="PDS" className="h-20 w-20" />
    //       <Typography variant="h6" className="text-4xl">
    //         PDS
    //       </Typography>
    //     </Link>

    //     {/* Close Button (Mobile) */}
    //     <IconButton
    //       variant="text"
    //       color="white"
    //       size="sm"
    //       className="absolute right-0 top-0 xl:hidden"
    //       onClick={() => setOpen(false)}
    //     >
    //       <XMarkIcon strokeWidth={2.5} className="h-5 w-5 text-gray-600" />
    //     </IconButton>
    //   </div>
    <aside
      className={`${sidenavTypes[sidenavType]} ${
        open ? "translate-x-0" : "-translate-x-80"
      } fixed inset-0 z-50 my-4 ml-4 h-[calc(100vh-32px)] w-72 rounded-xl transition-transform duration-300 xl:translate-x-0 border border-blue-gray-100`}
    >
      {/* Logo */}
      <div className="relative p-4" >
        <Link to="/" className="flex flex-col items-center space-y-3">
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
          className="absolute right-0 top-0 xl:hidden"
          onClick={() => setOpen(false)}
        >
          <XMarkIcon strokeWidth={2.5} className="h-5 w-5 text-gray-600" />
        </IconButton>
      </div>
      {/* Navigation Links */}
      <div className="m-4 flex flex-col max-h-[calc(80vh-120px)] overflow-y-auto" onWheel={handleWheel}>
        {routes.map(({ layout, title, pages }, key) => (
          <ul key={key} className="mb-4">
            {pages.map(({ icon, name, path, subPages }) => (
              <li key={name}>
                {name === "manage" ? (
                  <>
                    <Button
                      variant="text"
                      className="flex justify-between items-center w-full px-4 capitalize"
                      onClick={() => setManageOpen(!manageOpen)}
                    >
                      <div className="flex items-center gap-4">
                        {icon}
                        <Typography className="font-medium capitalize">{name}</Typography>
                      </div>
                      {manageOpen ? <ChevronUpIcon className="w-5 h-5" /> : <ChevronDownIcon className="w-5 h-5" />}
                    </Button>
                    {manageOpen && (
                      <ul className="ml-6">
                        {subPages?.map(({ name, path }) => (
                          <li key={name}>
                            <NavLink to={`/${layout}${path}`} className="block p-2">
                              {({ isActive }) => (
                                <Button variant={isActive ? "gradient" : "text"} className="flex items-center gap-4 px-4 capitalize" fullWidth>
                               
                                  <Typography className="font-medium capitalize">{name}</Typography>
                                </Button>
                              )}
                            </NavLink>
                          </li>
                        ))}
                      </ul>
                    )}
                  </>
                ) : (
                  <NavLink to={`/${layout}${path}`}>
                    {({ isActive }) => (
                      <Button variant={isActive ? "gradient" : "text"} className="flex items-center gap-4 px-4 capitalize" fullWidth>
                        {icon}
                        <Typography className="font-medium capitalize">{name}</Typography>
                      </Button>
                    )}
                  </NavLink>
                )}
              </li>
            ))}
          </ul>
        ))}
      </div>

    </aside>
  );
}

Sidenav.propTypes = {
  open: PropTypes.bool.isRequired,
  setOpen: PropTypes.func.isRequired,
  routes: PropTypes.array.isRequired,
};

export default Sidenav;
