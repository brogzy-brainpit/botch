import { AnimatePresence, useInView,motion } from "framer-motion";
import { useRouter } from "next/router";
import { useEffect, useRef } from "react";
// import { Instrument_Serif,Instrument_Sans, Lora, DM_Sans,Manrope,Agdasima,Epilogue,Poppins } from "next/font/google";
import {Manrope,Agdasima } from "next/font/google";

// import "../styles/fonts.css";
import "../styles/mostHave.css";
import "../styles/globals.css";
import "../styles/embla.css";
import "../styles/menu.css";
import Footer from "@/components/Footer";
import localFont from "next/font/local";
import Menu from "@/components/Menu";

// import local fonts froom ./fontdirectory
const custom2 = localFont({
 
  src:  "./fonts/Qrania.otf",
  variable: "--font-custom2",
  weight: "100 200 300 400 500 600 700 800 900",
});
const custom = localFont({
  src:  "./fonts/AktivGrotesk-Bold.otf",
  // src:  "./fonts/MonumentExtended-Ultrabold.otf",

  // weight: "100 200 300 400 500 600 700 800 900",
  variable: "--font-custom",
 
});
const body= localFont({
  src:  "./fonts/NeueMontreal-Regular.otf",

  // weight: "100 200 300 400 500 600 700 800 900",
  variable: "--font-body",
 
});
// const body = Manrope({
//   subsets: ["latin"],
//   weight: ["400", "500", "700"],
//   style: ["normal", ], // 👈 include italics
//   variable: "--font-body",
//   display: "swap",
// });

export default function MyApp({ Component, pageProps }) {
  const router = useRouter();
  
  const ease = [0.9, 0, 0.1, 1];


  useEffect(() => {
    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }
  }, []);
   
   
  return (
    <AnimatePresence
      mode="wait"
      onExitComplete={() => window.scrollTo({ top: 0, behavior: "instant" })}
    >
      <div
        key={router.asPath}
        className={`${custom2.variable} ${custom.variable} ${body.variable} `}
      >
     
        {/* <Menu/> */}
        
        <Component {...pageProps} />
        {/* <Footer /> */}
      </div>
    </AnimatePresence>
  );
}
