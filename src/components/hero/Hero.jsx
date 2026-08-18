import { useRef, useState } from "react";

import HeroBackground from "./HeroBackground";
import HeroEffects from "./HeroEffects";
import HeroMedia from "./HeroMedia";
import HeroOverlay from "./HeroOverlay";
import HeroUI from "./HeroUI";
import ArcPreloaderHero from "../ui/arc-preloader-hero";

import styles from "./Hero.module.css";

const Hero = ({ onRevealComplete }) => {
  const heroRef = useRef(null);
  const [preloaderComplete, setPreloaderComplete] = useState(false);

  return (
    <ArcPreloaderHero onRevealComplete={() => setPreloaderComplete(true)}>
      <section id="top" ref={heroRef} className={styles.hero}>
        <HeroBackground />
        <HeroMedia />
        <HeroOverlay />
        <HeroUI />
        <HeroEffects
          heroRef={heroRef}
          introComplete={preloaderComplete}
          onRevealComplete={onRevealComplete}
        />
      </section>
    </ArcPreloaderHero>
  );
};

export default Hero;
