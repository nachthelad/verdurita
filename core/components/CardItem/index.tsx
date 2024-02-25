import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import CurrencyCalculatorButton from "../Calculator";
import { format } from "numerable";
import { es } from "numerable/locale";
import Skeleton from "@mui/material/Skeleton";

type CardItemProps = {
  texto: string;
  precio?: number;
  esRealBrasileño?: boolean;
  EsEuroO?: boolean;
  EsEuroB?: boolean;
  loadingData: boolean;
};

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
    <Card
      sx={{
        flexGrow: 1,
        boxShadow: 3,
        marginBottom: "1%",
      }}>
      <CardContent
        sx={{
          display: "flex",
          alignItems: "center",
        }}>
        <div style={{ flex: 1 }}>
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
        </div>
        <CurrencyCalculatorButton
          loadingData={loadingData}
          precioMoneda={Number(precio)}
          tipoOperacion={tipoOperacion as "venta" | "compra" | "promedio"}
          esRealBrasileño={esRealBrasileño}
          EsEuroO={EsEuroO}
          EsEuroB={EsEuroB}
        />
      </CardContent>
    </Card>
  );
};

export default CardItem;
