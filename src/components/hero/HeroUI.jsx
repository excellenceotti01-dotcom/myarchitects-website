import HeroNavbar from "./HeroNavbar";
import HeroContent from "./HeroContent";
import HeroFloatingCards from "./HeroFloatingCards/HeroFloatingCards";

import styles from "./HeroUI.module.css";

const HeroUI = () => {
  return (
    <div className={styles.ui}>
      <HeroNavbar />
      <HeroContent />
      <HeroFloatingCards />
    </div>
  );
};

export default HeroUI;
