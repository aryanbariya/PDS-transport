import { useState, useEffect, useRef } from "react";
import PropTypes from "prop-types";
import { Link, NavLink } from "react-router-dom";
import { XMarkIcon, ChevronDownIcon, ChevronUpIcon } from "@heroicons/react/24/outline";
import { Button, IconButton, Typography } from "@material-tailwind/react";
import { FaPlay, FaCog } from "react-icons/fa";
import { XCircleIcon } from "@heroicons/react/24/solid";
import { DashboardNavbar, Footer } from "@/widgets/layout";


export function Sidenav({ open, setOpen, routes }) {
  const [manageOpen, setManageOpen] = useState(false);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (window.innerWidth < 1280) { // Apply only for mobile screens
        const sidenav = document.getElementById("sidenav");
        if (sidenav && !sidenav.contains(event.target)) {
          setOpen(false);
        }
      }
    };

    if (open) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [open, setOpen]);


  return (


    <aside id="sidenav"
      className={`bg-[#2A3042] text-white  fixed inset-y-0 left-0 z-50 h-screen w-[260px] 
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
      <nav className="p-4 space-y-2 overflow-y-auto  h-[calc(100vh-64px)]">
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
                        className="flex items-center justify-between w-full px-4 py-2 rounded-md hover:bg-gray-700 "
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
                                onClick={() => setOpen(false)}
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

                    <>
                      {name !== "DOGeneratePage" && name !== "DOAllocationPage" && 
                       name !== "1stTapa" && name !== "1stTapaReports" &&

                        < NavLink
                          to={`/${layout}${path}`}
                          className={({ isActive }) =>
                            `flex items-center gap-3 px-4 py-2 rounded-md transition-all duration-300 
                      ${isActive ? "border-l-2 border-blue-500 text-blue-500 bg-transparent" : "text-white hover:text-blue-500 hover:bg-blue-50"}`
                          }
                          onClick={() => setOpen(false)}
                        >
                          {icon}

                          <Typography className="text-sm">{name || "Unnamed"}</Typography>

                        </NavLink>

                      }
                    </>
                  )}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </nav>
    </aside >
  );
}

Sidenav.propTypes = {
  open: PropTypes.bool.isRequired,
  setOpen: PropTypes.func.isRequired,
  routes: PropTypes.array.isRequired,
};

export default Sidenav;




