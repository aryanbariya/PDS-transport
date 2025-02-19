// import {
//   Card,
//   CardHeader,
//   CardBody,
//   CardFooter,
//   Typography,
// } from "@material-tailwind/react";
// import PropTypes from "prop-types";

// export function StatisticsCard({ color, icon, title, value, footer }) {
//   return (
//     <Card className="border border-blue-gray-100 shadow-sm">
//       <CardHeader
//         variant="gradient"
//         color={color}
//         floated={false}
//         shadow={false}
//         className="absolute grid h-12 w-12 place-items-center"
//       >
//         {icon}
//       </CardHeader>
//       <CardBody className="p-4 text-right">
//         <Typography variant="small" className="font-normal text-blue-gray-600">
//           {title}
//         </Typography>
//         <Typography variant="h4" color="blue-gray">
//           {value}
//         </Typography>
//       </CardBody>
//       {footer && (
//         <CardFooter className="border-t border-blue-gray-50 p-4">
//           {footer}
//         </CardFooter>
//       )}
//     </Card>
//   );
// }

// StatisticsCard.defaultProps = {
//   color: "blue",
//   footer: null,
// };

// StatisticsCard.propTypes = {
//   color: PropTypes.oneOf([
//     "white",
//     "blue-gray",
//     "gray",
//     "brown",
//     "deep-orange",
//     "orange",
//     "amber",
//     "yellow",
//     "lime",
//     "light-green",
//     "green",
//     "teal",
//     "cyan",
//     "light-blue",
//     "blue",
//     "indigo",
//     "deep-purple",
//     "purple",
//     "pink",
//     "red",
//   ]),
//   icon: PropTypes.node.isRequired,
//   title: PropTypes.node.isRequired,
//   value: PropTypes.node.isRequired,
//   footer: PropTypes.node,
// };

// StatisticsCard.displayName = "/src/widgets/cards/statistics-card.jsx";

// export default StatisticsCard;




import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
} from "@material-tailwind/react";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";

export function StatisticsCard({ color, icon, title, value, footer, route }) {
  const navigate = useNavigate();

  return (
    <div
      className="cursor-pointer"
      onClick={() => navigate(route)} // Redirect on click
    >
      <Card className="border border-blue-gray-100 shadow-sm transition-transform transform hover:scale-105">
        <CardHeader
          variant="gradient"
          color={color}
          floated={false}
          shadow={false}
          className="absolute grid h-12 w-12 place-items-center"
        >
          {icon}
        </CardHeader>
        <CardBody className="p-4 text-right">
          <Typography variant="small" className="font-normal text-blue-gray-600">
            {title}
          </Typography>
          <Typography variant="h4" color="blue-gray">
            {value}
          </Typography>
        </CardBody>
        {footer && (
          <CardFooter className="border-t border-blue-gray-50 p-4">
            {footer}
          </CardFooter>
        )}
      </Card>
    </div>
  );
}

StatisticsCard.defaultProps = {
  color: "blue",
  footer: null,
};

StatisticsCard.propTypes = {
  color: PropTypes.oneOf([
    "white",
    "blue-gray",
    "gray",
    "brown",
    "deep-orange",
    "orange",
    "amber",
    "yellow",
    "lime",
    "light-green",
    "green",
    "teal",
    "cyan",
    "light-blue",
    "blue",
    "indigo",
    "deep-purple",
    "purple",
    "pink",
    "red",
  ]),
  icon: PropTypes.node.isRequired,
  title: PropTypes.node.isRequired,
  value: PropTypes.node.isRequired,
  footer: PropTypes.node,
  route: PropTypes.string.isRequired, // Ensure route is required
};

StatisticsCard.displayName = "/src/widgets/cards/statistics-card.jsx";

export default StatisticsCard;

