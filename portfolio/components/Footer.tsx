import React from "react";
import { IconContext } from "react-icons";
import { socials } from "../constants/socials";
import Link from "next/link";

type Props = {};

export default function Footer({}: Props) {
  return (
    <div className="w-full border-t-2 border-background2">
      <div className="container px-4 py-8 mx-auto">
        <div className="flex flex-row justify-between ">
          <span className="text-sm text-gray-400">
            &copy; 2022 Simon Köck. All rights reserved.
          </span>
          <div className="flex flex-row space-x-4">
            <Link href="/imprint" passHref>
              <a className="text-sm font-bold text-gray-400">Imprint</a>
            </Link>
            <div className="w-[2px] h-full bg-gray-500 opacity-40"></div>
            <Link href="/privacy" passHref>
              <a className="text-sm font-bold text-gray-400">Privacy Policy</a>
            </Link>
          </div>
          <div>
            <div className="flex flex-row space-x-8 text-[1.1rem]">
              {socials.map((social) => {
                return (
                  <a
                    key={social.name}
                    href={social.url}
                    rel="noopener noreferrer"
                    target="_blank"
                  >
                    {<social.icon className="fill-gray-400" />}
                  </a>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
