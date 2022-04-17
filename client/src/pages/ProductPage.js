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
import { useParams } from "react-router-dom";

export const ProductPage = () => {
  let params = useParams();
  const [reviews, setReviews] = useState();
  const [canReview, setCanReviews] = useState();

  const [currentProduct, setCurrentProduct] = useState();
  const [selectedIndex, setSelectedIndex] = useState("");

  const handleChange = (event) => {
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
        `/reviews/${params.seller_email}/${params.listing_id}`
      );
      setReviews(reviews.data.reviews);
      setCanReviews(reviews.data.can_review);
    };
    getProduct();
    getReviews();
  }, [params]);

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
                onChange={handleChange}
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
            <Button fullWidth>
              <AddShoppingCartIcon />
              <Typography>Add to Cart</Typography>
            </Button>
          </>
        ) : null}
      </Stack>
      <Stack spacing={2}>
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

          <TextField sx={{ mt: 2, mb: 2 }} />
          <Button
            variant="contained"
            color="primary"
            type="submit"
            disabled={!canReview}
          >
            {canReview ? "Submit review" : "Buy to Review"}
          </Button>
        </FormControl>
      </Stack>
    </Stack>
  );
};
