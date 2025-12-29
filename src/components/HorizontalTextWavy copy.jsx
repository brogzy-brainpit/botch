'use client'
import { motion, useTransform, useScroll, useSpring, useInView} from "framer-motion";
import { useEffect, useRef} from "react";

import ScaleUpContent from "@/effects/ScaleUpContent";
import Magnetic from "@/common/Magnetic";
import GridColumn from "@/layout/GridColumn";
import Heading2 from "@/typography/Heading2";
import { useMediaQuery } from "react-responsive";


const HorizontalTextWavy = () => {
  const targetRef = useRef(null);
  // const isTabletOrMobile = useState(true)
  const isTabletOrMobile = useMediaQuery({ query: '(max-width: 1224px)' })
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset:['start start', 'end end']
  });
 
  // const x = useTransform(scrollYProgress, [0, 1], [isTabletOrMobile?'150%':'122%', isTabletOrMobile?'-90%':'-70%']);
  const x = useTransform(scrollYProgress, [0, .9], ['80%','-50%']);
  
  const swiftx = useSpring(x, { stiffness: 120, damping: 20, mass: 0.1 });
const texts=['m o v e','t e x t','o n','s c r o l l','a n i m a t i o n']
  return (

    <section ref={targetRef} className="  relative h-[600svh] bgneutral-900">
      <div className="sticky bgpurple-500 top-0 flex flex-col h-svh items-center justify-center overflow-hidden">
   {/* <div className="bgblue-600 grid grid-cols-12 gap5 h-full items-end place-content-end pb-20"> */}
   <GridColumn className={'bggreen-400'}>
    <motion.h2 style={{x:swiftx}} className='bgslate-400 justify-start w-[max-content] col-start-0 col-span-full mask-gradien text-black break-words text-[3em]  lg:text-[8em] leading-[0.95] tracking-[-0.03em] lowercase text-center font-custom font-black flex flex-co flexwrap'>
          {texts.map((word,index) => {
            const total= texts.length
            const start = 0.1+(index / total) * .8;
            const end=start+ .2 / total
          return <Text isTabletOrMobile={isTabletOrMobile} current={scrollYProgress} rangeForOnscroll={[start,end,end+.3]} range={[start,end,end+0.1]} rang={[index* 0.125,(index* 0.125)*0.125+(index* 0.125+0.1)]} word={word} wowrd={(index* 0.125)+1-scrollYProgress.current} index={index}  key={index} />;
          })}
          </motion.h2> 
 {/* {isTabletOrMobile && <p>You are a tablet or mobile phone</p>} */}


   </GridColumn>
   {/* </div> */}
      </div>
    </section>
   
   
  );
};

const Text = ({isTabletOrMobile,index,word,current,range,rangeForOnscroll}) => {
  

  const opacit = useTransform(current, rangeForOnscroll, [0, 0,1]);
   const opacity = useSpring(opacit, { stiffness: 120, damping: 30, mass: 0.3 });

  // const y = useTransform(current, range, [30, 0]);
  // const minusy = useTransform(current, range, [-28, 0]);
  const origy = useTransform(current, range, [isTabletOrMobile?10:40, isTabletOrMobile?-10:-18,0]);
  const x = useSpring(useTransform(current, range, [0,-20,0]),{ stiffness: 120, damping: 30, mass: 0.3 });
   const y = useSpring(origy, { stiffness: 120, damping: 30, mass: 0.3 });
  const minus = useTransform(current, range, [isTabletOrMobile?-10:-40, isTabletOrMobile?10:30,0]);
   const minusy = useSpring(minus, { stiffness: 120, damping: 30, mass: 0.3 });
  const rotatplus = useTransform(current, range, [-15,18, 0]);
   const rotate = useSpring(rotatplus, { stiffness: 120, damping: 30, mass: 0.3 });
  const rotateminu = useTransform(current, range, [20,-18, 0]);
   const rotateminus = useSpring(rotateminu, { stiffness: 120, damping: 30, mass: 0.3 });
  

    return  <motion.span  style={{opacity:1}}  className='flex  mr-[0.3em] relative inlineblock'>
      {word?.split(' ').map((alphabet,index)=>{
    return (
      <motion.div className=""  style={{x,rotate:index%2==0?rotate:rotateminus,y:index%2==0?y:minusy}}>
          {alphabet}
          </motion.div>
  ) 

      })}</motion.span>
 
    }

  

export default HorizontalTextWavy;

