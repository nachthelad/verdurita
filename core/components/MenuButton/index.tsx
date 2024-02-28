import { useState } from "react";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import { useTheme } from "@mui/material/styles";
import { useMediaQuery, Theme } from "@mui/material";

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
  setSelectedVariant,
}: MenuButtonProps) {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const theme = useTheme();

  const isMobile = useMediaQuery((theme: Theme) =>
    theme.breakpoints.down("md")
  );

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = (variant: string) => {
    setAnchorEl(null);
    setSelectedVariant(variant);
    if (!variant || typeof variant === "object") return;
    onFilter(variant);
  };

  return (
    <div>
      <Button
        id="basic-button"
        aria-controls={open ? "basic-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
        endIcon={isMobile ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
        sx={{
          color: theme.palette.secondary.main,
          fontSize: isMobile ? "20px" : "15px",
        }}>
        {buttonName}
      </Button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}>
        {currencyVariants.map((variant) => (
          <MenuItem
            key={variant}
            onClick={() => handleClose(variant)}
            sx={{ textTransform: "uppercase", fontSize: "15px" }}>
            {variant
              .split(" ")
              .filter(
                (word) =>
                  word.toLowerCase() !== "dólar" &&
                  word.toLowerCase() !== "euro"
              )
              .map((word) => {
                return word.charAt(0).toUpperCase() + word.slice(1);
              })
              .join(" ")}
          </MenuItem>
        ))}
      </Menu>
    </div>
  );
}
