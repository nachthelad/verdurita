import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import CurrencyCalculatorButton from "../Calculator";
import { format } from "numerable";
import { es } from 'numerable/locale';

interface CardItemProps {
  texto: string;
  precio: number;
  esRealBrasileño?: boolean;
}

const CardItem = ({ texto, precio, esRealBrasileño = false  }: CardItemProps) => {
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
        maxWidth: { xs: "100%", sm: "450px" },
        minWidth: 180,
        mx: 0,
        boxShadow: 3,
      }}
    >
      <CardContent sx={{ padding: 2, display: "flex", alignItems: "center" }}>
        <div style={{ flex: 1 }}>
          <Typography variant="h5" component="div">
            {texto}
          </Typography>
          <Typography variant="h5" color="text.secondary">
            ${format(precio, '0,0.00', { locale: es })}
          </Typography>
        </div>
        <CurrencyCalculatorButton
          precioMoneda={Number(precio)}
          tipoOperacion={tipoOperacion as "venta" | "compra" | "promedio"}
          esRealBrasileño={esRealBrasileño} 
        />
      </CardContent>
    </Card>
  );
};

export default CardItem;
