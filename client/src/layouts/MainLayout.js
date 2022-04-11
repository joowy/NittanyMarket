import { Box, Container, CssBaseline, Grid, Typography } from "@mui/material";
import { TopAppBar } from "components/topNavBar/TopAppBar";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Outlet } from "react-router-dom";
import { GetCategoryHierarchy } from "slices/productCategoriesHierarchySlice";
import { GetProfileData } from "slices/userProfileSlice";
function Copyright() {
  return (
    <Typography variant="body2" color="text.secondary">
      {"Copyright © "}

      {new Date().getFullYear()}
    </Typography>
  );
}
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
      </Box>
      <Box sx={{ display: "block", height: "70px", width: "100%" }} />
      <Box
        component="footer"
        sx={{
          py: 3,
          px: 2,
          mt: "auto",
          backgroundColor: (theme) =>
            theme.palette.mode === "light"
              ? theme.palette.grey[200]
              : theme.palette.grey[800],
        }}
      >
        <Container maxWidth="sm">
          <Typography variant="body1">Nittany Market</Typography>
          <Copyright />
        </Container>
      </Box>
    </>
  );
};
