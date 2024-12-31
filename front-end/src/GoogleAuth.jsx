import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "./firebase"; // Ensure this import is correct
import { useNavigate } from "react-router-dom"; // Import useNavigate

const GoogleAuth = () => {
  const navigate = useNavigate(); // Initialize useNavigate

  const handleGoogleAuth = async () => {
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      console.log("Google Sign-In Successful", result.user);

      // After successful sign-in, navigate to home page
      navigate("/"); // Redirect to home page
    } catch (error) {
      console.error("Error with Google Sign-In", error.message);
    }
  };

  return (
    <button
      onClick={handleGoogleAuth}
      className="flex items-center justify-center w-full py-2 rounded-full bg-white text-black font-bold tracking-wider hover:scale-105 transition duration-300 mt-3"
    >
      <img
        src="https://cdn1.iconfinder.com/data/icons/google-s-logo/150/Google_Icons-09-512.png"
        alt="Google Icon"
        className="w-6 h-6 mr-2"
      />
      Sign in / Sign up with Google
    </button>
  );
};

export default GoogleAuth;
