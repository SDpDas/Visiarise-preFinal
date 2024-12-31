import { useState } from "react";
import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import { auth } from "./firebase"; // Ensure this import is correct
import Navbar from "./Navbar"; // Assuming you have a Navbar component

const PhoneAuth = () => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [otp, setOtp] = useState("");
  const [verificationId, setVerificationId] = useState("");
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [error, setError] = useState("");
  const [notification, setNotification] = useState(""); // State for notification

  const setupRecaptcha = () => {
    window.recaptchaVerifier = new RecaptchaVerifier(
      "recaptcha-container",
      {
        size: "invisible",
        callback: () => {
          console.log("Recaptcha verified");
        },
      },
      auth
    );
  };

  const handleSendOtp = () => {
    setupRecaptcha();
    const appVerifier = window.recaptchaVerifier;
    signInWithPhoneNumber(auth, phoneNumber, appVerifier)
      .then((confirmationResult) => {
        setVerificationId(confirmationResult.verificationId);
        setIsOtpSent(true);
        console.log("OTP sent");
        setNotification("OTP sent to your phone!");
        setTimeout(() => setNotification(""), 3000);
      })
      .catch((error) => {
        console.error("Error during OTP sending:", error);
        setError(error.message);
      });
  };

  const handleVerifyOtp = () => {
    const credential = { verificationId, otp };
    const verificationResult = signInWithPhoneNumber(auth, credential);
    verificationResult
      .then(() => {
        console.log("Phone number verified");
        setNotification("Phone number verified successfully!");
        setTimeout(() => setNotification(""), 3000);
        // Reset states if needed
        setPhoneNumber("");
        setOtp("");
        setVerificationId("");
        setIsOtpSent(false);
      })
      .catch((error) => {
        console.error("Error during OTP verification:", error);
        setError(error.message);
      });
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen flex items-center justify-center bg-no-repeat bg-cover" style={{ backgroundImage: 'url("https://i.makeagif.com/media/11-22-2022/IlnLT0.gif")' }}>
        <div className="relative bg-gradient-radial bg-black p-8 rounded-xl shadow-lg max-w-md w-full animate__animated animate__fadeIn">
          <h1 className="text-4xl font-bold text-white text-center mb-6">Phone Authentication</h1>
          {error && <p className="text-red-500 text-center mb-4">{error}</p>}
          {notification && (
            <div className="bg-green-500 text-white p-2 rounded-md text-center mb-4 animate__animated animate__fadeInDown">
              {notification}
            </div>
          )}
          {!isOtpSent ? (
            <div>
              <input
                type="tel"
                placeholder="Phone Number"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                required
                className="w-full px-4 py-2 rounded-md bg-white text-black border border-neonBlue focus:outline-none focus:ring-2 focus:ring-neonBlue focus:border-transparent transition duration-300"
              />
              <button onClick={handleSendOtp} className="w-full py-2 rounded-md bg-neonPurple text-white font-bold hover:bg-neonBlue transition duration-300">
                Send OTP
              </button>
            </div>
          ) : (
            <div>
              <input
                type="text"
                placeholder="Enter OTP"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                required
                className="w-full px-4 py-2 rounded-md bg-white text-black border border-neonBlue focus:outline-none focus:ring-2 focus:ring-neonBlue focus:border-transparent transition duration-300"
              />
              <button onClick={handleVerifyOtp} className="w-full py-2 rounded-md bg-neonPurple text-white font-bold hover:bg-neonBlue transition duration-300">
                Verify OTP
              </button>
            </div>
          )}
          <div id="recaptcha-container" className="hidden"></div>
        </div>
      </div>
    </>
  );
};

export default PhoneAuth;
