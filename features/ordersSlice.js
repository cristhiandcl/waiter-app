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
        (item) => item.id !== action.payload
      );
      state.items = [...removeItem];
    },
    emptyOrders: (state) => {
      state.items = [];
    },
    modifyOrders: (state, action) => {
      const modifiedOrders = state.items.map((item) =>
        item.id === action.payload.id ? action.payload : item
      );
      state.items = [...modifiedOrders];
    },
    setOrders: (state, action) => {
      state.items = [...action.payload];
    },
  },
});

// Action creators are generated for each case reducer function
export const { addOrder, removeOrder, emptyOrders, modifyOrders, setOrders } =
  ordersSlice.actions;

export const getOrders = (state) => state.orders.items;

export default ordersSlice.reducer;
