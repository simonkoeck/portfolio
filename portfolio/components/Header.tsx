import { AnimatePresence, motion } from "framer-motion";
import { GetStaticProps } from "next";
import Link from "next/link";
import React, { useState } from "react";
import { FaInstagram, FaGithub, FaLinkedin } from "react-icons/fa";
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

type Props = {};

export default function Header({}: Props) {
  const [navigationDrawer, setNavigationDrawer] = useState(false);

  return (
    <>
      <AnimatePresence>
        {navigationDrawer && (
          <>
            <motion.div
              initial={{ opacity: 0, left: "-100%" }}
              animate={{ opacity: 1, left: "0" }}
              exit={{ opacity: 0, left: "-100%" }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 z-50 w-4/5 h-screen rounded-r-3xl bg-background2 "
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
    </>
  );
}
