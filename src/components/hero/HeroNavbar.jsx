import { forwardRef } from "react";
import { Link } from "react-router-dom";

import logo from "../../assets/images/MYA white logo.png";
import styles from "./HeroNavbar.module.css";

const HeroNavbar = forwardRef(function HeroNavbar({ visible = false }, ref) {
  return (
    <header ref={ref} className={`${styles.navbar} ${visible ? styles.visible : ""}`} data-hero-navbar>
      <Link to="/" className={styles.logo}>
        <img className={styles.logoImage} src={logo} alt="MYA" />
      </Link>

      <nav className={styles.nav}>
        <Link to="/about">About</Link>
        <Link to="/work">Work</Link>
        <a href="/#process">Process</a>
        <a href="/#contact">Contact</a>
      </nav>

      <a href="/#contact" className={styles.projectCta}>Start a Project</a>
    </header>
  );
});

export default HeroNavbar;
