import { createSlice } from "@reduxjs/toolkit";
import { getAuth, onAuthStateChanged } from "firebase/auth";

// Initial state
const initialState = {
  isAuthenticated: false,
  userEmail: null,
  userToken: null,
  profileImage: null,
  isLoading: false, // Updated default to false for better UX
  error: null, // Added error state to handle authentication errors
};

// Create the slice
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action) => {
      state.isAuthenticated = true;
      state.userEmail = action.payload.userEmail;
      state.userToken = action.payload.userToken;
      state.profileImage = action.payload.profileImage;
      state.isLoading = false;
      state.error = null; // Clear any previous errors
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.userEmail = null;
      state.userToken = null;
      state.profileImage = null;
      state.isLoading = false;
      state.error = null; // Clear errors on logout
    },
    setAuthLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    authError: (state, action) => {
      state.error = action.payload; // Set the error message
      state.isLoading = false;
    },
  },
});

// Thunk to check authentication status on app load
export const checkAuthStatus = () => (dispatch) => {
  const auth = getAuth();
  dispatch(authSlice.actions.setAuthLoading(true)); // Set loading to true

  onAuthStateChanged(
    auth,
    (user) => {
      if (user) {
        // User is signed in.
        user.getIdToken()
          .then((userToken) => {
            const userEmail = user.email;
            const profileImage = user.photoURL;
            dispatch(
              authSlice.actions.login({ userEmail, userToken, profileImage })
            );
          })
          .catch((error) => {
            dispatch(authSlice.actions.authError(error.message));
          });
      } else {
        // User is signed out.
        dispatch(authSlice.actions.logout());
      }
    },
    (error) => {
      // Handle observer errors (e.g., network issues)
      dispatch(authSlice.actions.authError(error.message));
    }
  );
};

// Export actions and reducer
export const { login, logout, authError, setAuthLoading } = authSlice.actions;
export default authSlice.reducer;