import React, { useEffect } from "react";
import { motion,useAnimate } from "framer-motion";
import useWindow from "./useWindow";
import SlideUpText from "@/effects/SlideUpText";


function Preloader() {
  const {dimension} = useWindow();
  const [scope,animate] = useAnimate();
  const ease=[0.9, 0, 0.1, 1];
  const runAnimation=async()=>{
    await new Promise((r) => setTimeout(r, 3600));

     animate(
      ".text-01",
      { x:'-20%' },
      { duration: .8, ease}
    );
      animate(
      ".text-02",
      { x:'20%' },
      { duration: .8, ease}
    );
    await new Promise((r) => setTimeout(r, 3000));
   animate(
      ".text-01",
      { x:-dimension.width*.5,scale:0.5,},
      { duration: 2, ease, }
    );
      animate(
      ".text-02",
      { x:dimension.width*.5,scale:0.5,},
      { duration: 2, ease, }
    );
  }
useEffect(()=>{
runAnimation()
},[dimension])
   const text1={
      initial:(i)=>({
        x:'0%',
        transformOrigin:'right',
  
      }),
       exit:(i)=>({
             x:-dimension.width*0.6,
            transformOrigin:'right',
            transition:{
              duration:2,
              ease
            }
      }),
      // exit:(i)=>({
      //        x: '0%',
      //        transformOrigin:'left',
      // }),
    }

    const text2={
      initial:(i)=>({
        x:'0%',
        transformOrigin:'right',
  
      }),
       exit:(i)=>(
        {
            x:dimension.width*0.6,
            transformOrigin:'right',
            transition:{
              duration:2,
              ease
            }
      }),
      // exit:(i)=>({
      //        x: '0%',
      //        transformOrigin:'left',
      // }),
    }

  return (
    <div  className=" fixed  top-0 left-0 w-full h-full bgneutral-800 z-[9998] flex flex-col items-center justify-center">
     <div ref={scope} className=' z-preloadr overflow-hidden absolute left-[50%] -translate-x-1/2 top-[50%] w-full -translate-y-1/2 flex gap-3 items-center justify-center h-svh  b-pink-700'>
       
        <h2   className='text-01 flex-1 flex justify-end bgslate-600 text-heading2 text-black font-custom2'>
        <SlideUpText delay={0.06} preLoaderOut={true} gap='20px' text={'Memet'} initialDelay={0.5}/>
          </h2>
        <h2   className=' text-02 flex-1 text-heading2 text-black font-custom2'>
          
        <SlideUpText delay={0.06} preLoaderOut={true} gap='20px' text={'Oumar'} initialDelay={0.8}/>

          </h2>
      </div>

    </div>
  );
}

export default Preloader;
