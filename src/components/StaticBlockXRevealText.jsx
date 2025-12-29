import React, { useRef } from 'react';
import { useScroll, useTransform, useSpring, motion } from 'framer-motion';

export default function StaticBlockXRevealText({
     center=false,gap='10px',
     offset=['start start', 'end end'],
     text='Lorem ipsum dolor sit, amet consectetur adipisicing elit. Deleniti, minus rerum! Quasi tempora enim facere aliquam consequuntur cupiditate necessitatibus ipsum magni ullam accusamus, ea iste voluptates corporis illo a impedit.',
     wordsToAnimate=[
        {word:'creative',backgroundColor:' #6d28d9',color:'white',borderRadius:'1rem',padding:'4px'},
        {word:'ipsum',backgroundColor:'#4338ca ',color:'white',borderRadius:'1rem',padding:'4px'},
        {word:'designer',backgroundColor:'#1d4ed8 ',color:'white',borderRadius:'1rem',padding:'4px'},
        
    ],className = '' }) {
  const textRef2 = useRef(null);
  const { scrollYProgress: ss } = useScroll({
    target: textRef2,
   offset: offset
  });

  const words = text.split(' ');

  return (
    <div ref={textRef2} className='h-[400vh] w-full mx-auto'>
<div className=' mx-auto h-screen flex items-center justify-center max-w-[30em] text-heading3 sticky top-0'>
      <p  style={{columnGap:gap}} className={`${className} text-balance flex items-center ${center?'justify-center':''} flex-wrap`}>
        {words.map((word, i) => {
             const totalWords= words.length
              const IN_END = 0.4;
              // OUT fully finishes at 0.7
              const OUT_START = 0.38;
              const OUT_END = 0.68;
              // RE-IN starts AFTER OUT
              const RE_IN_START = 0.7;

              // IN
              const inStart = (i / totalWords) * IN_END;
              const inEnd = inStart + IN_END / totalWords;

              // OUT (clamped strictly between 0.38 → 0.6)
              const outWindow = OUT_END - OUT_START;
              const outStart = OUT_START + (i / totalWords) * outWindow;
              const outEnd = outStart + outWindow / totalWords;

              // RE-IN (starts ONLY after 0.7)
              const reInWindow = 1 - RE_IN_START;
              const reInStart = RE_IN_START + (i / totalWords) * reInWindow;
              const reInEnd = reInStart + reInWindow / totalWords;



          return <Word wordsToAnimate={wordsToAnimate} key={i} range={[inStart,inEnd,outStart,outEnd,reInStart,reInEnd]} word={word} progress={ss} />;
        })}
      </p>

</div>
    </div>
  );
}

const Word = ({ word, progress, range,wordsToAnimate, }) => {
  // Linear transform first
  const textOpacity = useTransform(progress, range, [0, 0,0,1,1,0]);
  const bgOpacity = useTransform(progress, range, ['gray', '#A16207','#A16207','#047857','#111827','#111827']);
  const boxOpacity = useSpring(useTransform(progress, range, [0, 1,1,0,0,1]), {
    stiffness: 100,  // lower = softer
    damping: 6,     // lower = more bounce
    mass: 0.5,       // adds weight
  });
const animateword=(targetWord)=>{
    const normalizedWord= targetWord.toLowerCase().replace(/[^a-zA-Z0-9]/g, '');
    return wordsToAnimate.find(w => w.word === normalizedWord) || {};
}

const { backgroundColor,...styleWithoutBg } = animateword(word);


  return (
    <span className={`relative font-custom text-center flex `}>
        
      <motion.span
        style={{ opacity: boxOpacity,...styleWithoutBg,backgroundColor:bgOpacity }} 
        className={`mr-[1em absolute inset-0 rounded-2xl bg-gray-900  text-center flex `}
      >
        <span className='opacity-0'>
        {word}
        </span>
      </motion.span>

      <motion.span style={{ opacity:textOpacity,...animateword(word) }} className={`mr-[1em`}>
        {word}
      </motion.span>
    </span>
  );
};
