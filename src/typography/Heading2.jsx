import React from "react";
import clsx from "clsx";

function Heading2({ children, className,...props }) {
  return (
    <h2
      className={clsx(
        "text-brand-secondary breakword text-heading2 leading-[1.1] tracking-[-0.03em] font-custom",
        className
      )}
    >
      {children}
    </h2>
  );
}

export default Heading2;
