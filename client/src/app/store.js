import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../slices/auth";
import profileDataReducer from "../slices/userProfile";

const reducer = {
  auth: authReducer,
  profile: profileDataReducer,
};
const store = configureStore({
  reducer: reducer,
  devTools: true,
});
export default store;
