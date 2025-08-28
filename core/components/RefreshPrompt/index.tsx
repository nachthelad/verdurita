import { useState, useEffect, useRef } from "react";
import {
  Button,
  DialogTitle,
  DialogActions,
  DialogContent,
  Typography,
  Dialog,
  CircularProgress,
  Box,
} from "@mui/material";
import { theme } from "@/theme/theme";

type RefreshPromptProps = {
  refreshData: () => void;
  isLoading?: boolean;
};

const RefreshPrompt = ({ refreshData, isLoading = false }: RefreshPromptProps) => {
  const [open, setOpen] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
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
            <Button 
              onClick={() => setOpen(false)}
              sx={{ minHeight: "44px", minWidth: "80px" }}
            >
              Cerrar
            </Button>
            <Button
              variant="contained"
              disabled={refreshing || isLoading}
              sx={{ 
                borderRadius: "20px",
                minHeight: "44px",
                minWidth: "120px"
              }}
              onClick={async () => {
                setRefreshing(true);
                try {
                  await refreshData();
                } finally {
                  setRefreshing(false);
                  setOpen(false);
                }
              }}>
              {refreshing || isLoading ? (
                <Box display="flex" alignItems="center" gap={1}>
                  <CircularProgress size={20} color="inherit" />
                  <Typography variant="body2">Actualizando...</Typography>
                </Box>
              ) : (
                "Actualizar"
              )}
            </Button>
          </DialogActions>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default RefreshPrompt;
