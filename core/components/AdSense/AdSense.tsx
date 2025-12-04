import Script from "next/script";
import { ADSENSE_CONFIG } from "@/constants";

type AdsenseTypes = {
  pId: string;
};

const AdSense = ({ pId }: AdsenseTypes) => {
  return (
    <Script
      async
      src={`${ADSENSE_CONFIG.SCRIPT_URL}?client=ca-pub-${pId}`}
      crossOrigin="anonymous"
      strategy="afterInteractive"
    />
  );
};

export default AdSense;
