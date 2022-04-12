import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../slices/authSlice";
import profileDataReducer from "../slices/userProfileSlice";
import categoryHierarchyReducer from "../slices/productCategoriesHierarchySlice";
import productReducer from "../slices/productSlice";
import cartReducer from "../slices/cartSlice";

const reducer = {
  auth: authReducer,
  profile: profileDataReducer,
  categoryHierarchy: categoryHierarchyReducer,
  product: productReducer,
  cart: cartReducer,
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
