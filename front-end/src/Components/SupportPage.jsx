import Navbar from './Navbar';
import Footer from './Footer';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { LazyLoadImage } from 'react-lazy-load-image-component'; // Importing LazyLoadImage
import 'react-lazy-load-image-component/src/effects/blur.css'; // Optional: Adds blur effect

const NewSupport = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const [statusMessage, setStatusMessage] = useState('');
  const [isError, setIsError] = useState(false);

  const onSubmit = async (data) => {
    try {
      const response = await fetch('https://formspree.io/f/xldeykgq', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        setStatusMessage('Support request submitted. We will get back to you soon.');
        setIsError(false);
        reset(); // Reset form fields
      } else {
        throw new Error('Failed to submit the form. Please try again later.');
      }
    } catch (error) {
      setStatusMessage(error.message);
      setIsError(true);
    }
  };

  return (
    <>
      <Navbar />
      <div className="flex flex-col items-center bg-left-theme justify-center min-h-screen bg-cover bg-no-repeat font-opensans">
        <div className="relative z-10 flex flex-col md:flex-row items-center justify-between max-w-7xl w-full px-6 py-12">
          <div className="text-center md:text-left md:mr-10">
            <h1 className="text-center text-[40px] sm:text-[50px] md:text-[55px] lg:text-[60px] xl:text-[65px] leading-[45px] sm:leading-[55px] md:leading-[60px] lg:leading-[65px] font-poppins uppercase -tracking-wide text-white mt-14 mb-4">
              Welcome to{" "}
              <br />
              <span className="typing-effect bg-clip-text text-transparent bg-gradient-to-r from-[#000000] via-[#C471ED] to-[#C471ED] animate-typing">
                Visiarise
              </span>
            </h1>
            <div className="flex flex-col justify-center items-center text-center">
              <p className="text-[2rem] font-opensans font-thin text-white">
                Have a question or need assistance?
              </p>
              <p className="text-[1.5rem] font-opensans font-thin text-white mt-2">
                Fill out the form, and our support team will respond promptly.
              </p>
            </div>
          </div>

          <div className="w-full max-w-md md:w-1/2 mt-6 md:mt-12">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
              <input
                type="text"
                placeholder="Name"
                {...register('FirstName', { required: 'First Name is required.' })}
                className={`w-full px-4 py-2 border ${errors.FirstName ? 'border-red-500' : 'border-gray-400'} rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400`}
              />
              {errors.FirstName && (
                <p className="text-red-500 text-sm">{errors.FirstName.message}</p>
              )}

              <input
                type="email"
                placeholder="Email Address"
                {...register('email', {
                  required: 'Email is required.',
                  pattern: {
                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                    message: 'Please enter a valid email address.',
                  },
                })}
                className={`w-full px-4 py-2 border ${errors.email ? 'border-red-500' : 'border-gray-400'} rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400`}
              />
              {errors.email && (
                <p className="text-red-500 text-sm">{errors.email.message}</p>
              )}

              <div className="flex flex-col justify-start items-start">
                <button
                  type="submit"
                  className="w-full px-4 py-2 bg-blue-400 text-white font-bold rounded-md hover:bg-purple-400 transition duration-200"
                >
                  <motion.div className="hover:text-black duration-200">Submit</motion.div>
                </button>
              </div>
            </form>
            {statusMessage && (
              <p
                className={`mt-4 text-lg font-medium ${isError ? 'text-red-500' : 'text-green-500'}`}
              >
                {statusMessage}
              </p>
            )}
          </div>
        </div>

        {/* Lazy loaded image */}
        <div className="w-full flex justify-center mt-10">
          <LazyLoadImage
            src="/path-to-your-image.jpg" // Replace with the actual image URL
            alt="Support"
            effect="blur" // Optional effect: 'blur', 'opacity', or 'black-and-white'
            className="rounded-md shadow-lg"
          />
        </div>
      </div>
      <Footer />
    </>
  );
};

export default NewSupport;
