import React, { useEffect, useRef } from 'react'
import {motion, useAnimate, useInView} from 'framer-motion'
import { mergeRefs } from '@/effects/Copy';
  const ease = [0.9, 0, 0.1, 1];

function ImageEffect({color='#000',height='100%',width='100%',type='x',img='/images/service01.png',className='',from='left',to='right'}) {

  const ref=useRef(null)
  const inView=useInView(ref,{once:true,margin:'-50px'})
  const [scope,animate]=useAnimate()
  const runAnimationX=async ()=>{
    // animate('.image',{opacity:0},{duration:0,ease})
   await animate('.overlay',{scaleX:1,transformOrigin:from},{duration:1,ease})
  //  await new Promise((r) => setTimeout(r, 1000));
    animate('.image',{opacity:1})
    animate('.overlay',{scaleX:0,transformOrigin:to},{duration:1,ease})


  }
    const runAnimationY=async ()=>{
    // animate('.image',{opacity:0},{duration:0,ease})
   await animate('.overlay',{scaleY:1,transformOrigin:from},{duration:1,ease})
  //  await new Promise((r) => setTimeout(r, 1000));
    animate('.image',{opacity:1})
    animate('.overlay',{scaleY:0,transformOrigin:to},{duration:1,ease})


  }
  useEffect(()=>{
if(inView && type=='y'){
// animate('.image',{opacity:0},{duration:0,ease})
runAnimationY()
} else if(inView && type=='x'){
runAnimationX()
} 
    // return ()=> animate('.image',{opacity:0},{duration:0,ease})
  },[inView])
  return (
    <div ref={mergeRefs(ref,scope)} className='[width:max-content relative'>

      <img style={{height,width}} className={`${className} relative image opacity-0 h-auto object-cover`} src={img} />
        <div style={{backgroundColor:color,height,width}} className='overlay will-change-transform scale-0 bg-red-400  absolute top-0 left-0'>
          
          </div>
      

    </div>
  )
}

export default ImageEffect