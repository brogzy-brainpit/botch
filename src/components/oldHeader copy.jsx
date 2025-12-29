 import React, { useRef, useEffect } from "react";
import { useAnimate } from "framer-motion";
import SlideUpText from "@/effects/SlideUpText";

function Preloader() {
  const text = "david alaba";
  const [scope, animate] = useAnimate();

useEffect(() => {
  const ease=[0.9, 0, 0.1, 1];
  const runAnimation = async () => {
    const letters = scope.current.querySelectorAll(".letter");

    // Set initial position
    letters.forEach((el, index) => {
      el.style.transform = `translateY(${index % 2 === 0 ? "150%" : "-150%"})`;
      el.style.opacity = 0;
    });

    await new Promise((res) => setTimeout(res, 400));

    // Animate in
    await animate(
      ".letter",
      { y: "0%", opacity: 1 },
      { duration: 0.8, ease, delay: (i) => i * 0.03 }
    );
    await new Promise((res) => setTimeout(res, 4200));

    letters.forEach(async(el, index) => {
     if (index !== 0 && index !== letters.length - 1) {
        animate(
          el,
          { y: index % 2 === 0 ? 200 : -200, opacity: 1 },
          { duration: 0.4, ease, delay: index * 0.04 }
        );
      }else{
        letters[0].parentElement.classList.remove('overflow-hidden')
        letters[letters.length -1].parentElement.classList.remove('overflow-hidden')

        const viewPortWidth= window.innerWidth
        const centerX= viewPortWidth / 2

       const infos= letters[0].getBoundingClientRect()
       const infos2= letters[letters.length -1].getBoundingClientRect()
       console.log(infos)
       console.log(infos2)
      await  animate(
          el,
          { x: index==0?centerX - infos.left - infos.width:centerX - infos2.left },
          { duration: 0.8, ease, delay: 0.3}
        );
    //  new Promise((res) => setTimeout(res, 100)); 
        // animate(
        //   el,
        //   { y: -350,
        //     // scale:0.4
        //    },
        //   { duration: 0.4, ease, delay: 1.2 }
        // );

     animate(scope.current, { y: -320, scale: 0.5 }, { duration: 1.5, ease });

      }
});

  };

  runAnimation();
}, []);


  return (
    <div className="fixed pointer-events-none   w-full h-full bgpurple-600/50 z-preloader flex flex-col items-center justify-center">
      <style>{`
        .letter {
          display: inline-block;
          transform: translateY(200%);
          opacity: 0;
          // will-change: transform, opacity;
        }
      `}</style>

      <div
        ref={scope}
        className=" translate-y-1/2 top-[55%] absolute  font-custom flex flex-wrap text-white font-bold header"
      >
        {text.split(" ").map((word, wIndex) => (
          <span key={wIndex} className=" word-wrapper mr-2 flex  bgslate-600">
            {word.split("").map((letter, lIndex) => (
              <span key={lIndex} className="overflow-hidden text-[8rem] uppercase leading-[0.8]">
              <span key={lIndex} className="letter text-[8rem] uppercase leading-[0.8]">
                {letter}
                
              </span>
              </span>
            ))}
          </span>
        ))}
      </div>

    </div>
  );
}

export default Preloader;
