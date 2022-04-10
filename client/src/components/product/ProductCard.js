import { Button, CardActions } from "@mui/material";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import * as React from "react";

export const ProductCard = ({
  title,
  product_name,
  seller_email,
  product_active_start,
  product_description,
  listing_id,
  category_relationship,
  quantity,
  category,
  price,
}) => {
  return (
    <Card sx={{ maxWidth: 300, margin: 1 }}>
      <CardMedia
        component="img"
        height="140"
        image="https://d3a1v57rabk2hm.cloudfront.net/callnumber/betterman_mobile-copy-0/images/product_placeholder.jpg?ts=1581594912&host=call-number.cratejoy.com"
        alt="product"
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {title} {product_name}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          ${price}, quantity: {quantity}
        </Typography>{" "}
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
            Listed at : {product_active_start}
          </Typography>
        ) : null}
      </CardContent>
      <CardActions>
        <Button size="small">Buy</Button>
      </CardActions>
    </Card>
  );
};
