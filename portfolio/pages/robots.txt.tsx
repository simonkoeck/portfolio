import React from "react";
import * as fs from "fs";

const Robots = () => {
  return null;
};

interface IProps {
  res: any;
}

export const getServerSideProps = async ({ res }: IProps) => {
  const BASE_URL =
    process.env.NODE_ENV == "production"
      ? "https://simon.koeck.dev"
      : "http://localhost:3000";

  res.setHeader("Content-Type", "text/plain");
  res.write(`Sitemap: ${BASE_URL}/sitemap.xml
User-agent: *
Disallow:`);
  res.end();

  return {
    props: {},
  };
};

export default Robots;
