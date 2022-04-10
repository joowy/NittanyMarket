import { Divider, Grid, Stack, Typography } from "@mui/material";
import { ListProduct } from "components/product/ListProduct";
import React, { useEffect, useState } from "react";
import { axiosClient as axios } from "../api/axios.config";

export const ListProductPage = () => {
  const [categoriesList, setCategoriesList] = useState();
  useEffect(() => {
    const getCategoriesList = async () => {
      let categoriesListRes = await axios.get(
        "product/product_categories?flat=True"
      );
      setCategoriesList(categoriesListRes.data);
    };
    getCategoriesList();
  }, []);

  return (
    <Stack
      width={"100%"}
      spacing={2}
      alignItems="center"
      justifyContent="center"
    >
      {categoriesList ? (
        <ListProduct categoriesList={categoriesList} />
      ) : (
        <div>Loading</div>
      )}{" "}
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
