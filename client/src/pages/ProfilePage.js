import {
  Box,
  Button,
  Divider,
  Grid,
  Link,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { GetProfileData } from "slices/userProfile";

export const ProfilePage = () => {
  const dispatch = useDispatch();

  const { userData, isLoggedIn } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(GetProfileData(userData.user.email))
      .unwrap()
      .catch((e) => {
        alert(e);
      });
  }, [dispatch, userData.user.email]);

  const { loading, error, profileData } = useSelector((state) => state.profile);

  if (!isLoggedIn) {
    alert("Must log in to see your profile");
    return <Navigate to="/" />;
  }

  return loading ? (
    <div>Loading...</div>
  ) : (
    <Stack
      component={"form"}
      spacing={2}
      alignItems="center"
      justifyContent="center"
      sx={{ width: "80%" }}
    >
      <Grid container spacing={2}>
        <Grid item xs={12} sm={12}>
          <Typography component="h1" variant="h5">
            Profile Information
          </Typography>
          <Divider variant="fullWidth" />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            defaultValue={profileData.first_name}
            name="first_name"
            required
            fullWidth
            id="firstName"
            label="First Name"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            defaultValue={profileData.last_name}
            fullWidth
            id="lastName"
            label="Last Name"
            name="lastName"
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            defaultValue={profileData.email}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            id="gender"
            label="Gender"
            name="gender"
            defaultValue={profileData.gender}
            fullWidth
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            id="age"
            label="Age"
            name="age"
            defaultValue={profileData.age}
            fullWidth
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            id="credit_card"
            label="Credit Card"
            name="credit_card"
            defaultValue={profileData.credit_card_last_four}
            fullWidth
          />
        </Grid>
        <Grid item xs={12} sm={12}>
          <Typography component="h1" variant="h5">
            Home Address
          </Typography>
          <Divider variant="fullWidth" />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            id="street"
            label="Street"
            name="street"
            defaultValue={
              profileData.home_address.street_num +
              " " +
              profileData.home_address.street_name
            }
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            id="city"
            label="City"
            name="city"
            defaultValue={profileData.home_address.city}
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            id="zip"
            label="Zip Code"
            name="zip"
            defaultValue={profileData.home_address.zipcode}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            id="state"
            label="State"
            name="state"
            defaultValue={profileData.home_address.state_id}
          />
        </Grid>

        <Grid item xs={12}>
          <TextField
            fullWidth
            id="country"
            label="Country"
            name="country"
            defaultValue={profileData.home_address.country_name}
          />
        </Grid>

        <Grid item xs={12} sm={12}>
          <Typography component="h1" variant="h5">
            Billing Address
          </Typography>
          <Divider variant="fullWidth" />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            id="street"
            label="Street"
            name="street"
            defaultValue={
              profileData.billing_address.street_num +
              " " +
              profileData.billing_address.street_name
            }
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            id="city"
            label="City"
            name="city"
            defaultValue={profileData.billing_address.city}
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            id="zip"
            label="Zip Code"
            name="zip"
            defaultValue={profileData.billing_address.zipcode}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            id="state"
            label="State"
            name="state"
            defaultValue={profileData.billing_address.state_id}
          />
        </Grid>

        <Grid item xs={12}>
          <TextField
            fullWidth
            id="country"
            label="Country"
            name="country"
            defaultValue={profileData.billing_address.country_name}
          />
        </Grid>
      </Grid>
    </Stack>
  );
};
