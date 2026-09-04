import styles from "./ProcessOverview.module.css";

const principles = [
  ["01", "LISTEN", "Understand the ambition"],
  ["02", "TEST", "Explore the possibilities"],
  ["03", "COORDINATE", "Align every decision"],
  ["04", "DELIVER", "Carry intent into reality"],
];

const ProcessOverview = () => (
  <section className={styles.overview} data-process-overview aria-labelledby="process-overview-title">
    <div className={styles.grid} aria-hidden="true" />
    <svg className={styles.draftingLine} viewBox="0 0 1600 900" preserveAspectRatio="none" aria-hidden="true">
      <path data-process-overview-path d="M430 0V165c0 42 28 70 70 70h510c42 0 70 28 70 70v435c0 42 28 70 70 70h116" />
    </svg>
    <span className={styles.crosshair} data-process-overview-crosshair aria-hidden="true" />

    <div className={styles.content}>
      <div className={styles.leftColumn}>
        <p className={styles.label} data-process-overview-label>How we work</p>
        <h2 id="process-overview-title" className={styles.statement}>
          {[
            "Every project begins differently.",
            "Our role is to create",
            "a clear path from ambition",
            "to architecture.",
          ].map((line) => <span key={line} data-process-overview-line>{line}</span>)}
        </h2>
      </div>

      <div className={styles.rightColumn}>
        <p className={styles.copy} data-process-overview-copy>
          We listen before we draw, test ideas before we commit, and create clear moments for collaboration, review and decision-making.
        </p>
        <div className={styles.principles}>
          {principles.map(([number, title, description]) => (
            <div className={styles.principle} key={number} data-process-overview-row>
              <span className={styles.rule} data-process-overview-rule />
              <span className={styles.number}>{number}</span>
              <strong>{title}</strong>
              <span>{description}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  </section>
);

export default ProcessOverview;
