import { useAnimate,motion, useMotionValue, useTransform } from 'framer-motion'
import React, { useEffect, useRef } from 'react'
import useMouse from './useMouse'
import useWindow from './useWindow'

function ClipedVideo() {
  const video= useRef(null)
  const rect1= useRef(null)
  const [scope,animate]=useAnimate()
  // const x= useMotionValue(30)
  // const y= useMotionValue(20)
  const {x,y}=useMouse()
  const {dimension}=useWindow()
  useEffect(()=>{
    if(!rect1.current)return;
    const rect1dimention= rect1.current.getBoundingClientRect()
    console.log(rect1dimention.width)
    // animate(x,200,{stiffness:120,damping:30})
    // animate(y,500,{stiffness:120,damping:30})
        const masks = Array.from(scope.current.querySelectorAll(".mask-box"));
  
  //  masks.forEach(mask=>{
  //         let isDragging=false;
  //         let offsetX,offsetY;
  //         mask.addEventListener('mousedown',(e)=>{
  //           isDragging=true;
  //           mask.attribute.cursor='grabbing';
  //           offsetX= e.clientX - mask.offsetLeft
  //           offsetY= e.clientY - mask.offsetTop
  //         })
  //         document.addEventListener('mousemove',(e)=>{
  //           if(isDragging){
  //             mask.style.left =e.clientX -offsetX + "px"
  //             mask.style.top =e.clientY -offsetY + "px"
  //           }
  //         })
  //            mask.addEventListener('mouseup',(e)=>{
  //           isDragging=false
  //             mask.style.cusror ="grab"
            
  //         })
  
  //        })
    },[rect1])
//  const rect1X=

  return (
    <div  ref={scope} className='relative hero h-svh w-full bg-white overflow-hidden'>
  <svg className='w-full h-full absolut' >
        <mask id='multimask'>
          {/* <motion.rect style={{width:useTransform(x,v=>v*.2+200)}} x={useTransform(x,v=>v*-.1+200)} y={useTransform(y,v=>v*-.2+40)} className='mask-box w[20em] h-[200px] ' fill='white'/> */}
          <motion.rect ref={rect1} style={{width:useTransform(x,v=>400),height:useTransform(x,v=>280) }} x={useTransform(x,v=>v*.2-400/2) } y={useTransform(y,v=>v*.2-280/2)} className='mask-box w-50%] h-350px] ' fill='white'/> 
          <motion.rect style={{width:useTransform(x,v=>400),height:useTransform(x,v=>280) }} x={useTransform(x,v=>v-400/2) } y={useTransform(y,v=>v-280/2)} className='mask-box w-50%] h-350px] ' fill='white'/> 
          <motion.rect style={{width:useTransform(x,v=>-v*.1+500)}} x={useTransform(x,v=>v*.08+20)}  y={useTransform(y,v=>v*-.08+290)} className='mask-box w[20em] h-[300px] ' fill='white'/>
          <motion.rect style={{width:useTransform(x,v=>v*.08+600),height:useTransform(x,v=>v*.05+400) }} x={useTransform(x,v=>-v*.02+(dimension.width/2-600/2)) } y={useTransform(y,v=>v*.02+(dimension.height/2-400/2))} className='mask-box w-50%] h-350px] ' fill='white'/> 
          <motion.rect style={{width:useTransform(x,v=>-v*.1+400),height:useTransform(x,v=>-v*.1+280) }} x={useTransform(x,v=>v*.06+(dimension.width-400)) } y={useTransform(y,v=>v*.06+(dimension.height-280))} className='mask-box w-50%] h-350px] ' fill='white'/> 
          <motion.rect style={{width:useTransform(x,v=>-v*.1+400),height:useTransform(x,v=>-v*.1+280) }} x={useTransform(x,v=>v*.02+(dimension.width-400)) } y={useTransform(y,v=>-v*.2+(20))} className='mask-box w-50%] h-350px] ' fill='white'/> 
          {/* <motion.rect x={useTransform(x,v=>v*.2+400)} y={useTransform(y,v=>-v*.2)-y*.2}className='mask-box w-[50%] h-[350px] ' fill='white'/> */}
          {/* <motion.rect style={{width:useTransform(x,v=>-v*.1+500)}} x={useTransform(x,v=>v*.08+900)}  y={useTransform(y,v=>v*-.08+290)} className='mask-box w[20em] h-[300px] ' fill='white'/> */}
        
        </mask>
      </svg>
     
     
      <video ref={video}
      
      className="z-[0] pointer-events-none [mask:url(#multimask)] absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 blur- min-w-full min-h-full w-[177.77vh] h-[100vh] object-cover"

        id='clip-video' muted autoPlay loop src='/videos/vid4.mp4'></video>
     
      </div>
  )
}

export default ClipedVideo



