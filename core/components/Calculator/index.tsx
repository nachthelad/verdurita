import React, { useState } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";
import CalculateIcon from "@mui/icons-material/Calculate";
import { format } from "numerable";
import { es } from "numerable/locale";
import styled from "styled-components";
import { theme } from "@/theme/theme";

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

interface CurrencyCalculatorButtonProps {
  precioMoneda: number;
  tipoOperacion: "venta" | "compra" | "promedio";
  esRealBrasileño?: boolean;
  EsEuroO?: boolean;
  EsEuroB?: boolean;
  loadingData: boolean;
}

const CurrencyCalculatorButton: React.FC<CurrencyCalculatorButtonProps> = ({
  precioMoneda,
  tipoOperacion,
  esRealBrasileño = false,
  EsEuroO = false,
  EsEuroB = false,
  loadingData,
}) => {
  const [open, setOpen] = useState(false);
  const [montoPesos, setMontoPesos] = useState("0");
  const [montoDolares, setMontoDolares] = useState("0");

  const tituloDialogo =
    tipoOperacion === "venta"
      ? "¿Cuánto querés vender?"
      : tipoOperacion === "compra"
      ? "¿Cuánto querés comprar?"
      : "Cambiá al precio promedio";

  const handleClickOpen = () => {
    if (loadingData) return;
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
      <CalculateIcon
        fontSize="large"
        style={{
          color: theme.palette.primary.main,
          cursor: "pointer",
          marginTop: "10px",
        }}
        onClick={handleClickOpen}
      />
      <Dialog
        open={open}
        onClose={handleClose}
        PaperProps={{
          style: {
            backgroundColor: theme.palette.primary.contrastText,
            borderRadius: "20px",
            maxHeight: "90vh",
            overflowY: "auto",
          },
        }}>
        <DialogTitle
          sx={{
            color: "black",
            fontSize: "1.5rem",
          }}>
          {tituloDialogo}
        </DialogTitle>
        <DialogContent>
          <StyledTextField
            autoFocus
            margin="dense"
            id="montoDolares"
            label={
              esRealBrasileño
                ? "Monto en reales"
                : EsEuroB
                ? "Monto en euro blue"
                : EsEuroO
                ? "Monto en euro oficial"
                : "Monto en dólares"
            }
            type="tel"
            inputMode="numeric"
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
            label="Monto en pesos"
            type="tel"
            inputMode="numeric"
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
          <Button
            onClick={handleClose}
            style={{ color: theme.palette.primary.main }}>
            Cerrar
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default CurrencyCalculatorButton;
