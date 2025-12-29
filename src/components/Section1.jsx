import Section from '@/layout/Section'
import { useAnimate } from 'framer-motion'
import Image from 'next/image'
import React, { useRef } from 'react'
import RubberSection from './RubberSection'
import Copy from '@/effects/Copy'
import GridColumn from '@/layout/GridColumn'
import ImageEffect from './ImageEffect'

function Section1({preLoaderOut,once=false}) {
  
  return (
    <div className='flex justify-between h-svh pt-9 bg-black'>
          <Section>
         <div className='text-heading2 text-clamp(2.4em,_4vw_+_0.5em,_4em)] text-white text-center leading-[1.1] font-custom max-w-[25em] mx-auto my-4 relative w-[80%] h-full overflow-hidden'>
         {/* <Copy justify='center' trigger={preLoaderOut}  colorBlock='orange' text={'Creative Web Design trends are what keeps our Productivity Alive as Designers. Shout out to them '}> */}
         <Copy justify='center' once={false} trigger={preLoaderOut}  colorBlock='orange' text={'Need a Creative web designer to collab on your next project? DM me to discuss your ideas!  '}>
         
         </Copy>
   
         </div>
            <GridColumn>
            </GridColumn>

          </Section>
         </div>
  )
}

export default Section1
