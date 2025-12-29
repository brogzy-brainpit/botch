"use client";
import React, { useEffect } from "react";
import Lenis from "@studio-freight/lenis";
import gsap from "gsap";

function SmoothScroll({ children }) {
  useEffect(() => {
    // const lenis = new Lenis({
    //    lerp: 0.1, // super floaty
    //   smoothWheel: true,
    //   wheelMultiplier:10,
    //   duration:7,
    //   easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    // });
    const lenis = new Lenis();
    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
      gsap.ticker.remove(() => {});
    };
  }, []);

  return <div className="scroll-container">{children}</div>;
}

export default SmoothScroll;
