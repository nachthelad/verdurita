import CardItem from "@/core/components/CardItem";
import TitleItem from "@/core/components/TitleItem";
import { Moneda } from "@/types/moneda";
import LogoButton from "@/core/components/LogoButton";
import { theme } from "@/theme/theme";
import FilterAltOffIcon from "@mui/icons-material/FilterAltOff";
import {
  Theme,
  useMediaQuery,
  Box,
  Grid,
  Button,
  Typography,
} from "@mui/material";
import { inter } from "@/fonts/fonts";
import RefreshPrompt from "../RefreshPrompt";
import Footer from "./../Footer/index";
import SearchBar from "../SearchBar";

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
    theme.breakpoints.down("md")
  );
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
      }}
    >
      <RefreshPrompt refreshData={refreshData} isLoading={loadingData} />
      <LogoButton onFilter={onFilter} refreshData={refreshData} />
      <SearchBar 
        onSearch={onFilter}
      />
      <Grid
        container
        sx={{
          maxWidth: 2160,
          width: "100%",
          display: "flex",
          justifyContent: "center",
          margin: "auto",
          gap: 2,
          marginTop: isMobile ? 3 : 6,
        }}
      >
        {isMobile ? null : (
          <Grid
            item
            sm={10}
            md={10}
            lg={10}
            xl={10}
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              marginBottom: "16px",
            }}
          >
            <Typography
              variant="h1"
              gutterBottom
              sx={{
                fontFamily: inter.style.fontFamily,
                color: theme.palette.primary.main,
                fontWeight: 600,
                fontSize: "2.2rem",
              }}
            >
              💵 Cotizaciones del dólar, euro y real
            </Typography>
            <Typography
              variant="subtitle2"
              sx={{
                fontFamily: inter.style.fontFamily,
                color: theme.palette.primary.main,
                fontWeight: 500,
              }}
            >
              Datos en el momento de las monedas más cotizadas del país
            </Typography>
          </Grid>
        )}
        {(resultadosFiltrados || []).map((moneda: Moneda, index: number) => (
          <Grid
            key={`${moneda?.nombre}-${index}`}
            item
            xs={10}
            sm={6}
            md={5}
            lg={3}
            xl={2}
            container
            sx={{
              marginBottom:
                isMobile && index === (resultadosFiltrados || []).length - 1 ? 2 : 0,
            }}
          >
            <Grid item xs={12} sx={{ marginTop: isMobile ? "1rem" : 0 }}>
              <TitleItem titulo={moneda.nombre} />
              <CardItem
                moneda={moneda.nombre}
                loadingData={loadingData}
                data={[
                  { texto: "Vendé a:", precio: moneda.compra },
                  { texto: "Comprá a:", precio: moneda.venta },
                  { texto: "Promedio:", precio: moneda.promedio },
                ]}
                esRealBrasileño={moneda.nombre === "Real Brasileño"}
                EsEuro={moneda.nombre.split(" ")[0] === "Euro"}
              />
            </Grid>
            <Grid item xs={12}>
              {filterApplied && (
                <Button
                  onClick={() => {
                    onFilter();
                  }}
                  variant="text"
                  size="large"
                  startIcon={<FilterAltOffIcon />}
                  sx={{
                    color: theme.palette.primary.main,
                    fontSize: isMobile ? "18px" : "20px",
                    display: "flex",
                    margin: "auto",
                    marginTop: "0.5rem",
                    minHeight: "44px",
                    padding: "8px 16px",
                    "&:hover": {
                      backgroundColor: `${theme.palette.primary.main}15`,
                    },
                  }}
                >
                  Limpiar Filtro
                </Button>
              )}
            </Grid>
          </Grid>
        ))}
      </Grid>
      <Footer />
    </Box>
  );
}
