import { GetStaticPaths } from "next";
import Image from "next/image";
import React from "react";
import { HiClock, HiFire, HiGlobe, HiGlobeAlt, HiUser } from "react-icons/hi";
import HomeLayout from "../../components/layouts/HomeLayout";
import CustomLink from "../../components/Link";
import Toolip from "../../components/Tooltip";
import { Project } from "../../interfaces/project";

type Props = {
  projects: Project[];
};

export default function ProjectsPage({ projects }: Props) {
  return (
    <HomeLayout>
      <div className="w-full">
        <div className="container px-4 py-16 mx-auto">
          <div className="relative inline-block">
            <h1 className="inline text-4xl font-black tracking-tight">
              My Projects
            </h1>
            <span className="ml-2 text-gray-400">
              ({projects.length.toString()})
            </span>
            <div className="w-full h-[2px] bg-gray-500 mt-2"></div>
          </div>

          <div className="flex flex-row flex-wrap mt-10 space-y-5 md:space-y-0 md:space-x-20">
            {projects.map((p) => {
              return <ProjectItem key={p.slug} project={p} />;
            })}
          </div>
        </div>
      </div>
    </HomeLayout>
  );
}

type ProjectItemProps = {
  project: Project;
};

function ProjectItem({ project }: ProjectItemProps) {
  return (
    <div className="relative w-full max-w-30 rounded-xl md:w-auto">
      <div className="flex flex-row items-center space-x-2">
        <h2 className="text-xl font-semibold text-gray-200">{project.title}</h2>
        {project.featured == true && (
          <Toolip message={"Featured"}>
            <HiFire className="text-xl fill-orange-400" />
          </Toolip>
        )}
      </div>
      <p className="mt-1 text-gray-400">{project.description}</p>
      <div className="flex flex-row my-3 space-x-3">
        <div className="flex flex-row items-center space-x-1">
          <HiUser className="text-sm fill-gray-500" />
          <span className="text-sm text-gray-500">
            {project.author.firstname + " " + project.author.lastname}
          </span>
        </div>
        <div className="flex flex-row items-center space-x-1">
          <HiGlobeAlt className="text-sm fill-gray-500" />
          <span className="text-sm text-gray-500">
            {project.status == "DEVELOPMENT"
              ? "In Development"
              : "In Production"}
          </span>
        </div>
        <div className="flex flex-row items-center space-x-1">
          <HiClock className="text-sm fill-gray-500" />
          <span className="text-sm text-gray-500">
            {new Date(project.publishedAt).toLocaleDateString()}
          </span>
        </div>
      </div>
      <CustomLink href={"/projects/" + project.slug}>See more</CustomLink>
    </div>
  );
}

export async function getStaticProps() {
  const res = await fetch(
    `${process.env.STRAPI_BASE_URL}/projects?populate=*&sort[0]=featured%3Adesc`
  );
  let projects = await res.json();

  projects = projects.data.map((p: any) => {
    let project: Project = p.attributes;
    project.author = p.attributes.author.data.attributes;
    project.preview_image = p.attributes.preview_image.data.attributes;
    console.log(project);
    return project;
  });

  return {
    props: {
      projects,
    },
    revalidate: 10,
  };
}
