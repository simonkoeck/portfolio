import React from "react";
import * as fs from "fs";
// @ts-ignore
import dateformat from "dateformat";

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
        "robots.txt.tsx",
        "api",
      ].includes(staticPage);
    })
    .map((staticPagePath) => {
      return `${BASE_URL}/${staticPagePath
        .replace(".tsx", "")
        .replace("index", "")}`;
    });
  const lastModified = fs
    .readdirSync("pages")
    .filter((staticPage) => {
      return ![
        "sitemap.xml.tsx",
        "404.tsx",
        "_app.tsx",
        "_document.tsx",
        "robots.txt.tsx",
        "api",
      ].includes(staticPage);
    })
    .map((staticPagePath) => {
      const stats = fs.statSync("pages/" + staticPagePath);
      return dateformat(stats.mtime, "yyyy-mm-dd");
    });

  function getPriority(url: string): number {
    if (url == `${BASE_URL}/`) {
      return 1.0;
    } else if (url == `${BASE_URL}/contact`) {
      return 0.8;
    } else if (url == `${BASE_URL}/projects`) {
      return 0.9;
    }
    return 0.5;
  }

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
      ${staticPaths
        .map((url, i) => {
          return `
            <url>
              <loc>${url}</loc>
              <lastmod>${lastModified[i]}</lastmod>
              <priority>${getPriority(url)}</priority>
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
