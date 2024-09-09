import { configureStore } from '@reduxjs/toolkit';
import productReducer from "../features/product/ProductListSlice";

export const store = configureStore({
  reducer: {
    product: productReducer,
  },
});
