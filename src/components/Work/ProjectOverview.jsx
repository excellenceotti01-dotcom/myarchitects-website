import styles from "./ProjectOverview.module.css";

const fallbackLines = (statement) => statement.match(/.{1,31}(?:\s|$)/g)?.map((line) => line.trim()).filter(Boolean) ?? [statement];

const ProjectOverview = ({ project }) => {
  const lines = project.statementLines ?? fallbackLines(project.statement);
  const facts = [
    ["Location", project.location],
    ["Typology", project.category],
    ["Project type", project.projectType],
    ["Status", project.status],
    ["Year", project.year],
    ["Site area", project.siteArea],
  ].filter(([, value]) => value);

  return (
    <section className={styles.overview} data-project-overview aria-labelledby="project-overview-statement">
        <div className={styles.surface} data-overview-surface />
        <div className={styles.drafting} data-overview-drafting aria-hidden="true">
          <span className={styles.topMeasure}>1920</span>
          <span className={styles.sideMeasure}>1080</span>
          <span className={styles.ruleTop} />
          <span className={styles.ruleOuterLeft} />
          <span className={styles.ruleLeft} />
          <span className={styles.crossA} />
          <span className={styles.crossB} />
        </div>
        <div className={styles.content}>
          <h2 id="project-overview-statement" className={styles.statement}>
            {lines.map((line) => <span key={line} data-overview-statement-line>{line}</span>)}
          </h2>
          <div className={`${styles.details} ${facts.length > 5 ? styles.detailsDense : ""}`}>
            <p data-overview-paragraph>{project.brief}</p>
            <p data-overview-paragraph>{project.designResponse}</p>
            {facts.length > 0 && (
              <dl className={styles.facts} data-overview-facts data-fact-count={facts.length}>
                {facts.map(([label, value]) => (
                  <div key={label} data-overview-fact>
                    <dt>{label}</dt><span aria-hidden="true">—</span><dd>{value}</dd>
                  </div>
                ))}
              </dl>
            )}
          </div>
        </div>
    </section>
  );
};

export default ProjectOverview;
