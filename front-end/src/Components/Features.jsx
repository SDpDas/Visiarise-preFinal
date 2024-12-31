import { motion } from 'framer-motion'; // Make sure to install framer-motion

const featuresData = [
  { icon: '/icon.png', title: 'Try Before You Buy', text: 'Visualize products in your space before buying to build trust.' },
  { icon: '/icon.png', title: 'Product Visualization', text: "See the exact item added for a personalized experience." },
  { icon: '/icon.png', title: 'AR Accessibility', text: 'Enjoy cross-platform AR without the need for expensive devices.' },
  { icon: '/icon.png', title: 'Product Placement', text: 'Get a real-world feel of products for more confidence in your purchase.' },
];

const Features = () => {
  return (
    <div className="flex flex-col items-center py-8 bg-gradient-to-t from-purple-700 to-purple-700 md:py-16">
      <div className="flex flex-col items-center justify-center w-full md:flex-row">

        {/* Left Column */}
        <div className="flex flex-col items-center  md:mr-10 pl-8  mt-0 md:mt-0">
          {/* Features 1 and 4 on the left */}
          <motion.div
            className="flex items-center mb-6 md:mb-10"
            animate={{ y: [0, 10, 0] }} 
            transition={{ duration: 2, repeat: Infinity }}
          >
            <img src={featuresData[0].icon} alt={featuresData[0].title} className="w-16 h-16 md:w-20 md:h-20 mr-2" />
            <div className="text-white text-sm md:text-lg">
              <h3 className="font-bold text-lg md:text-2xl">{featuresData[0].title}</h3>
              <p className="text-sm md:text-md w-1/2">{featuresData[0].text}</p>
            </div>
          </motion.div>

          <motion.div
            className="flex items-center"
            animate={{ y: [0, 10, 0] }} 
            transition={{ duration: 2, repeat: Infinity }}
          >
            <img src={featuresData[3].icon} alt={featuresData[3].title} className="w-16 h-16 md:w-20 md:h-20 mr-2" />
            <div className="text-white text-sm md:text-lg">
              <h3 className="font-bold text-lg md:text-2xl">{featuresData[3].title}</h3>
              <p className="text-sm md:text-md w-1/2">{featuresData[3].text}</p>
            </div>
          </motion.div>
        </div>

        {/* Model in the center */}
        <motion.img
          src="/featuremode.png"
          alt="Model"
          className="w-3/4 md:w-1/3 mx-auto my-4 md:pr-16" // Centering with margin auto
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        />

        {/* Right Column */}
        <div className="flex flex-col items-center md:ml-10 pl-8 mt-0 md:mt-0">
          {/* Features 2 and 3 on the right */}
          <motion.div
            className="flex items-center mb-6 md:mb-10"
            animate={{ y: [0, 10, 0] }} 
            transition={{ duration: 2, repeat: Infinity }}
          >
            <img src={featuresData[1].icon} alt={featuresData[1].title} className="w-16 h-16 md:w-20 md:h-20 mr-2" />
            <div className="text-white text-sm md:text-lg">
              <h3 className="font-bold text-lg md:text-2xl">{featuresData[1].title}</h3>
              <p className="text-sm md:text-md w-1/2">{featuresData[1].text}</p>
            </div>
          </motion.div>

          <motion.div
            className="flex items-center"
            animate={{ y: [0, 10, 0] }} 
            transition={{ duration: 2, repeat: Infinity }}
          >
            <img src={featuresData[2].icon} alt={featuresData[2].title} className="w-16 h-16 md:w-20 md:h-20 mr-2" />
            <div className="text-white text-sm md:text-lg">
              <h3 className="font-bold text-lg md:text-2xl">{featuresData[2].title}</h3>
              <p className="text-sm md:text-md w-1/2">{featuresData[2].text}</p>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Features;
