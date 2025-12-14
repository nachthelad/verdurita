import CardItem from "@/core/components/CardItem";
import { Moneda } from "@/types/moneda";
import { theme } from "@/theme/theme";
import FilterAltOffIcon from "@mui/icons-material/FilterAltOff";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import {
  Theme,
  useMediaQuery,
  Box,
  Grid,
  Button,
  Typography,
  Tabs,
  Tab,
  Container,
  Paper,
  IconButton,
} from "@mui/material";
import RefreshPrompt from "../RefreshPrompt";
import Footer from "./../Footer/index";
import { useState } from "react";
import InternationalCalculator from "../InternationalCalculator";
import { useThemeMode } from "@/contexts/ThemeContext";

type MainContainerProps = {
  resultadosFiltrados: Moneda[];
  loadingData: boolean;
  onFilter: () => void;
  refreshData: () => void;
  filterApplied: boolean;
};

export default function MainContainer({
  resultadosFiltrados,
  loadingData,
  onFilter,
  refreshData,
  filterApplied,
}: MainContainerProps): React.ReactElement {
  const isMobile = useMediaQuery((theme: Theme) =>
    theme.breakpoints.down("md"),
  );
  const { mode, toggleTheme } = useThemeMode();
  const [tabValue, setTabValue] = useState(0);
  const [calculatorSource, setCalculatorSource] = useState("Dolar Blue");
  const [calculatorTarget, setCalculatorTarget] = useState("Peso Argentino");

  const handleTabChange = (_event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  const handleCardClick = (moneda: string) => {
    setCalculatorSource(moneda);
    setCalculatorTarget("Peso Argentino");
    setTabValue(1); // Switch to Calculator Tab
  };

  return (
    <Box
      sx={{
        backgroundColor: "background.default",
        minHeight: "100vh",
        paddingBottom: isMobile ? "2rem" : 0,
      }}
    >
      {/* Header Section */}
      <Paper
        elevation={0}
        sx={{
          py: 2,
          px: 0,
          backgroundColor: "background.paper",
          borderBottom: "1px solid",
          borderColor: "divider",
          marginBottom: 3,
        }}
      >
        <Container maxWidth="xl">
          <Grid container alignItems="center" spacing={2}>
            {/* Title with Theme Toggle (mobile inline) */}
            <Grid
              item
              xs={12}
              md={4}
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: { xs: "space-between", md: "flex-start" },
              }}
            >
              <Typography
                variant="h1"
                sx={{
                  color: "primary.main",
                  fontSize: { xs: "1.5rem", md: "1.75rem" },
                }}
              >
                verdurita.
              </Typography>
              {/* Theme toggle - visible only on mobile */}
              <IconButton
                onClick={toggleTheme}
                color="inherit"
                sx={{
                  display: { xs: "flex", md: "none" },
                  borderRadius: "50%",
                  backgroundColor: "background.default",
                  "&:hover": {
                    backgroundColor: "action.hover",
                  },
                }}
              >
                {mode === "dark" ? <Brightness7Icon /> : <Brightness4Icon />}
              </IconButton>
            </Grid>

            {/* Centered Tabs */}
            <Grid
              item
              xs={12}
              md={4}
              sx={{ display: "flex", justifyContent: "center" }}
            >
              <Tabs
                value={tabValue}
                onChange={handleTabChange}
                variant={isMobile ? "fullWidth" : "standard"}
                sx={{
                  backgroundColor: "background.default",
                  borderRadius: "50px",
                  padding: "4px",
                  width: isMobile ? "100%" : "auto",
                  "& .MuiTabs-indicator": {
                    display: "none",
                  },
                }}
              >
                <Tab
                  label="Cotizaciones"
                  sx={{
                    borderRadius: "40px",
                    color: "text.secondary",
                    zIndex: 1,
                    minHeight: "40px",
                    px: 4,
                    textTransform: "none",
                    fontWeight: 600,
                    "&.Mui-selected": {
                      backgroundColor: "white",
                      color: "primary.main",
                      boxShadow: "0px 2px 4px rgba(0,0,0,0.1)",
                    },
                  }}
                />
                <Tab
                  label="Calculadora"
                  sx={{
                    borderRadius: "40px",
                    color: "text.secondary",
                    zIndex: 1,
                    minHeight: "40px",
                    px: 4,
                    textTransform: "none",
                    fontWeight: 600,
                    "&.Mui-selected": {
                      backgroundColor: "white",
                      color: "primary.main",
                      boxShadow: "0px 2px 4px rgba(0,0,0,0.1)",
                    },
                  }}
                />
              </Tabs>
            </Grid>

            {/* Theme Toggle Button - Desktop only */}
            <Grid
              item
              xs={0}
              md={4}
              sx={{
                display: { xs: "none", md: "flex" },
                justifyContent: "flex-end",
              }}
            >
              <IconButton
                onClick={toggleTheme}
                color="inherit"
                sx={{
                  borderRadius: "50%",
                  backgroundColor: "background.default",
                  "&:hover": {
                    backgroundColor: "action.hover",
                  },
                }}
              >
                {mode === "dark" ? <Brightness7Icon /> : <Brightness4Icon />}
              </IconButton>
            </Grid>
          </Grid>
        </Container>
      </Paper>

      <Container maxWidth="xl" sx={{ px: { xs: 2, md: 4 } }}>
        <RefreshPrompt refreshData={refreshData} isLoading={loadingData} />

        {/* Tab 0: Cotizaciones List */}
        <div role="tabpanel" hidden={tabValue !== 0}>
          {tabValue === 0 && (
            <Box>
              <Grid container spacing={2}>
                {(resultadosFiltrados || []).map(
                  (moneda: Moneda, index: number) => (
                    <Grid
                      key={`${moneda?.nombre}-${index}`}
                      item
                      xs={12}
                      sm={6}
                      md={4}
                      lg={3}
                      xl={2.4}
                      // Removed manual sx overrides here (pl: 2, pb: 2)
                    >
                      <CardItem
                        moneda={moneda.nombre}
                        loadingData={loadingData}
                        data={[
                          { texto: "Venta", precio: moneda.venta },
                          { texto: "Compra", precio: moneda.compra },
                          { texto: "Promedio:", precio: moneda.promedio },
                        ]}
                        esRealBrasileño={moneda.nombre === "Real Brasileño"}
                        EsEuro={moneda.nombre.split(" ")[0] === "Euro"}
                        onClick={handleCardClick}
                      />
                    </Grid>
                  ),
                )}
              </Grid>

              {filterApplied && (
                <Box sx={{ display: "flex", justifyContent: "center", mt: 3 }}>
                  <Button
                    onClick={() => onFilter()}
                    variant="text"
                    startIcon={<FilterAltOffIcon />}
                  >
                    Mostrar todas
                  </Button>
                </Box>
              )}
            </Box>
          )}
        </div>

        {/* Tab 1: Calculator */}
        <div role="tabpanel" hidden={tabValue !== 1}>
          {tabValue === 1 && (
            <Box
              sx={{ marginTop: 2, display: "flex", justifyContent: "center" }}
            >
              <InternationalCalculator
                initialLocalSource={calculatorSource}
                initialLocalTarget={calculatorTarget}
              />
            </Box>
          )}
        </div>
      </Container>
      <Footer />
    </Box>
  );
}
