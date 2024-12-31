import { motion } from 'framer-motion';
import { useState } from 'react';

const ServicesSection = () => {
  const [activeService, setActiveService] = useState(null);

  return (
    <div
      className="flex flex-col items-center justify-center py-20 px-8 md:px-16 relative bg-gradient-to-b from-purple-700 to-purple-700 min-h-[100px]"
    >
      <h2 className="text-3xl md:text-4xl font-bold text-white mb-10">Our Services</h2>
      <div className="flex flex-wrap justify-center gap-8 max-w-6xl">
        {/* AR Visualization Card */}
        <motion.div
          className="flex flex-col items-center justify-center bg-white text-center rounded-xl shadow-lg p-8 w-[250px] h-[250px] transform transition-all duration-300"
          style={{ background: 'linear-gradient(45deg, #8e44ad, #ff20f0)' }}
          initial={{ scale: 1 }}
          whileHover={{ scale: 1.1, rotate: 3, transition: { duration: 0.2 } }}
          onMouseEnter={() => setActiveService('ar')}
          onMouseLeave={() => setActiveService(null)}
        >
          <h3 className="text-2xl sm:text-xl md:text-2xl lg:text-3xl font-semibold text-white mb-4">AR Visualization</h3>
          <p className="text-white opacity-70 text-sm sm:text-base md:text-lg mb-4">
            Visualize products in your own space using AR before you buy.
          </p>
        </motion.div>

        {/* VisEcommerce Card */}
        <motion.div
          className="flex flex-col items-center justify-center bg-white text-center rounded-xl shadow-lg p-8 w-[250px] h-[250px] transform transition-all duration-300"
          style={{ background: 'linear-gradient(45deg, #3F51B5, #ff20f0)' }}
          initial={{ scale: 1 }}
          whileHover={{ scale: 1.1, rotate: -3, transition: { duration: 0.2 } }}
          onMouseEnter={() => setActiveService('visEcommerce')}
          onMouseLeave={() => setActiveService(null)}
        >
          <h3 className="text-2xl sm:text-xl md:text-2xl lg:text-3xl font-semibold text-white mb-4">VisEcommerce</h3>
          <p className="text-white opacity-70 text-sm sm:text-base md:text-lg mb-4">
            Get the best e-commerce solutions with interactive AR features.
          </p>
        </motion.div>
      </div>

      {/* Hover effect details */}
      {activeService && (
        <motion.div
          className="absolute bottom-5 text-white text-sm sm:text-sm md:text-xl lg:text-2xl"
          style={{ width: '100%', textAlign: 'center' }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, y: -20 }} // Moves the details upwards
          transition={{ duration: 0.3 }} // Faster animation
        >
          {activeService === 'ar' && (
            <p>
              Experience Augmented Reality to see how products fit and look in your real-world environment before purchasing.
            </p>
          )}
          {activeService === 'visEcommerce' && (
            <p>
              Immerse yourself in a unique e-commerce experience with AR, where you can explore products virtually in 3D.
            </p>
          )}
        </motion.div>
      )}
    </div>
  );
};

export default ServicesSection;
