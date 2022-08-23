import React from "react";
import HomeLayout from "../components/layouts/HomeLayout";
import { serialize } from "next-mdx-remote/serialize";
import { MDXRemote, MDXRemoteSerializeResult } from "next-mdx-remote";
import { GetStaticProps } from "next";
import { getSingleType } from "../services/strapi";
import CustomHead from "../components/Head";
import MarkdownWrapper from "../components/MarkdownWrapper";

type Props = {
  content: string;
  title: string;
};

export default function Imprint({ content, title }: Props) {
  return (
    <HomeLayout>
      <CustomHead title="Simon Köck | Imprint" description=""></CustomHead>
      <div className="w-full py-20">
        <div className="container px-4 mx-auto">
          <h1 className="text-4xl font-black">{title}</h1>
          <div className="w-full h-[1px] bg-gray-700 my-16"></div>
          <MarkdownWrapper>{content}</MarkdownWrapper>
        </div>
      </div>
    </HomeLayout>
  );
}

export const getStaticProps: GetStaticProps = async (context) => {
  const data = await getSingleType("imprint", context.locale!);
  return { props: { content: data.content, title: data.title } };
};
