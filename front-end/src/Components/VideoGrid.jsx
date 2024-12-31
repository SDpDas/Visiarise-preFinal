const VideoGrid = () => {
  const videos = [
    { src: '/furniture.mp4', description: 'Experience luxury with our premium furniture designs.' },
    { src: '/interior.mp4', description: 'Modern furniture crafted for comfort and style.' },
    { src: '/car.mp4', description: 'Transform your space with our unique furniture collection.' },
    { src: '/Table.mp4', description: 'Innovative designs for every corner of your home.' },
    { src: '/Phone.mp4', description: 'Elegant and durable furniture solutions for all spaces.' },
    { src: '/Card.mp4', description: 'Unleash creativity with our custom-made furniture.' },
    { src: '/shopping.mp4', description: 'Unleash creativity with our custom-made furniture.' },
    { src: '/space.mp4', description: 'Unleash creativity with our custom-made furniture.' },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {videos.map((item, index) => (
        <div key={index} className="relative group border rounded-lg overflow-hidden shadow-lg">
          {/* Lazy load the video */}
          <video
            className="w-full h-64 sm:h-80 object-cover"
            src={item.src}
            loading="lazy"  // Defers video loading
            autoPlay
            muted
            loop
          />
          <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <p className="text-white text-sm sm:text-base font-medium p-4">
              {item.description}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default VideoGrid;
