import { configureStore } from "@reduxjs/toolkit";
import authSlice from "../components/Auth/redux/authSlice";
import categorySlice from "../components/Admin/redux/categorySlice";
import productSlice from "../components/Admin/redux/productSlice";
import productsByCategorySlice from "../components/Users/redux/productsByCategorySlice";
import cartSlice from "../components/Users/redux/cartSlice";

export const store = configureStore({
  reducer: {
    auth: authSlice,
    category: categorySlice,
    product: productSlice,
    productsByCategory: productsByCategorySlice,
    cart: cartSlice,
  },
});
