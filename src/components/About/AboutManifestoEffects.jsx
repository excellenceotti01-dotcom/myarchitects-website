import { useLayoutEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import styles from "./AboutManifesto.module.css";

gsap.registerPlugin(ScrollTrigger);

const AboutManifestoEffects = ({ sectionRef }) => {
  useLayoutEffect(() => {
    let section;
    let context;
    let refreshFrame = 0;
    let isActive = true;

    const initialise = () => {
      section = sectionRef.current;
      if (!section || !isActive) return;

      context = gsap.context(() => {
      const stage = section.querySelector("[data-manifesto-stage]");
      const lines = section.querySelectorAll("[data-manifesto-line]");
      const copy = section.querySelector("[data-manifesto-copy]");
      const linework = section.querySelector("[data-manifesto-linework]");
      const warmTransition = section.querySelector("[data-manifesto-warm-transition]");
      const composition = section.querySelector(`.${styles.composition}`);

      section.classList.add(styles.motionReady);
      gsap.set(lines, { autoAlpha: 0, y: 30, color: "#8f8a81" });
      gsap.set(copy, { autoAlpha: 0, y: 22 });
      gsap.set(linework, { strokeDasharray: 1, strokeDashoffset: 1 });
      gsap.set(warmTransition, { yPercent: 100 });

      const timeline = gsap.timeline({
        scrollTrigger: {
          id: "about-manifesto",
          trigger: section,
          start: "top top",
          end: "bottom bottom",
          scrub: 0.8,
          invalidateOnRefresh: true,
          refreshPriority: 2,
          onEnter: () => stage.classList.add(styles.lightActive),
          onEnterBack: () => {
            stage.classList.add(styles.lightActive);
            section.classList.remove(styles.handoffComplete);
          },
          onLeave: () => section.classList.add(styles.handoffComplete),
          onLeaveBack: () => {
            stage.classList.remove(styles.lightActive);
            section.classList.remove(styles.handoffComplete);
          },
        },
      });

      // Normalized scroll phases: reveal, reading interval, a unified exit, then the warm wipe.
      timeline
        .addLabel("revealStart", 0)
        .to(lines, { autoAlpha: 1, y: 0, color: "#f1eee7", duration: 0.16, stagger: 0.055, ease: "power2.out" }, "revealStart")
        .to(copy, { autoAlpha: 1, y: 0, duration: 0.12, ease: "power2.out" }, 0.18)
        .to(linework, { strokeDashoffset: 0, duration: 0.12, ease: "power1.inOut" }, 0.18)
        .addLabel("readingStart", 0.3)
        .addLabel("exitStart", 0.78)
        .to(composition, { x: () => -window.innerWidth * 0.42, autoAlpha: 0, duration: 0.2, ease: "none" }, "exitStart")
        .addLabel("warmRise", 0.76)
        .to(warmTransition, { yPercent: 0, duration: 0.22, ease: "none" }, "warmRise")
        .addLabel("coveredHold", 0.98)
        .to({}, { duration: 0.02 }, "coveredHold");
      }, section);

      const refresh = () => ScrollTrigger.refresh();
      refreshFrame = requestAnimationFrame(refresh);
      document.fonts?.ready.then(() => {
        if (isActive) refresh();
      });
    };

    const initialiseFrame = requestAnimationFrame(initialise);

    return () => {
      isActive = false;
      cancelAnimationFrame(initialiseFrame);
      cancelAnimationFrame(refreshFrame);
      context?.revert();
      section?.classList.remove(styles.motionReady);
    };
  }, [sectionRef]);

  return null;
};

export default AboutManifestoEffects;
