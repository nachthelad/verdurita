import * as React from "react";
const { memo, useCallback } = React;
import { Card, CardContent, Typography, Box } from "@mui/material";
import { format } from "numerable";
import { hapticFeedback } from "@/utils/haptics";
import LoadingShimmer from "../LoadingShimmer";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

type CardItemProps = {
  data: { texto: string; precio?: number }[];
  esRealBrasileño?: boolean;
  EsEuro?: boolean;
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

    // Extract key values for cleaner display
    const venta = data.find((d) => d.texto.includes("Venta"))?.precio;
    const compra = data.find((d) => d.texto.includes("Compra"))?.precio;

    return (
      <Card
        onClick={handleClick}
        sx={{
          borderRadius: "16px",
          width: "100%",
          cursor: "pointer",
          transition: "all 0.2s ease-in-out",
          "&:hover": {
            transform: "translateY(-4px)",
            boxShadow: "0px 8px 24px rgba(0,0,0,0.1)",
          },
        }}
      >
        <CardContent sx={{ p: 3, "&:last-child": { pb: 3 } }}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-start",
              mb: 2,
            }}
          >
            <Typography
              variant="h6"
              sx={{ fontWeight: 600, color: "text.primary" }}
            >
              {moneda}
            </Typography>
            <ArrowForwardIosIcon
              sx={{ fontSize: 16, color: "text.secondary", mt: 0.5 }}
            />
          </Box>

          {loadingData ? (
            <LoadingShimmer width="100%" height="60px" />
          ) : (
            <Box>
              {/* Main Price (Venta usually matters most) */}
              <Box sx={{ display: "flex", alignItems: "baseline", mb: 1 }}>
                <Typography
                  variant="h3"
                  sx={{ color: "primary.main", fontWeight: 700, mr: 1 }}
                >
                  ${format(venta || 0, "0,0.00")}
                </Typography>
              </Box>

              {/* Sub Grid for Compra/Venta labels */}
              <Box sx={{ display: "flex", gap: 2, mt: 1 }}>
                {compra && (
                  <Box sx={{ display: "flex", flexDirection: "column" }}>
                    <Typography variant="caption" color="text.secondary">
                      Compra
                    </Typography>
                    <Typography variant="body2" fontWeight={600}>
                      ${format(compra, "0,0.00")}
                    </Typography>
                  </Box>
                )}
                {venta && (
                  <Box sx={{ display: "flex", flexDirection: "column" }}>
                    <Typography variant="caption" color="text.secondary">
                      Venta
                    </Typography>
                    <Typography variant="body2" fontWeight={600}>
                      ${format(venta, "0,0.00")}
                    </Typography>
                  </Box>
                )}
              </Box>
            </Box>
          )}
        </CardContent>
      </Card>
    );
  },
);

CardItem.displayName = "CardItem";

export default CardItem;
