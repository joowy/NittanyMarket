import { Box, CssBaseline } from "@mui/material";
import { TopAppBar } from "components/topNavBar/TopAppBar";
import React from "react";
import { Outlet } from "react-router-dom";

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
