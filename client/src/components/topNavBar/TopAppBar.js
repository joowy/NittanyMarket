import MenuIcon from "@mui/icons-material/Menu";
import { AppBar, Box, IconButton, Typography } from "@mui/material";
import { SideBar } from "components/sideBar/SideBar";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { LoginButton } from "./LoginButton";
import { UserButton } from "./UserButton";
import { useDispatch, useSelector } from "react-redux";
import { GetCategoryHierarchy } from "slices/productCategoriesSlice";
export const TopAppBar = () => {
  // @ts-ignore
  const { isLoggedIn } = useSelector((state) => state.auth);
  const [sideBarOpen, setSideBarOpen] = useState(false);
  const dispatch = useDispatch();
  //   dispatch(GetCategoryHierarchy());
  const { data } = useSelector((state) => state.categoryHierarchy);
  //   console.log(data);
  useEffect(() => {
    dispatch(GetCategoryHierarchy())
      .unwrap()
      .catch((e) => {
        alert(e);
      });
  }, []);
  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event &&
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setSideBarOpen(!sideBarOpen);
  };
  return (
    <AppBar>
      <Box display={"flex"}>
        <IconButton sx={{ color: "white" }} onClick={toggleDrawer(true)}>
          <MenuIcon />
        </IconButton>
        <IconButton
          aria-label="home-button"
          sx={[
            {
              "&:hover": {
                color: "inherit",
                backgroundColor: "inherit ",
              },
            },
            { backgroundColor: "transparent", marginInline: 1 },
          ]}
        >
          <Typography
            color={"white"}
            sx={{
              fontSize: 20,
              marginInline: 1,
              fontWeight: "bold",
              textDecoration: "none",
            }}
            component={Link}
            to="/"
          >
            Nittany Market
          </Typography>
        </IconButton>
        <Box sx={{ flexGrow: 1 }} />
        {isLoggedIn ? <UserButton /> : <LoginButton />}
        <SideBar
          sideBarOpen={sideBarOpen}
          toggleDrawer={toggleDrawer}
          data={data}
        />
      </Box>
    </AppBar>
  );
};
