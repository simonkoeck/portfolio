import Link from "next/link";
import React from "react";
import CustomHead from "../components/Head";
import HomeLayout from "../components/layouts/HomeLayout";

type Props = {};

export default function NotFound({}: Props) {
  return (
    <>
      <CustomHead title="Simon Köck | Not Found" description="Page not found" />

      <HomeLayout>
        <div className="flex flex-col items-center justify-center w-full h-full mt-32">
          <div className="text-[4rem] font-black tracking-tight">
            Not Found :(
          </div>
          <p className="text-gray-400">
            Unfortunately, your requested site could not be found!
          </p>
          <Link href="/" passHref>
            <a className="px-5 py-2 mt-8 font-bold border-2 rounded-md text-fuchsia-500 border-fuchsia-500">
              Back to Home
            </a>
          </Link>
        </div>
      </HomeLayout>
    </>
  );
}
