import { useInquiry } from "../../context/inquiryContext";
import styles from "./HeroContent.module.css";

const HeroContent = () => {
  const headlineLines = ["MYArchitect", "Design"];
  const { openInquiry } = useInquiry();

  return (
    <section className={styles.content}>
      <h1 className={styles.title} data-hero-headline>
        {headlineLines.map((line, lineIndex) => (
          <span className={styles.line} key={line}>
            {Array.from(line).map((letter, letterIndex) => (
              <span className={styles.word} data-hero-word key={`${lineIndex}-${letter}-${letterIndex}`}>
                {letter}
              </span>
            ))}
          </span>
        ))}
      </h1>

      <div className={styles.sideContent}>
        <p className={styles.supportingCopy} data-hero-supporting-copy>
          We create thoughtful, enduring spaces where architecture, purpose, and human experience come together.
        </p>

        <button type="button" className={styles.cta} data-hero-cta onClick={openInquiry}>
          <span className={styles.ctaText}>Begin a Project</span>
          <span className={styles.ctaArrow} aria-hidden="true">&rarr;</span>
        </button>
      </div>
    </section>
  );
};

export default HeroContent;
