import React from "react";
import HomeLayout from "../../components/layouts/HomeLayout";
import { ProjectItem } from "../../components/ProjectItem";
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

export async function getStaticProps() {
  const res = await fetch(
    `${process.env.STRAPI_BASE_URL}/projects?populate=*&sort[0]=featured%3Adesc`
  );
  let projects = await res.json();
  console.log(projects.data.map);
  console.log(res.status);

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
