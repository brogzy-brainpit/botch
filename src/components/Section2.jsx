import Section from '@/layout/Section'
import { useAnimate } from 'framer-motion'
import Image from 'next/image'
import React, { useRef } from 'react'
import RubberSection from './RubberSection'
import ImageEffect from './ImageEffect'

function Section2({preLoaderOut}) {
  return (
   <section>
     <div className=' flex justify-center gap-4 text-black text-heading3 font-custom '>
      
      </div>
    <div className=' relative flex justify-center gap-4 mt-9 '>
  
      <ImageEffect type='y' height='20em'   className='' img='/images/service02.png' from='top' to='bottom'/>
      <ImageEffect type='x' height='20em'  className='' img='/images/service04.png' from='left' to='right'/>
          
         </div>
   </section>
  )
}

export default Section2
