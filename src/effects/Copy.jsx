"use client";

import { useEffect, useRef, useState } from "react";
import { useAnimate, useInView } from "framer-motion";
import "splitting/dist/splitting.css";

export function mergeRefs(...refs) {
  return (el) => {
    refs.forEach((r) => {
      if (!r) return;
      if (typeof r === "function") r(el);
      else r.current = el;
    });
  };
}

export default function Copy({ text,from='left',justify='left',to='right', intialDelay=0,customWord=[],customWordColor='', once=true,trigger=false, stagger = 0.03, colorBlock = "#000000" }) {
  const ref = useRef();
  const [scope, animate] = useAnimate();
  const [isReady, setIsReady] = useState(false); // flag when splitting is done
  const inView = useInView(ref, { once:once});
  const ease = [0.9, 0, 0.1, 1];

  // ---------- SETUP SPLITTING ONCE ----------
  useEffect(() => {
    async function runSplitting() {
      const Splitting = (await import("splitting")).default;
      const result = Splitting({ target: ref.current, by: "lines" });

      const container = document.createElement("div");
      container.className = " w-full";
      if(customWord.length>0){
        customWord.forEach((word)=>{
          
        result[0].words[word].style.color=customWordColor
  
       })

      }
      const lines = {};
      result[0].words.forEach((word) => {
        const lineIndex = word.style.getPropertyValue("--line-index"); // each word has a style attribute --line-index:value, so we are getting the value to store them in an objects
        (lines[lineIndex] ||= []).push(word);
      });

      Object.values(lines).forEach((words) => {
        const lineContainer = document.createElement("div");
        lineContainer.className = `relative flex justify-${justify} `;

        const lineWrapper = document.createElement("div");
        lineWrapper.className = "relative block [width:max-content]";

        const blockDiv = document.createElement("div");
        blockDiv.className = "block-wrapper scale-x-0 z-[30] absolute top-0 left-0 w-full h-[101%]";
        blockDiv.style.backgroundColor = colorBlock;

        lineContainer.appendChild(lineWrapper);
        lineWrapper.appendChild(blockDiv);
        words.forEach((w) => lineWrapper.appendChild(w));
        container.appendChild(lineContainer);
      });

      ref.current.innerHTML = "";
      ref.current.appendChild(container);

      // hide content initially
      ref.current.style.opacity = 0;
      ref.current.style.visibility = "hidden";

      // mark ready
      setIsReady(true);
    }

    runSplitting();
    // window.addEventListener('resize',runSplitting)
    // return ()=>{
    // window.removeEventListener('resize',runSplitting) 
    // }

  }, [colorBlock,text,]);

  // ---------- ANIMATE WHEN IN VIEW AND READY ----------
  useEffect(() => {
    if (!inView || !isReady || !ref.current || !trigger) return;

    const runAnimation = async () => {
      const blocks = Array.from(ref.current.querySelectorAll(".block-wrapper"));
      const words = Array.from(ref.current.querySelectorAll(".word"));

      if (!blocks.length) return; // safety check

      blocks.forEach((block) => (block.style.transformOrigin = from));
        await new Promise((r) => setTimeout(r, intialDelay* 1000));
      // reveal container
      await animate(ref.current, { opacity: 1, visibility: "visible" }, { duration: 0 });

      // open blocks
      await animate(blocks, { scaleX: [0, 1] }, { duration: 0.8, delay: (i) => i * stagger, ease });

      // fade in words
      if (words.length) {
        animate(words, { opacity: [0, 1] }, { duration: 0 });
      }

      // close blocks
      animate(blocks, { scaleX: [1, 0], transformOrigin: to }, { duration: 0.8, delay: (i) => i * stagger, ease });
    };

    runAnimation();
   
  }, [inView, isReady,trigger,text]);

  return (
    <div ref={mergeRefs(ref, scope)} className="papa">
      {text}
    </div>
  );
}
