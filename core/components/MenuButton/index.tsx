import { useState } from "react";
import { useTheme } from "@mui/material/styles";
import { useMediaQuery, Theme } from "@mui/material";
import Button from "@mui/material/Button";
import CurrencyModal from "@/core/components/CurrencyModal";

type MenuButtonProps = {
  currencyVariants: string[];
  buttonName: string | React.ReactNode;
  onFilter: (moneda: string | null) => void;
  refreshData: () => void;
  expandAppBar: () => void;
  expanded: boolean;
};

export default function MenuButton({
  currencyVariants,
  buttonName,
  onFilter,
  expandAppBar,
  expanded,
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
        onClick={() => {
          isMobile && expandAppBar();
          !isMobile && handleClickOpen();
        }}
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
        open={open && !expanded}
        onClose={handleClose}
        currencyVariants={currencyVariants}
        onFilter={onFilter}
      />
    </div>
  );
}
