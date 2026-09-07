import { Link } from "react-router-dom";
import { useRef } from "react";
import ProjectCreditsEffects from "./ProjectCreditsEffects";
import styles from "./ProjectCredits.module.css";

const ProjectCredits = ({ project, projects }) => {
  const sectionRef = useRef(null);
  const index = projects.findIndex((item) => item.id === project.id);
  const previous = projects[(index - 1 + projects.length) % projects.length];
  const next = projects[(index + 1) % projects.length];
  const credits = [
    project.displayProjectNameInCredits && ["Project", project.title],
    ["Architect", project.credits?.architect],
    ["Location", project.location],
    ["Typology", project.category],
    ["Project type", project.projectType],
    ["Status", project.status],
    ["Year completed", project.year],
    ["Photography", project.credits?.photography],
  ].filter((entry) => entry?.[1]);
  ProjectCreditsEffects(sectionRef);

  const preview = (item, direction) => (
    <Link to={item.slug} className={styles.preview} data-credits-preview aria-label={`${direction} project: ${item.title}`}>
      <p className={styles.direction}>{direction === "Previous" ? "← PREVIOUS PROJECT" : "NEXT PROJECT"} <span>{item.number} / {String(projects.length).padStart(2, "0")}</span>{direction === "Next" ? " →" : ""}</p>
      <span className={styles.imageMask}><img src={item.image} alt={item.alt} /></span>
      <strong>{item.title}</strong>
      <small>{item.location} <i>·</i> {item.category} <i>·</i> {item.year}</small>
    </Link>
  );

  return (
    <section ref={sectionRef} className={styles.section} aria-labelledby="credits-heading">
      <div className={styles.stage}>
        <div className={styles.grain} aria-hidden="true" />
        <div className={styles.credits}>
          <p id="credits-heading" className={styles.eyebrow} data-credits-label>Project Credits</p>
          <dl data-credits-rows style={{ "--credit-count": credits.length }}>{credits.map(([label, value]) => <div key={label}><dt>{label}</dt><dd>{value}</dd></div>)}</dl>
        </div>
        <div className={styles.rule} data-credits-rule />
        <div className={styles.explore}>
          <h2 data-credits-heading>Explore another project</h2>
          <div className={styles.previews}>{preview(previous, "Previous")}{preview(next, "Next")}</div>
        </div>
      </div>
    </section>
  );
};
export default ProjectCredits;
