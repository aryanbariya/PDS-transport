import { useLocation } from "react-router-dom";
import { Typography } from "@mui/material"; // Assuming you're using MUI

const Navigation = () => {
    const { pathname } = useLocation();
    const path = pathname.startsWith("/") ? pathname.substring(1) : pathname;

    return (
        <div >
            <div className="capitalize">
                <Typography variant="h6" color="blue-gray">
                    {path || "Home"} {/* Fallback for root path */}
                </Typography>
            </div>
        </div>
    );
};

export default Navigation;
// import { useLocation, Link } from "react-router-dom";
// import { Typography, Breadcrumbs } from "@mui/material";

// const Navigation = () => {
//     const { pathname } = useLocation();
//     const pathSegments = pathname.split("/").filter((segment) => segment);

//     return (
//         <div>
//             <Breadcrumbs aria-label="breadcrumb">
//                 <Link to="/" style={{ textDecoration: "none", color: "inherit" }}>
//                     <Typography variant="h6" color="blue-gray">Home</Typography>
//                 </Link>
//                 {pathSegments.map((segment, index) => {
//                     const routeTo = `/${pathSegments.slice(0, index + 1).join("/")}`;
//                     return (
//                         <Link key={index} to={routeTo} style={{ textDecoration: "none", color: "inherit" }}>
//                             <Typography variant="h6" color="blue-gray" className="capitalize">
//                                 {segment}
//                             </Typography>
//                         </Link>
//                     );
//                 })}
//             </Breadcrumbs>
//         </div>
//     );
// };

// export default Navigation;
