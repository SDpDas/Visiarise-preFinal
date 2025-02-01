import { motion } from "framer-motion";

const ImageGrid = () => {
  const images = [
    { src: '/web-development.jpeg', description: 'WEB DEVELOPMENT' },
    { src: '/machine-learning.jpeg', description: 'MACHINE LEARNING' },
    { src: '/data-science.jpeg', description: 'DATA SCIENCE' },
    { src: '/ui-ux.jpeg', description: 'UI/UX' },
    { src: '/ar-vr.jpeg', description: 'AR/VR' },
    { src: '/app-development.jpeg', description: 'APP DEVELOPMENT' },
  ];

  return (
    <div 
    className="grid grid-cols-1 md:grid-cols-3 gap-14 lg:gap-12 px-10">
      {images.map((item, index) => (
        <motion.div 
        initial={{ opacity: 0, y:25 }}
        whileInView={{
          opacity: 1,
          y: 0,
          transition:{
            type: "spring",
            damping: 30,
            stiffness: 100,
            mass: 1,
            delay: 0.2
          }
        }}
        viewport={{
          amount: "some",
          once: false
        }}
        key={index} 
        className="relative group border max-w-full rounded-lg shadow-lg overflow-hidden cursor-pointer">
          <img
            className="w-full h-64 sm:h-full object-cover rounded-lg opacity-50 hover:opacity-100"
            src={item.src}
            alt="images"
            loading="lazy"
          />
          <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <p className="text-white lg:text-[18px] text-[16px] text-center font-normal tracking-[1px] p-x-4 py-10">
              {item.description}
            </p>
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default ImageGrid;
