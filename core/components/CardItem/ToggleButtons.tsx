import * as React from "react";
import { Typography, ToggleButtonGroup, ToggleButton } from "@mui/material";

type ToggleButtonsProps = {
  onChange: (value: string | null) => void;
};

export default function ToggleButtons({ onChange }: ToggleButtonsProps) {
  const [value, setValue] = React.useState<string | null>("Promedio:");

  const handleValue = (
    _event: React.MouseEvent<HTMLElement>,
    newValue: string | null
  ) => {
    setValue(newValue);
    onChange(newValue);
  };

  return (
    <ToggleButtonGroup
      sx={{ display: "flex", justifyContent: "center", alignContent: "center" }}
      value={value}
      exclusive
      onChange={handleValue}>
      <ToggleButton value="Vendé a:" aria-label="vende">
        <Typography sx={{ fontSize: "0.9rem" }}>Vendé</Typography>
      </ToggleButton>
      <ToggleButton value="Comprá a:" aria-label="compra">
        <Typography sx={{ fontSize: "0.9rem" }}>Comprá</Typography>
      </ToggleButton>
      <ToggleButton value="Promedio:" aria-label="promedio">
        <Typography sx={{ fontSize: "0.9rem" }}>Promedio</Typography>
      </ToggleButton>
    </ToggleButtonGroup>
  );
}
