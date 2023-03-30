import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { checkout } from "../../../api/payment";

export const makePayment = createAsyncThunk(
  "payment/makePayment",
  async (body) => {
    const { data } = await checkout(body);
    return data;
  }
);

const paymentSlice = createSlice({
  name: "payment",
  initialState: {
    data: [],
  },
  extraReducers: (builder) => {
    builder.addCase(makePayment.fulfilled, (_, action) => {
      window.location = action.payload.url;
    });
  },
});

export default paymentSlice.reducer;
