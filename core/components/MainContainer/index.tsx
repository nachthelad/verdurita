import { Box, Grid } from "@mui/material";
import CardItem from "@/core/components/CardItem";
import TitleItem from "@/core/components/TitleItem";
import { Moneda } from "@/types/moneda";
import LogoButton from "@/core/components/LogoButton";
import Button from "@mui/material/Button";
import { theme } from "@/theme/theme";
import FilterAltOffIcon from "@mui/icons-material/FilterAltOff";

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
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        px: 4,
      }}>
      <LogoButton onFilter={onFilter} refreshData={refreshData} />
      <Grid
        container
        spacing={2}
        sx={{
          maxWidth: 1440,
          width: "100%",
          display: "flex",
          justifyContent: "center",
          margin: "auto",
          marginTop: 4,
          gap: 1,
        }}>
        {resultadosFiltrados.map((moneda: Moneda, index: number) => (
          <Grid
            key={`${moneda?.nombre}-${index}`}
            item
            xs={10}
            sm={6}
            md={4}
            lg={3}>
            <Grid container spacing={2}>
              <Grid item xs={12} sx={{ whiteSpace: "nowrap" }}>
                <TitleItem titulo={moneda.nombre} />
              </Grid>
              <Grid item xs={12}>
                <CardItem
                  moneda={moneda.nombre}
                  loadingData={loadingData}
                  data={[
                    { texto: "Vendé a:\u00A0", precio: moneda.compra },
                    { texto: "Comprá a:\u00A0", precio: moneda.venta },
                    { texto: "Promedio:\u00A0", precio: moneda.promedio },
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
                      fontSize: "20px",
                      display: "flex",
                      margin: "auto",
                      backgroundColor: theme.palette.primary.contrastText,
                      "&:hover": {
                        backgroundColor: theme.palette.primary.contrastText,
                      },
                    }}>
                    Limpiar Filtro
                  </Button>
                )}
              </Grid>
            </Grid>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
