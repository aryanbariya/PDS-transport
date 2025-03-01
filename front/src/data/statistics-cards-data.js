// import {
//   BanknotesIcon,
//   UserPlusIcon,
//   UsersIcon,
//   ChartBarIcon,
// } from "@heroicons/react/24/solid";


// export const statisticsCardsData =  [
//     {
//       color: "gray",
//       icon: BanknotesIcon,
//       title: "OWNERS",
//       value:  "Loading...",
//       footer: {
//         color: "text-green-500",
//         value: "+55%",
//         label: "than last week",
//       },
//     },
//     {
//       color: "gray",
//       icon: UsersIcon,
//       title: "EMPLOYEES",
//       value: "Loading...",
//       footer: {
//         color: "text-green-500",
//         value: "+3%",
//         label: "than last month",
//       },
//     },
//     {
//       color: "gray",
//       icon: UserPlusIcon,
//       title: "MSWC",
//       value: "Loading...",
//       footer: {
//         color: "text-red-500",
//         value: "-2%",
//         label: "than yesterday",
//       },
//     },
//     {
//       color: "gray",
//       icon: ChartBarIcon,
//       title: "GODOWN",
//       value: "$103,430",
//       footer: {
//         color: "text-green-500",
//         value: "+5%",
//         label: "than yesterday",
//       },
//     },
//     {
//       color: "gray",
//       icon: ChartBarIcon,
//       title: "DRIVERS",
//       value: "$103,430",
//       footer: {
//         color: "text-green-500",
//         value: "+5%",
//         label: "than yesterday",
//       },
//     },
//     {
//       color: "gray",
//       icon: ChartBarIcon,
//       title: "TRUCKS",
//       value: "$103,430",
//       footer: {
//         color: "text-green-500",
//         value: "+5%",
//         label: "than yesterday",
//       },
//     },
//     {
//       color: "gray",
//       icon: ChartBarIcon,
//       title: "SCHEMES",
//       value: "$103,430",
//       footer: {
//         color: "text-green-500",
//         value: "+5%",
//         label: "than yesterday",
//       },
//     },
//     {
//       color: "gray",
//       icon: ChartBarIcon,
//       title: "PACKAGING",
//       value: "$103,430",
//       footer: {
//         color: "text-green-500",
//         value: "+5%",
//         label: "than yesterday",
//       },
//     },
//   ];


// export default statisticsCardsData;


// Adjust path based on location
import {

  UsersIcon,
  TruckIcon,
  BuildingOffice2Icon,
  UserCircleIcon,
  ArchiveBoxIcon,
  ClipboardDocumentListIcon,


} from "@heroicons/react/24/solid";

import { GiSteeringWheel } from "react-icons/gi";
import { MdWarehouse } from "react-icons/md";
import { useMaterialTailwindController } from "@/context";

const StatisticsCardsData = () => {
  const { statistics } = useMaterialTailwindController();

  const statisticsCardsData = [
    {
      color: "gray",
      icon: UserCircleIcon,
      title: "OWNERS",
      value: statistics.ownercount || "NIL",
      link: "/owners",
      footer: {
      color: "text-green-500",
      value:  statistics.lastModifiedOwners||"NIL",
      label: "Last updated",
      },
    },
    {
      color: "gray",
      icon: UsersIcon,
      title: "EMPLOYEES",
      value: statistics.employeecount || "NIL",
      link: "/employee",
      footer: {
        color: "text-green-500",
        value: statistics.lastModifiedEmployee||"NIL",
        label: "Last updated",
      },
    },
    {
      color: "gray",
      icon: BuildingOffice2Icon,
      title: "MSWC",
      value: statistics.mswccount || "NIL",
      link: "/mswc",
      footer: {
        color: "text-green-500",
        value: statistics.lastModifiedMSWC||"NIL",
        label: "Last updated",
      },
    },
    {
      color: "gray",
      icon: MdWarehouse,
      title: "GODOWN",
      value: statistics.godowncount || "NIL",
      link: "/godown",
      footer: {
        color: "text-green-500",
        value: statistics.lastModifiedSubGodown||"NIL",
        label: "Last updated",
      },
    },
    {
      color: "gray",
      icon: GiSteeringWheel,
      title:"DRIVERS",
      value:  statistics. drivercount || "NIL",
      link: "/driver",
      footer: {
        color: "text-green-500",
        value: statistics.lastModifieddriver||"NIL",
        label: "Last updated",
      },
    },
    {
      color: "gray",
      icon: TruckIcon,
      title: "TRUCKS",
      value:  statistics.truckcount ||"NIL",
      link: "/truck",
      footer: {
        color: "text-green-500",
        value: statistics.lastModifiedTruck||"NIL",
        label: "Last updated",
      },
    },
    {
      color: "gray",
      icon: ClipboardDocumentListIcon,
      title: "SCHEMES",
      value: statistics.schemecount || "NIL",
      link: "/scheme",
      footer: {
        color: "text-green-500",
        value: statistics.lastModifiedScheme||"NIL",
        label: "Last updated",
      },
    },
    {
      color: "gray",
      icon: ArchiveBoxIcon,
      title:  "PACKAGING",
      value: statistics.packagingcount ||"NIL",
      link: "/packaging",
      footer: {
        color: "text-green-500",
        value: statistics.lastModifiedPackaging||"NIL",
        label: "Last updated",
      },
    },
  ];

  return statisticsCardsData; // Return the data if needed for rendering
};

export default StatisticsCardsData;
