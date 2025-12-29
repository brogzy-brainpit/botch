"use client";

import { motion, useMotionValue, useTransform, animate, useScroll, AnimatePresence, useSpring } from "framer-motion";
import { useEffect, useRef, useState } from "react";

const IMAGES = [
  { index:0,img: "/images/001.png", title: "Service 1" },
  { index:1,img: "/images/002.png", title: "Service 2" },
  { index:2,img: "/images/003.png", title: "Service 3" },
  { index:3,img: "/images/004.png", title: "Service 4" },
  { index:4,img: "/images/005.png", title: "Service 5" },
  { index:5,img: "/images/006.png", title: "Service 6" },
  { index:6,img: "/images/service01.png", title: "Service 7" },
  { index:7,img: "/images/service02.png", title: "Service 8" },
  { index:8,img: "/images/service03.png", title: "Service 9" },
  { index:9,img: "/images/service04.png", title: "Service 10" },
  { index:10,img: "/images/service05.png", title: "Service 11" },
  { index:11,img: "/images/service01.png", title: "Service 12" },
];

export default function Try() {
  const scrollContainer = useRef(null);
  const { scrollYProgress } = useScroll({
    target: scrollContainer,
    offset: ["start start", "end end"],
  });

  const total = IMAGES.length;
  const sliceAngle = 360 / total;

  const outerRadius =useMotionValue(180)
  const innerRadius =useMotionValue(235)
  const RADIUS=180
  const CIRCUMFERENCE=2*Math.PI*RADIUS
  // Motion values
  const wheelRotation = useSpring(0,{stiffness:120,damping:20,mass:.2});
  const indicatorRotation = useSpring(0,{stiffness:120,damping:20,mass:.2});
  const wheelRotationAdjusted =useTransform(wheelRotation, (v) => v - 90);
  const [activeIndex, setActiveIndex] = useState(0);
  const lastIndexRef = useRef(null);

  const autoRef = useRef({ wheel: null, indicator: null });
  const scrollTimeout = useRef();

  useEffect(() => {

    animate(outerRadius, 180, { duration: 1.2, ease: "easeInOut" });
    animate(innerRadius, 120, { duration: 1.2, ease: "linear" });
    // start auto animation
    autoRef.current.wheel = animate(wheelRotation, 360, { duration: 60, repeat: Infinity, ease: "linear" });
    autoRef.current.indicator = animate(indicatorRotation, -360, { duration: 60, repeat: Infinity, ease: "linear" });

    const mod = (n, m) => ((n % m) + m) % m;

    const updateIndex = () => {
      const relative = (indicatorRotation.get() - wheelRotation.get() + 360) % 360;
      const index = mod(Math.floor((relative / 360) * total), total);
      if (index !== lastIndexRef.current) {
        lastIndexRef.current = index;
        setActiveIndex(index);
      }
    };

    const wheelUnsub = wheelRotation.on("change", updateIndex);
    const indicatorUnsub = indicatorRotation.on("change", updateIndex);

    return () => {
      wheelUnsub();
      indicatorUnsub();
      autoRef.current.wheel?.stop();
      autoRef.current.indicator?.stop();
    };
  }, []);

  // Scroll hijack
  useEffect(() => {
    const unsubscribe = scrollYProgress.on("change", (progress) => {
      // stop auto animation temporarily
      autoRef.current.wheel?.stop();
      autoRef.current.indicator?.stop();

      const wheelAngle = -progress * 360;
      const indicatorAngle = progress * 360;

      wheelRotation.set(wheelAngle);
      indicatorRotation.set(indicatorAngle);

      // resume auto after 0.2s of scroll inactivity
      clearTimeout(scrollTimeout.current);
      scrollTimeout.current = setTimeout(() => {
        autoRef.current.wheel = animate(wheelRotation, wheelRotation.get() + 360, { duration: 60, repeat: Infinity, ease: "linear" });
        autoRef.current.indicator = animate(indicatorRotation, indicatorRotation.get() - 360, { duration: 60, repeat: Infinity, ease: "linear" });
      }, 600);
    });

    return () => unsubscribe();
  }, [scrollYProgress]);

  return (
    <div ref={scrollContainer} className="h-[600vh] relative">
      <div className="top-0 sticky w-full h-screen overflow-hidden bg-black">
        {/* BACKGROUND IMAGE */}
         <AnimatePresence key={IMAGES[activeIndex].index} mode="wait"  >
        <motion.div

        
         className="absolute inset-0 bg-cover bg-center transition-opacity duration-500"
          style={{ backgroundImage: `url(${IMAGES[activeIndex].img})` }}
          initial={{opacity:0,scale:1.1}}
          animate={{opacity:1,scale:1.08}}
          exit={{opacity:0,scale:1.2}}
          transition={{ duration: .4,scale:{duration:2}, ease: "easeOut" }}
        >

        </motion.div>
        
        </AnimatePresence>
       

        {/* DARK OVERLAY */}
        <div className="absolute inset-0 bg-black/50" />

        {/* DONUT + INDICATOR */}

        <div className="absolute inset-0 flex items-center justify-center">

          <motion.svg
          initial={{rotate:0}}
          animate={{rotate:360}}
        transition={{duration:2,ease:'easeInOut'}}
         viewBox="-200 -200 400 400"
         className="absolute w-[95%] h-[95%] lg:w-[420px] lg:h-[420px]"
         
       >
        <motion.circle r={RADIUS} fill={'none'} stroke={'#e6ff00'} 
        strokeWidth={2} 
        strokeDasharray={CIRCUMFERENCE}
        strokeDashoffset={CIRCUMFERENCE}
        initial={{strokeDashoffset:CIRCUMFERENCE}}
        animate={{strokeDashoffset:0}}
        transition={{duration:2,ease:'easeInOut'}}
        />
       </motion.svg>
          <motion.svg
            viewBox="-200 -200 400 400"
            className="absolute w-[95%] h-[95%] lg:w-[420px] lg:h-[420px]"
            style={{ rotate: wheelRotationAdjusted }}
          >
            
            <defs>
              <mask id="donutMask">
                <rect x="-200" y="-200" width="420" height="420" fill="black" />
                <motion.circle r={outerRadius} fill="white" />
                <motion.circle r={innerRadius} fill="black" />
              </mask>
              {IMAGES.map((_, i) => {
                const start = (i * sliceAngle * Math.PI) / 180;
                const end = ((i + 1) * sliceAngle * Math.PI) / 180;
                const x1 = Math.cos(start) * 180;
                const y1 = Math.sin(start) * 180;
                const x2 = Math.cos(end) * 180;
                const y2 = Math.sin(end) * 180;

                return (
                  <clipPath key={i} id={`slice-${i}`}>
                    <path d={`M0 0 L${x1} ${y1} A180 180 0 0 1 ${x2} ${y2} Z`} />
                  </clipPath>
                );
              })}
            </defs>
            <g mask="url(#donutMask)">
              {IMAGES.map(({ img }, i) => (
                <image
                  key={i}
                  href={img}
                  x="-200"
                  y="-200"
                  width="400"
                  height="400"
                  clipPath={`url(#slice-${i})`}
                  preserveAspectRatio="xMidYMid slice"
                />
              ))}
            </g>
          </motion.svg>

          <motion.svg
            viewBox="-200 -200 400 400"
            className="absolute w-[95%] h-[95%] lg:w-[420px] lg:h-[420px] pointer-events-none"
            style={{ rotate: indicatorRotation }}
          >
            <line x1="0" y1="-180" x2="0" y2="-120" stroke="#E6FF00" strokeWidth="8" />
          </motion.svg>

          <div className="absolute flex items-center justify-center w-[180px] h-[180px] rounded-full bgblack/60 backdrop-blurmd">
            <span className="text-[#E6FF00] stroke-slate-300 stroke-[5px]  font-semibold tracking-widest text-para font-custom uppercase">
              {IMAGES[activeIndex].title}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
