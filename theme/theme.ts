import { createTheme } from "@mui/material/styles";
import { inter } from "@/fonts/fonts";

export const theme = createTheme({
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 960,
      lg: 1280,
      xl: 1920,
    },
  },
  palette: {
    primary: {
      main: "#698550",
      contrastText: "#f0fff0",
    },
    secondary: {
      main: "#4f7330",
    },
  },
  spacing: (factor: number) => `${0.25 * factor}rem`,
  components: {
    MuiTypography: {
      styleOverrides: {
        root: {
          fontFamily: inter.style.fontFamily,
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          minHeight: '44px', // Ensure all buttons meet touch target guidelines
          textTransform: 'none', // Preserve case for better readability
        },
      },
    },
  },
});
