import {
  HomeIcon,
  UserCircleIcon,
  TableCellsIcon,
  InformationCircleIcon,
  ServerStackIcon,
  RectangleStackIcon,
} from "@heroicons/react/24/solid";
import { Home, Profile, Tables, Notifications } from "@/pages/dashboard";
import { MdMiscellaneousServices, MdEditNote  } from "react-icons/md"
import { TbReport } from "react-icons/tb";
import { FaClipboardCheck } from "react-icons/fa6";
import { SignIn, SignUp } from "@/pages/auth";
import Manage from "./pages/dashboard/Manage";
import FirstTapa from "./pages/dashboard/FirstTapa";
import FirstTapaReport from "./pages/dashboard/FirstTapaReport";
import SecondDispatchReport from "./pages/dashboard/SecondDispatchReport";
import SecondDispatch from "./pages/dashboard/SecondDispatch";
import SecondTapa from "./pages/dashboard/SecondTapa";
// import EmployeePage from "./pages/dashboard/EmployeePage";
// import MSWCGodownPage from "./pages/dashboard/MSWCGodown";
// import SubGodownPage from "./pages/dashboard/SubGodownPage";
// import OwnerNamePage from "./pages/dashboard/OwnerNamePage";
// import GrainPage from "./pages/dashboard/GrainPage";
// import TruckPage from "./pages/dashboard/TruckPage";
// import PackagingPage from "./pages/dashboard/PackagingPage";
// import CategoryPage from "./pages/dashboard/CategoryPage";
// import SchemePage from "./pages/dashboard/SchemePage";
const icon = {
  className: "w-5 h-5 text-inherit",
};

export const routes = [
  {
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
      },
      {
        icon: <MdEditNote {...icon} />,
        name: "1stTapa",
        path: "/firstTapa",
        element: <FirstTapa />,
      },
      {
        icon: <TbReport {...icon} />,
        name: "1stTapaReports",
        path: "/firstTapareport",
        element: <FirstTapaReport />,
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
      // {
      //   icon: <UserCircleIcon {...icon} />,
      //   name: "profile",
      //   path: "/profile",
      //   element: <Profile />,
      // },
      // {
      //   icon: <TableCellsIcon {...icon} />,
      //   name: "tables",
      //   path: "/tables",
      //   element: <Tables />,
      // },
      // {
      //   icon: <InformationCircleIcon {...icon} />,
      //   name: "notifications",
      //   path: "/notifications",
      //   element: <Notifications />,
      // },
      // {
      //   icon: <HomeIcon {...icon} />,
      //   name: "MSWCGodownPage",
      //   path: "/MSWCGodownPage",
      //   element: <MSWCGodownPage />,
      // },
      // {
      //   icon: <HomeIcon {...icon} />,
      //   name: "SubGodownPage",
      //   path: "/SubGodownPage",
      //   element: <SubGodownPage />,
      // },
      // {
      //   icon: <UserCircleIcon {...icon} />,
      //   name: "EmploeePage",
      //   path: "/EmployeePage",
      //   element: <EmployeePage />,
      // },
      // {
      //   icon: <UserCircleIcon {...icon} />,
      //   name: "OwnerNamePage",
      //   path: "/OwnerNamePage",
      //   element: <OwnerNamePage />,
      // },
      // {
      //   icon: <UserCircleIcon {...icon} />,
      //   name: "GrainPage",
      //   path: "/GrainPage",
      //   element: <GrainPage />,
      // },
      // {
      //   icon: <UserCircleIcon {...icon} />,
      //   name: "TruckPage",
      //   path: "/TruckPage",
      //   element: <TruckPage />,
      // },
      // {
      //   icon: <InformationCircleIcon {...icon} />,
      //   name: "PackagingPage",
      //   path: "/PackagingPage",
      //   element: <PackagingPage />,
      // },
      // {
      //   icon: <InformationCircleIcon {...icon} />,
      //   name: "CategoryPage",
      //   path: "/CategoryPage",
      //   element: <CategoryPage />,
      // },
      // {
      //   icon: <InformationCircleIcon {...icon} />,
      //   name: "SchemePage",
      //   path: "/SchemePage",
      //   element: <SchemePage />,
      // },
    ],
  },
  {
    title: "auth pages",
    layout: "auth",
    pages: [
      {
        icon: <ServerStackIcon {...icon} />,
        name: "sign in",
        path: "/sign-in",
        element: <SignIn />,
      },
      {
        icon: <RectangleStackIcon {...icon} />,
        name: "sign up",
        path: "/sign-up",
        element: <SignUp />,
      },
    ],
  },
];

export default routes;
