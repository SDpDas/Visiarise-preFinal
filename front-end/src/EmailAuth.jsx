import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import { auth } from "./firebase"; // Import the Firebase auth instance
import Navbar from "./Navbar"; // Assuming you have a Navbar component

const EmailAuth = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSignUp, setIsSignUp] = useState(true);
  const [error, setError] = useState("");
  const [notification, setNotification] = useState(""); // State for notification

  const handleAuth = async (e) => {
    e.preventDefault();
    try {
      if (isSignUp) {
        await createUserWithEmailAndPassword(auth, email, password);
        console.log("User signed up successfully");
        setNotification("Account successfully created!");
      } else {
        await signInWithEmailAndPassword(auth, email, password);
        console.log("User logged in successfully");
        setNotification("Successfully logged in!");
      }
      setTimeout(() => setNotification(""), 3000);
      setEmail("");
      setPassword("");
    } catch (error) {
      console.error("Authentication error:", error.message);
      setError(error.message);
    }
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen flex items-center justify-center bg-no-repeat bg-cover" style={{ backgroundImage: 'url("https://i.makeagif.com/media/11-22-2022/IlnLT0.gif")' }}>
        <div className="relative bg-gradient-radial bg-black p-8 rounded-xl shadow-lg max-w-md w-full animate__animated animate__fadeIn">
          <h1 className="text-4xl font-bold text-white text-center mb-6">{isSignUp ? "Create Your Account" : "Welcome Back!"}</h1>
          {error && <p className="text-red-500 text-center mb-4">{error}</p>}
          {notification && (
            <div className="bg-green-500 text-white p-2 rounded-md text-center mb-4 animate__animated animate__fadeInDown">
              {notification}
            </div>
          )}
          <form onSubmit={handleAuth} className="space-y-6">
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-4 py-2 rounded-md bg-white text-black border border-neonBlue focus:outline-none focus:ring-2 focus:ring-neonBlue focus:border-transparent transition duration-300"
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-4 py-2 rounded-md bg-white text-black border border-neonBlue focus:outline-none focus:ring-2 focus:ring-neonBlue focus:border-transparent transition duration-300"
            />
            <button type="submit" className="w-full py-2 rounded-md bg-neonPurple text-white font-bold hover:bg-neonBlue transition duration-300">
              {isSignUp ? "Sign Up" : "Login"}
            </button>
          </form>
          <button onClick={() => setIsSignUp(!isSignUp)} className="w-full mt-2 bg-gray-500 text-white rounded-md p-2">
            {isSignUp ? "Switch to Login" : "Switch to Sign Up"}
          </button>
        </div>
      </div>
    </>
  );
};

export default EmailAuth;
