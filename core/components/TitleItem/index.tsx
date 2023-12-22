import React from "react";
import Typography from "@mui/material/Typography";

interface TitleItemProp {
  titulo: string;
}

const titleItem = ({ titulo }: TitleItemProp) => {
  return (
    <Typography 
      variant="h5" 
      component="div"
      sx={{ 
        mt: 2,
        mb: -1
      }}
    >
      {titulo}
    </Typography>
  );
}

export default titleItem;
