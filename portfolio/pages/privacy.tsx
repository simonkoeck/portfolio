import React from "react";
import HomeLayout from "../components/layouts/HomeLayout";
import { serialize } from "next-mdx-remote/serialize";
import { MDXRemote, MDXRemoteSerializeResult } from "next-mdx-remote";
import { GetStaticProps } from "next";
import { getSingleType } from "../services/strapi";
import CustomHead from "../components/Head";

type Props = {
  source: MDXRemoteSerializeResult;
  title: string;
  updatedAt: string;
};

export default function Imprint({ source, title, updatedAt }: Props) {
  return (
    <HomeLayout>
      <CustomHead
        title="Simon Köck | Privacy Policy"
        description=""
      ></CustomHead>
      <div className="w-full py-20">
        <div className="container px-4 mx-auto">
          <h1 className="text-4xl font-black">{title}</h1>
          <p className="mt-2 text-sm text-gray-400">
            Last updated at: {updatedAt}
          </p>
          <div className="w-full h-[1px] bg-gray-700 my-16"></div>
          <div className="max-w-full prose lg:prose-lg prose-p:text-gray-300 prose-strong:text-gray-200 prose-strong:font-bold prose-a:text-fuchsia-400">
            <MDXRemote {...source}></MDXRemote>
          </div>
        </div>
      </div>
    </HomeLayout>
  );
}

export const getStaticProps: GetStaticProps = async (context) => {
  const data = await getSingleType("privacy-policy", context.locale!);

  const mdxSource = await serialize(data.content);
  return {
    props: {
      source: mdxSource,
      title: data.title,
      updatedAt: new Date(data.updatedAt).toLocaleDateString("en-US"),
    },
  };
};
