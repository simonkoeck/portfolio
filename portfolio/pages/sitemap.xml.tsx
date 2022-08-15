import React from "react";
import * as fs from "fs";

const Sitemap = () => {
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

  const staticPaths = fs
    .readdirSync("pages")
    .filter((staticPage) => {
      return ![
        "sitemap.xml.tsx",
        "404.tsx",
        "_app.tsx",
        "_document.tsx",
        "api",
      ].includes(staticPage);
    })
    .map((staticPagePath) => {
      return `${BASE_URL}/${staticPagePath
        .replace(".tsx", "")
        .replace("index", "")}`;
    });

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
      ${staticPaths
        .map((url) => {
          return `
            <url>
              <loc>${url}</loc>
            </url>
          `;
        })
        .join("")}
    </urlset>
  `;

  res.setHeader("Content-Type", "text/xml");
  res.write(sitemap);
  res.end();

  return {
    props: {},
  };
};

export default Sitemap;
