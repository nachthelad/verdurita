// API URLs
export const API_URLS = {
  DOLAR: "https://dolarapi.com/v1/dolares",
  REAL: "https://dolarapi.com/v1/cotizaciones/brl",
  EURO: "https://api.bluelytics.com.ar/v2/latest",
} as const;

// AdSense Configuration
export const ADSENSE_CONFIG = {
  CLIENT_ID: "ca-pub-1027418154196814",
  SCRIPT_URL: "https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js",
} as const;

// Site Configuration
export const SITE_CONFIG = {
  URL: "https://verdurita.com.ar/",
  NAME: "Verdurita - Cotizaciones",
  DESCRIPTION: "Cotizaciones del dólar, euro y real en tiempo real",
} as const;

// External Links
export const EXTERNAL_LINKS = {
  GITHUB: "https://github.com/nachthelad",
  CAFECITO: "https://cafecito.app/nachthelad",
  CAFECITO_BUTTON_BASE: "https://cdn.cafecito.app/imgs/buttons/button_1",
  CAFECITO_BUTTON_DARK: "https://cdn.cafecito.app/imgs/buttons/button_4",
} as const;

// Currency Mappings
export const CURRENCY_MAPPINGS = {
  "dólar blue": "Dólar Blue",
  "dólar oficial": "Dólar Oficial",
  "dólar tarjeta": "Tarjeta",
  "dólar bolsa": "Bolsa",
  "dólar cripto": "Cripto",
  "dólar ccl": "CCL",
  "dólar mayorista": "Mayorista",
  "euro blue": "Euro Blue",
  "euro oficial": "Euro Oficial",
  "real brasileño": "Real",
} as const;
