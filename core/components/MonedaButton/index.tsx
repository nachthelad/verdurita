import React from "react";
import { ToggleButton } from "@mui/material";

type BotonMonedasProps = {
  onFilter: (moneda: string) => void;
  moneda: string;
  selected?: boolean;
  isFirst: boolean;
  isLast: boolean;
};

export const MonedaButton: React.FC<BotonMonedasProps> = ({
  moneda,
  onFilter,
  selected,
  isFirst,
  isLast,
}) => (
  <ToggleButton
    key={moneda}
    value={moneda}
    selected={selected}
    onChange={() => onFilter(moneda)}
    sx={{
      color: "white",
      display: "block",
      margin: "5px 0",
      border: "1px solid rgba(255, 255, 255, 0.12)", 
      borderRadius: isFirst ? "4px 0 0 4px" : isLast ? "0 4px 4px 0" : "0",
      "&.Mui-selected": {
        backgroundColor: "white", 
        color: "#008000", 
        "&:hover": {
          backgroundColor: "white", 
          color: "#008000", 
        },
      },
      "&:hover": {
        backgroundColor: "rgba(255, 255, 255, 0.08)", 
      },
    }}
  >
    {moneda}
  </ToggleButton>
);