import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { useRef } from "react";

export default function RubberSection({ stiffness= 120,damping= 15,mass= 0.3,className,children,defaultY=[250, 0],defaultStart= ["0.8 end", "0.7 start"] }) {
  const ref = useRef(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset:defaultStart,
  });

  // progress spring
  const scrollMarker = useSpring(scrollYProgress, {
    stiffness: 120, damping: 15, mass: 0.3 
  });

  // 🎨 Gradient that shifts from red → green as you scroll
  const background = useTransform(scrollYProgress, [0, 1], [
    "linear-gradient(to right, #ff0000, #ff0000)", // fully red at start
    "linear-gradient(to right, #ff0000, #00ff00)", // red → green at end
  ]);

  // raw transforms
  const yRaw = useTransform(scrollYProgress, [0, 1], defaultY);
  const scaleRaw = useTransform(scrollYProgress, [0, 1], [0.4, 1]);
  const rotateRaw = useTransform(scrollYProgress, [0, 1], [-40, 0]);

  // smooth versions
  const y = useSpring(yRaw, {stiffness, damping, mass });
  const scale = useSpring(scaleRaw, { stiffness: 120, damping: 15, mass: 0.3 });
  const rotate = useSpring(rotateRaw, { stiffness: 120, damping: 15, mass: 0.3 });

  return (
    <motion.section className={`${className}  `} style={{ y: y }}
      ref={ref}>
      {/* 🔹 Progress bar with gradient */}
      {/* <motion.div
        style={{ scaleX: scrollMarker, background }}
        className="fixed top-0 left-0 right-0 h-1 origin-left"
      /> */}

      {children}

    </motion.section>
  );
}
