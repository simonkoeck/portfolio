import { MDXRemote } from "next-mdx-remote";
import React from "react";
import ReactMarkdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/cjs/styles/prism";
import rehypeRaw from "rehype-raw";
import remarkGfm from "remark-gfm";
import CustomLink from "./Link";
import { useWindowSize } from "react-use";

type Props = {
  children: string;
};

export default function MarkdownWrapper({ children }: Props) {
  return (
    <div className="max-w-full prose-sm lg:prose-base mt-10 prose prose-td:text-white prose-pre:bg-transparent prose-pre:!p-0 prose-th:text-white prose-p:text-gray-300 prose-strong:text-gray-200 prose-strong:font-bold prose-a:text-fuchsia-400 prose-h3:text-white prose-h1:text-white prose-h2:text-white prose-h4:text-white ">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeRaw]}
        components={{
          ...CodeBlock,
          a: CustomMDLink,
          video: CustomVideo,
        }}
      >
        {children}
      </ReactMarkdown>
    </div>
  );
}

interface CustomMDLinkProps {
  node: any;
  inline?: any;
  className?: any;
  children: any;
  href?: string;
}

function CustomMDLink({
  node,
  inline,
  className,
  children,
  ...props
}: CustomMDLinkProps) {
  return <CustomLink href={props.href || "#"}>{children}</CustomLink>;
}

interface CustomVideoProps {
  node: any;
  inline?: any;
  className?: any;
  children: any;
  url?: string;
}

function CustomVideo({
  node,
  inline,
  className,
  children,
  ...props
}: CustomVideoProps) {
  const { width } = useWindowSize();

  return (
    <video src={props.url} controls width={width < 1024 ? "100%" : "80%"} />
  );
}

const CodeBlock = {
  code({ node, inline, className, children, ...props }: CustomMDLinkProps) {
    const match = /language-(\w+)/.exec(className || "");
    return !inline && match ? (
      <SyntaxHighlighter
        style={vscDarkPlus}
        language={match[1]}
        customStyle={{
          margin: "0 !important",
          borderRadius: "0.375rem !important",
        }}
        PreTag="div"
        {...props}
      >
        {String(children).replace(/\n$/, "")}
      </SyntaxHighlighter>
    ) : (
      <code className={className} {...props} style={{ color: "#fff" }}>
        {children}
      </code>
    );
  },
};
