import { useState } from "react";
import { motion } from "framer-motion";

const SolutionSection = () => {
  const teamMembers = [
    { name: "Founder & CEO", image: "/dhruv.png", details: "At VisiARise, I lead the vision and strategy, driving innovation in mobile and AR solutions. I oversee product development, team management, and impactful AR experiences to transform digital experiences for clients and users." },
    { name: "Co-founder & Unity Developer", image: "/sherya.png", details: "At VisiARise, I design and develop immersive Unity-based AR solutions, driving innovation and enhancing user experiences with cutting-edge technology." },
    { name: "CMO", image: "/onate.png", details: "I shape VisiARise's marketing strategy, driving brand positioning, innovative campaigns, and partnerships to boost awareness and customer engagement in AR and mobile apps." },
    { name: "CFO", image: "/chandresh.png", details: "Manages budget, finance, and handles stakeholder relationships with a strategic approach, ensuring financial stability and aligning organizational goals. He works closely with stakeholders to develop effective strategies, allocate resources, and track financial performance to drive sustainable growth." },
    { name: "Co-Founder & Web Developer", image: "/rishab.png", details: "Develops robust, scalable web platforms and combines technical expertise with strategic vision to build seamless solutions for AR experiences. He also contributed to the paperwork involved." },
    { name: "Web Developer", image: "/sagar.png", details: "Sagar specializes in developing scalable, efficient, and dynamic web applications. His expertise lies in building robust backend systems and ensuring seamless functionality, driving the technical success of our projects." },
    { name: "Web Developer", image: "/ashree.png", details: "Ashree focuses on creating visually appealing and responsive interfaces. Her attention to detail and passion for user-centric design ensure a flawless and engaging user experience." },
    { name: "UI/UX", image: "/garima.png", details: "Garima excels in crafting intuitive and visually engaging user interfaces. Her focus on user-centric design and seamless interactions ensures exceptional experiences that align with our vision for AR and mobile solutions." },
  ];

  const [clickedMember, setClickedMember] = useState(null);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen w-full bg-gradient-to-b from-purple-700 to-black text-white py-0 relative overflow-auto">
      <div className="p-8 z-10 mb-8">
        <h2
          className="flex flex-row items-center justify-center text-4xl font-bold mb-4 text-center md:text-left sm:text-3xl lg:text-6xl"
          style={{ textShadow: "0 0 5px rgba(30, 136, 229, 0.5)" }}
        >
          <span className="text-purple-500 mr-4">Meet</span>
          <span className="text-blue-500 mr-4">Our</span>
          <span className="text-purple-500">Team</span>
        </h2>
      </div>

      <div className="flex flex-wrap justify-center gap-8 relative">
        {teamMembers.map((member, index) => (
          <div
            key={index}
            className={`flex flex-col items-center mx-4 ${
              index % 2 === 0 ? "transform translate-y-4" : "transform -translate-y-4"
            }`}
          >
            <motion.div
              className="flex items-center justify-center rounded-full shadow-lg"
              style={{
                width: "220px",
                height: "220px",
                filter: "drop-shadow(0 0 5px rgba(7, 192, 248, 0.7)) drop-shadow(0 0 10px rgba(139, 43, 91, 0.4))",
              }}
              whileHover={{
                scale: 1.1,
              }}
              transition={{
                duration: 0.5,
                ease: "easeInOut",
              }}
            >
              <img
                src={member.image}
                className="w-full h-full object-cover rounded-full"
                alt={member.name}
                loading="lazy" // Lazy loading added here
              />
            </motion.div>

            <motion.div
              className="text-center mt-4 bg-gray-900 text-white p-4 rounded-lg shadow-lg w-64"
              initial={{ opacity: 0, y: -10 }}
              animate={{
                opacity: clickedMember === index ? 1 : 0,
                y: clickedMember === index ? 0 : -10,
              }}
              transition={{
                duration: 0.5,
                ease: "easeInOut",
              }}
              style={{
                display: clickedMember === index ? "block" : "none",
              }}
            >
              <h3 className="text-xl font-bold mb-2">{member.name}</h3>
              <p>{member.details}</p>
            </motion.div>

            <button
              className="mt-2 text-blue-400 hover:text-blue-600"
              onClick={() => setClickedMember(clickedMember === index ? null : index)}
            >
              {clickedMember === index ? "Hide Details" : member.name}
            </button>
          </div>
        ))}
      </div>

      <style>{`
        @keyframes neon {
          0% { text-shadow: 0 0 5px rgba(156, 39, 176, 0.5), 0 0 10px rgba(156, 39, 176, 0.5), 0 0 15px rgba(156, 39, 176, 0.5); }
          50% { text-shadow: 0 0 10px rgba(30, 136, 229, 0.5), 0 0 20px rgba(30, 136, 229, 0.5), 0 0 30px rgba(30, 136, 229, 0.5); }
          100% { text-shadow: 0 0 5px rgba(156, 39, 176, 0.5), 0 0 10px rgba(156, 39, 176, 0.5), 0 0 15px rgba(156, 39, 176, 0.5); }
        }

        h2 {
          animation: neon 1.5s infinite alternate;
        }
      `}</style>
    </div>
  );
};

export default SolutionSection;
