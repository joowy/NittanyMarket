import { Box, CssBaseline } from "@mui/material";
import { TopAppBar } from "components/TopAppBar";
import React from "react";
import { Outlet } from "react-router-dom";

// import { Header } from "../../components/index";

export const MainLayout = () => {
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
