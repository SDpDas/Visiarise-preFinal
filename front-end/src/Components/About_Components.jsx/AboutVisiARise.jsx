import { motion } from 'framer-motion';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';

const AboutVisiarise = () => {
  return (
    <div
      className="relative flex flex-col md:flex-row items-center justify-between bg-gradient-to-b from-black to-purple-700 text-white py-4 px-4 md:px-20 overflow-hidden" // Adjusted padding
      style={{ minHeight: '85vh' }} // Use minHeight instead of height
    >
      {/* Left side: About heading and description */}
      <div className="md:w-1/2 mb-8 md:mb-0 z-10">
        <motion.h2
          className="text-3xl md:text-5xl font-bold mb-4 neon-text font-poppins"
          style={{
            display: 'flex',
            alignItems: 'center',
            textShadow: '0 0 5px rgba(255, 255, 255, 0.7)', // Light glow
            letterSpacing: '1px', // Added letter-spacing
          }}
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1 }}
          whileHover={{ scale: 1.05 }} // Scale effect on hover
        >
          <span style={{ color: '#ffffff' }}>Visi</span>
          <span style={{ color: '#d000ff' }}>AR</span>
          <span style={{ color: '#00b3ff' }}>ise</span>
        </motion.h2>
        <motion.p
          className="text-lg md:text-2xl leading-relaxed font-helvetica"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3 }}
          style={{ marginBottom: '20px' }}
        >
          Welcome to Visiarise, where shopping becomes an interactive experience! With our cutting-edge AR technology, your customers can visualize products like furniture and home decor directly in their space before buying.
          <br/>
          <br/>
          Why settle for static images? Bring products to life with AR, offering a 360-degree view that ensures the perfect fit.
          <br/>
          <br/>
          Transform your space with confidence experience the future of shopping with VisiARise today!
        </motion.p>
      </div>

      {/* Right side: Image with neon line */}
      <div className="relative md:w-1/2 z-10 ml-10">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.5 }}
      >
        <LazyLoadImage
          src="/Product_img/AboutVisiArise.png" // Replace with the actual image URL
          alt="Visiarise "
          className="w-full object-cover rounded-lg"
          effect="blur" // Adds a blur effect while loading
          style={{ paddingLeft: '20px' }} // Added padding for spacing
        />
      </motion.div>
      </div>
    </div>
  );
};

export default AboutVisiarise;
