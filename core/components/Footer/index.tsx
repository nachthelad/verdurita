/* eslint-disable @next/next/no-img-element */
import React from "react";
import { Box, Typography, Link, Theme, useMediaQuery } from "@mui/material";
import { EXTERNAL_LINKS } from "@/constants";
import { useThemeMode } from "@/contexts/ThemeContext";

const Footer: React.FC = () => {
  const isMobile = useMediaQuery((theme: Theme) =>
    theme.breakpoints.down("md"),
  );
  const { mode } = useThemeMode();

  const cafecitoBtnBase =
    mode === "dark"
      ? EXTERNAL_LINKS.CAFECITO_BUTTON_DARK
      : EXTERNAL_LINKS.CAFECITO_BUTTON_BASE;

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
        <Typography
          variant="body2"
          color="text.primary"
          sx={{ whiteSpace: "nowrap" }}
        >
          Creado por{" "}
          <Link
            href={EXTERNAL_LINKS.GITHUB}
            target="_blank"
            rel="noopener noreferrer"
            sx={{
              color: "primary.main",
              textDecoration: "none",
            }}
          >
            nachthelad
          </Link>
        </Typography>
        <Box>
          <a href={EXTERNAL_LINKS.CAFECITO} rel="noopener" target="_blank">
            <img
              srcSet={`${cafecitoBtnBase}.png 1x, ${cafecitoBtnBase}_2x.png 2x, ${cafecitoBtnBase}_3.75x.png 3.75x`}
              src={`${cafecitoBtnBase}.png`}
              alt="Invitame un café en cafecito.app"
            />
          </a>
        </Box>
      </Box>
    </>
  );
};

export default Footer;
