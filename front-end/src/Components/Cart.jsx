
import { toast } from "react-toastify";
import 'react-toastify/ReactToastify.css';
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addToCart,
  decreaseQty,
  deleteProduct,
  fetchCartFromFirebase,
} from "../cartSlice"
import Navbar from "./Navbar";
import Footer from "./Footer";

const Cart = () => {
  const dispatch = useDispatch();
  const { cartList } = useSelector((state) => state.cart);

  // Accessing auth state
  const { isAuthenticated } = useSelector((state) => state.auth);

  const totalPrice = cartList.reduce((price, item) => price + item.qty * item.price, 0);

  // Fetch cart on component mount if authenticated
  useEffect(() => {
    if (isAuthenticated) {
      dispatch(fetchCartFromFirebase());
    }
    window.scrollTo(0, 0);
  }, [dispatch, isAuthenticated]);

  const handleAddToCart = (product) => {
    dispatch(addToCart({ product, num: 1 }));
    toast.success(`Increased quantity of ${product.name}!`, {
      position: toast.POSITION.TOP_RIGHT,
    });
  };

  const handleDecreaseQty = (product) => {
    dispatch(decreaseQty(product));
    toast.info(`Decreased quantity of ${product.name}.`, {
      position: toast.POSITION.TOP_RIGHT,
    });
  };

  const handleDeleteProduct = (product) => {
    dispatch(deleteProduct(product));
    toast.error(`${product.name} removed from the cart.`, {
      position: toast.POSITION.TOP_RIGHT,
    });
  };

  if (!isAuthenticated) {
    return (
      <div className="not-authenticated">
        <h2>Please login to view your cart.</h2>
      </div>
    );
  }

return (
  <>
    <Navbar />
    <div className="bg-black text-white min-h-screen overflow-hidden">
      <div className="absolute inset-0 bg-black opacity-90 z-0"></div>
      <div className="flex flex-col justify-start items-center z-20 relative">
        <div className="flex flex-wrap justify-between w-full px-10">
          <div className="w-full lg:w-2/3 p-4">
            {cartList.length === 0 ? (
              <div className="cart-list mb-4 p-4 bg-gray-900 border border-gray-700 rounded-lg shadow-lg">
                <h1 className="text-center text-xl">No Items are added in Cart</h1>
              </div>
            ) : (
              cartList.map((item) => {
                const productQty = item.price * item.qty;
                return (
                  <div
                    className="cart-list mb-4 p-4 bg-gray-900 border border-gray-700 rounded-lg shadow-lg"
                    key={item.id}
                  >
                    <div className="flex items-start border-b border-gray-600 pb-4">
                      <div className="w-1/3">
                        <img
                          src={item.imageUrl}
                          alt={item.name}
                          className="w-full h-auto rounded-lg"
                          onError={(e) => {
                            e.target.onerror = null;
                            e.target.src = 'path/to/placeholder/image.jpg';
                          }}
                        />
                      </div>
            
                      <div className="w-2/3 pl-4 m-auto">
                        <div className="flex flex-row justify-between">
                          <div className="flex flex-col gap-5">
                            <h3 className="font-bold text-3xl">{item.name}</h3>
                            <h4 className="text-gray-400 text-xl">
                              ${item.price.toFixed(2)} * {item.qty} =
                              <span className="ml-2 text-white">${productQty.toFixed(2)}</span>
                            </h4>
                          </div>

                          <div className="flex mt-2">
                            <button
                              className="bg-blue-600 hover:bg-blue-700 text-white h-8 p-1 rounded"
                              onClick={() => handleAddToCart(item)}
                            >
                              <i className="fa-solid fa-plus"></i>
                            </button>
                            <button
                              className="bg-purple-600 hover:bg-purple-700 text-white h-8 p-1 rounded ml-2"
                              onClick={() => handleDecreaseQty(item)}
                            >
                              <i className="fa-solid fa-minus"></i>
                            </button>
                          </div>
                        </div>
                      </div>
                      
                      <button
                        className="text-red-500 text-lg ml-auto"
                        onClick={() => handleDeleteProduct(item)}
                      >
                        <ion-icon name="close"></ion-icon>
                      </button>
                    </div>
                  </div>
                );
              })
            )}
          </div>
          <div className="w-full lg:w-1/3 p-4">
            <div className="bg-gray-900 border border-gray-700 p-4 rounded-lg">
              <div className="flex flex-col gap-20">
                <h2 className="text-4xl font-extralight tracking-wide">Cart Summary</h2>
                <div className="flex justify-between">
                  <h4>Total Price :</h4>
                  <h3>${totalPrice.toFixed(2)}</h3>
                </div>
              </div>
              
              <button className="bg-green-600 text-white p-2 rounded w-full mt-10">
                Checkout
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <style>{`
      @keyframes moving {
        0% {
          transform: translateY(0) translateX(0);
        }
        100% {
          transform: translateY(100vh) translateX(100vw);
        }
      }

      .animate-moving {
        animation: moving linear infinite;
        white-space: nowrap;
      }
    `}</style>
    <Footer />
  </>
);
};

export default Cart;
