import React, { useRef } from 'react'
import {useScroll,motion, useTransform,useSpring} from 'framer-motion'

function Mask() {
    const scrollTracker= useRef(null)
    const {scrollYProgress}=useScroll({target:scrollTracker,offset:['start start','end end']})
   
           const scale=useSpring(useTransform(scrollYProgress,[0,1],[0,1]),{stiffness:120,damping:10,mass:.2})
           const x1=useSpring(useTransform(scrollYProgress,[0,1],['0%','-200%']),{stiffness:120,damping:10,mass:.2})
           const x2=useSpring(useTransform(scrollYProgress,[0,1],['0%','200%']),{stiffness:120,damping:10,mass:.2})
        

const arr= [8,7,6,5,4,3,2,1]
  return (
    <div ref={scrollTracker}   className='relative h-[300vh]  fle justify-center items-center'>
      <div className='sticky overflow-hidden top-0 w-full h-screen bg-black flex  items-center justify-center' >
            {/* <div>
                <img src='/images/owner.png' className='w-full object-cover h-screen object-top'/>
            </div> */}
            <div className='flex items-center justify-center gap-4 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2'>
                <motion.h2  style={{x:x1}} className='text-white font-custom2 leading-[.9] text-heading2 capitalize'>memet</motion.h2>
                <motion.h2  style={{x:x2}} className='text-white font-custom2 leading-[.9] text-heading2 capitalize'>oumar</motion.h2>
            </div>
           
        <motion.div style={{scale}} className=' overflow-hidden banner-img-container relativ w-full h-full will-change-transform'>
            <div className="img "><img className='w-full object-cover h-screen object-[50%_14%]'  src='/images/owner.png' /></div>
            {arr.map((a,i)=>{
           const scale=useSpring(useTransform(scrollYProgress,[0,.8],[i*.13,1]),{stiffness:100,damping:10,mass:.2})

           
                return (
            // <motion.div style={{scale:i*.08,zIndex:a}} className="img w-full mask [-webkit-mask-image:url('/images/mask.png')] [mask-image:url('/images/mask.png')] [mask-size:cover] [-webkit-mask-size:cover] [-webkit-mask-position:center] [mask-position:center] absolute top-0 left-0 h-full will-change-transform ">
            <motion.div style={{scale,zIndex:a}} className="img w-full ask [-webkit-mask-image:url('/images/mask.png')] [mask-image:url('/images/mask.png')] [mask-size:cover] [-webkit-mask-size:cover] [-webkit-mask-position:center] [mask-position:center] absolute top-0 left-0 h-full will-change-transform ">
                <img className=' w-full object-cover h-screen object-[50%_14%]' src='/images/mask.png' />

                </motion.div>
                   
                )
            })}
    </motion.div>
     {/* <div className='flex items-center justify-center gap-4 absolute top-[80%] left-1/2 -translate-x-1/2 -translate-y-1/2'>
           {'lorem ipsum dolor'.split(" ").map((word,i)=>{
           const opacity=useSpring(useTransform(scrollYProgress,[0.5+i*.1,1-i*.1],[0,1]),{stiffness:120,damping:10,mass:.2})

            return (
                <motion.span className='text-heading2 text-white font-custom2' style={{opacity}}>{word}</motion.span>
            )
           })}
            </div> */}
        </div>

        </div>
       
  )
}

export default Mask