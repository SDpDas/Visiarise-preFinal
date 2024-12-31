import React, { Suspense } from 'react';
import { motion } from 'framer-motion';
import useIntersectionObserver from '../Components/IntersectionObserver'; // Custom hook

// Lazy load the VideoGrid component
const VideoGrid = React.lazy(() => import('../Components/VideoGrid'));

const Services = () => {
  const inViewH1 = useIntersectionObserver('#services-header');
  const inViewH2 = useIntersectionObserver('#services-subheader');

  return (
    <div>
      {/* Header Section */}
      <div className="md:h-[350px] sm:h-[650px] bg-gradient-to-t from-black to-purple-700  px-4 sm:px-8 overflow-hidden relative sm:rotate-180 md:rotate-0 sm:bg-bottom md:bg-top transition-opacity duration-700">
        <motion.h1
          id="services-header"
          className="text-white font-poppins font-extrabold text-[40px] sm:text-[60px] lg:text-[80px] leading-tight mb-4 sm:mb-6 ml-2 mt-12"
          initial={{ opacity: 0, y: 20 }}
          animate={inViewH1 ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1 }}
        >
          THE SERVICES <br />
          WE OFFER
        </motion.h1>

        <motion.h2
          id="services-subheader"
          className="text-white font-helvetica font-normal text-[16px] sm:text-[20px] lg:text-[26px] leading-normal mb-4 ml-4 sm:mb-6"
          initial={{ opacity: 0, x: -20 }}
          animate={inViewH2 ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 1 }}
        >
          Welcome to <i className="text-blue-300">VisiARise!</i>
          <br />
          Transforming the World Through Immersive AR/VR Solutions.
        </motion.h2>
      </div>

      {/* Video Grid Section - Inside Services Page */}
      <div className="py-10 px-6 sm:px-10 bg-gradient-to-b from-black via-purple-700 to-black">
        {/* Lazy load VideoGrid component */}
        <Suspense fallback={<div>Loading...</div>}>
          <VideoGrid />
        </Suspense>
      </div>
    </div>
  );
};

export default Services;
