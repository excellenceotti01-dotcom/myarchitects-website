import { useEffect, useRef } from "react";

import styles from "./HeroMedia.module.css";
import heroRender from "../../assets/images/hero-render.png";
import heroVideo from "../../assets/videos/Hero.video.mp4";

const HeroMedia = () => {
  const videoRef = useRef(null);

  useEffect(() => {
    const reducedMotionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const respectMotionPreference = () => {
      if (reducedMotionQuery.matches) videoRef.current?.pause();
    };

    respectMotionPreference();
    reducedMotionQuery.addEventListener("change", respectMotionPreference);
    return () => reducedMotionQuery.removeEventListener("change", respectMotionPreference);
  }, []);

  return (
    <div className={styles.media}>
      <video
        ref={videoRef}
        className={styles.video}
        data-hero-image
        autoPlay
        loop
        muted
        playsInline
        preload="metadata"
        poster={heroRender}
        aria-hidden="true"
      >
        <source src={heroVideo} type="video/mp4" />
      </video>

    </div>
  );
};

export default HeroMedia;
