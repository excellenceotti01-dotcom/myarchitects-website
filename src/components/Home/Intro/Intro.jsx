import CinematicSectionIntro from "../CinematicSectionIntro/CinematicSectionIntro";
import styles from "./Intro.module.css";

const Intro = ({ stageMode = false, splineSuspended = false }) => {
  const Tag = stageMode ? "div" : "section";
  return (
    <Tag className={`${styles.intro} ${stageMode ? styles.stageIntro : ""}`} data-selected-work-intro={stageMode || undefined} aria-labelledby="intro-heading">
      <CinematicSectionIntro id="selected-work" suspended={splineSuspended} />
      <p className={styles.indicator} data-intro-indicator>Selected Work</p>
      <div className={styles.content}>
        <h2 id="intro-heading" className={`${styles.heading} type-display-section`} data-intro-heading>
          Selected Work
        </h2>
        <p className={styles.copy} data-intro-copy>
          Every project begins with an idea
          <br />
          and ends with a space that lasts.
        </p>
        <p className={styles.scrollCue} data-intro-cue>
          Explore New Projects <span aria-hidden="true">↓</span>
        </p>
      </div>
    </Tag>
  );
};

export default Intro;
