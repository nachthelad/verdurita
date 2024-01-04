import { Button } from '@mui/material';
import React from 'react';

type BotonMonedasProps = {
    onFilter: (moneda?: string) => void;
    moneda: string;
  };

export const MonedaButton: React.FC<BotonMonedasProps> = ({ moneda, onFilter }) => (
    <Button
      key={moneda}
      onClick={() => onFilter(moneda)}
      sx={{ color: 'white', display: 'block', margin: '5px 0' }}
    >
      {moneda}
    </Button>
  );
  
  