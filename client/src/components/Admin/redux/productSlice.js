import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  saveProduct,
  getProducts,
  removeProduct,
  updatingProduct,
} from "../../../api/product";

export const addProduct = createAsyncThunk(
  "product/addProduct",
  async (body) => {
    const { name, price, quantity, catId, image, isAvailable } = body;
    const productFormData = new FormData();
    productFormData.append("catId", catId);
    productFormData.append("name", name);
    productFormData.append("price", price);
    productFormData.append("quantity", quantity);
    productFormData.append("isAvailable", isAvailable);
    productFormData.append("image", image.data);

    const { data } = await saveProduct(productFormData);
    return data;
  }
);

export const updateProduct = createAsyncThunk(
  "products/updateProduct",
  async (body) => {
    const { id, name, price, quantity, catId, image, isAvailable } = body;
    const productFormData = new FormData();
    productFormData.append("catId", catId);
    productFormData.append("name", name);
    productFormData.append("price", price);
    productFormData.append("quantity", quantity);
    productFormData.append("isAvailable", isAvailable);
    productFormData.append("image", image.data);

    const { data } = await updatingProduct({ productFormData, id });
    return data;
  }
);

export const fetchProducts = createAsyncThunk(
  "product/fetchProducts",
  async () => {
    const { data } = await getProducts();
    return data;
  }
);

export const deleteProduct = createAsyncThunk(
  "product/deleteProduct",
  async (id) => {
    const { data } = await removeProduct(id);
    return data;
  }
);

const productSlice = createSlice({
  name: "product",
  initialState: {
    data: [],
  },
  extraReducers: (builder) => {
    builder.addCase(addProduct.fulfilled, (state, action) => {
      state.data = action.payload.data;
    });
    builder.addCase(fetchProducts.fulfilled, (state, action) => {
      state.data = action.payload.data;
    });
    builder.addCase(deleteProduct.fulfilled, (state, action) => {
      state.data = action.payload.data;
    });
    builder.addCase(updateProduct.fulfilled, (state, action) => {
      state.data = action.payload.data;
    });
  },
});

export default productSlice.reducer;
