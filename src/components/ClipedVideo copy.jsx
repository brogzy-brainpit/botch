
import { useAnimate } from 'framer-motion'
import React, { useEffect, useRef } from 'react'

function ClipedVideo() {
  const video= useRef(null)
  const [scope,animate]=useAnimate()
  useEffect(()=>{
    if(!video.current)return;

      const masks = Array.from(scope.current.querySelectorAll(".mask-box"));
     
     const draw =()=>{
       masks.forEach((mask)=>{
        // console.log(mask)
         const canvas= mask.querySelector('canvas')
         const ctx= canvas.getContext('2d');
         const rect= mask.getBoundingClientRect()    
         canvas.width= rect.width  
         canvas.height= rect.height  
         ctx.imageSmoothingEnabled=true
         ctx.imageSmoothingQuality='high';
         ctx.drawImage(video.current,-rect.left,-rect.top,innerWidth,innerHeight)
       })
       requestAnimationFrame(draw)
      }
      const fire=()=>{ 
        console.log('am here')
        video.current.play();
        draw()
}

     video.current.addEventListener('loadedmetadata',fire)
     if(video.current.readyState>=1)fire()
       masks.forEach(mask=>{
        let isDragging=false;
        let offsetX,offsetY;
        mask.addEventListener('mousedown',(e)=>{
          isDragging=true;
          mask.style.cursor='grabbing';
          offsetX= e.clientX - mask.offsetLeft
          offsetY= e.clientY - mask.offsetTop
        })
        document.addEventListener('mousemove',(e)=>{
          if(isDragging){
            mask.style.left =e.clientX -offsetX + "px"
            mask.style.top =e.clientY -offsetY + "px"
          }
        })
           mask.addEventListener('mouseup',(e)=>{
          isDragging=false
            mask.style.cusror ="grab"
          
        })

       })
     return ()=>{
       video.current.removeEventListener('loadedmetadata',fire)
     }
  },[])
  return (
    <div  ref={scope} className='relative hero h-svh w-full bg-black overflow-hidden'>
      <video ref={video} className='z-10  hidden absolut  inset-0 w-full h-ful' id='clip-video' muted autoPlay loop src='/videos/hero.mp4'></video>
      <div className="mask-box cursor-grab z-[900] absolute w-[60vw] h-[35vw] top-[10vh] left-[20vw] border border-white">
        <canvas className='h-full w-full'></canvas>
        
      </div>
      <div className="mask-box cursor-grab z-[900] absolute w-[17vw] h-[9vw] top-[5vh] left-[5vw] border border-white">
        <canvas className='h-full w-full'></canvas>
      </div>
      <div className="mask-box cursor-grab z-[900] absolute w-[35vw] h-[19vw] top-[5vh] right-[5vw] border border-white">
        <canvas className='h-full w-full'></canvas>
      </div>
      <div className="mask-box cursor-grab z-[900] absolute w-[38vw] h-[22vw] top-[50vh] left-[5vw] border border-white">
        <canvas className='h-full w-full'></canvas>
      </div>
      
      </div>
  )
}

export default ClipedVideo