import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  saveToWishList,
  deleteFromWishList,
  getAllItemsFromWishList,
} from "../../../api/wishList";

export const addToWishList = createAsyncThunk(
  "wishList/addToWishList",
  async (productId) => {
    const { data } = await saveToWishList(productId);
    return data;
  }
);

export const fetchAllItmesFromWishList = createAsyncThunk(
  "wishList/fetchAllItemsFromWishList",
  async () => {
    const { data } = await getAllItemsFromWishList();
    return data;
  }
);

export const removeFromWishList = createAsyncThunk(
  "wishList/removeFromWishList",
  async (id) => {
    const { data } = await deleteFromWishList(id);
    return data;
  }
);

const wishListSlice = createSlice({
  name: "wishList",
  initialState: {
    data: [],
  },
  extraReducers: (builder) => {
    builder.addCase(addToWishList.fulfilled, (state, action) => {
      state.data = action.payload;
    });
    builder.addCase(removeFromWishList.fulfilled, (state, action) => {
      state.data = action.payload;
    });
    builder.addCase(fetchAllItmesFromWishList.fulfilled, (state, action) => {
      state.data = action.payload;
    });
  },
});

export default wishListSlice.reducer;
