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
        textAlign: "center",
        color: "#001100",
        fontSize: "1.5rem",
      }}>
      {titulo}
    </Typography>
  );
};

export default TitleItem;
