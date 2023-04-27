import { Montserrat } from "next/font/google";
import localFont from "next/font/local";

const montserrat = Montserrat({
  subsets: ["latin"],
  preload: true,
  weight: ["500", "700"],
  variable: "--font-montserrat",
  display: "swap",
});

const gt_zirkon = localFont({
  src: "../public/fonts/GTZirkon/GT Zirkon Bold.otf",

  preload: true,
  variable: "--gt-zirkon",
  display: "swap",
});

export const variables = ` ${montserrat.variable} ${gt_zirkon.variable}`;
