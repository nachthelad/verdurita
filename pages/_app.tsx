import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { CssBaseline } from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";
import PullToRefresh from "pulltorefreshjs";
import { theme } from "@/theme/theme";

export default function App({ Component, pageProps }: AppProps) {
  const standalone =
    typeof window !== "undefined" &&
    window.matchMedia("(display-mode: standalone)").matches;

  if (standalone) {
    PullToRefresh.init({
      instructionsPullToRefresh: "Deslizá para actualizar",
      instructionsReleaseToRefresh: "Soltá para actualizar",
      instructionsRefreshing: "Actualizando...",
      onRefresh() {
        window.location.reload();
      },
    });
  }

  return (
    <>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Component {...pageProps} />
      </ThemeProvider>
    </>
  );
}
