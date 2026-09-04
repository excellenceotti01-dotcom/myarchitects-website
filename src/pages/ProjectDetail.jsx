import { useLayoutEffect } from "react";
import { Navigate, useParams } from "react-router-dom";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import HeroNavbar from "../components/hero/HeroNavbar";
import ProjectDetailHero from "../components/Work/ProjectDetailHero";
import ProjectConcept from "../components/Work/ProjectConcept";
import ProjectImageStory from "../components/Work/ProjectImageStory";
import ProjectBackControl from "../components/Work/ProjectBackControl";
import ProjectCredits from "../components/Work/ProjectCredits";
import { workIndexProjects } from "../data/projects.data";

const ProjectDetailContent = ({ project }) => {
  useLayoutEffect(() => {
    // Detail routes always begin from their own hero. Work-page restoration is
    // intentionally handled only by the persistent Back to Projects control.
    window.history.scrollRestoration = "manual";
    ScrollTrigger.clearScrollMemory?.();
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });

    const settleFrame = requestAnimationFrame(() => {
      window.scrollTo({ top: 0, left: 0, behavior: "auto" });
    });
    return () => cancelAnimationFrame(settleFrame);
  }, []);

  return (
    <main>
      <ProjectDetailHero project={project} />
      <ProjectConcept project={project} />
      <ProjectImageStory project={project} />
      <ProjectCredits project={project} projects={workIndexProjects} />
    </main>
  );
};

const ProjectDetail = () => {
  const { projectSlug } = useParams();
  const project = workIndexProjects.find((item) => item.slug === `/work/${projectSlug}`);

  if (!project) return <Navigate to="/work" replace />;

  return (
    <>
      <HeroNavbar visible />
      <ProjectBackControl projectId={project.id} />
      <ProjectDetailContent key={project.slug} project={project} />
    </>
  );
};

export default ProjectDetail;
