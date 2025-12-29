import React, { useEffect, useRef, useState } from 'react'
import useWindow from './useWindow'
import {motion, progress, useAnimate, useAnimation, useScroll} from 'framer-motion'
import { mergeRefs } from '@/effects/Copy'

function SpreadCards() {
    const {dimension}=useWindow()
    const [positions,setPositions]=useState([])
    const [triggerCardSpread, SetTriggerCardSpread]=useState(false)
   const [scope,animate]= useAnimate()
   
   const trackScroll= useRef(null)
   const ref= useRef([])
   const {scrollYProgress}= useScroll({target:trackScroll,offset:['start end', 'end start']})
   scrollYProgress.on('change',(progress)=>{
    // animate('.card',{y:(i)=>(30*i)},{type:'spring',stiffness:120,damping:8,})
    if(progress>=.4){

        SetTriggerCardSpread(true)
    }else if(progress<.4){
        SetTriggerCardSpread(false)

    }
   })
   
//     useEffect(()=>{
// const AllCards= Array.from(ref.current)
// AllCards.forEach((el,i)=>{
//     const width=el.getBoundingClientRect().width
//     const height=el.getBoundingClientRect().height
//     const left=el.getBoundingClientRect().left
//     const top=el.getBoundingClientRect().top;
//     const centerX=dimension.width/2-width
//     const centerY=dimension.height/2 -height
//     const middleCard= Math.floor(AllCards.length/2)
//     const z= AllCards.length - Math.abs(i-middleCard)
//     const rotate= (i-middleCard)*10
    
// //    animate(el,{x:centerX,y:centerY,zIndex:z,rotateZ:rotate})
// })
//     },[dimension])
 
    useEffect(()=>{
const AllCards= Array.from(ref.current)
 if(triggerCardSpread){
    AllCards.forEach((el,i)=>{
    const middleCard= Math.floor(AllCards.length/2)
    const z= AllCards.length - Math.abs(i-middleCard)
   const check=(i)=>{
        if(i==0){
            return {x:'-100%',y:30,rotateZ:-15,scale:.85}
        }else if(i==1){
            return {x:'-60%',y:10,rotateZ:-10,scale:.9}
        }else if(i==2){
            return {x:0}

        }else if(i==3){
             return {x:'60%',y:10,rotateZ:10,scale:.9}
        }else if(i==4){
            return {x:'100%',y:30,rotateZ:15,scale:.85}
        }
    }
   animate(el,{...check(i),zIndex:z,},{type:'spring',stiffness:120,damping:8,})
})
 }else{
    
   animate('.card',{x:0,y:0,rotateZ:0,},{type:'spring',stiffness:120,damping:18})

 }
   },[triggerCardSpread])
    const cards=[
        {
        bg:'#f2a009',
        img:'/images/001.png'
    },
      {
        bg:'#2009fd',
        img:'/images/002.png'
    },
      {
        bg:'#21ca0a',
        img:'/images/003.png'
    },
      {
        bg:'#cba342',
        img:'/images/004.png'
    },
      {
        bg:'#fa2135',
        img:'/images/005.png'
    },
]
  return (
    <div ref={mergeRefs(trackScroll,scope)} className='flex  justify-center relative items-center w-full overflow-hidden  h-svh bg-pink-900'>

        {cards.map(({bg,img},i)=>{
            return (
    <div style={{backgroundColor:bg}} ref={el=>(ref.current[i]=el)} className=' overflow-hidden card absolute [aspect-ratio:5/7]  h-[16em] w-[10em] lg:h-[23em] lg:w-[18em] rounded-2xl'>
            
     <img src={img} className='object-cover w-full h-full'/>             
                </div>
            )
        })}
    </div>
  )
}

export default SpreadCards