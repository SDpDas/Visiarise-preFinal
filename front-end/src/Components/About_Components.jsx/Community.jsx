import { motion } from "framer-motion";
import { useState } from "react";

const SolutionSection = () => {
  const [isImageLoaded, setIsImageLoaded] = useState(false); // Track image loading state

  return (
    <div className="flex flex-col md:flex-row items-center justify-center bg-gradient-to-b from-purple-700 to-purple-700 text-white py-0 relative">
      {/* Left Side Text Content */}
      <div className="flex-1 p-8 z-10 order-1 md:order-1">
        <h2
          className="flex flex-row items-center justify-center text-4xl font-bold mb-4 text-center md:text-left sm:text-3xl lg:text-6xl"
          style={{ textShadow: "0 0 5px rgba(30, 136, 229, 0.5)" }}
        >
          <span className="text-blue-400 mr-4">Our</span>
          <span className="text-purple-500">Community</span>
        </h2>
        <p className="text-xl leading-relaxed font-poppins">
          VisiARise is a dynamic community driven by a shared passion for AR/VR
          innovation. Our team of dedicated developers and visionaries works
          together to craft cutting-edge solutions that empower manufacturers
          and e-commerce businesses. Through collaboration, creativity, and
          continuous learning, we aim to redefine the possibilities of immersive
          technology. Be a part of our journey to transform ideas into reality!
        </p>
      </div>

      {/* Right Side Image */}
      <div className="flex-1 flex justify-center items-center p-8 z-10 order-2 md:order-2">
        {!isImageLoaded && (
          <div className="w-80 h-80 bg-gray-300 animate-pulse rounded-lg"></div> // Placeholder skeleton
        )}
        <motion.img
          src="/Product_img/SolutionGirl-1.png" // Replace with the actual image URL
          alt="Solution Visualization"
          className={`max-w-full h-auto rounded-lg transition-opacity duration-500 ease-in-out ${
            isImageLoaded ? "opacity-100" : "opacity-0"
          }`} // Smooth opacity transition
          onLoad={() => setIsImageLoaded(true)} // Update state when image loads
          loading="lazy" // Lazy loading attribute
          initial={{ opacity: 0, scale: 0.8 }}
          animate={isImageLoaded ? { opacity: 1, scale: 1 } : {}} // Trigger animation when loaded
          transition={{ duration: 1 }}
        />
      </div>

      {/* CSS for neon text animation */}
      <style>{`
        @keyframes neon {
          0% { text-shadow: 0 0 5px rgba(156, 39, 176, 0.5), 0 0 10px rgba(156, 39, 176, 0.5), 0 0 15px rgba(156, 39, 176, 0.5); }
          50% { text-shadow: 0 0 10px rgba(30, 136, 229, 0.5), 0 0 20px rgba(30, 136, 229, 0.5), 0 0 30px rgba(30, 136, 229, 0.5); }
          100% { text-shadow: 0 0 5px rgba(156, 39, 176, 0.5), 0 0 10px rgba(156, 39, 176, 0.5), 0 0 15px rgba(156, 39, 176, 0.5); }
        }

        h2 {
          animation: neon 1.5s infinite alternate;
        }
      `}</style>
    </div>
  );
};

export default SolutionSection;
