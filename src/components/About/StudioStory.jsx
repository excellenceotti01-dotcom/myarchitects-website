import { useRef } from "react";

import StudioStoryEffects from "./StudioStoryEffects";
import styles from "./StudioStory.module.css";
import featureImage from "../../assets/images/about/studio-story-feature.jpg";
import landscapeImage from "../../assets/images/about/studio-story-landscape.jpg";
import detailImage from "../../assets/images/about/studio-story-detail.jpg.jpg";

const StudioStory = () => {
  const sectionRef = useRef(null);

  return (
    <section ref={sectionRef} className={styles.story} aria-labelledby="studio-story-heading" data-navbar-theme="light">
      <div className={styles.stage} data-story-stage>
        <div className={styles.canvas}>
          <div className={styles.draftingMarks} data-story-marks aria-hidden="true">
            <span className={`${styles.cross} ${styles.crossOne}`} />
            <span className={`${styles.cross} ${styles.crossTwo}`} />
            <span className={`${styles.rule} ${styles.ruleOne}`} />
            <span className={`${styles.rule} ${styles.ruleTwo}`} />
            <span className={`${styles.dotGrid} ${styles.dotsOne}`} />
            <span className={`${styles.dotGrid} ${styles.dotsTwo}`} />
          </div>
          <figure className={`${styles.image} ${styles.landscape}`} data-story-landscape>
            <img src={landscapeImage} alt="Low contemporary residence framed by a mature tree" />
          </figure>
          <figure className={`${styles.image} ${styles.detail}`} data-story-detail>
            <img src={detailImage} alt="Concrete stair and façade detail" />
          </figure>
          <figure className={`${styles.image} ${styles.feature}`} data-story-feature>
            <img src={featureImage} alt="Contemporary concrete residence and landscaped approach at dusk" />
          </figure>
          <div className={styles.copyBlock}>
            <h2 id="studio-story-heading" className={styles.heading}>
              <span className={styles.headingClip}><span data-story-heading-line>We began with a belief</span></span>
              <span className={styles.headingClip}><span data-story-heading-line>that better spaces come</span></span>
              <span className={styles.headingClip}><span data-story-heading-line>from paying closer attention.</span></span>
            </h2>
            <p className={styles.copy} data-story-copy>
              My Architects Design is an independent architectural studio shaped by curiosity, collaboration, and commitment to thoughtful design.

              We believe that meaningful architecture begins with understanding not only the physical context of a site, but the people, stories, and everyday experiences that give a place its identity.

              Our approach is rooted in observation and exploration, allowing us to understand how people live, move, work and connect before translating those insights into considered architectural responses.

              Each project is an opportunity to create something that feels purposeful, authentic and connected to its surroundings.
            </p>
          </div>
        </div>
      </div>
      <StudioStoryEffects sectionRef={sectionRef} />
    </section>
  );
};

export default StudioStory;
