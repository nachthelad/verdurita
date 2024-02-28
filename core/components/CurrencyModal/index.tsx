import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import styled from "styled-components";
import { TransitionProps } from "@mui/material/transitions";
import { theme } from "@/theme/theme";

type CurrencyModalProps = {
  open: boolean;
  onClose: () => void;
  currencyVariants: string[];
  onFilter: (moneda: string | null) => void;
};

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const CurrencyText = styled.span`
  color: "black";
  font-weight: bold;
`;

export default function CurrencyModal({
  open,
  onClose,
  currencyVariants,
  onFilter,
}: CurrencyModalProps) {
  const currency = currencyVariants[0].split(" ")[0];

  return (
    <>
      <Dialog
        PaperProps={{
          style: {
            backgroundColor: theme.palette.primary.contrastText,
            borderRadius: "20px",
            maxHeight: "90vh",
            overflowY: "auto",
          },
        }}
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={onClose}
        aria-describedby="alert-dialog-slide-description">
        <Box>
          <DialogTitle>
            <Typography
              variant="h5"
              sx={{
                textAlign: "center",
              }}>
              {`Seleccioná el`}
              <CurrencyText> {currency} </CurrencyText>
              {`que queres filtrar`}
            </Typography>
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-slide-description">
              {currencyVariants.map((variant) => (
                <Button
                  key={variant}
                  onClick={() => {
                    onFilter(variant);
                    onClose();
                  }}
                  variant="contained"
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                    fontSize: "1rem",
                    marginY: "10px",
                    width: "100%",
                    backgroundColor: theme.palette.secondary.main,
                    borderRadius: "2rem",
                    paddingX: "1.5rem",
                    paddingY: "0.3rem",
                  }}>
                  {variant.split(" ").slice(1).join(" ")}
                </Button>
              ))}
            </DialogContentText>
          </DialogContent>
        </Box>
      </Dialog>
    </>
  );
}
