import { NotFound404 } from "pages/NotFound404";
import { ProductsPage } from "pages/ProductsPage";
import { ProfilePage } from "pages/ProfilePage";
import { Register } from "pages/RegisterPage";
import React from "react";
import { Navigate } from "react-router-dom";
import { MainLayout } from "./layouts/MainLayout";
import { Login } from "./pages/Login";

export const routes = [
  {
    path: "/",
    element: <MainLayout />,
    children: [
      { path: "/login", element: <Login /> },
      { path: "/register", element: <Register /> },
      { path: "/profile", element: <ProfilePage /> },
      { path: "/products", element: <ProductsPage /> },
      { path: "/404", element: <NotFound404 /> },
      { path: "*", element: <Navigate to="/404" /> },
    ],
  },
];
