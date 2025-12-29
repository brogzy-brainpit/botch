import SlideUpText from '@/effects/SlideUpText'
import React, { useRef } from 'react'
import CustomBtn from './CustomButton'
import { Facebook, FacebookIcon, Instagram, Linkedin } from 'lucide-react'
import SlideUpElement from '@/effects/SlideUpElement'
import Logo from './Logo'
import ScatterText from './ScatterText'
import Heading1 from '@/typography/Heading1'
import { useInView } from 'framer-motion'

function footer() {
  const test=useRef(null)
  const inView=useInView(test)
  const texts=[
    {text:'aircraft maintainanc',
      url:'#',background:'pink'
    }, {text:' maintainance & tracking',
      url:'#',background:'#059669'
    }, {text:'aircraft & tracking',
      url:'#',background:'orange'
    }
  ]
  return (
    <ScatterText inView={true}>
    <div ref={test} className='bg-brand-secondary w-full h-full relative  flex gap-2 flex-col '>
<Heading1 className={'text-white'}>
  hello footer
</Heading1>
   
      </div>

    </ScatterText>
  )
}

export default footer