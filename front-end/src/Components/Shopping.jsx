import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { addToCart, clearCart } from '../cartSlice';
import products from '../utils/products'; // Import products.js
import Navbar from './Navbar';
import Footer from './Footer';

const Shopping = () => {
  const [showDemo, setShowDemo] = useState(false); // State to control demo functionality
  const [currentStep, setCurrentStep] = useState(0); // Demo steps tracking
  const dispatch = useDispatch();

  const steps = [
    {
      text: "Explore products by browsing through the grid.",
      video: "src/assets/Browse-product.mp4",
    },
    {
      text: "Click 'Add to Cart' to add items to your cart.",
      video: "src/assets/add-to-cart.mp4",
    },
    {
      text: "Click on a product for more details.",
      video: "src/assets/Product-details.mp4",
    },
    {
      text: "Clear your cart using the 'Clear Cart' button at the bottom.",
      video: "src/assets/clear-button.mp4",
    },
    {
      text: "Experience a seamless shopping experience with real-time updates!",
      video: "src/assets/seamless-experience.mp4",
    },
  ];

  useEffect(() => {
    // Check if demo has already been shown
    const demoShown = localStorage.getItem('demoShown');
    if (!demoShown) {
      setShowDemo(true); // Show demo if not previously shown
    }
  }, []);

  const handleNextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      setShowDemo(false); // End demo
      localStorage.setItem('demoShown', 'true'); // Mark demo as shown
    }
  };

  const handleSkipDemo = () => {
    setShowDemo(false);
    localStorage.setItem('demoShown', 'true'); // Mark demo as shown
  };

  const handleAddToCart = (product) => {
    dispatch(addToCart({ product, num: 1 }));
    toast.success(`${product.name} has been added to the cart!`, {
      position: toast.POSITION.BOTTOM_RIGHT,
      autoClose: 3000,
      theme: 'colored',
    });
  };

  const handleClearCart = () => {
    dispatch(clearCart());
    toast.info("Cart has been cleared.", {
      position: toast.POSITION.TOP_RIGHT,
    });
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-black bg-cover flex flex-col text-black relative">
        {/* Demo Overlay */}
        {showDemo && (
          <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg text-center max-w-lg">
              <p className="text-lg mb-4">{steps[currentStep].text}</p>
              {steps[currentStep].video && (
                <video
                  src={steps[currentStep].video}
                  autoPlay
                  loop
                  className="w-full h-64 object-cover mb-4 rounded-lg"
                  loading="lazy" // Lazy load video
                />
              )}
              <div className="flex justify-center gap-4">
                <button
                  onClick={handleNextStep}
                  className="bg-blue-500 text-white px-4 py-2 rounded-lg"
                >
                  {currentStep < steps.length - 1 ? "Next" : "Finish"}
                </button>
                <button
                  onClick={handleSkipDemo}
                  className="bg-gray-500 text-white px-4 py-2 rounded-lg"
                >
                  Skip
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Products Display Section */}
        <div className="flex-1 p-6 mt-2">
          <h2 className="text-2xl sm:text-3xl md:text-6xl font-bold mb-14 text-center text-white">
            Browse Products
          </h2>
          <div className="flex justify-end mr-6 mb-6">
            <button
              onClick={handleClearCart}
              className="bg-red-600 text-white px-4 py-2 rounded-full transform hover:scale-105 duration-500"
            >
              Clear Cart
            </button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-12">
            {products.map((product) => (
              <Link
                to={`/product/${product.id}`}
                key={product.id}
                className="bg-black p-4 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 transform hover:scale-105 flex flex-col justify-center items-center no-underline h-[400px]"
              >
                <div className="w-full h-[250px] flex justify-center items-center bg-black rounded-lg">
                  <img
                    src={product.imageUrl}
                    alt={product.name}
                    className="w-3/4 h-full object-contain rounded-lg"
                    loading="lazy" // Lazy load image
                  />
                </div>
                <h3 className="text-xl font-semibold mb-2 text-center text-white">
                  {product.name}
                </h3>
                <p className="text-gray-400 font-semibold text-lg mb-2">
                  ${product.price.toFixed(2)}
                </p>
                <p className="text-yellow-400 text-sm">
                  Rating: {product.rating} ⭐
                </p>
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    handleAddToCart(product);
                  }}
                  className="bg-yellow-500 text-white px-4 py-2 rounded-full mt-4 hover:bg-purple-400 transition-colors duration-300"
                >
                  Add to Cart
                </button>
              </Link>
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Shopping;
