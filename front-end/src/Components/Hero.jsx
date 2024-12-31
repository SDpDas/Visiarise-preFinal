const Hero = () => {
  return (
    <div className="w-full md:h-screen sm:h-screen bg-black overflow-hidden relative">
      {/* Video element */}
      <video
        className="absolute w-full h-full object-contain md:object-cover md:object-center"
        autoPlay
        loop
        muted
        playsInline
        src="/VisiArise_herovid.mp4"
      />

      {/* Overlay content */}
      <div className="h-[450px] w-full flex items-center justify-center z-20">
        {/* Add overlay content here if needed */}
        <div className="text-center">
          {/* Your content */}
        </div>
      </div>
    </div>
  );
};

export default Hero;
