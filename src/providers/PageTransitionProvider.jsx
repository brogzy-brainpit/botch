'use client'
import { AnimatePresence,motion} from 'framer-motion'
import React from 'react'
import {usePathname} from "next/navigation"

function PageTransitionProvider({children}) {
  const pathname= usePathname();
  return (
   <AnimatePresence mode='wait' >
<motion.div initial={{opacity:0,y:20}}
  animate={{opacity:1,y:0}} 
   exit={{opacity:0,y:-20}}
   key={pathname} 
   className='absolute inset-0'
   >
  {children}
</motion.div>
   </AnimatePresence>
  )
}

export default PageTransitionProvider