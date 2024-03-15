import * as React from "react";
import { Card, CardContent, Typography, Box, Skeleton } from "@mui/material";
import ModalCardItem from "./ModalCardItem";
import { format } from "numerable";
import { Icon } from "@iconify-icon/react/dist/iconify.mjs";
import { theme } from "@/theme/theme";
import { inter } from "@/fonts/fonts";
import { useMediaQuery, Theme } from "@mui/material";

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
    theme.breakpoints.down("sm")
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
                display: "flex",
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
                borderBottom: "1px solid #0000001f",
                borderBottomWidth: index === 2 ? "0" : "1px",
                width: isMobile ? "95%" : "90%",
                margin: "auto",
                marginTop: index === 0 ? "1rem" : 0,
                marginBottom: index === 2 ? "1rem" : 0,
              }}>
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
                  fontFamily: inter.style.fontFamily,
                  marginBottom: index === 2 ? "0" : "0.2rem",
                  marginTop: index === 1 ? "0.2rem" : 0,
                }}>
                {texto}
              </Typography>
              {loadingData ? (
                <Skeleton
                  sx={{
                    height: "35px",
                    width: "120px",
                    marginLeft: isMobile ? "10px" : "30px",
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
                    fontFamily: inter.style.fontFamily,
                    marginBottom: index === 2 ? "0" : "0.2rem",
                    marginTop: index === 1 ? "0.2rem" : 0,
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
