import React, { Suspense } from 'react';
import { motion } from 'framer-motion';
import useIntersectionObserver from '../Components/IntersectionObserver'; // Custom hook

// Lazy load the VideoGrid component
const ImageGrid = React.lazy(() => import('./ImageGrid'));

const Services = () => {
  const inViewH1 = useIntersectionObserver('#services');
  const inViewH2 = useIntersectionObserver('#services-subheader');

  return (
    <div>
      {/* Header Section */}
      <div 
      id="services"
      className="h-[310px] md:h-[400px] bg-gradient-to-t from-black to-purple-700 px-4 lg:p-8 overflow-hidden relative sm:bg-bottom md:bg-top transition-opacity duration-700">
        <div className='flex flex-col justify-center relative top-[50px]'>
          <motion.h1
            className="text-white text-start font-poppins font-extrabold text-[40px] sm:text-[60px] lg:text-[80px] leading-tight mb-4 sm:mb-6 ml-2"
            initial={{ opacity: 0, y: 20 }}
            animate={inViewH1 ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 1 }}
          >
            THE SERVICES <br />
            WE OFFER
          </motion.h1>

          <motion.h2
            id="services-subheader"
            className="text-white text-start font-helvetica font-normal text-[16px] sm:text-[20px] lg:text-[26px] leading-normal mb-4 ml-4 sm:mb-6"
            initial={{ opacity: 0, y:10 }}
            animate={inViewH2 ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 1 }}
          >
            Welcome to <i className="text-blue-300">VisiARise!</i>
            <br />
            Transforming the World Through Immersive AR/VR Solutions.
          </motion.h2>
        </div>
      </div>

      {/* Image Grid Section - Inside Services Page */}
      <div
      id="images"
      className="py-20 px-6 sm:px-10 bg-gradient-to-b from-black via-purple-700 to-black">
        {/* Lazy load ImageGrid component */}
        <Suspense fallback={<div>Loading...</div>}>
          <ImageGrid />
        </Suspense>
      </div>
    </div>
  );
};

export default Services;
