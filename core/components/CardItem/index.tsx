import * as React from "react";
import { Card, CardContent, Typography, Box, Skeleton } from "@mui/material";
import ModalCardItem from "./ModalCardItem";
import { format } from "numerable";
import { Icon } from "@iconify-icon/react/dist/iconify.mjs";
import { Theme, useMediaQuery } from "@mui/material";
import { theme } from "@/theme/theme";
import { inter } from "@/fonts/fonts";

type CardItemProps = {
  data: { texto: string; precio?: number }[];
  esRealBrasileño?: boolean;
  EsEuro?: boolean;
  loadingData: boolean;
  moneda: string;
};

const CardItem = ({
  data,
  esRealBrasileño = false,
  EsEuro = false,
  loadingData,
  moneda,
}: CardItemProps) => {
  const [open, setOpen] = React.useState(false);

  const handleExpandClick = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const isMobile = useMediaQuery((theme: Theme) =>
    theme.breakpoints.down("md")
  );

  return (
    <div>
      <Card
        sx={{
          borderRadius: "20px",
          boxShadow: "3",
        }}>
        <CardContent
          sx={{
            display: "flex",
            flexDirection: "column",
            position: "relative",
            paddingBottom: "16px !important",
            cursor: "pointer",
          }}
          onClick={handleExpandClick}>
          <Icon
            icon="typcn:arrow-maximise"
            width="2rem"
            height="2rem"
            style={{
              position: "absolute",
              top: "5px",
              right: "5px",
              color: "#0000007e",
              cursor: "pointer",
            }}
          />
          {data.map(({ texto, precio }, index) => (
            <Box
              key={index}
              sx={{
                marginTop: index === 0 ? "1rem" : 0,
                marginBottom: index === 2 ? "1rem" : 0,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                flexDirection: isMobile ? "column" : "row",
              }}>
              <Typography
                variant="h5"
                component="div"
                sx={{
                  whiteSpace: "nowrap",
                  display: "flex",
                  justifyContent: isMobile ? "center" : "flex-start",
                  fontSize: isMobile ? "2rem" : "1.5rem",
                  color: theme.palette.primary.main,
                  textTransform: "uppercase",
                  width: "145px",
                  fontFamily: inter.style.fontFamily,
                }}>
                {texto}
              </Typography>
              {loadingData ? (
                <Skeleton
                  sx={{
                    height: isMobile ? "43px" : "32px",
                    width: isMobile ? "45%" : "30%",
                    display: "flex",
                    justifyContent: "center",
                  }}
                />
              ) : (
                <Typography
                  variant="h5"
                  color="text.secondary"
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    width: "100px",
                    fontSize: isMobile ? "2rem" : "1.5rem",
                    fontFamily: inter.style.fontFamily,
                  }}>
                  ${format(precio, "0,0.00")}
                </Typography>
              )}
            </Box>
          ))}
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
};

export default CardItem;
