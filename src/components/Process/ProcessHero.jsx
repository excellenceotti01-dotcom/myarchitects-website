import { useRef } from "react";

import { processHeroContent, processHeroStages } from "../../data/processHero.data";
import useProcessHeroEffects from "./ProcessHeroEffects";
import ProcessOverview from "./ProcessOverview";
import styles from "./ProcessHero.module.css";

const Crosshair = ({ className = "" }) => (
  <span className={`${styles.crosshair} ${className}`} aria-hidden="true">
    <i />
    <b />
  </span>
);

const ProcessHero = () => {
  const sectionRef = useRef(null);
  useProcessHeroEffects(sectionRef);

  return (
    <section ref={sectionRef} className={styles.hero} aria-labelledby="process-hero-title" data-navbar-theme="dark">
      <div className={styles.stage} data-process-stage>
        <div className={styles.dotGrid} aria-hidden="true" />
        <div className={styles.grain} aria-hidden="true" />

        <div className={styles.frame} aria-hidden="true">
          <span className={styles.verticalMeasure}><span>1080</span></span>
          <span className={styles.horizontalMeasure}><span>1920</span></span>
          <Crosshair className={styles.topCrosshair} />
          <Crosshair className={styles.bottomCrosshair} />
        </div>

        <div className={styles.composition}>
          <div className={styles.leftColumn}>
            <p className={styles.eyebrow} data-process-label>{processHeroContent.label}</p>
            <h1 id="process-hero-title" className={styles.headline}>
              {processHeroContent.headline.map((line) => (
                <span key={line} className={styles.headlineLine}>
                  {line.split(" ").map((word) => (
                    <span key={word} className={styles.headlineWord} data-process-headline-word>{word}</span>
                  ))}
                </span>
              ))}
            </h1>
          </div>

          <div className={styles.rightColumn}>
            <p className={styles.copy} data-process-copy>{processHeroContent.copy}</p>
            <svg
              className={styles.drawing}
              data-process-svg
              viewBox="0 0 1000 620"
              preserveAspectRatio="xMidYMid meet"
              role="img"
              aria-label="An architectural process drawing connecting five project stages"
            >
              <g className={styles.planFragments} data-process-plan-fragments>
                <path data-process-plan-path d="M66 438H244V312H397V456H573V328H722V502H900" />
                <path data-process-plan-path d="M127 380V236H280V325H344V174H514V297H658V160H825V352" />
                <path data-process-plan-path d="M518 486V404H668V532H862V416" />
                <path data-process-plan-path d="M133 211h118v72h74v-58h90M394 398h96v-85h104" />
                <path data-process-plan-path d="M93 465h98v-91h66v-67h92v70h74v-88h72v62h110" />
                <path data-process-plan-path d="M268 510v-52h78v-78h95v50h84v-97h103v66h73" />
                <path data-process-plan-path d="M594 240h82v-52h74v54h61v-86h75M720 475h73v-71h66v54h66" />
                <path data-process-plan-path d="M112 270c76 0 96 45 96 99M445 214c42 0 74 35 74 77M636 395c46 0 82 28 82 69" />
                <circle data-process-plan-circle cx="332" cy="347" r="116" />
                <circle data-process-plan-circle cx="704" cy="330" r="76" />
                <path data-process-plan-path d="M730 112c109 0 184 89 184 190 0 98-74 174-154 196" />
                <path data-process-plan-path d="M746 136v268M796 136v268M847 136v268M894 136v268" />
              </g>

              <g className={styles.secondaryMarks} data-process-secondary>
                <path data-process-measure-path d="M66 128h125M66 116v24M191 116v24" />
                <path data-process-measure-path d="M576 87v185M565 87h22M565 272h22" />
                <path data-process-measure-path d="M100 552h740M100 540v24M840 540v24" />
                <path data-process-measure-path d="M224 347h222M336 228v240M660 242h205" />
              </g>

              <path className={styles.mainPath} data-process-main-path d="M74 455 C180 432 226 399 300 374 S458 323 548 296 S729 257 929 218" />

              <g className={styles.nodes}>
                {[
                  [74, 455], [300, 374], [548, 296], [729, 257], [929, 218],
                ].map(([cx, cy], index) => (
                  <g key={`${cx}-${cy}`} data-process-node className={styles.node} style={{ transformOrigin: `${cx}px ${cy}px` }}>
                    <circle cx={cx} cy={cy} r="17" />
                    <circle cx={cx} cy={cy} r="7" />
                  </g>
                ))}
              </g>

              <g className={styles.svgDetails} data-process-details>
                <path data-process-detail-path d="M41 455h66M74 422v66M904 218h52M929 193v50" />
                <path data-process-detail-path d="M738 95v62M707 126h62M178 522v58M149 551h58" />
                <circle data-process-detail-path cx="332" cy="347" r="6" />
                <circle data-process-detail-path cx="797" cy="278" r="5" />
              </g>
            </svg>
          </div>
        </div>

        <div className={styles.stageIndex} data-process-stage-index>
          {processHeroStages.map((stage, index) => (
            <div key={stage.number} className={`${styles.stageItem} ${index === 0 ? styles.activeStage : ""}`} data-process-stage-item>
              <span className={styles.stageNumber}>{stage.number}</span>
              <span className={styles.stageLabel}>{stage.label}</span>
              <span className={styles.stageProgress} data-process-stage-progress aria-hidden="true" />
            </div>
          ))}
        </div>

        <div className={styles.scrollCue} data-process-scroll-cue>
          <span>{processHeroContent.scrollLabel}</span>
          <i aria-hidden="true" />
        </div>

        <ProcessOverview />
      </div>
    </section>
  );
};

export default ProcessHero;
