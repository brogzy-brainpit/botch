"use client";
import { createContext, useContext, useEffect, useState } from "react";

const HeaderColorContext = createContext();

export function ColorProvider({ children }) {
  const [activeSection, setActiveSection] = useState("landing");
  useEffect(()=>{
setActiveSection('landing')
  },[])
  return (
    <HeaderColorContext.Provider value={{ activeSection, setActiveSection }}>
      {children}
    </HeaderColorContext.Provider>
  );
}

export function useHeaderColor() {
  return useContext(HeaderColorContext);
}
