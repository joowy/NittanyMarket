import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { axiosClient as axios } from "../api/axios.config";

export const getCart = createAsyncThunk(
  "GetCart",
  async (userEmail, thunkAPI) => {
    try {
      const response = await axios.get(`/cart/${userEmail}`);

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
export const removeFromCart = createAsyncThunk(
  "removeFromCart",
  async (
    { buyer_email, product_listing_email, product_listing_id },
    thunkAPI
  ) => {
    try {
      const response = await axios.post(`/cart/delete`, {
        buyer_email: buyer_email,
        product_listing_email: product_listing_email,
        product_listing_id: product_listing_id,
      });
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

export const placeOrder = createAsyncThunk(
  "placeOrder",

  async (buyer_email, thunkAPI) => {}
);

const cartData = {
  loading: true,
  error: null,
  data: null,
  total: 0,
};
const initialState = cartData;

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    setTotal(state) {
      let cost = 0;
      for (const cartItem of state.data) {
        cost += cartItem.cart_quantity * cartItem.price;
      }
      state.total = cost;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getCart.pending, (state, action) => {
      state.loading = true;

      state.data = null;
    });
    builder.addCase(getCart.fulfilled, (state, action) => {
      state.data = action.payload;

      state.loading = false;
    });
    builder.addCase(getCart.rejected, (state, action) => {
      state.error = "failed to get products";
      state.loading = false;
      state.error = action.payload;
    });
  },
});
export const { reducer, actions } = cartSlice;
export default reducer;
