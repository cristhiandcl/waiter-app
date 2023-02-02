import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [],
};

export const splitsSlice = createSlice({
  name: "splits",
  initialState,
  reducers: {
    setSplits: (state, action) => {
      state.items = [...state.items, action.payload];
    },
    emptySplits: (state) => {
      state.items = [];
    },
  },
});

// Action creators are generated for each case reducer function
export const { setSplits, emptySplits } = splitsSlice.actions;

export const getSplits = (state) => state.splits.items;

export default splitsSlice.reducer;
