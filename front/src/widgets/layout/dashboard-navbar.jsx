// import { useLocation, Link } from "react-router-dom";
// import {
//   Navbar,
//   Typography,
//   Button,
//   Input,
//   Menu,
//   MenuHandler,
//   MenuList,
//   MenuItem,
//   Avatar,
//   IconButton,
// } from "@material-tailwind/react";
// import {
//   UserCircleIcon,
//   Cog6ToothIcon,
//   BellIcon,
//   ClockIcon,
//   CreditCardIcon,
//   Bars3Icon,
// } from "@heroicons/react/24/solid";
// import { Bars3Icon as OutlineBars3Icon } from "@heroicons/react/24/outline";

// export function DashboardNavbar({ setOpenSidenav }) {
//   const { pathname } = useLocation();
//   const [layout, page] = pathname.split("/").filter((el) => el !== "");

//   return (
//     <Navbar color="white" className="rounded-xl transition-all sticky top-4 z-40 py-3 shadow-md shadow-blue-gray-500/5" fullWidth blurred>
//       <div className="flex flex-col-reverse justify-between gap-6 md:flex-row md:items-center">
//         <div className="capitalize">
//           <Typography variant="h6" color="blue-gray">
//             {page}
//           </Typography>
//         </div>
//         <div className="flex items-center">
//           <div className="mr-auto md:mr-4 md:w-56">
//             <Input label="Search" />
//           </div>
//           {/* Toggle Sidebar Button (For Mobile) */}
//           <IconButton variant="text" color="blue-gray" size="lg" className="xl:hidden" onClick={() => setOpenSidenav((prev) => !prev)}>
//             <OutlineBars3Icon className="h-6 w-6" />
//           </IconButton>
//           <Link to="/auth/sign-in">
//             <Button variant="text" color="blue-gray" className="hidden items-center gap-1 px-4 xl:flex normal-case">
//               <UserCircleIcon className="h-5 w-5 text-blue-gray-500" />
//               Sign In
//             </Button>
//             <IconButton variant="text" color="blue-gray" className="grid xl:hidden">
//               <UserCircleIcon className="h-5 w-5 text-blue-gray-500" />
//             </IconButton>
//           </Link>
//           <Menu>
//             <MenuHandler>
//               <IconButton variant="text" color="blue-gray">
//                 <BellIcon className="h-5 w-5 text-blue-gray-500" />
//               </IconButton>
//             </MenuHandler>
//             <MenuList className="w-max border-0">
//               <MenuItem className="flex items-center gap-3">
//                 <Avatar src="https://demos.creative-tim.com/material-dashboard/assets/img/team-2.jpg" alt="item-1" size="sm" variant="circular" />
//                 <div>
//                   <Typography variant="small" color="blue-gray" className="mb-1 font-normal">
//                     <strong>New message</strong> from Laur
//                   </Typography>
//                   <Typography variant="small" color="blue-gray" className="flex items-center gap-1 text-xs font-normal opacity-60">
//                     <ClockIcon className="h-3.5 w-3.5" /> 13 minutes ago
//                   </Typography>
//                 </div>
//               </MenuItem>
//               <MenuItem className="flex items-center gap-4">
//                 <Avatar src="https://demos.creative-tim.com/material-dashboard/assets/img/small-logos/logo-spotify.svg" alt="item-1" size="sm" variant="circular" />
//                 <div>
//                   <Typography variant="small" color="blue-gray" className="mb-1 font-normal">
//                     <strong>New album</strong> by Travis Scott
//                   </Typography>
//                   <Typography variant="small" color="blue-gray" className="flex items-center gap-1 text-xs font-normal opacity-60">
//                     <ClockIcon className="h-3.5 w-3.5" /> 1 day ago
//                   </Typography>
//                 </div>
//               </MenuItem>
//               <MenuItem className="flex items-center gap-4">
//                 <div className="grid h-9 w-9 place-items-center rounded-full bg-gradient-to-tr from-blue-gray-800 to-blue-gray-900">
//                   <CreditCardIcon className="h-4 w-4 text-white" />
//                 </div>
//                 <div>
//                   <Typography variant="small" color="blue-gray" className="mb-1 font-normal">
//                     Payment successfully completed
//                   </Typography>
//                   <Typography variant="small" color="blue-gray" className="flex items-center gap-1 text-xs font-normal opacity-60">
//                     <ClockIcon className="h-3.5 w-3.5" /> 2 days ago
//                   </Typography>
//                 </div>
//               </MenuItem>
//             </MenuList>
//           </Menu>
//           <IconButton variant="text" color="blue-gray">
//             <Cog6ToothIcon className="h-5 w-5 text-blue-gray-500" />
//           </IconButton>
//         </div>
//       </div>
//     </Navbar>
//   );
// }

// DashboardNavbar.displayName = "/src/widgets/layout/dashboard-navbar.jsx";

// export default DashboardNavbar;
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// import { useState, useEffect } from "react";
// import { useLocation, Link, useNavigate } from "react-router-dom";
// import {
//   Navbar,
//   Typography,
//   Button,
//   Input,
//   IconButton,
//   Menu,
//   MenuHandler,
//   MenuList,
//   MenuItem,
//   Avatar,
// } from "@material-tailwind/react";
// import { UserCircleIcon, BellIcon, Cog6ToothIcon } from "@heroicons/react/24/solid";
// import { Bars3Icon as OutlineBars3Icon } from "@heroicons/react/24/outline";


// export function DashboardNavbar({ setOpenSidenav }) {
//   const { pathname } = useLocation();
//   const navigate = useNavigate();
//   const [isLoggedIn, setIsLoggedIn] = useState(false);
//   const [showLogout, setShowLogout] = useState(false);

//   // Check if user is logged in (simulate with localStorage)
//   useEffect(() => {
//     const user = localStorage.getItem("token");
//     if (user) {
//       setIsLoggedIn(true);
//     }
//   }, []);

//   // Handle Logout
//   const handleLogout = () => {
//     localStorage.removeItem("token");
//     window.location.href = "/"; // Redirect to HomePage
//   };

//   return (
//     <Navbar className="rounded-xl transition-all sticky top-4 z-40 py-3 shadow-md shadow-blue-gray-500/5" fullWidth blurred>
//       <div className="flex flex-col-reverse justify-between gap-6 md:flex-row md:items-center">
//         <div className="capitalize">
//           <Typography variant="h6" color="blue-gray">
//             {pathname.split("/").filter((el) => el !== "").pop()}
//           </Typography>
//         </div>
//         <div className="flex items-center">
//           <div className="mr-auto md:mr-4 md:w-56">
//             <Input label="Search" />
//           </div>
//           {/* Sidebar Toggle Button */}
//           <IconButton variant="text" color="blue-gray" size="lg" className="xl:hidden" onClick={() => setOpenSidenav((prev) => !prev)}>
//             <OutlineBars3Icon className="h-6 w-6" />
//           </IconButton>

//           {/* Conditional Sign In / Admin Button */}
//           {isLoggedIn ? (

//             <div className="relative">

//               <Button
//                 variant="text"
//                 color="blue-gray"
//                 className="hidden items-center gap-1 px-4 xl:flex normal-case"
//                 onClick={() => setShowLogout(!showLogout)}
//               >
//                 <UserCircleIcon className="h-5 w-5 text-blue-gray-500" />
//                 Admin
//               </Button>
//               {showLogout && (
//                 <div className="absolute bg-white shadow-md p-2 rounded-xl right-0 mt-1">
//                   <Button
//                     variant="text"
//                     color="red"
//                     className="w-15 h-15"
//                     onClick={handleLogout}
//                   >
//                     Log Out
//                   </Button>
//                 </div>
//               )}

//             </div>
//           ) : (
//             <Link to="/auth/sign-in">
//               <Button variant="text" color="blue-gray" className="hidden items-center gap-1 px-4 xl:flex normal-case">
//                 <UserCircleIcon className="h-5 w-5 text-blue-gray-500" />
//                 Sign In
//               </Button>
//             </Link>
//           )}

//           {/* Other Icons */}
//           {/* <Menu>
//             <MenuHandler>
//               <IconButton variant="text" color="blue-gray">
//                 <BellIcon className="h-5 w-5 text-blue-gray-500" />
//               </IconButton>
//             </MenuHandler>
//             <MenuList className="w-max border-0">
//               <MenuItem className="flex items-center gap-3">
//                 <Avatar src="https://demos.creative-tim.com/material-dashboard/assets/img/team-2.jpg" alt="item-1" size="sm" variant="circular" />
//                 <div>
//                   <Typography variant="small" color="blue-gray" className="mb-1 font-normal">
//                     <strong>New message</strong> from Laur
//                   </Typography>
//                 </div>
//               </MenuItem>
//             </MenuList>
//           </Menu> */}
//           <IconButton variant="text" color="blue-gray" onClick={() => navigate("/notifications")}>
//             <BellIcon className="h-5 w-5 text-blue-gray-500" />
//           </IconButton>
//           <IconButton variant="text" color="blue-gray">
//             <Cog6ToothIcon className="h-5 w-5 text-blue-gray-500" />
//           </IconButton>
//         </div>
//       </div>
//     </Navbar>
//   );
// }

// export default DashboardNavbar;

// import { useState, useEffect } from "react";
// import { useLocation, Link, useNavigate } from "react-router-dom";
// import {
//   Navbar,
//   Typography,
//   Button,
//   Input,
//   IconButton,
//   Menu,
//   MenuHandler,
//   MenuList,
//   MenuItem,
//   Avatar,
// } from "@material-tailwind/react";
// import {
//   UserCircleIcon,
//   BellIcon,
//   Cog6ToothIcon,
//   EnvelopeIcon,
//   Squares2X2Icon,
//   MagnifyingGlassIcon,
// } from "@heroicons/react/24/solid";
// import { Bars3Icon as OutlineBars3Icon, XMarkIcon } from "@heroicons/react/24/outline";

// export function DashboardNavbar({ setOpenSidenav }) {
//   const { pathname } = useLocation();
//   const navigate = useNavigate();
//   const [isLoggedIn, setIsLoggedIn] = useState(false);
//   const [showSearch, setShowSearch] = useState(false);

//   // Check if user is logged in (simulate with localStorage)
//   useEffect(() => {
//     const user = localStorage.getItem("token");
//     if (user) {
//       setIsLoggedIn(true);
//     }
//   }, []);

//   // Handle Logout
//   const handleLogout = () => {
//     localStorage.removeItem("token");
//     window.location.href = "/"; // Redirect to HomePage
//   };

//   return (
//     <Navbar className="rounded-xl transition-all sticky top-4 z-40 py-3 shadow-md shadow-blue-gray-500/5 w-full" fullWidth blurred>
//       <div className="flex items-center justify-between px-4 md:px-6 relative">

//         {/* Sidebar Toggle Button - Visible only on Small Screens */}
//         <div className="lg:hidden">
//           <IconButton variant="text" color="blue-gray" size="lg" onClick={() => setOpenSidenav((prev) => !prev)}>
//             <OutlineBars3Icon className="h-6 w-6" />
//           </IconButton>
//         </div>

//         {/* Search Bar (Visible in Tablet & Large Screens) */}
//         <div className="hidden md:flex flex-1 justify-center max-w-sm">
//           <Input label="Search..." className="w-full" />
//         </div>

//         {/* Search Button for Mobile */}
//         <div className="flex-1 flex justify-center md:hidden">
//           {showSearch ? (
//             <div className="absolute inset-0 bg-white flex items-center px-4 py-2 rounded-lg shadow-md z-50 w-full">
//               <Input label="Search..." autoFocus className="flex-1" />
//               <IconButton variant="text" color="blue-gray" onClick={() => setShowSearch(false)}>
//                 <XMarkIcon className="h-5 w-5 text-blue-gray-500" />
//               </IconButton>
//             </div>
//           ) : (
//             <IconButton variant="text" color="blue-gray" className="md:hidden" onClick={() => setShowSearch(true)}>
//               <MagnifyingGlassIcon className="h-6 w-6 text-blue-gray-500" />
//             </IconButton>
//           )}
//         </div>

//         {/* Icons and User Profile - Now in One Horizontal Line */}
//         {!showSearch && (
//           <div className="flex items-center gap-2 md:gap-4 flex-nowrap overflow-x-auto">
//             <IconButton variant="text" color="blue-gray">
//               <Squares2X2Icon className="h-5 w-5 text-blue-gray-500" />
//             </IconButton>
//             <IconButton variant="text" color="blue-gray">
//               <EnvelopeIcon className="h-5 w-5 text-blue-gray-500" />
//             </IconButton>
//             <IconButton variant="text" color="blue-gray">
//               <BellIcon className="h-5 w-5 text-blue-gray-500" />
//             </IconButton>
//             <IconButton variant="text" color="blue-gray">
//               <Cog6ToothIcon className="h-5 w-5 text-blue-gray-500" />
//             </IconButton>

//             {/* User Profile Dropdown */}
//             {isLoggedIn ? (
//               <Menu>
//                 <MenuHandler>
//                   <div className="flex items-center gap-2 cursor-pointer">
//                     <Avatar src="https://avatars.dicebear.com/api/adventurer/jwt.svg" alt="User" size="sm" />
//                     <Typography variant="small" color="blue-gray">
//                       JWT User
//                     </Typography>
//                   </div>
//                 </MenuHandler>
//                 <MenuList>
//                   <MenuItem onClick={handleLogout}>Log Out</MenuItem>
//                 </MenuList>
//               </Menu>
//             ) : (
//               <Link to="/auth/sign-in">
//                 <Button 
//                   variant="text" 
//                   color="blue-gray" 
//                   className="flex items-center normal-case text-sm md:text-base p-2 md:p-3">
//                   <UserCircleIcon className="h-5 w-5 text-blue-gray-500 mr-1" />
//                   Sign In
//                 </Button>
//               </Link>
//             )}
//           </div>
//         )}
//       </div>
//     </Navbar>
//   );
// }

// export default DashboardNavbar;




// import { useState, useEffect } from "react";
// import { useLocation, Link, useNavigate } from "react-router-dom";
// import {
//   Navbar,
//   Typography,
//   Button,
//   Input,
//   IconButton,
//   Menu,
//   MenuHandler,
//   MenuList,
//   MenuItem,
//   Avatar,
// } from "@material-tailwind/react";
// import {
//   UserCircleIcon,
//   BellIcon,
//   Cog6ToothIcon,
//   EnvelopeIcon,
//   Squares2X2Icon,
//   MagnifyingGlassIcon,
// } from "@heroicons/react/24/solid";
// import { Bars3Icon as OutlineBars3Icon, XMarkIcon } from "@heroicons/react/24/outline";

// export function DashboardNavbar({ setOpenSidenav, collapsed, setCollapsed }) {
//   const { pathname } = useLocation();
//   const navigate = useNavigate();
//   const [isLoggedIn, setIsLoggedIn] = useState(false);
//   const [showSearch, setShowSearch] = useState(false);

//   // Check if user is logged in (simulate with localStorage)
//   useEffect(() => {
//     const user = localStorage.getItem("token");
//     if (user) {
//       setIsLoggedIn(true);
//     }
//   }, []);

//   // Handle Logout
//   const handleLogout = () => {
//     localStorage.removeItem("token");
//     window.location.href = "/"; // Redirect to HomePage
//   };

//   return (
//     <Navbar className="rounded-xl transition-all sticky top-4 z-40 py-3 shadow-md shadow-blue-gray-500/5 w-full" fullWidth blurred>
//       <div className="flex items-center justify-between px-4 md:px-6 relative">
//         <div>
//           {/* Collapse Button */}
//           <IconButton
//             onClick={() => setCollapsed(!collapsed)}
//             className=" p-2"
//             size="sm"
//             variant="text"
//             color="blue-gray"
//           >
//             <IconButton className="h-10 w-10 text-white">{collapsed ? "➡" : "⬅"} </IconButton>{/* Toggle icon */}
//           </IconButton>
//         </div>

//         {/* Sidebar Toggle Button - Visible only on Small Screens */}
//         <div className="lg:hidden">
//           <IconButton variant="text" color="blue-gray" size="lg" onClick={() => setOpenSidenav((prev) => !prev)}>
//             <OutlineBars3Icon className="h-6 w-6" />
//           </IconButton>
//         </div>

//         {/* Search Bar (Visible in Tablet & Large Screens) */}
//         <div className="hidden md:flex flex-1 justify-center max-w-sm">
//           <Input label="Search..." className="w-full" />
//         </div>

//         {/* Search Button for Mobile */}
//         <div className="flex-1 flex justify-center md:hidden">
//           {showSearch ? (
//             <div className="absolute inset-0 bg-white flex items-center px-4 py-2 rounded-lg shadow-md z-50 w-full">
//               <Input label="Search..." autoFocus className="flex-1" />
//               <IconButton variant="text" color="blue-gray" onClick={() => setShowSearch(false)}>
//                 <XMarkIcon className="h-5 w-5 text-blue-gray-500" />
//               </IconButton>
//             </div>
//           ) : (
//             <IconButton variant="text" color="blue-gray" className="md:hidden" onClick={() => setShowSearch(true)}>
//               <MagnifyingGlassIcon className="h-6 w-6 text-blue-gray-500" />
//             </IconButton>
//           )}
//         </div>

//         {/* Icons and User Profile - Now in One Horizontal Line */}
//         {!showSearch && (
//           <div className="flex items-center gap-2 md:gap-4 flex-nowrap overflow-x-auto">
//             {/* <IconButton variant="text" color="blue-gray">
//               <Squares2X2Icon className="h-5 w-5 text-blue-gray-500" />
//             </IconButton>
//             <IconButton variant="text" color="blue-gray">
//               <EnvelopeIcon className="h-5 w-5 text-blue-gray-500" />
//             </IconButton>
//             <IconButton variant="text" color="blue-gray">
//               <BellIcon className="h-5 w-5 text-blue-gray-500" />
//             </IconButton>
//             <IconButton variant="text" color="blue-gray">
//               <Cog6ToothIcon className="h-5 w-5 text-blue-gray-500" />
//             </IconButton> */}

//             {/* User Profile Dropdown */}
//             {isLoggedIn ? (
//               <Menu>
//                 <MenuHandler>
//                   <div className="flex items-center gap-2 cursor-pointer">
//                     <Avatar src="https://avatars.dicebear.com/api/adventurer/jwt.svg" alt="User" size="sm" />
//                     <Typography variant="small" color="blue-gray">
//                       JWT User
//                     </Typography>
//                   </div>
//                 </MenuHandler>
//                 <MenuList>
//                   <MenuItem onClick={handleLogout}>Log Out</MenuItem>
//                 </MenuList>
//               </Menu>
//             ) : (
//               <Link to="/auth/sign-in">
//                 <Button
//                   variant="text"
//                   color="blue-gray"
//                   className="flex items-center normal-case text-sm md:text-base p-2 md:p-3">
//                   <UserCircleIcon className="h-5 w-5 text-blue-gray-500 mr-1" />
//                   Sign In
//                 </Button>
//               </Link>
//             )}
//           </div>
//         )}
//       </div>
//     </Navbar>
//   );
// }

// export default DashboardNavbar;



import { useState, useEffect } from "react";
import { useLocation, Link, useNavigate } from "react-router-dom";
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
} from "@material-tailwind/react";
import {
  UserCircleIcon,
  BellIcon,
  Cog6ToothIcon,
  EnvelopeIcon,
  Squares2X2Icon,
  MagnifyingGlassIcon,
} from "@heroicons/react/24/solid";
import { Bars3Icon as OutlineBars3Icon, XMarkIcon } from "@heroicons/react/24/outline";

export function DashboardNavbar({ setOpenSidenav, collapsed, setCollapsed }) {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showSearch, setShowSearch] = useState(false);

  useEffect(() => {
    const user = localStorage.getItem("token");
    if (user) {
      setIsLoggedIn(true);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/";
  };

  return (
    <Navbar className="rounded-xl transition-all sticky top-4 z-40 py-3 shadow-md shadow-blue-gray-500/5 w-full" fullWidth blurred>
      <div className="flex items-center justify-between px-4 md:px-6 relative">
        <div>
          <IconButton
            onClick={() => setCollapsed(!collapsed)}
            className=" p-2"
            size="sm"
            variant="text"
            color="blue-gray"
          >
            <IconButton className="h-10 w-10 text-white">{collapsed ? "➡" : "⬅"} </IconButton>
          </IconButton>
        </div>

        <div className="lg:hidden">
          <IconButton variant="text" color="blue-gray" size="lg" onClick={() => setOpenSidenav((prev) => !prev)}>
            <OutlineBars3Icon className="h-6 w-6" />
          </IconButton>
        </div>

        <div className="hidden md:flex flex-1 justify-center max-w-sm">
          <div className="bg-blue-600 rounded-lg px-4 py-2 flex items-center w-full">
            <MagnifyingGlassIcon className="h-5 w-5 text-white font-bold mr-2" />
            <Input label="Search..." className="w-full bg-transparent text-white placeholder-white font-bold border-2 border-white rounded-lg" />
          </div>
        </div>

        <div className="flex-1 flex justify-center md:hidden">
          {showSearch ? (
            <div className="absolute inset-0 bg-white flex items-center px-4 py-2 rounded-lg shadow-md z-50 w-full">
              <Input label="Search..." autoFocus className="flex-1" />
              <IconButton variant="text" color="blue-gray" onClick={() => setShowSearch(false)}>
                <XMarkIcon className="h-5 w-5 text-blue-gray-500" />
              </IconButton>
            </div>
          ) : (
            <IconButton variant="text" color="blue-gray" className="md:hidden" onClick={() => setShowSearch(true)}>
              <MagnifyingGlassIcon className="h-6 w-6 text-white font-bold" />
            </IconButton>
          )}
        </div>

        {!showSearch && (
          <div className="flex items-center gap-2 md:gap-4 flex-nowrap overflow-x-auto">
            {isLoggedIn ? (
              <Menu>
                <MenuHandler>
                  <div className="flex items-center gap-2 cursor-pointer">
                    <Avatar src="https://avatars.dicebear.com/api/adventurer/jwt.svg" alt="User" size="sm" />
                    <Typography variant="small" color="blue-gray">
                      JWT User
                    </Typography>
                  </div>
                </MenuHandler>
                <MenuList>
                  <MenuItem onClick={handleLogout}>Log Out</MenuItem>
                </MenuList>
              </Menu>
            ) : (
              <Link to="/auth/sign-in">
                <Button
                  variant="filled"
                  color="blue"
                  className="flex items-center normal-case text-lg font-bold px-4 py-2 rounded-lg text-white">
                  <UserCircleIcon className="h-5 w-5 text-white mr-2" />
                  Sign In
                </Button>
              </Link>
            )}
          </div>
        )}
      </div>
    </Navbar>
  );
}

export default DashboardNavbar;


