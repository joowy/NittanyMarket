import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import AuthService from "../services/user.service";
import { axiosClient as axios } from "../api/axios.config";

const userData = JSON.parse(localStorage.getItem("user"));
export const register = createAsyncThunk(
  "auth/register",
  async ({ age, email, first_name, gender, lastName, password }, thunkAPI) => {
    console.log(age);
    try {
      const response = await axios.post("auth/register", {
        age,
        email,
        first_name,
        gender,
        lastName,
        password,
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
export const login = createAsyncThunk(
  "auth/login",
  async ({ email, password }, thunkAPI) => {
    try {
      const data = await AuthService.login(email, password);
      return { userData: data };
    } catch (error) {
      const message =
        (error.response && error.response.data && error.response.data.msg) ||
        error.msg ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);
export const logout = createAsyncThunk("auth/logout", async () => {
  await AuthService.logout();
});
const initialState = userData
  ? { isLoggedIn: true, userData }
  : { isLoggedIn: false, userData: null };
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(register.fulfilled, (state, action) => {
      state.isLoggedIn = false;
    });
    builder.addCase(register.rejected, (state, action) => {
      state.isLoggedIn = false;
    });
    builder.addCase(login.fulfilled, (state, action) => {
      state.isLoggedIn = true;
      console.log(action.payload);
      state.userData = action.payload.userData;
    });
    builder.addCase(login.rejected, (state, action) => {
      state.isLoggedIn = false;
      state.userData = null;
    });
    builder.addCase(logout.fulfilled, (state, action) => {
      state.isLoggedIn = false;
      state.userData = null;
    });
  },
});
const { reducer } = authSlice;
export default reducer;
