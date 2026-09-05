import { useRef } from "react";

import AboutManifestoEffects from "./AboutManifestoEffects";
import styles from "./AboutManifesto.module.css";

const AboutManifesto = () => {
  const sectionRef = useRef(null);

  return (
    <section ref={sectionRef} className={styles.manifesto} aria-labelledby="manifesto-heading" data-navbar-theme="dark">
      <div className={styles.stage} data-manifesto-stage>
        <svg className={styles.linework} viewBox="0 0 1600 1200" preserveAspectRatio="none" aria-hidden="true">
          <g className={styles.drawing} data-manifesto-linework>
            <path pathLength="1" d="M270 200H490M270 200V418H334V332H272M280 208H328V326H280M280 270H328M334 332H272V404H334V372C361 372 365 351 365 335H334M326 332V846H580" />
            <path pathLength="1" d="M270 200V824M260 824H282M270 814V834M580 836V856M570 846H590" />
          </g>
        </svg>
        <div className={styles.warmTransition} data-manifesto-warm-transition aria-hidden="true" />
        <div className={styles.composition}>
          <h2 id="manifesto-heading" className={styles.heading}>
            <span data-manifesto-line>Architecture should</span>
            <span data-manifesto-line>respond before</span>
            <span data-manifesto-line>it imposes.</span>
          </h2>
          <p className={styles.copy} data-manifesto-copy>
            We begin by understanding place, people and purpose—then shape spaces that feel considered, functional and inevitable to their context.
          </p>
        </div>
      </div>
      <AboutManifestoEffects sectionRef={sectionRef} />
    </section>
  );
};

export default AboutManifesto;
