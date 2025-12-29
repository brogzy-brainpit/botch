import Magnetic from '@/common/Magnetic'
import { AArrowDown, ArrowBigRight, ArrowRight } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

function Button({label,className='',link='/'}) {
  return (
    <Magnetic>
    <Link href={link} className={`max-h-14 flex items-center  justify-between cursor-pointer capitalize font-custom font-light rounded-full bg-white text-black py- p-[4px] min-w-[10em]`}>
        <span className='ml-1'>
        {label}

        </span>
      <div className='w-10 h-10 flex justify-center items-center rounded-full bg-black text-white'>
<ArrowRight className='w-[50%]'/>
      </div>
        </Link>
    </Magnetic>
  )
}

export default Button