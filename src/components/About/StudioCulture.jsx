import { useRef } from "react";

import StudioCultureEffects from "./StudioCultureEffects";
import styles from "./StudioCulture.module.css";
import teamImage from "../../assets/images/about/studio-culture-team.png";
import drawingImage from "../../assets/images/about/studio-culture-drawing.png";
import materialsImage from "../../assets/images/about/studio-culture-materials.png";

const StudioCulture = () => {
  const sectionRef = useRef(null);
  const stageRef = useRef(null);

  return (
    <section ref={sectionRef} className={styles.culture} aria-labelledby="studio-culture-heading" data-navbar-theme="light">
      <div ref={stageRef} className={styles.stage} data-culture-stage>
        <div className={styles.canvas}>
          <div className={styles.marks} data-culture-marks aria-hidden="true">
            <span className={`${styles.cross} ${styles.crossTop}`} />
            <span className={`${styles.cross} ${styles.crossBottom}`} />
            <span className={`${styles.rule} ${styles.ruleTop}`} />
            <span className={`${styles.rule} ${styles.ruleBottom}`} />
            <span className={`${styles.dots} ${styles.dotsBottom}`} />
          </div>

          <div className={styles.copyBlock}>
            <h2 id="studio-culture-heading" className={styles.heading}>
              <span className={styles.headingClip}><span data-culture-line>Architecture is</span></span>
              <span className={styles.headingClip}><span data-culture-line>a collective</span></span>
              <span className={styles.headingClip}><span data-culture-line>act.</span></span>
            </h2>
            <p className={styles.copy} data-culture-copy>
              Our studio brings together different perspectives around a shared commitment to thoughtful work. Ideas are tested through conversation, observation and collaboration—allowing every project to benefit from more than one way of seeing.
            </p>
          </div>

          <figure className={styles.teamImage} data-culture-team>
            <img src={teamImage} alt="Architects gathered around drawings and a study model" />
          </figure>
          <figure className={styles.drawingImage} data-culture-drawing>
            <img src={drawingImage} alt="Hand drawing over architectural plans" />
          </figure>
          <figure className={styles.materialsImage} data-culture-materials>
            <img src={materialsImage} alt="Architectural material samples and study blocks" />
          </figure>
        </div>
      </div>
      <StudioCultureEffects sectionRef={sectionRef} stageRef={stageRef} />
    </section>
  );
};

export default StudioCulture;
