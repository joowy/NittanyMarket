import { Box, CssBaseline, Grid } from "@mui/material";
import { TopAppBar } from "components/topNavBar/TopAppBar";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Outlet } from "react-router-dom";
import { GetCategoryHierarchy } from "slices/productCategoriesHierarchySlice";

export const MainLayout = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(GetCategoryHierarchy())
      .unwrap()
      .catch((e) => {
        alert(e);
      });
  }, []);
  return (
    <>
      <CssBaseline />
      <TopAppBar />
      <Box sx={{ display: "block", height: "70px", width: "100%" }} />
      <Box sx={{ marginInline: 10, display: "flex" }}>
        <Grid container justifyContent="center" alignItems="center">
          <Outlet />
        </Grid>
      </Box>
      <Box sx={{ display: "block", height: "70px", width: "100%" }} />
    </>
  );
};
