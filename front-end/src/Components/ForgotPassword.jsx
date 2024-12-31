import { useState } from 'react';
import { auth } from "../firebase"; // Ensure firebase is configured
import { sendPasswordResetEmail } from "firebase/auth";
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../authSlice';
import Navbar from "./Navbar";
import Footer from "./Footer";
import { Link } from 'react-router-dom';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [notification, setNotification] = useState('');
  const [error, setError] = useState('');
  const dispatch = useDispatch();
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  const handleSendResetLink = async (e) => {
    e.preventDefault();
    try {
      await sendPasswordResetEmail(auth, email);
      setNotification('Password reset email sent! Check your inbox.');
    } catch (err) {
      setError('Failed to send reset email. Please try again.');
      console.error(err.message);
    }
  };

  return (
    <>
      <Navbar />
      {isAuthenticated ? ( 
      <div className="flex justify-center min-h-screen bg-black">
        <div className='flex justify-center absolute bottom-24 gap-20 min-w-full'>
          <div className='mt-20'>
            <div className='border-1 border-white rounded-sm text-white'>
              <Link to="/profile" className='no-underline text-white'>
                <button className='flex items-center text-left p-2 w-full hover:text-blue-500'>
                  <img src="/home.png" alt="Dashboard Icon" className='h-10 w-auto -ml-1 mr-3' />
                  Dashboard
                </button>
              </Link>
              <Link to="/AccountSettings" className='no-underline text-white'>
              <button
                className='flex items-center text-left p-2 w-full text-white rounded-md'>
                <img src="/people.png" alt="Dashboard Icon" className='h-8 w-auto mr-4' />
                  Account Details
              </button>
              </Link>
              <Link to="/forgotpassword" className='no-underline text-white'>
                <button className='flex items-center text-left p-2 w-full bg-red-500 rounded-md '>
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

          <div className='flex flex-col justify-center items-center w-full max-w-md bg-black h-[45vh] rounded shadow-md border border-1 border-purple-400'>
            <h2 className="text-4xl font-sans font-bold mb-12 text-white text-center tracking-wider">Forgot Password</h2>
            <form onSubmit={handleSendResetLink}>
              <div className="mb-4">
                <label htmlFor="email" className="block text-2xl text-white text-center tracking-wide font-medium mb-6">
                  Email Address
                </label>
                <div className='mb-4' />
                <input
                  type="email"
                  id="email"
                  className="w-full px-12 py-2 border border-gray-300 text-center rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition">
                Send Reset Link
              </button>
            </form>
            {notification && <p className="text-green-500 text-sm mt-2">{notification}</p>}
            {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
          </div>
        </div>
      </div>
      ):( 
        <div className='bg-gradient-to-b from-black to-black min-h-screen'>
          <div className='flex relative top-52 justify-center'>
            <div className='flex flex-col justify-center items-center w-full max-w-md h-[45vh] rounded shadow-md border border-1 border-white'>
              <h2 className="text-4xl font-sans font-bold mb-12 text-white text-center tracking-wider">Forgot Password</h2>
              <form onSubmit={handleSendResetLink}>
                <div className="mb-4">
                  <label htmlFor="email" className="block text-2xl text-white text-center tracking-wide font-medium mb-6">
                    Email Address
                  </label>
                  <div className='mb-4' />
                  <input
                    type="email"
                    id="email"
                    className="w-full px-12 py-2 border border-gray-300 text-center rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
                <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition">
                  Send Reset Link
                </button>
              </form>
              {notification && <p className="text-green-500 text-sm mt-2">{notification}</p>}
              {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
            </div>
          </div>
        </div>
      )}
      <Footer />
    </>
  );
};

export default ForgotPassword;
