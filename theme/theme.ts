import { createTheme } from "@mui/material/styles";
import { inter } from "@/fonts/fonts";

export const theme = createTheme({
  palette: {
    primary: {
      main: "#698550",
      contrastText: "#f0fff0",
    },
    secondary: {
      main: "#4f7330",
    },
  },
  components: {
    MuiTypography: {
      styleOverrides: {
        root: {
          fontFamily: inter.style.fontFamily,
        },
      },
    },
  },
});
