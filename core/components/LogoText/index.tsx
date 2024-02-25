import { Typography, Button, Box } from "@mui/material";
import { kanit } from "@/fonts/fonts";
import { useState } from "react";

export type LogoButtonProps = {
  refreshData: () => void;
  setSelectedMoneda: (moneda: string | null) => void;
};

const LogoButton = ({ refreshData, setSelectedMoneda }: LogoButtonProps) => {
  const [refresh, setRefresh] = useState(false);

  const handleRefresh = () => {
    refreshData();
    setSelectedMoneda(null);
  };

  //   if (refresh) {
  //     return <Home />;
  //   }

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
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
            color: "white",
            fontFamily: kanit.style.fontFamily,
            textTransform: "lowercase",
            fontSize: "1.5rem",
            lineHeight: "1.2",
          }}>
          verdurita
        </Typography>
      </Button>
      <Typography
        variant="caption"
        sx={{
          whiteSpace: "nowrap",
          color: "white",
          fontSize: "0.6rem",
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
