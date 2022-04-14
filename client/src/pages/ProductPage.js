import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import {
  Button,
  FormControl,
  MenuItem,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { axiosClient as axios } from "api/axios.config";
import { ProductCard } from "components/product/ProductCard";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export const ProductPage = () => {
  let params = useParams();
  let [currentProduct, setCurrentProduct] = useState();
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
    // const getReviews = async () =>{
    //     const reviews = await axios.get()
    // }
    getProduct();
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
      xdxddadsd
    </Stack>
  );
};
