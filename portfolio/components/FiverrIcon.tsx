import React, { useEffect, useState } from "react";

type Props = {
  className: string;
};

export default function FiverrIcon({ className }: Props) {
  return (
    <div className={className + " w-[1.2rem]"}>
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16">
        <g className={className}>
          <path d="M13 13V5H5v-.5C5 3.673 5.673 3 6.5 3H8V0H6.5A4.505 4.505 0 0 0 2 4.5V5H0v3h2v5H0v3h7v-3H5V8h5.028v5H8v3h7v-3h-2z" />
          <circle cx="11.5" cy="1.5" r="1.5" />
        </g>
      </svg>
    </div>
  );
}
