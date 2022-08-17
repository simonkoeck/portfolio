import type { GetStaticProps, NextPage } from "next";
import Header from "../components/Header";
import {
  HiAcademicCap,
  HiBriefcase,
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

const Home: NextPage = () => {
  return (
    <>
      <CustomHead
        description="My Name is Simon Köck and I live in Austria. I'm 18 years old and I've been specialicing on Full-Stack-Development for about 5 years."
        title="Simon Köck | Full Stack Developer"
      />
      <HomeLayout>
        <div className="w-full">
          <div className="container relative px-4 pt-12 pb-24 mx-auto sm:pb-32 sm:pt-20">
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
                  <img src="/images/mobile-me.png" />
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
                  alt="Simon Köck posing in the dark <3"
                  className="absolute bottom-0 right-[-7rem] lg:right-[6rem] z-10 lg:z-30 h-[100%] lg:h-[calc(100%_+_5rem)] pointer-events-none select-none"
                />
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
            <div className="container px-4 pt-10 mx-auto">
              <Headline2 text="Who am I?" />
              <div className="relative flex flex-row flex-wrap justify-between py-10 sm:py-16">
                <AboutMeItem
                  text="My Name is Simon Köck and I live in Austria. I'm 18 years
                old and I've been specialicing on Full-Stack-Development
                for about 5 years."
                  title="About Me"
                  icon={HiUser}
                />

                <AboutMeItem
                  text="I'm currently studying at the HAK Feldkirch in Vorarlberg, Austria. This is my last year."
                  title="School"
                  icon={HiAcademicCap}
                />
                <AboutMeItem
                  text="My Name is Simon Köck and I live in Austria. I'm 18 years
                old and I've been specialicing on Full-Stack-Development
                for about 5 years."
                  title="Hobbies"
                  icon={HiStar}
                />
                <AboutMeItem
                  text="My Name is Simon Köck and I live in Austria. I'm 18 years
                old and I've been specialicing on Full-Stack-Development
                for about 5 years."
                  title="Business"
                  icon={HiBriefcase}
                />
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
      <span className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-fuchsia-500 to-fuchsia-400">
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
  text: string;
  icon: any;
}

const AboutMeItem: React.FC<AboutMeItemProps> = (props: AboutMeItemProps) => {
  return (
    <div className="flex flex-row items-center w-full my-5 space-x-7 md:w-1/2">
      <div className="flex flex-col items-center justify-center w-8 h-8 rounded-lg ">
        <props.icon className="w-8 h-8 fill-gray-400" />
      </div>
      <div className="flex flex-col items-start justify-start pr-0 lg:pr-32">
        <div className="relative">
          <h3 className="mb-3 text-xl font-bold text-gray-400 after:w-full">
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
