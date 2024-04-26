/* eslint-disable @next/next/no-img-element */
import React from "react";
import { Box, Typography, Link, Theme, useMediaQuery } from "@mui/material";
import { theme } from "@/theme/theme";

const Footer: React.FC = () => {
  const isMobile = useMediaQuery((theme: Theme) =>
    theme.breakpoints.down("md")
  );
  return (
    <>
      <Box
        component="footer"
        sx={{
          mt: isMobile ? 1 : 5,
          textAlign: "center",
          mb: isMobile ? 12 : 0,
        }}
      >
        <Typography variant="body2" color="black" sx={{ whiteSpace: "nowrap" }}>
          Creado por{" "}
          <Link
            href="https://github.com/nachthelad"
            target="_blank"
            rel="noopener noreferrer"
            sx={{
              color: theme.palette.primary.main,
              textDecoration: "none",
            }}
          >
            nachthelad
          </Link>
        </Typography>
        <Box>
          <a
            href="https://cafecito.app/nachthelad"
            rel="noopener"
            target="_blank"
          >
            <img
              srcSet="https://cdn.cafecito.app/imgs/buttons/button_1.png 1x, https://cdn.cafecito.app/imgs/buttons/button_1_2x.png 2x, https://cdn.cafecito.app/imgs/buttons/button_1_3.75x.png 3.75x"
              src="https://cdn.cafecito.app/imgs/buttons/button_1.png"
              alt="Invitame un café en cafecito.app"
            />
          </a>
        </Box>
      </Box>
    </>
  );
};

export default Footer;
