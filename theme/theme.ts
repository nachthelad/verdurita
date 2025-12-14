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
      main: "#1E3A2F", // Deep Forest Green - Modern & Premium
      light: "#3E6B58",
      dark: "#0F261C",
      contrastText: "#FFFFFF",
    },
    secondary: {
      main: "#8FB339", // Vibrant Fresh Green for accents
      light: "#B8D66A",
      dark: "#6A8C21",
      contrastText: "#1A1A1A",
    },
    background: {
      default: "#F4F6F8", // Modern Soft Gray
      paper: "#FFFFFF",
    },
    text: {
      primary: "#1A2027", // Soft Black
      secondary: "#5E6C7C", // Cool Gray
    },
    error: {
      main: "#D32F2F",
    },
    success: {
      main: "#2E7D32",
    },
  },
  shape: {
    borderRadius: 16, // Softer, more modern corners
  },
  typography: {
    fontFamily: inter.style.fontFamily,
    h1: {
      fontWeight: 700,
      fontSize: "2rem",
      letterSpacing: "-0.02em",
    },
    h2: {
      fontWeight: 700,
      fontSize: "1.75rem",
      letterSpacing: "-0.01em",
    },
    h3: {
      fontWeight: 700,
      fontSize: "1.5rem",
    },
    subtitle1: {
      fontWeight: 500,
      color: "#5E6C7C",
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          minHeight: "48px", // Larger touch targets
          textTransform: "none",
          fontWeight: 600,
          boxShadow: "none",
          "&:hover": {
            boxShadow: "0px 2px 4px rgba(0,0,0,0.1)",
          },
        },
        contained: {
          borderRadius: "50px", // Pill shaped buttons
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          boxShadow: "0px 4px 20px rgba(0,0,0,0.05)", // Soft, diffused shadow
          border: "1px solid rgba(0,0,0,0.03)",
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          "& .MuiOutlinedInput-root": {
            borderRadius: "12px",
          },
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
      main: "#8FB339", // Lighter green for dark mode
      light: "#B8D66A",
      dark: "#6A8C21",
      contrastText: "#000000",
    },
    background: {
      default: "#121212",
      paper: "#1E1E1E",
    },
    text: {
      primary: "#FFFFFF",
      secondary: "#B0B8C4",
    },
  },
});

// Default export for backward compatibility
export const theme = lightTheme;
