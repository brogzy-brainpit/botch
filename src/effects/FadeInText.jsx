import React, { useRef } from 'react';
import { useScroll, useTransform, useSpring, motion } from 'framer-motion';

export default function FadeInText({ text, className = 'gap-[5px]' }) {
  const textRef2 = useRef(null);
  const { scrollYProgress: ss } = useScroll({
    target: textRef2,
    offset: ['0.4 end', 'end 0.6'],
  });

  const words = text.split(' ');

  return (
    <span className="flex justify-center text-center">
      <span ref={textRef2} className={`${className} flex flex-wrap`}>
        {words.map((word, i) => {
          const start = i / words.length;
          const end = start + 1 / words.length;
          return <Word key={i} range={[start, end]} word={word} progress={ss} />;
        })}
      </span>
    </span>
  );
}

const Word = ({ word, progress, range }) => {
  // Linear transform first
  const textOpacity = useTransform(progress, range, [0, 1]);

  // Wrap with spring
  const springyOpacity = useSpring(textOpacity, {
    stiffness: 100,  // lower = softer
    damping: 15,     // lower = more bounce
    mass: 0.5,       // adds weight
  });

  return (
    <span className="relative font-custom text-center flex justify-center">
      <span
        style={{ opacity: 0.09 }}
        className="mr-[1px] absolute text-center flex justify-center"
      >
        {word}
      </span>
      <motion.span style={{ opacity: springyOpacity }} className="mr-[1px]">
        {word}
      </motion.span>
    </span>
  );
};
