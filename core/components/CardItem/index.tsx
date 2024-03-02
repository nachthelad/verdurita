import * as React from "react";
import { Card, CardContent, Typography, Box, Skeleton } from "@mui/material";
import ModalCardItem from "./ModalCardItem";
import { format } from "numerable";
import { Icon } from "@iconify-icon/react/dist/iconify.mjs";

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
          }}>
          <Icon
            icon="typcn:arrow-maximise"
            width="2rem"
            height="2rem"
            style={{
              position: "absolute",
              top: "10px",
              right: "12px",
              color: "#0000007e",
              cursor: "pointer",
            }}
            onClick={handleExpandClick}
          />
          {data.map(({ texto, precio }, index) => (
            <Box
              key={index}
              sx={{
                marginBottom: "0.5rem",
                display: "flex",
                alignItems: "flex-start",
                padding: "0.2rem",
              }}>
              <Typography variant="h5" component="div">
                {texto}
              </Typography>
              {loadingData ? (
                <Skeleton
                  sx={{ fontSize: "1.5rem", height: 32, width: "30%" }}
                />
              ) : (
                <Typography variant="h5" color="text.secondary">
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
