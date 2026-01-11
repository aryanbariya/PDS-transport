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
import { UserCircleIcon, BellIcon, Cog6ToothIcon } from "@heroicons/react/24/solid";
import { Bars3Icon as OutlineBars3Icon } from "@heroicons/react/24/outline";
import Swal from 'sweetalert2';

export function DashboardNavbar({ setOpenSidenav }) {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showLogout, setShowLogout] = useState(false);

  useEffect(() => {
    const user = localStorage.getItem("token");
    if (user) {
      setIsLoggedIn(true);
    }
  }, []);

  const handleLogout = () => {
    Swal.fire({
      title: 'Are you sure?',
      text: 'You will be logged out!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: 'Yes, log out!',
      cancelButtonText: 'No, cancel!',
    }).then((result) => {
      if (result.isConfirmed) {
        localStorage.removeItem("token");
        window.location.href = "/";
      }
    });
  };

  return (
    <Navbar className="transition-all py-3 shadow-md shadow-blue-gray-500/5" fullWidth blurred>
      <div className="flex flex-col-reverse justify-between gap-6 md:flex-row md:items-center">
        <div className="capitalize">
          <Typography variant="h6" color="blue-gray">
            {pathname.split("/").filter((el) => el !== "").pop()}
          </Typography>
        </div>
        <div className="flex items-center">
          <div className="mr-auto md:mr-4 md:w-56">
            <Input label="Search" />
          </div>
          {/* Sidebar Toggle Button */}
          <IconButton variant="text" color="blue-gray" size="lg" className="xl:hidden" onClick={() => setOpenSidenav((prev) => !prev)}>
            <OutlineBars3Icon className="h-6 w-6" />
          </IconButton>

          {/* Conditional Sign In / Admin Button */}
          {isLoggedIn ? (
            <div className="relative">
              <Button
                variant="text"
                color="blue-gray"
                className=" hidden xl:flex items-center gap-1 px-4  normal-case"
                onClick={() => setShowLogout(!showLogout)}
              >
                <UserCircleIcon className="h-5 w-5 text-blue-gray-500" />
                Admin
              </Button>
              {showLogout && (
                <div className="absolute bg-white shadow-md p-2  rounded-xl right-0 mt-1">
                  <Button
                    variant="text"
                    color="red"
                    className="w-auto px-4 py-2 whitespace-nowrap"
                    onClick={handleLogout}
                  >
                    Log Out
                  </Button>
                </div>
              )}
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <Link to="/auth/sign-in">
                <Button variant="text" color="blue-gray" className="hidden items-center gap-1 px-4 xl:flex normal-case">
                  <UserCircleIcon className="h-5 w-5 text-blue-gray-500" />
                  Sign In
                </Button>
              </Link>
              <Button variant="text" color="red" className="hidden items-center gap-1 px-4 xl:flex normal-case">
                Log Out
              </Button>
            </div>
          )}

          {/* Other Icons */}
          <IconButton variant="text" color="blue-gray" onClick={() => navigate("/notifications")}>
            <BellIcon className="h-5 w-5 text-blue-gray-500" />
          </IconButton>
          <IconButton variant="text" color="blue-gray">
            <Cog6ToothIcon className="h-5 w-5 text-blue-gray-500" />
          </IconButton>
        </div>
      </div>
    </Navbar>
  );
}

export default DashboardNavbar;
