import { useState, useEffect, useRef } from "react";
import {
  Button,
  DialogTitle,
  DialogActions,
  DialogContent,
  Typography,
  Dialog,
} from "@mui/material";
import { theme } from "@/theme/theme";

type RefreshPromptProps = {
  refreshData: () => void;
};

const RefreshPrompt = ({ refreshData }: RefreshPromptProps) => {
  const [open, setOpen] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (!open && document.visibilityState === "visible") {
      timer.current = setTimeout(() => {
        setOpen(true);
      }, 300000); // 5 minutes
    }
    return () => {
      if (timer.current) {
        clearTimeout(timer.current);
      }
    };
  });

  return (
    <>
      <Dialog
        PaperProps={{
          style: {
            backgroundColor: theme.palette.primary.contrastText,
            borderRadius: "20px",
            overflowY: "auto",
          },
        }}
        open={open}
        onClose={() => setOpen(true)}>
        <DialogTitle>Actualizar datos</DialogTitle>
        <DialogContent>
          <Typography>
            Los datos se actualizaron por última vez hace más de 5 minutos.
            ¿Desea actualizarlos ahora?
          </Typography>
          <DialogActions>
            <Button onClick={() => setOpen(false)}>Cerrar</Button>
            <Button
              variant="contained"
              sx={{ borderRadius: "20px" }}
              onClick={() => {
                refreshData();
                setOpen(false);
              }}>
              Actualizar
            </Button>
          </DialogActions>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default RefreshPrompt;
