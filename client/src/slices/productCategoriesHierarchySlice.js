import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { axiosClient as axios } from "../api/axios.config";

export const GetCategoryHierarchy = createAsyncThunk(
  "GetCategoryHierarchy",
  async (thunkAPI) => {
    try {
      const response = await axios.get(`/product/product_categories`);

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

const categoryHierarchyData = {
  loading: true,
  error: null,
  data: null,
};
const initialState = categoryHierarchyData;

const categoryHierarchySlice = createSlice({
  name: "categoryHierarchy",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(GetCategoryHierarchy.pending, (state, action) => {
      state.loading = true;
      state.data = null;
    });
    builder.addCase(GetCategoryHierarchy.fulfilled, (state, action) => {
      state.data = action.payload;
      state.loading = false;
    });
    builder.addCase(GetCategoryHierarchy.rejected, (state, action) => {
      state.error = "failed to get category hierarchy";
      state.loading = false;
      //   state.error = action.payload.data;
    });
  },
});
const { reducer } = categoryHierarchySlice;
export default reducer;
