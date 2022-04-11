import { CartPage } from "pages/CartPage";
import { CreateProductListingPage } from "pages/CreateProductListingPage";
import { NotFound404 } from "pages/NotFound404";
import { ProductsPage } from "pages/ProductsPage";
import { ProfilePage } from "pages/ProfilePage";
import { Register } from "pages/RegisterPage";
import React from "react";
import { Navigate } from "react-router-dom";
import { MainLayout } from "./layouts/MainLayout";
import { Login } from "./pages/LoginPage";

export const routes = [
  {
    path: "/",
    element: <MainLayout />,
    children: [
      { path: "/", element: <Navigate to="/product/category/" /> },
      { path: "/login", element: <Login /> },
      { path: "/register", element: <Register /> },
      { path: "/profile", element: <ProfilePage /> },
      {
        path: "/product",
        // element: <Navigate to="/" />,
        children: [
          { path: "/product/category/:category", element: <ProductsPage /> },
          { path: "/product/category/", element: <ProductsPage /> },
        ],
      },
      { path: "/product/list/", element: <CreateProductListingPage /> },
      { path: "/cart", element: <CartPage /> },
      { path: "/404", element: <NotFound404 /> },
      { path: "*", element: <Navigate to="/404" /> },
    ],
  },
];
