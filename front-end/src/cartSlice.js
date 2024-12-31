import { createSlice } from "@reduxjs/toolkit";
import { db } from './firebase'; // Firebase DB reference
import { ref, set, onValue } from "firebase/database";
import { getAuth } from "firebase/auth"; // Firebase Authentication

const initialState = {
  cartList: [],
  error: null,
};

// Function to get the authenticated user ID from Firebase
const getUserId = () => {
  const auth = getAuth();
  const user = auth.currentUser;
  if (user) {
    return user.uid; // Use authenticated user's UID
  } else {
    console.error("User is not authenticated");
    return null;
  }
};

const updateCartCountInFirebase = async (cartCount) => {
  const userId = getUserId(); // Use the authenticated user's ID
  if (userId) {
    try {
      await set(ref(db, 'cartCount/' + userId), { count: cartCount });
    } catch (error) {
      console.error("Error updating cart count in Firebase:", error);
    }
  } else {
    console.error("User is not authenticated, cannot update cart count.");
  }
};

const updateCartInFirebase = async (cartList) => {
  const userId = getUserId(); // Use the authenticated user's ID
  if (userId) {
    try {
      await set(ref(db, 'carts/' + userId), cartList);
    } catch (error) {
      console.error("Error updating cart in Firebase:", error);
      return { error: "Failed to update cart." };
    }
  } else {
    console.error("User is not authenticated, cannot update cart.");
  }
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const productToAdd = action.payload.product;
      const quantity = action.payload.num;
      const productExists = state.cartList.find((item) => item.id === productToAdd.id);

      if (productExists) {
        state.cartList = state.cartList.map((item) =>
          item.id === productToAdd.id
            ? { ...productExists, qty: productExists.qty + quantity }
            : item
        );
      } else {
        state.cartList.push({ ...productToAdd, qty: quantity });
      }
      // Update Firebase
      updateCartInFirebase(state.cartList);
    },
    decreaseQty: (state, action) => {
      const productToDecrease = action.payload;
      const productExists = state.cartList.find((item) => item.id === productToDecrease.id);

      if (productExists) {
        if (productExists.qty === 1) {
          state.cartList = state.cartList.filter((item) => item.id !== productExists.id);
        } else {
          state.cartList = state.cartList.map((item) =>
            item.id === productExists.id
              ? { ...productExists, qty: productExists.qty - 1 }
              : item
          );
        }
        // Update Firebase
        updateCartInFirebase(state.cartList);
        updateCartCountInFirebase(state.cartList.length);
      }
    },
    deleteProduct: (state, action) => {
      const productToDelete = action.payload;
      state.cartList = state.cartList.filter((item) => item.id !== productToDelete.id);
      // Update Firebase
      updateCartInFirebase(state.cartList);
    },
    setCart: (state, action) => {
      state.cartList = action.payload;
    },
    clearCart: (state) => {
      state.cartList = []; // Reset the cart to an empty array
    },
  },
});

// Fetch cart from Firebase
export const fetchCartFromFirebase = () => (dispatch) => {
  const userId = getUserId(); // Retrieve authenticated user ID
  if (userId) {
    const cartRef = ref(db, 'carts/' + userId);
    onValue(cartRef, (snapshot) => {
      const data = snapshot.val();
      console.log('Fetched cart data:', data); // Log cart data
      if (data) {
        dispatch(setCart(data));
      } else {
        dispatch(setCart([])); // Set cart to empty if no data
      }
    });
  } else {
    console.error("User is not authenticated, cannot fetch cart.");
  }
};

// Export actions and reducer
export const { addToCart, decreaseQty, deleteProduct, setCart, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
