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
import { Home, Profile, Tables, Notifications } from "@/pages/dashboard";
import { MdMiscellaneousServices, MdEditNote, MdLocalShipping } from "react-icons/md"
import { TbReport, TbFileInvoice } from "react-icons/tb";
import { FaClipboardCheck } from "react-icons/fa6";
import { SignIn, SignUp } from "@/pages/auth";
import Manage from "./pages/dashboard/Manage";
import FirstTapa from "./pages/dashboard/FirstTapa";
import FirstTapaReport from "./pages/dashboard/FirstTapaReport";
import SecondDispatchReport from "./pages/dashboard/SecondDispatchReport";
import SecondDispatch from "./pages/dashboard/SecondDispatch";
import SecondTapa from "./pages/dashboard/SecondTapa";
import MSWCGodownPage from "./pages/dashboard/MSWCGodown";
import SubGodownPage from "./pages/dashboard/SubGodownPage";
import OwnerNamePage from "./pages/dashboard/OwnerNamePage";
import EmployeePage from "./pages/dashboard/EmployeePage";
import DriverPage from "./pages/dashboard/DriverPage";
import TruckPage from "./pages/dashboard/TruckPage";
import PackagingPage from "./pages/dashboard/PackagingPage";
import SchemePage from "./pages/dashboard/SchemePage";
import CategoryPage from "./pages/dashboard/CategoryPage";
import DOPage from "./pages/dashboard/DOCards";
import DOCards from "./pages/dashboard/DOCards";
import DOGenerateForm from "./pages/dashboard/DOGenerateForm";
import DOGeneratePage from "./pages/dashboard/DOGeneratePage";
import DOAllocationPage from "./pages/dashboard/DOAllocationPage";
import GrainPage from "./pages/dashboard/GrainPage";
import FirstTransport from "@/pages/dashboard/FirstTransport";

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
