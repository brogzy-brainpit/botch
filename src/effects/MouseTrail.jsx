"use client";
import React, { useState, useRef } from "react";
import CursorImageTrail from "@/effects/CursorImageTrail";
// import { Button } from "@/components/ui/button";

export default function MouseTrail({style='minimal',children}) {
  const [animationStyle, setAnimationStyle] = useState(style);
  const buttonRef = useRef(null);

  const toggleAnimationStyle = () => {
    // setAnimationStyle((prev) => (prev === "minimal" ? "dynamic" : "minimal"));

    if (buttonRef.current) {
      buttonRef.current.classList.add("animate-pulse-once");
      setTimeout(() => {
        buttonRef.current?.classList.remove("animate-pulse-once");
      }, 500);
    }
  };

  return (
    <CursorImageTrail
      renderImageBuffer={50}
      rotationRange={25}
      animationStyle={animationStyle}
      images={Array.from({ length: 16 }, (_, i) => `/images/00${i + 1}.png`)}
    
    >
      {children}
    </CursorImageTrail>
  );
}
