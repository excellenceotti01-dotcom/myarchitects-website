import { useRef } from "react";

import ClosingStatementEffects from "./ClosingStatementEffects";
import styles from "./ClosingStatement.module.css";
import closingBackground from "../../assets/images/about/about-closing-background.png";

const ClosingStatement = () => {
  const sectionRef = useRef(null);
  const stageRef = useRef(null);

  return (
    <section ref={sectionRef} className={styles.closing} aria-labelledby="about-closing-heading" data-navbar-theme="dark">
      <div ref={stageRef} className={styles.stage} data-closing-stage>
        <div className={styles.background} data-closing-background>
          <img src={closingBackground} alt="Contemporary residence at dusk" />
        </div>
        <div className={styles.vignette} data-closing-vignette aria-hidden="true" />

        <svg className={styles.frame} data-closing-frame viewBox="0 0 1920 1080" preserveAspectRatio="none" aria-hidden="true">
          <g className={styles.frameLines} fill="none" vectorEffect="non-scaling-stroke">
            <path d="M50 48H1870M50 1032H1870M48 50V1030M1872 50V1030" />
            <path d="M28 48H72M50 26V70M1848 48H1892M1870 26V70M28 1032H72M50 1010V1054M1848 1032H1892M1870 1010V1054" />
            <path d="M938 48H982M960 26V70M938 1032H982M960 1010V1054M28 540H72M1848 540H1892" />
          </g>
          <g className={styles.frameDots}>
            <circle cx="50" cy="48" r="2" />
            <circle cx="1870" cy="48" r="2" />
            <circle cx="50" cy="1032" r="2" />
            <circle cx="1870" cy="1032" r="2" />
            <circle cx="960" cy="48" r="2" />
            <circle cx="960" cy="1032" r="2" />
          </g>
        </svg>

        <div className={styles.content} data-closing-content>
          <h2 id="about-closing-heading" className={styles.heading}>
            <span className={styles.lineClip}><span data-closing-line>Thoughtful spaces begin</span></span>
            <span className={styles.lineClip}><span data-closing-line>with thoughtful conversations.</span></span>
          </h2>
          <p className={styles.copy} data-closing-copy>
            Tell us what you are imagining, where you are starting and what the space needs to become.
          </p>
        </div>
      </div>
      <ClosingStatementEffects sectionRef={sectionRef} stageRef={stageRef} />
    </section>
  );
};

export default ClosingStatement;
