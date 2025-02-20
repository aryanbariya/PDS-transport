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
  BanknotesIcon,
  UserPlusIcon,
  UsersIcon,
  ChartBarIcon,
} from "@heroicons/react/24/solid";
import { useMaterialTailwindController } from "@/context";

const StatisticsCardsData = () => {
  const { statistics } = useMaterialTailwindController();

  const statisticsCardsData = [
    {
      color: "gray",
      icon: BanknotesIcon,
      title: "OWNERS",
      value: statistics.ownercount || "NIL",
      link: "/owners",
      footer: {
        color: "text-green-500",
        value: "+55%",
        label: "than last week",
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
        value: "+3%",
        label: "than last month",
      },
    },
    {
      color: "gray",
      icon: UserPlusIcon,
      title: "MSWC",
      value: statistics.mswccount || "NIL",
      link: "/mswc",
      footer: {
        color: "text-red-500",
        value: "-2%",
        label: "than yesterday",
      },
    },
    {
      color: "gray",
      icon: ChartBarIcon,
      title: "GODOWN",
      value: statistics.godowncount || "NIL",
      link: "/godown",
      footer: {
        color: "text-green-500",
        value: "+5%",
        label: "than yesterday",
      },
    },
    {
      color: "gray",
      icon: ChartBarIcon,
      title:"DRIVERS",
      value:  statistics. drivercount || "NIL",
      link: "/driver",
      footer: {
        color: "text-green-500",
        value: "+5%",
        label: "than yesterday",
      },
    },
    {
      color: "gray",
      icon: ChartBarIcon,
      title: "TRUCKS",
      value:  statistics.truckcount ||"NIL",
      link: "/truck",
      footer: {
        color: "text-green-500",
        value: "+5%",
        label: "than yesterday",
      },
    },
    {
      color: "gray",
      icon: ChartBarIcon,
      title: "SCHEMES",
      value: statistics.schemecount || "NIL",
      link: "/scheme",
      footer: {
        color: "text-green-500",
        value: "+5%",
        label: "than yesterday",
      },
    },
    {
      color: "gray",
      icon: ChartBarIcon,
      title:  "PACKAGING",
      value: statistics.packagingcount ||"NIL",
      link: "/packaging",
      footer: {
        color: "text-green-500",
        value: "+5%",
        label: "than yesterday",
      },
    },
  ];

  return statisticsCardsData; // Return the data if needed for rendering
};

export default StatisticsCardsData;
