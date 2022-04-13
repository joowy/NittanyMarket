import MenuIcon from "@mui/icons-material/Menu";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { AppBar, Box, IconButton, styled, Typography } from "@mui/material";
import Badge from "@mui/material/Badge";
import { SideBar } from "components/sideBar/SideBar";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { LoginButton } from "./LoginButton";
import { UserButton } from "./UserButton";
export const TopAppBar = () => {
  const [sideBarOpen, setSideBarOpen] = useState(false);

  const { isLoggedIn } = useSelector((state) => state.auth);
  const { data } = useSelector((state) => state.categoryHierarchy);
  const { data: cartData } = useSelector((state) => state.cart);

  //   https://mui.com/material-ui/react-badge/
  const StyledBadge = styled(Badge)(({ theme }) => ({
    "& .MuiBadge-badge": {
      right: -3,
      top: 13,
      border: `2px solid ${theme.palette.background.paper}`,
      padding: "0 4px",
    },
  }));

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
        <IconButton sx={{ color: "white" }} onClick={toggleDrawer()}>
          <MenuIcon />
        </IconButton>
        <IconButton
          href="/login"
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
          >
            Nittany Market
          </Typography>
        </IconButton>
        <Box sx={{ flexGrow: 1 }} />
        {isLoggedIn ? (
          <Box mr={3}>
            <UserButton />
            <IconButton href="/cart" aria-label="cart">
              <StyledBadge
                badgeContent={cartData?.length}
                sx={{ color: "white" }}
              >
                <ShoppingCartIcon />
              </StyledBadge>
            </IconButton>
          </Box>
        ) : (
          <LoginButton />
        )}
        <SideBar
          sideBarOpen={sideBarOpen}
          toggleDrawer={toggleDrawer}
          data={data}
          setSideBarOpen={setSideBarOpen}
        />
      </Box>
    </AppBar>
  );
};
