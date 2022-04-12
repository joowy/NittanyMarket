import RemoveShoppingCartIcon from "@mui/icons-material/RemoveShoppingCart";
import { Divider, Grid, IconButton, Stack, Typography } from "@mui/material";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { removeFromCart } from "../../slices/cartSlice";
export const ReviewPurchase = () => {
  const dispatch = useDispatch();
  const { data } = useSelector((state) => state.cart);

  const handleRemoveFromCart = (
    buyer_email,
    product_listing_email,
    product_listing_id
  ) => {
    dispatch(
      removeFromCart({ buyer_email, product_listing_email, product_listing_id })
    );
    window.location.reload();
  };

  let cost = 0;
  if (data) {
    for (const cartItem of data) {
      cost += cartItem.cart_quantity * cartItem.price;
    }
  }
  return (
    <Stack
      spacing={2}
      alignItems="center"
      justifyContent="center"
      sx={{ width: "80%" }}
    >
      <Grid container spacing={2}>
        <Grid item xs={12} sm={12}>
          <Typography component="h1" variant="h5">
            Shopping Cart
          </Typography>
          <Divider variant="fullWidth" />
        </Grid>
        <Grid item xs={12} sm={4} component="h5">
          Product Name
        </Grid>
        <Grid item xs={12} sm={2} component="h5">
          Price
        </Grid>
        <Grid item xs={12} sm={2} component="h5">
          Quantity
        </Grid>
        <Grid item xs={12} sm={3} component="h5">
          Total
        </Grid>

        {data?.map((cartItem, index) => {
          return (
            <React.Fragment key={cartItem.buyer_email + cartItem.listing_id}>
              <Grid item xs={12} sm={4}>
                {cartItem.title}
                <Typography variant="body2">{`sold by ${cartItem.seller_email}`}</Typography>
              </Grid>
              <Grid item xs={12} sm={2}>
                ${cartItem.price}
              </Grid>
              <Grid item xs={12} sm={2}>
                {cartItem.cart_quantity}
              </Grid>
              <Grid item xs={12} sm={3}>
                ${cartItem.price * cartItem.cart_quantity}
              </Grid>
              <Grid item xs={12} sm={1} component="h5">
                <IconButton
                  onClick={() =>
                    handleRemoveFromCart(
                      cartItem.buyer_email,
                      cartItem.seller_email,
                      cartItem.listing_id
                    )
                  }
                >
                  <RemoveShoppingCartIcon />
                  <Typography variant={"body2"}>Remove </Typography>
                </IconButton>
              </Grid>
            </React.Fragment>
          );
        })}
        <Grid item xs={12} sm={8} component="h5">
          Total Due
        </Grid>
        <Grid item xs={12} sm={3}>
          ${cost}
        </Grid>
      </Grid>
    </Stack>
  );
};
