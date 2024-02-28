import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import CurrencyCalculatorButton from "../Calculator";
import { format } from "numerable";
import { es } from "numerable/locale";
import Skeleton from "@mui/material/Skeleton";
import styled from "styled-components";
import { Box } from "@mui/material";

type CardItemProps = {
  texto: string;
  precio?: number;
  esRealBrasileño?: boolean;
  EsEuroO?: boolean;
  EsEuroB?: boolean;
  loadingData: boolean;
};

const StyledCard = styled(Card)`
  flex-grow: 1;
  border-radius: 20px;
`;

const StyledCardContent = styled(CardContent)`
  display: flex;
  align-items: center;
  padding: 16px;
  border-radius: 20px;
  flex: 10px;
`;

const CardItem = ({
  texto,
  precio,
  esRealBrasileño = false,
  EsEuroO = false,
  EsEuroB = false,
  loadingData,
}: CardItemProps) => {
  let tipoOperacion;
  switch (texto) {
    case "Vendé a:":
      tipoOperacion = "venta";
      break;
    case "Comprá a:":
      tipoOperacion = "compra";
      break;
    case "Promedio:":
      tipoOperacion = "promedio";
      break;
    default:
      tipoOperacion = "";
  }

  return (
    <StyledCard
      sx={{
        boxShadow: 3,
      }}>
      <StyledCardContent>
        <Box sx={{ flex: 1 }}>
          {loadingData ? (
            <Skeleton
              variant="text"
              sx={{ fontSize: "1.5rem", height: 32, width: "30%" }}
            />
          ) : (
            <Typography variant="h5" component="div">
              {texto}
            </Typography>
          )}
          {loadingData ? (
            <Skeleton
              variant="text"
              sx={{ fontSize: "1.5rem", height: 32, width: "35%" }}
            />
          ) : (
            <Typography variant="h5" color="text.secondary">
              ${format(precio, "0,0.00", { locale: es })}
            </Typography>
          )}
        </Box>
        <CurrencyCalculatorButton
          loadingData={loadingData}
          precioMoneda={Number(precio)}
          tipoOperacion={tipoOperacion as "venta" | "compra" | "promedio"}
          esRealBrasileño={esRealBrasileño}
          EsEuroO={EsEuroO}
          EsEuroB={EsEuroB}
        />
      </StyledCardContent>
    </StyledCard>
  );
};

export default CardItem;
