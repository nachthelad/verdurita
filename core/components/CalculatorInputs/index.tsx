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

  const handleSwap = () => {
    hapticFeedback.medium();
    const temp = montoDolares;
    setMontoDolares(montoPesos);
    setMontoPesos(temp);
  };

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const valor = e.target.value;
    const valorNormalizado = valor.replace(",", ".");
    const esNumero = /^[0-9]*[.]?[0-9]{0,2}$/.test(valorNormalizado);

    if (esNumero) {
      const nuevoMontoPesos = valorNormalizado || "";
      const montoEnDolares = nuevoMontoPesos
        ? format(Number(nuevoMontoPesos) / precioMoneda, "0,0.00", {
            locale: es,
          })
        : "";
      setMontoPesos(valorNormalizado || "");
      setMontoDolares(montoEnDolares);
    }
  };

  const handleDollarAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const valor = e.target.value;
    const valorNormalizado = valor.replace(",", ".");
    const esNumero = /^[0-9]*[.]?[0-9]{0,2}$/.test(valorNormalizado);

    if (esNumero) {
      const nuevoMontoDolares = valorNormalizado || "";
      const montoEnPesos = nuevoMontoDolares
        ? format(Number(nuevoMontoDolares) * precioMoneda, "0,0.00", {
            locale: es,
          })
        : "";
      setMontoDolares(valorNormalizado || "");
      setMontoPesos(montoEnPesos);
    }
  };

  const isMobile = useMediaQuery((theme: Theme) =>
    theme.breakpoints.down("md")
  );

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
            label={
              esRealBrasileño
                ? "Monto en reales"
                : EsEuro
                ? "Monto en euros"
                : "Monto en dólares"
            }
            inputMode="numeric"
            type={isMobile ? "tel" : "text"}
            variant="outlined"
            value={montoDolares || ""}
            onChange={handleDollarAmountChange}
            onKeyDown={(e) =>
              ["e", "E", "+", "-"].includes(e.key) && e.preventDefault()
            }
            onFocus={(e) => e.target.select()}
          />
        </Grid>
        
        {/* Swap Button */}
        <Grid item xs={12} sm={2} sx={{ 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center',
          minHeight: isMobile ? '20px' : '56px',
        }}>
          <IconButton
            onClick={handleSwap}
            sx={{
              minHeight: '44px',
              minWidth: '44px',
              backgroundColor: 'primary.light',
              color: 'primary.contrastText',
              '&:hover': {
                backgroundColor: 'primary.main',
              },
              transform: isMobile ? 'rotate(90deg)' : 'none',
            }}
          >
            <SwapVertIcon />
          </IconButton>
        </Grid>
        
        <Grid item xs={12} sm={5}>
          <TextField
            margin="dense"
            label="Monto en pesos"
            inputMode="numeric"
            type={isMobile ? "tel" : "text"}
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
    </Box>
  );
};

export default CalculatorInputs;
