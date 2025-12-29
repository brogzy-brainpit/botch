'use client'

import { motion, useTransform, useScroll, useMotionValue } from "framer-motion";
import { useEffect, useMemo, useRef } from "react";
import { useMediaQuery } from "react-responsive";
import useWindow from "./useWindow";

export const random = (min, max) => Math.random() * (max - min) + min;

const texts = ['move', 'text', 'on', 'scroll', 'animation'];

const HorizontalTextWavy = () => {
  const targetRef = useRef(null);
  const textRef = useRef(null);

  const finalX = useMotionValue(0);
  const { dimension } = useWindow();
  const isTabletOrMobile = useMediaQuery({ query: '(max-width: 1224px)' });

  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ['start start', 'end end']
  });

  /* ----------------------------
     Horizontal centering
  -----------------------------*/
  useEffect(() => {
    if (!textRef.current) return;

    const update = () => {
      const textWidth = textRef.current.scrollWidth;
      finalX.set(-(textWidth - dimension.width) / 2);
    };

    update();
    window.addEventListener('resize', update);
    return () => window.removeEventListener('resize', update);
  }, [dimension.width]);

  const x = useTransform(
    scrollYProgress,
    [0, 0.9],
    [dimension.width, finalX.get()]
  );

  /* ----------------------------
     Flatten letters
  -----------------------------*/
  const letters = useMemo(
    () =>
      texts.flatMap((word, wi) =>
        word.split("").map((char, ci) => ({
          char,
          key: `${wi}-${ci}`
        }))
      ),
    []
  );

  /* ----------------------------
     Stable random start values
  -----------------------------*/
  const randomY = useMemo(
    () => letters.map(() => random(-40, 80)),
    []
  );

  const randomRotate = useMemo(
    () => letters.map(() => random(-20, 50)),
    []
  );

  /* ----------------------------
     Scroll stagger (GSAP-like)
  -----------------------------*/
  const STAGGER = 0.025;
  const DURATION = 0.45;

  const yTransforms = letters.map((_, i) =>
    useTransform(
      scrollYProgress,
      [i * STAGGER, i * STAGGER + DURATION],
      [randomY[i], 0]
    )
  );

  const rTransforms = letters.map((_, i) =>
    useTransform(
      scrollYProgress,
      [i * STAGGER, i * STAGGER + DURATION],
      [randomRotate[i], 0]
    )
  );

  return (
    <section
      ref={targetRef}
      className="relative h-[600svh] bgneutral-900 text-black"
    >
      <div className="sticky top-0 h-svh overflow-hidden flex items-center">
        <motion.h2
          ref={textRef}
          style={{ x }}
          className="whitespace-nowrap font-custom text-[10em] leading-[0.95] tracking-[-0.03em]"
        >
          {letters.map((l, i) => (
            <motion.span
              key={l.key}
              style={{
                y: yTransforms[i],
                rotate: rTransforms[i]
              }}
              className="inline-block mr-[0.08em]"
            >
              {l.char}
            </motion.span>
          ))}
        </motion.h2>
      </div>
    </section>
  );
};

export default HorizontalTextWavy;
