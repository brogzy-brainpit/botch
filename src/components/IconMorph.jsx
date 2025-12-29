"use client";

import React, {
  useRef,
  useState,
  useLayoutEffect,
  useEffect,
} from "react";
import { motion, progress, useMotionValue, useScroll, useTransform,useAnimation } from "framer-motion";
import useWindow from "./useWindow";
import { useElementCenter } from "./useElementCenter";
import { useMediaQuery} from "react-responsive";

const ITEMS = [0, 1,2,3,4,5,6,7];

export default function IconMorph() {
  const control1= useAnimation()
  const sectionRef = useRef(null);
  const stickyRef = useRef(null);
  const fixedContainer = useRef(null);
  const fixedIcon1 = useRef([]);
const icon1 = useRef(null);
const icon2 = useRef(null);
const icon3 = useRef(null);
const icon4 = useRef(null);
const icon5 = useRef(null);
const [isFixed,setIsFixed] = useState(true);

  const { dimension } = useWindow();
  const isTabletOrMobile = useMediaQuery({ query: '(max-width: 1000px)' })
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });
  useEffect(()=>{

    scrollYProgress.on('change',(progress)=>{
  if(progress>=.5){
    setIsFixed(false)
  }
  else{
        setIsFixed(true)

  }
    })

  },[])
  /* -- Viewport center-- */
  const { x:stickyX, y:stickyY} = useElementCenter(stickyRef, scrollYProgress);
  const { x:fixedContX, y:fixedContY,yBottom:fixedContYBottom,elWidth:fixedContWidth,} = useElementCenter(fixedContainer, scrollYProgress);
  const centerX = dimension.width / 2;
  const centerY = dimension.height/2

  
  const { x:fixedIcon1X, y:fixedIcon1Y,yBottom:fixedIcon1YBottom,elWidth:fixedIcon1Width,} = useElementCenter(fixedIcon1, scrollYProgress);

 
 
 
  const { x:icon1X, y:icon1Y,yBottom:icon1YBottom,elHeight:icon1Height,elWidth:icon1Width,elTop,elLeft } = useElementCenter(icon1, scrollYProgress);
  const { x:icon2X, y:icon2Y,yBottom:icon2YBottom,elWidth:icon2Width,} = useElementCenter(icon2, scrollYProgress);
  const { x:icon3X, y:icon3Y,yBottom:icon3YBottom,elWidth:icon3Width,} = useElementCenter(icon3, scrollYProgress);
  const { x:icon4X, y:icon4Y,yBottom:icon4YBottom,elWidth:icon4Width,} = useElementCenter(icon4, scrollYProgress);
  const { x:icon5X, y:icon5Y,yBottom:icon5YBottom,elWidth:icon5Width,} = useElementCenter(icon5, scrollYProgress);


//     const item1Y= useTransform(scrollYProgress,[.60,.85],[stickyY.get()-icon1Y.get(),0])
//  const item1X= useTransform(scrollYProgress,[.85,0.99],[centerX - icon1X.get()-icon1Width.get()*2.1, 0] )

//   const item2Y= useTransform(scrollYProgress,[.60,.85],[stickyY.get()-icon2Y.get(),0])
//  const item2X= useTransform(scrollYProgress,[.85,0.99],[centerX - icon2X.get()-icon2Width.get()*1.1, 0] )

//   const item3Y= useTransform(scrollYProgress,[.60,.85],[stickyY.get()-icon3Y.get(),0])
//  const item3X= useTransform(scrollYProgress,[.85,0.99],[centerX - icon3X.get(), 0] )

//   const item4Y= useTransform(scrollYProgress,[.60,.85],[stickyY.get()-icon4Y.get(),0])
//  const item4X= useTransform(scrollYProgress,[.85,0.99],[centerX - icon4X.get()+icon4Width.get()*1.1, 0] )

//   const item5Y= useTransform(scrollYProgress,[.60,.85],[stickyY.get()-icon5Y.get(),0])
//  const item5X= useTransform(scrollYProgress,[.85,0.99],[centerX - icon5X.get()+icon5Width.get()*2.1, 0] )


  const item1Y= useTransform(scrollYProgress,[.48,.85],[stickyY.get()-icon1Y.get()+0,0])
 const item1X= useTransform(scrollYProgress,[.85,0.99],[centerX - icon1X.get()-icon1Width.get()*2.2, 0] )

  const item2Y= useTransform(scrollYProgress,[.48,.85],[stickyY.get()-icon2Y.get()+0,0])
 const item2X= useTransform(scrollYProgress,[.85,0.99],[centerX - icon2X.get()-icon2Width.get()*1.1, 0] )

  const item3Y= useTransform(scrollYProgress,[.48,.85],[stickyY.get()-icon3Y.get()+0,0])
 const item3X= useTransform(scrollYProgress,[.85,0.99],[centerX - icon3X.get(), 0] )

  const item4Y= useTransform(scrollYProgress,[.48,.85],[stickyY.get()-icon4Y.get()+0,0])
 const item4X= useTransform(scrollYProgress,[.85,0.99],[centerX - icon4X.get()+icon4Width.get()*1.1, 0] )

  const item5Y= useTransform(scrollYProgress,[.48,.85],[stickyY.get()-icon5Y.get()+0,0])
 const item5X= useTransform(scrollYProgress,[.85,0.99],[centerX - icon5X.get()+icon5Width.get()*2.2, 0] )

  const headerIconSize= isTabletOrMobile?30:60;
  const exactScale= headerIconSize/fixedIcon1Width.get();
// console.log(exactScale)


// fixed containers transform
// fixed containers transform
const fixedContainerX= useTransform(scrollYProgress,[0, .30],[0,centerX - fixedContX.get()])
 const fixedContainerY= useTransform(scrollYProgress,[0,.30],[0,centerY - fixedContY.get()] )
 const fixedContainerScale= useTransform(scrollYProgress,[0.2,.35],[1,exactScale] )
// fixed containers transform
// fixed containers transform
const text='Lorem ipsum dolor sit amet, <icon1> consectetur adipisicing elit. <icon2> Laboriosam qui sint tenetur harum <icon3> tempora eligendi autem doloribus, eum, ipsa assumenda perspiciatis <icon4> optio quod dolor quis  <icon5> architecto eius fuga facilis adipisci?'
  return (
    <section
      ref={sectionRef}
      className="relative h-[900vh] p-10 bgblue-800"
    >
      {/* ================= Inline ================= */}
      <div  ref={stickyRef} className="sticky top-0 h-svh flex items-center justify-center text-neutral-800">
        <p className="font-custom leading-none w-[25em] text-center flex-wra textbalance gap-6 text-heading3">
          {text.split(' ').map((word,i)=>{
            if(word=='<icon1>'){
        return  <span key={i} ref={icon1} className=" inline-block align-middle rounded-[8%] overflow-cli w-[30px] h-[30px] lg:w-[60px] lg:h-[60px]"
             >
              {!isFixed &&    <motion.span  layoutId="img-1" style={{y:item1Y,x:item1X}} 
                className="flex align-middle rounded-[8%] overflow-clip w-full h-full lg:w-full lg:h-full"
              >
                <img
                    src="/images/man01.jpg"
                    className="w-full h-full object-cover"
                    
                  />
                  
              </motion.span>}
         </span>
            }else if(word=='<icon2>'){
            return (
         <span key={i} ref={icon2} className="inline-block align-middle rounded-[8%] overflow-cli w-[30px] h-[30px] lg:w-[60px] lg:h-[60px]"
             >
              {!isFixed && <motion.span  key={!isFixed?'hidden':'visible'} layoutId="img-2" style={{y:item2Y,x:item2X}} 
                className="inline-block align-middle rounded-[8%] overflow-clip w-full h-full lg:w-full lg:h-full"
              >
                <img
                    src="/images/man02.jpg"
                    className="w-full h-full object-cover"
                    
                  />
              </motion.span>}
         </span>
            )}
            else if(word=='<icon3>'){
            return (
          <span key={i} ref={icon3} className="inline-block align-middle rounded-full overflow-cli w-[30px] h-[30px] lg:w-[60px] lg:h-[60px]"
             >
              {!isFixed &&    <motion.span  layoutId="img-3" style={{y:item3Y,x:item3X}} 
                className="inline-block align-middle rounded-full overflow-clip w-full h-full lg:w-full lg:h-full"
              >
                <img
                    src="/images/man03.jpg"
                    className="w-full h-full object-cover"
                    
                  />
              </motion.span>}
         </span>
            )}else if(word=='<icon4>'){
            return (
          <span key={i} ref={icon4} className="inline-block align-middle rounded-[8%] overflow-cli w-[30px] h-[30px] lg:w-[60px] lg:h-[60px]"
             >
              {!isFixed &&    <motion.span  layoutId="img-4" style={{y:item4Y,x:item4X}} 
                className="inline-block align-middle rounded-[8%] overflow-clip w-full h-full lg:w-full lg:h-full"
              >
                <img
                    src="/images/man04.jpg"
                    className="w-full h-full object-cover"
                    
                  />
              </motion.span>}
         </span> 
            )}else if(word=='<icon5>'){
            return (
         <span key={i} ref={icon5} className="inline-block align-middle rounded-[8%] overflow-cli w-[30px] h-[30px] lg:w-[60px] lg:h-[60px]"
             >
              {!isFixed &&    <motion.span  layoutId="img-5" style={{y:item5Y,x:item5X}} 
                className="inline-block align-middle rounded-[8%] overflow-clip w-full h-full lg:w-full lg:h-full"
              >
                <img
                    src="/images/man05.webp"
                    className="w-full h-full object-cover"
                    
                  />
              </motion.span>}
         </span>
            )}else{
               const IN_END = 0.99;
              
     const inStart = (i* Math.random() / text.length) * .6+.8;
              const inEnd = inStart + IN_END / text.length;
              const opacity= useTransform(scrollYProgress,[inStart,inEnd],[0,1])
             return <motion.span key={i} style={{opacity}}>{' '}{word} {' '}</motion.span>
            }
          })}
          
        
          
      
        </p>
      </div>

<motion.div  ref={fixedContainer} transition={{duration:0}} style={{x:fixedContainerX,y:fixedContainerY,scale:fixedContainerScale}} className="fixed px-10 bgslate-500 gap-[1rem] flex bottom-[.5em] left-0 justify-between w-full"> 

 <motion.div ref={fixedIcon1} className=" flex-1 bg-purple500 aspect-square">
  {isFixed && 
    <motion.span  layoutId="img-1"
                className="inline-block align-middle rounded-[8%] overflow-clip w-full h-full lg:w-full lg:h-full"
              >
                <img
                    src="/images/man01.jpg"
                    className="w-full h-full object-cover"
                    
                  />
              </motion.span>
  }
  </motion.div>

   <motion.div  className=" flex-1 bg-purple500 aspect-square">
  {isFixed && 
    <motion.span  layoutId="img-2"
                className="inline-block align-middle rounded-[8%] overflow-clip w-full h-full lg:w-full lg:h-full"
              >
                <img
                    src="/images/man02.jpg"
                    className="w-full h-full object-cover"
                    
                  />
              </motion.span>
  }
  </motion.div>
   <motion.div  className=" flex-1 bg-purple500 aspect-square">
  {isFixed && 
    <motion.span  layoutId="img-3"
                className="inline-block align-middle rounded-full overflow-clip w-full h-full lg:w-full lg:h-full"
              >
                <img
                    src="/images/man03.jpg"
                    className="w-full h-full object-cover"
                    
                  />
              </motion.span>
  }
  </motion.div>
   <motion.div  className=" flex-1 bg-purple500 aspect-square">
  {isFixed && 
    <motion.span  layoutId="img-4"
                className="inline-block align-middle rounded-[8%] overflow-clip w-full h-full lg:w-full lg:h-full"
              >
                <img
                    src="/images/man04.jpg"
                    className="w-full h-full object-cover"
                    
                  />
              </motion.span>
  }
  </motion.div>
   <motion.div  className=" flex-1 bg-purple500 aspect-square">
  {isFixed && 
    <motion.span initial={{x:0,transition:{duration:0}}} layoutId="img-5"
                className="inline-block align-middle rounded-[8%] overflow-clip w-full h-full lg:w-full lg:h-full"
              >
                <img
                    src="/images/man05.webp"
                    className="w-full h-full object-cover"
                    
                  />
              </motion.span>
  }
  </motion.div>


</motion.div>
    </section>
  );
}
