import * as React from "react";
const { memo, useState, useCallback } = React;
import { Card, CardContent, Typography, Box, Skeleton } from "@mui/material";
import dynamic from "next/dynamic";

const ModalCardItem = dynamic(() => import("./ModalCardItem"), {
  ssr: false,
  loading: () => null
});
import { format } from "numerable";
import { Icon } from "@iconify-icon/react/dist/iconify.mjs";
import { theme } from "@/theme/theme";
import { useMediaQuery, Theme } from "@mui/material";
import LastUpdate from "./LastUpdate";
import { hapticFeedback } from "@/utils/haptics";

type CardItemProps = {
  data: { texto: string; precio?: number }[];
  esRealBrasileño?: boolean;
  EsEuro?: boolean;
  loadingData: boolean;
  moneda: string;
};

const CardItem = memo(({
  data,
  esRealBrasileño = false,
  EsEuro = false,
  loadingData,
  moneda,
}: CardItemProps) => {
  const [open, setOpen] = useState(false);

  const handleExpandClick = useCallback(() => {
    hapticFeedback.medium();
    setOpen((prevOpen) => !prevOpen);
  }, []);

  const handleClose = useCallback(() => {
    hapticFeedback.light();
    setOpen(false);
  }, []);

  const isMobile = useMediaQuery((theme: Theme) =>
    theme.breakpoints.down("sm")
  );

  return (
    <div>
      <Card
        sx={{
          borderRadius: "20px",
          boxShadow: "3",
        }}
      >
        <CardContent
          sx={{
            display: "flex",
            flexDirection: "column",
            position: "relative",
            paddingBottom: "16px !important",
            cursor: "pointer",
          }}
          onClick={handleExpandClick}
        >
          <Icon
            icon="material-symbols:expand-content"
            width="2rem"
            height="2rem"
            style={{
              position: "absolute",
              top: "5px",
              right: "5px",
              color: "#0000007e",
            }}
          />
          {data.map(({ texto, precio }, index) => (
            <Box
              key={index}
              sx={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
                borderBottom: index === 2 ? "none" : "1px solid #0000001f",
                width: isMobile ? "95%" : "90%",
                margin: "auto",
                marginTop: index === 0 ? "1rem" : 0,
                // marginBottom: index === 2 ? "1rem" : 0,
              }}
            >
              <Typography
                sx={{
                  whiteSpace: "nowrap",
                  display: "flex",
                  justifyContent: "flex-start",
                  fontSize: "1.5rem",
                  fontWeight: "600",
                  color: theme.palette.primary.main,
                  textTransform: "uppercase",
                  width: "150px",
                  marginTop: index === 1 ? "0.2rem" : 0,
                  marginBottom: index === 2 ? "0" : "0.2rem",
                }}
              >
                {texto}
              </Typography>
              {loadingData ? (
                <Skeleton
                  sx={{
                    height: "35px",
                    width: "120px",
                    marginLeft: "10px",
                    display: "flex",
                    justifyContent: "center",
                  }}
                />
              ) : (
                <Typography
                  color="text.secondary"
                  sx={{
                    display: "flex",
                    justifyContent: "flex-end",
                    width: "150px",
                    fontSize: "1.5rem",
                    marginBottom: index === 2 ? "0" : "0.2rem",
                    marginTop: index === 1 ? "0.2rem" : 0,
                  }}
                >
                  ${format(precio, "0,0.00")}
                </Typography>
              )}
            </Box>
          ))}
          <LastUpdate loadingData={loadingData} />
        </CardContent>
      </Card>
      <ModalCardItem
        moneda={moneda}
        open={open}
        handleClose={handleClose}
        data={data}
        esRealBrasileño={esRealBrasileño}
        EsEuro={EsEuro}
        loadingData={loadingData}
      />
    </div>
  );
});

CardItem.displayName = 'CardItem';

export default CardItem;
