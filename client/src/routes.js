import { Register } from "pages/register";
import React from "react";
import { MainLayout } from "./layouts/MainLayout";
import { Login } from "./pages/Login";

export const routes = [
  {
    path: "/",
    element: <MainLayout />,
    children: [
      { path: "/login", element: <Login /> },
      { path: "/register", element: <Register /> },
      // { path: "404", element: <NotFound404 /> },
      //   { path: "*", element: <Navigate to="/" /> },
    ],
  },
];
