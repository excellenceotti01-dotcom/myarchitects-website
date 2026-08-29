import { useRef } from "react";

import StudioStoryEffects from "./StudioStoryEffects";
import styles from "./StudioStory.module.css";
import featureImage from "../../assets/images/about/studio-story-feature.jpg";
import landscapeImage from "../../assets/images/about/studio-story-landscape.jpg";
import detailImage from "../../assets/images/about/studio-story-detail.jpg.jpg";

const StudioStory = () => {
  const sectionRef = useRef(null);

  return (
    <section ref={sectionRef} className={styles.story} aria-labelledby="studio-story-heading">
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
              MYArchitects is an independent architectural studio shaped by curiosity, collaboration and a commitment to thoughtful design. Our work begins by observing how people live, move and connect—then translating those insights into spaces with clarity, purpose and lasting relevance.
            </p>
          </div>
        </div>
      </div>
      <StudioStoryEffects sectionRef={sectionRef} />
    </section>
  );
};

export default StudioStory;
