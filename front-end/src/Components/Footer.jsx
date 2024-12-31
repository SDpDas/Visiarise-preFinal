import { Link } from "react-router-dom";
// import { motion } from "framer-motion";

const Footer = () => {
  return (
    <footer className="bg-black text-white py-8">
      <div className="flex flex-col lg:flex-row justify-between items-center px-6">
        <Link to={"/"}>
          <div className="hidden lg:block w-32 no-underline">
            {/* <motion.h2
              className="text-3xl md:text-5xl font-bold mb-0 ml-2 font-opensans"
              style={{
                display: 'flex',
                alignItems: 'center',
                letterSpacing: '1px', // Added letter-spacing
              }}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1 }}
              whileHover={{ scale: 1.05 }} // Scale effect on hover
            >
              <span style={{ color: '#ffffff' }}>Visi</span>
              <span style={{ color: '#d000ff' }}>AR</span>
              <span style={{ color: '#00b3ff' }}>ise</span>
            </motion.h2> */}
          </div>
        </Link>
        
        {/* Navigation Links */}
        <nav className="font-poppins flex flex-wrap justify-center sm:justify-start ml-4 space-x-6 mb-6 lg:mb-0 lg:ml-20">
          <Link
            to="/"
            className="font-light text-xl cursor-pointer text-purple-500 hover:text-blue-500 no-underline"
          >
            Home
          </Link>
          <Link
            to="/about"
            className="font-light text-xl cursor-pointer text-purple-500 hover:text-blue-500 no-underline"
          >
            About
          </Link>
          <Link
            to="/Contact"
            className="font-light text-xl cursor-pointer text-purple-500 hover:text-blue-500 no-underline"
          >
            Contact Us
          </Link>
          <Link
            to="/FAQ"
            className="font-light text-xl cursor-pointer text-purple-500 hover:text-blue-500 no-underline"
          >
            FAQ
          </Link>
          <Link
            to="/support"
            className="font-light text-xl cursor-pointer text-purple-500 hover:text-blue-500 no-underline"
          >
            Support
          </Link>
        </nav>

        {/* Social Media Icons */}
        <div className="flex justify-center lg:justify-start items-center space-x-4 mt-6 lg:mt-0">
          <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer">
            <img
              src="/blackfb.png"
              alt="Facebook"
              className="h-10 w-12 cursor-pointer hover:bg-gray-700 p-2 rounded-full"
            />
          </a>
          <a href="https://www.twitter.com" target="_blank" rel="noopener noreferrer">
            <img
              src="/blacktwit.png"
              alt="Twitter"
              className="h-10 w-12 cursor-pointer hover:bg-gray-700 p-2 rounded-full"
            />
          </a>
          <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer">
            <img
              src="/blackinsta.png"
              alt="Instagram"
              className="h-10 w-12 cursor-pointer hover:bg-gray-700 p-2 rounded-full"
            />
          </a>
          <a href="mailto:support@example.com">
            <img
              src="/blackgmail.png"
              alt="Gmail"
              className="h-10 w-12 cursor-pointer hover:bg-gray-700 p-2 rounded-full"
            />
          </a>
        </div>
      </div>

      {/* Divider */}
      <div className="my-8 w-[96%] mx-auto border-white border-b-2 opacity-25 mb-8" />

      {/* Copyright */}
      <div className="text-center text-gray-400 text-sm lg:text-base">
        &copy; Copyright. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;