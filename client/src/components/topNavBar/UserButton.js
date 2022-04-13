import { AccountCircle, KeyboardArrowDown } from "@mui/icons-material";
import { IconButton, Menu, MenuItem } from "@mui/material";
import { logout } from "slices/authSlice";
import React, { useCallback, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export const UserButton = () => {
  const dispatch = useDispatch();
  const { userData } = useSelector((state) => state.auth);
  const { profileData } = useSelector((state) => state.profile);
  let navigate = useNavigate();

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
        <MenuItem onClick={() => navigate("/profile")}>Profile</MenuItem>
        {profileData?.SellerInfo ? (
          <MenuItem onClick={() => navigate("/product/list")}>
            List Product
          </MenuItem>
        ) : null}
        <MenuItem
          onClick={() => {
            logOut();
            navigate("/login");
          }}
        >
          Log Out
        </MenuItem>
      </Menu>
    </>
  );
};
