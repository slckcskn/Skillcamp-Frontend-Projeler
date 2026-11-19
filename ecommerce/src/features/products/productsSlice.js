import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchProducts = createAsyncThunk(
  "products/fetchProducts",
  async () => {
    const res = await axios(`${import.meta.env.VITE_BASE_URL}/products`);

    if (!Array.isArray(res.data)) {
      throw new Error("Ürün API yanıtı bir ürün listesi içermiyor.");
    }

    console.log(res.data)

    return res.data
  },
);

const productsSlice = createSlice({
  name: "product",
  initialState: {
    items: [],
    status: "idle",
    error: null,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.items = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.error = action.error.message;
        state.status = "failed";
      });
  },
});

export default productsSlice.reducer;