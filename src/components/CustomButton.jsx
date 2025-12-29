import Link from 'next/link'
import React, { Children } from 'react'

function CustomBtn({children,href='#',icon,className=' capitalize '}) {
  return (
    <div className={`${className} font-body `}>
    <a href={href} className=' text-white flex w-full justify-between items-center transition-all duration-300 ease-out'>
    {children}
    </a>
       </div>
  )
}

export default CustomBtn