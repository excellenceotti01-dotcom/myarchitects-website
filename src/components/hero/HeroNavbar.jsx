import { forwardRef } from "react";

import logo from "../../assets/images/MYA white logo.png";
import styles from "./HeroNavbar.module.css";

const HeroNavbar = forwardRef(function HeroNavbar(_props, ref) {
  return (
    <header ref={ref} className={styles.navbar} data-hero-navbar>
      <a href="/" className={styles.logo}>
        <img className={styles.logoImage} src={logo} alt="MYA" />
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
});

export default HeroNavbar;
