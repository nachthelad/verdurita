import React, { useState } from "react";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { Kanit } from "next/font/google";
import {
  AppBar,
  Box,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Drawer,
  useMediaQuery,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { MonedaButton } from "../MonedaButton";

const kanit = Kanit({
  subsets: ["latin"],
  weight: "400",
});

type MenuBarProps = {
  onFilter: (moneda?: string | undefined) => void;
};

const monedas: { [key: string]: string } = {
  "dólar blue": "Dólar Blue",
  "dólar oficial": "Dólar Oficial",
  "euro blue": "Euro Blue",
  "euro oficial": "Euro Oficial",
  "dólar tarjeta": "tarjeta",
  "dólar bolsa": "bolsa",
  "dólar cripto": "cripto",
  "dólar ccl": "contado con liqui",
  "dólar mayorista": "mayorista", 
  "real brasileño": "real",
};

const theme = createTheme({
  palette: {
    primary: {
      main: "#008000",
    },
  },
});

export default function MenuBar({ onFilter }: MenuBarProps) {
  const [drawerOpen, setDrawerOpen] = React.useState(false);
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [selectedMoneda, setSelectedMoneda] = useState<string | null>(null);

  const handleDrawerToggle = () => {
    setDrawerOpen(!drawerOpen);
  };

  const handleMonedaChange = (moneda: string) => {
    if (selectedMoneda === moneda) {
      setSelectedMoneda(null);
      onFilter();
    } else {
      setSelectedMoneda(moneda);
      onFilter(moneda);
    }
  };

  const drawer = (
    <Box
      onClick={handleDrawerToggle}
      sx={{
        textAlign: "center",
        backgroundColor: theme.palette.primary.main,
        height: "100%",
      }}>
      <Typography
        variant="h6"
        noWrap
        sx={{
          flexGrow: 1,
          color: "white",
          padding: "10px",
          fontFamily: kanit.style.fontFamily,
        }}>
        verdurita
      </Typography>
      <Button
        onClick={() => onFilter()}
        sx={{
          color: "white",
          borderColor: "white",
          marginLeft: "1",
        }}>
        Todas
      </Button>
      {Object.keys(monedas).map((key) => (
        <Button
          key={key}
          onClick={() => onFilter(monedas[key])}
          sx={{
            color: "white",
            display: "flex",
            justifyContent: "flex-start",
            margin: "5px 0",
          }}>
          {key}
        </Button>
      ))}
    </Box>
  );

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="fixed" style={{ background: "green" }}>
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{ mr: 2, display: { sm: "none" } }}>
              <MenuIcon />
            </IconButton>
            <Typography
              variant="h6"
              noWrap
              component="div"
              sx={{
                flexGrow: 1,
                display: { xs: "block", sm: "none", md: "block" },
                fontFamily: kanit.style.fontFamily,
              }}>
              verdurita
            </Typography>
            {isMobile
              ? null
              : Object.keys(monedas).map((key, index) => (
                  <MonedaButton
                    key={key}
                    moneda={key}
                    onFilter={() => handleMonedaChange(monedas[key])}
                    selected={selectedMoneda === monedas[key]}
                    isFirst={index === 0}
                    isLast={index === Object.keys(monedas).length - 1}
                  />
                ))}
          </Toolbar>
        </AppBar>
        <Drawer anchor="left" open={drawerOpen} onClose={handleDrawerToggle}>
          {drawer}
        </Drawer>
      </Box>
    </ThemeProvider>
  );
}
