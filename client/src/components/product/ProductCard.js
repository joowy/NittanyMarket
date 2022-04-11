import { Button, CardActions } from "@mui/material";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import * as React from "react";
import { axiosClient as axios } from "../../api/axios.config";
import { grey } from "@mui/material/colors";
import { useEffect, useState } from "react";

export const ProductCard = ({
  title,
  product_name,
  seller_email,
  product_active_start,
  product_active_end,
  product_description,
  listing_id,
  category_relationship,
  quantity,
  category,
  price,
  mode,
}) => {
  const [listStatus, setListStatus] = useState(!!product_active_start);
  const changeListingStatus = async () => {
    const response = await axios.post("product/ChangeListingStatus", {
      email: seller_email,
      listing_id: listing_id,
    });
    console.log(response.data);
    setListStatus(!listStatus);
  };

  return (
    <Card
      sx={{
        maxWidth: 300,
        margin: 1,
        backgroundColor: listStatus ? grey[300] : grey[50],
      }}
    >
      <CardMedia
        component="img"
        height="140"
        image="https://d3a1v57rabk2hm.cloudfront.net/callnumber/betterman_mobile-copy-0/images/product_placeholder.jpg?ts=1581594912&host=call-number.cratejoy.com"
        alt="product"
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {title}
        </Typography>
        <Typography gutterBottom variant="body2" color="text.secondary">
          Name: {product_name}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          ${price}, quantity: {quantity}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Seller: {seller_email}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Category: {category}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Description: {product_description}
        </Typography>
        {product_active_start ? (
          <Typography variant="body2" color="text.secondary">
            Listed on : {product_active_start}
          </Typography>
        ) : null}
      </CardContent>
      <CardActions>
        {mode === "list" ? (
          listStatus ? (
            <Button
              size="small"
              color="info"
              variant="outlined"
              onClick={changeListingStatus}
            >
              list
            </Button>
          ) : (
            <Button
              size="small"
              color="warning"
              variant="outlined"
              onClick={changeListingStatus}
            >
              delist
            </Button>
          )
        ) : (
          <Button size="small">Buy</Button>
        )}
      </CardActions>
    </Card>
  );
};
