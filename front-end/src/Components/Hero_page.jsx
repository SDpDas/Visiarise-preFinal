import { useEffect, Suspense, lazy } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

// Lazy load the Video component
const BackgroundVideo = lazy(() => import('./BackgroundVideo'));

const Hero = () => {
  const { isAuthenticated } = useSelector((state) => state.auth);

  useEffect(() => {
    // Select the video element and set playback rate
    const video = document.getElementById('background-video');
    if (video) {
      video.playbackRate = 1.0; // Standard speed for video playback
    }
  }, []);

  return (
    <div className="relative w-full overflow-hidden h-[80vh] md:h-[100vh]">
      {/* Lazy loaded Video component */}
      <Suspense fallback={<div>Loading Video...</div>}>
        <BackgroundVideo />
      </Suspense>

      {/* Content */}
      <div className="relative z-20 flex flex-col items-center justify-center h-full text-white text-center px-4">
        <h1 className="text-7xl sm:text-7xl md:text-8xl lg:text-[120px] xl:text-[200px] font-normal font-helvetica mb-2 leading-tight">
          VISIARISE
        </h1>
        <h2 className="text-2xl sm:text-2xl md:text-4xl lg:text-4xl xl:text-[70px] font-helvetica mb-4 sm:mb-8 md:mb-12">
          Vision to Immersive Reality
        </h2>
        <p className="text-sm sm:text-base md:text-lg xl:text-[20px] font-poppins mb-4 sm:mb-6 md:mb-8">
          VisiARise provides AR services to enhance your 
          <br />
          brand&apos;s shopping experience.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 sm:gap-10 md:gap-20 mb-8">
          {isAuthenticated ? (
            <Link to="/Shopping">
              <button className="px-6 sm:px-8 md:px-[40px] py-3 sm:py-4 md:py-[20px] text-base sm:text-lg md:text-[25px] border-4 sm:border-2 md:border-2 border-white rounded-full text-white font-medium hover:text-purple-600 transition-all duration-500 ease-in-out">
                Start Shopping
              </button>
            </Link>
          ) : (
            <Link to="/login">
              <button className="px-6 sm:px-8 md:px-[40px] py-3 sm:py-4 md:py-[20px] text-base sm:text-lg md:text-[25px] border-2 rounded-full text-white font-medium hover:text-purple-600 transition-all duration-500 ease-in-out">
                Get Started
              </button>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default Hero;
