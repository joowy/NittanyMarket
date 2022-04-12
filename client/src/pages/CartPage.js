import {
  Typography,
  Grid,
  List,
  ListItem,
  ListItemText,
  Stack,
} from "@mui/material";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCart } from "slices/cartSlice";

export const CartPage = () => {
  const dispatch = useDispatch();
  const { userData } = useSelector(
    (state) =>
      //@ts-ignore
      state.auth
  );
  useEffect(() => {
    dispatch(getCart(userData.user.email));
  }, [userData.user.email, dispatch]);

  const { data, loading } = useSelector((state) => state.cart);
  console.log(data);

  return (
    <Stack>
      <div>Checkout</div>
      <div>Order Summary </div> 
    </Stack>
  );
};
