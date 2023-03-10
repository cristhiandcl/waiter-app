import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [],
};

export const basketSlice = createSlice({
  name: "basket",
  initialState,
  reducers: {
    addToBasket: (state, action) => {
      state.items = [...state.items, action.payload];
    },
    removeFromBasket: (state, action) => {
      const toRemove = state.items.findIndex(
        (item) => item.id === action.payload
      );
      const mirror = [...state.items];
      mirror.splice(toRemove, 1);
      state.items = [...mirror];
    },
    emptyBasket: (state) => {
      state.items = [];
    },
    setBasket: (state, action) => {
      state.items = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { addToBasket, removeFromBasket, emptyBasket, setBasket } =
  basketSlice.actions;

export const getBasketItems = (state) => state.basket.items;

export default basketSlice.reducer;
