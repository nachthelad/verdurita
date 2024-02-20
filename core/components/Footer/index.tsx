import React from "react";
import { Box, Typography, Link } from "@mui/material";

const Footer: React.FC = () => {
  return (
    <Box component="footer" sx={{ padding: 1, textAlign: "center" }}>
      <Typography variant="body2" color="black" sx={{ whiteSpace: "nowrap" }}>
        Creado por{" "}
        <Link
          href="https://nachthelad.com.ar"
          target="_blank"
          rel="noopener noreferrer"
          sx={{
            color: "black",
            textDecoration: "none",
          }}>
          nachthelad.com.ar
        </Link>
      </Typography>
    </Box>
  );
};

export default Footer;
