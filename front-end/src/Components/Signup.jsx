import { useState } from "react";
import { createUserWithEmailAndPassword, sendEmailVerification } from "firebase/auth";
import { auth } from "../firebase"; // Ensure this import is correct
import Navbar from "./Navbar";
import Footer from "./Footer";
import GoogleAuth from "../GoogleAuth"; // Ensure correct import
import { useNavigate } from "react-router-dom";

const SignUp = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [notification, setNotification] = useState("");
  const [showPassword, setShowPassword] = useState(false); // State for showing/hiding password
  const [isLoading, setIsLoading] = useState(false); // Add loading state
  const navigate = useNavigate();

  const handleSignUp = async (e) => {
    e.preventDefault();
    if (isLoading) return; // Prevent double submissions

    // Basic client-side validation (e.g., non-empty fields)
    if (!name || !email || !password) {
      setError("Please fill in all the fields.");
      return;
    }

    setIsLoading(true); // Set loading to true while processing
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      await sendEmailVerification(userCredential.user);
      setNotification("A verification link has been sent to your email. Please verify to continue.");

      // Clear input fields after success
      setName("");
      setEmail("");
      setPassword("");

      // Navigate to login page after a delay
      setTimeout(() => {
        navigate("/login");
      }, 5000);
    } catch (error) {
      console.error("Error creating account:", error.message);
      setError(error.message); // Show error message
    } finally {
      setIsLoading(false); // Reset loading state
    }
  };

  const handleLoginClick = () => {
    navigate("/login"); // Navigate to the login page
  };

  return (
    <>
      <Navbar />
      <div className="flex items-center justify-center bg-no-repeat bg-cover bg-black">
        <div className="flex flex-col md:flex-row w-full max-w-screen min-h-[80vh] bg-white shadow-lg overflow-hidden">
          <div className="bg-left-theme bg-no-repeat bg-cover flex-1 flex flex-col items-center justify-center p-6 md:p-12">
            <h1 className="text-white font-sans font-bold text-2xl md:text-7xl tracking-thin text-center">
              Welcome to 
              <br />
              <span className="typing-effect bg-clip-text text-transparent bg-gradient-to-r from-[#ffffff] via-[#C471ED] animate-typing">
                Visiarise
              </span>
            </h1>
            <p className="text-white font-normal font-condensed px-5 my-4 mx-2 text-sm md:text-2xl text-center">
              Join us to explore Augmented Reality and Virtual Reality services for your brand!
            </p>
          </div>

          <div className="flex flex-col justify-center items-center flex-shrink-0 w-full md:w-2/5 bg-gradient-radial bg-black p-6 sm:p-12">
            <h1 className="text-white text-2xl md:text-3xl mb-4 text-center">Sign Up</h1>
            {error && <p className="text-red-500 text-sm">{error}</p>}
            {notification && (
              <div className="bg-black border border-green-400 text-green-700 px-4 py-3 rounded relative">
                <strong className="font-bold">Success!</strong>
                <span className="block sm:inline">{notification}</span>
                <p className="mt-2 text-sm text-gray-600">Redirecting to login page...</p>
              </div>
            )}
            {!notification && (
              <form onSubmit={handleSignUp} className="w-full">
                <label htmlFor="fullname" className="text-white text-sm font-bold block mb-2 ml-12 md:ml-16">
                  Full Name
                </label>
                <div className="flex flex-row justify-center items-center mb-4">
                  <input
                    type="text"
                    placeholder="Full Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-3/4 p-3 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-lg text-sm"
                    required
                  />
                </div>
                <label htmlFor="email" className="text-white text-sm font-bold block mb-2 ml-12 md:ml-16">
                  Email
                </label>
                <div className="flex flex-row justify-center items-center mb-4">
                  <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-3/4 p-3 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-lg text-sm"
                    required
                  />
                </div>

                <div className="w-3/4 ml-12 md:ml-16 mb-4">
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

                <div className="flex flex-row justify-center items-center">
                  <button
                    type="submit"
                    className="bg-purple-700 text-white font-bold tracking-wider px-8 py-1.5 rounded-full hover:scale-105 transition duration-300 w-3/4 text-lg"
                    disabled={isLoading} // Disable button while loading
                  >
                    {isLoading ? "Signing Up..." : "Sign Up"}
                  </button>
                </div>
              </form>
            )}
            <div className="flex flex-row justify-center items-center w-3/4">
              <GoogleAuth />
            </div>
            <div className="mt-2 text-center">
              <p>
                <span
                  className="cursor-pointer text-white hover:text-purple-400"
                  onClick={handleLoginClick}
                >
                  Already have an account? Login
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

export default SignUp;
