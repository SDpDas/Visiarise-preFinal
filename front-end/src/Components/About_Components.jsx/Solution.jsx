import { motion } from 'framer-motion';

const SolutionSection = () => {
  return (
    <div className="flex flex-col md:flex-row items-center justify-center bg-gradient-to-t from-purple-700 to-purple-700 text-white py-0 relative">
      {/* Left Side Text Content */}
      <div className="flex-1 p-8 z-10 order-1 md:order-1">
        <h2 className="text-5xl font-bold mb-4 text-center md:text-left">
          <span
            className="text-purple-400 mr-2"
            style={{ textShadow: '0 0 5px rgba(156, 39, 176, 0.5)' }}
          >
            Solution
          </span>
          <span
            className="text-blue-400"
            style={{ textShadow: '0 0 5px rgba(30, 136, 229, 0.5)' }}
          >
            We Provide
          </span>
        </h2>
        <p className="text-xl leading-relaxed font-poppins">
          Our sophisticated AR solution will empower the customer to interact
          with the products of their liking and find the perfect fits for their
          taste. Our cutting-edge technology will bring about state-of-the-art
          computer vision and rendering capabilities, providing immersive and
          dimensionally accurate visualization of the products. This will not
          only increase the level of customer satisfaction but also lower the
          rate of product returns.
        </p>
      </div>

      {/* Right Side Image */}
      <div className="flex-1 flex justify-center items-center p-8 z-10 order-2 md:order-2">
        <motion.img
          src="/Product_img/SolutionGirl.png" // Replace with the actual image URL
          alt="Solution Visualization"
          className="max-w-full h-auto rounded-lg"
          loading="lazy" // Lazy loading for the image
        />
      </div>

      {/* CSS for neon text animation */}
      <style>{`
        @keyframes neon {
          0% {
            text-shadow: 0 0 5px rgba(156, 39, 176, 0.5), 0 0 10px rgba(156, 39, 176, 0.5), 0 0 15px rgba(156, 39, 176, 0.5);
          }
          50% {
            text-shadow: 0 0 10px rgba(30, 136, 229, 0.5), 0 0 20px rgba(30, 136, 229, 0.5), 0 0 30px rgba(30, 136, 229, 0.5);
          }
          100% {
            text-shadow: 0 0 5px rgba(156, 39, 176, 0.5), 0 0 10px rgba(156, 39, 176, 0.5), 0 0 15px rgba(156, 39, 176, 0.5);
          }
        }

        h2 span {
          animation: neon 1.5s infinite alternate;
        }

        /* Media query for responsiveness */
        @media (max-width: 640px) {
          .flex-1 {
            width: 100%; /* Full width on mobile */
          }
          h2 {
            font-size: 2.5rem; /* Adjust font size for smaller screens */
          }
        }
      `}</style>
    </div>
  );
};

export default SolutionSection;
