import {
  Box,
  Button,
  Divider,
  Grid,
  IconButton,
  Link,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { GetProfileData } from "slices/userProfileSlice";
import CheckIcon from "@mui/icons-material/Check";
import EditIcon from "@mui/icons-material/Edit";
import { updatePassword } from "slices/authSlice";
export const ProfilePage = () => {
  const dispatch = useDispatch();
  const [editPassword, setEditPassword] = useState(false);
  const [passwordField, setPasswordField] = useState("");

  const { loading, error, profileData } = useSelector((state) => state.profile);
  const { userData, isLoggedIn } = useSelector((state) => state.auth);
  console.log(userData.user.email, "email");

  useEffect(() => {
    dispatch(GetProfileData(userData.user.email))
      .unwrap()
      .catch((e) => {
        alert(e);
      });
  }, [dispatch, userData.user.email]);

  const handleChange = (e) => {
    setPasswordField(e.target.value);
  };
  const onClick = () => {
    setEditPassword(!editPassword);
    console.log("test", editPassword);

    // put request

    //
  };
  const updatePasswordClick = () => {
    setEditPassword(false);
    console.log(passwordField, "profilepage");
    dispatch(updatePassword(passwordField))
      .unwrap()
      .catch((e) => {
        alert(e);
        console.log(e);
      });
    alert("Password Updated");
  };
  //   if (!isLoggedIn) {
  //     alert("Must log in to see your profile");
  //     return <Navigate to="/" />;
  //   }

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
            disabled={true}
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
            disabled={true}
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
            disabled={true}
            defaultValue={profileData.email}
          />
        </Grid>

        <Grid item xs={12} sm={11}>
          <TextField
            required
            fullWidth
            id="password"
            label="Password"
            name="password"
            disabled={true}
            defaultValue="****************"
          />
        </Grid>

        <Grid item xs={12} sm={1}>
          <IconButton onClick={onClick}>
            <EditIcon />
          </IconButton>
        </Grid>
        {editPassword ? (
          <>
            <Grid item xs={12} sm={11}>
              <TextField
                required
                fullWidth
                id="new_password"
                label="New Password"
                name="new_password"
                value={passwordField}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} sm={1}>
              <IconButton onClick={updatePasswordClick}>
                <CheckIcon />
              </IconButton>
            </Grid>
          </>
        ) : null}
        <Grid item xs={12}>
          <TextField
            id="gender"
            label="Gender"
            name="gender"
            disabled={true}
            defaultValue={profileData.gender}
            fullWidth
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            id="age"
            label="Age"
            name="age"
            disabled={true}
            defaultValue={profileData.age}
            fullWidth
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            id="credit_card"
            label="Credit Card"
            name="credit_card"
            disabled={true}
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
            disabled={true}
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
            disabled={true}
            defaultValue={profileData.home_address.city}
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            id="zip"
            label="Zip Code"
            name="zip"
            disabled={true}
            defaultValue={profileData.home_address.zipcode}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            id="state"
            label="State"
            name="state"
            disabled={true}
            defaultValue={profileData.home_address.state_id}
          />
        </Grid>

        <Grid item xs={12} sm={12}>
          <TextField
            fullWidth
            id="country"
            label="Country"
            name="country"
            disabled={true}
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
            disabled={true}
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
            disabled={true}
            defaultValue={profileData.billing_address.city}
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            id="zip"
            label="Zip Code"
            name="zip"
            disabled={true}
            defaultValue={profileData.billing_address.zipcode}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            id="state"
            label="State"
            name="state"
            disabled={true}
            defaultValue={profileData.billing_address.state_id}
          />
        </Grid>

        <Grid item xs={12}>
          <TextField
            fullWidth
            id="country"
            label="Country"
            name="country"
            disabled={true}
            defaultValue={profileData.billing_address.country_name}
          />
        </Grid>
      </Grid>
    </Stack>
  );
};
