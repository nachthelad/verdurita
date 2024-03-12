import React, { useState } from "react";
import { TextField, Grid } from "@mui/material";
import { format } from "numerable";
import { es } from "numerable/locale";
import { Theme, useMediaQuery } from "@mui/material";

type CalculatorInputsProps = {
  precioMoneda: number;
  esRealBrasileño?: boolean;
  EsEuro?: boolean;
  autoFocus: boolean;
};

const CalculatorInputs: React.FC<CalculatorInputsProps> = ({
  precioMoneda,
  esRealBrasileño = false,
  EsEuro = false,
}) => {
  const [montoDolares, setMontoDolares] = useState("");
  const [montoPesos, setMontoPesos] = useState("");

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const valor = e.target.value;
    const esNumero = /^[0-9]*$/.test(valor);

    if (esNumero) {
      const nuevoMontoPesos = valor || "";
      const montoEnDolares = nuevoMontoPesos
        ? format(Number(nuevoMontoPesos) / precioMoneda, "0,0.00", {
            locale: es,
          })
        : "";
      setMontoPesos(valor || "");
      setMontoDolares(montoEnDolares);
    }
  };

  const handleDollarAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const valor = e.target.value;
    const esNumero = /^[0-9]*$/.test(valor);

    if (esNumero) {
      const nuevoMontoDolares = valor || "";
      const montoEnPesos = nuevoMontoDolares
        ? format(Number(nuevoMontoDolares) * precioMoneda, "0,0.00", {
            locale: es,
          })
        : "";
      setMontoDolares(valor || "");
      setMontoPesos(montoEnPesos);
    }
  };

  const isMobile = useMediaQuery((theme: Theme) =>
    theme.breakpoints.down("md")
  );

  return (
    <div>
      <Grid
        container
        direction={isMobile ? "column" : "row"}
        spacing={isMobile ? 0 : 1}
        sx={{
          alignContent: "center",
        }}>
        <Grid item>
          <TextField
            autoFocus
            margin="dense"
            label={
              esRealBrasileño
                ? "Monto en reales"
                : EsEuro
                ? "Monto en euros"
                : "Monto en dólares"
            }
            inputMode="numeric"
            type={isMobile ? "tel" : "text"} // Use "tel" type for mobile
            variant="outlined"
            value={montoDolares || ""}
            onChange={handleDollarAmountChange}
            onKeyDown={(e) =>
              ["e", "E", "+", "-"].includes(e.key) && e.preventDefault()
            }
            onFocus={(e) => e.target.select()}
          />
        </Grid>
        <Grid item>
          <TextField
            margin="dense"
            label="Monto en pesos"
            inputMode="numeric"
            type={isMobile ? "tel" : "text"} // Use "tel" type for mobile
            variant="outlined"
            value={montoPesos || ""}
            onChange={handleAmountChange}
            onKeyDown={(e) =>
              ["e", "E", "+", "-"].includes(e.key) && e.preventDefault()
            }
            onFocus={(e) => e.target.select()}
          />
        </Grid>
      </Grid>
    </div>
  );
};

export default CalculatorInputs;
