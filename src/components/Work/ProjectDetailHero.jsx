import { useEffect, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import ProjectDetailHeroEffects from "./ProjectDetailHeroEffects";
import ProjectOverview from "./ProjectOverview";
import styles from "./ProjectDetailHero.module.css";
import { readWorkReturnContext, saveWorkReturnContext } from "../../utils/workReturnContext";

const titleLines = (title) => {
  const words = title.trim().split(/\s+/);
  return words.length > 1 ? [words.slice(0, -1).join(" "), words.at(-1)] : [title];
};

const ProjectDetailHero = ({ project }) => {
  const sectionRef = useRef(null);
  const stageRef = useRef(null);
  const navigate = useNavigate();
  const location = useLocation();
  const lines = titleLines(project.title);
  const returnContextRef = useRef(readWorkReturnContext(project.id)?.context ?? location.state?.returnContext ?? null);

  useEffect(() => {
    const preserveNativeBackContext = () => {
      if (returnContextRef.current) saveWorkReturnContext(returnContextRef.current, true);
    };
    window.addEventListener("popstate", preserveNativeBackContext);
    return () => window.removeEventListener("popstate", preserveNativeBackContext);
  }, []);

  const returnToWork = () => {
    // A route reached from the index should restore the browser's own Work
    // history entry (including its scroll position). Direct visits retain a
    // dependable route fallback.
    const context = returnContextRef.current;
    if (context) saveWorkReturnContext(context, true);
    navigate("/work", { replace: true, state: context ? { workReturnContext: context } : undefined });
  };

  return (
    <section ref={sectionRef} className={styles.hero} aria-labelledby="project-detail-title" data-project-detail>
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
          <button type="button" className={styles.back} onClick={returnToWork} data-detail-back>
            <span aria-hidden="true">←</span> Back to projects
          </button>
          <p className={styles.number} data-detail-number>{project.number}</p>
          <h1 id="project-detail-title" className={styles.title}>
            {lines.map((line) => <span key={line} data-detail-title-line>{line}</span>)}
          </h1>
          <p className={styles.metadata} data-detail-meta>
            <span>{project.location}</span><i aria-hidden="true">/</i><span>{project.category}</span><i aria-hidden="true">/</i><span>{project.year}</span>
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
