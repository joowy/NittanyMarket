import { AppBar, Box, Button, IconButton, Typography } from "@mui/material";
import { orange } from "@mui/material/colors";
import { Login } from "pages/Login";
import React from "react";
import { Link } from "react-router-dom";

export const TopAppBar = () => {
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
        <Button
          color="info"
          variant="outlined"
          sx={{ marginInline: 1, fontWeight: "bold", margin: 1 }}
          component={Link}
          to="/login"
        >
          Log In
        </Button>
      </Box>
    </AppBar>
  );
};
