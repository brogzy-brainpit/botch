import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

export default function StaggerText({ color,initialColor,text,once=true,className = '' }) {
  const textRef= useRef(null)
  const inView= useInView(textRef,{once})
  const parent = {
    enter: {
      transition: {
        staggerChildren: 0.07,
      },
    }
  };

  const wave = {
    initial: { y: 0, scale: 1, color },
    enter: {
      y: [0, -10, 0],
      scale: [1, 1.3, 1],
      color: [initialColor, color,initialColor],
      transition: {
        duration: 0.6,
        ease: 'easeInOut',
      },
    },
  };

  return (
    <motion.h1 ref={textRef}
      initial="initial"
      animate={inView?"enter":"initial"}       // 👈 runs once on mount
      variants={parent}
      className={
        ' ' +
        className
      }
    >
 
  


      {text.map((p, index) => (
        <span key={index} className="overflowhidden">
          <motion.span variants={wave} className="inline-flex ">
            {p === '*' ? (
              <span className="ml-[4px] w-[8px] h-[8px] rounded-full bg-white"></span>
            ) : p === ' ' ?<p>&nbsp;</p>:(
              p
            )}
          </motion.span>
        </span>
      ))}
    </motion.h1>
  );
}
