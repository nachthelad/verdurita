import * as React from "react";
import { styled, alpha, useTheme, ThemeProvider, createTheme } from "@mui/material/styles";
import { Kanit } from "next/font/google";
import { AppBar, Box, Toolbar, Typography, Button, IconButton, Drawer, useMediaQuery } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import InputBase from "@mui/material/InputBase";

const kanit = Kanit({
  subsets: ["latin"],
  weight: "400",
});

type SearchAppBarProps = {
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

  // const theme = createTheme({
  // palette: {
  //   primary: {
  //     main: '#5cbd00',
  //   },
  // },
  // });

export default function SearchAppBar({ onFilter }: SearchAppBarProps) {
  const [drawerOpen, setDrawerOpen] = React.useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const handleDrawerToggle = () => {
    setDrawerOpen(!drawerOpen);
  }

  console.log(theme)

  const drawer = (
    <Box
      onClick={handleDrawerToggle}
      sx={{
        textAlign: 'center',
        backgroundColor: 'green', 
        height: '100%' 
      }}
    >
      <Typography
        variant="h6"
        noWrap
        component="div"
        sx={{
          flexGrow: 1,
          color: 'white',
          padding: '10px' 
        }}
      >
        verdurita
      </Typography>
      {monedas.map((moneda) => (
        <Button
          key={moneda}
          onClick={() => onFilter(moneda)}
          sx={{ color: 'white', display: 'block', margin: '5px 0' }} 
        >
          {moneda}
        </Button>
      ))}
    </Box>
  );
  
  return (
    <ThemeProvider theme={theme}>
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="fixed" style={{ background: "green" }}>
        <Toolbar>
        <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
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
          {isMobile ? null : monedas.map((moneda) => (
            <Button
              key={moneda}
              onClick={() => onFilter(moneda)}
              sx={{ color: 'white' }}
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
            Todas
          </Button>
        </Toolbar>
      </AppBar>
      <Drawer
        anchor='left'
        open={drawerOpen}
        onClose={handleDrawerToggle}
      >
        {drawer}
      </Drawer>
    </Box>
    </ThemeProvider>
  );
}
