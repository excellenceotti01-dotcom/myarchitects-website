import { Fragment, useRef } from "react";

import ProjectDetailHeroEffects from "./ProjectDetailHeroEffects";
import ProjectOverview from "./ProjectOverview";
import styles from "./ProjectDetailHero.module.css";

const titleLines = (title) => {
  const words = title.trim().split(/\s+/);
  return words.length > 1 ? [words.slice(0, -1).join(" "), words.at(-1)] : [title];
};

const ProjectDetailHero = ({ project }) => {
  const sectionRef = useRef(null);
  const stageRef = useRef(null);
  const lines = titleLines(project.title);
  const metadata = [project.heroLocation ?? project.location, project.category].filter(Boolean);

  return (
    <section ref={sectionRef} className={styles.hero} aria-labelledby="project-detail-title" data-project-detail data-navbar-theme="dark">
      <div ref={stageRef} className={styles.stage} data-project-detail-stage>
        <div className={styles.drafting} aria-hidden="true">
          <span className={`${styles.guide} ${styles.guideVertical}`} />
          <span className={`${styles.guide} ${styles.guideHorizontal}`} />
          <span className={`${styles.cross} ${styles.crossTopLeft}`} />
          <span className={`${styles.cross} ${styles.crossLeftMid}`} />
          <span className={`${styles.cross} ${styles.crossBottomLeft}`} />
          <span className={`${styles.cross} ${styles.crossBottomRight}`} />
        </div>

        <div className={styles.content} data-detail-content>
          <p className={styles.number} data-detail-number>{project.number}</p>
          <h1 id="project-detail-title" className={styles.title}>
            {lines.map((line) => <span key={line} data-detail-title-line>{line}</span>)}
          </h1>
          <p className={styles.metadata} data-detail-meta>
            {metadata.map((item, index) => <Fragment key={`${item}-${index}`}><span>{item}</span>{index < metadata.length - 1 && <i aria-hidden="true">/</i>}</Fragment>)}
          </p>
          <div className={styles.scrollCue} data-detail-cue aria-hidden="true">
            <span className={styles.cueLine} />
            <span className={styles.cueDot}>↓</span>
            <span>Scroll to explore</span>
          </div>
        </div>

        <div className={styles.mediaFrame} data-detail-media>
          <img src={project.image} alt={project.alt} fetchPriority="high" />
          <span className={styles.mediaShade} aria-hidden="true" />
        </div>
        <ProjectOverview project={project} />
      </div>
      <div className={styles.boundary} aria-hidden="true" />
      <ProjectDetailHeroEffects sectionRef={sectionRef} stageRef={stageRef} />
    </section>
  );
};

export default ProjectDetailHero;
