import { createSlice } from '@reduxjs/toolkit';

// Load cart from sessionStorage if available
const savedCart = JSON.parse(sessionStorage.getItem('cartItems'));

const initialState = {
  items: savedCart || [],
};

// Helper: Save cart to sessionStorage
const saveToSession = (items) => {
  sessionStorage.setItem('cartItems', JSON.stringify(items));
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart(state, action) {
      const item = action.payload;
      console.log('🛒 ADDING TO CART:', item.title);

      const existing = state.items.find(i => i.id === item.id);
      if (existing) {
        existing.quantity += 1;
      } else {
        state.items.push({ ...item, quantity: 1 });
      }

      saveToSession(state.items);
    },

    removeFromCart(state, action) {
      state.items = state.items.filter(item => item.id !== action.payload);
      saveToSession(state.items);
    },

    increaseQuantity(state, action) {
      const item = state.items.find(i => i.id === action.payload);
      if (item) item.quantity += 1;
      saveToSession(state.items);
    },

    decreaseQuantity(state, action) {
      const item = state.items.find(i => i.id === action.payload);
      if (item && item.quantity > 1) item.quantity -= 1;
      saveToSession(state.items);
    },

    clearCart(state) {
      state.items = [];
      sessionStorage.removeItem('cartItems');
    },
  },
});

export const {
  addToCart,
  removeFromCart,
  clearCart,
  increaseQuantity,
  decreaseQuantity,
} = cartSlice.actions;

export default cartSlice.reducer;
