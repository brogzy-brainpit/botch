import React, { useEffect, useState } from 'react'
import {useMotionValue  } from 'framer-motion'

function useMouse() {
    // const [mousePosition,setMousePosition]=useState({x:0,y:0})
    const x=useMotionValue(0)
    const y=useMotionValue(0)


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