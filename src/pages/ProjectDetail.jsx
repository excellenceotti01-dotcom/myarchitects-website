import { Navigate, useParams } from "react-router-dom";

import HeroNavbar from "../components/hero/HeroNavbar";
import ProjectDetailHero from "../components/Work/ProjectDetailHero";
import ProjectConcept from "../components/Work/ProjectConcept";
import ProjectImageStory from "../components/Work/ProjectImageStory";
import ProjectBackControl from "../components/Work/ProjectBackControl";
import ProjectCredits from "../components/Work/ProjectCredits";
import { workIndexProjects } from "../data/projects.data";

const ProjectDetailContent = ({ project }) => {
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
