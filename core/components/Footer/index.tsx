/* eslint-disable @next/next/no-img-element */
import React from "react";
import { Box, Typography, Link, Theme, useMediaQuery } from "@mui/material";
import { theme } from "@/theme/theme";
import { EXTERNAL_LINKS } from "@/constants";

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
          mb: 0,
          pb: 0,
        }}
      >
        <Typography variant="body2" color="black" sx={{ whiteSpace: "nowrap" }}>
          Creado por{" "}
          <Link
            href={EXTERNAL_LINKS.GITHUB}
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
          <a href={EXTERNAL_LINKS.CAFECITO} rel="noopener" target="_blank">
            <img
              srcSet={`${EXTERNAL_LINKS.CAFECITO_BUTTON_BASE}.png 1x, ${EXTERNAL_LINKS.CAFECITO_BUTTON_BASE}_2x.png 2x, ${EXTERNAL_LINKS.CAFECITO_BUTTON_BASE}_3.75x.png 3.75x`}
              src={`${EXTERNAL_LINKS.CAFECITO_BUTTON_BASE}.png`}
              alt="Invitame un café en cafecito.app"
            />
          </a>
        </Box>
      </Box>
    </>
  );
};

export default Footer;
