import { red } from "@mui/material/colors";
import { createTheme } from "@mui/material/styles";
// A custom theme for this app
export const theme = createTheme({
  palette: {
    primary: {
      main: "#021F45",
    },
    secondary: {
      main: "#FFFFFF",
    },
    error: {
      main: red.A400,
    },
  },
});
