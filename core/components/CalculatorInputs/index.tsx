import React, { useState } from "react";
import { TextField, Grid } from "@mui/material";
import { format } from "numerable";
import { es } from "numerable/locale";
import { theme } from "@/theme/theme";
import styled from "styled-components";

const StyledTextField = styled(TextField)({
  "& label.Mui-focused": {
    color: theme.palette.primary.main,
  },
  "& .MuiInput-underline:after": {
    borderBottomColor: theme.palette.primary.main,
  },
  "& .MuiOutlinedInput-root": {
    "& fieldset": {
      borderColor: theme.palette.primary.main,
    },
    "&:hover fieldset": {
      borderColor: theme.palette.primary.main,
    },
    "&.Mui-focused fieldset": {
      borderColor: theme.palette.primary.main,
    },
  },
  "& input::-webkit-outer-spin-button, & input::-webkit-inner-spin-button": {
    "-webkit-appearance": "none",
    margin: 0,
  },
  '& input[type="number"]': {
    "-moz-appearance": "textfield",
  },
});

type CalculatorInputsProps = {
  precioMoneda: number;
  esRealBrasileño?: boolean;
  EsEuro?: boolean;
};

const CalculatorInputs: React.FC<CalculatorInputsProps> = ({
  precioMoneda,
  esRealBrasileño = false,
  EsEuro = false,
}) => {
  const [montoPesos, setMontoPesos] = useState("1");
  const [montoDolares, setMontoDolares] = useState("1");

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

  const formatOnBlurPesos = () => {
    const formattedValue = format(Number(montoPesos) / precioMoneda, "0,0.00", {
      locale: es,
    });
    setMontoDolares(formattedValue);
  };

  const formatOnBlurDolares = () => {
    const formattedValue = format(
      Number(montoDolares) * precioMoneda,
      "0,0.00",
      { locale: es }
    );
    setMontoPesos(formattedValue);
  };

  return (
    <div>
      <Grid container direction={"row"} spacing={2}>
        <Grid item>
          <StyledTextField
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
            variant="outlined"
            value={montoDolares || ""}
            onChange={handleDollarAmountChange}
            onBlur={formatOnBlurDolares}
            onKeyDown={(e) =>
              ["e", "E", "+", "-"].includes(e.key) && e.preventDefault()
            }
            onFocus={(e) => e.target.select()}
          />
        </Grid>
        <Grid item>
          <StyledTextField
            margin="dense"
            label="Monto en pesos"
            inputMode="numeric"
            variant="outlined"
            value={montoPesos || ""}
            onChange={handleAmountChange}
            onBlur={formatOnBlurPesos}
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
