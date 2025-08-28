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
  // Custom spacing tokens
  customSpacing: {
    xs: '0.25rem',   // 4px
    sm: '0.5rem',    // 8px
    md: '1rem',      // 16px
    lg: '1.5rem',    // 24px
    xl: '2rem',      // 32px
    xxl: '3rem',     // 48px
  },
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
