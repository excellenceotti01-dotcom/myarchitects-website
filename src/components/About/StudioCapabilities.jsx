import { useRef } from "react";

import StudioCapabilitiesEffects from "./StudioCapabilitiesEffects";
import styles from "./StudioCapabilities.module.css";

const capabilities = [
  ["01", "Architecture", "Context-led spaces shaped around people, place and purpose."],
  ["02", "Interior Architecture", "Coherent interiors developed through material, light and use."],
  ["03", "Master Planning", "Connected frameworks that balance growth, movement and identity."],
  ["04", "Design Consultation", "Focused design guidance from early thinking through key decisions."],
];

const StudioCapabilities = () => {
  const sectionRef = useRef(null);

  return (
    <section ref={sectionRef} className={styles.capabilities} aria-labelledby="capabilities-heading" data-navbar-theme="dark">
      <div className={styles.stage} data-capabilities-stage>
        <div className={styles.canvas}>
          <div className={styles.marks} data-capabilities-marks aria-hidden="true">
            <svg viewBox="0 0 1680 1080" preserveAspectRatio="none" role="presentation">
              <g className={styles.dimensionLines} fill="none" vectorEffect="non-scaling-stroke">
                <line x1="-40" y1="190" x2="-40" y2="850" />
                <line x1="-50" y1="190" x2="-30" y2="190" /><line x1="-50" y1="850" x2="-30" y2="850" />
                <line x1="-50" y1="520" x2="-30" y2="520" /><line x1="-40" y1="510" x2="-40" y2="530" />

                <line x1="620" y1="120" x2="620" y2="930" />
                <line x1="610" y1="120" x2="630" y2="120" /><line x1="610" y1="930" x2="630" y2="930" />

                <line x1="-40" y1="930" x2="1680" y2="930" />
                <line x1="-40" y1="920" x2="-40" y2="940" /><line x1="620" y1="920" x2="620" y2="940" /><line x1="1680" y1="920" x2="1680" y2="940" />
                <line x1="-40" y1="930" x2="-40" y2="970" /><line x1="620" y1="930" x2="620" y2="970" /><line x1="1680" y1="930" x2="1680" y2="970" />

                <line x1="1640" y1="180" x2="1640" y2="710" />
                <line x1="1680" y1="150" x2="1680" y2="730" />
                <line x1="1630" y1="180" x2="1650" y2="180" /><line x1="1630" y1="313" x2="1650" y2="313" /><line x1="1630" y1="446" x2="1650" y2="446" /><line x1="1630" y1="579" x2="1650" y2="579" /><line x1="1630" y1="710" x2="1650" y2="710" />

                <path d="M-50 930h20m-10-10v20M610 930h20m-10-10v20M1670 930h20m-10-10v20M1630 150h20m-10-10v20M1630 710h20m-10-10v20M610 120h20m-10-10v20" />
              </g>
              <g className={styles.dimensionLabels}>
                <text x="-16" y="685">6.00</text>
                <text x="275" y="976">8.00</text><text x="1120" y="976">12.00</text>
                <text x="1654" y="250">3.00</text><text x="1654" y="383">3.00</text><text x="1654" y="516">3.00</text><text x="1654" y="648">3.00</text>
              </g>
            </svg>
          </div>

          <header className={styles.intro}>
            <h2 id="capabilities-heading" className={styles.heading}>
              <span className={styles.headingClip}><span data-capability-line>From first ideas</span></span>
              <span className={styles.headingClip}><span data-capability-line>to spaces</span></span>
              <span className={styles.headingClip}><span data-capability-line>made real.</span></span>
            </h2>
            <p className={styles.copy} data-capability-copy>An integrated design practice shaping thoughtful environments across scales.</p>
          </header>

          <div className={styles.ledger}>
            {capabilities.map(([number, title, description]) => (
              <article className={styles.capability} data-capability-row key={title}>
                <span className={styles.rowLine} data-capability-line-draw aria-hidden="true" />
                <span className={styles.number}>{number}</span>
                <h3>{title}</h3>
                <p>{description}</p>
              </article>
            ))}
            <div className={styles.experience} data-capability-experience>
              <span>Areas of experience</span>
              <i aria-hidden="true" />
              <strong>Residential</strong><b>/</b><strong>Commercial</strong><b>/</b><strong>Hospitality</strong>
            </div>
          </div>
        </div>
      </div>
      <StudioCapabilitiesEffects sectionRef={sectionRef} />
    </section>
  );
};

export default StudioCapabilities;
