import { useEffect, useRef, useState } from "react";

import styles from "./HeroMedia.module.css";
import heroVideo from "../../assets/videos/Hero.video.mp4";

const HeroMedia = () => {
  const videoRef = useRef(null);
  const [hasVideoFrame, setHasVideoFrame] = useState(false);

  useEffect(() => {
    const reducedMotionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const video = videoRef.current;
    if (!video) return undefined;

    const respectMotionPreference = () => {
      if (reducedMotionQuery.matches) {
        video.pause();
      } else {
        video.play().catch(() => {});
      }
    };
    const visibilityObserver = new IntersectionObserver(
      ([entry]) => {
        if (reducedMotionQuery.matches) return;
        if (entry.isIntersecting) video.play().catch(() => {});
        else video.pause();
      },
      { rootMargin: "100% 0px", threshold: 0 },
    );

    respectMotionPreference();
    reducedMotionQuery.addEventListener("change", respectMotionPreference);
    visibilityObserver.observe(video);
    return () => {
      visibilityObserver.disconnect();
      reducedMotionQuery.removeEventListener("change", respectMotionPreference);
    };
  }, []);

  return (
    <div className={styles.media}>
      <video
        ref={videoRef}
        className={`${styles.video} ${hasVideoFrame ? styles.videoReady : ""}`}
        data-hero-image
        autoPlay
        loop
        muted
        playsInline
        preload="metadata"
        onLoadedData={() => setHasVideoFrame(true)}
        aria-hidden="true"
      >
        <source src={heroVideo} type="video/mp4" />
      </video>

    </div>
  );
};

export default HeroMedia;
