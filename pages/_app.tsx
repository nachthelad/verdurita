import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { CssBaseline } from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";
import PullToRefresh from "pulltorefreshjs";
import ErrorBoundary from "@/core/components/ErrorBoundary";
import { ThemeModeProvider, useThemeMode } from "@/contexts/ThemeContext";

function AppContent({ Component, pageProps }: AppProps) {
  const { currentTheme } = useThemeMode();

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
    <ThemeProvider theme={currentTheme}>
      <CssBaseline />
      <ErrorBoundary>
        <Component {...pageProps} />
      </ErrorBoundary>
    </ThemeProvider>
  );
}

export default function App(props: AppProps) {
  return (
    <ThemeModeProvider>
      <AppContent {...props} />
    </ThemeModeProvider>
  );
}
