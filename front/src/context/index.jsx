// import React from "react";
// import PropTypes from "prop-types";

// export const MaterialTailwind = React.createContext(null);
// MaterialTailwind.displayName = "MaterialTailwindContext";

// export function reducer(state, action) {
//   switch (action.type) {
//     case "OPEN_SIDENAV": {
//       return { ...state, openSidenav: action.value };
//     }
//     case "SIDENAV_TYPE": {
//       return { ...state, sidenavType: action.value };
//     }
//     case "SIDENAV_COLOR": {
//       return { ...state, sidenavColor: action.value };
//     }
//     case "TRANSPARENT_NAVBAR": {
//       return { ...state, transparentNavbar: action.value };
//     }
//     case "FIXED_NAVBAR": {
//       return { ...state, fixedNavbar: action.value };
//     }
//     case "OPEN_CONFIGURATOR": {
//       return { ...state, openConfigurator: action.value };
//     }
//     default: {
//       throw new Error(`Unhandled action type: ${action.type}`);
//     }
//   }
// }

// export function MaterialTailwindControllerProvider({ children }) {
//   const initialState = {
//     openSidenav: false,
//     sidenavColor: "dark",
//     sidenavType: "white",
//     transparentNavbar: true,
//     fixedNavbar: false,
//     openConfigurator: false,
//   };

//   const [controller, dispatch] = React.useReducer(reducer, initialState);
//   const value = React.useMemo(
//     () => [controller, dispatch],
//     [controller, dispatch]
//   );

//   return (
//     <MaterialTailwind.Provider value={value}>
//       {children}
//     </MaterialTailwind.Provider>
//   );
// }

// export function useMaterialTailwindController() {
//   const context = React.useContext(MaterialTailwind);

//   if (!context) {
//     throw new Error(
//       "useMaterialTailwindController should be used inside the MaterialTailwindControllerProvider."
//     );
//   }

//   return context;
// }

// MaterialTailwindControllerProvider.displayName = "/src/context/index.jsx";

// MaterialTailwindControllerProvider.propTypes = {
//   children: PropTypes.node.isRequired,
// };

// export const setOpenSidenav = (dispatch, value) =>
//   dispatch({ type: "OPEN_SIDENAV", value });
// export const setSidenavType = (dispatch, value) =>
//   dispatch({ type: "SIDENAV_TYPE", value });
// export const setSidenavColor = (dispatch, value) =>
//   dispatch({ type: "SIDENAV_COLOR", value });
// export const setTransparentNavbar = (dispatch, value) =>
//   dispatch({ type: "TRANSPARENT_NAVBAR", value });
// export const setFixedNavbar = (dispatch, value) =>
//   dispatch({ type: "FIXED_NAVBAR", value });
// export const setOpenConfigurator = (dispatch, value) =>
//   dispatch({ type: "OPEN_CONFIGURATOR", value });


import React, { createContext, useContext, useReducer, useState, useEffect } from "react";
import PropTypes from "prop-types";

// Create context
export const MaterialTailwind = createContext(null);
MaterialTailwind.displayName = "MaterialTailwindContext";

// Reducer for UI state
function reducer(state, action) {
  switch (action.type) {
    case "OPEN_SIDENAV":
      return { ...state, openSidenav: action.value };
    case "SIDENAV_TYPE":
      return { ...state, sidenavType: action.value };
    case "SIDENAV_COLOR":
      return { ...state, sidenavColor: action.value };
    case "TRANSPARENT_NAVBAR":
      return { ...state, transparentNavbar: action.value };
    case "FIXED_NAVBAR":
      return { ...state, fixedNavbar: action.value };
    case "OPEN_CONFIGURATOR":
      return { ...state, openConfigurator: action.value };
    default:
      throw new Error(`Unhandled action type: ${action.type}`);
  }
}

export function MaterialTailwindControllerProvider({ children }) {
  const initialState = {
    openSidenav: false,
    sidenavColor: "dark",
    sidenavType: "white",
    transparentNavbar: true,
    fixedNavbar: false,
    openConfigurator: false,
  };

  const [controller, dispatch] = useReducer(reducer, initialState);

  // Statistics state
  const [statistics, setStatistics] = useState({
    // table1: 0,
    // table2: 0,
    // table3: 0,
    // OWNERS: "Loading...",
    // EMPLOYEES: "Loading...",
    // MSWC: "Loading...",
    // GODOWN: "Loading...",
    // DRIVERS: "Loading...",
    // TRUCKS: "Loading...",
    // SCHEMES: "Loading...",
    // PACKAGING: "Loading...",
  });

  // Fetch statistics data
  useEffect(() => {
    const fetchStatistics = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/getRowCounts");
        const data = await response.json();
        setStatistics(data);
      } catch (error) {
        console.error("Error fetching statistics:", error);
      }
    };
    fetchStatistics();
  }, []);

  // Combine UI and statistics state in context value
  const contextValue = React.useMemo(
    () => ({ controller, dispatch, statistics }),
    [controller, dispatch, statistics]
  );

  return (
    <MaterialTailwind.Provider value={contextValue}>
      {children}
    </MaterialTailwind.Provider>
  );
}

// Custom hook to access context
export function useMaterialTailwindController() {
  const context = useContext(MaterialTailwind);
  if (!context) {
    throw new Error("useMaterialTailwindController must be used within MaterialTailwindControllerProvider.");
  }
  return context;
}

MaterialTailwindControllerProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

// Action creators for UI state
export const setOpenSidenav = (dispatch, value) => dispatch({ type: "OPEN_SIDENAV", value });
export const setSidenavType = (dispatch, value) => dispatch({ type: "SIDENAV_TYPE", value });
export const setSidenavColor = (dispatch, value) => dispatch({ type: "SIDENAV_COLOR", value });
export const setTransparentNavbar = (dispatch, value) => dispatch({ type: "TRANSPARENT_NAVBAR", value });
export const setFixedNavbar = (dispatch, value) => dispatch({ type: "FIXED_NAVBAR", value });
export const setOpenConfigurator = (dispatch, value) => dispatch({ type: "OPEN_CONFIGURATOR", value });
