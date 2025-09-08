import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./cart/cartSlice";
import categoryReducer from "./productCategories/categorySlice";

export const store = configureStore({
  reducer: {
    cart: cartReducer,
    categories: categoryReducer,
  },
});
