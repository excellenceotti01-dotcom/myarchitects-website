import HeroNavbar from "../../components/hero/HeroNavbar";
import ProcessHero from "../../components/Process/ProcessHero";
import ProcessStageDetail from "../../components/Process/ProcessStageDetail";
import ProcessClosing from "../../components/Process/ProcessClosing";
import StudioSections from "../../components/Home/StudioSections/StudioSections";
import styles from "./ProcessPage.module.css";

const ProcessPage = () => {
  return (
    <div className={styles.page}>
      <HeroNavbar visible />
      <main>
        <ProcessHero />
        <ProcessStageDetail />
        <ProcessClosing />
      </main>
      <StudioSections />
    </div>
  );
};

export default ProcessPage;
