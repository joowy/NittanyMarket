import {
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  Stack,
  TextField,
} from "@mui/material";
import React from "react";
import { useSelector } from "react-redux";

export const Payment = () => {
  const { profileData } = useSelector((state) => state.profile);

  const [selectedValue, setSelectedValue] = React.useState("a");

  const handleChange = (event) => {
    setSelectedValue(event.target.value);
  };
  return (
    <Stack>
      <div>
        <Radio
          checked={selectedValue === "a"}
          onChange={handleChange}
          value="a"
          name="radio-buttons"
          inputProps={{ "aria-label": "A" }}
        />
        New Credit Card: <TextField size="small" />
      </div>
      <div>
        <Radio
          checked={selectedValue === "b"}
          onChange={handleChange}
          value="b"
          name="radio-buttons"
          inputProps={{ "aria-label": "B" }}
        />
        Use saved credit card: {profileData.BuyerInfo.credit_card_last_four}
      </div>
    </Stack>
  );
};
