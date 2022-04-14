import { Box, Divider, Grid, Stack, Typography } from "@mui/material";
import { ListProduct } from "components/product/ListProduct";
import { ProductCard } from "components/product/ProductCard";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { axiosClient as axios } from "../api/axios.config";

export const CreateProductListingPage = () => {
  const [categoriesList, setCategoriesList] = useState();
  const [productList, setProductList] = useState();

  const { userData } = useSelector((state) => state.auth);

  useEffect(() => {
    const getCategoriesList = async () => {
      let categoriesListRes = await axios.get(
        "product/product_categories?flat=True"
      );
      setCategoriesList(categoriesListRes.data);
    };
    const getUserListedProducts = async () => {
      let userListedProducts = await axios.get(
        `product/${userData.user.email}`
      );
      setProductList(userListedProducts.data);
    };
    getUserListedProducts();
    getCategoriesList();
  }, [userData.user.email]);

  return (
    <Stack
      spacing={2}
      alignItems="center"
      justifyContent="center"
      sx={{ width: "80%" }}
    >
      {categoriesList ? (
        <ListProduct categoriesList={categoriesList} />
      ) : (
        <div>Loading</div>
      )}
      <Grid container spacing={2}>
        <Grid item xs={12} sm={12}>
          <Typography component="h1" variant="h5">
            Your Products
          </Typography>
          <Divider variant="fullWidth" />

          <Box sx={{ marginInline: 10, display: "flex" }}>
            <Grid container justifyContent="center" alignItems="center">
              {productList?.length ? (
                productList.map((listing) => {
                  console.log(listing);
                  return (
                    <ProductCard
                      key={listing.listing_id + listing.seller_email}
                      title={listing.title}
                      product_name={listing.product_name}
                      seller_email={listing.seller_email}
                      product_active_start={listing.product_active_start}
                      product_active_end={listing.product_active_end}
                      product_description={listing.product_description}
                      listing_id={listing.listing_id}
                      category_relationship={listing.category_relationship}
                      quantity={listing.quantity}
                      category={listing.category}
                      price={listing.price}
                      rating={listing.rating}
                      mode={"list"}
                    />
                  );
                })
              ) : (
                <>No products </>
              )}
            </Grid>
          </Box>
        </Grid>
      </Grid>
    </Stack>
  );
};
