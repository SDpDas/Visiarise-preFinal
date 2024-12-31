import { motion } from 'framer-motion';
import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import { addToCart } from '../cartSlice'; // Assuming you have a Redux cart slice
import products from '../utils/products'; // Adjust the path to your actual data

const BestDeals = () => {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items); // Assuming you have a cart state
  const [notification, setNotification] = useState({ message: '', isVisible: false, type: '' });

  const handleAddToCart = (product) => {
    const itemInCart = cartItems.find(item => item.product.id === product.id);

    if (itemInCart) {
      // If the item is already in the cart, show a message
      setNotification({
        message: 'This item is already in your cart!',
        isVisible: true,
        type: 'info'
      });
    } else {
      // If the item is not in the cart, add it and show a success message
      dispatch(addToCart({ product, num: 1 }));
      setNotification({
        message: 'Added to cart successfully!',
        isVisible: true,
        type: 'success'
      });
    }

    // Automatically hide the notification after 3 seconds
    setTimeout(() => {
      setNotification({ ...notification, isVisible: false });
    }, 3000);
  };

  const handleProductClick = (productId) => {
    window.location.href = `/product/${productId}`; // Replace with 'useNavigate()' if using React Router v6
  };

  // Filter products to only include those with id between 1 and 30
  const filteredProducts = products.filter(product => product.id >= 1 && product.id <= 30);

  return (
    <section className="min-h-screen bg-black p-10">
      <h1 className="text-center mb-16 text-6xl font-bold font-serif text-white">
        Our Best Deals
      </h1>

      {/* Notification */}
      {notification.isVisible && (
        <div
          className={`mb-4 p-4 rounded-lg transition-transform duration-500 ${notification.type === 'success' ? 'bg-green-500' : 'bg-yellow-500'}`}
          style={{ transform: notification.isVisible ? 'translateY(0)' : 'translateY(-100%)' }}
        >
          <p className="text-white">{notification.message}</p>
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filteredProducts.map((product) => (
          <motion.div
            key={product.id}
            className="bg-gray-900 p-6 rounded-lg shadow-lg cursor-pointer"
            whileHover={{ scale: 1.05 }}
            transition={{ type: 'spring', stiffness: 300 }}
            onClick={() => handleProductClick(product.id)}
          >
            <img
              src={product.imageUrl}
              alt={product.name}
              className="w-full h-48 object-cover mb-4 rounded-lg"
            />
            <h3 className="text-xl font-bold text-white mb-2">{product.name}</h3>
            <p className="text-lg font-semibold text-gray-300">${product.price}</p>
            <div className="flex items-center mb-4">
              {Array.from({ length: 5 }, (_, index) => (
                <svg
                  key={index}
                  className={`w-5 h-5 ${index < Math.round(product.rating) ? 'text-purple-400' : 'text-white'}`}
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M10 15.27L16.18 20l-1.64-7.03L20 8.24l-7.19-.61L10 2 8.19 7.63 1 8.24l5.46 4.73L5.82 20z" />
                </svg>
              ))}
              <span className="ml-2 text-white">{product.reviews}</span>
            </div>
            <button
              onClick={(e) => {
                e.stopPropagation(); // Prevent click from bubbling up to the card
                handleAddToCart(product);
              }}
              className="w-full bg-cyan-500 text-white py-2 rounded hover:bg-purple-700 transition"
              style={{
                boxShadow: '0 0 5px rgba(0, 140, 255, 0.8), 0 0 10px rgba(0, 140, 255, 0.8)',
              }}
            >
              Add to Cart
            </button>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default BestDeals;
