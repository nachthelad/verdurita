import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  Box,
  BottomNavigation,
  BottomNavigationAction,
  Tabs,
  Tab,
  useMediaQuery,
  Theme,
} from "@mui/material";
import { Icon } from "@iconify-icon/react";
import LogoText from "../LogoButton";
import CurrencyModal from "../CurrencyModal";
import { theme } from "@/theme/theme";

type NavigationBarProps = {
  onFilter: (moneda?: string | null) => void;
  refreshData: () => void;
};

const monedas: { [key: string]: string } = {
  "dólar blue": "Dólar Blue",
  "dólar oficial": "Dólar Oficial",
  "dólar tarjeta": "Tarjeta",
  "dólar bolsa": "Bolsa",
  "dólar cripto": "Cripto",
  "dólar contado con liqui": "Contado con liqui",
  "dólar mayorista": "Mayorista",
  "euro blue": "Euro Blue",
  "euro oficial": "Euro Oficial",
  "real brasileño": "Real",
};

export default function NavigationBar({
  onFilter,
  refreshData,
}: NavigationBarProps) {
  const isMobile = useMediaQuery((theme: Theme) =>
    theme.breakpoints.down("md")
  );
  const [value, setValue] = useState(0);
  const [dolarModalOpen, setDolarModalOpen] = useState(false);
  const [euroModalOpen, setEuroModalOpen] = useState(false);

  const monedasKeys = Object.keys(monedas);
  const dolarVariants = monedasKeys.filter((key) => key.includes("dólar"));
  const euroVariants = monedasKeys.filter((key) => key.includes("euro"));

  const handleRefresh = () => {
    refreshData();
    setValue(0);
  };

  const handleDolarClick = () => {
    setDolarModalOpen(true);
    setValue(1);
  };

  const handleEuroClick = () => {
    setEuroModalOpen(true);
    setValue(2);
  };

  const handleRealClick = () => {
    onFilter("Real");
    setValue(3);
  };

  if (isMobile) {
    return (
      <>
        <BottomNavigation
          value={value}
          onChange={(_, newValue) => setValue(newValue)}
          sx={{
            position: "fixed",
            bottom: 0,
            left: 0,
            right: 0,
            height: "80px",
            backgroundColor: theme.palette.primary.main,
            backdropFilter: "blur(8px)",
            borderTop: `1px solid ${theme.palette.primary.main}40`,
            boxShadow: "0 -2px 16px rgba(0,0,0,0.15)",
            zIndex: 1300,
            "& .MuiBottomNavigationAction-root": {
              color: theme.palette.primary.contrastText,
              "&.Mui-selected": {
                color: theme.palette.primary.contrastText,
              },
            },
          }}
        >
          <BottomNavigationAction
            icon={<Icon icon="tabler:refresh" style={{ fontSize: "28px" }} />}
            onClick={handleRefresh}
          />
          <BottomNavigationAction
            icon={
              <Icon
                icon="tabler:currency-dollar"
                style={{ fontSize: "28px" }}
              />
            }
            onClick={handleDolarClick}
          />
          <BottomNavigationAction
            icon={
              <Icon icon="tabler:currency-euro" style={{ fontSize: "28px" }} />
            }
            onClick={handleEuroClick}
          />
          <BottomNavigationAction
            icon={
              <Icon icon="tabler:currency-real" style={{ fontSize: "28px" }} />
            }
            onClick={handleRealClick}
          />
        </BottomNavigation>

        <CurrencyModal
          open={dolarModalOpen}
          onClose={() => setDolarModalOpen(false)}
          currencyVariants={dolarVariants}
          onFilter={onFilter}
        />
        <CurrencyModal
          open={euroModalOpen}
          onClose={() => setEuroModalOpen(false)}
          currencyVariants={euroVariants}
          onFilter={onFilter}
        />
      </>
    );
  }

  return (
    <AppBar position="fixed" sx={{ height: "64px" }}>
      <Toolbar>
        <LogoText onFilter={onFilter} refreshData={refreshData} />
        <Box sx={{ flexGrow: 1 }} />
        <Tabs
          value={value}
          onChange={(_, newValue) => setValue(newValue)}
          sx={{
            "& .MuiTab-root": {
              color: theme.palette.primary.contrastText,
              minHeight: "44px",
              textTransform: "none",
              "&.Mui-selected": {
                color: theme.palette.primary.contrastText,
              },
            },
            "& .MuiTabs-indicator": {
              backgroundColor: theme.palette.primary.contrastText,
            },
          }}
        >
          <Tab
            icon={<Icon icon="tabler:refresh" style={{ fontSize: "20px" }} />}
            onClick={handleRefresh}
          />
          <Tab label="Dólar" onClick={handleDolarClick} />
          <Tab label="Euro" onClick={handleEuroClick} />
          <Tab label="Real" onClick={handleRealClick} />
        </Tabs>

        <CurrencyModal
          open={dolarModalOpen}
          onClose={() => setDolarModalOpen(false)}
          currencyVariants={dolarVariants}
          onFilter={onFilter}
        />
        <CurrencyModal
          open={euroModalOpen}
          onClose={() => setEuroModalOpen(false)}
          currencyVariants={euroVariants}
          onFilter={onFilter}
        />
      </Toolbar>
    </AppBar>
  );
}
