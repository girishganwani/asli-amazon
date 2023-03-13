import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const getProductsByCategory = createAsyncThunk(
  "productsByCategory/getProductsByCategory",
  async (slug) => {
    const data = await fetchProductsByCategory(slug);
    return data;
  }
);

const productsByCategorySlice = createSlice({
  name: "productsByCategory",
  initialState: {
    data: [],
  },
  extraReducers: (builder) => {
    builder.addCase(getProductsByCategory.fulfilled, (state, action) => {
      state.data = action.payload;
    });
  },
});

export default productsByCategorySlice.reducer;
