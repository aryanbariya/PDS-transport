import {
  HomeIcon,
  UserCircleIcon,
  TableCellsIcon,
  InformationCircleIcon,
  ServerStackIcon,
  RectangleStackIcon,
} from "@heroicons/react/24/solid";
import { Home, Profile, Tables, Notifications } from "@/pages/dashboard";
import { SignIn, SignUp } from "@/pages/auth";
import EmployeePage from "./pages/dashboard/EmployeePage";
import MSWCGodownPage from "./pages/dashboard/MSWCGodown";
import SubGodownPage from "./pages/dashboard/SubGodownPage";
import OwnerNamePage from "./pages/dashboard/OwnerNamePage";
import GrainPage from "./pages/dashboard/GrainPage";
import TruckPage from "./pages/dashboard/TruckPage";
<<<<<<< HEAD

=======
>>>>>>> 59f95b0 (Resolved merge conflicts)
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
        icon: <UserCircleIcon {...icon} />,
        name: "profile",
        path: "/profile",
        element: <Profile />,
      },
      {
        icon: <TableCellsIcon {...icon} />,
        name: "tables",
        path: "/tables",
        element: <Tables />,
      },
      {
        icon: <InformationCircleIcon {...icon} />,
        name: "notifications",
        path: "/notifications",
        element: <Notifications />,
      },
      {
        icon: <HomeIcon {...icon} />,
        name: "MSWCGodownPage",
        path: "/MSWCGodownPage",
        element: <MSWCGodownPage />,
      },
      // {
      //   icon: <HomeIcon {...icon} />,
      //   name: "Pannel",
      //   path: "/Pannel",
      //   element: <Pannel />,
      // },
      {
        icon: <HomeIcon {...icon} />,
        name: "SubGodownPage",
        path: "/SubGodownPage",
        element: <SubGodownPage />,
      },
      {
        icon: <UserCircleIcon {...icon} />,
        name: "EmploeePage",
        path: "/EmployeePage",
        element: <EmployeePage />,
      },
<<<<<<< HEAD
      {
        icon: <UserCircleIcon {...icon} />,
        name: "OwnerNamePage",
        path: "/OwnerNamePage",
        element: <OwnerNamePage />,
      },
=======
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
>>>>>>> 59f95b0 (Resolved merge conflicts)
      {
        icon: <UserCircleIcon {...icon} />,
        name: "TruckPage",
        path: "/TruckPage",
        element: <TruckPage />,
      },
      {
        icon: <InformationCircleIcon {...icon} />,
        name: "TruckPage",
        path: "/TruckPage",
        element: <TruckPage />,
      },
      // {
      //   icon: <InformationCircleIcon {...icon} />,
      //   name: "PackagingPage",
      //   path: "/PackagingPage",
      //   element: <PackagingPage />,
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
