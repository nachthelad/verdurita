import * as React from "react";
import { Dialog, Card, CardContent, Typography, Box } from "@mui/material";
import { Icon } from "@iconify-icon/react/dist/iconify.mjs";
import { useTheme } from "@mui/material";
import TitleItem from "../TitleItem";
import CalculatorInputs from "../CalculatorInputs";

type ModalCardItemProps = {
  open: boolean;
  handleClose: () => void;
  data: { texto: string; precio?: number }[];
  esRealBrasileño?: boolean;
  EsEuro?: boolean;
  loadingData: boolean;
  moneda: string;
};

const ModalCardItem = ({
  open,
  handleClose,
  data,
  esRealBrasileño = false,
  EsEuro = false,
  moneda,
}: ModalCardItemProps) => {
  const theme = useTheme();

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      fullWidth
      maxWidth="sm"
      PaperProps={{
        style: {
          backgroundColor: theme.palette.primary.contrastText,
          borderRadius: "20px",
          overflowY: "auto",
        },
      }}>
      <Card
        sx={{
          boxShadow: "3",
          position: "relative",
        }}>
        <CardContent
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            position: "relative",
          }}>
          <Icon
            icon="typcn:arrow-minimise"
            width="2rem"
            height="2rem"
            style={{
              position: "absolute",
              top: "10px",
              right: "12px",
              color: "#0000007e",
              cursor: "pointer",
            }}
            onClick={handleClose}
          />
          <Box sx={{ margin: "auto" }}>
            <TitleItem titulo={moneda} />
            {data.map(({ texto }, index) => (
              <Box key={index}>
                <Typography
                  variant="h5"
                  component="div"
                  sx={{
                    textAlign: "center",
                  }}>
                  {texto} {/*  Vende a: / Compra a: / Promedio: */}
                </Typography>
                <CalculatorInputs
                  autoFocus={index === 0}
                  precioMoneda={Number(data[index].precio)}
                  esRealBrasileño={esRealBrasileño}
                  EsEuro={EsEuro}
                />
              </Box>
            ))}
          </Box>
        </CardContent>
      </Card>
    </Dialog>
  );
};

export default ModalCardItem;