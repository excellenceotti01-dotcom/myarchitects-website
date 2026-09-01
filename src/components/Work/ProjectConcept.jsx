import { useRef } from "react";
import ProjectConceptEffects from "./ProjectConceptEffects";
import styles from "./ProjectConcept.module.css";

const ProjectConcept = ({ project }) => {
  const sectionRef = useRef(null);
  const stageRef = useRef(null);
  const concept = project.concept;
  if (!concept?.mainImage) return null;

  const annotation = (id) => concept.annotations?.find((item) => item.id === id);
  const renderAnnotation = (id) => {
    const item = annotation(id);
    if (!item) return null;
    return (
      <div className={`${styles.annotation} ${styles[id]}`} data-concept-annotation>
        <span className={styles.annotationLine} aria-hidden="true" />
        <span className={styles.annotationPoint} aria-hidden="true" />
        <span className={styles.annotationLabel}>{item.label.map((line) => <span key={line}>{line}</span>)}</span>
      </div>
    );
  };

  return (
    <section ref={sectionRef} className={styles.concept} data-project-concept aria-labelledby="project-concept-title">
      <div ref={stageRef} className={styles.stage} data-concept-stage>
        <div className={styles.grid}>
          <div className={styles.mainRegion}>
            <div className={styles.mainMedia} data-concept-main>
              <img src={concept.mainImage} alt={concept.mainAlt} />
            </div>
            <div className={styles.annotationOverlay} aria-hidden="true">
              {renderAnnotation("planted")}
              {renderAnnotation("views")}
              {renderAnnotation("shaded")}
            </div>
          </div>
          <div className={styles.rightColumn}>
            <div className={styles.copy} data-concept-copy>
              <h2 id="project-concept-title">{concept.headlineLines?.map((line) => <span key={line}>{line}</span>)}</h2>
              <p>{concept.paragraph}</p>
            </div>
            {concept.detailImage && (
              <div className={styles.detailRegion}>
                <div className={styles.detailMedia} data-concept-detail>
                  <img src={concept.detailImage} alt={concept.detailAlt ?? "Architectural material detail"} loading="lazy" />
                </div>
                <div className={styles.annotationOverlay} aria-hidden="true">{renderAnnotation("screens")}</div>
              </div>
            )}
          </div>
        </div>
      </div>
      <ProjectConceptEffects sectionRef={sectionRef} stageRef={stageRef} />
    </section>
  );
};

export default ProjectConcept;
