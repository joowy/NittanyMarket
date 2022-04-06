import { Box, CssBaseline, Grid } from "@mui/material";
import { TopAppBar } from "components/topNavBar/TopAppBar";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Outlet } from "react-router-dom";
import { GetCategoryHierarchy } from "slices/productCategoriesHierarchySlice";
import { GetProfileData } from "slices/userProfileSlice";

export const MainLayout = () => {
  const dispatch = useDispatch();
  const { userData } = useSelector(
    (state) =>
      //@ts-ignore
      state.auth
  );

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
  }, [dispatch]);

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
