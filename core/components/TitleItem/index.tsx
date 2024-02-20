import React from "react";
import Typography from "@mui/material/Typography";

interface TitleItemProp {
  titulo: string;
}

const TitleItem = ({ titulo }: TitleItemProp) => {
  return (
    <Typography
      variant="h1"
      fontSize="1.5rem"
      component="div"
      sx={{
        textAlign: "center",
        color: "#001100",
      }}>
      {titulo}
    </Typography>
  );
};

export default TitleItem;
