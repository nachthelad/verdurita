import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import CurrencyCalculatorButton from "../Calculator";
import { format } from "numerable";
import { es } from "numerable/locale";

type CardItemProps = {
  texto: string;
  precio: number;
  esRealBrasileño?: boolean;
  EsEuroO?: boolean;
  EsEuroB?: boolean;
};

const CardItem = ({
  texto,
  precio,
  esRealBrasileño = false,
  EsEuroO = false,
  EsEuroB = false,
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
        maxWidth: { xs: "100%", sm: "400px" },
        boxShadow: 3,
        marginBottom: "1%",
      }}>
      <CardContent
        sx={{
          display: "flex",
          alignItems: "center",
        }}>
        <div style={{ flex: 1 }}>
          <Typography variant="h5" component="div">
            {texto}
          </Typography>
          <Typography variant="h5" color="text.secondary">
            ${format(precio, "0,0.00", { locale: es })}
          </Typography>
        </div>
        <CurrencyCalculatorButton
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
