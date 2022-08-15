import React from "react";
import Head from "next/head";

type Props = {
  title: string;
  description: string;
};

export default function CustomHead({ title, description }: Props) {
  return (
    <Head>
      <title>{title}</title>
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta name="description" content={description} />
      <meta property="og:locale" content="en" />
      <meta property="og:type" content="website" />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content="https://simon.koeck.dev" />
      <meta property="og:site_name" content={title} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="theme-color" content="#E879F9" />
    </Head>
  );
}
