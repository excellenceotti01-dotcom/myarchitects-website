import { projects } from "../../../data/projects.data";
import CoverflowCarousel from "./CoverflowCarousel";
import styles from "./Projects.module.css";

const Projects = ({ stageMode = false, interactive = true }) => {
  const Tag = stageMode ? "div" : "section";
  return (
    <Tag id="work" className={`${styles.projects} ${stageMode ? styles.stageProjects : ""}`} data-selected-work-carousel={stageMode || undefined} aria-label="Featured projects">
      <CoverflowCarousel projects={projects} interactive={interactive} />
    </Tag>
  );
};

export default Projects;
