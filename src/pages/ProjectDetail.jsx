import { Navigate, useParams } from "react-router-dom";

import HeroNavbar from "../components/hero/HeroNavbar";
import ProjectDetailHero from "../components/Work/ProjectDetailHero";
import { workIndexProjects } from "../data/projects.data";

const ProjectDetail = () => {
  const { projectSlug } = useParams();
  const project = workIndexProjects.find((item) => item.slug === `/work/${projectSlug}`);

  if (!project) return <Navigate to="/work" replace />;

  return (
    <>
      <HeroNavbar visible />
      <main>
        <ProjectDetailHero project={project} />
      </main>
    </>
  );
};

export default ProjectDetail;
