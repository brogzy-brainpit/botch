import React, { useEffect } from 'react'
import {useAnimate} from 'framer-motion'

function CardsFlickr() {
    const [scope,animate]= useAnimate()
    let lastX= 0
    let lastY= 0
    let speedX= 0
    let speedY= 0
//     useEffect(()=>{
// if(!scope.current)return;
// const allCards= Array.from(scope.current.querySelectorAll('.card')) 
// console.log(allCards)


// },[])
const move=(e)=>{
    speedX=e.clientX-lastX
    speedY=e.clientY-lastY
    lastX= e.clientX
    lastY= e.clientY
}
const enter=(e)=>{
    speedX=0
    speedY=0
    lastX= e.clientX
    lastY= e.clientY
}
const leave=(e)=>{
    console.log(e)
    // animate(e.target,{x:lastX})
    speedX=0
    speedY=0
    lastX= e.clientX
    lastY= e.clientY
}
  return (
    <div ref={scope} className='h-screen relative w-full flex items-center justify-center bg-brand-text-dark'>
        <div onMouseMove={move} onMouseEnter={enter} onMouseLeave={leave} className="card  h-[22vw] w-[17vw] bg-red500 relative overflow-cli  -rotate-6 -mr-[2vw] ">
            <img className='object-cover h-full w-full rounded-lg' src='/images/man01.jpg'/>
       <div className="py-[.5vw] px-[1vw] w-[max-content] rounded-full rounded-bl-none absolute top-[80%] -translate-x-1/2 -translate-y-1/2 left-[40%] bg-teal-700 text-white"> elegantly breathing </div>
        </div>

         <div className="card  z-10  h-[22vw] w-[17vw] bg-red500 relative overflow-cli  rotate-6 -mr-[2vw] ">
       <div className="z-20  py-[.5vw] px-[1vw] w-full rounded-full rounded-bl-none absolute top-[40%] -translate-x-1/2 -translate-y-1/2 left-[40%] bg-emerald-700 text-white"> elegantly breathing </div>

            
            <img className='object-cover h-full w-full rounded-lg' src='/images/man02.jpg'/>
        </div>

         <div className="card z-10  h-[22vw] w-[17vw] bg-red500 relative overflow-cli -rotate-6 -mr-[2vw] ">
       <div className="py-[.5vw] px-[1vw] rounded-full rounded-bl-none absolute top-[35%] translate-y-1/2 left-[35%] bg-emerald-600 text-white"> hello </div>
          
            <img className='object-cover h-full w-full rounded-lg ' src='/images/man03.jpg'/>
        </div>
         <div className="card  h-[22vw] w-[17vw] bg-red500 relative overflow-cli  rotate-6 ">
       <div className="py-[.5vw] px-[1vw] rounded-full rounded-bl-none absolute top-[35%] translate-y-1/2 left-[35%] bg-emerald-600 text-white"> hello </div>
            <img className='object-cover h-full w-full rounded-lg' src='/images/man04.jpg'/>
        </div>
        
        
        
        </div>
  )
}

export default CardsFlickr