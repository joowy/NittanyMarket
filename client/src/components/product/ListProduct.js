import {
  Autocomplete,
  Button,
  Divider,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { axiosClient as axios } from "../../api/axios.config";

export const ListProduct = ({ categoriesList }) => {
  const { userData } = useSelector(
    (state) =>
      //@ts-ignore
      state.auth
  );
  const defaultValues = {
    email: userData.user.email,
    title: "",
    product_description: "",
    product_name: "",
    price: 0,
    quantity: 1,
    category: "",
  };
  const [autocompleteValue, setAutocompleteValue] = useState("Clothing");
  const [inputValue, setInputValue] = useState("");
  const [formValues, setFormValues] = useState(defaultValues);

  const handleSubmit = async (event) => {
    event.preventDefault();
    formValues["category"] = autocompleteValue;
    try {
      const response = await axios.post("product/list", formValues);
      alert(response.data.msg);
      window.location.reload();
    } catch (error) {
      const message =
        (error.response && error.response.data && error.response.data.msg) ||
        error.msg ||
        error.toString();
      console.log(message);
    }
  };
  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setFormValues({
      ...formValues,
      [name]: value,
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={12}>
          <Typography component="h1" variant="h5">
            Create Product Listing
          </Typography>
          <Divider variant="fullWidth" />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            id="product_title"
            name="title"
            required
            label="Title"
            type="text"
            value={formValues.title}
            onChange={handleInputChange}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="product_description"
            label="description"
            fullWidth
            name="product_description"
            type="text"
            value={formValues.product_description}
            onChange={handleInputChange}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <Autocomplete
            disablePortal
            fullWidth
            value={autocompleteValue}
            onChange={(event, newValue) => {
              setAutocompleteValue(newValue);
            }}
            inputValue={inputValue}
            onInputChange={(event, newInputValue) => {
              setInputValue(newInputValue);
            }}
            options={categoriesList}
            renderInput={(params) => (
              <TextField required {...params} label="Category" />
            )}
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="product_name"
            label="name"
            fullWidth
            name="product_name"
            type="text"
            value={formValues.product_name}
            onChange={handleInputChange}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="product_price"
            label="price"
            fullWidth
            name="price"
            type="number"
            value={formValues.price}
            onChange={handleInputChange}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="product_quantity"
            label="quantity"
            fullWidth
            name="quantity"
            type="number"
            value={formValues.quantity}
            onChange={handleInputChange}
          />
        </Grid>
        <Grid item>
          <Button variant="contained" color="primary" type="submit">
            List Product
          </Button>
        </Grid>
      </Grid>
    </form>
  );
};
