import { useRef } from "react";
import { Chats } from "@phosphor-icons/react/dist/csr/Chats";
import { CompassTool } from "@phosphor-icons/react/dist/csr/CompassTool";
import { HouseLine } from "@phosphor-icons/react/dist/csr/HouseLine";

import closingImage from "../../assets/images/Work/Small detail image.png";
import useProcessClosingEffects from "./ProcessClosingEffects";
import styles from "./ProcessClosing.module.css";

const headingLines = ["Great architecture", "begins with clarity", "and ends with impact."];

const supportingPoints = [
  { Icon: Chats, title: "Let’s talk about your vision.", copy: "Book a consultation with our studio." },
  { Icon: CompassTool, title: "We listen, we design, we build.", copy: "A seamless journey from start to finish." },
  { Icon: HouseLine, title: "Built with purpose.", copy: "Designed to last for generations." },
];

const ProcessClosing = () => {
  const sectionRef = useRef(null);
  useProcessClosingEffects(sectionRef);

  return (
    <section ref={sectionRef} className={styles.closing} aria-labelledby="process-closing-heading">
      <div className={styles.stage} data-closing-stage>
        <div className={styles.upper}>
          <div className={styles.media} data-closing-media>
            <img src={closingImage} alt="Waterfront residence at dusk with warm interior light" />
          </div>

          <div className={styles.content}>
            <h2 id="process-closing-heading" className={styles.heading}>
              {headingLines.map((line) => <span className={styles.lineClip} key={line}><span data-closing-line>{line}</span></span>)}
            </h2>
            <p className={styles.copy} data-closing-copy>
              Our process exists to remove uncertainty and create space for bold ideas to take shape. When vision, strategy and craft work together, the result is timeless.
            </p>
          </div>
        </div>

        <div className={styles.pointsBar}>
          <div className={styles.points}>
            {supportingPoints.map(({ Icon, title, copy }) => (
              <div className={styles.point} data-closing-point key={title}>
                <Icon className={styles.pointIcon} size={26} weight="light" aria-hidden="true" />
                <div className={styles.pointText}>
                  <strong>{title}</strong>
                  <span>{copy}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProcessClosing;
