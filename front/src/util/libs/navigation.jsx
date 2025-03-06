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
