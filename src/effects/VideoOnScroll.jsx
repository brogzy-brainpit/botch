import Copy from '@/effects/Copy';
import { useScroll, useTransform ,motion, useSpring} from 'framer-motion'
import React, { useEffect, useRef } from 'react'
import useWindow from '../components/useWindow';

function VideoOnScroll() {
  const ref=useRef(null)
  const canvas=useRef(null)
  const {dimension}= useWindow()
  const {scrollYProgress}=useScroll({target:ref,offset:['start end','end end']})
  useEffect(()=>{
  const context=canvas.current.getContext('2d')
  const setCanvasSize=()=>{
    const pixelRatio= window.devicePixelRatio || 1
    canvas.current.width=window.innerWidth * pixelRatio
    canvas.current.height=window.innerHeight * pixelRatio
    canvas.current.style.width=window.innerWidth + "px"
    canvas.current.style.height=window.innerHeight + "px";
    context.scale(pixelRatio,pixelRatio)
  }
  setCanvasSize();
  const frameCount =200;
   const currentFrame = (i) =>`/images/frames/142579-780232342_medium_${String(i + 1).padStart(3, "0")}.jpg`;
  //  const currentFrame=(i)=> `/imagesz/00${i + 1}.png`;
  let images=[];
  let videoFrames={frame:0};
  let imagesToLoad=frameCount

  const onLoad=()=>{
    imagesToLoad--;
    if(!imagesToLoad){
      render()
      setupScrollTrigger()
    }
  }
  for(let i=0; i<frameCount; i++){
    const img= new Image();
    img.onload=onLoad
    img.onerror=function(){
      onLoad.call(this)
    };
    img.src =currentFrame(i);
    images.push(img);
  }

  const render=()=>{
    const canvasWidth =window.innerWidth
    const canvasHeight =window.innerHeight;

    context.clearRect(0,0,canvasWidth,canvasHeight);
    const img =images[videoFrames.frame];
    if(img && img.complete && img.naturalWidth>0){
      const imageAspect=img.naturalWidth /img.naturalHeight
      const canvasAspect =canvasWidth / canvasHeight

      let drawWidth, drawHeight,drawX, drawY;
      if(imageAspect > canvasAspect){
        drawHeight=canvasHeight
        drawWidth=drawHeight * imageAspect;
        drawX= (canvasWidth-drawWidth) /2
        drawY=0
      }else{
        drawWidth=canvasWidth;
        drawHeight= drawWidth / imageAspect;
        drawX=0;
        drawY =(canvasHeight-drawHeight) /2
      }
      context.drawImage(img,drawX,drawY,drawWidth,drawHeight)
    }
  }

      const setupScrollTrigger=()=>{
 scrollYProgress.on('change',(progress)=>{
    const animationProgress= Math.min(progress / 0.9, 1);
    console.log(animationProgress)
    const targetFrame= Math.round(animationProgress * (frameCount - 1))
    videoFrames.frame =targetFrame;
    render();

  })
      }

  },[dimension.width])
  return (
   <section ref={ref} className='relative h-[600vh] w-full bg-red-400'>

    <div className='hero sticky top-0 left-0'>
   <canvas ref={canvas} className='w-full h-full object-cover'></canvas>

   <div className="hero-content">
   <div className="header">

   </div>

   </div>

    </div>

   </section>
  )
}

export default VideoOnScroll