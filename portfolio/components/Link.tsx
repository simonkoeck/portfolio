import Link from "next/link";
import React from "react";
import { HiArrowRight } from "react-icons/hi";

type Props = {
  href: string;
  children: React.ReactNode;
  onClick?: () => void;
};

export default function CustomLink({ children, href, onClick }: Props) {
  if (onClick != null) {
    return (
      <span
        className="inline-flex flex-row items-center space-x-[0.15rem] cursor-pointer"
        onClick={() => {
          onClick();
        }}
      >
        <span className="!text-fuchsia-400">{children}</span>
        <HiArrowRight className="text-[0.8rem] !fill-fuchsia-400" />
      </span>
    );
  }

  return (
    <>
      {href.startsWith("http") ? (
        <a
          href={href}
          rel="noopener noreferrer"
          target="_blank"
          className="inline-flex flex-row items-center space-x-[0.15rem] !no-underline"
        >
          <span className="!text-fuchsia-400">{children}</span>
          <HiArrowRight className="text-[0.8rem] !fill-fuchsia-400" />
        </a>
      ) : (
        <Link href={href} passHref>
          <a className="inline-flex flex-row items-center space-x-[0.15rem] !no-underline">
            <span className="!text-fuchsia-400">{children}</span>
            <HiArrowRight className="text-[0.8rem] !fill-fuchsia-400" />
          </a>
        </Link>
      )}
    </>
  );
}
