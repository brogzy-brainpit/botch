"use client";
import Heading2 from "@/typography/Heading2";
import { motion, useAnimationFrame, useMotionValue } from "framer-motion";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";


export default function MarqueeX({items,direction='left',className=''}) {

  const y = useMotionValue(0);
  const x = useMotionValue(0);
  const [hovered, setHovered] = useState(false);
  const [itemHeight, setItemHeight] = useState(0);
  const refs = useRef([]);

  // measure rendered element height
  useEffect(() => {
    if (refs.current[0]) {
      setItemHeight(refs.current[0].offsetWidth + 16); // include gap
    }
  }, []);

  const loopHeight = items.length * itemHeight;
 
  // set initial offset for downward columns
  useEffect(() => {
    if (direction === "right" && itemHeight) {
      x.set(-loopHeight);
    }
  }, [direction, loopHeight, y, itemHeight]);

  // const speed =
  //   hovered
  //     ? baseSpeed * 0.25 * (scrollDir === "down" ? 1 : -1)
  //     : baseSpeed * (scrollDir === "down" ? 1 : -1);
  const speed =
    direction === "left" ? (hovered ? -10 : -40) : hovered ? 10 : 40;
  const baseSpeed = direction === "up" ? -40 : 40;
  useAnimationFrame((_, delta) => {
    if (!itemHeight) return;
    const deltaInSeconds = delta / 1000;
    let newX = x.get() + speed * deltaInSeconds;

    if (direction === "left") {
      if (newX <= -loopHeight) newX += loopHeight;
    } else {
      if (newX >= 0) newX -= loopHeight;
    }

    x.set(newX);
  });

  return (
    <div
      className={` hfull overflow-clip max-h-[300px] w-full flex  gap2 ${className}`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <motion.div
        className="flex flex-row gap-4 hfull justify-center items-center bggreen-700"
        style={{ x }}
      >
        {[...items,...items,...items,...items].map((item, i) => (
          <div
            key={i}
            ref={(el) => (refs.current[i] = el)}
            className="lg:h-[200px] lg:w-[200px]  h-[130px] w-[180px]  maxw-[95%] bg-red-400"
          >
            {/* <Heading2>
              brogzy-brainpit-developers
            </Heading2> */}
            <div style={{backgroundColor:item.bg}} className="p-4 h-full" >

              <Image
                src={item.src}
                alt=""
                width={500}
                height={500}
                className="rounded-lg  w-full h-full object-cover object-top"
              />
            </div>
          </div>
        ))}
      </motion.div>
    </div>
  );
}


