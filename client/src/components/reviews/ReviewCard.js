import { Card, CardContent, Stack, Typography } from "@mui/material";
import React from "react";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
export const ReviewCard = ({ buyer_email, seller_email, review_desc }) => {
  return (
    <Card>
      <CardContent>
        <Stack direction={"row"}>
          <PersonOutlineIcon sx={{ fontSize: 30 }} />
        </Stack>
        <Typography variant="h6"> {buyer_email} </Typography>

        <Typography variant="body1"> {review_desc}</Typography>
      </CardContent>
    </Card>
  );
};
