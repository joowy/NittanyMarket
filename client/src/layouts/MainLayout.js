import { Box, CssBaseline } from "@mui/material";
import { TopAppBar } from "components/topNavBar/TopAppBar";
import React from "react";
import { useSelector } from "react-redux";
import { Outlet } from "react-router-dom";

// import { Header } from "../../components/index";

export const MainLayout = () => {
  // @ts-ignore
  const { isLoggedIn } = useSelector((state) => state.auth);
  console.log(isLoggedIn, "mainlayout");

  return (
    <>
      <CssBaseline />
      <TopAppBar />
      <Box sx={{ display: "block", height: "70px", width: "100%" }} />
      <Box sx={{ marginInline: 11, display: "flex" }}>
        <Outlet />
      </Box>
    </>
  );
};
