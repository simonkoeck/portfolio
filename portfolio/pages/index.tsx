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
import { motion } from "framer-motion";
import { getMany } from "../services/strapi";
import CustomHead from "../components/Head";
import CustomLink from "../components/Link";
import { useRef } from "react";

const Home: NextPage = () => {
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
                  transition={{ duration: 0.3 }}
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
            <div className="container px-4 pt-10 mx-auto lg:px-40">
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
            </div>
          </div>
          <div
            className="w-full"
            style={{
              background:
                "linear-gradient(90deg, rgba(146,48,161,0.22591043253238796) 0%, rgba(146,48,161,0.1474790599833683) 100%)",
            }}
          >
            <div className="container px-10 py-10 mx-auto sm:flex sm:flex-row sm:items-center sm:justify-between lg:px-40">
              <div className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl sm:tracking-tight">
                <span className="block">Interest aroused?</span>
                <span className="block font-bold text-fuchsia-500">
                  See all of my projects
                </span>
              </div>
              <Link href={"/projects"} passHref>
                <a
                  href="#"
                  className="inline-flex flex-row items-center justify-center px-3 py-2 mt-6 space-x-2 text-base font-bold text-white border border-transparent rounded-md sm:px-5 sm:py-3 sm:mt-0 bg-fuchsia-500 hover:bg-fuchsia-600"
                >
                  <HiArrowRight className="text-xl" />
                  <span>Get inspired</span>
                </a>
              </Link>
            </div>
          </div>
          <div className="w-full bg-background2" ref={educationRef}>
            <div className="container flex flex-row items-center justify-between px-4 py-16 mx-auto lg:px-40 ">
              <div className="flex flex-col">
                <Headline2 text="Education" />
                <ol className="mx-3 mt-20 sm:flex">
                  <li className="relative flex-1 mb-6 sm:mb-0">
                    <div className="flex items-center">
                      <div className="z-10 flex items-center justify-center w-6 h-6 rounded-full ring-0 bg-fuchsia-400 sm:ring-8 ring-gray-800 shrink-0">
                        <HiAcademicCap className="fill-fuchsia-900" />
                      </div>
                      <div className="hidden sm:flex w-full bg-gray-200 h-0.5 dark:bg-gray-700"></div>
                    </div>
                    <div className="mt-3 sm:pr-8">
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
                    </div>
                  </li>
                  <li className="relative flex-1 mb-6 sm:mb-0">
                    <div className="flex items-center">
                      <div className="z-10 flex items-center justify-center w-6 h-6 rounded-full ring-0 bg-fuchsia-400 sm:ring-8 ring-gray-800 shrink-0">
                        <HiAcademicCap className="fill-fuchsia-900" />
                      </div>
                      <div className="hidden sm:flex w-full bg-gray-200 h-0.5 dark:bg-gray-700"></div>
                    </div>
                    <div className="mt-3 sm:pr-8">
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
                    </div>
                  </li>
                  <li className="relative flex-1 mb-6 sm:mb-0">
                    <div className="flex items-center">
                      <div className="z-10 flex items-center justify-center w-6 h-6 rounded-full ring-0 bg-fuchsia-400 sm:ring-8 ring-gray-800 shrink-0">
                        <HiAcademicCap className="fill-fuchsia-900" />
                      </div>
                      <div className="hidden sm:flex w-full bg-gray-200 h-0.5 dark:bg-gray-700"></div>
                    </div>
                    <div className="mt-3 sm:pr-8">
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
                    </div>
                  </li>
                </ol>
              </div>
            </div>
          </div>
          <div className="w-full bg-background2">
            <div className="container flex flex-row items-center justify-between px-4 pt-3 pb-16 mx-auto lg:px-40 ">
              <div className="flex flex-col">
                <Headline2 text="Experience" />
                <ol className="mx-3 mt-20 sm:flex">
                  <li className="relative flex-1 mb-6 sm:mb-0">
                    <div className="flex items-center">
                      <div className="z-10 flex items-center justify-center w-6 h-6 rounded-full ring-0 bg-fuchsia-400 sm:ring-8 ring-gray-800 shrink-0">
                        <HiCode className="fill-fuchsia-900" />
                      </div>
                      <div className="hidden sm:flex w-full bg-gray-200 h-0.5 dark:bg-gray-700"></div>
                    </div>
                    <div className="mt-3 sm:pr-8">
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
                    </div>
                  </li>
                  <li className="relative flex-1 mb-6 sm:mb-0">
                    <div className="flex items-center">
                      <div className="z-10 flex items-center justify-center w-6 h-6 rounded-full ring-0 bg-fuchsia-400 sm:ring-8 ring-gray-800 shrink-0">
                        <HiCode className="fill-fuchsia-900" />
                      </div>
                      <div className="hidden sm:flex w-full bg-gray-200 h-0.5 dark:bg-gray-700"></div>
                    </div>
                    <div className="mt-3 sm:pr-8">
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
                    </div>
                  </li>
                  <li className="relative flex-1 mb-6 sm:mb-0">
                    <div className="flex items-center">
                      <div className="z-10 flex items-center justify-center w-6 h-6 rounded-full ring-0 bg-fuchsia-400 sm:ring-8 ring-gray-800 shrink-0">
                        <HiCode className="fill-fuchsia-900" />
                      </div>
                      <div className="hidden sm:flex w-full bg-gray-200 h-0.5 dark:bg-gray-700"></div>
                    </div>
                    <div className="mt-3 sm:pr-8">
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                        CodeBase
                      </h3>
                      <time className="block mb-2 text-sm font-normal leading-none text-gray-400 dark:text-gray-500">
                        August 2017 - March 2018
                      </time>
                      <p className="text-base font-normal text-gray-500 dark:text-gray-400">
                        Basically the start of my journey as a web developer.
                        <CustomLink href="https://www.code-base.at/">
                          View more
                        </CustomLink>
                      </p>
                    </div>
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
    <h2 className="text-3xl">
      <span className="text-lg text-gray-400 select-none opacity-40">
        &lt;li&gt;
      </span>
      <span className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-fuchsia-500 to-fuchsia-400">
        {text}
      </span>
      <span className="text-lg text-gray-400 select-none opacity-40">
        &lt;/li&gt;
      </span>
    </h2>
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

export default Home;
