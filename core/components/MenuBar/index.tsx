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
  "dólar tarjeta": "tarjeta",
  "dólar bolsa": "bolsa",
  "dólar cripto": "cripto",
  "dólar contado con liqui": "contado con liqui",
  "dólar mayorista": "mayorista",
  "euro blue": "Euro Blue",
  "euro oficial": "Euro Oficial",
  "real brasileño": "real",
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
          ...(isMobile && { top: "auto", bottom: 0 }),
          height: expanded ? "100%" : isMobile ? "80px" : "64px",
          display: "flex",
          justifyContent: isMobile && expanded ? "center" : "flex-end",
          alignItems: isMobile ? "center" : null,
          transition: "height 0.2s ease",
        }}>
        <Toolbar sx={{ height: isMobile ? "100%" : "100%" }}>
          {isMobile ? null : (
            <LogoText onFilter={onFilter} refreshData={refreshData} />
          )}
          <Box
            sx={{
              display: isMobile && expanded ? "none" : "flex",
              gap: isMobile ? 1 : 1,
              ...(isMobile && { justifyContent: "center", width: "100%" }),
            }}>
            <Button
              sx={{
                color: theme.palette.primary.contrastText,
                backgroundColor: `${theme.palette.secondary.main} !important`,
                borderRadius: "2rem",
                paddingX: "0.3rem",
                paddingY: "0.3rem",
                fontSize: isMobile ? "20px" : "15px",
              }}>
              <Icon 
              icon="tabler:refresh" 
              style={{ fontSize: isMobile ? "30px" : "25px" }} 
              onClick={refreshData}/>
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
                backgroundColor: `${theme.palette.secondary.main} !important`,
                borderRadius: "2rem",
                paddingX: "1.5rem",
                paddingY: "0.3rem",
                fontSize: isMobile ? "20px" : "15px",
              }}
              onClick={() => {
                onFilter("Real");
              }}>
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
            }}>
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
                        }}>
                        {monedas[variant].replace("Dólar ", "")}
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
                        }}>
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
