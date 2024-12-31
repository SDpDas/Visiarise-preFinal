import PropTypes from "prop-types";

const StarBorder = ({
  as: Component = "button", // The type of element to render (e.g., "button", "div")
  className = "", // Additional custom classes
  color = "white", // Color of the radial gradient stars
  speed = "6s", // Speed of the star animation
  children, // Content inside the component
  ...rest // Any other props passed to the component
}) => {
  return (
    <Component
      className={`relative inline-block py-[1px] overflow-hidden rounded-[20px] ${className}`}
      {...rest} // Spread remaining props to the component
    >
      {/* Bottom star animation */}
      <div
        className="absolute w-[300%] h-[50%] opacity-70 bottom-[-11px] right-[-250%] rounded-full animate-star-movement-bottom z-0"
        style={{
          background: `radial-gradient(circle, ${color}, transparent 10%)`,
          animationDuration: speed,
        }}
      ></div>

      {/* Top star animation */}
      <div
        className="absolute w-[300%] h-[50%] opacity-70 top-[-10px] left-[-250%] rounded-full animate-star-movement-top z-0"
        style={{
          background: `radial-gradient(circle, ${color}, transparent 10%)`,
          animationDuration: speed,
        }}
      ></div>

      {/* Inner content */}
      <div className="relative z-1 bg-gradient-to-b from-black to-gray-900 border border-gray-800 text-white text-center text-[16px] py-[16px] px-[26px] rounded-[20px]">
        {children}
      </div>
    </Component>
  );
};

// PropTypes for documentation and type checking
StarBorder.propTypes = {
  as: PropTypes.elementType, // Defines the element type (default: "button")
  className: PropTypes.string, // Allows additional class names
  color: PropTypes.string, // Color of the animated stars
  speed: PropTypes.string, // Speed of the animation (e.g., "6s")
  children: PropTypes.node, // Content inside the component
};

export default StarBorder;
