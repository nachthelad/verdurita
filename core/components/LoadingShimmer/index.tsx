import React from "react";
import { Box, styled, keyframes } from "@mui/material";

const shimmer = keyframes`
  0% {
    background-position: -200px 0;
  }
  100% {
    background-position: calc(200px + 100%) 0;
  }
`;

const ShimmerBox = styled(Box)(
  ({ theme, width = "100%", height = "20px" }: any) => ({
    display: "inline-block",
    height: height,
    width: width,
    background: `linear-gradient(90deg, 
    ${theme.palette.grey[300]} 25%, 
    ${theme.palette.grey[200]} 37%, 
    ${theme.palette.grey[300]} 63%
  )`,
    backgroundSize: "200px 100%",
    animation: `${shimmer} 1.4s ease-in-out infinite`,
    borderRadius: "4px",
    ...(theme.palette.mode === "dark" && {
      background: `linear-gradient(90deg, 
      ${theme.palette.grey[700]} 25%, 
      ${theme.palette.grey[600]} 37%, 
      ${theme.palette.grey[700]} 63%
    )`,
    }),
  })
);

interface LoadingShimmerProps {
  width?: string | number;
  height?: string | number;
  variant?: "text" | "rectangular" | "circular";
  lines?: number;
}

const LoadingShimmer: React.FC<LoadingShimmerProps> = ({
  width = "100%",
  height = "20px",
  variant = "rectangular",
  lines = 1,
}) => {
  if (variant === "circular") {
    return (
      <ShimmerBox
        width={width}
        height={height}
        sx={{
          borderRadius: "50%",
        }}
      />
    );
  }

  if (variant === "text") {
    return (
      <Box>
        {Array.from({ length: lines }).map((_, index) => (
          <ShimmerBox
            key={index}
            width={index === lines - 1 ? "70%" : "100%"}
            height="16px"
            sx={{
              marginBottom: index < lines - 1 ? "8px" : 0,
              borderRadius: "4px",
            }}
          />
        ))}
      </Box>
    );
  }

  return (
    <ShimmerBox width={width} height={height} data-testid="loading-shimmer" />
  );
};

export default LoadingShimmer;
