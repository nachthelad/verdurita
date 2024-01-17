import React from "react";
import { Box, Typography, Link } from "@mui/material";

const Footer: React.FC = () => {
  return (
    <Box component="footer" sx={{ padding: 2, textAlign: "center" }}>
      <Typography variant="body2" color="white" sx={{ whiteSpace:'nowrap' }}>
        Copyright ©{" "}
        <Link
          href="https://nachthelad.com.ar"
          target="_blank"
          rel="noopener noreferrer"
          sx={{
            color: "white", 
            textDecoration: "none", 
          }}
        >
          nachthelad.com.ar
        </Link>
      </Typography>
    </Box>
  );
};

export default Footer;
