import { useRef } from "react";

import useAboutStudioEffects from "./AboutStudioEffects";
import styles from "./AboutStudio.module.css";

const statementLines = ["Thoughtful spaces.", "Clear purpose.", "Enduring value."];

const AboutStudio = () => {
  const sectionRef = useRef(null);
  const stageRef = useRef(null);
  useAboutStudioEffects(sectionRef, stageRef);

  return (
    <section id="about" ref={sectionRef} className={styles.section} aria-labelledby="about-studio-heading">
      <div ref={stageRef} className={styles.stage}>
        <div className={styles.grid} data-about-grid aria-hidden="true" />
        <div className={styles.bounds} aria-hidden="true">
          <span className={styles.upperLine} data-about-upper-line />
          <span className={styles.lowerLine} data-about-lower-line />
          <span className={styles.upperEndpoint} data-about-upper-endpoint />
          <span className={styles.lowerEndpoint} data-about-lower-endpoint />
        </div>

        <div className={styles.topBoundary}>
          <p className={styles.label} data-about-label>About MYArchitects</p>
        </div>

        <svg className={styles.compass} viewBox="0 0 132 132" aria-hidden="true" data-about-compass>
          <line data-about-compass-axis="vertical" pathLength="1" x1="48" y1="4" x2="48" y2="128" />
          <line data-about-compass-axis="horizontal" pathLength="1" x1="4" y1="66" x2="94" y2="66" />
          <circle data-about-compass-circle pathLength="1" cx="48" cy="66" r="22" />
          <path data-about-compass-extension pathLength="1" d="M48 30V19M48 102v11M11 66H0M96 66h12" />
          <circle className={styles.compassPoint} data-about-compass-point cx="48" cy="66" r="2.5" />
        </svg>

        <div className={styles.content}>
          <h2 id="about-studio-heading" className={styles.statement}>
            {statementLines.map((line) => (
              <span className={styles.statementMask} key={line}>
                <span className="type-display-section" data-about-statement-line>{line}</span>
              </span>
            ))}
          </h2>

          <div className={styles.copy}>
            <p data-about-copy>
              MYArchitects is an architecture and design studio creating thoughtful, enduring spaces shaped by purpose, context and human experience.
            </p>
            <p data-about-copy>
              Our work brings clarity, character and lasting value to the way people live, work and experience space.
            </p>
            <a className={styles.link} href="/about" data-about-link>Discover our studio <span aria-hidden="true">→</span></a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutStudio;
