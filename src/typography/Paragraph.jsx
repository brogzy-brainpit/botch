import React from "react";
import clsx from "clsx";

function Paragraph({ children, className }) {
  return (
    <h2
      className={clsx(
        "break-words text-para leading-[1.2] font-body",
        className
      )}
    >
      {children}
    </h2>
  );
}

export default Paragraph;
