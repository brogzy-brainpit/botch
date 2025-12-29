import { motion, useInView } from "framer-motion";
import React, { useRef } from "react";

function SlideUpElement({
  children,
  once = true,
  margin = "0px",
  delay = 0.02,           // delay *between* items
  initialDelay = 0,     // delay *before starting*
  duration = 3.08,
  className = "",
  center = false,
  gap = "10px",
  stiffness= 120,
  damping= 18,
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once, margin });

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
        stiffness,
        damping,
        // duration, // ignored for spring but could use if tween
      },
    },
  };

  return (
    <motion.span
      ref={ref}
      variants={container}
      initial="hidden"
      animate={inView ? "show" : "hidden"}
      style={{ columnGap: gap }}
      className={`text-balance overflow-hidden t-center flex-wrap m-0 flex ${
        center ? "justify-center" : ""
      } items-center ${className}`}
    >
      {React.Children.map(children, (child, index) => (
        <span key={index} className="inline-block overflow-hidden">
          <motion.span variants={item} className="inline-block">
            {child}
          </motion.span>
        </span>
      ))}
    </motion.span>
  );
}

export default SlideUpElement;
