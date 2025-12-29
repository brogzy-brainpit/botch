import { useMotionValue} from "framer-motion";
import { useLayoutEffect, useState } from "react";

// Custom hook
export function useElementCenter(ref, scrollYProgress) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const yBottom = useMotionValue(0);
  const elLeft = useMotionValue(0);
  const elTop = useMotionValue(0);
  const elHeight = useMotionValue(0);
  const elWidth = useMotionValue(0);
  const pageYOff= useMotionValue(0);
  const [center, setCenter] = useState({ x: 0, y: 0 });
  const [coordinates, setCoordinates] = useState({});

  useLayoutEffect(() => {
    if (!ref.current) return;

    const r = ref.current.getBoundingClientRect();
    const scrollX = window.pageXOffset ;
    const scrollY = window.pageYOffset;
    // const scrollX = 0 ;
    // const scrollY = 0;
pageYOff.set(window.pageYOffset)
   x.set(r.left + r.width / 2 + window.scrollX);
      y.set(r.top+window.scrollY + r.height / 2 );
      yBottom.set(r.top+window.scrollY + r.height);
       elHeight.set(r.height);
    elWidth.set(r.width);
    elTop.set(r.top +window.scrollY);
    elLeft.set(r.left+window.scrollX);

    // Optional: recalc on window resize
    const onResize = () => {
      const r = ref.current.getBoundingClientRect();
setCoordinates({ left: r.left + scrollX, top: r.top + scrollY,width: r.width,height: r.height});

      x.set(r.left + r.width / 2 + window.scrollX);
      y.set(r.top + r.height / 2 );
      yBottom.set(r.top+window.scrollY + r.height);
       elHeight.set(r.height);
    elWidth.set(r.width);
    elTop.set(r.top +window.scrollY);
    elLeft.set(r.left+window.scrollX);
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [ref.current,scrollYProgress]);

 
  return {pageYOff, x, y,yBottom,elHeight,elWidth,elTop,elLeft };
}
