import { useState, useEffect } from 'react';
import { db } from '../firebase'; // Adjust the path as necessary
import { ref, set, get } from "firebase/database"; // Import ref, set, and get from Firebase
import { useDispatch, useSelector } from 'react-redux'; // Import useSelector to access Redux state
import { getAuth } from "firebase/auth"; // Import getAuth from Firebase
import { logout } from '../authSlice';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import CountryFlag from 'react-country-flag';
import Navbar from './Navbar';
import Footer from './Footer';

const ProfilePage = () => {

  const dispatch = useDispatch();
  const [profileImage, setProfileImage] = useState(null);
  const [country, setCountry] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [bio, setBio] = useState('');
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated); // Accessing authentication state
  const auth = getAuth(); // Get the current authenticated user
  const [hoverPosition, setHoverPosition] = useState(0);
  const [hoveredSentenceIndex, setHoveredSentenceIndex] = useState(0);

  const [viewState, setViewState] = useState('view')

  useEffect(() => {
    const fetchUserData = async () => {
      const user = auth.currentUser;
      const userInfoRef = ref(db, 'userInfo/' + user.uid); // Use UID instead of email as key
      try {
        const snapshot = await get(userInfoRef);
        if (snapshot.exists()) {
          const userData = snapshot.val();
          setName(userData.name);
          setEmail(userData.email);
          setCountry(userData.country);
          setBio(userData.bio);
          setProfileImage(userData.profileImage);
        }
      } catch (error) {
        console.log("Error when displaying profile: ", error);
      }
    }

    fetchUserData();
  }, [auth.currentUser, isAuthenticated]); // Fetch when user or authentication changes

  const handleMouseMove = (e) => {
    const { clientX, target } = e;
    const { left, width } = target.getBoundingClientRect();
    const offsetX = clientX - left;
    const percentage = Math.min(Math.max(offsetX / width, 0), 1);
    setHoverPosition(percentage);
  };

  const formatBio = (bio) => {  // Shortening bio by adding new line after each full stop.
    return bio?.split('.').map((sentences, index) => (
      <span key={index}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setHoveredSentenceIndex(index)}
        onMouseLeave={() => setHoveredSentenceIndex(null)}
        style={{
          background: 'transparent',
          backgroundClip: 'text',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundImage: hoveredSentenceIndex === index ? `linear-gradient(90deg, #00b3ff ${hoverPosition * 100}%, #ffffff ${hoverPosition * 100}%)` :
            `linear-gradient(90deg, #ffffff ${hoverPosition * 100}%, #ffffff ${hoverPosition * 100}%)`,
          transition: 'background 0.3s ease'
        }}
      >
        {sentences.trim()}
        {index < bio.split('.').length - 1 && <br />}
      </span>
    )) || null;
  };

  // Generating country flag using following func.

  const getCountryCode = (countryName) => {
    const countryCodes = {
      USA: 'US',
      Canada: 'CA',
      UK: 'GB',
      India: 'IN',
      Australia: 'AU',
    };
    return countryCodes[countryName] || '';
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const user = auth.currentUser; // Get the current user
    if (user) {
      // Create a reference for the user info in the database using UID
      const userInfoRef = ref(db, 'userInfo/' + user.uid);

      // Set user data in the Realtime Database
      await set(userInfoRef, {
        name,
        email: user.email, // Use the authenticated user's email
        country,
        bio,
        profileImage
      });

      console.log("Profile saved successfully!");
      setViewState('view');
    }
  };

  const handleClick = () => {
    setViewState('edit');
  }


  return (
    <div>
      <Navbar/>
      {viewState === 'edit' ? (
        <div className="flex flex-row items-center justify-center min-h-screen bg-black text-white gap-20">
          <div className='flex flex-col items-center'>
            {profileImage ? (
              <img
                src={profileImage}
                alt="Profile"
                className="h-35 w-40 object-fit rounded-md mb-4 border-2 border-purple-500 cursor-pointer"
                onClick={() => document.getElementById('fileInput').click()}
              />
            ) : (
              <div
                className="w-24 h-24 rounded-full mb-4 border-4 border-purple-500 flex items-center justify-center cursor-pointer"
                onClick={() => document.getElementById('fileInput').click()}
              >
                <span className="text-sm text-gray-300">Upload Image</span>
              </div>
            )}

            <div className='flex flex-col items-center'>
              <div className='border-1 border-white rounded-sm text-white'>
                <Link to="/profile" className='no-underline text-white'>
                  <button onClick={() => setViewState('view')} className='flex items-center text-left p-2 w-full hover:text-blue-500'>
                    <img src="/home.png" alt="Dashboard Icon" className='h-10 w-auto -ml-1 mr-3' />
                    Dashboard
                  </button>
                </Link>
                <button
                  onClick={handleClick}
                  className='flex items-center text-left p-2 w-full bg-red-500 text-white rounded-md'>
                  <img src="/people.png" alt="Dashboard Icon" className='h-8 w-auto mr-4' />
                  Account Details
                </button>
                <Link to="/forgotpassword" className='no-underline text-white'>
                  <button className='flex items-center text-left p-2 hover:text-blue-500'>
                    <img src="/lock.png" alt="Dashboard Icon" className='h-8 w-auto mr-4' />
                    Change Password
                  </button>
                </Link>
                <Link to="/login" className='no-underline text-white'>
                  <button
                    onClick={() => dispatch(logout())}
                    className='flex items-center text-left p-2 w-full hover:text-blue-500 '>
                    <img src="/exit.png" alt="Dashboard Icon" className='h-8 w-auto ml-1 mr-3' />
                    Logout
                  </button>
                </Link>
              </div>
            </div>
          </div>

          <div className='flex flex-col items-start'>
            <h2 className="text-4xl font-bold mb-4">Account Settings</h2>
            <div className="flex flex-col items-center bg-gray-800 p-8 rounded-lg shadow-lg">
              <input
                type="file"
                accept="image/*"
                id="fileInput"
                style={{ display: 'none' }}
                onChange={handleImageUpload}
              />

              <form onSubmit={handleSubmit} className="h-auto w-[80vh]">
                <div className='flex flex-col gap-3'>
                  <div className='flex flex-col gap-2'>
                    <div className='flex flex-col justify-center gap-2'>
                      <div className='font-sans tracking-wide font-light'>Full Name</div>
                      <input
                        type="text"
                        placeholder="Name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="mb-4 w-full p-2 bg-gray-700 border border-gray-500 rounded"
                        required
                      />
                    </div>
                    <div className='flex flex-col justify-center gap-2'>
                      <div className='font-sans tracking-wide font-light'>Email ID</div>
                      <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="mb-4 w-full p-2 bg-gray-700 border border-gray-500 rounded"
                        disabled // Email is now fetched from the authenticated user
                      />
                    </div>
                    <div className='flex flex-col justify-center gap-2'>
                      <div className='font-sans tracking-wide font-light'>Nationality</div>
                      <select
                        value={country}
                        onChange={(e) => setCountry(e.target.value)}
                        className="mb-4 p-2 bg-gray-700 border border-gray-500 rounded w-full"
                      >
                        <option value="">Select Country</option>
                        <option value="USA">USA</option>
                        <option value="Canada">Canada</option>
                        <option value="UK">UK</option>
                        <option value="India">India</option>
                        <option value="Australia">Australia</option>
                        {/* Add more countries as needed */}
                      </select>
                    </div>
                    <div className='flex flex-col justify-center gap-2'>
                      <div className='font-sans tracking-wide font-light'>Short Bio</div>
                      <textarea
                        placeholder="Short Bio"
                        value={bio}
                        onChange={(e) => setBio(e.target.value)}
                        className="mb-4 w-full p-2 bg-gray-700 border border-gray-500 rounded"
                        required
                      />
                    </div>
                  </div>

                  <div className='flex justify-center'>
                    <button
                      type="submit"
                      className="w-[20%] bg-blue-400 hover:bg-purple-400 transition 
                        duration-300 px-4 py-2 rounded"
                    >
                      Save Profile
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      ) : (
        <div className='flex flex-row items-center justify-center bg-black min-h-screen gap-20'>
          <div className='flex flex-col items-center gap-5'>
            {profileImage && (
              <img
                src={profileImage}
                alt="Profile"
                className="w-40 h-45 rounded-lg mb-4 border-2 border-blue-500 cursor-pointer"
                onClick={() => document.getElementById('fileInput').click()}
              />
            )}
            <input
              type="file"
              accept="image/*"
              id="fileInput"
              style={{ display: 'none' }}
              onChange={handleImageUpload}
            />
            <div className='border-1 border-blue-400 rounded-sm text-white'>
              <div className='flex flex-col'>
                <Link to="/profile" className='no-underline text-white'>
                  <button className='flex items-center text-left p-2 w-full bg-red-500 rounded-md text-white'>
                    <img src="/home.png" alt="Dashboard Icon" className='h-10 w-auto -ml-1 mr-3' />
                    Dashboard
                  </button>
                </Link>
                <button
                  onClick={handleClick}
                  className='flex items-center text-left p-2 hover:text-blue-500'>
                  <img src="/people.png" alt="Dashboard Icon" className='h-8 w-auto mr-4' />
                  Account Details
                </button>
                <Link to="/forgotpassword" className='no-underline text-white'>
                  <button className='flex items-center text-left p-2 hover:text-blue-500'>
                    <img src="/lock.png" alt="Dashboard Icon" className='h-8 w-auto mr-4' />
                    Change Password
                  </button>
                </Link>
                <Link to="/login" className='no-underline text-white'>
                  <button
                    onClick={() => dispatch(logout())}
                    className='flex items-center text-left p-2 w-full hover:text-blue-500 '>
                    <img src="/exit.png" alt="Dashboard Icon" className='h-8 w-auto ml-1 mr-3' />
                    Logout
                  </button>
                </Link>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-10 items-center rounded-lg text-white p-8 bg-gray-800 w-[100vh]">
            <div className='flex flex-col items-center gap-12 mt-4'>
              <motion.h2 style={{
                display: 'flex',
                alignItems: 'center',
                letterSpacing: '1px',
                textShadow: '0 0 5px rgba(255, 255, 255, 0.7)'
              }}
                className="text-4xl font-sans font-normal tracking-wide uppercase mb-4
                transform scale-x-0 hover:scale-x-100 duration:200 inline-block"
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 1 }}
                whileHover={{ scale: 1.05 }}
              >
                <p className='relative'>
                  <span style={{ color: '#d000ff', letterSpacing: '4px' }}>Your</span>
                  <span style={{ color: '#00b3ff', letterSpacing: '4px' }}>&nbsp;Workspace</span>
                  <span className='block h-0.5 w-full bg-white rounded-md left-0 bottom-0 mt-1' />
                </p>
              </motion.h2>
              <div className='flex flex-col justify-center items-start gap-9'>
                <div className='flex flex-row group transition-all duration-200'>
                  <div className="text-3xl font-sans tracking-wider opacity-100 transition group-hover:opacity-0">Name: </div>
                  <div className='text-3xl ml-10 font-extralight transition 
                    group-hover:-translate-x-10 hover:ml-6 group-hover:text-4xl hover:tracking-wider'>{name}</div>
                </div>
                <div className='flex flex-row group transition-all duration-200'>
                  <div className="text-3xl font-sans tracking-wider opacity-100 transition group-hover:opacity-0">Email: </div>
                  <div className='ml-12 text-3xl font-extralight transition
                    group-hover:-translate-x-10 hover:ml-0 hover:tracking-wider'>{email}</div>
                </div>
                <div className="flex flex-row group transition-all duration-200">
                  <div className='text-3xl font-sans tracking-wider opacity-100 transition group-hover:opacity-0'>Country: </div>
                  <div className='flex flex-row gap-2'>
                    <div className='text-3xl ml-3 font-extralight hover:tracking-wider'>{country}</div>
                    <CountryFlag
                      countryCode={getCountryCode(country)}
                      svg
                      className='h-full w-full mt-1.5 text-3xl'
                      aria-label={country}
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className='flex flex-col justify-center items-center gap-7 mt-4'>
              <div className='mb-2 text-xl font-sans text-justify transition duration-30 ease-in'>
                {formatBio(bio)}
              </div>

              <button
                onClick={handleClick}
                className="bg-purple-500 hover:bg-blue-400 transition duration-300 px-4 py-2 rounded mb-8"
              >
                Edit Profile
              </button>
            </div>
          </div>
        </div>
      )}
      <Footer/>
    </div>
  );
}



export default ProfilePage;
