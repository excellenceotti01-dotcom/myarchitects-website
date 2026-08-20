import { useRef, useState } from "react";

import HeroBackground from "./HeroBackground";
import HeroEffects from "./HeroEffects";
import HeroMedia from "./HeroMedia";
import HeroOverlay from "./HeroOverlay";
import HeroUI from "./HeroUI";
import ArcPreloaderHero from "../ui/arc-preloader-hero";

import styles from "./Hero.module.css";

const Hero = ({ navbarRef, onRevealComplete }) => {
  const heroRef = useRef(null);
  const [preloaderComplete, setPreloaderComplete] = useState(false);
  const [shouldLoadVideo, setShouldLoadVideo] = useState(false);

  return (
    <ArcPreloaderHero
      onRevealStart={() => setShouldLoadVideo(true)}
      onRevealComplete={() => setPreloaderComplete(true)}
    >
      <section id="top" ref={heroRef} className={styles.hero}>
        <HeroBackground />
        <HeroMedia shouldLoad={shouldLoadVideo} />
        <HeroOverlay />
        <HeroUI />
        <HeroEffects
          heroRef={heroRef}
          navbarRef={navbarRef}
          mediaRequested={shouldLoadVideo}
          introComplete={preloaderComplete}
          onRevealComplete={onRevealComplete}
        />
      </section>
    </ArcPreloaderHero>
  );
};

export default Hero;
