import VR from "../assets/VR.png";
import { useEffect, useState } from 'react';
import { motion, spring } from 'framer-motion';

const Headset = () => {
  const [isAnimating, setIsAnimating] = useState(false);
  const [isTextVisible, setIsTextVisible] = useState(false);
  const [isBorderVisible, setIsBorderVisible] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  const handleClick = () => {
    setIsAnimating((prev) => !prev);
  };

  // Sticky Reveal Effect

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const windowHeight = window.innerHeight;
      const triggerPoint = windowHeight / 2;
      
      if (scrollPosition > triggerPoint)
      {
        setIsVisible(true);
      }
      else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Text Visibility Effect
  useEffect(() => {
    let timeout;

    if (isAnimating) {
      setIsTextVisible(true);
      timeout = setTimeout(() => {
        setIsTextVisible(false);
      }, 1000);
    } else {
      setIsTextVisible(true);
    }

    return () => clearTimeout(timeout);
  }, [isAnimating]);

  return (
    <>
    <div className="sm:h-[110vh] h-[100vh] bg-no-repeat bg-cover bg-gradient-to-b from-black via-black to-purple-700">

      {/* Upper Section */}
      <div className={`flex md:h-[20%] lg:h-[15%] relative top-44 md:relative md:top-32 justify-center items-center text-transparent bg-gradient-to-r from-blue-700 via-purple-700 to-white 
        bg-clip-text animate-glow ${isVisible ? 'opacity-100' : 'opacity-0'} duration-400`}>
        <div className="text-center text-4xl tracking-widest md:text-5xl lg:text-7xl font-sans md:tracking-wider">
          Experience the Immersive Reality
        </div>
      </div>
      
      {/* Lower Section */}
      <div className="flex items-center justify-center px-10 sm:px-8">
        <div
          className={`sticky top-0 flex flex-col md:flex-row justify-center items-center md:mr-40 transition-opacity duration-500
            ${isVisible ? 'opacity-100' : 'opacity-0'} duration-300`}
        >
          <motion.div
            onClick={handleClick}
            className={`relative top-64 md:top-28 md:right-8 lg:top-28 lg:right-20 flex items-center justify-center 
            ${isAnimating ? 'cursor-pointer animate-breath sm:animate-breath-fast md:animate-breath lg:animate-breath-fast' : ''}`}
          >
            <img
              id="VR"
              src={VR}
              alt="VR Headset"
              className="max-w-[600px] md:max-w-[1000px] rounded-md mt-16 sm:mt-20 md:mt-24 lg:mt-24"
              loading="lazy"
            />

            {isTextVisible && (
              <div className="absolute font-extrabold font-poppins sm:text-sm md:text-[10px] ml-2 top-[40%] sm:top-[70%] md:top-1/2 translate-y-[90%] sm:translate-y-[-50%] md:translate-y-[100%]">
                <motion.h2
                  className="text-2xl md:text-2xl lg:text-4xl xl:text-5xl font-normal mb-16 md:mb-6 neon-text"
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    textShadow: '0 0 5px rgba(255, 255, 255, 0.7)', // Light glow
                    letterSpacing: '2px', // Added letter-spacing
                  }}
                  initial={{ opacity: 0, x: -50 }}
                  animate={{ opacity: 1, x: 1 }}
                  transition={{ duration: 1 }}
                  whileHover={{ scale: 1.05 }} // Scale effect on hover
                >
                  <span style={{ color: '#ffffff' }}>Visi</span>
                  <span style={{ color: '#d000ff' }}>AR</span>
                  <span style={{ color: '#00b3ff' }}>ise</span>
                </motion.h2>
              </div>
            )}
          </motion.div>

          <motion.div
            drag
            dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
            dragElastic={0.8}
            onDragStart={() => {
              setIsBorderVisible(true);
            }}
            onDragEnd={() => {
              setIsBorderVisible(false);
            }}
            whileDrag={{
              transition: { 'type': spring, stiffness: 500, damping: 0 },
            }}
          >
            <div className="relative top-64 sm:top-48 sm:left-1 md:top-36 md:left-1 lg:top-36 lg:right-20 lg:-left-20 sm:mt-6 md:mt-0 text-default-text sm:order-first md:order-last" onClick={handleClick}>
              <button
                className={`px-6 sm:px-8 md:px-[30px] py-3 sm:py-4 md:py-[13px] 
                font-poppins text-bold sm:text-md md:text-[25px] text-lg bg-transparent text-white rounded-full
                hover:ring-4 hover:ring-blue-600 hover:shadow-lg hover:shadow-blue-400
                ${isBorderVisible ? 'border-none' : 'border-2 border-white hover:border-none'}
                transform duration-200
                `}
              >
                Visualize
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
    </>
  );
};

export default Headset;

