"use client";

import { motion, useMotionValue, useTransform, animate, useScroll, AnimatePresence, useSpring, useInView } from "framer-motion";
import { useEffect, useRef, useState } from "react";

const IMAGES = [
  { index:0,img: "/images/man01.jpg", title: "Service 1" },
  { index:1,img: "/images/man02.jpg", title: "Service 2" },
  { index:2,img: "/images/man03.jpg", title: "Service 3" },
  { index:3,img: "/images/man04.jpg", title: "Service 4" },
  { index:4,img: "/images/man05.webp", title: "Service 5" },
  { index:5,img: "/images/man06.jpg", title: "Service 6" },
  { index:6,img: "/images/man07.jpg", title: "Service 7" },
  { index:7,img: "/images/man08.jpg", title: "Service 8" },
  { index:8,img: "/images/service03.png", title: "Service 9" },
  { index:9,img: "/images/service04.png", title: "Service 10" },
  { index:10,img: "/images/service05.png", title: "Service 11" },
  { index:11,img: "/images/service01.png", title: "Service 12" },
];

export default function Try() {
   const svgRef=useRef(null)
  const inView= useInView(svgRef,{once:false})
    const svgSlide={
    initial:{}
,
     enter:{
       // clipPath:'inset(0 0 0 0)',
      transition: {
        duration:1,
        delayChildren:0.2, // 👈 wait before starting
        staggerChildren:0.09,  
            // 👈 delay between items
      },
    },
    exit:{},
  }
  const pathSlide={
    initial:(i)=>({
      y:70,
      opacity:0,
      clipPath: i==1?'inset(0 0 100% 0)':'inset(100% 0 0 0)',

    }),
     enter:(i)=>({
      y:0,
      opacity:1,
      clipPath:'inset(0 0 0 0)',
      transition:{ type: "spring",
        stiffness:120,
        damping:17,
        ease:[0.76, 0, 0.24, 1]
      },
    }),
    exit:(i)=>({
        y:70,
      opacity:0,
      clipPath: i==1?'inset(0 0 100% 0)':'inset(100% 0 0 0)',
    }),
  }
  const scrollContainer = useRef(null);
  const { scrollYProgress } = useScroll({
    target: scrollContainer,
    offset: ["start start", "end end"],
  });

  const total = IMAGES.length;
  const sliceAngle = 360 / total;

  const outerRadius =useMotionValue(180)
  const innerRadius =useMotionValue(235)
  const strokeWidth =useMotionValue(2)
  const lineWidth =useMotionValue(0)
  
  const RADIUS=180
  const IMAGESCALE=.8
  const CIRCUMFERENCE=2*Math.PI*RADIUS
  // Motion values
  const wheelRotation = useSpring(0,{stiffness:120,damping:20,mass:.2});
  const indicatorRotation = useSpring(0,{stiffness:120,damping:20,mass:.2});
  const wheelRotationAdjusted =useTransform(wheelRotation, (v) => v - 90);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const lastIndexRef = useRef(null);

  const autoRef = useRef({ wheel: null, indicator: null });
  const scrollTimeout = useRef();

  useEffect(() => {

    const timeout= setTimeout(() => {
      setIsLoading(false)
    animate(strokeWidth, 0, { duration: .2, ease: "linear" });
    animate(lineWidth, 2, { duration: .2, ease: "linear" });
    animate(innerRadius, 120, { duration: .4, ease: "linear" });
    // start auto animation
      autoRef.current.wheel = animate(wheelRotation, 360, { duration: 60, repeat: Infinity, ease: "linear" });
      autoRef.current.indicator = animate(indicatorRotation, -360, { duration: 60, repeat: Infinity, ease: "linear"  });
  
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
      
    }, 5000);
    return ()=>clearTimeout(timeout)
  }, []);

  // Scroll hijack
  useEffect(() => {
    const unsubscribe = scrollYProgress.on("change", (progress) => {
      animate(strokeWidth, 2, { duration: .2, ease: "linear" });
    animate(innerRadius, 235, { duration: .4, ease: "linear" });
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
        animate(strokeWidth, 0, { duration: .4, ease: "easeInOut" });
    animate(outerRadius, 180, { duration: .4, ease: "linear" });
    animate(innerRadius, 120, { duration: .4, ease: "linear" });
        autoRef.current.wheel = animate(wheelRotation, wheelRotation.get() + 360, { duration: 60, repeat: Infinity, ease: "linear" });
        autoRef.current.indicator = animate(indicatorRotation, indicatorRotation.get() - 360, { duration: 60, repeat: Infinity, ease: "linear" });
      }, 600);
    });

    return () => unsubscribe();
  }, [scrollYProgress]);

  return (
    <div ref={scrollContainer} className="h-[600vh] relative">
      <div className="top-0 sticky w-full h-screen overflow-hidden bg-black">
<div className="absolute z-[888] bottom-0 w-full">
           <motion.svg ref={svgRef} variants={svgSlide} initial='initial' exit='exit' animate={!isLoading?'enter':'initial'} width={'100%'} viewBox="0 0 651 105" fill="none" xmlns="http://www.w3.org/2000/svg">
        <motion.path variants={pathSlide}  d="M4.47035e-08 73.2L43.44 21.6H4.47035e-08V2.40002H69.84V21.6L26.28 73.2H69.84V92.4H4.47035e-08V73.2Z" fill="#D23823"/>
        <motion.path variants={pathSlide}  d="M120.34 92.4H101.14L75.8203 2.40002H95.0203L110.74 58.44L116.98 36.48L107.38 2.40002H126.58L142.3 58.32L158.14 2.40002H177.34L151.9 92.4H132.7L126.58 70.56L120.34 92.4ZM185.198 64.92V55.56H214.238V64.92H185.198Z" fill="#D23823"/>
        <motion.path variants={pathSlide} fill={'#ffffff'}  d="M299.11 13.08L285.55 27.48C280.63 21.84 273.67 19.32 266.83 19.32C253.99 19.32 241.63 27.36 241.63 47.4C241.63 85.44 280.27 85.56 274.03 57L269.95 38.4H289.63L301.39 92.4H281.83L280.87 87.84C262.75 104.16 222.07 91.92 222.07 47.4C222.07 18.96 239.83 1.95503e-05 266.71 1.95503e-05C280.15 1.95503e-05 291.31 4.80002 299.11 13.08Z"/>
        <motion.path variants={pathSlide} fill={'#ffffff'}  d="M369.903 27.36L354.303 41.28C369.543 41.64 377.103 50.16 377.103 66.84V92.4H357.903V69.72C357.903 65.28 355.383 61.08 350.703 61.08H334.743V33.72L348.303 21.6H328.983V92.4H307.383V2.40002H369.903V27.36Z"/>
        <motion.path variants={pathSlide} fill={'#ffffff'}  d="M427.846 75.48C439.966 75.48 452.926 67.44 452.926 47.4C452.926 27.36 439.966 19.32 427.846 19.32C415.006 19.32 402.646 27.36 402.646 47.4C402.646 67.44 415.006 75.48 427.846 75.48ZM383.086 47.4C383.086 18.96 400.846 1.95503e-05 427.726 1.95503e-05C454.606 1.95503e-05 472.366 18.96 472.366 47.4C472.366 75.84 454.606 94.8 427.726 94.8C400.846 94.8 383.086 75.84 383.086 47.4Z" />
        <motion.path variants={pathSlide} fill={'#ffffff'}  d="M478.359 59.88V2.40002H497.559V59.88C497.559 70.32 502.839 75.6 513.279 75.6C523.719 75.6 528.879 70.32 528.879 59.88V2.40002H548.079V59.88C548.079 83.28 536.679 94.8 513.279 94.8C489.879 94.8 478.359 83.28 478.359 59.88Z"/>
        <motion.path variants={pathSlide} fill={'#ffffff'}  d="M554.063 2.40002H596.063C616.583 2.40002 623.783 11.4 623.783 30.12C623.783 48.48 616.583 57.6 596.063 57.6H575.663V92.4H554.063V2.40002ZM575.663 38.52H594.983C599.663 38.52 602.183 34.32 602.183 29.88C602.183 25.2 599.663 21.6 594.983 21.6H575.663V38.52Z"/>
        <motion.path variants={pathSlide} fill="#D23823"  d="M635.406 85.92C635.406 82.96 636.126 80.88 637.566 79.68C639.006 78.48 640.726 77.88 642.726 77.88C644.806 77.88 646.566 78.48 648.006 79.68C649.526 80.88 650.286 82.96 650.286 85.92C650.286 88.8 649.526 90.88 648.006 92.16C646.566 93.44 644.806 94.08 642.726 94.08C640.726 94.08 639.006 93.44 637.566 92.16C636.126 90.88 635.406 88.8 635.406 85.92Z" />
        </motion.svg>

</div>
<div className="absolute z-[100000] bottom-0 w-full">
           <motion.svg ref={svgRef} variants={svgSlide} initial='initial' exit='exit' animate={!isLoading?'enter':'initial'} width={'100%'} viewBox="0 0 651 105" fill="none" xmlns="http://www.w3.org/2000/svg">
        <motion.path variants={pathSlide}  d="M4.47035e-08 73.2L43.44 21.6H4.47035e-08V2.40002H69.84V21.6L26.28 73.2H69.84V92.4H4.47035e-08V73.2Z" fill="#D23823"/>
        <motion.path variants={pathSlide}  d="M120.34 92.4H101.14L75.8203 2.40002H95.0203L110.74 58.44L116.98 36.48L107.38 2.40002H126.58L142.3 58.32L158.14 2.40002H177.34L151.9 92.4H132.7L126.58 70.56L120.34 92.4ZM185.198 64.92V55.56H214.238V64.92H185.198Z" fill="#D23823"/>
        <motion.path variants={pathSlide} stroke={'#ffffff'} strokeWidth={1}  d="M299.11 13.08L285.55 27.48C280.63 21.84 273.67 19.32 266.83 19.32C253.99 19.32 241.63 27.36 241.63 47.4C241.63 85.44 280.27 85.56 274.03 57L269.95 38.4H289.63L301.39 92.4H281.83L280.87 87.84C262.75 104.16 222.07 91.92 222.07 47.4C222.07 18.96 239.83 1.95503e-05 266.71 1.95503e-05C280.15 1.95503e-05 291.31 4.80002 299.11 13.08Z"/>
        <motion.path variants={pathSlide} stroke={'#ffffff'} strokeWidth={1}  d="M369.903 27.36L354.303 41.28C369.543 41.64 377.103 50.16 377.103 66.84V92.4H357.903V69.72C357.903 65.28 355.383 61.08 350.703 61.08H334.743V33.72L348.303 21.6H328.983V92.4H307.383V2.40002H369.903V27.36Z"/>
        <motion.path variants={pathSlide} stroke={'#ffffff'} strokeWidth={1}  d="M427.846 75.48C439.966 75.48 452.926 67.44 452.926 47.4C452.926 27.36 439.966 19.32 427.846 19.32C415.006 19.32 402.646 27.36 402.646 47.4C402.646 67.44 415.006 75.48 427.846 75.48ZM383.086 47.4C383.086 18.96 400.846 1.95503e-05 427.726 1.95503e-05C454.606 1.95503e-05 472.366 18.96 472.366 47.4C472.366 75.84 454.606 94.8 427.726 94.8C400.846 94.8 383.086 75.84 383.086 47.4Z" />
        <motion.path variants={pathSlide} stroke={'#ffffff'} strokeWidth={1}  d="M478.359 59.88V2.40002H497.559V59.88C497.559 70.32 502.839 75.6 513.279 75.6C523.719 75.6 528.879 70.32 528.879 59.88V2.40002H548.079V59.88C548.079 83.28 536.679 94.8 513.279 94.8C489.879 94.8 478.359 83.28 478.359 59.88Z"/>
        <motion.path variants={pathSlide} stroke={'#ffffff'} strokeWidth={1}  d="M554.063 2.40002H596.063C616.583 2.40002 623.783 11.4 623.783 30.12C623.783 48.48 616.583 57.6 596.063 57.6H575.663V92.4H554.063V2.40002ZM575.663 38.52H594.983C599.663 38.52 602.183 34.32 602.183 29.88C602.183 25.2 599.663 21.6 594.983 21.6H575.663V38.52Z"/>
        <motion.path variants={pathSlide} fill="#D23823"  d="M635.406 85.92C635.406 82.96 636.126 80.88 637.566 79.68C639.006 78.48 640.726 77.88 642.726 77.88C644.806 77.88 646.566 78.48 648.006 79.68C649.526 80.88 650.286 82.96 650.286 85.92C650.286 88.8 649.526 90.88 648.006 92.16C646.566 93.44 644.806 94.08 642.726 94.08C640.726 94.08 639.006 93.44 637.566 92.16C636.126 90.88 635.406 88.8 635.406 85.92Z" />
        </motion.svg>

</div>
        {/* BACKGROUND IMAGE */}
        {!isLoading &&  <AnimatePresence key={IMAGES[activeIndex].index} mode="wait"  >
        <motion.img

        src={IMAGES[activeIndex].img}
         className="absolute w-full h-full inset-0 object-cover object-[50%,20%] transition-opacity"
          initial={{opacity:0,scale:1.1}}
          animate={{opacity:1,scale:1.08}}
          exit={{opacity:0,scale:1.2}}
          transition={{ duration: .4,scale:{duration:2}, ease: "easeOut" }}
        />

        
        
        </AnimatePresence>}
       

        {/* DARK OVERLAY */}
        <div className="absolute inset-0 bg-black/50" />
        {/* {isLoading &&  <div className="absolute inset-0 bg-black" /> } */}

        {/* DONUT + INDICATOR */}

        <div className="absolute z-preloader inset-0 flex items-center justify-center">

          <motion.svg
          initial={{rotate:0,scale:.3}}
          
          animate={{rotate:360*4,scale:1}}
        transition={{duration:4,repeat: Infinity,ease:'easeInOut',scale:{duration:3}}}
         viewBox="-200 -200 400 400"
         className="absolute w-[95%] h-[95%] lg:w-[420px] lg:h-[420px]"
         
       >
        <motion.circle r={RADIUS} fill={'none'} stroke={'#e6ff00'} 
        strokeWidth={strokeWidth} 
        strokeDasharray={CIRCUMFERENCE}
        strokeDashoffset={CIRCUMFERENCE}
        initial={{strokeDashoffset:CIRCUMFERENCE}}
        animate={{strokeDashoffset:0}}
        transition={{duration:4,ease:'easeInOut'}}
        />
       </motion.svg>


          <motion.svg
            viewBox="-200 -200 400 400"
            className="absolute w-[95%] h-[95%] lg:w-[420px] lg:h-[420px]"
            style={{ rotate: wheelRotationAdjusted }}
          >
            
            <defs>
              <mask id="donutMask">
                <rect x="-200" y="-200" width="320" height="420" fill="black" />
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
                  className="object-cove"
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
            <motion.line x1="0" y1="-180" x2="0" y2="-120" stroke="#E6FF00" strokeWidth={lineWidth} />
          </motion.svg>

        
           {!isLoading &&  <AnimatePresence key={IMAGES[activeIndex].index} mode="wait"  >
        

          <motion.div className="absolute flex items-center justify-center w-[180px] h-[180px] rounded-full bgblack/60 backdrop-blurmd"

          initial={{opacity:0,}}
          animate={{opacity:1}}
          exit={{opacity:0}}
          transition={{ duration: .4, ease: "easeOut" }}
        >
 <span className="text-[#E6FF00] stroke-slate-300 stroke-[5px]  font-semibold tracking-widest text-para font-custom uppercase">
              {IMAGES[activeIndex].title}
            </span>
        </motion.div>
        
        </AnimatePresence>}
        </div>
      </div>
    </div>
  );
}
