import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  saveToCart,
  getAllItemsFromCart,
  deleteFromCart,
  editCart,
  removeAll,
} from "../../../api/cart";

export const addToCart = createAsyncThunk(
  "cart/addToCart",
  async (productId) => {
    const { data } = await saveToCart(productId);
    return data;
  }
);

export const updateCart = createAsyncThunk("cart/updateCart", async (body) => {
  const { data } = await editCart(body);
  return data;
});

export const removeFromCart = createAsyncThunk(
  "cart/removeFromCart",
  async (id) => {
    const { data } = await deleteFromCart(id);
    return data;
  }
);

export const deleteAll = createAsyncThunk("cart/deleteAll", async () => {
  const { data } = await removeAll();
  return data;
});

export const fetchAllItmesFromCart = createAsyncThunk(
  "cart/fetchAllItemsFromCart",
  async () => {
    const { data } = await getAllItemsFromCart();
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
    builder.addCase(fetchAllItmesFromCart.fulfilled, (state, action) => {
      state.data = action.payload;
    });
    builder.addCase(removeFromCart.fulfilled, (state, action) => {
      state.data = action.payload;
    });
    builder.addCase(updateCart.fulfilled, (state, action) => {
      state.data = action.payload;
    });
  },
});

export default cartSlice.reducer;
