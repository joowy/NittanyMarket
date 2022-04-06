import {
  Autocomplete,
  Divider,
  Grid,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import { ListProduct } from "components/product/ListProduct";
import React from "react";

export const ListProductPage = () => {
  return (
    <Stack
      width={"100%"}
      spacing={2}
      alignItems="center"
      justifyContent="center"
    >
      <ListProduct />
      <Grid container spacing={2}>
        <Grid item xs={12} sm={12}>
          <Typography component="h1" variant="h5">
            Your Listed Products
          </Typography>
          <Divider variant="fullWidth" />
        </Grid>
      </Grid>
    </Stack>
  );
};
