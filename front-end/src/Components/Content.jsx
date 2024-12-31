import { motion } from "framer-motion"; // Import Framer Motion for animations

const Content = () => {
  return (
    <div className="relative flex flex-col items-center lg:flex-row bg-gradient-to-b from-black via-purple-700 to-black py-12 px-6 lg:px-20 min-h-screen overflow-hidden">
      {/* Animated Gradient Blob */}
      <motion.div
        className="absolute top-10 left-1/4 w-72 h-72 lg:w-96 lg:h-96 bg-custom-gradient rounded-full opacity-70 filter blur-3xl"
        initial={{ scale: 0, rotate: 0 }}
        animate={{ scale: 1, rotate: 360 }}
        transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
      />

      {/* Text Content */}
      <motion.div
        className="z-10 flex-1 mt-10 lg:mt-0 lg:ml-12 text-white"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: "easeOut" }}
      >
        <h1 className="text-4xl sm:text-5xl lg:text-8xl font-extrabold font-poppins tracking-wide leading-tight text-center lg:text-center ">
          EDUCATION MODEL
        </h1>
        <motion.p
          className="mt-10 text-lg sm:text-xl lg:text-xl font-light text-justify lg:text-left"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.2, delay: 0.4 }}
        >
          Visiarise is an AR SaaS platform transforming customer experiences by
          merging the digital and physical worlds. Discover how our cutting-edge
          AR technology enhances confidence, reduces returns, and drives sales.
        </motion.p>

        {/* Features Section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6 mt-12">
          {/* Feature 1 */}
          <motion.div
            className="bg-white bg-opacity-10 rounded-lg p-6 shadow-lg hover:shadow-2xl transition-all duration-300 ease-out"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <h3 className="text-xl font-semibold mb-3 text-purple-300">
              Real-World Visualization
            </h3>
            <p className="text-sm text-gray-200">
              Customers can place products virtually in their spaces before
              purchasing, making decisions more confident and informed.
            </p>
          </motion.div>

          {/* Feature 2 */}
          <motion.div
            className="bg-white bg-opacity-10 rounded-lg p-6 shadow-lg hover:shadow-2xl transition-all duration-300 ease-out"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: "spring", stiffness: 300, delay: 0.2 }}
          >
            <h3 className="text-xl font-semibold mb-3 text-purple-300">
              Enhanced Shopping Experience
            </h3>
            <p className="text-sm text-gray-200">
              Experience shopping like never before, right from your home or
              office, using cutting-edge AR tools.
            </p>
          </motion.div>

          {/* Feature 3 */}
          <motion.div
            className="bg-white bg-opacity-10 rounded-lg p-6 shadow-lg hover:shadow-2xl transition-all duration-300 ease-out"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: "spring", stiffness: 300, delay: 0.4 }}
          >
            <h3 className="text-xl font-semibold mb-3 text-purple-300">
              Reduced Returns
            </h3>
            <p className="text-sm text-gray-200">
              AR technology reduces product returns by ensuring customers get
              exactly what they expect, improving business outcomes.
            </p>
          </motion.div>

          {/* Feature 4 */}
          <motion.div
            className="bg-white bg-opacity-10 rounded-lg p-6 shadow-lg hover:shadow-2xl transition-all duration-300 ease-out"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: "spring", stiffness: 300, delay: 0.6 }}
          >
            <h3 className="text-xl font-semibold mb-3 text-purple-300">
              Better Customer Satisfaction
            </h3>
            <p className="text-sm text-gray-200">
              Increase customer satisfaction with personalized product
              interactions, bridging the gap between digital and physical.
            </p>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default Content;
