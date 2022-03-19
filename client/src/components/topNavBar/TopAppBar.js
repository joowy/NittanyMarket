import { AppBar, Box, Button, IconButton, Typography } from "@mui/material";
import { orange } from "@mui/material/colors";
import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { theme } from "theme";
import { LoginButton } from "./LoginButton";
import { UserButton } from "./UserButton";
export const TopAppBar = () => {
  // @ts-ignore
  const { isLoggedIn } = useSelector((state) => state.auth);
  return (
    <AppBar>
      <Box display={"flex"}>
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
      </Box>
    </AppBar>
  );
};
