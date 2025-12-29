import { useMotionValueEvent, useScroll,useAnimation, useTransform,motion, stagger, useSpring, useAnimate } from 'framer-motion'
import React, { useEffect, useRef, useState } from 'react'

function FlipCardOnScroll() {
  const container= useRef(null)
  const [isPassedThreshold,setIsPassedThreshold]= useState(false)
  const [isPassedTextThreshold,setIsPassedTextThreshold]= useState(false)
  const [scope,animate]= useAnimate()
  const control= useAnimation()
  const {scrollYProgress}= useScroll({target:container,offset:['start start','end end']})
const scaleContainer=useSpring(useTransform(scrollYProgress,[0,0.3],['75%','60%']),{stiffness:120,damping:13,mass:.1})
// const scaleContainer=useSpring(useTransform(scrollYProgress,[0,0.3],[1,.7]),{stiffness:120,damping:13,mass:.1})
const containerGap=useSpring(useTransform(scrollYProgress,[0.4,0.6],['0px','20px']),{stiffness:120,damping:13,mass:0.1})
const card1Border= useTransform(scrollYProgress,[0.4,0.6],['20px 0px 0px 20px','20px 20px 20px 20px'])
const card2Border= useTransform(scrollYProgress,[0.4,0.6],['0px','20px'])
const card3Border= useTransform(scrollYProgress,[0.4,0.6],['0px 20px 20px 0px','20px 20px 20px 20px'])
useEffect(()=>{
  if(isPassedTextThreshold){
animate(scope.current,{opacity:1,y:0},{duration:.4})
  }else{
animate(scope.current,{opacity:0,y:30},{duration:.1})
  }


  if(isPassedThreshold){
  control.start('flip')
  }else{
   control.start('initial')
  }

},[isPassedThreshold,isPassedTextThreshold])
   
   const carden={
    initial:{
      y:0,
    rotateY:'0deg',
    rotateZ:'0deg',
    boxShadow:'0px 0px 0px 0px rgba(0,0,0,0.2)',
    transition:{duration:.2}
  },
    flip:(i)=>({
      y: i==1?30:i==3?30:0,
    rotateY:'180deg',
    boxShadow:'4px 4px 4px 2px rgba(0,0,0,0.2)',
    rotateZ: i==1?'15deg':i==2?'0deg':'-15deg',
    transition:{duration:5,delay:i*0.02,type:'spring',stiffness:120,damping:14,mass:0.1}
  })
   }
   scrollYProgress.on('change',(progress)=>{
    if(progress>=.4){
      setIsPassedTextThreshold(true)
    }else if(progress<.4){
      setIsPassedTextThreshold(false)  
    }
    
    if(progress>.7 ){
      setIsPassedThreshold(true)
 
}else{
      setIsPassedThreshold(false)

}
   })
const cards=[
  {img:'/images/slice01.png',title:'interactive web experince',bg:'#b400a4'},
  {img:'/images/slice02.png',title:'custom component designs',bg:'#c96ba4'},
  {img:'/images/slice03.png',title:'awwward style card',bg:'#ff400b'},
  
]
 
  return (
    <div ref={container} className='relative h-[400vh] fle justify-center items-center'>
      <section   className='sticky top-0 w-full h-screen bg-emerald-600 flex flex-col items-center justify-center' >

        <div ref={scope} className="sticky-header flex items-center justify-center max-w- bgslate-600 opacity-0  z-40  absolut [will-change:transform,_opacity]">
        <h1 className='relative text-white max-w-[80%] text-heading3 leading-[.9] font-custom  text-center  '>
          
          Lorem ipsum dolor sit amet consectetur adipisicing elit.</h1>
        </div>


        <motion.div style={{width:scaleContainer,columnGap:containerGap}} className="w-[75% relative  flex items-center justify-center [perspective:_1000px] translate-y-[40px] [will-change:width] ">
          {cards.map(({img,title,bg},i)=>{
            return (
          <motion.div animate={control}  custom={i+1} variants={carden} style={{borderRadius:i==0?card1Border:i==1?card2Border:card3Border}}  className={`border-none ${i==0?' rounded-[20px_0_0_20px]':i==2?'rounded-[0_20px_20px_0]':''} card flex-1 [will-change:transform] aspect-[5/7] [transform-style:preserve-3d] [tranform-origin:top]`}>
            <div className="absolute w-full h-full [backface-visibility:hidden] rounded-[inherit] overflow-hidden ">
              <img src={img} alt='card-img' className='w-full h-full object-cover'/>
            </div>
            <div style={{backgroundColor:bg}} className="absolute flex justify-center items-center text-center [transform:rotateY(180deg)] p-5 w-full h-full [backface-visibility:hidden] rounded-[inherit] overflow-hidden">
              <span className='absolute top-[4%] left-[4%] text-white font-body text-para' >(0{i+1})</span>
              <p className='text-heading3 leading-[.9] text-white '>{title}</p>
              <span className='absolute bottom-[4%] right-[4%] text-white font-body text-[.8em]' >by Memet</span>
            </div>
          </motion.div>

            )
          })}
        
        </motion.div>
      </section>

      



    </div>
  )
}

export default FlipCardOnScroll