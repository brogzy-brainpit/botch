import React, { useRef } from 'react';
import { useScroll, useTransform, useSpring, motion } from 'framer-motion';

export default function BlockXRevealText({
     center=false,gap='10px',
     offset=['start end', 'center center'],
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
    <span className="flex justify-center text-center">
      <span ref={textRef2} style={{columnGap:gap}} className={`${className} text-balance flex items-center ${center?'justify-center':''} flex-wrap`}>
        {words.map((word, i) => {
            const totalWords= words.length
            const In_END= .4
            const OUT_START= .38
            const OUT_END= .7
            const RE_IN_START= .8
          const inStart = (i/totalWords)*In_END;
          const inEnd= inStart+In_END/totalWords;
          const rawOutStart = OUT_START +(i/totalWords)* (1-OUT_START);
          const outStart= Math.max(rawOutStart,inEnd)
          const outEnd= outStart+(1-outStart)/totalWords
         
          return <Word wordsToAnimate={wordsToAnimate}  key={i} range={[inStart,inEnd,outStart,outEnd]} word={word} progress={ss} />;
        })}
      </span>
    </span>
  );
}

const Word = ({ word, progress, range,wordsToAnimate, }) => {
  // Linear transform first
  const textOpacity = useTransform(progress, range, [0, 1,1,0]);
  const textOpacity2 = useTransform(progress, range, [0, 0,0,1]);

  // Wrap with spring
//   const springyOpacity = useSpring(textOpacity, {
//     stiffness: 100,  // lower = softer
//     damping: 15,     // lower = more bounce
//     mass: 0.5,       // adds weight
//   });
const animateword=(targetWord)=>{
    const normalizedWord= targetWord.toLowerCase().replace(/[^a-zA-Z0-9]/g, '');
    return wordsToAnimate.find(w => w.word === normalizedWord) || {};
}

const { backgroundColor,...styleWithoutBg } = animateword(word);


  return (
    <span className={`relative font-custom text-center flex `}>
        
      <motion.span
        style={{ opacity: textOpacity,...styleWithoutBg }} 
        className={`mr-[1em absolute rounded-2xl bg-gray-900  text-center flex `}
      >
        <span className='opacity-0'>
        {word}
        </span>
      </motion.span>

      <motion.span style={{ opacity:textOpacity2,...animateword(word) }} className={`mr-[1em`}>
        {word}
      </motion.span>
    </span>
  );
};
