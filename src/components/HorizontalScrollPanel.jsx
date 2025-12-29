import Copy from '@/effects/Copy';
import GridColumn from '@/layout/GridColumn';
import { useScroll, useTransform ,motion, useSpring} from 'framer-motion'
import React, { useRef } from 'react'
import ImageEffect from './ImageEffect';

function HorizontalScrollPanel() {
  const ref=useRef(null)
  // const {scrollYProgress}=useScroll({target:ref,offset:['start start','end end']})
  const {scrollYProgress}=useScroll({target:ref,offset:['start start','end end']})
  scrollYProgress.on('change',(progress)=>{
    console.log(progress)

  })
  const x1= useTransform(scrollYProgress,[0,1],['30%','-66.6667%']);
  const x= useSpring(x1,{stiffness:120,damping:30,mass:.1});
  return (
   <section ref={ref} className='relative h-[400svh] w-full bg-red400'>
    <div className="sticky top-0 h-screen overflow-hidden">
      <motion.div style={{x}} className='lg:w-[300vw] flex h-full'>
        {/* <div className='w-screen h-full bg-purple-800 flex items-center justify-center text7xl text-black'>
          slide 01
        </div> */}

  <div className='lg:w-[100vw] p-5 h-screen  flex gap-[2.8em] items-center justify-center text7xl text-black'>
          <div className='flex-1 flex  justify-between flex-col h-full '>
            <Content src={'/images/owner.png'} text={'Qatar, 2024'} className=''/>
            <div className='flex w-full items-end  self-end justify-end'>

            <Content src={'/images/owner.png'}  text={'New york, 2008'} className='flelex-col'/>
            </div>
          </div>
          <div className='flex-1 flex flex-col justify-end h-full '>
             <h2 className='w-[80%] lg:w-[60%] mb-[3em] text-para leading-[.9] font-custom text-black'>
              <Copy text={'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Repudiandae, asperiores?'} trigger={true}/>
            </h2>
            <ImageEffect className='w-[30em] !h-auto' img='/images/001.png' />
            {/* <Content src={'/images/001.png'} text={'Qatar, 2024'} className='w-[30em] !h-auto'/> */}

             {/* <img className='my-2 object-cover w-[100%] ' src={'/images/001.png'}/> */}
          </div>
         <div className='flex-1 flex  items-end justify-between flex-col h-full '>
            <Content src={'/images/owner.png'} text={'Qatar, 2024'} className=''/>
            <div className='flex w-full justify-start'>

            <Content src={'/images/owner.png'}  text={'New york, 2008'} className='flelex-col'/>
            </div>
          </div>
        
             

         
        </div>
        <div className='lg:w-[100vw] p-5 h-screen  flex gap-[2.8em] items-center justify-center text7xl text-black'>
          <div className='flex-1 flex  justify-center items-center flex-col h-full '>
            <Content src={'/images/owner.png'} text={'Qatar, 2024'} className=''/>
           
          </div>
          <div className='flex-1 flex flex-col justify-end h-full '>
             <h2 className='w-[80%] lg:w-[60%] mb-[3em] text-para leading-[.9] font-custom text-black'>
              <Copy text={'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Repudiandae, asperiores?'} trigger={true}/>
            </h2>
            <ImageEffect className='w-[30em] !h-auto' img='/images/001.png' />
            {/* <Content src={'/images/001.png'} text={'Qatar, 2024'} className='w-[30em] !h-auto'/> */}

             {/* <img className='my-2 object-cover w-[100%] ' src={'/images/001.png'}/> */}
          </div>
         <div className='flex-1 flex  items-end justify-between flex-col h-full '>
            <Content src={'/images/owner.png'} text={'Qatar, 2024'} className=''/>
            <div className='flex w-full justify-start'>

            <Content src={'/images/owner.png'}  text={'New york, 2008'} className='flelex-col'/>
            </div>
          </div>
        
             

         
        </div>
        <div className='lg:w-[100vw] p-5 h-screen  flex gap-[2.8em] items-center justify-center text7xl text-black'>
          <div className='flex-1 flex  justify-between flex-col h-full '>
            <Content src={'/images/owner.png'} text={'Qatar, 2024'} className=''/>
            <div className='flex w-full items-end  self-end justify-end'>

            <Content src={'/images/owner.png'}  text={'New york, 2008'} className='flelex-col'/>
            </div>
          </div>
          <div className='flex-1 flex flex-col justify-end h-full '>
             <h2 className='w-[80%] lg:w-[60%] mb-[3em] text-para leading-[.9] font-custom text-black'>
              <Copy text={'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Repudiandae, asperiores?'} trigger={true}/>
            </h2>
            <ImageEffect className='w-[30em] !h-auto' img='/images/001.png' />
            {/* <Content src={'/images/001.png'} text={'Qatar, 2024'} className='w-[30em] !h-auto'/> */}

             {/* <img className='my-2 object-cover w-[100%] ' src={'/images/001.png'}/> */}
          </div>
         <div className='flex-1 flex  items-end justify-between flex-col h-full '>
            <Content src={'/images/owner.png'} text={'Qatar, 2024'} className=''/>
            <div className='flex w-full justify-start'>

            <Content src={'/images/owner.png'}  text={'New york, 2008'} className='flelex-col'/>
            </div>
          </div>
        
             

         
        </div>
       
       

      </motion.div>
    </div>

   </section>
  )
}


const Content=({className='',text,src='/images/003.png'})=>{
  return (
    <div   >
            <h2>
              <Copy text={text} trigger={true}/>
            </h2>
            <img className={` ${className} max-w-[30em] my-2 object-cover  h-[40svh]`} src={src}/>
            
              </div>
  )
}
export default HorizontalScrollPanel