import {
  BanknotesIcon,
  UserPlusIcon,
  UsersIcon,
  ChartBarIcon,
  TruckIcon,
  BuildingStorefrontIcon,
  // PackageIcon,
} from "@heroicons/react/24/solid";

export const statisticsCardsData = [
  {
    color: "gray",
    icon: BanknotesIcon,
    title: "OWNERS",
    value: "$53k",
    route: "/OwnerNamePage", 
  },
  {
    color: "gray",
    icon: UsersIcon,
    title: "EMPLOYEES",
    value: "2,300",
    route: "/EmployeePage",
  },
  {
    color: "gray",
    icon: UserPlusIcon,
    title: "MSWC",
    value: "3,462",
    route: "/MSWCGodownPage",
  },
  {
    color: "gray",
    icon: ChartBarIcon,
    title: "SubGodown",
    value: "15 Warehouses",
    route: "/SubGodownPage",
  },
  {
    color: "gray",
    icon: TruckIcon,
    title: "CATEGORY",
    value: "120",
    route: "/CategoryPage",
  },
  {
    color: "gray",
    icon: TruckIcon,
    title: "TRUCKS",
    value: "85",
    route: "/TruckPage",
  },
  {
    color: "gray",
    icon: BuildingStorefrontIcon,
    title: "SCHEMES",
    value: "12 Active",
    route: "/SchemePage",
  },
  {
    color: "gray",
    icon: BuildingStorefrontIcon,
    title: "PACKAGING",
    value: "40k Units",
    route: "/PackagingPage",
  },
];

export default statisticsCardsData;
