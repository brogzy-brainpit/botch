"use client";
import { motion, useAnimationFrame, useMotionValue } from "framer-motion";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

export default function Marquee({items,direction='up',className=''}) {
  const y = useMotionValue(0);
  const x = useMotionValue(0);
  const [hovered, setHovered] = useState(false);
  const [itemHeight, setItemHeight] = useState(0);
  const refs = useRef([]);

  // measure rendered element height
  useEffect(() => {
    if (refs.current[0]) {
      setItemHeight(refs.current[0].offsetHeight + 16); // include gap
    }
  }, []);

  const loopHeight = items.length * itemHeight;

  // set initial offset for downward columns
  useEffect(() => {
    if (direction === "down" && itemHeight) {
      y.set(-loopHeight);
    }
  }, [direction, loopHeight, y, itemHeight]);

  const speed =
    direction === "up" ? (hovered ? -10 : -40) : hovered ? 10 : 40;

  useAnimationFrame((_, delta) => {
    if (!itemHeight) return;
    const deltaInSeconds = delta / 1000;
    let newY = y.get() + speed * deltaInSeconds;

    if (direction === "up") {
      if (newY <= -loopHeight) newY += loopHeight;
    } else {
      if (newY >= 0) newY -= loopHeight;
    }

    y.set(newY);
  });

  return (
    <div
      className={` hfull bg-green-700 max-h-[300px] flex flex-col gap-2 ${className}`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <motion.div
        className="flex flex-col gap-4 hfull justify-center items-center "
        style={{ y }}
      >
        {[...items,...items,...items,...items,...items].map((item, i) => (
          <div
            key={i}
            ref={(el) => (refs.current[i] = el)}
            className="lg:h-[200px] lg:w-[200px]  h-[130px] w-[180px] maxw-[95%] bg-red-400"
          >
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


