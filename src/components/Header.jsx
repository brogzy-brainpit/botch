
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import logo from "../../public/images/logo.svg"
import Image from 'next/image.js'
import Button from './Button'
import {AnimatePresence, motion} from 'framer-motion'
import { Umbrella } from 'lucide-react'
import Logo from './Logo'
import Magnetic from '@/common/Magnetic'
import Section from '@/layout/Section'
import Copy from '@/effects/Copy'



const ease = [0.9, 0, 0.1, 1];
function Header({preLoaderOut}) {
const header={
    initial:{y:'-100%'},
    enter: {
      y:'0%',
      transition:{
         type:'tween',
         duration: 1,
          delay:0.5,
          ease,
      }

    },
    exit:{y:'-100%'},
    
  };
 
  return (
        <motion.div variants={header} className='fixed top-0 left-0 z-header w-full  bgslate-600' initial={'initial'} exit={'exit'} animate={preLoaderOut?'enter':'intial'}>
      <Section padding={false} className={'h-full px-5 py- py-4 pb-5 lg:py-4'}>
       <div className='flex items-center justify-between h-full bgpink-400' >
 <h2 className='font-custom2 text-para '> byMemet&copy;</h2>

 <Menu/>
       </div>

      </Section>
        </motion.div>
  )
}



const Menu=()=>{
   const [isMenuOpen,setIsMenuOpen]=useState(false)
   const [MenuFullyOpened,setMenuFullyOpened]=useState(false)
    const [hoverIndex,setHoverIndex]=useState(0)
     const menu={
    initial:{
      height:'0dvh',
      width:'0dvw',
       top:'50%',
       right:'50%',
     y:'0%',
     x:'0%',
    },
    enter: {
     height:'85dvh',
     width:'85dvw',
     top:'0%',
     right:'2%',
     y:'2%',
     x:'2%',
      transition:{
         type:'tween',
         duration: 1,
          ease,
      }

    },
 exit:{
      height:'0dvh',
      width:'0dvw',
       top:'50%',
       right:'50%',
     y:'0%',
     x:'0%',
       transition:{
         type:'tween',
         duration: .8,
          ease,
      }
    },
    
  };
   const links=[
    {url:'/about',
      title:'about',
      src:'/images/001.png',
    },
    {url:'/about',title:'services',
      src:'/images/002.png',
      
    },
    {url:'/about',title:'introduction',
      src:'/images/003.png',
    },
    {url:'/about',title:'activities',
      src:'/images/004.png',
    },
    {url:'/about',title:'contact',
      src:'/images/005.png',
    },
  ]
  return (
    <div className=' bgslate-500 relative py-4'>
      <AnimatePresence mode='wait'>

     <motion.div variants={menu} initial={'initial'} onAnimationComplete={()=>setTimeout(() => {
setMenuFullyOpened(true)
     }, 600)}
      animate={isMenuOpen?'enter':'initial'}
       exit={'exit'}
       
      className='absolute  top-[50%] right-[50%] translate-x-[2%] overflow-clip bg-white shadow-xl  rounded-3xl h-[95dvh] w-full'>
      {isMenuOpen && <div   className='w-full px-5 flex items-center  h-full font-custom2 text-heading3 text-black'>
        <div className='flex flex-col gap-4'>
       {links.map(({title,url},i)=>{
        return (
        <Link href={url}>
      <Copy intialDelay={i*.08} text={title} trigger={MenuFullyOpened}/>
        </Link>
      )
     })}
          </div>
        </div>}
      </motion.div>

      </AnimatePresence>
     <div className='relative  flex gap-6 items-center justify-between min-w-[9em] p-2 pl-6 shadow-lg rounded-full bg-[#FACC15]'>
     <h2 className='font-custom text-para text-black uppercase font-bold'>
    {isMenuOpen?'close':'menu'}
     </h2>
     <Magnetic>
      <motion.div initial={{scale:0}} exit={{scale:0}} animate={{scale:1}} transition={{duration:1.8,delay:.4,ease}}
        onClick={()=>{setIsMenuOpen(!isMenuOpen)}} className='cursor-pointer bg-white w-[2.8em] p-2 h-[2.8em] rounded-full flex items-center justify-center'>
    
         <div className={`burger w-full flex flex-col items-center justify-center ${isMenuOpen?'activeBurger ':''}`}>
     
         </div>
       </motion.div>
        </Magnetic>
     </div>
    
      </div>
  )
}
export default Header