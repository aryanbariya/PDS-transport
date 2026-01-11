import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Tooltip,
} from "@material-tailwind/react";
import PropTypes from "prop-types";
import { useState } from "react";
import { Link } from "react-router-dom";
import "./card-styles.css"; // Import our custom styles

export function StatisticsCard({ 
  color, 
  icon, 
  title, 
  value, 
  footer, 
  link,
  bgGradient,
  tooltipText,
  iconBgColor,
  totalLabel
}) {
  const [isHovered, setIsHovered] = useState(false);
  
  const handleMouseEnter = () => setIsHovered(true);
  const handleMouseLeave = () => setIsHovered(false);

  // Define default gradient if not provided
  const defaultGradient = `bg-gradient-to-br from-${color}-400 to-${color}-600`;
  const gradient = bgGradient || defaultGradient;
  
  // Card wrapper to handle link navigation
  const CardWrapper = ({ children }) => {
    if (link) {
      return <Link to={link} className="block h-full">{children}</Link>;
    }
    return <>{children}</>;
  };

  // Format title with proper capitalization
  const formatTitle = (text) => {
    // If already contains spaces, assume it's already formatted
    if (text.includes(' ')) return text;
    
    return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
  };

  return (
    <CardWrapper>
      <Card 
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className={`
          h-full relative overflow-hidden rounded-xl backdrop-blur-sm
          border border-gray-200 transition-all duration-300
          ${isHovered ? 'shadow-lg shadow-gray-300/30 transform scale-[1.02]' : 'shadow-md'}
        `}
      >
        {/* Background gradient with reduced opacity */}
        <div 
          className={`absolute inset-0 opacity-10 ${gradient}`}
        ></div>
        
        {/* Glass effect overlay */}
        <div className="absolute inset-0 bg-white/80 dark:bg-gray-900/80 backdrop-blur-[2px]"></div>
        
        <div className="relative z-10">
          <CardHeader
            className={`mx-4 mt-4 flex items-center justify-between p-0`}
            variant="filled"
            shadow={false}
            floated={false}
          >
            <div 
              className={`
                w-14 h-14 grid place-items-center rounded-lg shadow-lg
                ${iconBgColor || gradient}
                transition-transform duration-300 ${isHovered ? 'transform -translate-y-1' : ''}
              `}
            >
              {icon}
            </div>
            
            <Tooltip content={tooltipText || `View ${title.toLowerCase()} details`} className="z-50">
              <div className={`
                flex flex-col items-end 
                transition-all duration-300
                ${isHovered ? 'translate-y-[-2px]' : ''}
              `}>
                <Typography variant="h4" className="font-bold" color={color}>
                  {value}
                </Typography>
              </div>
            </Tooltip>
          </CardHeader>

          <CardBody className="px-4 pt-2 pb-4">
            <div className="flex flex-col">
              <Typography 
                variant="paragraph" 
                className={`
                  font-semibold tracking-normal text-sm
                  transition-colors duration-300
                  ${isHovered ? `text-${color}-600` : 'text-gray-800'}
                `}
              >
                {title}
              </Typography>
            </div>
          </CardBody>
        </div>
        
        {/* Highlight border on hover */}
        <div className={`
          absolute inset-0 border-2 rounded-xl pointer-events-none
          transition-opacity duration-300
          ${isHovered ? 'opacity-100' : 'opacity-0'}
          border-${color}-400/50
        `}></div>
      </Card>
    </CardWrapper>
  );
}

StatisticsCard.defaultProps = {
  color: "blue",
  footer: null,
  link: null,
  bgGradient: null,
  tooltipText: null,
  iconBgColor: null,
  totalLabel: null,
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
  link: PropTypes.string,
  bgGradient: PropTypes.string,
  tooltipText: PropTypes.string,
  iconBgColor: PropTypes.string,
  totalLabel: PropTypes.string,
};

StatisticsCard.displayName = "/src/widgets/cards/statistics-card.jsx";

export default StatisticsCard;