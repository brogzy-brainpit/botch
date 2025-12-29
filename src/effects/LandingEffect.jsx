import { motion, useInView } from "framer-motion";
import React, { useRef } from "react";

function LandingEffect({
  children,
  once = true,
  margin = "0px",
  delay = 1.02,           // delay *between* items
  initialDelay = 0,     // delay *before starting*
  duration = 3.08,
  className = "",
  center = false,
  gap = "10px",
  stiffness= 120,
  damping= 18,
}) {


  const container = {
    hidden: {},
    show: {
      transition: {
        delayChildren: initialDelay, // 👈 wait before starting
        staggerChildren: delay,      // 👈 delay between items
      },
    },
  };

  const item = {
    hidden: { y: 50, opacity: 0 },
    show: {
      y: 0,
      opacity: 1,
       transition: {
        type: "spring",
        stiffness:100,
        damping:15,
        // duration, // ignored for spring but could use if tween
      },
    
    },
  };

  return (
    <motion.h2
    
      variants={container}
      initial="hidden"
      animate={"show"}
      style={{ columnGap: gap }}
      className={`text-balance overflowhidden t-center flex-wrap m-0 flex ${
        center ? "justify-center" : ""
      } items-center ${className}`}
    >
      {/* {React.Children.map(children, (child, index) => ( */}
          <motion.span variants={item} className="inlineblock">
            hey
          </motion.span> 
             <motion.span variants={item} className="inlineblock">
            hey
          </motion.span>
      {/* ))} */}
    </motion.h2>
  );
}

export default LandingEffect;
