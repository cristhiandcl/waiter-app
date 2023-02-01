import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  selected: {},
};

export const restaurantSlice = createSlice({
  name: "restaurant",
  initialState,
  reducers: {
    setRestaurant: (state, action) => {
      state.selected = { ...action.payload };
    },
  },
});

// Action creators are generated for each case reducer function
export const { setRestaurant } = restaurantSlice.actions;

export const getRestaurant = (state) => state.restaurant.selected;

export default restaurantSlice.reducer;
