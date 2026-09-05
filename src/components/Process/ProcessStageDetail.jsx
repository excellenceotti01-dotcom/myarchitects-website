import { useRef } from "react";
import { processStages } from "../../data/process.data";
import useProcessStageDetailEffects from "./ProcessStageDetailEffects";
import styles from "./ProcessStageDetail.module.css";

const stages = [
  { number: "01", short: "Brief\nBreakdown", title: "Brief Breakdown", image: processStages[0].image, alt: "Waterfront residence at dusk", intro: "We examine the brief, site, priorities, budget and constraints to establish a clear understanding of the project.", detail: "Through careful analysis and early conversations, we uncover the real needs, opportunities and limitations that will guide every decision ahead." },
  { number: "02", short: "Strategies", title: "Strategies", image: processStages[1].image, alt: "Conceptual architectural exterior", intro: "We define the guiding ideas, spatial priorities and practical approach that will shape every design decision.", detail: "Clear strategy becomes the foundation that ensures coherence through all subsequent phases of the project." },
  { number: "03", short: "Design\nPhase", title: "Design Phase", image: processStages[2].image, alt: "Refined interior architectural space", intro: "We translate the agreed strategy into a thoughtful architectural proposal, coordinating space, form, material and experience.", detail: "Every element is resolved with care so the design remains clear in its intent from concept through delivery." },
  { number: "04", short: "Approval", title: "Approval", image: processStages[3].image, alt: "Coordinated planted architectural threshold", intro: "We refine and document the proposal, incorporating feedback and preparing it for the required client and regulatory approvals.", detail: "Clarity in documentation and coordination ensures the design intent is understood and supported through the approval process." },
  { number: "05", short: "Construction", title: "Construction", image: processStages[4].image, alt: "Completed waterfront exterior", intro: "We carry the approved design into delivery, protecting its intent through coordination, detailing and construction oversight.", detail: "The process remains focused through delivery, ensuring every part of the project is built with the same care that shaped it." },
];

const ProcessStageDetail = () => {
  const sectionRef = useRef(null);
  useProcessStageDetailEffects(sectionRef);

  return <section ref={sectionRef} className={styles.section} aria-label="Process stage detail" data-navbar-theme="dark">
    <div className={styles.stage} data-process-detail-stage>
      <div className={styles.grid} aria-hidden="true" />
      <div className={styles.content}>
        <div className={styles.copyColumn}>
          {stages.map((stage, index) => <article className={styles.copyPanel} data-process-detail-copy key={stage.number} aria-hidden={index !== 0}>
            <p className={styles.label}>Process stage</p>
            <p className={styles.number}>{stage.number}</p>
            <h2>{stage.title}</h2>
            <p className={styles.intro}>{stage.intro}</p>
            <p className={styles.detail}>{stage.detail}</p>
          </article>)}
        </div>
        <div className={styles.imageColumn}>
          {stages.map((stage, index) => <figure className={styles.imagePanel} data-process-detail-image key={stage.number} aria-hidden={index !== 0}>
            <img src={stage.image} alt={stage.alt} />
          </figure>)}
        </div>
      </div>
      <div className={styles.processLine} data-process-detail-line aria-label="Process stages">
        {stages.map((stage, index) => <div className={styles.stageMarker} data-process-detail-marker key={stage.number}>
          <span className={styles.markerNumber}>{stage.number}</span>
          <i /><strong>{stage.short.split("\n").map((line) => <span key={line}>{line}</span>)}</strong>
        </div>)}
      </div>
    </div>
  </section>;
};

export default ProcessStageDetail;
