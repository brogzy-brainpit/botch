import React from "react";
import { motion } from "framer-motion";

export default function StaggerTextHover({ text, activeColor = "#fff", className = "", preLoaderOut}) {
  const parent = {
    exit: {
      transition: { staggerChildren: 0.07, staggerDirection: -1 }, // reverse order
    },
    enter: {
      transition: {
        staggerChildren: 0.07,
      },
    },
    hover: {
      transition: {
        staggerChildren: 0.07,
      },
    },
  };

  const wave = {
    initial: { y: 40, scale: 0.7 },
    enter: {
      y: 0,
      scale:1,
      transition: { 
          type: "spring",
      stiffness: 120,
      damping: 10,
        },
    },

    hover: {
      y: [0, -6, 0],
      scale: [1, 1.1, 1],
      transition: {
      
        duration: 0.4,
        ease: "easeInOut",
      },
    },

     exit: {
      y:40,
      scale: 1,
      transition: { duration: 0.6, ease: "easeInOut" },
    },
  };

  return (
    <motion.h1
      initial="initial"
      exit="exit"
      // animate={'enter'}
      animate={preLoaderOut?'enter':'initial'}
      whileHover="hover"
      variants={parent}
      className={`${className} overflow-hidden`}
    >
      {text.map((p, index) => (
          <motion.span key={index}
            variants={wave}
            className="inline-flex"
            animate={{ color: activeColor }} // 👈 animate text color on prop change
          >
            {p === "*" ? (
              <motion.span
                className="ml-[4px] w-[8px] h-[8px] rounded-full"
                animate={{ backgroundColor: activeColor }} // 👈 animate dot bg
                transition={{ duration: 0.6, ease: "easeInOut" }}
              />
            ) : (
              p
            )}
          </motion.span>
      ))}
    </motion.h1>
  );
}
