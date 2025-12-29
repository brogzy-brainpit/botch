"use client";
import { useEffect } from "react";
import Scrollbar from "smooth-scrollbar";
import OverscrollPlugin from "smooth-scrollbar/plugins/overscroll";

export default function SmoothScroll({ children }) {
  useEffect(() => {
    // Register plugin
    Scrollbar.use(OverscrollPlugin);

    const el = document.querySelector("#scroll-area");

    const scrollbar = Scrollbar.init(el, {
      damping: 0.07, // scroll friction (lower = more bounce/inertia)
      plugins: {
        overscroll: {
          effect: "bounce", // "bounce" | "glow" | "none"
          damping: 0.15,    // how much the overscroll resists
          maxOverscroll: 150, // px allowed beyond edges

        },
      },
    });
    return () => scrollbar.destroy();
  }, []);

  return (
    <div
      id="scroll-area"
      style={{ height: "100vh", overflow: "hidden" }}
    >
      {children}
    </div>
  );
}
