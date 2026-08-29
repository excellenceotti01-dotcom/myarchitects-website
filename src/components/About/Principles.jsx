import { useCallback, useLayoutEffect, useRef, useState } from "react";

import PrinciplesEffects from "./PrinciplesEffects";
import styles from "./Principles.module.css";
import landscapeImage from "../../assets/images/about/studio-story-landscape.jpg";
import detailImage from "../../assets/images/about/studio-story-detail.jpg.jpg";
import featureImage from "../../assets/images/about/studio-story-feature.jpg";

const principles = [
  { title: "Context before form.", copy: "Every project begins by reading its setting—climate, culture, movement and the patterns already present.", image: landscapeImage, position: "68% 58%", ratio: "tall" },
  { title: "People before spectacle.", copy: "We design around the lives a space must support, allowing experience, comfort and purpose to guide every decision.", image: detailImage, position: "26% 54%", ratio: "tall" },
  { title: "Clarity through restraint.", copy: "We remove what does not serve the idea, allowing proportion, material and light to do more with less.", image: featureImage, position: "82% 52%", ratio: "wide" },
  { title: "Collaboration from the beginning.", copy: "The strongest outcomes emerge when clients, consultants and makers contribute from the beginning.", image: landscapeImage, position: "30% 68%", ratio: "wide" },
  { title: "Enduring value over temporary trends.", copy: "We favour adaptable, durable spaces whose relevance extends beyond the moment they were created.", image: detailImage, position: "74% 42%", ratio: "tall" },
];

const Principles = () => {
  const sectionRef = useRef(null);
  const stageRef = useRef(null);
  const ledgerViewportRef = useRef(null);
  const ledgerRef = useRef(null);
  const activeRef = useRef(0);
  const [activeIndex, setActiveIndex] = useState(0);
  const [trackOffset, setTrackOffset] = useState(0);

  const setActive = useCallback((index) => {
    if (activeRef.current === index) return;
    activeRef.current = index;
    setActiveIndex(index);
  }, []);

  useLayoutEffect(() => {
    const updateOffset = () => {
      const viewport = ledgerViewportRef.current;
      const row = ledgerRef.current?.children[activeIndex];
      if (!viewport || !row) return;
      setTrackOffset(Math.max(0, row.offsetTop - viewport.clientHeight * 0.14));
    };

    updateOffset();
  }, [activeIndex]);

  return (
    <section ref={sectionRef} className={`${styles.principles} ${styles.motionReady}`} aria-labelledby="principles-heading">
      <div ref={stageRef} className={styles.stage} data-principles-stage>
      <div className={styles.container}>
        <aside className={styles.sidebar} data-principles-sidebar>
          <h2 id="principles-heading" className={styles.heading} data-principles-heading>What we refuse to compromise.</h2>
          <span className={styles.verticalRule} data-principles-rule aria-hidden="true" />
          <p className={styles.index} data-principles-index><strong>{String(activeIndex + 1).padStart(2, "0")}</strong><span>/ 05</span></p>
        </aside>

        <div ref={ledgerViewportRef} className={styles.ledgerViewport}>
        <ol ref={ledgerRef} className={styles.ledger} style={{ "--ledger-offset": `${trackOffset}px` }}>
          {principles.map((principle, index) => (
            <li key={principle.title} className={`${styles.row} ${activeIndex === index ? styles.active : ""}`} data-principle-row>
              <div className={styles.rowHeader}>
                <span className={styles.number}>{String(index + 1).padStart(2, "0")}</span>
                <h3>{principle.title}</h3>
              </div>
              <div className={styles.rowDetail}>
                <p className={styles.explanation}>{principle.copy}</p>
                <figure className={`${styles.material} ${styles[principle.ratio]}`}>
                  <img src={principle.image} alt="" loading="lazy" style={{ objectPosition: principle.position }} />
                </figure>
              </div>
            </li>
          ))}
        </ol>
        </div>
      </div>
      </div>
      <PrinciplesEffects sectionRef={sectionRef} stageRef={stageRef} onActiveChange={setActive} />
    </section>
  );
};

export default Principles;
