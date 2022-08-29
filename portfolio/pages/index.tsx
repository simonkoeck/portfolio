import type { GetStaticProps, NextPage } from "next";
import Header from "../components/Header";
import {
  HiAcademicCap,
  HiArrowRight,
  HiBriefcase,
  HiCode,
  HiMail,
  HiStar,
  HiUser,
} from "react-icons/hi";
import HomeLayout from "../components/layouts/HomeLayout";
import Link from "next/link";
import { FaGithub } from "react-icons/fa";
import { animate, motion, useInView } from "framer-motion";
import { getMany } from "../services/strapi";
import CustomHead from "../components/Head";
import CustomLink from "../components/Link";
import { HTMLAttributes, useEffect, useRef, useState } from "react";

const Home: NextPage = () => {
  const [width, setWidth] = useState<number>(
    typeof window !== "undefined" ? window.innerWidth : 0
  );

  function handleWindowSizeChange() {
    setWidth(window.innerWidth);
  }
  useEffect(() => {
    window.addEventListener("resize", handleWindowSizeChange);
    return () => {
      window.removeEventListener("resize", handleWindowSizeChange);
    };
  }, []);

  const isMobile = width <= 768;

  const educationRef = useRef<HTMLDivElement>(null);
  return (
    <>
      <CustomHead
        description="My Name is Simon Köck and I live in Austria. I'm 18 years old and I've been specialicing on Full-Stack-Development for about 5 years."
        title="Simon Köck | Full-Stack-Developer"
      />
      <HomeLayout>
        <div className="w-full">
          <div className="container relative px-4 pt-12 pb-24 mx-auto lg:px-40 sm:pb-32 sm:pt-20">
            <motion.div
              initial={{ opacity: 0, translateX: -100 }}
              transition={{ duration: 0.4 }}
              animate={{ opacity: 1, translateX: 0 }}
            >
              <h1 className="font-black text-[3.8rem] md:text-[5rem] tracking-tight leading-[1.2] relative">
                Hello,
                <br />
                I&apos;m{" "}
                <motion.div
                  initial={{ rotateZ: 0 }}
                  animate={{ rotateZ: 6 }}
                  transition={{
                    duration: 0.13,
                    delay: 0.7,
                    default: { ease: "easeInOut" },
                  }}
                  className="relative z-30 inline-block"
                >
                  <div className="inline-block mx-0 my-6 transition-all rounded-lg sm:mx-2 bg-background2">
                    <span className="px-2 py-0 sm:px-6 sm:py-2 text-[3rem] md:text-[4.5rem] text-transparent bg-clip-text bg-gradient-to-r from-fuchsia-500 to-fuchsia-300">
                      &lt;Simon /&gt;
                    </span>
                  </div>
                </motion.div>
                <div className="block md:hidden absolute top-[-78px] right-[-170px]">
                  <img src="/images/mobile-me.png" alt="Simon Köck" />
                  <img
                    src="/images/finger.png"
                    className="absolute top-[156px] left-[26px] w-[45px] z-50"
                  />
                </div>
              </h1>
              <div className="relative z-30 inline-block mt-10">
                <Link href="/contact" passHref>
                  <a className="flex flex-row items-center px-3 py-2 space-x-2 text-sm font-bold border-2 rounded-md cursor-pointer sm:space-x-3 sm:px-5 sm:py-2 md:text-lg bg-background border-fuchsia-400">
                    <HiMail className="fill-fuchsia-400" />
                    <span className="text-fuchsia-400">Contact me</span>
                  </a>
                </Link>
              </div>
              <div className="relative z-30 inline-block mt-10 ml-2 md:ml-5 ">
                <a
                  href="https://github.com/simonkoeck/portfolio"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex flex-row items-center px-3 py-2 space-x-2 text-sm font-bold border-2 border-gray-400 rounded-md cursor-pointer sm:space-x-3 sm:px-5 sm:py-2 md:text-lg bg-background"
                >
                  <FaGithub className="fill-gray-400" />
                  <span className="text-gray-400">View the Source-Code</span>
                </a>
              </div>
            </motion.div>

            <div className="hidden md:block">
              <motion.div
                initial={{ opacity: 0 }}
                transition={{ duration: 0.4 }}
                animate={{ opacity: 1 }}
              >
                <img
                  src="/images/me.png"
                  style={{
                    filter: "saturate(70%) sepia(30%) brightness(100%)",
                  }}
                  alt="Simon Köck"
                  className="absolute bottom-0 right-[-7rem] lg:right-[6rem] z-10 lg:z-30 h-[100%] lg:h-[calc(100%_+_5rem)] pointer-events-none select-none"
                />
                <span className="sr-only">Simon Köck</span>
              </motion.div>
            </div>
          </div>
          <div
            style={{
              textShadow:
                "-3px -3px 0 #fff,3px -3px 0 #fff, -3px 3px 0 #fff, 3px 3px 0 #fff",
            }}
            className="rotate-90 right-[-3rem] sm:right-[10rem] sm:rotate-0 select-none absolute opacity-[2%] top-0 font-black text-background text-[22rem] sm:text-[28rem]  z-[0] leading-tight"
          >
            DEV
          </div>
          <div className="relative z-10 w-full bg-background2">
            <motion.div
              className="container px-4 pt-10 mx-auto lg:px-40"
              initial={{ opacity: 0, translateY: -30 }}
              animate={{ opacity: 1, translateY: 0 }}
              exit={{ opacity: 0, translateY: -30 }}
              transition={{ duration: 0.2, delay: 0.1 }}
            >
              <Headline2 text="Who am I?" />
              <div className="relative flex flex-row flex-wrap justify-between py-10 sm:py-16">
                <AboutMeItem
                  text="My Name is Simon Köck and I live in Austria. I'm 18 years
                      old and I've been specialicing on
                      Full-Stack-Development for about 5 years."
                  title="About Me"
                  icon={HiUser}
                />

                <AboutMeItem
                  text={
                    <>
                      I&apos;m in the 5th grade of{" "}
                      <CustomLink href="https://hak-feldkirch.at">
                        HAK Feldkirch
                      </CustomLink>{" "}
                      in the Digital Business branch in Vorarlberg, Austria.
                      This is my last year (hopefully).{" "}
                      <CustomLink
                        href=""
                        onClick={() => {
                          educationRef.current?.scrollIntoView({
                            block: "start",
                            behavior: "smooth",
                          });
                        }}
                      >
                        See more
                      </CustomLink>
                    </>
                  }
                  title="School"
                  icon={HiAcademicCap}
                />
                <AboutMeItem
                  text="	I have been active in a number of sports since I was 6 years old. I have played football, table tennis, etc. In the winter my favourite sport is skiing in the beautiful Alps."
                  title="Hobbies"
                  icon={HiStar}
                />
                <AboutMeItem
                  text={
                    <>
                      Me and my brother started a business together 1 year ago.
                      We develop digital products for small businesses and small
                      teams. We also create open source software.{" "}
                      <CustomLink href="https://github.com/simplifylabs">
                        See more
                      </CustomLink>
                    </>
                  }
                  title="Simplify Labs"
                  icon={HiBriefcase}
                />
              </div>
            </motion.div>
          </div>
          <div
            className="w-full"
            style={{
              background:
                "linear-gradient(90deg, rgba(146,48,161,0.22591043253238796) 0%, rgba(146,48,161,0.1474790599833683) 100%)",
            }}
          >
            <div className="container px-10 py-10 mx-auto sm:flex sm:flex-row sm:items-center sm:justify-between lg:px-40">
              <motion.div
                className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl sm:tracking-tight"
                whileInView={{ opacity: 1, translateX: 0 }}
                viewport={{ once: true }}
                initial={{ opacity: 0, translateX: -30 }}
                transition={{ duration: 0.2, delay: 0.2 }}
              >
                <span className="block">Interest aroused?</span>
                <span className="block font-bold text-fuchsia-500">
                  See all of my projects
                </span>
              </motion.div>
              <motion.div
                whileInView={{ opacity: 1, translateX: 0 }}
                viewport={{ once: true }}
                initial={{ opacity: 0, translateX: 30 }}
                transition={{ duration: 0.2, delay: 0.2 }}
              >
                <Link href={"/projects"} passHref>
                  <a
                    href="#"
                    className="inline-flex flex-row items-center justify-center px-3 py-2 mt-6 space-x-2 text-base font-bold text-white border border-transparent rounded-md sm:px-5 sm:py-3 sm:mt-0 bg-fuchsia-500 hover:bg-fuchsia-600"
                  >
                    <HiArrowRight className="text-xl" />
                    <span>Get inspired</span>
                  </a>
                </Link>
              </motion.div>
            </div>
          </div>
          <div className="w-full bg-background2" ref={educationRef}>
            <div className="container flex flex-row items-center justify-between px-4 py-16 mx-auto lg:px-40 ">
              <div className="flex flex-col">
                <Headline2 text="Education" />
                <ol className="mx-3 mt-12 sm:flex">
                  <li className="relative flex-1 mb-6 sm:mb-0">
                    <div className="flex items-center">
                      <div className="z-10 flex items-center justify-center w-6 h-6 rounded-full ring-0 bg-fuchsia-400 sm:ring-8 ring-gray-800 shrink-0">
                        <HiAcademicCap className="fill-fuchsia-900" />
                      </div>
                      <div className="hidden sm:flex w-full bg-gray-200 h-0.5 dark:bg-gray-700"></div>
                    </div>
                    <motion.div
                      className="mt-3 sm:pr-8"
                      whileInView={{ opacity: 1, translateY: 0 }}
                      viewport={{ once: true }}
                      initial={{ opacity: 0, translateY: 30 }}
                      transition={{ duration: 0.2, delay: 0.2 }}
                    >
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                        HAK Feldkirch
                      </h3>
                      <time className="block mb-2 text-sm font-normal leading-none text-gray-400 dark:text-gray-500">
                        September 2018 - Now
                      </time>
                      <p className="text-base font-normal text-gray-500 dark:text-gray-400">
                        The HAK Feldkirch impart comprehensive general education
                        and economic (commercial) basic training in an
                        integrated form.
                      </p>
                    </motion.div>
                  </li>
                  <li className="relative flex-1 mb-6 sm:mb-0">
                    <div className="flex items-center">
                      <div className="z-10 flex items-center justify-center w-6 h-6 rounded-full ring-0 bg-fuchsia-400 sm:ring-8 ring-gray-800 shrink-0">
                        <HiAcademicCap className="fill-fuchsia-900" />
                      </div>
                      <div className="hidden sm:flex w-full bg-gray-200 h-0.5 dark:bg-gray-700"></div>
                    </div>
                    <motion.div
                      className="mt-3 sm:pr-8"
                      whileInView={{ opacity: 1, translateY: 0 }}
                      viewport={{ once: true }}
                      initial={{ opacity: 0, translateY: 30 }}
                      transition={{
                        duration: 0.2,
                        delay: isMobile ? 0.2 : 0.4,
                      }}
                    >
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                        Bundesgymnasium Feldkirch
                      </h3>
                      <time className="block mb-2 text-sm font-normal leading-none text-gray-400 dark:text-gray-500">
                        September 2014 - July 2018
                      </time>
                      <p className="text-base font-normal text-gray-500 dark:text-gray-400">
                        The Gymnasium Feldkirch is an educational institution
                        based on tradition, which meets the challenges of a
                        constantly changing society.
                      </p>
                    </motion.div>
                  </li>
                  <li className="relative flex-1 mb-6 sm:mb-0">
                    <div className="flex items-center">
                      <div className="z-10 flex items-center justify-center w-6 h-6 rounded-full ring-0 bg-fuchsia-400 sm:ring-8 ring-gray-800 shrink-0">
                        <HiAcademicCap className="fill-fuchsia-900" />
                      </div>
                      <div className="hidden sm:flex w-full bg-gray-200 h-0.5 dark:bg-gray-700"></div>
                    </div>
                    <motion.div
                      className="mt-3 sm:pr-8"
                      whileInView={{ opacity: 1, translateY: 0 }}
                      viewport={{ once: true }}
                      initial={{ opacity: 0, translateY: 30 }}
                      transition={{
                        duration: 0.2,
                        delay: isMobile ? 0.2 : 0.6,
                      }}
                    >
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                        Volksschule Feldkirch
                      </h3>
                      <time className="block mb-2 text-sm font-normal leading-none text-gray-400 dark:text-gray-500">
                        September 2010 - July 2014
                      </time>
                      <p className="text-base font-normal text-gray-500 dark:text-gray-400">
                        Just a basic elementary school based in Feldkirch
                        (Tisis).
                      </p>
                    </motion.div>
                  </li>
                </ol>
              </div>
            </div>
          </div>
          <div className="w-full bg-background">
            <div className="container px-4 pt-10 pb-16 mx-auto lg:px-40">
              <Headline2 text="Skills" />
              <h3 className="pl-3 mt-8 font-semibold border-l-[0.24rem] border-l-fuchsia-400 text-lg">
                Programming Languages
              </h3>
              <div className="flex flex-row flex-wrap items-center justify-between ">
                <Skill
                  icon={
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      aria-label="JavaScript"
                      viewBox="0 0 512 512"
                      className="w-4"
                    >
                      <rect width="512" height="512" fill="#f7df1e" rx="15%" />
                      <path d="m324,370c10,17 24,29 47,29 20,0 33,-10 33,-24 0,-16 -13,-22 -35,-32l-12,-5c-35,-15 -58,-33 -58,-72 0,-36 27,-64 70,-64 31,0 53,11 68,39l-37,24c-8,-15 -17,-21 -31,-21 -14,0 -23,9 -23,21 0,14 9,20 30,29l12,5c41,18 64,35 64,76 0,43 -34,67 -80,67 -45,0 -74,-21 -88,-49zm-170,4c8,13 14,25 31,25 16,0 26,-6 26,-30V203h48v164c0,50 -29,72 -72,72 -39,0 -61,-20 -72,-44z" />
                    </svg>
                  }
                  name="JavaScript"
                  percentage={90}
                />

                <Skill
                  icon={
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 48 48"
                      className="w-6"
                    >
                      <rect width="36" height="36" x="6" y="6" fill="#1976d2" />
                      <polygon
                        fill="#fff"
                        points="27.49,22 14.227,22 14.227,25.264 18.984,25.264 18.984,40 22.753,40 22.753,25.264 27.49,25.264"
                      />
                      <path
                        fill="#fff"
                        d="M39.194,26.084c0,0-1.787-1.192-3.807-1.192s-2.747,0.96-2.747,1.986 c0,2.648,7.381,2.383,7.381,7.712c0,8.209-11.254,4.568-11.254,4.568V35.22c0,0,2.152,1.622,4.733,1.622s2.483-1.688,2.483-1.92 c0-2.449-7.315-2.449-7.315-7.878c0-7.381,10.658-4.469,10.658-4.469L39.194,26.084z"
                      />
                    </svg>
                  }
                  name="TypeScript"
                  percentage={95}
                />
              </div>
              <div className="flex flex-row flex-wrap items-center justify-between ">
                <Skill
                  icon={
                    <svg
                      preserveAspectRatio="xMidYMid"
                      viewBox="0 -1.428 255.582 290.108"
                      className="w-5 h-5"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="m255.569 84.452c-.002-4.83-1.035-9.098-3.124-12.76-2.052-3.603-5.125-6.622-9.247-9.009-34.025-19.619-68.083-39.178-102.097-58.817-9.17-5.294-18.061-5.1-27.163.27-13.543 7.986-81.348 46.833-101.553 58.536-8.321 4.818-12.37 12.19-12.372 21.771-.013 39.455 0 78.91-.013 118.365 0 4.724.991 8.91 2.988 12.517 2.053 3.711 5.169 6.813 9.386 9.254 20.206 11.703 88.02 50.547 101.56 58.536 9.106 5.373 17.997 5.565 27.17.27 34.015-19.64 68.075-39.199 102.105-58.818 4.217-2.44 7.333-5.544 9.386-9.252 1.994-3.608 2.987-7.793 2.987-12.518 0 0 0-78.889-.013-118.345"
                        fill="#a179dc"
                      />
                      <path
                        d="m128.182 143.241-125.194 72.084c2.053 3.711 5.169 6.813 9.386 9.254 20.206 11.703 88.02 50.547 101.56 58.536 9.106 5.373 17.997 5.565 27.17.27 34.015-19.64 68.075-39.199 102.105-58.818 4.217-2.44 7.333-5.544 9.386-9.252z"
                        fill="#280068"
                      />
                      <path
                        d="m255.569 84.452c-.002-4.83-1.035-9.098-3.124-12.76l-124.263 71.55 124.413 72.073c1.994-3.608 2.985-7.793 2.987-12.518 0 0 0-78.889-.013-118.345"
                        fill="#390091"
                      />
                      <g fill="#fff">
                        <path d="m201.892 116.294v13.474h13.474v-13.474h6.737v13.474h13.474v6.737h-13.474v13.473h13.474v6.737h-13.474v13.474h-6.737v-13.474h-13.474v13.474h-6.737v-13.474h-13.473v-6.737h13.473v-13.473h-13.473v-6.737h13.473v-13.474zm13.474 20.21h-13.474v13.474h13.474z" />
                        <path d="m128.457 48.626c35.144 0 65.827 19.086 82.262 47.456l-.16-.273-41.35 23.808c-8.146-13.793-23.08-23.102-40.213-23.294l-.54-.003c-26.125 0-47.305 21.18-47.305 47.305a47.08 47.08 0 0 0 6.239 23.47c8.154 14.235 23.483 23.836 41.067 23.836 17.693 0 33.109-9.723 41.221-24.11l-.197.345 41.287 23.918c-16.255 28.13-46.518 47.157-81.253 47.536l-1.058.006c-35.255 0-66.025-19.204-82.419-47.724-8.003-13.923-12.582-30.064-12.582-47.277 0-52.466 42.532-95 95-95z" />
                      </g>
                    </svg>
                  }
                  name="C#"
                  percentage={70}
                />

                <Skill
                  icon={
                    <svg
                      className="w-5 h-5"
                      viewBox="0 0 256 256"
                      xmlns="http://www.w3.org/2000/svg"
                      preserveAspectRatio="xMinYMin meet"
                    >
                      <path
                        d="M70.534 69.696L53.988 53.15l.07 119.6.198 5.59c.082 2.63.57 5.598 1.384 8.674l131.104 46.23 32.772-14.52.012-.04L70.534 69.696"
                        fill="#00D2B8"
                      />
                      <path
                        d="M55.64 187.014l.008.008c-.008-.054-.036-.114-.036-.17 0 .056.008.108.028.162zm163.876 31.71l-32.772 14.52-131.096-46.222c2.504 9.608 8.048 20.408 14.014 26.314l42.784 42.54 95.13.124 11.952-37.316-.012.04z"
                        fill="#55DDCA"
                      />
                      <path
                        d="M3.034 130.116c-4.236 4.522-2.132 13.85 4.688 20.722L37.14 180.5l18.5 6.514c-.814-3.076-1.302-6.044-1.384-8.674l-.198-5.59-.07-119.6-50.954 76.966z"
                        fill="#0081C6"
                      />
                      <path
                        d="M187.82 54.686c-3.076-.786-6.026-1.272-8.7-1.356l-5.908-.204-119.224.016 165.556 165.542h.014l14.54-32.804L187.82 54.686"
                        fill="#0079B3"
                      />
                      <path
                        d="M187.67 54.654c.064.014.114.032.156.038l-.006-.006c-.036-.018-.086-.018-.15-.032zm26.448 14.078c-6.008-6.058-16.666-11.564-26.292-14.04l46.272 131.188-14.54 32.804h-.014l35.532-11.348.076-97.416-41.034-41.188z"
                        fill="#00A4E4"
                      />
                      <path
                        d="M181.338 36.298L151.684 6.862c-6.858-6.794-16.19-8.908-20.7-4.684L53.988 53.142l119.224-.016 5.908.204c2.674.084 5.624.57 8.7 1.356l-6.482-18.388z"
                        fill="#00D2B8"
                      />
                    </svg>
                  }
                  name="Dart"
                  percentage={70}
                />
              </div>
              <div className="flex flex-row flex-wrap items-center justify-between ">
                <Skill
                  icon={
                    <svg
                      className="w-5 h-5"
                      viewBox="0 0 256 255"
                      xmlns="http://www.w3.org/2000/svg"
                      preserveAspectRatio="xMinYMin meet"
                    >
                      <defs>
                        <linearGradient
                          x1="12.959%"
                          y1="12.039%"
                          x2="79.639%"
                          y2="78.201%"
                          id="a"
                        >
                          <stop stopColor="#387EB8" offset="0%" />
                          <stop stopColor="#366994" offset="100%" />
                        </linearGradient>
                        <linearGradient
                          x1="19.128%"
                          y1="20.579%"
                          x2="90.742%"
                          y2="88.429%"
                          id="b"
                        >
                          <stop stopColor="#FFE052" offset="0%" />
                          <stop stopColor="#FFC331" offset="100%" />
                        </linearGradient>
                      </defs>
                      <path
                        d="M126.916.072c-64.832 0-60.784 28.115-60.784 28.115l.072 29.128h61.868v8.745H41.631S.145 61.355.145 126.77c0 65.417 36.21 63.097 36.21 63.097h21.61v-30.356s-1.165-36.21 35.632-36.21h61.362s34.475.557 34.475-33.319V33.97S194.67.072 126.916.072zM92.802 19.66a11.12 11.12 0 0 1 11.13 11.13 11.12 11.12 0 0 1-11.13 11.13 11.12 11.12 0 0 1-11.13-11.13 11.12 11.12 0 0 1 11.13-11.13z"
                        fill="url(#a)"
                      />
                      <path
                        d="M128.757 254.126c64.832 0 60.784-28.115 60.784-28.115l-.072-29.127H127.6v-8.745h86.441s41.486 4.705 41.486-60.712c0-65.416-36.21-63.096-36.21-63.096h-21.61v30.355s1.165 36.21-35.632 36.21h-61.362s-34.475-.557-34.475 33.32v56.013s-5.235 33.897 62.518 33.897zm34.114-19.586a11.12 11.12 0 0 1-11.13-11.13 11.12 11.12 0 0 1 11.13-11.131 11.12 11.12 0 0 1 11.13 11.13 11.12 11.12 0 0 1-11.13 11.13z"
                        fill="url(#b)"
                      />
                    </svg>
                  }
                  name="Python"
                  percentage={75}
                />

                <Skill
                  icon={
                    <svg
                      fill="none"
                      className="w-5 h-5"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 124 141.53199999999998"
                    >
                      <path
                        d="M10.383 126.894L0 0l124 .255-10.979 126.639-50.553 14.638z"
                        fill="#e34f26"
                      />
                      <path
                        d="M62.468 129.277V12.085l51.064.17-9.106 104.851z"
                        fill="#ef652a"
                      />
                      <path
                        d="M99.49 41.362l1.446-15.49H22.383l4.34 47.49h54.213L78.81 93.617l-17.362 4.68-17.617-5.106-.936-12.085H27.319l2.128 24.681 32 8.936 32.255-8.936 4.34-48.17H41.107L39.49 41.362z"
                        fill="#fff"
                      />
                    </svg>
                  }
                  name="HTML5 & CSS3"
                  percentage={85}
                />
              </div>
              <h3 className="pl-3 mt-12 font-semibold border-l-[0.24rem] border-l-fuchsia-400 text-lg">
                Frameworks
              </h3>
              <div className="flex flex-row flex-wrap items-center justify-between">
                <Skill
                  icon={
                    <svg viewBox="0 0 256 256" version="1.1" className="w-5">
                      <g>
                        <path
                          d="M119.616813,0.0688905149 C119.066276,0.118932037 117.314565,0.294077364 115.738025,0.419181169 C79.3775171,3.69690087 45.3192571,23.3131775 23.7481916,53.4631946 C11.7364614,70.2271045 4.05395894,89.2428829 1.15112414,109.384595 C0.12512219,116.415429 0,118.492153 0,128.025062 C0,137.557972 0.12512219,139.634696 1.15112414,146.665529 C8.10791789,194.730411 42.3163245,235.11392 88.7116325,250.076335 C97.0197458,252.753556 105.778299,254.580072 115.738025,255.680985 C119.616813,256.106338 136.383187,256.106338 140.261975,255.680985 C157.453763,253.779407 172.017986,249.525878 186.382014,242.194795 C188.584164,241.068861 189.00958,240.768612 188.709286,240.518404 C188.509091,240.36828 179.124927,227.782837 167.86393,212.570214 L147.393939,184.922273 L121.743891,146.965779 C107.630108,126.098464 96.0187683,109.034305 95.9186706,109.034305 C95.8185728,109.009284 95.7184751,125.873277 95.6684262,146.465363 C95.5933529,182.52028 95.5683284,183.971484 95.1178886,184.82219 C94.4672532,186.048207 93.9667644,186.548623 92.915738,187.099079 C92.114956,187.499411 91.4142717,187.574474 87.6355816,187.574474 L83.3063539,187.574474 L82.1552297,186.848872 C81.4044966,186.373477 80.8539589,185.747958 80.4785924,185.022356 L79.9530792,183.896422 L80.0031281,133.729796 L80.0782014,83.5381493 L80.8539589,82.5623397 C81.25435,82.0369037 82.1051808,81.3613431 82.7057674,81.0360732 C83.7317693,80.535658 84.1321603,80.4856165 88.4613881,80.4856165 C93.5663734,80.4856165 94.4172043,80.6857826 95.7434995,82.1369867 C96.1188661,82.5373189 110.007429,103.454675 126.623656,128.650581 C143.239883,153.846488 165.962072,188.250034 177.122972,205.139048 L197.392766,235.839522 L198.418768,235.163961 C207.502639,229.259062 217.112023,220.852086 224.719453,212.09482 C240.910264,193.504394 251.345455,170.835585 254.848876,146.665529 C255.874878,139.634696 256,137.557972 256,128.025062 C256,118.492153 255.874878,116.415429 254.848876,109.384595 C247.892082,61.3197135 213.683675,20.9362052 167.288368,5.97379012 C159.105376,3.32158945 150.396872,1.49507389 140.637341,0.394160408 C138.234995,0.143952798 121.693842,-0.131275573 119.616813,0.0688905149 L119.616813,0.0688905149 Z M172.017986,77.4831252 C173.219159,78.0836234 174.195112,79.2345784 174.545455,80.435575 C174.74565,81.0861148 174.795699,94.9976579 174.74565,126.348671 L174.670577,171.336 L166.73783,159.17591 L158.780059,147.01582 L158.780059,114.313685 C158.780059,93.1711423 158.880156,81.2862808 159.030303,80.7108033 C159.430694,79.3096407 160.306549,78.2087272 161.507722,77.5581875 C162.533724,77.0327515 162.909091,76.98271 166.837928,76.98271 C170.541544,76.98271 171.19218,77.0327515 172.017986,77.4831252 Z"
                          fill="#fff"
                        ></path>
                      </g>
                    </svg>
                  }
                  name="Next.js"
                  percentage={90}
                />
                <Skill
                  icon={
                    <svg
                      className="w-5"
                      viewBox="-13 0 282 282"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <g fill="#8CC84B">
                        <path d="M116.504 3.58c6.962-3.985 16.03-4.003 22.986 0 34.995 19.774 70.001 39.517 104.99 59.303 6.581 3.707 10.983 11.031 10.916 18.614v118.968c.049 7.897-4.788 15.396-11.731 19.019-34.88 19.665-69.742 39.354-104.616 59.019-7.106 4.063-16.356 3.75-23.24-.646-10.457-6.062-20.932-12.094-31.39-18.15-2.137-1.274-4.546-2.288-6.055-4.36 1.334-1.798 3.719-2.022 5.657-2.807 4.365-1.388 8.374-3.616 12.384-5.778 1.014-.694 2.252-.428 3.224.193 8.942 5.127 17.805 10.403 26.777 15.481 1.914 1.105 3.852-.362 5.488-1.274 34.228-19.345 68.498-38.617 102.72-57.968 1.268-.61 1.969-1.956 1.866-3.345.024-39.245.006-78.497.012-117.742.145-1.576-.767-3.025-2.192-3.67-34.759-19.575-69.5-39.18-104.253-58.76a3.621 3.621 0 0 0-4.094-.006C91.2 39.257 56.465 58.88 21.712 78.454c-1.42.646-2.373 2.071-2.204 3.653.006 39.245 0 78.497 0 117.748a3.329 3.329 0 0 0 1.89 3.303c9.274 5.259 18.56 10.481 27.84 15.722 5.228 2.814 11.647 4.486 17.407 2.33 5.083-1.823 8.646-7.01 8.549-12.407.048-39.016-.024-78.038.036-117.048-.127-1.732 1.516-3.163 3.2-3 4.456-.03 8.918-.06 13.374.012 1.86-.042 3.14 1.823 2.91 3.568-.018 39.263.048 78.527-.03 117.79.012 10.464-4.287 21.85-13.966 26.97-11.924 6.177-26.662 4.867-38.442-1.056-10.198-5.09-19.93-11.097-29.947-16.55C5.368 215.886.555 208.357.604 200.466V81.497c-.073-7.74 4.504-15.197 11.29-18.85C46.768 42.966 81.636 23.27 116.504 3.58z" />
                        <path d="M146.928 85.99c15.21-.979 31.493-.58 45.18 6.913 10.597 5.742 16.472 17.793 16.659 29.566-.296 1.588-1.956 2.464-3.472 2.355-4.413-.006-8.827.06-13.24-.03-1.872.072-2.96-1.654-3.195-3.309-1.268-5.633-4.34-11.212-9.642-13.929-8.139-4.075-17.576-3.87-26.451-3.785-6.479.344-13.446.905-18.935 4.715-4.214 2.886-5.494 8.712-3.99 13.404 1.418 3.369 5.307 4.456 8.489 5.458 18.33 4.794 37.754 4.317 55.734 10.626 7.444 2.572 14.726 7.572 17.274 15.366 3.333 10.446 1.872 22.932-5.56 31.318-6.027 6.901-14.805 10.657-23.56 12.697-11.647 2.597-23.734 2.663-35.562 1.51-11.122-1.268-22.696-4.19-31.282-11.768-7.342-6.375-10.928-16.308-10.572-25.895.085-1.619 1.697-2.748 3.248-2.615 4.444-.036 8.888-.048 13.332.006 1.775-.127 3.091 1.407 3.182 3.08.82 5.367 2.837 11 7.517 14.182 9.032 5.827 20.365 5.428 30.707 5.591 8.568-.38 18.186-.495 25.178-6.158 3.689-3.23 4.782-8.634 3.785-13.283-1.08-3.925-5.186-5.754-8.712-6.95-18.095-5.724-37.736-3.647-55.656-10.12-7.275-2.571-14.31-7.432-17.105-14.906-3.9-10.578-2.113-23.662 6.098-31.765 8.006-8.06 19.563-11.164 30.551-12.275z" />
                      </g>
                    </svg>
                  }
                  name="Node.js"
                  percentage={90}
                />
              </div>
              <div className="flex flex-row flex-wrap items-center justify-between">
                <Skill
                  icon={
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="-11.5 -10.23174 23 20.46348"
                      className="w-5 h-5"
                    >
                      <circle cx="0" cy="0" r="2.05" fill="#61dafb" />
                      <g stroke="#61dafb" strokeWidth="1" fill="none">
                        <ellipse rx="11" ry="4.2" />
                        <ellipse rx="11" ry="4.2" transform="rotate(60)" />
                        <ellipse rx="11" ry="4.2" transform="rotate(120)" />
                      </g>
                    </svg>
                  }
                  name="React Native"
                  percentage={80}
                />
                <Skill
                  icon={
                    <svg
                      viewBox="0 0 1999 2474.2"
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-5 h-5"
                    >
                      <linearGradient
                        id="a"
                        gradientTransform="matrix(380.4042 -380.4175 -53.104 -53.1021 908228.3125 -700059.5)"
                        gradientUnits="userSpaceOnUse"
                        x1="-2115.0029"
                        x2="-2115.0029"
                        y1="1930.7407"
                        y2="1929.7407"
                      >
                        <stop offset=".2" stopOpacity=".15" />
                        <stop
                          offset=".85"
                          stopColor="#616161"
                          stopOpacity=".01"
                        />
                      </linearGradient>
                      <linearGradient
                        id="b"
                        gradientTransform="matrix(565.291 0 0 -380.9571 1196694.25 743476.5625)"
                        gradientUnits="userSpaceOnUse"
                        x1="-2115.2688"
                        x2="-2114.2688"
                        y1="1946.3563"
                        y2="1946.3563"
                      >
                        <stop offset=".2" stopOpacity=".55" />
                        <stop
                          offset=".85"
                          stopColor="#616161"
                          stopOpacity=".01"
                        />
                      </linearGradient>
                      <path
                        d="m381 1618-381-381 1237.1-1237h761.9m0 1141.5h-761.9l-285.4 285.4 381 381"
                        fill="#42a5f5"
                        fillOpacity=".8"
                      />
                      <path
                        d="m951.7 2188.8 285.4 285.4h761.9l-666.3-666.3"
                        fill="#0d47a1"
                      />
                      <path
                        d="m571.6 1808.1 380.4-380.5 380.4 380.4-380.4 380.5z"
                        fill="#42a5f5"
                      />
                      <path
                        d="m952 2188.5 380.4-380.4 53.1 53.1-380.4 380.4z"
                        fill="url(#a)"
                      />
                      <path
                        d="m951.7 2188.8 565.3-195.3-184.3-185.7"
                        fill="url(#b)"
                      />
                    </svg>
                  }
                  name="Flutter"
                  percentage={80}
                />
              </div>
            </div>
          </div>
          <div className="w-full bg-background2">
            <div className="container flex flex-row items-center justify-between px-4 pt-10 pb-16 mx-auto lg:px-40 ">
              <div className="flex flex-col">
                <Headline2 text="Experience" />
                <ol className="mx-3 mt-12 sm:flex">
                  <li className="relative flex-1 mb-6 sm:mb-0">
                    <div className="flex items-center">
                      <div className="z-10 flex items-center justify-center w-6 h-6 rounded-full ring-0 bg-fuchsia-400 sm:ring-8 ring-gray-800 shrink-0">
                        <HiCode className="fill-fuchsia-900" />
                      </div>
                      <div className="hidden sm:flex w-full bg-gray-200 h-0.5 dark:bg-gray-700"></div>
                    </div>
                    <motion.div
                      className="mt-3 sm:pr-8"
                      whileInView={{ opacity: 1, translateY: 0 }}
                      viewport={{ once: true }}
                      initial={{ opacity: 0, translateY: 30 }}
                      transition={{ duration: 0.2, delay: 0.2 }}
                    >
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                        TripleIn Software Solutions GmbH
                      </h3>
                      <time className="block mb-2 text-sm font-normal leading-none text-gray-400 dark:text-gray-500">
                        September 2018 - Now
                      </time>
                      <p className="text-base font-normal text-gray-500 dark:text-gray-400">
                        I&apos;ve been working as a oracle database developer at
                        TripleIn Software Solutions GmbH.{" "}
                        <CustomLink href="https://dev.triplein.at">
                          View more
                        </CustomLink>
                      </p>
                    </motion.div>
                  </li>
                  <li className="relative flex-1 mb-6 sm:mb-0">
                    <div className="flex items-center">
                      <div className="z-10 flex items-center justify-center w-6 h-6 rounded-full ring-0 bg-fuchsia-400 sm:ring-8 ring-gray-800 shrink-0">
                        <HiCode className="fill-fuchsia-900" />
                      </div>
                      <div className="hidden sm:flex w-full bg-gray-200 h-0.5 dark:bg-gray-700"></div>
                    </div>
                    <motion.div
                      className="mt-3 sm:pr-8"
                      whileInView={{ opacity: 1, translateY: 0 }}
                      viewport={{ once: true }}
                      initial={{ opacity: 0, translateY: 30 }}
                      transition={{
                        duration: 0.2,
                        delay: isMobile ? 0.2 : 0.4,
                      }}
                    >
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                        Austrian Informatic Olympiads
                      </h3>
                      <time className="block mb-2 text-sm font-normal leading-none text-gray-400 dark:text-gray-500">
                        February 2018 - September 2018
                      </time>
                      <p className="text-base font-normal text-gray-500 dark:text-gray-400">
                        The International Olympiad in Informatics (IOI) is the
                        largest international programming competition for school
                        students.{" "}
                        <CustomLink href="https://www.ocg.at/de/ioi">
                          View More
                        </CustomLink>
                      </p>
                    </motion.div>
                  </li>
                  <li className="relative flex-1 mb-6 sm:mb-0">
                    <div className="flex items-center">
                      <div className="z-10 flex items-center justify-center w-6 h-6 rounded-full ring-0 bg-fuchsia-400 sm:ring-8 ring-gray-800 shrink-0">
                        <HiCode className="fill-fuchsia-900" />
                      </div>
                      <div className="hidden sm:flex w-full bg-gray-200 h-0.5 dark:bg-gray-700"></div>
                    </div>
                    <motion.div
                      className="mt-3 sm:pr-8"
                      whileInView={{ opacity: 1, translateY: 0 }}
                      viewport={{ once: true }}
                      initial={{ opacity: 0, translateY: 30 }}
                      transition={{
                        duration: 0.2,
                        delay: isMobile ? 0.2 : 0.6,
                      }}
                    >
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                        CodeBase
                      </h3>
                      <time className="block mb-2 text-sm font-normal leading-none text-gray-400 dark:text-gray-500">
                        August 2017 - March 2018
                      </time>
                      <p className="text-base font-normal text-gray-500 dark:text-gray-400">
                        Basically the start of my journey as a web developer.{" "}
                        <CustomLink href="https://www.code-base.at/">
                          View more
                        </CustomLink>
                      </p>
                    </motion.div>
                  </li>
                </ol>
              </div>
            </div>
          </div>
        </div>
      </HomeLayout>
    </>
  );
};

interface Headline2Props {
  text: string;
}

function Headline2({ text }: Headline2Props) {
  return (
    <motion.h2
      className="text-3xl"
      whileInView={{ translateX: 0, opacity: 1 }}
      viewport={{ once: true }}
      initial={{ translateX: -30, opacity: 0 }}
      transition={{
        duration: 0.2,
        delay: 0.03,
      }}
    >
      <span className="text-lg text-gray-400 select-none opacity-40">
        &lt;li&gt;
      </span>
      <span className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-fuchsia-500 to-fuchsia-400">
        {text}
      </span>
      <span className="text-lg text-gray-400 select-none opacity-40">
        &lt;/li&gt;
      </span>
    </motion.h2>
  );
}

interface AboutMeItemProps {
  title: string;
  text: any;
  icon: any;
}

const AboutMeItem: React.FC<AboutMeItemProps> = (props: AboutMeItemProps) => {
  return (
    <div className="flex flex-row items-center w-full my-5 space-x-7 md:w-1/2 lg:px-5">
      <div className="flex flex-col items-center justify-center w-8 h-8 rounded-lg ">
        <props.icon className="w-8 h-8 fill-gray-400" />
      </div>
      <div className="flex flex-col items-start justify-start pr-0 ">
        <div className="relative">
          <h3 className="mb-3 text-xl font-semibold text-white after:w-full">
            {props.title}
          </h3>
          <div className="absolute w-[calc(100%+0.6rem)] h-[2px] bg-gray-400 rounded-md bottom-[0.6rem] left-[-0.3rem] opacity-30"></div>
        </div>

        <p className="text-gray-400 text-md">{props.text}</p>
      </div>
    </div>
  );
};

interface ISkillProps {
  name: string;
  icon: any;
  percentage: number;
}

function Skill({ name, icon, percentage }: ISkillProps) {
  const spanref = useRef<HTMLSpanElement>(null);
  const ref = useRef(null);
  const isInView = useInView(ref);
  const [hasRendered, setHasRendered] = useState(false);

  useEffect(() => {
    if (!isInView || hasRendered == true) return;
    const controls = animate(0, percentage, {
      duration: 0.5,

      onUpdate(value) {
        if (!spanref.current) return;
        spanref.current.textContent = value.toFixed(0) + "%";
      },
      onComplete() {
        setHasRendered(true);
      },
    });
    return () => controls.stop();
  }, [isInView, hasRendered, percentage]);

  return (
    <div className="w-full sm:w-[43%] mt-6 ml-6 mr-8 sm:mx-0" ref={ref}>
      <div className="flex flex-col space-y-2">
        <motion.div
          className="flex flex-row items-center space-x-3"
          whileInView={{ translateY: 0, opacity: 1 }}
          viewport={{ once: true }}
          initial={{ translateY: -30, opacity: 0 }}
          transition={{
            duration: 0.2,
            delay: 0.2,
          }}
        >
          {icon}
          <h4 className="font-semibold text-gray-400">{name}</h4>
        </motion.div>

        <div className="relative w-full h-4 rounded-md bg-background2">
          <span className="absolute left-[-1.4rem] text-[0.8rem] top-[-0.13rem] text-gray-500">
            0%
          </span>
          <span className="absolute right-[-2.3rem] text-[0.8rem] top-[-0.13rem] text-gray-500">
            100%
          </span>
          <div className="relative mx-1 mt-1">
            <motion.div
              style={{ width: percentage + "%" }}
              className="relative h-2 rounded-md bg-fuchsia-500"
              whileInView={{ width: percentage + "%" }}
              viewport={{ once: true }}
              initial={{ width: 0 }}
              transition={{
                duration: 0.5,
              }}
            >
              <span
                ref={spanref}
                className="absolute top-[-1.6rem] text-[0.8rem] text-fuchsia-500 font-semibold right-[-0.8rem]"
              >
                {percentage.toString() + "%"}
              </span>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
