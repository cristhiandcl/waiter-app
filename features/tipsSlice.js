import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [],
};

export const tipsSlice = createSlice({
  name: "tips",
  initialState,
  reducers: {
    setTips: (state, action) => {
      state.items = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setTips } = tipsSlice.actions;

export const getTips = (state) => state.tips.items;

export default tipsSlice.reducer;
