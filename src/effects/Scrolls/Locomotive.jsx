"use client"
import { useEffect } from "react";
import LocomotiveScroll from "locomotive-scroll";
import "locomotive-scroll/dist/locomotive-scroll.css";

export default function LocomotiveScrolls({ children }) {
  useEffect(() => {
    // const locoScroll = new LocomotiveScroll({
    //   el: document.querySelector("[data-scroll-container]"),
    //   smooth: true,
    //   lerp: 0.1, // lower = more inertia
      
    // });

    const locoScroll = new LocomotiveScroll({
  el: document.querySelector("[data-scroll-container]"),
  smooth: true,
  lerp: 0.1,
  scrollbarClass: "c-scrollbar", // default
  getDirection: true,
  smartphone: { smooth: true },
  tablet: { smooth: true },
  // This disables the fake scrollbar
  scrollbarContainer: null,
});


    return () => locoScroll.destroy();
  }, []);

  return <div data-scroll-container>{children}</div>;
}
