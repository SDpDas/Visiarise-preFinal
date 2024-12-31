import { motion } from 'framer-motion'; // Import motion from framer-motion
import { useNavigate } from 'react-router-dom';
import products from '../utils/products'; // Assuming you have a products file

const FeaturedSection = () => {
  const navigate = useNavigate();

  // Filter products with ID greater than 50
  const filteredProducts = products.filter(product => product.id > 50);

  return (
    <div className="bg-black p-10">
      <h2 className="text-4xl font-bold text-white mb-8">Featured Products</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
            <motion.div
              key={product.id}
              className="bg-gray-900 p-6 rounded-lg shadow-lg cursor-pointer"
              onClick={() => navigate(`/product/${product.id}`)} // Navigate to product detail page on click
              whileHover={{ scale: 1.1 }}
            transition={{ type: 'spring', stiffness: 300 }}
            >
              <img
                src={product.imageUrl}
                alt={product.name}
                className="w-full h-48 object-cover mb-4 rounded-lg"
              />
              <h3 className="text-xl font-bold text-white mb-2">{product.name}</h3>
              <p className="text-lg font-semibold text-gray-300">${product.price}</p>
            </motion.div>
          ))
        ) : (
          <p className="text-white">No featured products available.</p> // Handle case with no products
        )}
      </div>
    </div>
  );
};

export default FeaturedSection;
