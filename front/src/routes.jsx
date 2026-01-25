import React, { lazy } from "react";
import {
  HomeIcon,
  UserCircleIcon,
  UsersIcon,
  BuildingOffice2Icon,
  TruckIcon,
  ClipboardDocumentListIcon,
  ArchiveBoxIcon,
  TableCellsIcon,
  InformationCircleIcon,
  ServerStackIcon,
  RectangleStackIcon,
  DocumentTextIcon,
} from "@heroicons/react/24/solid";
import { MdWarehouse } from "react-icons/md";
import { GiSteeringWheel } from "react-icons/gi";
import { MdMiscellaneousServices, MdEditNote, MdLocalShipping } from "react-icons/md"
import { TbReport, TbFileInvoice } from "react-icons/tb";
import { FaClipboardCheck } from "react-icons/fa6";

// Lazy loading pages
const Home = lazy(() => import("@/pages/dashboard").then(module => ({ default: module.Home })));
const Manage = lazy(() => import("./pages/dashboard/Manage"));
const FirstTapa = lazy(() => import("./pages/dashboard/FirstTapa"));
const FirstTapaReport = lazy(() => import("./pages/dashboard/FirstTapaReport"));
const SecondDispatchReport = lazy(() => import("./pages/dashboard/SecondDispatchReport"));
const SecondDispatch = lazy(() => import("./pages/dashboard/SecondDispatch"));
const SecondTapa = lazy(() => import("./pages/dashboard/SecondTapa"));
const MSWCGodownPage = lazy(() => import("./pages/dashboard/MSWCGodown"));
const SubGodownPage = lazy(() => import("./pages/dashboard/SubGodownPage"));
const OwnerNamePage = lazy(() => import("./pages/dashboard/OwnerNamePage"));
const EmployeePage = lazy(() => import("./pages/dashboard/EmployeePage"));
const DriverPage = lazy(() => import("./pages/dashboard/DriverPage"));
const TruckPage = lazy(() => import("./pages/dashboard/TruckPage"));
const PackagingPage = lazy(() => import("./pages/dashboard/PackagingPage"));
const SchemePage = lazy(() => import("./pages/dashboard/SchemePage"));
const CategoryPage = lazy(() => import("./pages/dashboard/CategoryPage"));
const DOCards = lazy(() => import("./pages/dashboard/DOCards"));
const DOGeneratePage = lazy(() => import("./pages/dashboard/DOGeneratePage"));
const DOAllocationPage = lazy(() => import("./pages/dashboard/DOAllocationPage"));
const GrainPage = lazy(() => import("./pages/dashboard/GrainPage"));
const FirstTransport = lazy(() => import("@/pages/dashboard/FirstTransport"));

const icon = {
  className: "w-5 h-5 text-inherit",
};

export const routes = [
  {
    title: "Navigation",
    layout: "dashboard",
    pages: [
      {
        icon: <HomeIcon {...icon} />,
        name: "dashboard",
        path: "/home",
        element: <Home />,
      },
      {
        icon: <MdMiscellaneousServices {...icon} />,
        name: "manage",
        path: "/manage",
        element: <Manage />,
        subPages: [
          {
            icon: UserCircleIcon,
            name: "Owners ",
            path: "/owners",
            element: <OwnerNamePage />,
          },
          {
            icon: UsersIcon,
            name: "Employees",
            path: "/employees",
            element: <EmployeePage />,
          },
          {
            icon: BuildingOffice2Icon,
            name: "MSWC Godown",
            path: "/mswc-godown",
            element: <MSWCGodownPage />,
          },
          {
            icon: MdWarehouse,
            name: "Sub Godown",
            path: "/sub-godown",
            element: <SubGodownPage />,
          },
          {
            icon: GiSteeringWheel,
            name: "Drivers",
            path: "/drivers",
            element: <DriverPage />,
          },
          {
            icon: TruckIcon,
            name: "Trucks",
            path: "/trucks",
            element: <TruckPage />,
          },
          {
            icon: TruckIcon,
            name: "GrainPage",
            path: "/GrainPage",
            element: <GrainPage />,
          },
          {
            icon: ClipboardDocumentListIcon,
            name: "Schemes",
            path: "/schemes",
            element: <SchemePage />,
          },
          {
            icon: ArchiveBoxIcon,
            name: "Packaging",
            path: "/packaging",
            element: <PackagingPage />,
          },
          {
            icon: <FaClipboardCheck {...icon} />,
            name: "Categories",
            path: "/categories",
            element: <CategoryPage />,
          },
        ],
      },
      {
        icon: <TbFileInvoice {...icon} />,
        name: "DOCards",
        path: "/DOCards",
        element: <DOCards />,
      },
      {
        icon: <MdLocalShipping {...icon} />,
        name: "First Transport",
        path: "/firstTransport",
        element: <FirstTransport />,
      },
      {
        icon: <MdEditNote {...icon} />,
        name: "2ndTapa",
        path: "/secondTapa",
        element: <SecondTapa />,
      },
      {
        icon: <FaClipboardCheck {...icon} />,
        name: "2ndDispatch",
        path: "/secondDispatch",
        element: <SecondDispatch />,
      },
      {
        icon: <FaClipboardCheck {...icon} />,
        name: "2ndDispatchReports",
        path: "/secondDispatchreport",
        element: <SecondDispatchReport />,
      },
      {
        icon: <FaClipboardCheck {...icon} />,
        name: "DOGeneratePage",
        path: "/DOGeneratePage",
        element: <DOGeneratePage />,
      },
      {
        icon: <FaClipboardCheck {...icon} />,
        name: "DOAllocationPage",
        path: "/DOAllocationPage",
        element: <DOAllocationPage />,
      },
    ],
  },
  // {
  //   title: "auth pages",
  //   layout: "auth",
  //   pages: [
  //     {
  //       icon: <ServerStackIcon {...icon} />,
  //       name: "sign in",
  //       path: "/sign-in",
  //       element: <SignIn />,
  //     },
  //     {
  //       icon: <RectangleStackIcon {...icon} />,
  //       name: "sign up",
  //       path: "/sign-up",
  //       element: <SignUp />,
  //     },
  //   ],
  // },
];

export default routes;
