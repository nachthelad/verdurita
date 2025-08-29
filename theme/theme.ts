import { createTheme, ThemeOptions } from "@mui/material/styles";
import { inter } from "@/fonts/fonts";

const baseTheme: ThemeOptions = {
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
      light: "#8fb070",
      dark: "#4a5e3a",
      contrastText: "#f0fff0",
    },
    secondary: {
      main: "#4f7330",
      light: "#759852",
      dark: "#355020",
      contrastText: "#f0fff0",
    },
    background: {
      default: "#f0fff0",
      paper: "#ffffff",
    },
    text: {
      primary: "#1a1a1a",
      secondary: "#666666",
    },
    error: {
      main: "#d32f2f",
      light: "#ef5350",
      dark: "#c62828",
      contrastText: "#ffffff",
    },
    success: {
      main: "#2e7d32",
      light: "#4caf50",
      dark: "#1b5e20",
      contrastText: "#ffffff",
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
          minHeight: "44px", // Ensure all buttons meet touch target guidelines
          textTransform: "none", // Preserve case for better readability
        },
      },
    },
  },
};

// Light theme
export const lightTheme = createTheme({
  ...baseTheme,
  palette: {
    mode: "light",
    ...baseTheme.palette,
  },
});

// Dark theme
export const darkTheme = createTheme({
  ...baseTheme,
  palette: {
    mode: "dark",
    primary: {
      main: "#8fb070",
      light: "#b3c596",
      dark: "#698550",
      contrastText: "#000000",
    },
    secondary: {
      main: "#759852",
      light: "#9bb374",
      dark: "#4f7330",
      contrastText: "#000000",
    },
    background: {
      default: "#0a0f0a",
      paper: "#1a1f1a",
    },
    text: {
      primary: "#ffffff",
      secondary: "#b0b0b0",
    },
    error: {
      main: "#f44336",
      light: "#ef5350",
      dark: "#c62828",
      contrastText: "#ffffff",
    },
    success: {
      main: "#4caf50",
      light: "#66bb6a",
      dark: "#2e7d32",
      contrastText: "#000000",
    },
  },
});

// Default export for backward compatibility
export const theme = lightTheme;
