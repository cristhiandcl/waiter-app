import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [],
};

export const restaurantsSlice = createSlice({
  name: "restaurants",
  initialState,
  reducers: {
    setRestaurants: (state, action) => {
      state.items = [...action.payload];
    },
  },
});

// Action creators are generated for each case reducer function
export const { setRestaurants } = restaurantsSlice.actions;

export const getRestaurants = (state) => state.restaurants.items;

export default restaurantsSlice.reducer;
