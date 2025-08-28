import { useState } from "react";
import { AppBar, Box, Toolbar, Button, Typography } from "@mui/material";
import LogoText from "../LogoButton";
import MenuButton from "../MenuButton";
import { theme } from "@/theme/theme";
import { Icon } from "@iconify-icon/react";
import CloseIcon from "@mui/icons-material/Close";

type MenuBarProps = {
  onFilter: (moneda?: string | null) => void;
  refreshData: () => void;
  isMobile: boolean;
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

export default function MenuBar({
  onFilter,
  refreshData,
  isMobile = false,
}: MenuBarProps) {
  const [expanded, setExpanded] = useState(false);
  const [dolarExpanded, setDolarExpanded] = useState(false);
  const [euroExpanded, setEuroExpanded] = useState(false);
  const monedasKeys = Object.keys(monedas);
  const dolarVariants = monedasKeys.filter((key) => key.includes("dólar"));
  const euroVariants = monedasKeys.filter((key) => key.includes("euro"));

  return (
    <Box>
      <AppBar
        position="fixed"
        sx={{
          ...(isMobile && { 
            top: "auto", 
            bottom: 0,
            borderTop: `1px solid ${theme.palette.primary.main}20`,
            backdropFilter: "blur(10px)",
          }),
          height: expanded ? "100%" : isMobile ? "80px" : "64px",
          display: "flex",
          justifyContent: isMobile && expanded ? "center" : "flex-end",
          alignItems: isMobile ? "center" : null,
          transition: "height 0.2s ease, backdrop-filter 0.2s ease",
          backgroundColor: isMobile ? `${theme.palette.primary.main}dd` : theme.palette.primary.main,
          boxShadow: isMobile ? `0 -2px 8px rgba(0,0,0,0.1)` : undefined,
        }}
      >
        <Toolbar sx={{ height: isMobile ? "100%" : "100%" }}>
          {isMobile ? null : (
            <LogoText onFilter={onFilter} refreshData={refreshData} />
          )}
          <Box
            sx={{
              display: isMobile && expanded ? "none" : "flex",
              gap: isMobile ? 1 : 1,
              ...(isMobile && { justifyContent: "center", width: "100%" }),
            }}
          >
            <Button
              onClick={refreshData}
              sx={{
                color: theme.palette.primary.contrastText,
                backgroundColor: isMobile ? "transparent" : `${theme.palette.secondary.main} !important`,
                borderRadius: "2rem",
                paddingX: "0.3rem",
                paddingY: "0.3rem",
                fontSize: isMobile ? "20px" : "15px",
                minHeight: "44px",
                minWidth: "44px",
                "&:hover": {
                  backgroundColor: isMobile ? `${theme.palette.primary.main}15` : `${theme.palette.secondary.dark} !important`,
                },
              }}
            >
              <Icon
                icon="tabler:refresh"
                style={{ fontSize: isMobile ? "30px" : "25px" }}
              />
            </Button>
            <MenuButton
              expanded={expanded}
              buttonName={
                isMobile ? (
                  <Icon
                    icon="tabler:currency-dollar"
                    style={{ fontSize: "35px" }}
                  />
                ) : (
                  "Dólar"
                )
              }
              currencyVariants={dolarVariants}
              onFilter={onFilter}
              refreshData={refreshData}
              expandAppBar={() => {
                setExpanded(true);
                setDolarExpanded(true);
                setEuroExpanded(false);
              }}
            />
            <MenuButton
              expanded={expanded}
              buttonName={
                isMobile ? (
                  <Icon
                    icon="tabler:currency-euro"
                    style={{ fontSize: "35px" }}
                  />
                ) : (
                  "Euro"
                )
              }
              currencyVariants={euroVariants}
              onFilter={onFilter}
              refreshData={refreshData}
              expandAppBar={() => {
                setExpanded(true);
                setDolarExpanded(false);
                setEuroExpanded(true);
              }}
            />
            <Button
              sx={{
                color: theme.palette.primary.contrastText,
                backgroundColor: isMobile ? "transparent" : `${theme.palette.secondary.main} !important`,
                borderRadius: "2rem",
                paddingX: "1.5rem",
                paddingY: "0.3rem",
                fontSize: isMobile ? "20px" : "15px",
                minHeight: "44px",
                minWidth: isMobile ? "44px" : "auto",
                "&:hover": {
                  backgroundColor: isMobile ? `${theme.palette.primary.main}15` : `${theme.palette.secondary.dark} !important`,
                },
              }}
              onClick={() => {
                onFilter("Real");
              }}
            >
              {isMobile ? (
                <Icon
                  icon="tabler:currency-real"
                  style={{ fontSize: "35px" }}
                />
              ) : (
                "Real"
              )}
            </Button>
          </Box>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              gap: 2,
            }}
          >
            {expanded && (
              <>
                {dolarExpanded && (
                  <>
                    <CloseIcon
                      onClick={() => {
                        setExpanded(false);
                      }}
                      sx={{
                        position: "absolute",
                        top: "10px",
                        right: "12px",
                        cursor: "pointer",
                      }}
                    />

                    <Typography variant="h5">
                      Seleccioná el dólar que queres filtrar
                    </Typography>
                    {dolarVariants.map((variant) => (
                      <Button
                        key={variant}
                        onClick={() => {
                          onFilter(variant);
                          setExpanded(false);
                        }}
                        variant="contained"
                        sx={{
                          backgroundColor: theme.palette.secondary.main,
                          borderRadius: "2rem",
                          paddingX: "1.5rem",
                          paddingY: "0.3rem",
                          fontSize: "20px",
                        }}
                      >
                        {monedas[variant]
                          .replace("Dólar ", "")
                          .replace(/bolsa/gi, "MEP / Bolsa")}
                      </Button>
                    ))}
                  </>
                )}
                {euroExpanded && (
                  <>
                    <CloseIcon
                      onClick={() => {
                        setExpanded(false);
                      }}
                      sx={{
                        position: "absolute",
                        top: "10px",
                        right: "12px",
                        cursor: "pointer",
                      }}
                    />
                    <Typography variant="h5">
                      Seleccioná el euro que queres filtrar
                    </Typography>
                    {euroVariants.map((variant) => (
                      <Button
                        key={variant}
                        onClick={() => {
                          onFilter(variant);
                          setExpanded(false);
                        }}
                        variant="contained"
                        sx={{
                          backgroundColor: theme.palette.secondary.main,
                          borderRadius: "2rem",
                          paddingX: "1.5rem",
                          paddingY: "0.3rem",
                          fontSize: "20px",
                        }}
                      >
                        {monedas[variant].replace("Euro ", "")}
                      </Button>
                    ))}
                  </>
                )}
              </>
            )}
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
