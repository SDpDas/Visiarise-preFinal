import { configureStore } from "@reduxjs/toolkit";
import cartSlice from "./cartSlice"; // Import cartSlice
import authSlice from "./authSlice"; // Import authSlice

export const store = configureStore({
  reducer: {
    cart: cartSlice, // Set up the cart reducer
    auth: authSlice, // Set up the auth reducer
  },
});
