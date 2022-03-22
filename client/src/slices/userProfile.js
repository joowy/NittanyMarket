import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { axiosClient as axios } from "../api/axios.config";

const userCredential = JSON.parse(localStorage.getItem("user_credential"));

export const GetProfileData = createAsyncThunk(
  "profileData",
  async ({ email }, thunkAPI) => {
    try {
      const response = await axios.get(`/users/${email}`);

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
const userProfileData = {
  loading: true,
  error: null,
  profileData: {
    email: null,
    first_name: null,
    last_name: null,
    gender: null,
    age: null,
    home_address: null,
    billing_address: null,
    last_four_credit_card: null,
  },
};
const initialState = userProfileData;

const userProfileSlice = createSlice({
  name: "userProfile",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(GetProfileData.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(GetProfileData.fulfilled, (state, action) => {
      state.profileData = action.payload.data;
    });
    builder.addCase(GetProfileData.rejected, (state, action) => {
      state.error = "failed to get profile data";
      //   state.error = action.payload.data;
    });
  },
});
const { reducer } = userProfileSlice;
export default reducer;
