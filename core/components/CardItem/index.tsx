import * as React from "react";
const { memo, useCallback } = React;
import {
  Box,
  Card,
  CardActionArea,
  CardContent,
  Typography,
} from "@mui/material";
import CalculateOutlinedIcon from "@mui/icons-material/CalculateOutlined";
import { format } from "numerable";
import { hapticFeedback } from "@/utils/haptics";
import LoadingShimmer from "../LoadingShimmer";

type CardItemProps = {
  data: { texto: string; precio?: number }[];
  loadingData: boolean;
  moneda: string;
  onClick: (moneda: string) => void;
};

const CardItem = memo(
  ({ data, loadingData, moneda, onClick }: CardItemProps) => {
    const handleClick = useCallback(() => {
      hapticFeedback.medium();
      onClick(moneda);
    }, [moneda, onClick]);

    const venta = data.find((d) => d.texto.includes("Venta"))?.precio;
    const compra = data.find((d) => d.texto.includes("Compra"))?.precio;

    return (
      <Card
        sx={{
          borderRadius: "16px",
          width: "100%",
          height: "100%",
          transition: "transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out",
          "&:hover": {
            transform: "translateY(-4px)",
            boxShadow: "0px 8px 24px rgba(0,0,0,0.1)",
          },
        }}
      >
        <CardActionArea
          onClick={handleClick}
          aria-label={`Abrir calculadora de ${moneda}`}
          sx={{
            height: "100%",
            borderRadius: "inherit",
            "&.Mui-focusVisible": {
              outline: "2px solid",
              outlineColor: "primary.main",
              outlineOffset: "-2px",
            },
          }}
        >
          <CardContent sx={{ p: 3, "&:last-child": { pb: 3 } }}>
            <Typography
              variant="h6"
              sx={{ fontWeight: 600, color: "text.primary", mb: 1.5 }}
            >
              {moneda}
            </Typography>

            {loadingData ? (
              <LoadingShimmer width="100%" height="60px" />
            ) : (
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "flex-end",
                  gap: 1,
                  flexWrap: "wrap",
                }}
              >
                <Box>
                  <Typography variant="caption" color="text.secondary">
                    Venta
                  </Typography>
                  <Typography
                    variant="h3"
                    sx={{
                      color: "primary.main",
                      fontWeight: 700,
                      lineHeight: 1.2,
                    }}
                  >
                    ${format(venta ?? 0, "0,0.00")}
                  </Typography>
                  {compra !== undefined && (
                    <Typography variant="body2" sx={{ mt: 1 }}>
                      <Box
                        component="span"
                        sx={{ color: "text.secondary", mr: 0.75 }}
                      >
                        Compra
                      </Box>
                      <Box component="span" sx={{ fontWeight: 600 }}>
                        ${format(compra, "0,0.00")}
                      </Box>
                    </Typography>
                  )}
                </Box>
                <Box
                  aria-hidden="true"
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "primary.main",
                    backgroundColor: "action.hover",
                    borderRadius: 2,
                    width: 36,
                    height: 36,
                  }}
                >
                  <CalculateOutlinedIcon fontSize="small" />
                </Box>
              </Box>
            )}
          </CardContent>
        </CardActionArea>
      </Card>
    );
  },
);

CardItem.displayName = "CardItem";

export default CardItem;
