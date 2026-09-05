import { useEffect, useId, useRef, useState } from "react";

import AboutHeroEffects from "./AboutHeroEffects";
import styles from "./AboutHero.module.css";
import heroVideo from "../../assets/videos/Hero.video.mp4";

const AboutHero = () => {
  const heroRef = useRef(null);
  const [videoReady, setVideoReady] = useState(false);
  const [videoFailed, setVideoFailed] = useState(false);
  const maskId = `about-heading-mask-${useId().replace(/:/g, "")}`;

  useEffect(() => {
    const timeout = window.setTimeout(() => {
      if (!videoReady) setVideoFailed(true);
    }, 5000);
    return () => window.clearTimeout(timeout);
  }, [videoReady]);

  return (
    <section ref={heroRef} className={styles.hero} aria-labelledby="about-heading" data-navbar-theme="dark">
      <div className={styles.stage}>
        <div className={styles.content}>
          <h1 id="about-heading" className={`${styles.heading} ${videoFailed && !videoReady ? styles.headingFailure : ""}`} data-about-heading>
            <span>WE DESIGN FOR</span>
            <span>HOW LIFE UNFOLDS.</span>
          </h1>
          <svg className={`${styles.maskedHeading} ${videoReady ? styles.maskedHeadingReady : ""}`} data-about-video-surface viewBox="0 0 1600 900" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
            <defs>
              <mask id={maskId} maskUnits="userSpaceOnUse" x="0" y="0" width="1600" height="900">
                <rect width="1600" height="900" fill="black" />
                <g data-about-mask-text>
                  <text className={styles.maskText} x="800" y="410" textAnchor="middle" textLength="1260" lengthAdjust="spacingAndGlyphs" fill="white">WE DESIGN FOR</text>
                  <text className={styles.maskText} x="800" y="600" textAnchor="middle" textLength="1260" lengthAdjust="spacingAndGlyphs" fill="white">HOW LIFE UNFOLDS.</text>
                </g>
                <rect data-about-aperture x="800" y="450" width="0" height="0" fill="white" />
              </mask>
            </defs>
            <foreignObject x="0" y="0" width="100%" height="100%" mask={`url(#${maskId})`}>
              <video className={styles.maskVideo} autoPlay loop muted playsInline preload="auto" onLoadedData={(event) => {
                if (event.currentTarget.videoWidth > 0 && event.currentTarget.videoHeight > 0) {
                  setVideoFailed(false);
                  setVideoReady(true);
                }
              }} onError={() => setVideoFailed(true)} aria-hidden="true">
                <source src={heroVideo} type="video/mp4" />
              </video>
            </foreignObject>
          </svg>
          <div className={styles.videoVignette} data-about-vignette aria-hidden="true" />
          <p className={styles.copy} data-about-copy>
            My Architects is a design-led architecture and construction studio shaping thoughtful, enduring spaces through context, collaboration, and purpose, bringing each vision seamlessly from concept to completion.
          </p>
          <div className={styles.scrollIndicator} data-about-scroll aria-hidden="true"><span /></div>
        </div>
      </div>
      <AboutHeroEffects heroRef={heroRef} videoReady={videoReady} />
    </section>
  );
};

export default AboutHero;
