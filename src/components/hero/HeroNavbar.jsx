import { forwardRef, useEffect, useState } from "react";
import { Link } from "react-router-dom";

import logo from "../../assets/images/MYA white logo.png";
import { useInquiry } from "../../context/inquiryContext";
import styles from "./HeroNavbar.module.css";

const HeroNavbar = forwardRef(function HeroNavbar({ visible = false }, ref) {
  const { openInquiry } = useInquiry();
  const [theme, setTheme] = useState("dark");

  useEffect(() => {
    const updateTheme = () => {
      const navbar = document.querySelector("[data-hero-navbar]");
      if (!navbar) return;
      const centerY = navbar.getBoundingClientRect().top + navbar.getBoundingClientRect().height / 2;
      const section = [...document.querySelectorAll("[data-navbar-theme]")]
        .find((candidate) => {
          const rect = candidate.getBoundingClientRect();
          return rect.top <= centerY && rect.bottom >= centerY;
        });
      setTheme(section?.dataset.navbarTheme === "light" ? "light" : "dark");
    };

    updateTheme();
    window.addEventListener("scroll", updateTheme, { passive: true });
    window.addEventListener("resize", updateTheme);
    return () => {
      window.removeEventListener("scroll", updateTheme);
      window.removeEventListener("resize", updateTheme);
    };
  }, []);

  return (
    <header ref={ref} className={`${styles.navbar} ${visible ? styles.visible : ""}`} data-hero-navbar data-navbar-mode={theme}>
      <Link to="/" className={styles.logo}>
        <img className={styles.logoImage} src={logo} alt="MYA" />
      </Link>

      <nav className={styles.nav}>
        <Link to="/">Home</Link>
        <Link to="/about">About</Link>
        <Link to="/work">Work</Link>
        <Link to="/process">Process</Link>
      </nav>

      <button type="button" className={styles.projectCta} onClick={openInquiry}>Begin a Project</button>
    </header>
  );
});

export default HeroNavbar;
