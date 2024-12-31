import PropTypes from 'prop-types';
import { useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useDispatch } from 'react-redux';
import { addToCart } from '../cartSlice'; // Assuming you have a Redux cart slice
import products from '../utils/products'; // Path to your product data

import Navbar from './Navbar';
import Footer from './Footer';

const ProductCard = () => {
  const { productId } = useParams(); // Get the productId from the URL
  const allProducts = products; // Use other products if specified
  const product = allProducts.find((p) => p.id === parseInt(productId)); // Find the product
  const dispatch = useDispatch();

  const handleAddToCart = (product) => {
    dispatch(addToCart({ product, num: 1 }));
  };

  if (!product) {
    return (
      <div className="text-white text-center p-10 min-h-screen bg-black">
        <Navbar />
        <h2 className="text-2xl">Product not found</h2>
      </div>
    ); // Handle case where product is not found
  }

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-black p-10 text-white">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {/* Product Image */}
          <div className="flex justify-center items-center">
            <img
              src={product.imageUrl}
              alt={product.name}
              className="w-full h-auto max-w-lg rounded-lg shadow-lg"
            />
          </div>

          {/* Product Details */}
          <div className="flex flex-col justify-between">
            <div>
              <h1 className="text-4xl font-bold mb-4">{product.name}</h1>
              <p className="text-3xl text-cyan-500 font-semibold mb-4">${product.price}</p>
              <div className="flex items-center mb-4">
                {Array.from({ length: 5 }, (_, index) => (
                  <svg
                    key={index}
                    className={`w-6 h-6 ${index < Math.round(product.rating) ? 'text-purple-400' : 'text-gray-600'}`}
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M10 15.27L16.18 20l-1.64-7.03L20 8.24l-7.19-.61L10 2 8.19 7.63 1 8.24l5.46 4.73L5.82 20z" />
                  </svg>
                ))}
                <span className="ml-2">{product.reviews || 0} reviews</span>
              </div>
              <p className="text-lg text-gray-300 mb-8">{product.description || product.shortDescription}</p>
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
          </div>
        </div>

        {/* Product Specifications Table */}
        <div className="mt-16">
          <h2 className="text-2xl font-semibold mb-4">Product Specifications</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full text-white">
              <thead>
                <tr className="bg-gray-800">
                  <th className="py-3 px-6 text-left">Feature</th>
                  <th className="py-3 px-6 text-left">Details</th>
                </tr>
              </thead>
              <tbody>
                <tr className="bg-gray-700 border-b border-gray-600">
                  <td className="py-3 px-6">Product Type</td>
                  <td className="py-3 px-6">{product.type}</td>
                </tr>
                <tr className="bg-gray-800 border-b border-gray-600">
                  <td className="py-3 px-6">Brand</td>
                  <td className="py-3 px-6">{product.brand}</td>
                </tr>
                <tr className="bg-gray-700 border-b border-gray-600">
                  <td className="py-3 px-6">Material</td>
                  <td className="py-3 px-6">{product.material}</td>
                </tr>
                <tr className="bg-gray-800 border-b border-gray-600">
                  <td className="py-3 px-6">Color</td>
                  <td className="py-3 px-6">{product.color}</td>
                </tr>
                <tr className="bg-gray-700 border-b border-gray-600">
                  <td className="py-3 px-6">Weight</td>
                  <td className="py-3 px-6">{product.weight}</td>
                </tr>
                <tr className="bg-gray-800 border-b border-gray-600">
                  <td className="py-3 px-6">Stock</td>
                  <td className="py-3 px-6">{product.stock} left in stock</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Related Products */}
        <div className="mt-16">
          <h2 className="text-2xl font-semibold mb-4">You May Also Like</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {allProducts
              .filter((relatedProduct) => relatedProduct.id !== product.id) // Exclude current product
              .slice(0, 4) // Show only 4 related products
              .map((relatedProduct) => (
                <motion.div
                  key={relatedProduct.id}
                  className="bg-gray-900 p-6 rounded-lg shadow-lg cursor-pointer"
                  whileHover={{ scale: 1.05 }}
                  transition={{ type: 'spring', stiffness: 300 }}
                  onClick={() => (window.location.href = `/product/${relatedProduct.id}`)}
                >
                  <img
                    src={relatedProduct.imageUrl}
                    alt={relatedProduct.name}
                    className="w-full h-48 object-cover mb-4 rounded-lg"
                  />
                  <h3 className="text-xl font-bold text-white mb-2">{relatedProduct.name}</h3>
                  <p className="text-lg font-semibold text-gray-300">${relatedProduct.price}</p>
                </motion.div>
              ))}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

// PropTypes validation
ProductCard.propTypes = {
  isOtherProduct: PropTypes.bool, // Indicate if the product is from otherProducts
};

export default ProductCard;
