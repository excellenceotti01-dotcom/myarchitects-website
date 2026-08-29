import { useLayoutEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const AboutHeroEffects = ({ heroRef, videoReady }) => {
  useLayoutEffect(() => {
    const hero = heroRef.current;
    if (!hero || !videoReady || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return undefined;

    const context = gsap.context(() => {
      const text = hero.querySelector("[data-about-mask-text]");
      const aperture = hero.querySelector("[data-about-aperture]");
      const heading = hero.querySelector("[data-about-heading]");
      const copy = hero.querySelector("[data-about-copy]");
      const indicator = hero.querySelector("[data-about-scroll]");
      const vignette = hero.querySelector("[data-about-vignette]");

      gsap.set([heading, copy, indicator], { clearProps: "all" });
      gsap.set(aperture, { attr: { x: 800, y: 450, width: 0, height: 0 } });
      gsap.set(vignette, { autoAlpha: 0 });

      gsap.timeline({
        scrollTrigger: { trigger: hero, start: "top top", end: "bottom bottom", scrub: 0.55, invalidateOnRefresh: true },
      })
        .to(text, { scale: 2.7, y: -55, transformOrigin: "50% 50%", ease: "none" }, 0)
        .to(copy, { autoAlpha: 0, x: 42, ease: "none" }, 0)
        .to(indicator, { autoAlpha: 0, ease: "none" }, 0)
        .to(text, { autoAlpha: 0, ease: "none" }, 0.38)
        .to(aperture, { attr: { x: 530, y: 300, width: 540, height: 300 }, ease: "none" }, 0.32)
        .to(aperture, { attr: { x: 0, y: 0, width: 1600, height: 900 }, duration: 0.28, ease: "none" }, 0.62)
        .to(vignette, { autoAlpha: 1, duration: 0.28, ease: "none" }, 0.62)
        // Retain the completed edge-to-edge video state before sticky release.
        .to({}, { duration: 0.55 }, 0.9);
    }, hero);

    return () => context.revert();
  }, [heroRef, videoReady]);

  return null;
};

export default AboutHeroEffects;
