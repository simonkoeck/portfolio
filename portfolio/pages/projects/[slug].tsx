import { GetStaticPaths } from "next";
import Image from "next/image";
import Link from "next/link";
import React, { useCallback, useEffect, useState } from "react";
import {
  HiArrowLeft,
  HiClock,
  HiFire,
  HiGlobe,
  HiGlobeAlt,
  HiHeart,
  HiLink,
  HiShare,
  HiUser,
} from "react-icons/hi";
import CustomHead from "../../components/Head";
import HomeLayout from "../../components/layouts/HomeLayout";
import CustomLink from "../../components/Link";
import MarkdownWrapper from "../../components/MarkdownWrapper";
import { Project } from "../../interfaces/project";
import { useVisitorData } from "@fingerprintjs/fingerprintjs-pro-react";
import { useRouter } from "next/router";

type Props = {
  slug: any;
  project?: Project;
};

export default function ProjectInfo({ slug, project }: Props) {
  const { isLoading, error, data } = useVisitorData({}, { immediate: true });
  const [liked, setLiked] = useState<boolean | null>(null);

  const [likedCount, setLikedCount] = useState(project?.likes);

  const router = useRouter();

  const toggleLike = () => {
    if (liked == null) return;
    if (liked == true) {
      (async () => {
        await fetch("/api/unlike-project", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ project_id: project?.id }),
        });
      })();
      setLiked(false);
      setLikedCount((likedCount || 0) - 1);
      return;
    } else {
      (async () => {
        await fetch("/api/like-project", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            project_id: project?.id,
            visitor_id: data?.visitorId,
          }),
        });
      })();
      setLiked(true);
      setLikedCount((likedCount || 0) + 1);
    }
  };

  const [isFetching, setIsFetching] = useState<boolean>(false);

  useEffect(() => {
    if (error) {
      alert(error.message);
      alert(error.name);
    }
  }, [error]);

  useEffect(() => {
    if (isLoading == true || liked != null) return;

    if (
      data?.visitorFound == true &&
      data.visitorId != null &&
      liked == null &&
      !isFetching
    ) {
      // Check if visitor liked post
      setIsFetching(true);
      (async () => {
        const r = await fetch(
          `/api/check-project-like?visitor_id=${data.visitorId}&project_id=${project?.id}`
        );
        const j = await r.json();
        if (j.liked == true) {
          setLiked(true);
        } else {
          setLiked(false);
        }
      })();
    }
  }, [data, isLoading]);

  if (router.isFallback || !project) return null;

  return (
    <HomeLayout>
      <CustomHead description={project.description} title={project.title} />
      <div className="w-full">
        <div className="container px-4 mx-auto my-7 lg:px-40">
          <div className="flex flex-col md:flex-row md:space-x-10">
            <div className="relative block md:w-20">
              <div className="relative md:fixed">
                <div className="flex flex-row items-center justify-end my-3 space-x-3 md:space-x-0 md:space-y-5 md:justify-center md:flex-col md:my-32">
                  <div
                    className="flex flex-col items-center cursor-pointer"
                    onClick={() => {
                      toggleLike();
                    }}
                  >
                    <HiHeart
                      className={
                        "text-3xl " +
                        (liked == null
                          ? "fill-gray-700"
                          : liked == true
                          ? "fill-fuchsia-500"
                          : "fill-gray-500")
                      }
                    />
                    <span
                      className={
                        "text-sm font-medium " +
                        (liked == null
                          ? "text-gray-700"
                          : liked == true
                          ? "text-fuchsia-500"
                          : "text-gray-500")
                      }
                    >
                      {likedCount}
                    </span>
                  </div>
                  <div className="flex flex-col items-center cursor-pointer">
                    <HiShare className="text-3xl fill-gray-500" />
                    <span className="text-sm font-medium text-gray-500">
                      Share
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <div>
              <Link href={"/projects"} passHref>
                <a className="flex flex-row items-center mb-10 space-x-2 cursor-pointer">
                  <HiArrowLeft className="fill-gray-500" />
                  <span className="font-semibold text-gray-500">
                    Back to projects
                  </span>
                </a>
              </Link>

              <div className="px-5 py-10 md:px-20 bg-background2 rounded-xl">
                <div className="flex flex-row items-center space-x-4">
                  <h1 className="text-4xl font-black tracking-tight">
                    {project.title}
                  </h1>
                  {project.featured == true && (
                    <HiFire className="text-3xl fill-orange-400" />
                  )}
                </div>

                <p className="mt-3 text-gray-400">{project.description}</p>
                {project.preview_image.formats != null && (
                  <div className="my-10 max-h-96">
                    <img
                      src={
                        process.env.NEXT_PUBLIC_STRAPI_URL +
                        (project.preview_image.formats?.large != null
                          ? project.preview_image.formats?.large!.url
                          : project.preview_image.url)
                      }
                      alt="Preview Image"
                      className="object-contain object-left w-full max-h-96"
                    />
                  </div>
                )}

                <div className="flex flex-row flex-wrap mb-10 space-x-2 md:space-x-4">
                  <div className="inline-flex flex-row items-center px-3 py-1 mt-3 space-x-2 bg-gray-800 rounded-md">
                    <HiUser className="text-sm fill-gray-400 md:text-base" />{" "}
                    <span className="text-sm text-gray-400 md:text-base">
                      {project.author.firstname} {project.author.lastname}
                    </span>
                  </div>
                  <div className="inline-flex flex-row items-center px-3 py-1 mt-3 space-x-2 bg-gray-800 rounded-md">
                    <HiClock className="text-sm fill-gray-400 md:text-base" />{" "}
                    <span className="text-sm text-gray-400 md:text-base">
                      {new Date(project.updatedAt).toLocaleDateString()}
                    </span>
                  </div>
                  {project.status == "DEVELOPMENT" ? (
                    <div className="inline-flex flex-row items-center px-3 py-1 mt-3 space-x-2 bg-blue-900 rounded-md">
                      <HiClock className="text-sm fill-blue-400 md:text-base" />{" "}
                      <span className="text-sm text-blue-400 md:text-base">
                        In Development
                      </span>
                    </div>
                  ) : (
                    <div className="inline-flex flex-row items-center px-3 py-1 mt-3 space-x-2 bg-green-900 rounded-md">
                      <HiGlobeAlt className="text-sm fill-green-400 md:text-base" />{" "}
                      <span className="text-sm text-green-400 md:text-base">
                        In Production
                      </span>
                    </div>
                  )}
                  {project.url != null && (
                    <div className="inline-flex flex-row items-center px-3 py-1 mt-3 space-x-2 rounded-md bg-fuchsia-900">
                      <HiLink className="text-sm fill-fuchsia-400 md:text-base" />{" "}
                      <span className="text-sm text-fuchsia-400 md:text-base">
                        <CustomLink href={project.url}>Link</CustomLink>
                      </span>
                    </div>
                  )}
                </div>
                <MarkdownWrapper>{project.content}</MarkdownWrapper>
              </div>
            </div>
          </div>
        </div>
      </div>
    </HomeLayout>
  );
}

export async function getStaticProps(c: any) {
  const r = await fetch(
    `${process.env.STRAPI_BASE_URL}/projects?filters[slug][$eq]=${c.params.slug}&populate=*`
  );
  const projects = (await r.json()).data;

  if (projects.length == 0) {
    return {
      notFound: true,
    };
  }

  const project: Project = projects[0].attributes;
  project.author = projects[0].attributes.author.data.attributes;
  if (projects[0].attributes.preview_image.data != null) {
    project.preview_image =
      projects[0].attributes.preview_image.data.attributes;
  }
  project.id = projects[0].id;

  const r1 = await fetch(
    `${process.env.STRAPI_BASE_URL}/project-likes?filters[project][id][$eq]=${project.id}`
  );
  const likes = await r1.json();
  project.likes = likes.meta.pagination.total;

  return {
    props: {
      slug: c.params.slug,
      project,
    },
    // Next.js will attempt to re-generate the page:
    // - When a request comes in
    // - At most once every 10 seconds
    revalidate: 10, // In seconds
  };
}

export const getStaticPaths: GetStaticPaths<{ slug: string }> = async () => {
  const res = await fetch(`${process.env.STRAPI_BASE_URL}/projects`);
  let projects = await res.json();

  projects = projects.data.map((p: any) => {
    return { params: { slug: p.attributes.slug } };
  });

  return {
    paths: projects, //indicates that no page needs be created at build time
    fallback: true, //indicates the type of fallback
  };
};
