import React from "react";
import Typography from "@mui/material/Typography";
import { theme } from "@/theme/theme";
import { Theme, useMediaQuery } from "@mui/material";

type TitleItemProp = {
  titulo: string;
};

const TitleItem = ({ titulo }: TitleItemProp) => {
  const isMobile = useMediaQuery((theme: Theme) =>
    theme.breakpoints.down("md")
  );
  return (
    <Typography
      sx={{
        textAlign: "center",
        color: theme.palette.primary.main,
        fontSize: isMobile ? "2rem" : "1.5rem",
        fontWeight: "600",
        textTransform: "uppercase",
      }}>
      {titulo === "Dólar Contado con liquidación"
        ? "Dólar CCL"
        : titulo && titulo === "Dólar Bolsa"
        ? "Dólar MEP / Bolsa"
        : titulo}
    </Typography>
  );
};

export default TitleItem;
