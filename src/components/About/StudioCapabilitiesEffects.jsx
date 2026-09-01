import { useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import styles from "./StudioCapabilities.module.css";

gsap.registerPlugin(ScrollTrigger);

const StudioCapabilitiesEffects = ({ sectionRef }) => {
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return undefined;

    const desktop = window.matchMedia("(min-width: 721px)");
    let context;
    let refreshFrame = 0;

    const build = () => {
      context?.revert();
      ScrollTrigger.getById("about-studio-capabilities")?.kill();
      if (!desktop.matches) {
        section.classList.remove(styles.motionReady);
        return;
      }

      context = gsap.context(() => {
        const stage = section.querySelector("[data-capabilities-stage]");
        const lines = section.querySelectorAll("[data-capability-line]");
        const copy = section.querySelector("[data-capability-copy]");
        const rows = section.querySelectorAll("[data-capability-row]");
        const dividers = section.querySelectorAll("[data-capability-line-draw]");
        const experience = section.querySelector("[data-capability-experience]");
        const composition = [section.querySelector(`.${styles.intro}`), section.querySelector(`.${styles.ledger}`)];

        section.classList.add(styles.motionReady);
        gsap.set(lines, { autoAlpha: 0, y: 28 });
        gsap.set(copy, { autoAlpha: 0, y: 22 });
        gsap.set(rows, { autoAlpha: 0, y: 22 });
        gsap.set(dividers, { scaleX: 0, transformOrigin: "left center" });
        gsap.set(experience, { autoAlpha: 0, y: 16 });

        gsap.timeline({
          scrollTrigger: {
            id: "about-studio-capabilities",
            trigger: section,
            start: "top top",
            end: () => `+=${window.innerHeight * 1.3}`,
            pin: stage,
            pinSpacing: true,
            scrub: 0.9,
            invalidateOnRefresh: true,
          },
        })
          .to(lines, { autoAlpha: 1, y: 0, duration: 0.28, stagger: 0.1, ease: "power2.out" }, 0)
          .to(copy, { autoAlpha: 1, y: 0, duration: 0.22, ease: "power2.out" }, 0.34)
          .to(rows, { autoAlpha: 1, y: 0, duration: 0.28, stagger: 0.15, ease: "power2.out" }, 0.42)
          .to(dividers, { scaleX: 1, duration: 0.3, stagger: 0.15, ease: "power2.out" }, 0.44)
          .to(experience, { autoAlpha: 1, y: 0, duration: 0.24, ease: "power2.out" }, 1.12)
          .to({}, { duration: 0.36 }, 1.38)
          .to(composition, { y: -24, autoAlpha: 0.65, duration: 0.28, ease: "power1.inOut" }, 1.74);
      }, section);
    };

    build();
    Promise.resolve(document.fonts?.ready).then(() => { refreshFrame = requestAnimationFrame(() => ScrollTrigger.refresh()); });
    desktop.addEventListener("change", build);
    return () => {
      cancelAnimationFrame(refreshFrame);
      desktop.removeEventListener("change", build);
      context?.revert();
      ScrollTrigger.getById("about-studio-capabilities")?.kill();
      section.classList.remove(styles.motionReady);
    };
  }, [sectionRef]);

  return null;
};

export default StudioCapabilitiesEffects;
