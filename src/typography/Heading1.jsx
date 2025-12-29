import React from "react";
import clsx from "clsx";

function Heading1({ children, className }) {
  return (
    <h2
      className={clsx(
        "text-brand-secondary break-words text-heading1  tracking-[-0.03em] font-custom font-extrabold",
        className
      )}
    >
      {children}
    </h2>
  );
}

export default Heading1;
