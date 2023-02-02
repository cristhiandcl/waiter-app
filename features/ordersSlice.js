import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [],
};

export const ordersSlice = createSlice({
  name: "orders",
  initialState,
  reducers: {
    addOrder: (state, action) => {
      state.items = [...state.items, action.payload];
    },
    removeOrder: (state, action) => {
      const removeItem = state.items.filter(
        (item) => item.id === action.payload
      );
      state.items = [...removeItem];
    },
    emptyOrders: (state) => {
      state.items = [];
    },
  },
});

// Action creators are generated for each case reducer function
export const { addOrder, removeOrder, emptyOrders } = ordersSlice.actions;

export const getOrders = (state) => state.orders.items;

export default ordersSlice.reducer;
