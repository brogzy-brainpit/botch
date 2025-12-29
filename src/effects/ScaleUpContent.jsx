import { useInView, motion } from "framer-motion";
import React, { useRef } from "react";

function ScaleUpContent({children,
  className = "",
  once = false,
  stiffness = 120, // spring stiffness
  damping = 18,    // how much "bounce" / resistance
  delay = 0.04,
  duration=0.40,
  margin='-100px'
}) {
  const scaleIt = useRef(null);
  const inView = useInView(scaleIt, { once,margin });

  const scaleUp = {
    initial: { scale: 0 },
    enter: {
      scale: 1,
      transition: {
        type: "spring",
        stiffness, // higher = snappier
        damping,   // lower = more bounce
        delay,
      },
    },
    exit: { scale: 0 },
  };

  return (
    <motion.div
      ref={scaleIt}
      className={className}
      variants={scaleUp}
      initial="initial"
      animate={inView ? "enter" : "exit"}
      exit="exit"
    >
      {children}
    </motion.div>
  );
}

export default ScaleUpContent;
