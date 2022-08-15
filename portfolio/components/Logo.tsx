import React from "react";

type Props = {};

export default function Logo({}: Props) {
  return (
    <div className="flex flex-row items-center space-x-3 cursor-pointer md:space-x-4">
      <img src="/images/logo.svg" className="w-7" alt="logo" />
      <div className="text-xl font-bold transition-all ">
        Simon <span className="text-fuchsia-500">Köck</span>
      </div>
    </div>
  );
}
