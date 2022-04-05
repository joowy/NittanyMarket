import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { axiosClient as axios } from "../api/axios.config";

export const GetCategoryProducts = createAsyncThunk(
  "GetCategoryProducts",
  async (categoryName, thunkAPI) => {
    try {
      let response;
      if (categoryName) {
        response = await axios.get(`/product/category/${categoryName}`);
      } else {
        response = await axios.get(`/product/category`);
      }
      return response.data;
    } catch (error) {
      const message =
        (error.response && error.response.data && error.response.data.msg) ||
        error.msg ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

const productData = {
  loading: true,
  error: null,
  data: null,
};
const initialState = productData;

const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(GetCategoryProducts.pending, (state, action) => {
      state.loading = true;
      state.data = null;
    });
    builder.addCase(GetCategoryProducts.fulfilled, (state, action) => {
      state.data = action.payload;
      state.loading = false;
    });
    builder.addCase(GetCategoryProducts.rejected, (state, action) => {
      state.error = "failed to get products";
      state.loading = false;
      //   state.error = action.payload.data;
    });
  },
});
const { reducer } = productSlice;
export default reducer;
