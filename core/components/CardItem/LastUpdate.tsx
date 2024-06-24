import { Typography, Skeleton } from "@mui/material";

type LastUpdateProps = {
  loadingData: boolean;
};

const LastUpdate = ({ loadingData }: LastUpdateProps) => {
  const date = new Date();
  const time = date.toLocaleTimeString("es-AR", {
    hour: "2-digit",
    minute: "2-digit",
  });
  const lastUpdate = date.toLocaleString("es-AR", {
    day: "2-digit",
    month: "short",
  });

  return (
    <div>
      <Typography
        variant="caption"
        color="text.secondary"
        sx={{
          display: "flex",
          justifyContent: "center",
          fontSize: "0.8rem",
          marginTop: "0.5rem",
        }}
      >
        Última actualización:{" "}
        {loadingData ? (
          <Skeleton
            sx={{
              width: "110px",
              marginLeft: "5px",
            }}
          />
        ) : (
          lastUpdate + " - " + time
        )}
      </Typography>
    </div>
  );
};

export default LastUpdate;
