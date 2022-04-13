import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import { Button, CardActions, IconButton, Menu, MenuItem } from "@mui/material";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import { grey } from "@mui/material/colors";
import Typography from "@mui/material/Typography";
import * as React from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { axiosClient as axios } from "../../api/axios.config";

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
  user_email,
}) => {
  const [listStatus, setListStatus] = useState(!!product_active_end);
  let navigate = useNavigate();
  const changeListingStatus = async () => {
    await axios.post("product/ChangeListingStatus", {
      email: seller_email,
      listing_id: listing_id,
    });
    setListStatus(!listStatus);
  };

  const handleAddToCart = () => {
    axios.post(`cart`, {
      buyer_email: user_email,
      product_listing_email: seller_email,
      product_listing_id: listing_id,
      cart_quantity: 1,
    });
  };

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
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
      <CardContent
        onClick={() => {
          navigate(`/product/${seller_email}/${listing_id}`);
        }}
      >
        <Button style={{ textTransform: "none" }}>
          <Typography gutterBottom variant="h6" component="div">
            {title}
          </Typography>
        </Button>

        <Typography gutterBottom variant="body2" color="text.secondary">
          Name: {product_name}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          ${price}, quantity available: {quantity}
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
        ) : user_email ? (
          <>
            <IconButton>
              <AddShoppingCartIcon />
              <Typography variant={"body2"}>Add to Cart</Typography>
            </IconButton>
            <Menu
              id="long-menu"
              MenuListProps={{
                "aria-labelledby": "long-button",
              }}
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              PaperProps={{
                style: {
                  maxHeight: 10 * 4.5,
                  width: "20ch",
                },
              }}
            >
              <MenuItem>xxx</MenuItem>
            </Menu>
          </>
        ) : null}
      </CardActions>
    </Card>
  );
};
