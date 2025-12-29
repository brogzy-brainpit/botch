import React from 'react'
import {animate, motion, useInView} from 'framer-motion'
import ScaleUpContent from '@/effects/ScaleUpContent'
import Magnetic from '@/common/Magnetic'

function TextLanding({preLoaderOut=true}) {
  const parent={
  initial:{
    
  },
    animate:{
      transition:{
        delayChildren:0,
        staggerChildren:0.03
      }
  },
  exit:{
      transition:{
        delayChildren:0,
        staggerChildren:0.03
      }
  }

 }
 const child={
  initial:{
    scale:0,
    x:130,
    y:80,
  },
   exit:{
    scale:0,
    x:130,
    y:80,
  },
    animate:{
      scale:1,
       x:0,
    y:0,
      // transition: { duration: 0.75, type: "tween", ease: [0.76, 0, 0.24, 1]}
     transition: {
      // duration: 0.75, type: "tween", ease: [0.76, 0, 0.24, 1],
      ease: [0.76, 0, 0.24, 1],
        type: "spring",
        stiffness:100,
        damping:13,
        // duration:0.4, // ignored for spring but could use if tween
      },
    }
  
 }
  return (
    <div className=' max-w-[50em]  relative h-full w-full flex items-end justify-center pb-[4em] z-[5] bgslate-500'>
  <motion.h2 className='text-neutral-800 break-word text-heading2 leading-[0.95] tracking-[-0.03em] lowercase text-center justify-center font-custom font-black ' initial='initial' exit='exit' animate={preLoaderOut?'animate':'initial'} variants={parent} >
 
    <motion.span variants={child} className='mr-[0.2em] inline-block'>we</motion.span>
    <motion.span variants={child} className='relative mr-[0.2em] inline-block'>
      <div className='cursor-pointer absolute top-0 translate-y-[-45%] translate-x-[45%]'>
        <ScaleUpContent damping={5} >
<Magnetic >

        <img initial={{x:80,scale:0}} animate={{x:0,scale:1}} transition={{duration:0.6,ease:'easeOut'}}   src='/truus/smile.svg' className='w-[40px] h-[40px] lg:w-[80px] lg:h-[80px]'/>
</Magnetic>
        </ScaleUpContent>
      </div>
      make</motion.span>
    <motion.span variants={child} className='mr-[0.2em] inline-block font-custom2 font-normal leading-[0.5] italic text-[.75em] loratest'>advertising</motion.span>
    <motion.span variants={child} className='mr-[0.2em] inline-block'>for</motion.span>
    <motion.span variants={child} className='mr-[0.2em] inline-block'>the</motion.span>
    <motion.span variants={child} className='mr-[0.2em] inline-block'>new</motion.span>
     <motion.span variants={child} className=' relative mr-[0.2em] inline-block'>
      <div className='w-full absolute top-0 left-0 translate-x-[0%]'>
        {/* <img src='/truus/circle.svg' className='!w-[150%]'/> */}
        <motion.svg xmlns="http://www.w3.org/2000/svg" width="105%" viewBox="0 0 608 100" fill="none">
        <motion.path initial={{pathLength:0}} animate={{pathLength:1}} transition={{duration:0.6,ease:'easeOut'}} d="M322.902 98.9997C232.515 99.0422 140.637 94.7899 58.0275 80.853C31.532 76.3775 2.92086 69.1167 1.08733 58.1139C-0.222339 50.1514 13.3981 42.965 28.5701 37.4583C61.2714 25.5944 103.362 18.1423 146.239 12.7206C228.606 2.3131 316.878 -1.23755 403.155 2.36627C456.307 4.58809 509.519 9.62707 555.338 20.109C581.41 26.0728 606.777 35.279 606.999 46.8453C607.12 53.7659 597.831 60.3569 584.835 65.1939C571.839 70.0309 555.398 73.3158 538.675 76.0266C463.097 88.252 379.057 89.8891 297.011 91.3668" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></motion.path></motion.svg>
        {/* stroke-dashoffset: 0; stroke-dasharray: 1277.72px, 0.1px; */}
      </div>
      mainstream</motion.span>
   
{/* <TitleLineSvg/> */}

  </motion.h2>
</div>
  )
}

export default TextLanding