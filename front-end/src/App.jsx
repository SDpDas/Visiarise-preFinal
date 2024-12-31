import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ToastContainer} from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";

import Shopping from './Components/Shopping';
import About from './Components/About';
import Cart from './Components/Cart';
import Home from './Components/Home';  
import BestDeal from './Components/BestDeal'; 
import ProductCard from './Components/ProductCard'; 
import Login from './Components/Login';
import SignUp from './Components/Signup';
import ProfilePage from './Components/ProfilePage';
import SupportPage from './Components/SupportPage';
import ContactUs from './Components/Contact';
import LoadingBubbles from './Components/LoadingBubbles'; // Import the LoadingBubbles component
import ChatBot from './Components/ChatBot'; // Import the ChatBot component
import Hero_page from './Components/Hero_page';
import FAQ from './Components/FAQ';
import ForgotPassword from './Components/ForgotPassword';
import AccountSettings from './Components/AccountSettings';


import { fetchCartFromFirebase } from './cartSlice';  // Ensure cart data is fetched
import { checkAuthStatus } from './authSlice'; // Import checkAuthStatus

const App = () => {
  
  const dispatch = useDispatch();
  const { isAuthenticated, isLoading } = useSelector((state) => state.auth); // Get authentication state from redux

  // Check authentication status on app load
  useEffect(() => {
    dispatch(checkAuthStatus());
  }, [dispatch]);

  // Fetch cart data on app load if authenticated
  useEffect(() => {
    if (isAuthenticated) {
      dispatch(fetchCartFromFirebase());
    }
  }, [isAuthenticated, dispatch]);

  // Optionally show a loading indicator while checking auth status
  if (isLoading) {
    return <LoadingBubbles />; // Replace with the LoadingBubbles component
  }

  return (
    <Router>
      <div>
      <ToastContainer position="top-right" autoClose={5000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover />
        {/* Your persistent component, like ChatBot, placed outside of Routes */}
        <ChatBot />  {/* This will be visible on all pages */}

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/shopping" element={<Shopping />} />
          <Route path="/about" element={<About />} />
          <Route path="/cart" element={isAuthenticated ? <Cart /> : <Navigate to="/login" />} />
          <Route path="/product/:productId" element={<ProductCard />} />
          <Route path="/Contact" element={<ContactUs />} />
          <Route path="/bestdeals" element={<BestDeal />} />
          <Route path="/support" element={<SupportPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/profile" element={isAuthenticated ? <ProfilePage /> : <Navigate to="/login" />} />
          <Route path='/Hero_page' element={<Hero_page/>} />
          <Route path='/FAQ' element={<FAQ/>} />
          <Route path='/ForgotPassword' element={<ForgotPassword/>} />
          <Route path='/AccountSettings' element={<AccountSettings/>} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
