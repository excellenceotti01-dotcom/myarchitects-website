import { useEffect, useRef, useState } from "react";

import { projects } from "../../../data/projects.data";
import CoverflowCarousel from "./CoverflowCarousel";
import styles from "./Projects.module.css";

const Projects = ({ stageMode = false, interactive = true }) => {
  const Tag = stageMode ? "div" : "section";
  const projectsRef = useRef(null);
  const [shouldLoadMedia, setShouldLoadMedia] = useState(!stageMode);

  useEffect(() => {
    if (!stageMode || shouldLoadMedia) return undefined;
    const element = projectsRef.current;
    if (!element) return undefined;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setShouldLoadMedia(true);
      },
      { rootMargin: "0px", threshold: 0.01 },
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, [shouldLoadMedia, stageMode]);

  return (
    <Tag ref={projectsRef} id="work" className={`${styles.projects} ${stageMode ? styles.stageProjects : ""}`} data-selected-work-carousel={stageMode || undefined} aria-label="Featured projects">
      <CoverflowCarousel projects={projects} interactive={interactive} shouldLoadMedia={shouldLoadMedia} />
    </Tag>
  );
};

export default Projects;
