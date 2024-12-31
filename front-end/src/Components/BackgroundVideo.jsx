// BackgroundVideo.jsx
const BackgroundVideo = () => {
    return (
      <video
        id="background-video"
        className="absolute top-0 left-0 w-full h-full object-cover z-10 "
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
      >
        <source src="/video.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    );
  };
  
  export default BackgroundVideo;
  