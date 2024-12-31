import { motion } from "framer-motion";

const OurMotiveSection = () => {
  const motives = ["Immersive", "Visualize", "Boost Confidence", "Sustainable"];

  return (
    <div className="flex flex-col items-center bg-gradient-to-t from-purple-700 to-purple-700 text-white py-20 relative overflow-hidden">
      {/* Section Title with Glow Effect */}
      <h1
        className="text-6xl font-bold text-center gap-1 mb-24"
        style={{
          textShadow:
            "0 0 20px rgba(30, 136, 229, 0.9), 0 0 40px rgba(255, 0, 251, 0.7)",
          animation: "glow 1.5s infinite alternate",
        }}
      >
        <span className="text-blue-400 mr-2">Our</span>
        <span className="text-purple-400">Mission</span>
      </h1>

      {/* Zigzag Layout for Motives */}
      <div className="flex flex-wrap justify-center">
        {motives.map((motive, index) => (
          <div
            className={`flex flex-col items-center mx-4 mb-8 ${
              index % 2 === 0 ? "translate-y-4" : "-translate-y-4"
            }`}
            key={index}
          >
            <motion.div
              className="flex items-center justify-center rounded-full shadow-lg"
              style={{
                width: "200px", // Circle size
                height: "200px", // Circle size
                background: index % 2 === 0 ? "#06a9f4" : "#b300ef", // Alternating circle colors
                filter:
                  "drop-shadow(0 0 10px rgba(7, 192, 248, 0.7)) drop-shadow(0 0 15px rgba(139, 43, 91, 0.5))", // Shadow effect
              }}
              whileHover={{
                scale: 1.1, // Zoom in on hover
                rotate: 5, // Subtle rotation on hover
              }}
              transition={{
                duration: 0.4,
                ease: "easeInOut",
              }}
            >
              <span
                className="text-lg font-bold text-center px-4"
                loading="lazy" // Lazy loading for text
              >
                {motive}
              </span>
            </motion.div>
          </div>
        ))}
      </div>

      {/* CSS for Glow Effect */}
      <style>{`
        @keyframes glow {
          0% {
            text-shadow: 0 0 20px rgba(30, 136, 229, 0.9),
              0 0 40px rgba(255, 0, 251, 0.7);
          }
          100% {
            text-shadow: 0 0 40px rgba(30, 136, 229, 0.9),
              0 0 20px rgba(255, 0, 251, 0.7);
          }
        }
      `}</style>
    </div>
  );
};

export default OurMotiveSection;
