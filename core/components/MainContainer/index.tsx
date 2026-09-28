import CardItem from "@/core/components/CardItem";
import QuoteOrganizer from "@/core/components/QuoteOrganizer";
import { Moneda } from "@/types/moneda";
import FilterAltOffIcon from "@mui/icons-material/FilterAltOff";
import TuneIcon from "@mui/icons-material/Tune";
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
  Tooltip,
} from "@mui/material";
import RefreshPrompt from "../RefreshPrompt";
import Footer from "./../Footer/index";
import { useMemo, useState } from "react";
import InternationalCalculator from "../InternationalCalculator";
import { useThemeMode } from "@/contexts/ThemeContext";
import { useQuoteLayout } from "@/hooks/useQuoteLayout";

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
  const [organizerOpen, setOrganizerOpen] = useState(false);
  const quoteNames = useMemo(
    () => resultadosFiltrados.map((moneda) => moneda.nombre),
    [resultadosFiltrados],
  );
  const { visible, hidden, reorder, hide, show, reset } =
    useQuoteLayout(quoteNames);
  const visibleQuotes = useMemo(() => {
    const byName = new Map(
      resultadosFiltrados.map((moneda) => [moneda.nombre, moneda]),
    );
    return visible
      .map((name) => byName.get(name))
      .filter((moneda): moneda is Moneda => !!moneda);
  }, [resultadosFiltrados, visible]);

  const handleTabChange = (_event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  const handleCardClick = (moneda: string) => {
    setCalculatorSource(moneda);
    setCalculatorTarget("Peso Argentino");
    setTabValue(1); // Switch to Calculator Tab
  };

  const openOrganizer = () => {
    setTabValue(0);
    setOrganizerOpen(true);
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
              <Box sx={{ display: { xs: "flex", md: "none" }, gap: 0.5 }}>
                <Tooltip title="Organizar cotizaciones">
                  <IconButton
                    onClick={openOrganizer}
                    aria-label="Organizar cotizaciones"
                    sx={{ backgroundColor: "background.default" }}
                  >
                    <TuneIcon />
                  </IconButton>
                </Tooltip>
                <IconButton
                  onClick={toggleTheme}
                  aria-label="Cambiar tema"
                  color="inherit"
                  sx={{ backgroundColor: "background.default" }}
                >
                  {mode === "dark" ? <Brightness7Icon /> : <Brightness4Icon />}
                </IconButton>
              </Box>
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

            {/* Header actions on desktop */}
            <Grid
              item
              xs={0}
              md={4}
              sx={{
                display: { xs: "none", md: "flex" },
                justifyContent: "flex-end",
                gap: 0.5,
              }}
            >
              <Tooltip title="Organizar cotizaciones">
                <IconButton
                  onClick={openOrganizer}
                  aria-label="Organizar cotizaciones"
                  sx={{ backgroundColor: "background.default" }}
                >
                  <TuneIcon />
                </IconButton>
              </Tooltip>
              <IconButton
                onClick={toggleTheme}
                aria-label="Cambiar tema"
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
              {visibleQuotes.length > 0 ? (
                <Grid container spacing={2}>
                  {visibleQuotes.map((moneda: Moneda) => (
                    <Grid
                      key={moneda.nombre}
                      item
                      xs={12}
                      sm={6}
                      md={4}
                      lg={3}
                      xl={2}
                    >
                      <CardItem
                        moneda={moneda.nombre}
                        loadingData={loadingData}
                        data={[
                          { texto: "Venta", precio: moneda.venta },
                          { texto: "Compra", precio: moneda.compra },
                          { texto: "Promedio:", precio: moneda.promedio },
                        ]}
                        onClick={handleCardClick}
                      />
                    </Grid>
                  ))}
                </Grid>
              ) : (
                <Box sx={{ textAlign: "center", py: 8 }}>
                  <Typography variant="h6" sx={{ mb: 1 }}>
                    No hay cotizaciones visibles
                  </Typography>
                  <Typography color="text.secondary" sx={{ mb: 2 }}>
                    Usá el ícono de organizar del encabezado para volver a
                    mostrarlas.
                  </Typography>
                </Box>
              )}

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
              <QuoteOrganizer
                open={organizerOpen}
                isMobile={isMobile}
                visible={visible}
                hidden={hidden}
                onClose={() => setOrganizerOpen(false)}
                onReorder={reorder}
                onHide={hide}
                onShow={show}
                onReset={reset}
              />
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
