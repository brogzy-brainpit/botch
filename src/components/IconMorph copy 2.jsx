"use client";

import React, {
  useRef,
  useState,
  useLayoutEffect,
  useEffect,
} from "react";
import { motion, useMotionValue, useScroll, useTransform } from "framer-motion";
import useWindow from "./useWindow";
import { useElementCenter } from "./useElementCenter";
import { useMediaQuery} from "react-responsive";

const ITEMS = [0, 1,2,3,4,5,6,7];

export default function IconMorph() {
  const sectionRef = useRef(null);
  const fixedRefs = useRef([]);
const icon1 = useRef(null);
const icon2 = useRef(null);
const icon3 = useRef(null);
const icon4 = useRef(null);
const icon5 = useRef(null);

  const { dimension } = useWindow();
  const isTabletOrMobile = useMediaQuery({ query: '(max-width: 1000px)' })
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });
  const { x:icon1X, y:icon1Y,yBottom:icon1YBottom,elHeight,elWidth:icon1Width,elTop,elLeft } = useElementCenter(icon1, scrollYProgress);
  const { x:icon2X, y:icon2Y,yBottom:icon2YBottom,elWidth:icon2Width,} = useElementCenter(icon2, scrollYProgress);
  const { x:icon3X, y:icon3Y,yBottom:icon3YBottom,elWidth:icon3Width,} = useElementCenter(icon3, scrollYProgress);
  const { x:icon4X, y:icon4Y,yBottom:icon4YBottom,elWidth:icon4Width,} = useElementCenter(icon4, scrollYProgress);
  const { x:icon5X, y:icon5Y,yBottom:icon5YBottom,elWidth:icon5Width,} = useElementCenter(icon5, scrollYProgress);


  /* -- Viewport center-- */
  const centerX = dimension.width / 2;
  const centerY = dimension.height/2 ;

console.log(isTabletOrMobile)

  // const scale= useTransform(scrollYProgress,[0,0.1, .5],[4,3.8,1] )
  const scale= useTransform(scrollYProgress,[0,0.1, .5],[!isTabletOrMobile?3:1,1,1] )

  const item1Y= useTransform(scrollYProgress,[0, 0.2,0.6],[centerY*2 - icon1YBottom.get(),centerY-icon1Y.get(),0])
 const item1X= useTransform(scrollYProgress,[0,.2, 0.95],[centerX - icon1X.get()-icon1Width.get()*2.4,centerX - icon1X.get(), 0] )

 const item2Y= useTransform(scrollYProgress,[0, 0.2,0.5],[centerY*2 - icon2YBottom.get(),centerY-icon2Y.get(),0])
  const item2X= useTransform(scrollYProgress,[0,0.2, 0.95],[centerX - icon2X.get()-icon3Width.get()*1.2,centerX - icon2X.get(), 0] )
  
  const item3Y= useTransform(scrollYProgress,[0, 0.2,0.5],[centerY*2 - icon3YBottom.get(),centerY-icon3Y.get(),0])
 const item3X= useTransform(scrollYProgress,[0,0.2, 0.95],[centerX - icon3X.get(),centerX - icon3X.get(), 0] )
  
 const item4Y= useTransform(scrollYProgress,[0, 0.2,0.5],[centerY*2 - icon4YBottom.get(),centerY-icon4Y.get(),0])
 const item4X= useTransform(scrollYProgress,[0,0.2, 0.95],[centerX - icon4X.get()+icon4Width.get()*1.2,centerX - icon4X.get(), 0] )
  
 const item5Y= useTransform(scrollYProgress,[0, 0.2,0.5],[centerY*2 - icon5YBottom.get(),centerY-icon5Y.get(),0])
 const item5X= useTransform(scrollYProgress,[0,0.2, 0.95],[centerX - icon5X.get()+icon5Width.get()*2.4,centerX - icon5X.get(), 0] )
  
   

  return (
    <section
      ref={sectionRef}
      className="relative min-h-[600vh] p-10 bg-blue-800"
    >
      {/* ================= Inline ================= */}
      <div className="sticky top-0 h-screen flex items-center justify-center text-white">
        <p className="font-custom w-[30em] flex-wrap gap-6 text-lg">
          Lorem ipsum  dolor sit <motion.span ref={icon1} style={{x:item1X,y:item1Y,scale}}
                className="inline-block align-middle rounded-md overflow-clip w-[50px] h-[50px]"
              ><motion.img
                    src="/images/001.png"
                    className="w-full h-full object-cover"
                    
                  />
                
              </motion.span>amet consectetur adipisicing elit.ipsum rerum, nam maxime
               nostrum magnam <motion.span ref={icon2} style={{x:item2X,y:item2Y,scale}}
                className="inline-block align-middle rounded-md overflow-clip w-[50px] h-[50px]"
              ><motion.img
                    src="/images/001.png"
                    className="w-full h-full object-cover"
                    
                  />
              </motion.span> cad dignissimos alias consectetur  adipisicing elit. Quia, vero?
           similique eveniet ut obcaecati consequuntur doloribus  molestias 
           officia! Totam, 
           <motion.span ref={icon3} style={{x:item3X,y:item3Y,scale}}
                className="inline-block align-middle rounded-md overflow-clip w-[50px] h-[50px]"
              ><motion.img
                    src="/images/001.png"
                    className="w-full h-full object-cover"
                    
                  />
              </motion.span> <motion.span ref={icon4} style={{x:item4X,y:item4Y,scale}}
                className="inline-block align-middle rounded-md overflow-clip w-[50px] h-[50px]"
              ><motion.img
                    src="/images/001.png"
                    className="w-full h-full object-cover"
                    
                  />
              </motion.span>ullam officiis!
          Lorem ipsum dolor sit 
            ipsum <motion.span ref={icon5} style={{x:item5X,y:item5Y,scale}}
                className="inline-block align-middle rounded-md overflow-clip w-[50px] h-[50px]"
              ><motion.img
                    src="/images/001.png"
                    className="w-full h-full object-cover"
                    
                  />
              </motion.span>
        </p>
      </div>

    </section>
  );
}
