import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { saveToCart } from "../../../api/cart";

export const addToCart = createAsyncThunk(
  "cart/addToCart",
  async (productId) => {
    const { data } = await saveToCart(productId);
    return data;
  }
);

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    data: [],
  },
  extraReducers: (builder) => {
    builder.addCase(addToCart.fulfilled, (state, action) => {
      state.data = action.payload;
    });
  },
});

export default cartSlice.reducer;
