import { useState } from "react";
import Button from "@mui/material/Button";
import { useTheme } from "@mui/material/styles";
import { useMediaQuery, Theme } from "@mui/material";
import CurrencyModal from "@/core/components/CurrencyModal";

type MenuButtonProps = {
  currencyVariants: string[];
  buttonName: string;
  onFilter: (moneda: string | null) => void;
  refreshData: () => void;
  setSelectedVariant: (variant: string) => void;
};

export default function MenuButton({
  currencyVariants,
  buttonName,
  onFilter,
}: MenuButtonProps) {
  const theme = useTheme();
  const [open, setOpen] = useState(false);

  const isMobile = useMediaQuery((theme: Theme) =>
    theme.breakpoints.down("md")
  );

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Button
        id="basic-button"
        aria-haspopup="true"
        onClick={handleClickOpen}
        sx={{
          color: theme.palette.primary.contrastText,
          backgroundColor: theme.palette.secondary.main,
          borderRadius: "2rem",
          paddingX: "1.5rem",
          paddingY: "0.3rem",
          fontSize: isMobile ? "20px" : "15px",
        }}>
        {buttonName}
      </Button>
      <CurrencyModal
        open={open}
        onClose={handleClose}
        currencyVariants={currencyVariants}
        onFilter={onFilter}
      />
    </div>
  );
}
