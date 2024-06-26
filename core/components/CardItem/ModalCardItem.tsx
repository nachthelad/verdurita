import * as React from "react";
import { Dialog, Card, CardContent, Typography, Box } from "@mui/material";
import { Icon } from "@iconify-icon/react/dist/iconify.mjs";
import { useTheme } from "@mui/material";
import TitleItem from "../TitleItem";
import CalculatorInputs from "../CalculatorInputs";
import ToggleButtons from "./ToggleButtons";

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
  const [selectedValue, setSelectedValue] = React.useState<string | null>(
    "Promedio:"
  );

  const handleToggleChange = (value: string | null) => {
    setSelectedValue(value);
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      fullWidth
      maxWidth="sm"
      PaperProps={{
        style: {
          borderRadius: "20px",
          overflowY: "auto",
        },
      }}
    >
      <Card
        sx={{
          boxShadow: "3",
          position: "relative",
        }}
      >
        <CardContent
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            position: "relative",
          }}
        >
          <Icon
            icon="material-symbols:collapse-content"
            width="2rem"
            height="2rem"
            style={{
              position: "absolute",
              top: "5px",
              right: "5px",
              color: "#0000007e",
              cursor: "pointer",
            }}
            onClick={handleClose}
          />
          <Box sx={{ margin: "auto" }}>
            <TitleItem titulo={moneda} />
            <ToggleButtons onChange={handleToggleChange} />
            {data.map(
              ({ texto }, index) =>
                selectedValue === texto && (
                  <Box
                    key={index}
                    sx={{
                      border: `1px solid ${theme.palette.primary.light} `,
                      padding: "10px",
                      borderRadius: "10px",
                      margin: "10px",
                      paddingTop: "5px",
                      backgroundColor: theme.palette.primary.contrastText,
                    }}
                  >
                    {/*  Vende a: / Compra a: / Promedio: */}
                    <Typography
                      sx={{
                        textAlign: "center",
                        lineHeight: "1.5",
                        fontSize: "1.2rem",
                        color: theme.palette.primary.dark,
                        textTransform: "uppercase",
                      }}
                    >
                      {texto}
                    </Typography>
                    <CalculatorInputs
                      autoFocus
                      precioMoneda={Number(data[index].precio)}
                      esRealBrasileño={esRealBrasileño}
                      EsEuro={EsEuro}
                    />
                  </Box>
                )
            )}
          </Box>
        </CardContent>
      </Card>
    </Dialog>
  );
};

export default ModalCardItem;
