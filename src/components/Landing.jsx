import GridColumn from '@/layout/GridColumn'
import GridRow from '@/layout/GridRow'
import Section from '@/layout/Section'
import Heading1 from '@/typography/Heading1'
import Paragraph from '@/typography/Paragraph'
import React, { useEffect, useRef, useState } from 'react'
import Button from './Button'
import CustomButton from './CustomButton'
import Image from 'next/image'
import Heading2 from '@/typography/Heading2'
import { motion,useAnimate } from 'framer-motion'
import SlideUpText from '@/effects/SlideUpText'
import { Plane, Plus } from 'lucide-react'
import LandingVideo from './LandingVideo'
import useWindow from "./useWindow";
import Copy from '@/effects/Copy'


function Landing({setPreLoaderOut,preLoaderOut}) {
  const {dimension} = useWindow();

  const ease = [0.9, 0, 0.1, 1];
 const [scope, animate] = useAnimate();
 const [scope2=scope, animate2=animate] = useAnimate();
 const [index, setIndex] = useState(0);
//  const [preLoaderOut, setPreLoaderOut] = useState(false);
 const image=
 ['/images/001.png',
  '/images/002.png',
  '/images/003.png',
  '/images/004.png',
  '/images/005.png',
]
 const runAnimation=async(width)=>{
  // small delay so browser paints initial state
    // await new Promise((r) => setTimeout(r, 600));
    await animate([
    [ ".landing", { opacity:1 },{ duration: 1.2}],
    [ ".landing", { clipPath:'inset(0 48% 0 48%)' },{ duration: 1.2, ease, }],
    [".text-01", { x:'-20%' }, { duration: 1.2, ease,}],
    [".text-02", { x:'20%' }, { duration: 1.2, ease,at:'<'}],
    [ ".landing", { clipPath:'inset(0 0% 0 0%)' },{ duration: 1.2, ease,at:'<' }]

  ])
     // small delay so browser paints initial state
    await new Promise((r) => setTimeout(r, 100));
    setIndex(1)
     await new Promise((r) => setTimeout(r, 200));
    setIndex(2)
     await new Promise((r) => setTimeout(r, 200));
    setIndex(4)
     await new Promise((r) => setTimeout(r, 200));
     setIndex(3)
     await new Promise((r) => setTimeout(r, 200));
    setIndex(0)
    await new Promise((r) => setTimeout(r, 1400));
    
    animate(
     ".text-01",
     { x:-width*.5,scale:0.5,},
     { duration: 2, ease, }
   );
     animate(
     ".text-02",
     { x:width*.5,scale:0.5,},
     { duration: 2, ease,}
   );
 animate(
      ".landing",
      { scale:1 },
      { duration: 2, ease, onComplete:()=>{
        window.scrollTo({top:0})
       const timer= setTimeout(() => {
          setPreLoaderOut(true)
        }, 200);
    // return ()=>clearTimeout(timer)

      } 
      }
    );
 }

const initialWidthRef=useRef(null)

 useEffect(()=>{
if(dimension.width>0 && initialWidthRef.current===null){
  initialWidthRef.current= dimension.width
  runAnimation(initialWidthRef.current);
}

},[dimension.width])
    // useEffect(()=>{
    //     if(index==image.length-1) return 
    //     console.log("running")
    //     setTimeout(() => {
    //       let add=1
    //         setIndex(add)
    //         add++
    //     }, 1500);
    // },[index])

   const textSlide={
    initial:(i)=>({
      y:70,
      opacity:0,

    }),
     enter:(i)=>({
      y:0,
      opacity:1,
      transition:{duration:1.4,delay:i==1?0.1:0, ease:[0.76, 0, 0.24, 1]},
    }),
    exit:(i)=>({
      y:70,
      opacity:0,

    }),
  }
const landing={
  initial:{scale:0.2,
    // scaleX:0.1,
    clipPath:'inset(0 48% 0 48%)'},
  // initial:{height:'10vh',width:'1.5vw'},
  enter:{
    // height:'100vh',
    // width:'100vw',
    clipPath:'inset(0 0% 0 0%)',
    // scaleY:1,
    scale:1,
transition:{
  clipPath:{
  duration:1.2,

  },
  duration:2,
  ease:[0.9, 0, 0.1, 1]
},

  },
  exit:{scaleY:0.3,scaleX:0.01},

}

  return (
    <div ref={scope} className={` ${preLoaderOut?'relative':'fixed top-0 left-0'}  bg-brand-text-dark z-[998] bgblue-900 h-svh w-full flex justify-center items-center`}>
       <div ref={scope2} className=' z-preloadr overflow-hidden absolute left-[50%] -translate-x-1/2 top-[50%] w-full -translate-y-1/2 flex gap-3 items-center justify-center h-svh  b-pink-700'>
             
              <h2   className='text-01 flex-1 [letter-spacing:-0.4px] flex justify-end bgslate-600 text-heading2 text-black font-custom2'>
              <SlideUpText delay={0.06} preLoaderOut={true} gap='20px' text={'Memet'} initialDelay={1}/>
                </h2>
              <h2   className=' text-02 flex-1 [letter-spacing:-.4px] text-heading2 text-black font-custom2'>
                
              <SlideUpText delay={0.06} preLoaderOut={true} gap='20px' text={'Oumar'} initialDelay={1.3}/>
      
                </h2>
            </div>
      <div  className='flex items-end landing [clip-path:inset(50%_50%_50%_50%)] opacity-0 scale-[0.2] bg-purple-60 background-image:url(/images/001.png)] bg-cover bg-no-repeat bg-center w-full h-full '
        >

<div className='absolute top-0 left-0 w-full h-full'>
  <img src={image[index]} className='w-full h-full object-cover'/>
</div>
<div className='absolute bg-black/35 top-0 left-0 w-full h-full'/>

      <Section>
      <div>
        <h2 className='text-heading3 mb-5   leading-[1.5 text-brand-text-dark font-custom2 font-bold'>
         <Copy  stagger={0.05} colorBlock='#f7f0bc'   trigger={preLoaderOut} text={'design by Memet'}/>
        {/* <SlideUpText delay={0.06} preLoaderOut={preLoaderOut} gap='20px' text={'design by memet'} initialDelay={0}/> */}
        </h2>
         <h2 className='text-display  capitalize [letter-spacing:-1px] leading-[1.5 text-yellow-400  font-custom2 font-bold'>
         <Copy intialDelay={.2} customWord={[0]} customWordColor='brown' stagger={0.05} colorBlock='#facc15' trigger={preLoaderOut} text={'creative design is the key'}/>
        {/* <SlideUpText delay={0.06} preLoaderOut={preLoaderOut} gap='20px' text={'design by memet'} initialDelay={0}/> */}
        </h2>
      </div>

      </Section>
      </div>

    </div>
  )
}

export default Landing