import React, { useState } from "react";
import { ThemeProvider, createTheme } from "@mui/material/styles";
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
import { MonedaButton } from "@/core/components/MonedaButton";
import LogoText from "../LogoText";

type MenuBarProps = {
  onFilter: (moneda?: string | undefined) => void;
  refreshData: () => void;
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
      main: "#698550",
    },
  },
});

export default function MenuBar({ onFilter, refreshData }: MenuBarProps) {
  const [drawerOpen, setDrawerOpen] = React.useState(false);
  const isMobile = useMediaQuery(theme.breakpoints.down("xl"));
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
      <Box sx={{ paddingLeft: "5%", paddingY: "5%" }}>
        <LogoText
          setSelectedMoneda={setSelectedMoneda}
          refreshData={refreshData}
        />
      </Box>
      <Button
        onClick={() => onFilter()}
        sx={{
          color: "white",
          borderColor: "white",
          marginLeft: "1",
          display: "flex",
          fontWeight: "bold",
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
        <AppBar position="fixed">
          <Toolbar sx={{ justifyContent: "flex-end" }}>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{ mr: 2, display: { xl: "none" } }}>
              <MenuIcon />
            </IconButton>
            <LogoText
              setSelectedMoneda={setSelectedMoneda}
              refreshData={refreshData}
            />
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
