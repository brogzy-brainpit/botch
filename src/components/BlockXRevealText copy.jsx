import React, { useRef } from 'react';
import { useScroll, useTransform, useSpring, motion } from 'framer-motion';

export default function BlockXRevealText({ text='Lorem ipsum dolor sit, amet consectetur adipisicing elit. Deleniti, minus rerum! Quasi tempora enim facere aliquam consequuntur cupiditate necessitatibus ipsum magni ullam accusamus, ea iste voluptates corporis illo a impedit.', className = 'gap-[5px]' }) {
  const textRef2 = useRef(null);
  const { scrollYProgress: ss } = useScroll({
    target: textRef2,
    offset: ['start 0.8', '0.4 0.2'],
  });

  const words = text.split(' ');

  return (
    <span className="flex justify-center text-center">
      <span ref={textRef2} className={`${className} flex items-center justify-center flex-wrap`}>
        {words.map((word, i) => {
            const totalWords= words.length
            const In_END= .4
            const OUT_START= .38
            const OUT_END= .5
            const RE_IN_START= .8
          const inStart = (i/totalWords)*In_END;
          const inEnd= inStart+In_END/totalWords;
          const rawOutStart = OUT_START +(i/totalWords)* (1-OUT_START);
          const outStart= Math.max(rawOutStart,inEnd)
          const outEnd= outStart+OUT_END/totalWords
          const rawReInStart = RE_IN_START +(i/totalWords)* (1-RE_IN_START);

          const reInStart=Math.max(rawReInStart,OUT_END)
         const reInEnd=reInStart+(1-RE_IN_START)/totalWords
          return <Word key={i} range={[inStart,inEnd,outStart,outEnd,reInStart,reInEnd]} word={word} progress={ss} />;
        })}
      </span>
    </span>
  );
}

const Word = ({ word, progress, range }) => {
  // Linear transform first
  const textOpacity = useTransform(progress, range, [0, 1,1,0,0,1]);
  const textOpacity2 = useTransform(progress, range, [0, 0,0,1,0,0]);

  // Wrap with spring
  const springyOpacity = useSpring(textOpacity, {
    stiffness: 100,  // lower = softer
    damping: 15,     // lower = more bounce
    mass: 0.5,       // adds weight
  });

  return (
    <span className="relative font-custom text-center flex justify-center">
        
      <motion.span
        style={{ opacity: textOpacity }} 
        className={` ${word=='Lorem'?'bg-emerald-700 p-[4px] rounded-2xl':''} mr-[1px] absolute rounded-2xl bg-gray-900  text-center flex justify-center`}
      >
        <span className='opacity-0'>
        {word}
        </span>
      </motion.span>
      <motion.span style={{ opacity:textOpacity2 }} className={`${word=='Lorem'?'bg-emerald-700 p-[4px] rounded-2xl':''} mr-[1px]`}>
        {word}
      </motion.span>
    </span>
  );
};
