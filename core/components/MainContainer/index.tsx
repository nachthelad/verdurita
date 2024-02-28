import { Box, Grid } from "@mui/material";
import CardItem from "@/core/components/CardItem";
import TitleItem from "@/core/components/TitleItem";
import { Moneda } from "@/types/moneda";
import LogoButton from "@/core/components/LogoButton";
import { useMediaQuery, Theme } from "@mui/material";
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
  const isMobile = useMediaQuery((theme: Theme) =>
    theme.breakpoints.down("md")
  );

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        px: 4,
      }}>
      <LogoButton onFilter={onFilter} refreshData={refreshData} />
      {resultadosFiltrados.map((moneda: Moneda, index: number) => (
        <Grid
          key={`${moneda?.nombre}-${index}`}
          container
          spacing={2}
          sx={{
            maxWidth: 1440,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            marginBottom:
              isMobile && index === resultadosFiltrados.length - 1 ? 10 : 2,
          }}>
          <Grid
            item
            xs={12}
            sx={{
              marginTop: isMobile ? "1rem" : index === 0 ? "3rem" : undefined,
            }}>
            <TitleItem titulo={moneda.nombre} />
          </Grid>
          <Grid
            item
            xs={12}
            sm={7}
            md={4}
            lg={4}
            sx={{
              display: "flex",
              justifyContent: "center",
            }}>
            <CardItem
              loadingData={loadingData}
              texto={"Vendé a:"}
              precio={moneda.compra}
              esRealBrasileño={moneda.nombre === "Real Brasileño"}
              EsEuroO={moneda.nombre === "Euro Oficial"}
              EsEuroB={moneda.nombre === "Euro Blue"}
            />
          </Grid>
          <Grid
            item
            xs={12}
            sm={7}
            md={4}
            lg={4}
            sx={{
              display: "flex",
              justifyContent: "center",
            }}>
            <CardItem
              loadingData={loadingData}
              texto={"Comprá a:"}
              precio={moneda.venta}
              esRealBrasileño={moneda.nombre === "Real Brasileño"}
              EsEuroO={moneda.nombre === "Euro Oficial"}
              EsEuroB={moneda.nombre === "Euro Blue"}
            />
          </Grid>
          <Grid
            item
            xs={12}
            sm={7}
            md={4}
            lg={4}
            sx={{
              display: "flex",
              justifyContent: "center",
            }}>
            <CardItem
              loadingData={loadingData}
              texto={"Promedio:"}
              precio={moneda.promedio}
              esRealBrasileño={moneda.nombre === "Real Brasileño"}
              EsEuroO={moneda.nombre === "Euro Oficial"}
              EsEuroB={moneda.nombre === "Euro Blue"}
            />
          </Grid>
          <Grid
            item
            xs={12}
            sx={{
              display: "flex",
              justifyContent: "center",
              flexDirection: "column",
              alignItems: "center",
            }}>
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
                  // marginTop: 2,
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
      ))}
    </Box>
  );
}
