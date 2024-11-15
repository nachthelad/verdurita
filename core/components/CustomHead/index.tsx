import { theme } from "@/theme/theme";
import Head from "next/head";
import Script from "next/script";

type CustomHeadProps = {
  title?: string;
  description?: string;
  keywords?: string;
  imageUrl?: string;
  url?: string;
};

const CustomHead: React.FC<CustomHeadProps> = ({
  title = "verdurita",
  description = "Cotizaciones en tiempo real",
  keywords = "currency, exchange, rates, Argentina, USD, Real, inflacion, finanzas, economia, verdurita, tipo de cambio",
  imageUrl = "@/public/logo.png",
  url = "https://verdurita.com.ar/",
}) => (
  <>
    <Head>
      <title>{title}</title>
      <meta charSet="UTF-8" />
      <meta name="description" content={description} />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta name="keywords" content={keywords} />
      <meta name="robots" content="index,follow" />
      <meta name="geo.region" content="AR" />
      <meta name="geo.placename" content="Argentina" />
      <meta name="language" content="ES" />
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content="verdurita" />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={imageUrl} />
      <meta property="og:url" content={url} />
      <meta property="og:locale" content="es_AR" />
      <link rel="icon" href="/favicon.ico" />
      <link rel="manifest" href="/manifest.json" />
      <link rel="apple-touch-icon" href="/icon-512x512.png" />
      <meta name="theme-color" content={theme.palette.primary.main} />
    </Head>
    <Script
      async
      src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-1027418154196814"
      crossOrigin="anonymous"
    ></Script>
  </>
);

export default CustomHead;
