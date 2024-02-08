import React, { useState } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Box,
} from "@mui/material";
import CalculateIcon from "@mui/icons-material/Calculate";
import { format } from "numerable";
import { es } from "numerable/locale";
import styled from "styled-components";

const StyledDialog = styled(Dialog)`
  .MuiDialog-paper {
    background-color: #f5f5f5;
    border-radius: 10px;
  }
`;

const StyledDialogTitle = styled(DialogTitle)`
  color: #333;
  font-size: 1.5rem;
`;

const StyledTextField = styled(TextField)({
  "& label.Mui-focused": {
    color: "#45a049",
  },
  "& .MuiInput-underline:after": {
    borderBottomColor: "#45a049",
  },
  "& .MuiOutlinedInput-root": {
    "& fieldset": {
      borderColor: "#45a049",
    },
    "&:hover fieldset": {
      borderColor: "#45a049",
    },
    "&.Mui-focused fieldset": {
      borderColor: "#45a049",
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

interface CurrencyCalculatorButtonProps {
  precioMoneda: number;
  tipoOperacion: "venta" | "compra" | "promedio";
  esRealBrasileño?: boolean;
}

const CurrencyCalculatorButton: React.FC<CurrencyCalculatorButtonProps> = ({
  precioMoneda,
  tipoOperacion,
  esRealBrasileño = false,
}) => {
  const [open, setOpen] = useState(false);
  const [montoPesos, setMontoPesos] = useState("0");
  const [montoDolares, setMontoDolares] = useState("0");

  const tituloDialogo =
    tipoOperacion === "venta"
      ? "¿Cuánto querés vender?"
      : tipoOperacion === "compra"
      ? "¿Cuánto querés comprar?"
      : "Compra o vende al precio promedio";

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setMontoPesos("");
    setMontoDolares("");
  };

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const valor = e.target.value;
    const esNumero = /^[0-9]*$/.test(valor);
  
    if (esNumero) {
      const nuevoMontoPesos = valor || "";
      const montoEnDolares = nuevoMontoPesos
        ? format(Number(nuevoMontoPesos) / precioMoneda, "0,0.00", { locale: es })
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
      <Box>
        <CalculateIcon
          fontSize="large"
          style={{ color: "#45a049", cursor: "pointer" }}
          onClick={handleClickOpen}
        />
      </Box>
      <StyledDialog open={open} onClose={handleClose}>
        <StyledDialogTitle>{tituloDialogo}</StyledDialogTitle>
        <DialogContent>
          <StyledTextField
            autoFocus
            margin="dense"
            id="montoDolares"
            label="Monto en dólares"
            type="text"
            fullWidth
            variant="outlined"
            value={montoDolares || ""}
            onChange={handleDollarAmountChange}
            onBlur={formatOnBlurDolares}
            onKeyDown={(e) =>
              ["e", "E", "+", "-"].includes(e.key) && e.preventDefault()
            }
            onFocus={(e) => e.target.select()}
          />
          <StyledTextField
            margin="dense"
            id="cantidad"
            label={esRealBrasileño ? "Monto en reales" : "Monto en pesos"}
            type="text"
            fullWidth
            variant="outlined"
            value={montoPesos || ""}
            onChange={handleAmountChange}
            onBlur={formatOnBlurPesos}
            onKeyDown={(e) =>
              ["e", "E", "+", "-"].includes(e.key) && e.preventDefault()
            }
            onFocus={(e) => e.target.select()}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} style={{ color: "#45a049" }}>
            Cerrar
          </Button>
        </DialogActions>
      </StyledDialog>
    </div>
  );
};

export default CurrencyCalculatorButton;