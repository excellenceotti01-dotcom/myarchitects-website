import HeroContent from "./HeroContent";
import HeroFloatingCards from "./HeroFloatingCards/HeroFloatingCards";

import styles from "./HeroUI.module.css";

const HeroUI = () => {
  return (
    <div className={styles.ui}>
      <HeroContent />
      <HeroFloatingCards />
    </div>
  );
};

export default HeroUI;
