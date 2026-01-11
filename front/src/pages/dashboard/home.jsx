import React from "react";
import { Link } from "react-router-dom";
import {
  Typography,
  Card,
  CardHeader,
  CardBody,
  IconButton,
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
  Avatar,
  Tooltip,
  Progress,
} from "@material-tailwind/react";
import {
  EllipsisVerticalIcon,
  ArrowUpIcon,
} from "@heroicons/react/24/outline";
import { StatisticsCard } from "@/widgets/cards";
// import { StatisticsChart } from "@/widgets/charts";
import {
  // statisticsCardsData,
  projectsTableData,
  ordersOverviewData,
} from "@/data";
import { CheckCircleIcon, ClockIcon } from "@heroicons/react/24/solid";
import { Player } from "@lottiefiles/react-lottie-player";
import truckAnimation from "@/util/Animation.json"; // ✅ Import JSON animation
import StatisticsCardsData from "@/data/statistics-cards-data";

export function Home() {
  const data = StatisticsCardsData(); // Get updated data

  return (
    <div className="mt-4">
      {data.length === 0 ? (
        // 🚚 Truck Loader Animation While Fetching Data
        <div className="flex justify-center items-center h-64">
          <Player
            autoplay
            loop
            src={truckAnimation}
            style={{ height: "150px", width: "150px" }}
          />
        </div>
      ) : (
        <div className="mb-8 grid gap-y-8 gap-x-6 md:grid-cols-2 xl:grid-cols-4">
          {data.map(({ icon, title, link, totalLabel, footer, ...rest }, index) => (
            <div 
              key={title}
              className="animate-fade-in"
              style={{
                animationDelay: `${index * 0.1}s`,
                opacity: 0, // Start invisible
                animation: `fadeIn 0.5s ease-out ${index * 0.1}s forwards`
              }}
            >
              <StatisticsCard
                {...rest}
                title={title}
                value={rest.value ?? "Loading"}
                totalLabel={totalLabel}
                icon={React.createElement(icon, {
                  className: "w-6 h-6 text-white",
                })}
                link={link}
              />
            </div>
          ))}
        </div>
      )}

      {/* Add fade-in animation keyframes */}
      <style jsx global>{`
        @keyframes fadeIn {
          from { 
            opacity: 0; 
            transform: translateY(10px);
          }
          to { 
            opacity: 1; 
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
}

export default Home;



