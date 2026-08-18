import styles from "./HeroNavbar.module.css";

const HeroNavbar = () => {
  return (
    <header className={styles.navbar} data-hero-navbar>
      <a href="/" className={styles.logo}>
        MYA
      </a>

      <nav className={styles.nav}>
        <a href="#work">Work</a>
        <a href="#process">Process</a>
        <a href="#about">About</a>
        <a href="#contact">Contact</a>
      </nav>

      <a href="#contact" className={styles.projectCta}>Start a Project</a>
    </header>
  );
};

export default HeroNavbar;
