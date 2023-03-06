import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  saveCategory,
  getCategories,
  removeCategory,
  editCategory,
} from "../../../api/category";

export const addCategory = createAsyncThunk(
  "category/addCategory",
  async (body) => {
    const { data } = await saveCategory(body);
    return data;
  }
);

export const updateCategory = createAsyncThunk(
  "category/updateCategory",
  async (body) => {
    const { data } = await editCategory(body);
    return data;
  }
);

export const deleteCategory = createAsyncThunk(
  "category/deleteCategory",
  async ({ id }) => {
    const { data } = await removeCategory({ id });
    return data;
  }
);

export const fetchCategories = createAsyncThunk(
  "category/fetchCategories",
  async () => {
    const { data } = await getCategories();
    return data;
  }
);

const categorySlice = createSlice({
  name: "category",
  initialState: {
    data: [],
  },
  extraReducers: (builder) => {
    builder.addCase(addCategory.fulfilled, (state, action) => {
      state.data = action.payload;
    });
    builder.addCase(fetchCategories.fulfilled, (state, action) => {
      state.data = action.payload;
    });
    builder.addCase(deleteCategory.fulfilled, (state, action) => {
      state.data = action.payload;
    });
    builder.addCase(updateCategory.fulfilled, (state, action) => {
      state.data = action.payload;
    });
  },
});

export default categorySlice.reducer;
