import { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import { db } from '../firebase'; // Adjust the path as necessary
import { ref, get } from 'firebase/database';
import { getAuth } from "firebase/auth"; // Import getAuth from Firebase
const auth = getAuth(); // Get the current authenticated user
import StarBorder from './starBorder';

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);
  const [isServicesOpen, setIsServicesOpen] = useState(false);
  const cartList = useSelector((state) => state.cart.cartList);
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const userEmail = useSelector((state) => state.auth.userEmail);
  const [userData, setUserData] = useState(null);
  const cartCount = cartList.length;
  const navigate = useNavigate();
  const dropdownRef = useRef(null); // For Services Dropdown
  const userDropdownRef = useRef(null); // For User Profile Dropdown

  // For Outside Click Events

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target) && isServicesOpen) {
        setIsServicesOpen(false);
      }
    
      if (userDropdownRef.current && !userDropdownRef.current.contains(event.target) && isUserDropdownOpen) {
        setIsUserDropdownOpen(false);
      }
    }

    // Event Listeners
    if (isUserDropdownOpen || isServicesOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    else
    {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    // Cleanup
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isUserDropdownOpen, isServicesOpen]);

  // For User Authentication
  useEffect(() => {
    if (isAuthenticated && userEmail) {
      const fetchUserData = async () => {
        const user = auth.currentUser;
        const userInfoRef = ref(db, 'userInfo/' + user.uid);
        const snapshot = await get(userInfoRef);
        if (snapshot.exists()) {
          setUserData(snapshot.val());
        }
      };
      fetchUserData();
    }
  }, [isAuthenticated, userEmail]);

  // Scroll function to scroll to services
  const handleServScroll = () => {
    const servicesSection = document.getElementById('services');

    if (servicesSection) {
      servicesSection.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }
  
  // Scroll function to scroll to images
  const handleImgScroll = () => {
    const imageSection = document.getElementById('images');

    if (imageSection) {
      imageSection.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }

  const desktopNavList = (
    <ul className="flex flex-col gap-5 lg:flex-row lg:items-center lg:gap-6">
      {/* Navigation Links */}
      {['/', '#services', '/about', '/contact','/support'].map((path, index) => {
        const linkText = path === '/' ? 'Home' : path.startsWith('#') ? path.slice(1).charAt(0).toUpperCase() + path.slice(2) : 
        path.charAt(1).toUpperCase() + path.slice(2);
        return (
          <ul key={index}>
            {path === "#services" ? ( 
            <>
            <li ref={dropdownRef}>
              <div
              className='flex flex-row justify-center items-center gap-2'
              ref={dropdownRef}
              >
                <Link
                to={path === '#services' ? '/#services' : path} // Redirect to homepage if services clicked outside home
                onClick={(e) => {
                  if (path === '#services') {
                    e.preventDefault();
                    if (window.location.pathname !== '/') {
                      navigate('/'); // Navigating to Homepage
                      setTimeout(() => handleServScroll(), 300); // Scroll Delay
                    }
                    else
                    {
                      handleServScroll(); // Direct Scroll in homepage
                    }
                  }
                }}
                className="text-white hover:text-blue-500 active:text-purple-500 transition-all duration-300 ease-in-out"
                >
                  {linkText}
                </Link>

                {/* Drop Down button */}
                <button
                onClick={() => setIsServicesOpen(!isServicesOpen)}
                className="text-white transition-all duration-500 ease-in-out"
                >
                  {isServicesOpen ? ( 
                    <img 
                    src="./up-arrow-lg.png" 
                    alt="drop down arrow" 
                    className='w-auto h-[8px] mt-[5px]'
                    />
                  ) : ( 
                    <img 
                    src="./arrow-lg.png" 
                    alt="drop down arrow" 
                    className='w-auto h-[8px] mt-[5px]'
                    />
                  )}
                </button>
              </div>

              {/** Drop Down Menu */}
              {isServicesOpen && (
                <ul className="absolute right-[33vh] top-[11vh] min-w-fit bg-gray-800 shadow-lg rounded-lg grid grid-cols-2 p-1">
                  {/** 1st Row */}
                  <li>
                    <Link
                      to="/#images"
                      onClick={(e) => {
                        e.preventDefault();
                        if (window.location.pathname !== '/') {
    
                          navigate('/'); // Navigating to Homepage
                          setTimeout(() => handleImgScroll(), 300); // Scroll Delay
                        }
                        else
                        {
                          handleImgScroll(); // Direct Scroll in homepage
                        }
                      }}
                      className="block px-6 py-2 text-white text-center w-full rounded-lg hover:rounded-lg hover:bg-blue-500 transition"
                    >
                      Web Development
                    </Link>
                  </li>

                  <li>
                    <Link
                      to="/#images"
                      onClick={(e) => {
                        e.preventDefault();
                        if (window.location.pathname !== '/') {
    
                          navigate('/'); // Navigating to Homepage
                          setTimeout(() => handleImgScroll(), 300); // Scroll Delay
                        }
                        else
                        {
                          handleImgScroll(); // Direct Scroll in homepage
                        }
                      }}
                      className="block px-6 py-2 text-white text-center w-full rounded-lg hover:rounded-lg hover:bg-blue-500 transition"
                    >
                      Machine Learning
                    </Link>
                  </li>

                  {/** 2nd Row */}
                  <li>
                    <Link
                      to="/#images"
                      onClick={(e) => {
                        e.preventDefault();
                        if (window.location.pathname !== '/') {
    
                          navigate('/'); // Navigating to Homepage
                          setTimeout(() => handleImgScroll(), 300); // Scroll Delay
                        }
                        else
                        {
                          handleImgScroll(); // Direct Scroll in homepage
                        }
                      }}
                      className="block px-6 py-2 text-white text-center w-full rounded-lg hover:rounded-lg hover:bg-blue-500 transition"
                    >
                      Data Science
                    </Link>
                  </li>
                
                  <li>
                    <Link
                      to="/#images"
                      onClick={(e) => {
                        e.preventDefault();
                        if (window.location.pathname !== '/') {
    
                          navigate('/'); // Navigating to Homepage
                          setTimeout(() => handleImgScroll(), 300); // Scroll Delay
                        }
                        else
                        {
                          handleImgScroll(); // Direct Scroll in homepage
                        }
                      }}
                      className="block px-6 py-2 text-white text-center w-full rounded-lg hover:rounded-lg hover:bg-blue-500 transition"
                    >
                      UI/UX
                    </Link>
                  </li>

                  {/** 3rd Row */}
                  <li>
                    <Link
                      to="/#images"
                      onClick={(e) => {
                        e.preventDefault();
                        if (window.location.pathname !== '/') {
    
                          navigate('/'); // Navigating to Homepage
                          setTimeout(() => handleImgScroll(), 300); // Scroll Delay
                        }
                        else
                        {
                          handleImgScroll(); // Direct Scroll in homepage
                        }
                      }}
                      className="block px-6 py-2 text-white text-center w-full rounded-lg hover:rounded-lg hover:bg-blue-500 transition"
                    >
                      AR/VR
                    </Link>
                  </li>

                  <li>
                    <Link
                      to="/#images"
                      onClick={(e) => {
                        e.preventDefault();
                        if (window.location.pathname !== '/') {
    
                          navigate('/'); // Navigating to Homepage
                          setTimeout(() => handleImgScroll(), 300); // Scroll Delay
                        }
                        else
                        {
                          handleImgScroll(); // Direct Scroll in homepage
                        }
                      }}
                      className="block px-6 py-2 text-white text-center w-full rounded-lg hover:rounded-lg hover:bg-blue-500 transition"
                    >
                      App Development
                    </Link>
                  </li>
                </ul>
              )}
            </li>
            </> 
            ) 
            : 
            ( 
              <Link
              to={path}
              className="text-white hover:text-blue-500 transition-all duration-300 ease-in-out"
              >
                {linkText}
              </Link>
            )}
          </ul>
        );
      })}
      
      {/* Cart, Shopping Icon & User Profile */}
      <li className="relative flex items-center">
        <Link to="/cart" className="flex items-center">
          <div className="flex items-center justify-center w-10 h-10 bg-purple-600 rounded-full transform transition hover:scale-110 duration-300">
            <i className="fas fa-shopping-cart text-white"></i>
          </div>
          {cartCount > 0 && (
            <span className="absolute top-0 right-0 transform translate-x-1 -translate-y-1 bg-red-500 text-white rounded-full text-xs px-1 py-0.5">
              {cartCount}
            </span>
          )}
        </Link>
      </li>
  
      {isAuthenticated ? (
        <li className="relative" ref={userDropdownRef}>
          <button
            onClick={() => setIsUserDropdownOpen(!isUserDropdownOpen)}
            className="text-white transition-all duration-300 ease-in-out transform hover:scale-110 hover:text-blue-500 active:text-purple-500 text-decoration-none"
          >
            <img
              src={userData?.profileImage || '/user.png'}
              alt="Profile"
              className="w-12 h-12 rounded-full"
            />
          </button>
          {isUserDropdownOpen && (
            <div className="absolute right-0 mt-4 bg-gray-800 text-white shadow-lg px-4 py-3 rounded transition duration-300 ease-in-out z-10">
              {/* Profile only */}
              <Link to="/profile" className="text-blue-500 hover:text-purple-500 uppercase font-bold">
                View Profile
              </Link>
            </div>
          )}
        </li>
      ) : (
        <li>
          <StarBorder
            as={Link}
            to="/login"
            className='h-15 w-28 font-bold'
            color="white"
            speed="6s"
          >
            Login
          </StarBorder>
        </li>
      )}
    </ul>
  );
  

  const mobileNavList = (
    <ul className="flex flex-col gap-5 items-center">
      {['/', '#services', '/about', '/contact', '/support'].map((path, index) => {
        const linkText = path === '/' ? 'Home' : path.startsWith('#') ? path.slice(1).charAt(0).toUpperCase() + path.slice(2) : 
        path.charAt(1).toUpperCase() + path.slice(2);
        return (
          <li key={index}>
            <Link
              to={path === '#services' ? '/#services' : path} // Redirect to homepage if services clicked outside home
              onClick={(e) => {
                if (path === '#services') {
                  e.preventDefault();
                  if (window.location.pathname !== '/') {
                    navigate('/');
                    setTimeout(() => handleServScroll(), 100); // Scroll Delay
                  }
                  else
                  {
                    handleServScroll(); // Direct Scroll in homepage
                  }
                }
              }}
              className="text-white hover:text-blue-500 active:text-purple-500 transition-all duration-300 ease-in-out transform hover:scale-105"
            >
              {linkText}
            </Link>
          </li>
        );
      })}
    </ul>
  );

  return (
    <nav className="h-[80px] bg-black p-4 shadow-lg transition-all border-b-[1px] border-solid border-[#2E2929] duration-300 sticky top-0 z-50">
      <div className="max-w-10xl mx-auto flex justify-between items-center">
        <Link to="/" className='flex items-center'>
          <div className="flex absolute lg:left-10 lg:ml-7 mr-auto">
            <img src="/logo.png" alt="Logo" className="h-10" />
          </div>
        </Link>
        {/* Desktop Navbar */}
        <div className="hidden lg:flex lg:ml-auto lg:mr-5">{desktopNavList}</div>

        {/* Mobile Navbar */}
        <div className="lg:hidden flex items-center">
          {/* Cart and Profile Icon (Authenticated State) */}
          {isAuthenticated && (
            <div className="flex items-center space-x-4 relative">
              {/* Cart Icon */}
              <Link to="/cart" className="flex items-center" aria-label="Go to Cart">
                <div className="flex items-center justify-center w-10 h-10 bg-purple-600 rounded-full transform transition hover:scale-110 duration-300">
                  <i className="fas fa-shopping-cart text-white"></i>
                </div>
                {/* Cart Count */}
                {cartCount > 0 && (
                  <span className="absolute top-0 right-0 transform translate-x-1 -translate-y-1 bg-red-500 text-white rounded-full text-xs px-2 py-0.5">
                    {cartCount}
                  </span>
                )}
              </Link>

              {/* Profile Icon and Dropdown */}
              <button
                onClick={() => setIsUserDropdownOpen(!isUserDropdownOpen)}
                className="focus:outline-none transform transition hover:scale-110 duration-300"
                aria-haspopup="true"
                aria-expanded={isUserDropdownOpen ? 'true' : 'false'}
              >
                <img
                  src={userData?.profileImage || '/user.png'}
                  alt={userData?.name || 'User profile'}
                  className="w-8 h-8 rounded-full"
                />
              </button>
              
              {/* User Dropdown */}
              {isUserDropdownOpen && (
                <div className="absolute right-0 top-14 bg-gray-800 text-white shadow-lg px-4 py-3 rounded transition duration-300 ease-in-out z-10">
                  <div className='flex flex-col justify-center items-center gap-3'>
                    <Link
                      to="/profile"
                      className="text-blue-500 font-extralight font-sans tracking-wide"
                      aria-label="View Profile"
                    >
                      View Profile
                    </Link>
                  </div>
                </div>
              )}
            </div>
          )}


          {/* Login Button (Unauthenticated State) */}
          {!isAuthenticated && (
            <li>
              <StarBorder
                as="button"
                className="custom-class h-[60px] w-[90px]"
                color="cyan"
                speed="5s"
                onClick={() => {
                  // Handle login button click action here (e.g., redirect to login page)
                  window.location.href = '/login'; // You can also use <Link> if you prefer
                }}
              >
                Login
              </StarBorder>
            </li>
          )}

          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="text-white ml-4 focus:outline-none transform transition hover:scale-110 duration-300"
          >
            {isMobileMenuOpen ? (
              <XMarkIcon className="h-6 w-6" />
            ) : (
              <Bars3Icon className="h-6 w-6" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="mt-4 lg:hidden bg-black p-4 rounded transition duration-300 ease-in-out">
          {mobileNavList}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
