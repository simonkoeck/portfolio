import { AnimatePresence, motion } from "framer-motion";
import { GetStaticProps } from "next";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { HiArrowRight, HiPhone } from "react-icons/hi";
import {
  HiMenu,
  HiMenuAlt1,
  HiMenuAlt2,
  HiX,
  HiUser,
  HiCode,
  HiMail,
} from "react-icons/hi";
import { socials } from "../constants/socials";
import { getMany } from "../services/strapi";
import Logo from "./Logo";
import Toolip from "./Tooltip";

const Links = [
  {
    name: "About me",
    href: "/",
    icon: HiUser,
  },
  {
    name: "Projects",
    href: "/projects",
    icon: HiCode,
  },
  {
    name: "Contact",
    href: "/contact",
    icon: HiMail,
  },
];

function HiMegaphone() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      className="w-4 h-4 sm:w-5 sm:h-5 stroke-[#fff]"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M10.34 15.84c-.688-.06-1.386-.09-2.09-.09H7.5a4.5 4.5 0 110-9h.75c.704 0 1.402-.03 2.09-.09m0 9.18c.253.962.584 1.892.985 2.783.247.55.06 1.21-.463 1.511l-.657.38c-.551.318-1.26.117-1.527-.461a20.845 20.845 0 01-1.44-4.282m3.102.069a18.03 18.03 0 01-.59-4.59c0-1.586.205-3.124.59-4.59m0 9.18a23.848 23.848 0 018.835 2.535M10.34 6.66a23.847 23.847 0 008.835-2.535m0 0A23.74 23.74 0 0018.795 3m.38 1.125a23.91 23.91 0 011.014 5.395m-1.014 8.855c-.118.38-.245.754-.38 1.125m.38-1.125a23.91 23.91 0 001.014-5.395m0-3.46c.495.413.811 1.035.811 1.73 0 .695-.316 1.317-.811 1.73m0-3.46a24.347 24.347 0 010 3.46"
      />
    </svg>
  );
}

type Props = {};

export default function Header({}: Props) {
  const [navigationDrawer, setNavigationDrawer] = useState(false);

  return (
    <>
      <div className="w-full bg-fuchsia-500 rounded-b-md">
        <div className="flex flex-row items-center justify-center px-4 py-[0.24rem] space-x-4">
          <HiMegaphone />
          <div className="text-[0.74rem] sm:text-sm">
            <b>Yeeahhh,</b> I&apos;m now on Fiverr! See my gigs and{" "}
            <a
              href="https://fiverr.com/simonkoeck"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex flex-row items-center space-x-1"
            >
              <b>hire me</b>
              <HiArrowRight />
            </a>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {navigationDrawer && (
          <>
            <motion.div
              initial={{ opacity: 0, left: "-100%" }}
              animate={{ opacity: 1, left: "0" }}
              exit={{ opacity: 0, left: "-100%" }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 z-[100] w-4/5 h-screen rounded-r-3xl bg-background2 "
            >
              <div className="relative flex flex-col justify-between w-full h-full px-5 py-10">
                <div className="flex flex-row items-center justify-between">
                  <Logo />
                  <HiX
                    className="text-3xl cursor-pointer fill-gray-200"
                    onClick={() => {
                      setNavigationDrawer(false);
                    }}
                  />
                </div>
                <nav>
                  <ul className="flex flex-col pl-4 space-y-10">
                    {Links.map((link) => (
                      <li key={link.name}>
                        <Link href={link.href}>
                          <a className="flex flex-row items-center space-x-5">
                            <link.icon className="text-3xl fill-gray-200" />
                            <span className="text-xl font-bold text-gray-200">
                              {link.name}
                            </span>
                          </a>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </nav>

                <div className="flex flex-row space-x-8 text-[1.1em] md:text-[1.3rem] mx-auto">
                  {socials.map((social) => {
                    return (
                      <a
                        key={social.name}
                        href={social.url}
                        rel="noopener noreferrer"
                        className="flex flex-row items-center justify-center "
                        target="_blank"
                      >
                        {
                          <social.icon className="fill-gray-400 hover:fill-fuchsia-400" />
                        }
                      </a>
                    );
                  })}
                </div>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.4 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 z-40 w-full h-screen bg-background2"
              onClick={() => setNavigationDrawer(false)}
            >
              <div> </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
      <div className="relative z-10 w-full border-b-2 border-background2 bg-background">
        <div className="container flex flex-row items-center justify-between px-5 py-5 mx-auto sm:py-8">
          <div className="flex flex-row items-center space-x-7 md:space-x-0">
            <div className="md:hidden">
              <HiMenuAlt2
                className="text-3xl cursor-pointer fill-gray-200"
                onClick={() => setNavigationDrawer(true)}
              />
            </div>
            <AnimatePresence initial={false} exitBeforeEnter>
              <motion.div
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 1.05 }}
              >
                <Link href="/" passHref>
                  <a>
                    <Logo />
                  </a>
                </Link>
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="flex-row hidden space-x-8 text-gray-100 md:flex">
            {Links.map((link, i) => {
              return (
                <Link href={link.href} key={i} passHref>
                  <a key={i} href={link.href}>
                    {link.name}
                  </a>
                </Link>
              );
            })}
          </div>
          <div className="hidden sm:block">
            <div className="flex flex-row space-x-8 text-[1.1em] md:text-[1.3rem]">
              {socials.map((social) => {
                return (
                  <a
                    key={social.name}
                    href={social.url}
                    rel="noopener noreferrer"
                    className="flex flex-row items-center justify-center "
                    target="_blank"
                  >
                    {
                      <social.icon className="fill-gray-200 hover:fill-fuchsia-400" />
                    }
                  </a>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
