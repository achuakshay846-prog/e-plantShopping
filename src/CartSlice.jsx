import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: []   // Each item: { id, name, price, image, quantity }
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {

    // ✅ Add Item
    addItem: (state, action) => {
      const existingItem = state.items.find(
        item => item.id === action.payload.id
      );

      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.items.push({
          ...action.payload,
          quantity: 1
        });
      }
    },

    // ✅ Remove Item Completely
    removeItem: (state, action) => {
      state.items = state.items.filter(
        item => item.id !== action.payload
      );
    },

    // ✅ Update Quantity (Increase / Decrease)
    updateQuantity: (state, action) => {
      const { id, amount } = action.payload;

      const item = state.items.find(
        item => item.id === id
      );

      if (item) {
        item.quantity += amount;

        // If quantity becomes 0 or less → remove item
        if (item.quantity <= 0) {
          state.items = state.items.filter(
            item => item.id !== id
          );
        }
      }
    }

  }
});

export const { addItem, removeItem, updateQuantity } = cartSlice.actions;

export default cartSlice.reducer;
