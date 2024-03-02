import React from "react";
import Typography from "@mui/material/Typography";

type TitleItemProp = {
  titulo: string;
};

const TitleItem = ({ titulo }: TitleItemProp) => {
  return (
    <Typography
      variant="h1"
      component="div"
      sx={{
        // textAlign: "center",
        display: "flex",
        justifyContent: "center",
        color: "#001100",
        fontSize: "1.5rem",
        fontWeight: "500",
        textTransform: "uppercase",
      }}>
      {titulo === "Dólar Contado con liquidación" ? "Dólar CCL" : titulo}
    </Typography>
  );
};

export default TitleItem;
