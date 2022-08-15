import "../styles/globals.css";
import type { AppProps } from "next/app";
import NextNProgress from "nextjs-progressbar";
import Head from "next/head";
import ReactTooltip from "react-tooltip";

import "../styles/quill.css";

function App({ Component, pageProps }: AppProps) {
  return (
    <div className="w-full min-h-screen font-inter bg-background">
      <NextNProgress
        color="rgb(217,70,239)"
        startPosition={0.3}
        stopDelayMs={200}
        height={3}
        showOnShallow={true}
      />
      <Head>
        <title>Simon Köck | Full Stack Developer</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta
          name="description"
          content="My Name is Simon Köck and I live in Austria. I'm 18 years old and I've been specialicing on Full-Stack-Development for about 5 years."
        />
        <meta property="og:locale" content="en_US" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Simon Köck | Full Stack Developer" />
        <meta
          property="og:description"
          content="My Name is Simon Köck and I live in Austria. I'm 18 years old and I've been specialicing on Full-Stack-Development for about 5 years."
        />
        <meta property="og:url" content="https://simon.koeck.dev" />
        <meta
          property="og:site_name"
          content="Simon Köck | Full Stack Developer"
        />
        <meta
          name="twitter:title"
          content="Simon Köck | Full Stack Developer"
        />
        <meta
          name="twitter:description"
          content="My Name is Simon Köck and I live in Austria. I'm 18 years old and I've been specialicing on Full-Stack-Development for about 5 years."
        />
        <meta name="theme-color" content="#E879F9" />
      </Head>
      <Component {...pageProps} />
    </div>
  );
}

export default App;
