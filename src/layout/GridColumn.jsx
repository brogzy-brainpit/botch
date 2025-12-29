import React from "react";
import clsx from "clsx";

function GridColumn({ children, className }) {
  return (
    <div
      className={clsx(
        "grid  grid-cols-6 lg:grid-cols-12 gap-[1.25rem] lg:gap-[1.5rem]",
        className
      )}
    >
      {children}
    </div>
  );
}

export default GridColumn;
