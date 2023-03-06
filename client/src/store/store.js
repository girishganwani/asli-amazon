import { configureStore } from "@reduxjs/toolkit";
import authSlice from "../components/Auth/redux/authSlice";
import categorySlice from "../components/Admin/redux/categorySlice";

export const store = configureStore({
  reducer: {
    auth: authSlice,
    category: categorySlice,
  },
});
