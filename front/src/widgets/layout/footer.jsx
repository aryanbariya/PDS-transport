// import PropTypes from "prop-types";
// import { Typography } from "@material-tailwind/react";
// import { HeartIcon } from "@heroicons/react/24/solid";

// export function Footer({ brandName, brandLink, routes }) {
//   const year = new Date().getFullYear();

//   return (
//     <footer className="py-2">
//       <div className="flex w-full flex-wrap items-center justify-center gap-6 px-2 md:justify-between">
//         <Typography variant="small" className="font-normal text-inherit">
//           &copy; {year}, made with{" "}
//           <HeartIcon className="-mt-0.5 inline-block h-3.5 w-3.5 text-red-600" /> by{" "}
//           <a
//             href={brandLink}
//             target="_blank"
//             className="transition-colors hover:text-blue-500 font-bold"
//           >
//             {brandName}
//           </a>{" "}
//           for a better web.
//         </Typography>
//         <ul className="flex items-center gap-4">
//           {routes.map(({ name, path }) => (
//             <li key={name}>
//               <Typography
//                 as="a"
//                 href={path}
//                 target="_blank"
//                 variant="small"
//                 className="py-0.5 px-1 font-normal text-inherit transition-colors hover:text-blue-500"
//               >
//                 {name}
//               </Typography>
//             </li>
//           ))}
//         </ul>
//       </div>
//     </footer>
//   );
// }

// Footer.defaultProps = {
//   brandName: "Creative Aryan",
//   brandLink: "https://www.creative-tim.com",
//   routes: [
//     { name: "Creative Tim",  },
//     { name: "About Us",  },
//     { name: "Blog",  },
//     { name: "License", },
//     // { name: "Creative Tim", path: "https://www.creative-tim.com" },
//     // { name: "About Us", path: "https://www.creative-tim.com/presentation" },
//     // { name: "Blog", path: "https://www.creative-tim.com/blog" },
//     // { name: "License", path: "https://www.creative-tim.com/license" },
//   ],
// };

// Footer.propTypes = {
//   brandName: PropTypes.string,
//   brandLink: PropTypes.string,
//   routes: PropTypes.arrayOf(PropTypes.object),
// };

// Footer.displayName = "/src/widgets/layout/footer.jsx";

// export default Footer;



// import PropTypes from "prop-types";
// import { Typography } from "@material-tailwind/react";
// import { HeartIcon } from "@heroicons/react/24/solid";

// export function Footer({ isSidebarOpen }) {
//   const year = new Date().getFullYear();

//   return (
//     <footer className="fixed bottom-4 left-4 right-4 transition-all duration-300">
//       <div
//         className={`w-full max-w-[calc(100%-2rem)] bg-white py-4 px-6 flex flex-wrap items-center justify-center md:justify-between shadow-lg rounded-2xl
//         ${isSidebarOpen ? "md:ml-[260px] md:w-[calc(100%-280px)]" : "md:ml-[80px] md:w-[calc(100%-100px)]"}`}
//       >
//         <Typography variant="small" className="font-normal text-gray-700 text-center">
//           &copy; {year}, made with{" "}
//           <HeartIcon className="-mt-0.5 inline-block h-3.5 w-3.5 text-red-600" /> by{" "}
//           <a
//             href="https://www.creative-tim.com"
//             target="_blank"
//             rel="noopener noreferrer"
//             className="transition-colors hover:text-blue-500 font-bold"
//           >
//             Creative Aryan
//           </a>{" "}
//           for a better web.
//         </Typography>
//         <ul className="flex items-center gap-4">
//           {["About Us", "Blog", "License"].map((name, index) => (
//             <li key={index}>
//               <Typography
//                 as="a"
//                 href="#"
//                 variant="small"
//                 className="py-0.5 px-1 font-normal text-gray-700 transition-colors hover:text-blue-500"
//               >
//                 {name}
//               </Typography>
//             </li>
//           ))}
//         </ul>
//       </div>
//     </footer>
//   );
// }

// Footer.propTypes = {
//   isSidebarOpen: PropTypes.bool,
// };

// Footer.defaultProps = {
//   isSidebarOpen: true,
// };

// export default Footer;


import PropTypes from "prop-types";
import { Typography } from "@material-tailwind/react";
import { HeartIcon, MapPinIcon, PhoneIcon, EnvelopeIcon } from "@heroicons/react/24/solid";

export function Footer({ isSidebarOpen }) {
  const year = new Date().getFullYear();

  return (
    <footer className={`bg-gray-900 text-white  transition-all duration-300 left-0 w-full`}>
    {/* // <footer className={`bg-gray-900 text-white transition-all duration-300 fixed bottom-0 left-0 w-full`}> */}

      {/* Copyright */}
      <div className="">
        {/* <Typography variant="small" className="text-gray-400 flex justify-center items-center">
          <p>&copy; {year} PDS Transport. Made with <HeartIcon className="inline-block h-4 w-4 text-red-500" /> by{" "}</p>
          <a href="https://www.creative-tim.com" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-500 font-bold">
            Creative Aryan
          </a>
        </Typography> */}
        <Typography
          variant="small"
          className="text-gray-400 flex flex-col md:flex-row justify-center items-center text-xs sm:text-sm md:text-base lg:text-lg"
        >
          <p className="text-center">
            &copy; {year} PDS Transport. Made with{" "}
            <HeartIcon className="inline-block h-4 w-4 text-red-500" /> by{" "}
            <a
              href="https://www.creative-tim.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-400 hover:text-blue-500 font-bold"
            >
              Creative Aryan
            </a>
          </p>
        </Typography>

      </div>
    </footer>
  );
}

Footer.propTypes = {
  isSidebarOpen: PropTypes.bool,
};

Footer.defaultProps = {
  isSidebarOpen: true,
};

export default Footer;
