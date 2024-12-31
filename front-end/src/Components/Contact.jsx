import { useEffect, useState } from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import { useForm, ValidationError } from '@formspree/react';
import Shape from './shape';  // Import the Shape component

const ContactUs = () => {
  // Formspree setup
  const [state, handleSubmit, reset] = useForm('xldeykgq');

  // Animated shapes state
  const [shapes, setShapes] = useState([]);

  // Generate animated shapes
  useEffect(() => {
    const generateShapes = () => {
      const newShapes = Array.from({ length: 10 }, (_, i) => ({
        id: i,
        size: Math.random() * 60 + 30,
        left: `${Math.random() * 100}vw`,
        top: `${Math.random() * 100}vh`,
        delay: Math.random() * 3,
        duration: Math.random() * 12 + 8,
        type: Math.random() > 0.5 ? 'circle' : 'square',
        color: Math.random() > 0.5 ? '#8000ff' : '#00b3ff',
      }));
      setShapes(newShapes);
    };
    generateShapes();
  }, []);

  return (
    <>
      <Navbar />
      <div
        className="relative flex flex-col md:flex-row items-center justify-center bg-black text-black py-10 px-4 overflow-hidden"
        style={{ minHeight: '85vh' }}
      >
        {/* Animated Shapes */}
        {shapes.map((shape) => (
          <Shape key={shape.id} shape={shape} /> // Use the Shape component here
        ))}

        {/* Contact Form */}
        <div
          className="relative z-10 w-full max-w-lg p-8 bg-gray-800 rounded-lg shadow-lg mb-8 md:mb-0"
          style={{ backgroundColor: 'rgba(34, 34, 34, 0.8)' }}
        >
          <h2 className="text-3xl font-bold mb-6 text-center neon-text text-white">
            Contact Us
          </h2>

          {state.succeeded ? (
            <div className="text-center">
              <p className="text-green-400">Thanks for submitting the form!</p>
              <button
                onClick={reset}
                className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 mt-4 rounded"
              >
                Reset Form
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
              <input
                type="text"
                name="name"
                placeholder="Your Name"
                className="p-2 rounded border border-gray-600 focus:outline-none focus:ring focus:ring-blue-500 placeholder:text-black"
              />
              <ValidationError prefix="Name" field="name" errors={state.errors} />

              <input
                type="email"
                name="email"
                placeholder="Your Email"
                className="p-2 rounded border border-gray-600 focus:outline-none focus:ring focus:ring-blue-500 placeholder:text-black"
              />
              <ValidationError prefix="Email" field="email" errors={state.errors} />

              <input
                type="tel"
                name="phone"
                placeholder="Your Phone Number"
                className="p-2 rounded border border-gray-600 focus:outline-none focus:ring focus:ring-blue-500 placeholder:text-black"
              />

              <select
                name="topic"
                className="p-2 rounded border border-gray-600 focus:outline-none focus:ring focus:ring-blue-500 placeholder:text-black"
              >
                <option value="" disabled selected>
                  Select a Topic
                </option>
                <option>Product Inquiry</option>
                <option>Service Request</option>
                <option>Feedback</option>
                <option>Others</option>
              </select>

              <textarea
                name="message"
                placeholder="Your Message"
                rows="4"
                className="p-2 rounded border border-gray-600 focus:outline-none focus:ring focus:ring-blue-500 placeholder:text-black"
              ></textarea>
              <ValidationError prefix="Message" field="message" errors={state.errors} />

              <input
                type="text"
                name="orderNumber"
                placeholder="Order Number (if applicable)"
                className="p-2 rounded border border-gray-600 focus:outline-none focus:ring focus:ring-blue-500 placeholder:text-black"
              />

              <div>
                <label className="block text-sm font-medium mb-1 text-white">
                  Preferred Contact Method:
                </label>
                <div className="flex items-center space-x-4">
                  <label className="flex items-center text-white">
                    <input
                      type="radio"
                      name="contactMethod"
                      value="email"
                      className="mr-2"
                    />
                    Email
                  </label>
                  <label className="flex items-center text-white">
                    <input
                      type="radio"
                      name="contactMethod"
                      value="phone"
                      className="mr-2"
                    />
                    Phone
                  </label>
                </div>
              </div>

              <button
                type="submit"
                disabled={state.submitting}
                className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 rounded"
              >
                {state.submitting ? 'Submitting...' : 'Send Message'}
              </button>
            </form>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default ContactUs;
