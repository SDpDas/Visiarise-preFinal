import { Link } from "react-router-dom"
import { useState, useEffect } from "react";
import { db } from '../firebase'; // Adjust the path as necessary
import { ref, set, get } from "firebase/database"; // Import ref, set, and get from Firebase
import { useDispatch, useSelector } from 'react-redux'; // Import useSelector to access Redux state
import { getAuth } from "firebase/auth"; // Import getAuth from Firebase
import { logout } from '../authSlice';


const AccountSettings = () => {

    const dispatch = useDispatch();
    const [profileImage, setProfileImage] = useState(null);
    const [country, setCountry] = useState('');
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [bio, setBio] = useState('');
    const isAuthenticated = useSelector((state) => state.auth.isAuthenticated); // Accessing authentication state
    const auth = getAuth(); // Get the current authenticated user

    const handleClick = () => {
        setIsProfileComplete(false); // Changes for profile edit 
    }

    useEffect(() => {
        const fetchUserData = async () => {
          const user = auth.currentUser;
          const userInfoRef = ref(db, 'userInfo/' + user.uid); // Use UID instead of email as key
          try {
            const snapshot = await get(userInfoRef);
            if (snapshot.exists()) {
              const userData = snapshot.val();
              setName(userData.name);
              setEmail(userData.email);
              setCountry(userData.country);
              setBio(userData.bio);
              setProfileImage(userData.profileImage);
              setIsProfileComplete(true); // If data exists, mark profile as complete
            }
          } catch (error) {
            console.log("Error when displaying profile: ", error);
          }
        }
    
        fetchUserData();
      }, [auth.currentUser, isAuthenticated]); // Fetch when user or authentication changes

    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setProfileImage(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const user = auth.currentUser; // Get the current user
        if (user) {
            // Create a reference for the user info in the database using UID
            const userInfoRef = ref(db, 'userInfo/' + user.uid);

            // Set user data in the Realtime Database
            await set(userInfoRef, {
                name,
                email: user.email, // Use the authenticated user's email
                country,
                bio,
                profileImage
            });

            setIsProfileComplete(true); // Mark profile as complete
            console.log("Profile saved successfully!");
        }
    };


    return (
        <div>
            {isAuthenticated ? ( 
                <div className="flex flex-row items-center justify-center min-h-screen bg-black text-white gap-20">
                <div className='flex flex-col items-center'>
                    {profileImage ? (
                        <img
                            src={profileImage}
                            alt="Profile"
                            className="h-35 w-40 object-fit rounded-md mb-4 border-2 border-purple-500 cursor-pointer"
                            onClick={() => document.getElementById('fileInput').click()}
                        />
                    ) : (
                        <div
                            className="w-24 h-24 rounded-full mb-4 border-4 border-purple-500 flex items-center justify-center cursor-pointer"
                            onClick={() => document.getElementById('fileInput').click()}
                        >
                            <span className="text-sm text-gray-300">Upload Image</span>
                        </div>
                    )}

                    <div className='flex flex-col items-center'>
                        <div className='border-1 border-white rounded-sm text-white'>
                            <Link to="/profile" className='no-underline text-white'>
                                <button onClick={() => setIsProfileComplete(true)} className='flex items-center text-left p-2 w-full hover:text-blue-500'>
                                    <img src="/home.png" alt="Dashboard Icon" className='h-10 w-auto -ml-1 mr-3' />
                                    Dashboard
                                </button>
                            </Link>
                            <button
                                onClick={handleClick}
                                className='flex items-center text-left p-2 w-full bg-red-500 text-white rounded-md'>
                                <img src="/people.png" alt="Dashboard Icon" className='h-8 w-auto mr-4' />
                                Account Details
                            </button>
                            <Link to="/forgotpassword" className='no-underline text-white'>
                                <button className='flex items-center text-left p-2 hover:text-blue-500'>
                                    <img src="/lock.png" alt="Dashboard Icon" className='h-8 w-auto mr-4' />
                                    Change Password
                                </button>
                            </Link>
                            <Link to="/login" className='no-underline text-white'>
                                <button
                                    onClick={() => dispatch(logout())}
                                    className='flex items-center text-left p-2 w-full hover:text-blue-500 '>
                                    <img src="/exit.png" alt="Dashboard Icon" className='h-8 w-auto ml-1 mr-3' />
                                    Logout
                                </button>
                            </Link>
                        </div>
                    </div>
                </div>

                <div className='flex flex-col items-start'>
                    <h2 className="text-4xl font-bold mb-4">Account Settings</h2>
                    <div className="flex flex-col items-center bg-gray-800 p-8 rounded-lg shadow-lg">
                        <input
                            type="file"
                            accept="image/*"
                            id="fileInput"
                            style={{ display: 'none' }}
                            onChange={handleImageUpload}
                        />

                        <form onSubmit={handleSubmit} className="h-auto w-[80vh]">
                            <div className='flex flex-col gap-3'>
                                <div className='flex flex-col gap-2'>
                                    <div className='flex flex-col justify-center gap-2'>
                                        <div className='font-sans tracking-wide font-light'>Full Name</div>
                                        <input
                                            type="text"
                                            placeholder="Name"
                                            value={name}
                                            onChange={(e) => setName(e.target.value)}
                                            className="mb-4 w-full p-2 bg-gray-700 border border-gray-500 rounded"
                                            required
                                        />
                                    </div>
                                    <div className='flex flex-col justify-center gap-2'>
                                        <div className='font-sans tracking-wide font-light'>Email ID</div>
                                        <input
                                            type="email"
                                            placeholder="Email"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            className="mb-4 w-full p-2 bg-gray-700 border border-gray-500 rounded"
                                            disabled // Email is now fetched from the authenticated user
                                        />
                                    </div>
                                    <div className='flex flex-col justify-center gap-2'>
                                        <div className='font-sans tracking-wide font-light'>Nationality</div>
                                        <select
                                            value={country}
                                            onChange={(e) => setCountry(e.target.value)}
                                            className="mb-4 p-2 bg-gray-700 border border-gray-500 rounded w-full"
                                        >
                                            <option value="">Select Country</option>
                                            <option value="USA">USA</option>
                                            <option value="Canada">Canada</option>
                                            <option value="UK">UK</option>
                                            <option value="India">India</option>
                                            <option value="Australia">Australia</option>
                                            {/* Add more countries as needed */}
                                        </select>
                                    </div>
                                    <div className='flex flex-col justify-center gap-2'>
                                        <div className='font-sans tracking-wide font-light'>Short Bio</div>
                                        <textarea
                                            placeholder="Short Bio"
                                            value={bio}
                                            onChange={(e) => setBio(e.target.value)}
                                            className="mb-4 w-full p-2 bg-gray-700 border border-gray-500 rounded"
                                            required
                                        />
                                    </div>
                                </div>

                                <div className='flex justify-center'>
                                    <button
                                        type="submit"
                                        className="w-[20%] bg-blue-400 hover:bg-purple-400 transition 
                        duration-300 px-4 py-2 rounded"
                                    >
                                        Save Profile
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            ) : ( 
             <Link to="/login"/>
            )}
        </div>
    );
};

export default AccountSettings;
