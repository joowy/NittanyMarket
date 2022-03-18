import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import AuthService from "../services/user.service";

const user = JSON.parse(localStorage.getItem("user"));
export const register = createAsyncThunk(
  "auth/register",
  //@ts-ignore
  async ({ email, password }, thunkAPI) => {
    try {
      const response = await AuthService.register(email, password);

      return response.data;
    } catch (error) {
      // @ts-ignore
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue();
    }
  }
);
export const login = createAsyncThunk(
  "auth/login",

  // @ts-ignore
  async ({ email, password }, thunkAPI) => {
    try {
      const data = await AuthService.login(email, password);
      return { user: data };
    } catch (error) {
      // @ts-ignore
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue();
    }
  }
);
export const logout = createAsyncThunk("auth/logout", async () => {
  await AuthService.logout();
});
const initialState = user
  ? { isLoggedIn: true, user }
  : { isLoggedIn: false, user: null };
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // @ts-ignore
    builder.addCase(register.fulfilled, (state, action) => {
      state.isLoggedIn = false;
    });
    // @ts-ignore
    builder.addCase(register.rejected, (state, action) => {
      state.isLoggedIn = false;
    });
    builder.addCase(login.fulfilled, (state, action) => {
      state.isLoggedIn = true;
      state.user = action.payload.user;
    });
    // @ts-ignore
    builder.addCase(login.rejected, (state, action) => {
      state.isLoggedIn = false;
      state.user = null;
    });
    // @ts-ignore
    builder.addCase(logout.fulfilled, (state, action) => {
      state.isLoggedIn = false;
      state.user = null;
    });
  },
});
const { reducer } = authSlice;
export default reducer;
