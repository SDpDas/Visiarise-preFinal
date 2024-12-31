const LoadingBubbles = () => {
  return (
    <div className="fixed inset-0 flex justify-center items-center overflow-hidden z-50 bg-black">
      <div className="relative w-full h-full flex justify-center items-center">
        {/* VisiARise Logo with Glow */}
        <svg viewBox="0 0 800 200" className="w-full h-auto">
          <defs>
            {/* Define the glow filter */}
            <filter id="glowFilter" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur in="SourceAlpha" stdDeviation="8" result="blurred" />
              <feOffset in="blurred" dx="0" dy="0" result="offsetBlurred" />
              <feFlood floodColor="blue" result="glowColor" />
              <feComposite in="glowColor" in2="offsetBlurred" operator="in" />
              <feMerge>
                <feMergeNode />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>
          <text
            id="animatedText"
            x="50"
            y="150"
            className="fill-black font-poppins text-[150px] leading-tight stroke-[6px] stroke-[#7e22ce] text-white font-normal"
            style={{
              filter: "url(#glowFilter)", 
              strokeDasharray: "500", 
              strokeDashoffset: "500"
            }}
          >
            VisiARise
          </text>
        </svg>
      </div>

      {/* Animation using Inline CSS for Stroke Animation */}
      <style>{`
        @keyframes strokeAnimation {
          0% {
            stroke-dashoffset: 500;
          }
          100% {
            stroke-dashoffset: 0;
          }
        }

        #animatedText {
          animation: strokeAnimation 15s ease forwards;
        }
      `}</style>
    </div>
  );
};

export default LoadingBubbles;
