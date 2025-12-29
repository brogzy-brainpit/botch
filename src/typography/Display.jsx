import React, { Children } from 'react'

function Display({children,props,className}) {
  return (
        <h1 {...props} className={`${className} break-all font-custom text-neutral-200 text-[8rem] leading-[1] lg:leading-[0.9] lg:text-[9rem] mt-5 mb-6 flex items-baseline flex-wrap`}>
    {children}
    </h1>
  )
}

export default Display