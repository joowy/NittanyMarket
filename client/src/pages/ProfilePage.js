import CheckIcon from "@mui/icons-material/Check";
import EditIcon from "@mui/icons-material/Edit";
import {
  Divider,
  Grid,
  IconButton,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updatePassword } from "slices/authSlice";
export const ProfilePage = () => {
  const dispatch = useDispatch();
  const [editPassword, setEditPassword] = useState(false);
  const [passwordField, setPasswordField] = useState("");

  const { loading, profileData } = useSelector((state) => state.profile);

  const handleChange = (e) => {
    setPasswordField(e.target.value);
  };
  const onClick = () => {
    setEditPassword(!editPassword);
  };
  const updatePasswordClick = () => {
    setEditPassword(false);
    dispatch(updatePassword(passwordField))
      .unwrap()
      .catch((e) => {
        alert(e);
        console.log(e);
      });
    alert("Password Updated");
  };

  if (profileData) {
    const buyerInfo = profileData.BuyerInfo;
    const sellerInfo = profileData.SellerInfo;
    return (
      <Stack
        component={"form"}
        spacing={2}
        alignItems="center"
        justifyContent="center"
        sx={{ width: "80%" }}
      >
        <Grid container spacing={2}>
          {buyerInfo ? (
            <>
              <Grid item xs={12} sm={12}>
                <Typography component="h1" variant="h5">
                  Profile Information
                </Typography>
                <Divider variant="fullWidth" />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  disabled={true}
                  defaultValue={buyerInfo.first_name}
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
                  defaultValue={buyerInfo.last_name}
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
                  defaultValue={buyerInfo.email}
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
                      type="password"
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
                  defaultValue={buyerInfo.gender}
                  fullWidth
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  id="age"
                  label="Age"
                  name="age"
                  disabled={true}
                  defaultValue={buyerInfo.age}
                  fullWidth
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  id="credit_card"
                  label="Credit Card"
                  name="credit_card"
                  disabled={true}
                  defaultValue={buyerInfo.credit_card_last_four}
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
                    buyerInfo.home_address.street_num +
                    " " +
                    buyerInfo.home_address.street_name
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
                  defaultValue={buyerInfo.home_address.city}
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  id="zip"
                  label="Zip Code"
                  name="zip"
                  disabled={true}
                  defaultValue={buyerInfo.home_address.zipcode}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  id="state"
                  label="State"
                  name="state"
                  disabled={true}
                  defaultValue={buyerInfo.home_address.state_id}
                />
              </Grid>

              <Grid item xs={12} sm={12}>
                <TextField
                  fullWidth
                  id="country"
                  label="Country"
                  name="country"
                  disabled={true}
                  defaultValue={buyerInfo.home_address.country_name}
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
                    buyerInfo.billing_address.street_num +
                    " " +
                    buyerInfo.billing_address.street_name
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
                  defaultValue={buyerInfo.billing_address.city}
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  id="zip"
                  label="Zip Code"
                  name="zip"
                  disabled={true}
                  defaultValue={buyerInfo.billing_address.zipcode}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  id="state"
                  label="State"
                  name="state"
                  disabled={true}
                  defaultValue={buyerInfo.billing_address.state_id}
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  fullWidth
                  id="country"
                  label="Country"
                  name="country"
                  disabled={true}
                  defaultValue={buyerInfo.billing_address.country_name}
                />
              </Grid>
            </>
          ) : null}
          {/* if user is a seller */}
          {sellerInfo ? (
            <>
              <Grid item xs={12} sm={12}>
                <Typography component="h1" variant="h5">
                  Seller Info
                </Typography>
                <Divider variant="fullWidth" />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  id="seller email"
                  label="Seller Email"
                  name="seller email"
                  disabled={true}
                  defaultValue={sellerInfo.email}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  id="seller balance"
                  label="Balance"
                  name="balance"
                  disabled={true}
                  defaultValue={sellerInfo.balance}
                />
              </Grid>
            </>
          ) : null}
        </Grid>
      </Stack>
    );
  } else if (loading) {
    return <div>Loading...</div>;
  } else {
    return <div>Cannot fetch profile information </div>;
  }
};
