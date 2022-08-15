import React from "react";
import { HiArrowRight } from "react-icons/hi";

type Props = {
  href: string;
  children: React.ReactNode;
};

export default function Link({ children, href }: Props) {
  return (
    <a
      href={href}
      rel="noopener noreferrer"
      target="_blank"
      className="inline-flex flex-row items-center space-x-[0.15rem] hover:space-x-[0.2rem]"
    >
      <span className="text-fuchsia-400">{children}</span>
      <HiArrowRight className="text-[0.8rem] fill-fuchsia-400" />
    </a>
  );
}
