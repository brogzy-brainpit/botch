'use client'

import { motion, useTransform, useScroll, useMotionValue, useSpring } from "framer-motion";
import { useEffect, useMemo, useRef } from "react";
import { useMediaQuery } from "react-responsive";
import useWindow from "./useWindow";

export const random = (min=-40, max=200) => Math.random() * (max - min) + min;

const texts = 'hello world my name is bokchexa aminu?'.split(" ");

const HorizontalTextWavy = () => {
  const targetRef = useRef(null);
  const textRef = useRef(null);

  const finalX = useMotionValue(0);
  const { dimension } = useWindow();
  const isTabletOrMobile = useMediaQuery({ query: '(max-width: 1000px)' });

  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ['start start', 'end end']
  });

  /* ----------------------------
     Horizontal centering
  -----------------------------*/
  useEffect(() => {
    if (!textRef.current) return;

    const update = () => {
      const textWidth = textRef.current.scrollWidth;
      // const offset= isTabletOrMobile?-(textWidth - dimension.width) *.8:-(textWidth - dimension.width) /2
      const offset= -(textWidth - dimension.width) *.8
      finalX.set(offset);
      // finalX.set(-(textWidth - dimension.width) *1.1);
    };

    update();
    window.addEventListener('resize', update);
    return () => window.removeEventListener('resize', update);
  }, [dimension.width]);

 

  const x =useTransform(
    scrollYProgress,[0, 0.9],[dimension.width, finalX.get()]
  )

  /* ----------------------------
     Flatten letters
  -----------------------------*/
  const letters = useMemo(
    () =>
      texts.flatMap((word, wi) =>{
        const char= word.split("").map((char, ci) => ({
           char,
           key: `${wi}-${ci}`
         }))


         if(wi<texts.length-1){
          char.push({
            char:"\u00A0",
            key: `${wi}-space`

          })
         }
         return char

      }
      ),
    []
  );

  /* ----------------------------
     Stable random start values
  -----------------------------*/
  

  return (
    <section
      ref={targetRef}
      className="relative h-[600svh] bgneutral-900 text-orange-700"
    >
      <div className="sticky top-0 h-screen overflow-hidden flex items-center">
        <motion.h2
          ref={textRef}
          style={{ x }}
          className="whitespace-nowrap font-bold font-custom text-heading1 lg:text-[10em] leading-[0.95] tracking-[-0.03em]"
        >
          {letters.map((l, i) => {
            // const endBefore=isTabletOrMobile?.8:.85
            const endBefore=.80
             const total= letters.length
            const start = 0.1+(i / total) * endBefore;
            const end=start+ endBefore / total
          //     const start = i / total;
          // const end = start + 1 / total;
// const x =useSpring(useTransform(scrollYProgress, [start,end], [900, 0]),{ stiffness: 200, damping: 30, mass: 0.3 })
const options=[isTabletOrMobile?-80:-100,isTabletOrMobile?80:150]
const rand= options[Math.floor(Math.random()* options.length)]
const y =useSpring(useTransform(scrollYProgress, [start,end], [rand, 0]),{ stiffness: 190, damping: 20, mass: 0.3 })
const rotate =useSpring(useTransform(scrollYProgress, [start,end], [random(-10,10), 0]),{ stiffness: 190, damping: 30, mass: 0.3 })
    
           return <motion.span
              key={l.key}
              style={{
               rotate,y
              }}
              className="inline-block mr-[0.08em"
            >
              {l.char}
            </motion.span>
})}
        </motion.h2>
      </div>
    </section>
  );
};

export default HorizontalTextWavy;
