"use client";

import React, {
  useRef,
  useState,
  useLayoutEffect,
  useEffect,
} from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import useWindow from "./useWindow";

const ITEMS = [0, 1];

export default function IconMorph() {
  const sectionRef = useRef(null);
  const fixedRefs = useRef([]);
  const inlineRefs = useRef([]);

  const { dimension } = useWindow();
  const [isInline, setIsInline] = useState(false);

  const [startPos, setStartPos] = useState([]);
  const [endPos, setEndPos] = useState([]);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  /* ------------------------------
     Scroll switch
  ------------------------------ */
  useEffect(() => {
    return scrollYProgress.on("change", (v) => {
      setIsInline(v >= 0.5);
    });
  }, [scrollYProgress]);

  /* ------------------------------
     Measure positions
  ------------------------------ */
  useLayoutEffect(() => {
    if (!fixedRefs.current.length || !inlineRefs.current.length) return;

    const scrollX = window.scrollX;
    const scrollY = window.scrollY;

    setStartPos(
      fixedRefs.current.map((el) => {
        const r = el.getBoundingClientRect();
        return {
          x: r.left + r.width / 2 + scrollX,
          y: r.top + r.height / 2 + scrollY,
        };
      })
    );

    setEndPos(
      inlineRefs.current.map((el) => {
        const r = el.getBoundingClientRect();
        return {
          x: r.left + r.width / 2 + scrollX,
          y: r.top + r.height / 2 + scrollY,
        };
      })
    );
  }, [dimension.width, dimension.height]);

  /* ------------------------------
     Viewport center
  ------------------------------ */
  const centerX = dimension.width / 2;
  const centerY = dimension.height / 2;

  /* ------------------------------
     CREATE MOTION VALUES ONCE
  ------------------------------ */
  const fixedTransforms = ITEMS.map((_, i) => ({
    x: useTransform(
      scrollYProgress,
      [0, 0.3],
      startPos[i] ? [0, centerX - startPos[i].x] : [0, 0]
    ),
    y: useTransform(
      scrollYProgress,
      [0, 0.3],
      startPos[i] ? [0, centerY - startPos[i].y] : [0, 0]
    ),
  }));

  const inlineTransforms = ITEMS.map((_, i) => ({
    x: useTransform(
      scrollYProgress,
      [0.6, 0.9],
      endPos[i] ? [centerX - endPos[i].x, 0] : [0, 0]
    ),
    y: useTransform(
      scrollYProgress,
      [0.6, 0.9],
      endPos[i] ? [centerY - endPos[i].y, 0] : [0, 0]
    ),
  }));

  return (
    <section
      ref={sectionRef}
      className="relative min-h-[600vh] p-10 bg-blue-800"
    >
      {/* ================= Inline ================= */}
      <div className="sticky top-0 h-screen flex items-center justify-center text-white">
        <p className="flex flex-wrap gap-6 text-lg">
          Lorem ipsum
          {ITEMS.map((i) => (
            <span key={i} className="inline-block align-middle">
              <span
                ref={(el) => (inlineRefs.current[i] = el)}
                className="block w-[300px] h-[300px]"
              >
                {isInline && (
                  <motion.img
                    layoutId={`morph-${i}`}
                    src="/images/001.png"
                    className="w-full h-full object-cover"
                    style={inlineTransforms[i]}
                  />
                )}
              </span>
            </span>
          ))}
          dolor sit amet.
        </p>
      </div>

      {/* ================= Fixed ================= */}
      {!isInline && (
        <div className="fixed bottom-6 left-6 flex gap-4">
          {ITEMS.map((i) => (
            <motion.img
              key={i}
              ref={(el) => (fixedRefs.current[i] = el)}
              layoutId={`morph-${i}`}
              src="/images/001.png"
              className="w-[200px] h-[200px] rounded-lg object-cover"
              style={fixedTransforms[i]}
            />
          ))}
        </div>
      )}
    </section>
  );
}
