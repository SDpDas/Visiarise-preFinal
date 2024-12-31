import { motion } from "framer-motion";

const ProblemSection = () => {
  return (
    <div className="relative overflow-hidden bg-gradient-to-b from-purple-700 to-purple-700 text-white py-0">
      {/* Content starts here */}
      <div className="flex flex-col md:flex-row items-center justify-center z-10 relative">
        {/* Right Side Image */}
        <div className="flex-1 flex justify-center items-center p-8 z-10 order-1 md:order-1">
          <motion.img
            src="/Product_img/ProblemGirl.png" // Replace with the actual image URL
            alt="Problem Visualization"
            className="max-w-96 rounded-lg" // Increased image size
          />
        </div>

        {/* Left Side Text Content */}
        <div className="flex-1 p-8 z-10 order-2 md:order-2">
          <h2
            className="text-5xl font-bold mb-4 text-center md:text-left gap-10"
            style={{ animation: "neon 1.5s infinite alternate" }}
          >
            <span className="text-purple-400 mr-2">Our</span>
            <span className="text-blue-400 block md:inline">Vision</span>
          </h2>
          <p className="text-lg leading-relaxed">
            In today&#39;s fast-paced digital landscape, users often struggle to
            visualize products in their real environments before making a
            purchase. This can lead to the customers being uncertain about the
            product and having doubts on their selection which is more common
            in products like furniture, art pieces, and home decor. Our goal is
            to bridge this gap by providing an Augmented Reality experience
            that allows users to interact and visualize products virtually,
            ensuring they make discerning decisions and enhancing their overall
            shopping experience.
          </p>
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

          /* Media query for responsiveness */
          @media (max-width: 640px) {
            .flex-1 {
              width: 100%; /* Full width on mobile */
            }
            h2 {
              font-size: 2.5rem; /* Adjust the font size for smaller screens */
            }
          }
        `}</style>
      </div>
    </div>
  );
};

export default ProblemSection;
