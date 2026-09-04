import { useRef } from "react";

import ProjectImageStoryEffects from "./ProjectImageStoryEffects";
import styles from "./ProjectImageStory.module.css";

const ProjectImageStory = ({ project }) => {
  const sectionRef = useRef(null);
  const stageRef = useRef(null);
  const experience = project.spatialExperience;
  if (!experience?.images?.length) return null;

  return (
    <section ref={sectionRef} className={styles.section} aria-labelledby="spatial-experience-heading">
      <div ref={stageRef} className={styles.stage}>
        <div className={styles.copy}>
          <p className={styles.label}>{experience.label}</p>
          <h2 id="spatial-experience-heading">{experience.headline.map((line) => <span key={line}>{line}</span>)}</h2>
          <p className={styles.description}>{experience.paragraph}</p>
          <div className={styles.counter} aria-label="Image sequence progress">
            {experience.images.map((_, index) => <span key={index} data-story-counter>{String(index + 1).padStart(2, "0")} <i>/ 04</i></span>)}
          </div>
        </div>
        <div className={styles.images} aria-live="off">
          {experience.images.map((item, index) => (
            <figure key={item.image} className={styles.imageFrame} data-story-image>
              <img src={item.image} alt={item.alt} loading={index > 0 ? "lazy" : undefined} />
            </figure>
          ))}
        </div>
        <span className={styles.measure} aria-hidden="true" />
      </div>
      <ProjectImageStoryEffects sectionRef={sectionRef} stageRef={stageRef} />
    </section>
  );
};

export default ProjectImageStory;
