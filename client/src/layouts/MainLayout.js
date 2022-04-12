import { Box, Container, CssBaseline, Grid, Typography } from "@mui/material";
import { Footer } from "components/footer/Footer";
import { TopAppBar } from "components/topNavBar/TopAppBar";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Outlet } from "react-router-dom";
import { GetCategoryHierarchy } from "slices/productCategoriesHierarchySlice";
import { GetProfileData } from "slices/userProfileSlice";

export const MainLayout = () => {
  const dispatch = useDispatch();
  const { userData } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(GetCategoryHierarchy())
      .unwrap()
      .catch((e) => {
        alert(e);
      });
    if (userData) {
      dispatch(GetProfileData(userData.user.email))
        .unwrap()
        .catch((e) => {
          alert(e);
        });
    }
  }, [dispatch, userData]);

  return (
    <>
      <CssBaseline />
      <TopAppBar />
      <Box sx={{ display: "block", height: "70px", width: "100%" }} />
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          minHeight: "95vh",
          marginInline: 10,
        }}
      >
        <Grid container justifyContent="center" alignItems="center">
          <Outlet />
        </Grid>
        <Box sx={{ display: "block", height: "70px", width: "100%" }} />
      </Box>
      <Footer />
    </>
  );
};
