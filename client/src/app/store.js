import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../slices/authSlice";
import profileDataReducer from "../slices/userProfileSlice";
import categoryHierarchyReducer from "../slices/productCategoriesSlice";

const reducer = {
  auth: authReducer,
  profile: profileDataReducer,
  categoryHierarchy: categoryHierarchyReducer,
};
const store = configureStore({
  reducer: reducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),

  devTools: true,
});
export default store;
