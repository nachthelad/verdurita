import React, { useState } from "react";
import { TextField, Grid, IconButton, Box } from "@mui/material";
import SwapVertIcon from "@mui/icons-material/SwapVert";
import { format } from "numerable";
import { es } from "numerable/locale";
import { Theme, useMediaQuery } from "@mui/material";
import { hapticFeedback } from "@/utils/haptics";

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
  const [isSwapped, setIsSwapped] = useState(false);

  const handleSwap = () => {
    hapticFeedback.medium();
    const temp = montoDolares;
    setMontoDolares(montoPesos);
    setMontoPesos(temp);
    setIsSwapped(!isSwapped);
  };

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const valor = e.target.value;
    const valorNormalizado = valor.replace(",", ".");
    const esNumero = /^[0-9]*[.]?[0-9]{0,2}$/.test(valorNormalizado);

    if (esNumero) {
      if (isSwapped) {
        // When swapped: first input is pesos, calculate dollars for second input
        const nuevoMontoPesos = valorNormalizado || "";
        const montoEnDolares = nuevoMontoPesos
          ? format(Number(nuevoMontoPesos) / precioMoneda, "0,0.00", {
              locale: es,
            })
          : "";
        setMontoDolares(valorNormalizado || "");
        setMontoPesos(montoEnDolares);
      } else {
        // Normal state: second input is pesos, calculate dollars for first input
        const nuevoMontoPesos = valorNormalizado || "";
        const montoEnDolares = nuevoMontoPesos
          ? format(Number(nuevoMontoPesos) / precioMoneda, "0,0.00", {
              locale: es,
            })
          : "";
        setMontoPesos(valorNormalizado || "");
        setMontoDolares(montoEnDolares);
      }
    }
  };

  const handleDollarAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const valor = e.target.value;
    const valorNormalizado = valor.replace(",", ".");
    const esNumero = /^[0-9]*[.]?[0-9]{0,2}$/.test(valorNormalizado);

    if (esNumero) {
      if (isSwapped) {
        // When swapped: second input is dollars, calculate pesos for first input
        const nuevoMontoDolares = valorNormalizado || "";
        const montoEnPesos = nuevoMontoDolares
          ? format(Number(nuevoMontoDolares) * precioMoneda, "0,0.00", {
              locale: es,
            })
          : "";
        setMontoPesos(valorNormalizado || "");
        setMontoDolares(montoEnPesos);
      } else {
        // Normal state: first input is dollars, calculate pesos for second input
        const nuevoMontoDolares = valorNormalizado || "";
        const montoEnPesos = nuevoMontoDolares
          ? format(Number(nuevoMontoDolares) * precioMoneda, "0,0.00", {
              locale: es,
            })
          : "";
        setMontoDolares(valorNormalizado || "");
        setMontoPesos(montoEnPesos);
      }
    }
  };

  const isMobile = useMediaQuery((theme: Theme) =>
    theme.breakpoints.down("md")
  );

  // Dynamic labels based on currency type and swap state
  const getCurrencyLabel = () => {
    if (esRealBrasileño) return { currency: "reales", peso: "pesos" };
    if (EsEuro) return { currency: "euros", peso: "pesos" };
    return { currency: "dólares", peso: "pesos" };
  };

  const labels = getCurrencyLabel();
  const firstInputLabel = isSwapped ? `Monto en ${labels.peso}` : `Monto en ${labels.currency}`;
  const secondInputLabel = isSwapped ? `Monto en ${labels.currency}` : `Monto en ${labels.peso}`;

  return (
    <Box>
      <Grid
        container
        direction={isMobile ? "column" : "row"}
        spacing={isMobile ? 0 : 1}
        sx={{
          alignContent: "center",
          position: "relative",
        }}
      >
        <Grid item xs={12} sm={5}>
          <TextField
            autoFocus
            margin="dense"
            label={firstInputLabel}
            inputMode="numeric"
            type={isMobile ? "tel" : "text"}
            variant="outlined"
            value={montoDolares || ""}
            onChange={isSwapped ? handleAmountChange : handleDollarAmountChange}
            onKeyDown={(e) =>
              ["e", "E", "+", "-"].includes(e.key) && e.preventDefault()
            }
            onFocus={(e) => e.target.select()}
          />
        </Grid>

        {/* Swap Button */}
        <Grid
          item
          xs={12}
          sm={2}
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            minHeight: isMobile ? "20px" : "56px",
          }}
        >
          <IconButton
            onClick={handleSwap}
            sx={{
              minHeight: "44px",
              minWidth: "44px",
              backgroundColor: "primary.light",
              color: "primary.contrastText",
              "&:hover": {
                backgroundColor: "primary.main",
              },
              transform: "rotate(90deg)",
            }}
          >
            <SwapVertIcon />
          </IconButton>
        </Grid>

        <Grid item xs={12} sm={5}>
          <TextField
            margin="dense"
            label={secondInputLabel}
            inputMode="numeric"
            type={isMobile ? "tel" : "text"}
            variant="outlined"
            value={montoPesos || ""}
            onChange={isSwapped ? handleDollarAmountChange : handleAmountChange}
            onKeyDown={(e) =>
              ["e", "E", "+", "-"].includes(e.key) && e.preventDefault()
            }
            onFocus={(e) => e.target.select()}
          />
        </Grid>
      </Grid>
    </Box>
  );
};

export default CalculatorInputs;
