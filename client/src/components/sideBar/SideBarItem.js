import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Box, IconButton, Typography } from "@mui/material";
import React, { useState } from "react";
export const SideBarItem = ({ name }) => {
  const [showSubCat, setShowSubCat] = useState(true);

  const handleShowReply = () => {
    setShowSubCat(!showSubCat);
  };

  return (
    <Box sx={{ display: "flex" }}>
      <Typography
        sx={{
          flexGrow: 1,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
        }}
      >
        {name}
      </Typography>
      <IconButton onClick={handleShowReply}>
        <ExpandMoreIcon />
      </IconButton>
    </Box>
  );
};
