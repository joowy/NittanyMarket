import { Button } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";

export const LoginButton = () => {
  return (
    <Button
      color="info"
      variant="outlined"
      sx={{ marginInline: 1, fontWeight: "bold", margin: 1 }}
      component={Link}
      to="/login"
    >
      Log In
    </Button>
  );
};
