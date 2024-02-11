import React from "react";
import { Checkbox, FormGroup, FormControlLabel } from "@mui/material";

type MonedaCheckboxProps = {
  onFilter: (moneda?: string) => void; 
  moneda: string;
  checked: boolean; 
};

export const MonedaCheckbox: React.FC<MonedaCheckboxProps> = ({
  moneda,
  onFilter,
}) => (
  <FormGroup>
    <FormControlLabel
      control={
        <Checkbox 
          onChange={(event) => event.target.checked ? onFilter(moneda) : onFilter()} 
          name={moneda} 
        />
      }
      label={moneda}
    />
  </FormGroup>
);