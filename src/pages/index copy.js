import {AnimatePresence} from 'framer-motion';
import SmoothScroll from "@/providers/Lenis";
import Header from "@/components/Header";
import Section1 from "@/components/Landing";
import Preloader from "@/components/Preloader";
import { useEffect, useState } from "react";

function PageContent() {
   const [isLoading,setIsLoading]=useState(true)
   const [preLoaderOut,setPreLoaderOut]=useState(false)

  useEffect(()=>{

   const timer=  setTimeout(() => {
    setIsLoading(false)
    document.body.style.cursor="default"
    window.scrollTo({top:0})
    setPreLoaderOut(true)
    }, 2400);
    return ()=>clearTimeout(timer)
  },[])
  return (
    <SmoothScroll>

    {/* <AnimatePresence initial={false} mode="wait" onExitComplete={()=>{setPreLoaderOut(true)}}>
    {isLoading &&  <Preloader key={'preloader'}/>}
     <Preloader key={'preloader'}/>
    </AnimatePresence> */}
    <AnimatePresence mode="wait" onExitComplete={()=>{setPreLoaderOut(true)}}>
  {isLoading ? (
    <Preloader key="pre" />
  ) : (
    <Header key="head" preLoaderOut={preLoaderOut} />
  )}
</AnimatePresence>

      {/* <Header preLoaderOut={preLoaderOut}/> */}
      <Section1 preLoaderOut={preLoaderOut}/>

    </SmoothScroll>
           
    
  );
}

export default function Home() {
  return (
    <main>
        <PageContent />
    </main>
  );
}
