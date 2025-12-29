import React, { useEffect, useRef } from 'react'

export default function DisplacedParagraph({splitBy='word',className='',radius=120,strength=3.35,ease=.15,text='Lorem ipsum dolor sit amet consectetur adipisicing elit. Illum amet harum pariatur deserunt error porro, optio et tempora.'}) {
 const ref= useTextDisplacement({radius,strength,ease,splitBy })
  return (
    <p 
    ref={ref} 
    className={className}
    >
      <SplitText splitBy={splitBy} text={text}/>

    </p>
  )
}
function SplitText({text,splitBy}) {
if(splitBy=='letter'){
  return (
    <>
    {text.split("").map((char, i)=>(
      <span data-letter key={i} style={{display:'inline-block',willChange:'transform'}}>
  {char===" "?"\u00A0":char}
      </span>
    ))}
    </>
  )
}else{
  return (
    <>
    {text.split(" ").map((word, i)=>(
      <span key={i} data-word style={{display:'inline-block',whiteSpace:'nowrap',willChange:'transform'}}>
        <span>
          {word}
        </span>
        <span>&nbsp;</span>
      </span>
    ))}
    </>
  )
}
}

function useTextDisplacement({radius=120,strength=0.35,ease=0.08,splitBy,text}={}){
  const containerRef=useRef(null)
  const lettersOrWordsRef=useRef([])
  const mouse=useRef({x:0,y:0})
  const raf=useRef(null)
  const resizeRaf=useRef(null)
  useEffect(()=>{
    const container= containerRef.current;
    if(!container)return;
const selector =splitBy==="word"?'[data-word]':'[data-letter]'
const measure =()=>{
  const nodes= [...container.querySelectorAll(selector)]
  lettersOrWordsRef.current= nodes.map(el=>
  {
    const rect= el.getBoundingClientRect();
    return {
      el,
      x:0,
      y:0,
      tx:0,
      ty:0,
      cx:rect.left + rect.width/2,
      cy:rect.top + rect.height/2,

    }
  })

}
measure()

    const onMouseMove=e=>{
      mouse.current.x =e.clientX
      mouse.current.y =e.clientY
    }
    const onResize=()=>{
      if(resizeRaf.current) return;
   resizeRaf.current =requestAnimationFrame(()=>{
    resizeRaf.current=null;
    measure();
   })
    }

    window.addEventListener('mousemove',onMouseMove);
    window.addEventListener('resize',onResize);
const animate=()=>{
  lettersOrWordsRef.current.forEach(l =>{
    const dx= l.cx-mouse.current.x
    const dy= l.cy-mouse.current.y
    const dist= Math.sqrt(dx * dx+dy *dy);

    if(dist<radius){
      const force = (1-dist/radius) *strength;
      l.tx =dx*force;
      l.ty =dy * force
    }else{
      l.tx =0;
      l.ty =0;
    }
    l.x +=(l.tx -l.x) *ease
    l.y +=(l.ty -l.y) *ease

    l.el.style.transform =
    `translate3d(${l.x}px, ${l.y}px, 0)`;
  });
  raf.current = requestAnimationFrame(animate)
}
animate();
return ()=>{
  cancelAnimationFrame(raf.current);
  cancelAnimationFrame(resizeRaf.current);

  window.removeEventListener('mousemove',onMouseMove);
  window.removeEventListener('resize',onResize);
};

  },[radius,strength,ease,splitBy,text])
return containerRef
}
 