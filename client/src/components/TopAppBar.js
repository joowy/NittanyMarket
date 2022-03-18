import { AppBar, Box, IconButton, Typography } from "@mui/material";
import { orange } from "@mui/material/colors";
import { Login } from "pages/Login";
import React from "react";

export const TopAppBar = () => {
  return (
    <AppBar>
      <Box>
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
            sx={{ fontSize: 20, marginInline: 1, fontWeight: "bold" }}
          >
            Nittany Market
          </Typography>
        </IconButton>

        <Box sx={{ flexGrow: 1 }} />
      </Box>
    </AppBar>
  );
};
