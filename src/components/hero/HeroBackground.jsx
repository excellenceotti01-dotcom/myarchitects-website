import styles from "./HeroBackground.module.css";

const HeroBackground = () => {
  return (
    <div className={styles.background}>
      <div className={styles.paper}></div>
      <div className={styles.grain}></div>
      <div className={styles.vignette}></div>
    </div>
  );
};

export default HeroBackground;