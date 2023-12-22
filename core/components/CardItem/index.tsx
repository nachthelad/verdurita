import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';

interface CardItemProps {
  texto: string;
  precio: number;
}

const CardItem = ({texto, precio}: CardItemProps) => {
  return (
    <Card sx={{ minWidth: 275  }}>
      <CardContent>
        <Typography variant="h5" component="div">
          {texto}
        </Typography>
        <Typography variant="h5" color="text.secondary">
        ${precio.toFixed(2).replace('.', ',')}
        </Typography>
      </CardContent>
    </Card>
  )
}

export default CardItem