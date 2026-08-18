import styles from "./StudioSections.module.css";
import TeamSection from "../TeamSection/TeamSection";

const StudioSections = () => {
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <>
      <TeamSection />

      <footer id="contact" className={styles.footer} aria-labelledby="contact-heading">
        <div className={styles.footerGlow} aria-hidden="true" />
        <div className={styles.footerTop}>
          <p className={styles.eyebrow}>Start a Project</p>
          <a className={styles.projectAction} href="mailto:studio@example.com">
            <span>Let’s create something that lasts.</span>
            <span aria-hidden="true">↗</span>
          </a>
          <p id="contact-heading" className={styles.contactCopy}>Have a site, an idea, or a project in mind? Let’s begin the conversation.</p>
          <a className={styles.email} href="mailto:studio@example.com">studio@example.com</a>
        </div>

        <div className={styles.footerMeta}>
          <div className={styles.brandBlock}>
            <a className={styles.brand} href="#top" aria-label="MYA — back to top">MYA</a>
            <p>Architecture for lasting places.</p>
          </div>
          <nav className={styles.footerNav} aria-label="Footer navigation">
            <a href="#work">Work</a>
            <a href="#process">Process</a>
            <a href="#about">Meet the Team</a>
            <a href="#contact">Contact</a>
          </nav>
          <nav className={styles.socialNav} aria-label="Social links">
            <a href="https://www.instagram.com/" target="_blank" rel="noreferrer">Instagram</a>
            <a href="https://www.linkedin.com/" target="_blank" rel="noreferrer">LinkedIn</a>
          </nav>
          <button className={styles.backToTop} type="button" onClick={scrollToTop}>Back to Top <span aria-hidden="true">↑</span></button>
        </div>

        <div className={styles.footerBase}>
          <span>© 2026 MYA Architects</span>
          <span>All rights reserved.</span>
        </div>
      </footer>
    </>
  );
};

export default StudioSections;
