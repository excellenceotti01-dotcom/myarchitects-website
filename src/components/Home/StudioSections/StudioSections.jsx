import logo from "../../../assets/images/MYA white logo.png";
import { useInquiry } from "../../../context/inquiryContext";
import styles from "./StudioSections.module.css";

const StudioSections = () => {
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });
  const { openInquiry } = useInquiry();

  return (
    <>
      <footer id="contact" className={styles.footer} aria-labelledby="contact-heading">
        <div className={styles.footerGlow} aria-hidden="true" />
        <div className={styles.footerTop}>
          <p className={styles.eyebrow}>Begin a Project</p>
          <button type="button" className={styles.projectAction} onClick={openInquiry}>
            <span>Let’s create something that feels timeless.</span>
            <span aria-hidden="true">↗</span>
          </button>
          <p id="contact-heading" className={styles.contactCopy}>Have a site, an idea, or a project in mind? Let’s begin the conversation.</p>
          <a className={styles.email} href="mailto:studio@example.com">studio@example.com</a>
        </div>

        <div className={styles.footerMeta}>
          <div className={styles.brandBlock}>
            <a className={styles.brand} href="#top" aria-label="MYA — back to top">
              <img className={styles.brandImage} src={logo} alt="MYA" />
            </a>
            <p>Architecture for lasting places.</p>
            <button type="button" className={styles.footerCta} onClick={openInquiry}>
              Begin a Project
              <span aria-hidden="true">↗</span>
            </button>
          </div>
          <nav className={styles.footerNav} aria-label="Footer navigation">
            <a href="#work">Work</a>
            <a href="#process">Process</a>
            <a href="#about">About</a>
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
