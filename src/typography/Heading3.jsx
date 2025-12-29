import React from "react";
import clsx from "clsx";

function Heading3({ children, className }) {
  return (
    <h2
      className={clsx(
        "text-white  break-word text-heading3 leading-[1] tracking-[-0.01em] lowercase text-center  font-custom font-black flex flex-wrap",
        className
      )}
    >
      {children}
    </h2>
  );
}

export default Heading3;
