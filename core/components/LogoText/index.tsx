import { Typography, Button } from "@mui/material";
import { useRouter } from "next/router";
import { kanit } from "@/fonts/fonts";

const LogoButton: React.FC = () => {
  const router = useRouter();

  const handleRefresh = () => {
    router.reload();
  };

  return (
    <Button
      onClick={handleRefresh}
      sx={{
        padding: "10px",
        flexGrow: 1,
        justifyContent: "flex-start",
      }}>
      <Typography
        variant="h6"
        noWrap
        sx={{
          color: "white",
          fontFamily: kanit.style.fontFamily,
          textTransform: "lowercase",
          fontSize: "1.5rem",
        }}>
        verdurita
      </Typography>
    </Button>
  );
};

export default LogoButton;
