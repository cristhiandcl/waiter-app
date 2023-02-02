import { configureStore } from "@reduxjs/toolkit";
import basketReducer from "./features/basketSlice";
import restaurantReducer from "./features/restaurantSlice";
import tipsReducer from "./features/tipsSlice";
import ordersReducer from "./features/ordersSlice";

export const store = configureStore({
  reducer: {
    basket: basketReducer,
    restaurant: restaurantReducer,
    tips: tipsReducer,
    orders: ordersReducer,
  },
});
