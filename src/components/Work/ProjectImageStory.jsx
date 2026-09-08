import { useRef } from "react";

import ProjectImageStoryEffects from "./ProjectImageStoryEffects";
import styles from "./ProjectImageStory.module.css";

const ProjectImageStory = ({ project }) => {
  const sectionRef = useRef(null);
  const stageRef = useRef(null);
  const experience = project.spatialExperience;
  if (!experience?.images?.length) return null;
  const storySlides = experience.storySlides?.length ? experience.storySlides : [{ headline: experience.headline, paragraph: experience.paragraph }];

  return (
    <section ref={sectionRef} className={styles.section} aria-labelledby="spatial-experience-heading">
      <div ref={stageRef} className={styles.stage}>
        <div className={styles.copy}>
          {storySlides.map((slide, index) => (
            <div key={index} className={styles.storyCopy} data-story-copy>
              <h2 id={index === 0 ? "spatial-experience-heading" : undefined}>
                {Array.isArray(slide.headline) ? slide.headline.join(" ") : slide.headline}
              </h2>
              <p className={styles.description}>{slide.paragraph}</p>
            </div>
          ))}
          <div className={styles.counter} aria-label="Image sequence progress">
            {experience.images.map((_, index) => <span key={index} data-story-counter>{String(index + 1).padStart(2, "0")} <i>/ {String(experience.images.length).padStart(2, "0")}</i></span>)}
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
