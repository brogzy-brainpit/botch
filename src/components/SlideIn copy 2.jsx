import Copy from '@/effects/Copy';
import { useScroll, useTransform ,motion, useSpring} from 'framer-motion'
import React, { useRef } from 'react'

function SlideIn() {
  const ref=useRef(null)
  const {scrollYProgress}=useScroll({target:ref,offset:['start start','end end']})
  const opacity= useTransform(scrollYProgress,[0,0.3],[0,1]);
  const scale= useTransform(scrollYProgress,[0,0.3],[0.8,1]);
  const scaleX= useTransform(scrollYProgress,[0.4,1],['0%','-150%']);
  return (
   <section ref={ref} className='relative h-[600vh] w-full bg-red-400'>
    <div className="sticky top-0 h-screen overflow-hidden">
      <motion.div style={{opacity,scale,x:scaleX}} className='w-screen h-screen flex items-center justify-center bg-purple-400 '>
        <h2 className='text-7xl text-white'>
          slide 01
        </h2>

 

      </motion.div>
    </div>

   </section>
  )
}

export default SlideIn