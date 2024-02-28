import React, { useState } from "react";
import { AppBar, Box, Toolbar, Button } from "@mui/material";
import LogoText from "../LogoButton";
import MenuButton from "../MenuButton";
import { theme } from "@/theme/theme";

type MenuBarProps = {
  onFilter: (moneda?: string | null) => void;
  refreshData: () => void;
  isMobile: boolean;
};

const monedas: { [key: string]: string } = {
  "dólar blue": "Dólar Blue",
  "dólar oficial": "Dólar Oficial",
  "euro blue": "Euro Blue",
  "euro oficial": "Euro Oficial",
  "dólar tarjeta": "tarjeta",
  "dólar bolsa": "bolsa",
  "dólar cripto": "cripto",
  "dólar contado con liqui": "contado con liqui",
  "dólar mayorista": "mayorista",
  "real brasileño": "real",
};

export default function MenuBar({
  onFilter,
  refreshData,
  isMobile = false,
}: MenuBarProps) {
  const monedasKeys = Object.keys(monedas);
  const dolarVariants = monedasKeys.filter((key) => key.includes("dólar"));
  const euroVariants = monedasKeys.filter((key) => key.includes("euro"));
  const realVariants = monedasKeys.filter((key) => key.includes("real"));
  const [selectedVariant, setSelectedVariant] = useState<string | null>(null);

  return (
    <Box>
      <AppBar
        position="fixed"
        sx={{
          ...(isMobile && { top: "auto", bottom: 0 }),
          height: isMobile ? "80px" : "64px",
        }}>
        <Toolbar sx={{ height: isMobile ? "100%" : "100%" }}>
          {isMobile ? null : (
            <LogoText onFilter={onFilter} refreshData={refreshData} />
          )}
          <Box
            sx={{
              display: "flex",
              gap: isMobile ? 2 : 1,
              ...(isMobile && { justifyContent: "center", width: "100%" }),
            }}>
            {!isMobile &&
              selectedVariant &&
              typeof selectedVariant != "object" && (
                <Button
                  onClick={() => {
                    setSelectedVariant(null);
                    onFilter(null);
                  }}
                  variant="contained"
                  sx={{
                    color: theme.palette.primary.main,
                    fontSize: "15px",
                    marginRight: "5px",
                    backgroundColor: theme.palette.primary.contrastText,
                    "&:hover": {
                      backgroundColor: theme.palette.primary.contrastText,
                    },
                  }}>
                  Todas
                </Button>
              )}
            <MenuButton
              buttonName={"Dólar"}
              currencyVariants={dolarVariants}
              onFilter={onFilter}
              refreshData={refreshData}
              setSelectedVariant={setSelectedVariant}
            />
            <MenuButton
              buttonName={"Euro"}
              currencyVariants={euroVariants}
              onFilter={onFilter}
              refreshData={refreshData}
              setSelectedVariant={setSelectedVariant}
            />
            <MenuButton
              buttonName={"Real"}
              currencyVariants={realVariants}
              onFilter={onFilter}
              refreshData={refreshData}
              setSelectedVariant={setSelectedVariant}
            />
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
