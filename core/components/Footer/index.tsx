import React from "react";
import { Box, Typography, Link } from "@mui/material";

const Footer: React.FC = () => {
  return (
    <Box component="footer" sx={{ padding: 2, textAlign: "center" }}>
      <Typography variant="body2" color="white">
        Copyright ©{" "}
        <Link
          href="https://nachthelad.com.ar"
          target="_blank"
          rel="noopener noreferrer"
          sx={{
            color: "white", // Cambia el color del texto a blanco
            textDecoration: "none", // Elimina el subrayado
          }}
        >
          nachthelad.com.ar
        </Link>
      </Typography>
    </Box>
  );
};

export default Footer;
