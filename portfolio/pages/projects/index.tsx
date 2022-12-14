import { motion } from "framer-motion";
import React from "react";
import CustomHead from "../../components/Head";
import HomeLayout from "../../components/layouts/HomeLayout";
import { ProjectItem } from "../../components/ProjectItem";
import { Project } from "../../interfaces/project";

type Props = {
  projects: Project[];
};

export default function ProjectsPage({ projects }: Props) {
  if (!projects) return null;

  return (
    <HomeLayout>
      <CustomHead
        title="Simon Köck | Projects"
        description="I have worked on numerous projects throughout my career. Here you can find a selection of my latest projects."
      />
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

          <div className="flex flex-row flex-wrap mt-10">
            {projects.map((p, i) => {
              return (
                <motion.div
                  className="w-full pb-10 pr-10 md:w-1/2 lg:w-1/3"
                  key={p.slug}
                  initial={{ opacity: 0, translateY: 20 }}
                  animate={{ opacity: 1, translateY: 0 }}
                  exit={{ opacity: 0, translateY: 20 }}
                  transition={{ duration: 0.3, delay: i * 0.08 }}
                >
                  <ProjectItem project={p} index={i + 1} />
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </HomeLayout>
  );
}

export async function getStaticProps() {
  const res = await fetch(
    `${process.env.STRAPI_BASE_URL}/projects?populate=*&sort[0]=weight%3Adesc`
  );
  let projects = await res.json();

  if (!projects.data) {
    return { props: {}, revalidate: 10 };
  }

  projects = projects?.data?.map((p: any) => {
    let project: Project = p.attributes;
    project.author = p.attributes.author.data.attributes;
    if (p.attributes.preview_image.data != null) {
      project.preview_image = p.attributes.preview_image.data.attributes;
    }
    return project;
  });

  return {
    props: {
      projects,
    },
    revalidate: 10,
  };
}
