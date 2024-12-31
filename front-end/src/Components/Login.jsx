import { useState, useEffect, Suspense, lazy } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import Navbar from "./Navbar";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../authSlice"; 
import Footer from "./Footer";
import { useNavigate } from "react-router-dom"; 
import { Link } from "react-router-dom";

// Lazy load GoogleAuth
const GoogleAuth = lazy(() => import("../GoogleAuth")); // Lazy load GoogleAuth component

const Login = () => {
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [notification, setNotification] = useState("");
  const [showPassword, setShowPassword] = useState(false); 
  const dispatch = useDispatch();
  const navigate = useNavigate(); 
  const user = useSelector((state) => state.auth.user); 

  // Redirect to home if user is already logged in
  useEffect(() => {
    if (user) {
      navigate("/"); 
    }
  }, [user, navigate]);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const userCredential = await signInWithEmailAndPassword(auth, identifier, password);
      console.log("User logged in:", userCredential.user);
      setNotification("Successfully logged in!");
      setTimeout(() => setNotification(""), 3000);

      // Dispatch login action with user email
      dispatch(login(userCredential.user.email));

      // Navigate to the home page after successful login
      navigate("/"); 
    } catch (error) {
      console.error("Error logging in:", error.message);
      setError(error.message);
    }
  };

  const handleSignUpClick = () => {
    navigate("/signup"); 
  };

  return (
    <>
      <Navbar /> 
      
      <div className="flex items-center justify-center bg-no-repeat bg-cover bg-black">
        <div className="flex flex-col md:flex-row w-full max-w-screen min-h-[80vh] bg-white shadow-lg overflow-hidden">
          <div className="bg-left-theme bg-no-repeat bg-cover flex-1 flex flex-col items-center justify-center p-6 md:p-12">
            <h1 className="text-white font-sans font-bold text-2xl md:text-7xl tracking-thin text-center">
              Welcome to{" "}
              <br/>
              <span className="typing-effect bg-clip-text text-transparent bg-gradient-to-r from-[#ffffff] via-[#C471ED] animate-typing">
                Visiarise
              </span>
            </h1>
            <p className="text-white font-normal font-condensed px-5 my-4 mx-2 text-sm md:text-2xl text-center">
              We&apos;re VisiARise, a service-based company providing Augmented Reality and Virtual Reality services to brands like furniture, home decor, and more.
            </p>
          </div>
          
          <div className="flex flex-col justify-center items-center flex-shrink-0 w-full md:w-2/5 bg-gradient-radial bg-black p-6 sm:p-12">
            <h1 className="text-white text-2xl md:text-3xl mb-4 text-center">Login</h1>
            <form onSubmit={handleLogin} className="w-full flex flex-col items-center space-y-4">
              <div className="w-3/4">
                <label htmlFor="email" className="text-white text-sm font-bold block mb-2">
                  Email
                </label>
                <input
                  id="email"
                  type="text"
                  placeholder="Email or Phone Number"
                  value={identifier}
                  onChange={(e) => setIdentifier(e.target.value)}
                  className="w-full p-3 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-lg text-sm"
                  required
                />
              </div>

              <div className="w-3/4">
                <label htmlFor="password" className="text-white text-sm font-bold block mb-2">
                  Password
                </label>
                <div className="relative w-full">
                  <input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full p-3 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-lg text-sm"
                    required
                  />
                  <span
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-3 text-black cursor-pointer"
                  >
                    {showPassword ? "Hide" : "Show"}
                  </span>
                </div>
              </div>

              <div className="w-3/4 flex items-center">
                <input
                  id="remember"
                  type="checkbox"
                  className="h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-300 rounded"
                />
                <label htmlFor="remember" className="text-white ml-1 text-[14px] font-normal">
                  Remember for 30 Days.
                </label>

                <Link to="/ForgotPassword">
                <div className="text-center font-poppins ml-16">
                  <span className="cursor-pointer text-white hover:text-purple-400 font-normal">Forgot Password?</span>
                </div>
                </Link>
              </div>
              
              {error && <p className="text-red-500 text-sm text-center w-3/4">{error}</p>}
              {notification && <p className="text-green-500 text-sm text-center w-3/4">{notification}</p>}

              <div className="w-3/4">
                <button
                  type="submit"
                  className="w-full bg-purple-600 text-white font-bold tracking-wider py-2 rounded-full hover:scale-105 transition duration-300 text-lg font-poppins"
                >
                  Login
                </button>
              </div>
            </form>

            {/* Lazy load GoogleAuth component */}
            <Suspense fallback={<div>Loading Google Authentication...</div>}>
              <div className="flex flex-row justify-center items-center w-3/4">
                <GoogleAuth />
              </div>
            </Suspense>

            <div className="mt-4 text-center">
              <p className="font-poppins">
                <span
                  className="cursor-pointer text-white hover:text-purple-700"
                  onClick={handleSignUpClick}
                >
                  Don&apos;t have an account yet?
                </span>
              </p>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Login;
