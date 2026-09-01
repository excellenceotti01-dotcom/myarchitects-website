import styles from "./HeroFloatingCards.module.css";

const HeroFloatingCards = () => {
  return (
    <aside className={styles.cards} aria-label="Studio highlights">
      <div className={styles.floatingCard} data-hero-card-float="philosophy">
        <div className={styles.parallaxCard} data-hero-card-parallax="philosophy">
          <section className={`${styles.card} ${styles.philosophy}`} data-hero-card="philosophy">
            <p className={styles.eyebrow}>Our Philosophy</p>
            <p className={styles.philosophyStatement}>
              Architecture should
              <br />
              feel timeless.
            </p>
          </section>
        </div>
      </div>

      <div className={`${styles.floatingCard} ${styles.projectFloat}`} data-hero-card-float="project">
        <div className={styles.parallaxCard} data-hero-card-parallax="project">
          <section className={`${styles.card} ${styles.project}`} data-hero-card="project">
            <p className={styles.eyebrow}>Featured Project</p>
            <p className={styles.projectName}>Lagos Waterfront Residence</p>
            <dl className={styles.metadata}>
              <div>
                <dt>Status</dt>
                <dd>In Progress</dd>
              </div>
              <div>
                <dt>Year</dt>
                <dd>2026</dd>
              </div>
            </dl>
          </section>
        </div>
      </div>
    </aside>
  );
};

export default HeroFloatingCards;
