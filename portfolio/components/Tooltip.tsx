import React, { Children, ReactNode, useState } from "react";
import ReactTooltip from "react-tooltip";

type Props = {
  children: ReactNode;
  message: string;
};

export default function Toolip({ children, message }: Props) {
  const [tooltip, showTooltip] = useState(false);
  return (
    <>
      {tooltip && <ReactTooltip effect="solid" />}
      <div
        data-tip={message}
        onMouseEnter={() => showTooltip(true)}
        onMouseLeave={() => {
          showTooltip(false);
          setTimeout(() => showTooltip(true), 50);
        }}
      >
        {children}
      </div>
    </>
  );
}
