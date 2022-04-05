import { Box, Typography, IconButton } from "@mui/material";
import React, { useState } from "react";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
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
