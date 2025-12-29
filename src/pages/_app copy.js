import { AnimatePresence, useInView,motion } from "framer-motion";
import { useRouter } from "next/router";
import { useEffect, useRef } from "react";
import { Instrument_Serif,Instrument_Sans, Lora, DM_Sans, Epilogue,Poppins } from "next/font/google";

// import "../styles/fonts.css";
import "../styles/mostHave.css";
import "../styles/globals.css";
import "../styles/embla.css";
import "../styles/menu.css";
import Footer from "@/components/Footer";
import localFont from "next/font/local";

const Sans = DM_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-dm-sans",
  display: "swap",
});

const lora = Instrument_Sans({
  subsets: ["latin"],
  style: ["normal", "italic"], // 👈 include italics
  weight: ["400", "700"],
  variable: "--font-lora",
  display: "swap",
});
// import local fonts froom ./fontdirectory
const local = localFont({
 
  src:  "./fonts/MonumentExtended-Regular.otf",
  variable: "--font-local",
  weight: "100 200 300 400 500 600 700 800 900",
});
const epilogue = Epilogue({
  subsets: ["latin"],
  weight: ["400", "500", "700","900"],
  style: ["normal", "italic"], // 👈 include italics
  variable: "--font-epilogue",
  display: "swap",
});

export default function MyApp({ Component, pageProps }) {
  const router = useRouter();

  useEffect(() => {
    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }
  }, []);
   const svgRef=useRef(null)
    const inView= useInView(svgRef,{once:false})
      const columns={
      initial:{}
  ,
       enter:{
        transition: {
          // duration:1.2,
          delayChildren:2, // 👈 wait before starting
          staggerChildren:0.04,  
              // 👈 delay between items
        },
      },
      exit:{
         transition: {
          delayChildren:0.2, // 👈 wait before starting
          staggerChildren:0.04,  
          // staggerChildren:0.1,  
        },
      },
    }
    const oneColumn={
      initial:(i)=>({
        scaleX: 1,
        transformOrigin:'right',
  
      }),
       enter:(i)=>({
        // y:0,
        // opacity:1,
        // clipPath:'inset(0 0 0 0)',
            scaleX: 0,
            transformOrigin:'right',
      }),
      exit:(i)=>({
             scaleX: 1,
             transformOrigin:'left',
      }),
    }
    const as=[1,2,3,4,5,6,7,8,9,0,1,2,3,4,5,6,7,8,9,0]

  return (
    <AnimatePresence
      mode="wait"
      onExitComplete={() => window.scrollTo({ top: 0, behavior: "instant" })}
    >
      <div
        key={router.asPath}
        className={`${Sans.variable} ${local.variable} ${lora.variable} ${epilogue.variable}`}
      >
         <div className='fixed top left-0 w-full h-full bg-purple600 z-preloader pointer-events-none'>
       <motion.div className='flex gap-0 w-full h-full' ref={svgRef} variants={columns} initial='initial' exit='exit' animate={'enter'}>
   {as.map(()=>{
    return (
      <motion.div className='w-[10%] bg-white h-full origin-righ ' variants={oneColumn}>
        {/* dd */}
      </motion.div>
    )
   })}
</motion.div>
     </div>


        <Component {...pageProps} />
        {/* <Footer /> */}
      </div>
    </AnimatePresence>
  );
}
