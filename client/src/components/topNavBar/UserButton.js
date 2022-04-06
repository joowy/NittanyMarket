import { AccountCircle, KeyboardArrowDown } from "@mui/icons-material";
import { IconButton, Menu, MenuItem } from "@mui/material";
import { logout } from "slices/authSlice";
import React, { useCallback, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

export const UserButton = () => {
  const dispatch = useDispatch();
  const { userData } = useSelector(
    (state) =>
      //@ts-ignore
      state.auth
  );
  const { loading, error, profileData } = useSelector((state) => state.profile);

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const logOut = useCallback(() => {
    dispatch(logout());
  }, [dispatch]);

  return (
    <>
      <IconButton
        aria-label="account-circle-button"
        id="basic-button"
        aria-controls={open ? "basic-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
        sx={{ color: "white" }}
      >
        <AccountCircle sx={{ fontSize: 30 }} />
        {userData.user.email}
        <KeyboardArrowDown />
      </IconButton>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        <MenuItem>
          <a href="/profile">Profile</a>
        </MenuItem>
        {profileData?.SellerInfo ? (
          <MenuItem>
            <a href="/product/list">List Product</a>
          </MenuItem>
        ) : null}
        <MenuItem>
          <a href="/login" onClick={logOut}>
            Log Out
          </a>
        </MenuItem>
      </Menu>
    </>
  );
};
