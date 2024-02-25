import "@/styles/globals.css";
import type { AppProps } from "next/app";
// import { CssBaseline } from "@mui/material";
// import PullToRefresh from "pulltorefreshjs";

export default function App({ Component, pageProps }: AppProps) {
  // const standalone =
  //   typeof window !== "undefined" &&
  //   window.matchMedia("(display-mode: standalone)").matches;

  // if (standalone) {
  //   PullToRefresh.init({
  //     onRefresh() {
  //       window.location.reload();
  //     },
  //   });
  // }
  return (
    <>
      {/* <CssBaseline /> */}
      <Component {...pageProps} />
    </>
  );
}
