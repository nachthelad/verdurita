import { Typography, Button, Box } from "@mui/material";
import { kanit } from "@/fonts/fonts";
import { useMediaQuery, Theme } from "@mui/material";
import { theme } from "@/theme/theme";

export type LogoButtonProps = {
  refreshData: () => void;
  onFilter: (moneda: string | null) => void;
};

const LogoButton = ({ refreshData, onFilter }: LogoButtonProps) => {
  const handleRefresh = () => {
    refreshData();
    onFilter(null);
  };

  const isMobile = useMediaQuery((theme: Theme) =>
    theme.breakpoints.down("md")
  );

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: isMobile ? "center" : "flex-start",
        flexGrow: 1,
      }}>
      <Button
        onClick={handleRefresh}
        sx={{
          padding: "0",
        }}>
        <Typography
          variant="h6"
          noWrap
          sx={{
            color: isMobile ? theme.palette.primary.main : "white",
            fontFamily: kanit.style.fontFamily,
            textTransform: "lowercase",
            fontSize: isMobile ? "2.5rem" : "1.5rem",
            lineHeight: "1",
            marginTop: isMobile ? "1.5rem" : "0",
          }}>
          verdurita
        </Typography>
      </Button>
      <Typography
        variant="caption"
        sx={{
          color: isMobile ? theme.palette.primary.main : "white",
          whiteSpace: "nowrap",
          fontSize: isMobile ? "1rem" : "0.6rem",
          fontStyle: "italic",
          textTransform: "lowercase",
          userSelect: "none",
        }}>
        by nachthelad
      </Typography>
    </Box>
  );
};

export default LogoButton;
