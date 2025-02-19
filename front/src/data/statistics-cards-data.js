// import {
//   BanknotesIcon,
//   UserPlusIcon,
//   UsersIcon,
//   ChartBarIcon,
//   TruckIcon,
//   BuildingStorefrontIcon,
//   // PackageIcon,
// } from "@heroicons/react/24/solid";

// export const statisticsCardsData = [
//   {
//     color: "gray",
//     icon: BanknotesIcon,
//     title: "OWNERS",
//     value: "$53k",
//     route: "/OwnerNamePage", 
//   },
//   {
//     color: "gray",
//     icon: UsersIcon,
//     title: "EMPLOYEES",
//     value: "2,300",
//     route: "/EmployeePage",
//   },
//   {
//     color: "gray",
//     icon: UserPlusIcon,
//     title: "MSWC",
//     value: "3,462",
//     route: "/MSWCGodownPage",
//   },
//   {
//     color: "gray",
//     icon: ChartBarIcon,
//     title: "SubGodown",
//     value: "15 Warehouses",
//     route: "/SubGodownPage",
//   },
//   {
//     color: "gray",
//     icon: TruckIcon,
//     title: "CATEGORY",
//     value: "120",
//     route: "/CategoryPage",
//   },
//   {
//     color: "gray",
//     icon: TruckIcon,
//     title: "TRUCKS",
//     value: "85",
//     route: "/TruckPage",
//   },
//   {
//     color: "gray",
//     icon: BuildingStorefrontIcon,
//     title: "SCHEMES",
//     value: "12 Active",
//     route: "/SchemePage",
//   },
//   {
//     color: "gray",
//     icon: BuildingStorefrontIcon,
//     title: "PACKAGING",
//     value: "40k Units",
//     route: "/PackagingPage",
//   },
// ];

// export default statisticsCardsData;


import {
  BanknotesIcon,
  UserPlusIcon,
  UsersIcon,
  ChartBarIcon,
} from "@heroicons/react/24/solid";

export const statisticsCardsData = [
  {
    color: "gray",
    icon: BanknotesIcon,
    title: "OWNERS",
    value: "$53k",
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
    value: "2,300",
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
    value: "3,462",
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
    value: "$103,430",
    footer: {
      color: "text-green-500",
      value: "+5%",
      label: "than yesterday",
    },
  },
  {
    color: "gray",
    icon: ChartBarIcon,
    title: "DRIVERS",
    value: "$103,430",
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
    value: "$103,430",
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
    value: "$103,430",
    footer: {
      color: "text-green-500",
      value: "+5%",
      label: "than yesterday",
    },
  },
  {
    color: "gray",
    icon: ChartBarIcon,
    title: "PACKAGING",
    value: "$103,430",
    footer: {
      color: "text-green-500",
      value: "+5%",
      label: "than yesterday",
    },
  },
];

export default statisticsCardsData;