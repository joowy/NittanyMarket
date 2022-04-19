// @ts-nocheck
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import {
  Box,
  Button,
  FormControl,
  MenuItem,
  Rating,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { axiosClient as axios } from "api/axios.config";
import { ProductCard } from "components/product/ProductCard";
import { ReviewCard } from "components/reviews/ReviewCard";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

export const ProductPage = () => {
  let params = useParams();

  const [reviews, setReviews] = useState();
  const [canReview, setCanReviews] = useState();
  const [sellerReviewValue, setSellerReviewValue] = React.useState(2);

  const [currentProduct, setCurrentProduct] = useState();
  const [selectedIndex, setSelectedIndex] = useState(1);
  const [reviewBody, setReviewBody] = useState("");

  const { userData } = useSelector((state) => state.auth);
  const handleChangeQuantity = (event) => {
    setSelectedIndex(event.target.value);
  };
  let options = [1, 2];
  useEffect(() => {
    const getProduct = async () => {
      const product = await axios.get(
        `/product/${params.seller_email}/${params.listing_id}`
      );
      setCurrentProduct(product.data);
    };
    const getReviews = async () => {
      const reviews = await axios.get(
        `/reviews/${params.seller_email}/${params.listing_id}?user=${userData.user.email}`
      );
      setReviews(reviews.data.reviews);
      setCanReviews(reviews.data.can_review);
    };
    getProduct();
    getReviews();
  }, [params, userData]);
  const handleAddToCart = async () => {
    await axios.post(`/cart/`, {
      buyer_email: userData.user.email,
      product_listing_email: currentProduct.seller_email,
      product_listing_id: currentProduct.listing_id,
      cart_quantity: selectedIndex,
    });
  };
  const handleChangeReview = (event) => {
    setReviewBody(event.target.value);
  };
  const handleSubmitReview = async () => {
    if (reviewBody === "") {
      alert("review should not be empty");
    } else {
      await axios.post(`/reviews/${params.seller_email}/${params.listing_id}`, {
        buyer_email: userData.user.email,
        review_desc: reviewBody,
      });

      await axios.post(`/reviews/${params.seller_email}/${params.listing_id}`, {
        buyer_email: userData.user.email,
        review_desc: reviewBody,
      });
    }
  };
  if (currentProduct) {
    options = Array.from({ length: currentProduct.quantity }, (_, i) => i + 1);
  }
  return (
    <Stack direction={"row"} spacing={5}>
      <Stack spacing={2}>
        {currentProduct ? (
          <>
            <ProductCard
              title={currentProduct.title}
              product_name={currentProduct.product_name}
              seller_email={currentProduct.seller_email}
              product_active_start={currentProduct.product_active_start}
              product_active_end={currentProduct.product_active_end}
              product_description={currentProduct.product_description}
              listing_id={currentProduct.listing_id}
              category_relationship={currentProduct.category_relationship}
              quantity={currentProduct.quantity}
              category={currentProduct.category}
              price={currentProduct.price}
              mode={undefined}
              rating={currentProduct.seller_rating}
              user_email={undefined}
            />

            <FormControl fullWidth variant="standard">
              <TextField
                id="standard-select-currency"
                label="Quantity"
                value={selectedIndex}
                onChange={handleChangeQuantity}
                fullWidth
                variant="standard"
                select
              >
                {options.map((option) => (
                  <MenuItem key={option} value={option}>
                    {option}
                  </MenuItem>
                ))}
              </TextField>
            </FormControl>
            <Button fullWidth onClick={handleAddToCart}>
              <AddShoppingCartIcon />
              <Typography>Add to Cart</Typography>
            </Button>
          </>
        ) : null}
      </Stack>
      <Stack spacing={2}>
        <Typography>Reviews </Typography>
        {reviews?.length ? (
          reviews?.map((review, index) => {
            return (
              <ReviewCard
                review={review}
                buyer_email={review.buyer_email}
                seller_email={review.seller_email}
                review_desc={review.review_desc}
                key={index}
              />
            );
          })
        ) : (
          <Typography>No Review</Typography>
        )}
        <Box sx={{ flexGrow: 1 }} />
        <FormControl>
          <Typography component="legend">Write a Review</Typography>
          <Stack direction={"row"}>
            <Typography component="legend">Rate Seller: </Typography>
            <Rating
              name="simple-controlled"
              value={sellerReviewValue}
              disabled={!canReview}
              onChange={(event, newValue) => {
                setSellerReviewValue(newValue);
              }}
            />
          </Stack>
          <TextField
            sx={{ mt: 2, mb: 2 }}
            disabled={!canReview}
            value={reviewBody}
            onChange={handleChangeReview}
          />
          <Button
            variant="contained"
            color="primary"
            type="submit"
            disabled={!canReview}
            onClick={handleSubmitReview}
          >
            {canReview ? "Submit review" : "Buy to Review"}
          </Button>
        </FormControl>
      </Stack>
    </Stack>
  );
};
