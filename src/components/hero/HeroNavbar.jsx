import { forwardRef } from "react";
import { Link } from "react-router-dom";

import logo from "../../assets/images/MYA white logo.png";
import { useInquiry } from "../../context/inquiryContext";
import styles from "./HeroNavbar.module.css";

const HeroNavbar = forwardRef(function HeroNavbar({ visible = false }, ref) {
  const { openInquiry } = useInquiry();

  return (
    <header ref={ref} className={`${styles.navbar} ${visible ? styles.visible : ""}`} data-hero-navbar>
      <Link to="/" className={styles.logo}>
        <img className={styles.logoImage} src={logo} alt="MYA" />
      </Link>

      <nav className={styles.nav}>
        <Link to="/about">About</Link>
        <Link to="/work">Work</Link>
        <Link to="/process">Process</Link>
      </nav>

      <button type="button" className={styles.projectCta} onClick={openInquiry}>Begin a Project</button>
    </header>
  );
});

export default HeroNavbar;
