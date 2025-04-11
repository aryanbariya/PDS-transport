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
  IdentificationIcon,
  ShoppingBagIcon,
  TagIcon,
  HomeModernIcon,
} from "@heroicons/react/24/solid";

import { GiSteeringWheel, GiWheat, GiCardboardBox } from "react-icons/gi";
import { MdWarehouse, MdCategory, MdBusiness } from "react-icons/md";
import { useMaterialTailwindController } from "@/context";

const StatisticsCardsData = () => {
  const { statistics } = useMaterialTailwindController();

  if (!statistics) return [];

  const statisticsCardsData = [
    {
      color: "blue",
      icon: UserCircleIcon,
      title: "Owner Management",
      value: statistics.ownercount,
      link: "/owners",
      tooltipText: "Manage organization owners",
      bgGradient: "bg-gradient-to-r from-blue-500 to-indigo-600",
      iconBgColor: "bg-gradient-to-tr from-blue-600 to-blue-400",
      totalLabel: `Total: ${statistics.ownercount} Owners`,
      footer: {
        color: "text-green-500",
        value: statistics.lastModifiedOwners || "NIL",
        label: "Last updated",
      },
    },
    {
      color: "purple",
      icon: IdentificationIcon,
      title: "Employee Records",
      value: statistics.employeecount,
      link: "/employee",
      tooltipText: "Manage employee records",
      bgGradient: "bg-gradient-to-r from-purple-400 to-pink-500",
      iconBgColor: "bg-gradient-to-tr from-purple-600 to-purple-400",
      totalLabel: `Total: ${statistics.employeecount} Employees`,
      footer: {
        color: "text-green-500",
        value: statistics.lastModifiedEmployee || "NIL",
        label: "Last updated",
      },
    },
    {
      color: "amber",
      icon: MdBusiness,
      title: "MSWC Facilities",
      value: statistics.mswccount,
      link: "/mswc",
      tooltipText: "MSWC godown management",
      bgGradient: "bg-gradient-to-r from-amber-400 to-orange-500",
      iconBgColor: "bg-gradient-to-tr from-amber-600 to-amber-400",
      totalLabel: `Total: ${statistics.mswccount} Godowns`,
      footer: {
        color: "text-green-500",
        value: statistics.lastModifiedMSWC || "NIL",
        label: "Last updated",
      },
    },
    {
      color: "teal",
      icon: HomeModernIcon,
      title: "Godown Network",
      value: statistics.godowncount,
      link: "/godown",
      tooltipText: "Manage warehouse facilities",
      bgGradient: "bg-gradient-to-r from-teal-400 to-green-500",
      iconBgColor: "bg-gradient-to-tr from-teal-600 to-teal-400",
      totalLabel: `Total: ${statistics.godowncount} Sub-Godowns`,
      footer: {
        color: "text-green-500",
        value: statistics.lastModifiedSubGodown || "NIL",
        label: "Last updated",
      },
    },
    {
      color: "red",
      icon: GiSteeringWheel,
      title: "Driver Management",
      value: statistics.drivercount,
      link: "/driver",
      tooltipText: "Driver personnel management",
      bgGradient: "bg-gradient-to-r from-red-400 to-pink-500",
      iconBgColor: "bg-gradient-to-tr from-red-600 to-red-400",
      totalLabel: `Total: ${statistics.drivercount} Drivers`,
      footer: {
        color: "text-green-500",
        value: statistics.lastModifieddriver || "NIL",
        label: "Last updated",
      },
    },
    {
      color: "indigo",
      icon: TruckIcon,
      title: "Vehicle Fleet",
      value: statistics.truckcount,
      link: "/truck",
      tooltipText: "Fleet management system",
      bgGradient: "bg-gradient-to-r from-indigo-400 to-blue-500",
      iconBgColor: "bg-gradient-to-tr from-indigo-600 to-indigo-400",
      totalLabel: `Total: ${statistics.truckcount} Trucks`,
      footer: {
        color: "text-green-500",
        value: statistics.lastModifiedTruck || "NIL",
        label: "Last updated",
      },
    },
    {
      color: "cyan",
      icon: ShoppingBagIcon,
      title: "Distribution Schemes",
      value: statistics.schemecount,
      link: "/scheme",
      tooltipText: "Distribution scheme details",
      bgGradient: "bg-gradient-to-r from-cyan-400 to-blue-400",
      iconBgColor: "bg-gradient-to-tr from-cyan-600 to-cyan-400",
      totalLabel: `Total: ${statistics.schemecount} Schemes`,
      footer: {
        color: "text-green-500",
        value: statistics.lastModifiedScheme || "NIL",
        label: "Last updated",
      },
    },
    {
      color: "deep-orange",
      icon: GiCardboardBox,
      title: "Packaging Inventory",
      value: statistics.packagingcount,
      link: "/packaging",
      tooltipText: "Packaging inventory system",
      bgGradient: "bg-gradient-to-r from-orange-500 to-deep-orange-600",
      iconBgColor: "bg-gradient-to-tr from-deep-orange-600 to-deep-orange-400",
      totalLabel: `Total: ${statistics.packagingcount} Packages`,
      footer: {
        color: "text-green-500",
        value: statistics.lastModifiedPackaging || "NIL",
        label: "Last updated",
      },
    },
    {
      color: "lime",
      icon: GiWheat,
      title: "Grain Inventory",
      value: statistics.graincount || "0",
      link: "/grain",
      tooltipText: "Manage grain inventory",
      bgGradient: "bg-gradient-to-r from-lime-400 to-green-500",
      iconBgColor: "bg-gradient-to-tr from-lime-600 to-lime-400",
      totalLabel: `Total: ${statistics.graincount || "0"} Grain Types`,
      footer: {
        color: "text-green-500",
        value: statistics.lastModifiedGrain || "NIL",
        label: "Last updated",
      },
    },
    {
      color: "pink",
      icon: MdCategory,
      title: "Product Categories",
      value: statistics.categorycount || "0",
      link: "/category",
      tooltipText: "Manage product categories",
      bgGradient: "bg-gradient-to-r from-pink-400 to-purple-500",
      iconBgColor: "bg-gradient-to-tr from-pink-600 to-pink-400",
      totalLabel: `Total: ${statistics.categorycount || "0"} Categories`,
      footer: {
        color: "text-green-500",
        value: statistics.lastModifiedCategory || "NIL",
        label: "Last updated",
      },
    },
  ];

  return statisticsCardsData; 
};

export default StatisticsCardsData;
