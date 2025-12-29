import React, { useEffect, useState } from 'react'
import {useMotionValue, useSpring  } from 'framer-motion'

function useMouse() {
    // const [mousePosition,setMousePosition]=useState({x:0,y:0})
    const x=useSpring(0,{stiffness:150,damping:20,mass:.1})
    const y=useSpring(0,{stiffness:150,damping:20,mass:.1})


    const move=(e)=>{
        x.set(e.clientX)
        y.set(e.clientY)
        // setMousePosition({
        //     x:e.clientX,
        //     y:e.clientY,
        // })
    }
    useEffect(()=>{
window.addEventListener('mousemove',move);
return ()=>window.removeEventListener('mousemove',move)
    },[])
  return {x,y}
}

export default useMouse