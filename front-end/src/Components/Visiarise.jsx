import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';

const Visiarise = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  const slides = [
    {
      title: "VisiARise: AI Services for Brands",
      subtext: "Helping brands showcase their products in 3D on our platform.",
    },
    {
      title: "AR Services for Users",
      subtext: "Allowing users to experience products in their own space in 3D.",
    },
    {
      title: "Multiple Product Placement",
      subtext: "Visualize multiple products together before making a purchase.",
    },
    {
      title: "Easy AR Integration",
      subtext: "Seamless and accessible AR experiences for everyone.",
    },
  ];

  // Change slide every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prevSlide) => (prevSlide + 1) % slides.length);
    }, 5000); // 5 seconds interval
    return () => clearInterval(interval);
  }, [slides.length]);

  // Check if the screen is mobile-sized
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize(); // Initial check
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div
      className="relative flex items-center justify-center overflow-hidden"
      style={{
        height: '75vh',
        backgroundColor: 'black',
        perspective: 1000,
      }}
    >
      {/* Rubik's Cube */}
      <motion.div
        className="rubiks-cube"
        animate={{
          rotateX: 360,
          rotateY: 360,
        }}
        transition={{
          duration: 10,
          ease: 'linear',
          repeat: Infinity,
        }}
      >
        {Array.from({ length: 6 }).map((_, faceIndex) => (
          <div key={faceIndex} className={`face face-${faceIndex + 1}`}>
            <div className="heading">{slides[currentSlide].title}</div>
          </div>
        ))}
      </motion.div>

      {/* Conditionally render subtext */}
      {isMobile ? (
        <div className="absolute top-6 text-white text-lg max-w-xs text-center">
          {slides[currentSlide].subtext}
        </div>
      ) : (
        <>
          <div className="absolute left-20 text-white text-lg mt-6 max-w-xs">
            {slides[currentSlide].subtext}
          </div>
          <div className="absolute right-20 text-white text-lg mt-6 max-w-xs">
            {slides[currentSlide].subtext}
          </div>
        </>
      )}

      {/* Styles */}
      <style>{`
        .rubiks-cube {
          position: relative;
          width: 200px;
          height: 200px;
          transform-style: preserve-3d;
          transform-origin: center;
          margin-left: 5vw;
        }
        .face {
          position: absolute;
          width: 200px;
          height: 200px;
          display: flex;
          align-items: center;
          justify-content: center;
          border: 2px solid transparent;
          opacity: 0.8;
        }

        .face-1 {
          background-color: rgba(255, 255, 255, 0.1);
          transform: translateZ(100px);
          box-shadow: 0 0 20px 10px rgba(255, 255, 255, 0.5);
        }
        .face-2 {
          background-color: rgba(0, 0, 255, 0.1);
          transform: rotateY(90deg) translateZ(100px);
          box-shadow: 0 0 20px 10px rgba(0, 0, 255, 0.5);
        }
        .face-3 {
          background-color: rgba(128, 0, 128, 0.1);
          transform: rotateY(180deg) translateZ(100px);
          box-shadow: 0 0 20px 10px rgba(128, 0, 128, 0.5);
        }
        .face-4 {
          background-color: rgba(0, 255, 255, 0.1);
          transform: rotateY(-90deg) translateZ(100px);
          box-shadow: 0 0 20px 10px rgba(0, 255, 255, 0.5);
        }
        .face-5 {
          background-color: rgba(255, 20, 147, 0.1);
          transform: rotateX(90deg) translateZ(100px);
          box-shadow: 0 0 20px 10px rgba(255, 20, 147, 0.5);
        }
        .face-6 {
          background-color: rgba(255, 165, 0, 0.1);
          transform: rotateX(-90deg) translateZ(100px);
          box-shadow: 0 0 20px 10px rgba(255, 165, 0, 0.5);
        }

        .heading {
          color: white;
          font-size: 14px;
          text-align: center;
          white-space: nowrap;
          position: absolute;
        }

        .shape {
          position: absolute;
          width: 30px;
          height: 30px;
          opacity: 0.8;
          animation: move 10s infinite;
        }

        .circle {
          border-radius: 50%;
          background-color: rgba(255, 255, 0, 0.8);
        }

        .square {
          background-color: rgba(255, 0, 0, 0.8);
        }

        @keyframes move {
          0% {
            transform: translate(0, 0);
          }
          100% {
            transform: translate(calc(100vw - 30px), calc(100vh - 30px));
          }
        }

        @media (max-width: 768px) {
          .rubiks-cube {
            width: 150px;
            height: 150px;
          }
          .heading {
            font-size: 12px;
          }
        }

        @media (max-width: 480px) {
          .rubiks-cube {
            width: 100px;
            height: 100px;
          }
          .heading {
            font-size: 10px;
          }
        }
      `}</style>
    </div>
  );
};

export default Visiarise;
