
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import logo from "../../public/images/logo.svg"
import Image from 'next/image.js'
import Button from './Button'
import {AnimatePresence, motion} from 'framer-motion'
import { Umbrella } from 'lucide-react'
import Logo from './Logo'
import Magnetic from '@/common/Magnetic'


  export const variantsOptions={
    initial:'initial',
    animate:'enter',
    exit:'exit'
}

function Menu() {
  const [isMenuOpen,setIsMenuOpen]=useState(false)
  const [hoverIndex,setHoverIndex]=useState(0)
  
  const ease = [0.9, 0, 0.1, 1];
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

  const TextParent={
    initial:{},
    enter:{
      transition:{
        staggerChildren:0.1,  
      }
    }, 
    hover:{
      transition:{
        staggerChildren:0.1,  
      }
    },
    exit:{},
  }
   const Texts={
    initial:{
      opacity:0,
      x:40
    },
    enter:{
      opacity:1,
      x:0,
      transition:{
        duration:.6,
      }
    },
    exit:{
      opacity:0,
      x:40,
       transition:{
        duration:.6,
      }
    },
    hover:{
      opacity:.5
    }
  }
  const textHover={
    hover:{
      transition:{
        staggerChildren:0.01,  
        ease
      }
    },
     initial:{
      transition:{
        staggerChildren:0.055,  
      }
    },
  }
   const textHoverChild={
    hover:{
      y:'-100%'
    },
  initial:{
      y:'0%'
    }
  }
 
  return (
    <div className='relative z-header'>

        <div className={`transition-all bottom-4 left-1/2 -translate-x-1/2 mix-blend-differenc duration-300 p-4 fixed  w-ful h-ful  z-preloader  bgred-700`}>
<div className=' bgslate-500 relative py-4'>

 <div className='flex gap-6 items-center justify-between min-w-[9em] p-2 pl-6 shadow-lg rounded-full bg-brand-accent'>
 <h2 className='font-custom text-para text-white uppercase font-bold'>
{isMenuOpen?'close':'menu'}
 </h2>
 <Magnetic>
  <motion.div initial={{scale:0}} exit={{scale:0}} animate={{scale:1}} transition={{duration:1.8,delay:.4,ease}}
    onClick={()=>{setIsMenuOpen(!isMenuOpen)}} className='cursor-pointer bg-white w-[2.4em] h-[2.4em] rounded-full flex items-center justify-center'>

     <div className={`burger w-full flex flex-col items-center justify-center ${isMenuOpen?'activeBurger ':''}`}>
 
     </div>
   </motion.div>
    </Magnetic>
 </div>
  </div>
 
 


</div>
<AnimatePresence mode='wait'>
{isMenuOpen && 
<motion.div initial={{opacity:0}} animate={{opacity:isMenuOpen?1:0,}} exit={{opacity:0}}  className=' bg-brand-background-dark pointer-eventsnone h-svh w-full fixed top-0'>
<div className='container mx-auto pt-[15vh] px-5 flex breaker '>
  <motion.ul variants={TextParent} {...variantsOptions}  className='z-20 bg-purple700 w-full flex flex-col curs'>
  {links.map(({url,title,src},index)=>{
  return (
    <motion.li  variants={Texts} className='my-1 border-b-2'>
      <Link href={url}>
          <motion.div
          variants={textHover} initial={'initial'} onHoverStart={()=>{setHoverIndex(index);}} whileHover={'hover'}  className='flex overflow-hidden gap4'>
            {title.split('').map((word)=>{
              return (
                <motion.div variants={textHoverChild}  className='bg-pink500 relative  text-heading1 leading-[0.8] text-white font-custom '>
                  <div>{word}</div>
                  <div className='absolute top-[100%]'>{word}</div>
                  </motion.div>
              )
            })}
            </motion.div>
         
      </Link>
    </motion.li>
  )
})}
</motion.ul>

<div className='w-2/6 absolute right-[0%] -translate-x-[20%] z-10'>

  <Image src={links[hoverIndex].src}  width={1200} height={1200} className='object-cover w-full h-full'/>
</div>
</div>
 </motion.div>
}

</AnimatePresence>
    </div>
  )
}


export default Menu