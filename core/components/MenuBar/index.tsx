import * as React from "react";
import { styled, alpha } from "@mui/material/styles";
import { Kanit } from "next/font/google";
import { AppBar, Box, Toolbar, Typography, Button } from "@mui/material";
import InputBase from "@mui/material/InputBase";

const kanit = Kanit({
  subsets: ["latin"],
  weight: "400",
});

type SearchAppBarProps = {
  busqueda: string;
  setBusqueda: React.Dispatch<React.SetStateAction<string>>;
  onFilter: (moneda?: string) => void;
};

const monedas = [
  "oficial",
  "blue",
  "bolsa",
  "tarjeta",
  "contado con liqui",
  "mayorista",
  "cripto",
];

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(1),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  width: "100%",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    [theme.breakpoints.up("sm")]: {
      width: "12ch",
      "&:focus": {
        width: "20ch",
      },
    },
  },
}));

export default function SearchAppBar({
  busqueda,
  setBusqueda,
  onFilter,
}: SearchAppBarProps) {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="fixed" style={{ background: "green" }}>
        <Toolbar>
          <Typography
            variant="h6"
            noWrap
            component="div"
            className={kanit.className}
            sx={{
              flexGrow: 1,
              display: { xs: "none", sm: "block" },
            }}
          >
            verdurita
          </Typography>
          {monedas.map((moneda) => (
            <Button
              key={moneda}
              onClick={() => onFilter(moneda)}
              sx={{ color: "white" }}
            >
              {moneda}
            </Button>
          ))}
          <Button
            onClick={() => onFilter()}
            variant="outlined"
            sx={{
              color: "white",
              borderColor: "white",
              "&:hover": {
                borderColor: "white",
                backgroundColor: "white",
                color: "green"
              },
            }}
          >
            {" "}
            Limpiar
          </Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
