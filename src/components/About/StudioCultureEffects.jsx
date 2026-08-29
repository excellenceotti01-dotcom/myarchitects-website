import { useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import styles from "./StudioCulture.module.css";

gsap.registerPlugin(ScrollTrigger);

const StudioCultureEffects = ({ sectionRef, stageRef }) => {
  useEffect(() => {
    const section = sectionRef.current;
    const stage = stageRef.current;
    if (!section || !stage) return undefined;

    const desktop = window.matchMedia("(min-width: 721px)");
    let context;
    let refreshFrame = 0;

    const build = () => {
      context?.revert();
      ScrollTrigger.getById("about-studio-culture")?.kill();

      if (!desktop.matches) {
        section.classList.remove(styles.motionReady);
        return;
      }

      context = gsap.context(() => {
        const background = section.querySelector("[data-culture-stage]");
        const marks = section.querySelector("[data-culture-marks]");
        const lines = section.querySelectorAll("[data-culture-line]");
        const copy = section.querySelector("[data-culture-copy]");
        const team = section.querySelector("[data-culture-team]");
        const drawing = section.querySelector("[data-culture-drawing]");
        const materials = section.querySelector("[data-culture-materials]");

        section.classList.add(styles.motionReady);
        gsap.set(background, { backgroundColor: "#c9bca8" });
        gsap.set(lines, { yPercent: 112 });
        gsap.set(copy, { autoAlpha: 0, y: 22 });
        gsap.set(team, { autoAlpha: 0, scale: 1.025, clipPath: "inset(100% 0 0 0)" });
        gsap.set(drawing, { autoAlpha: 0, x: -32, y: 18 });
        gsap.set(materials, { autoAlpha: 0, x: 32, y: 18 });
        gsap.set(marks, { autoAlpha: 0.08 });

        const timeline = gsap.timeline({
          scrollTrigger: {
            id: "about-studio-culture",
            trigger: section,
            start: "top top",
            end: () => `+=${window.innerHeight * 1.55}`,
            pin: stage,
            pinSpacing: true,
            scrub: 0.9,
            invalidateOnRefresh: true,
          },
        });

        timeline
          .to(background, { backgroundColor: "#d8cbb8", duration: 0.12, ease: "none" }, 0)
          .to(marks, { autoAlpha: 0.56, duration: 0.14, ease: "none" }, 0.04)
          .to(lines, { yPercent: 0, duration: 0.2, stagger: 0.075, ease: "power3.out" }, 0.1)
          .to(copy, { autoAlpha: 1, y: 0, duration: 0.17, ease: "power2.out" }, 0.26)
          .to(team, { autoAlpha: 1, scale: 1, clipPath: "inset(0% 0 0 0)", duration: 0.28, ease: "power2.out" }, 0.18)
          .to(drawing, { autoAlpha: 1, x: 0, y: 0, duration: 0.18, ease: "power2.out" }, 0.43)
          .to(materials, { autoAlpha: 1, x: 0, y: 0, duration: 0.18, ease: "power2.out" }, 0.48)
          .to({}, { duration: 0.28 }, 0.72);
      }, section);
    };

    build();
    const refresh = () => {
      ScrollTrigger.sort();
      ScrollTrigger.refresh();
    };
    const images = [...section.querySelectorAll("img")];
    Promise.all([document.fonts?.ready ?? Promise.resolve(), ...images.map((image) => image.decode?.().catch(() => undefined) ?? Promise.resolve())]).then(() => {
      refreshFrame = requestAnimationFrame(refresh);
    });

    desktop.addEventListener("change", build);
    return () => {
      cancelAnimationFrame(refreshFrame);
      desktop.removeEventListener("change", build);
      context?.revert();
      ScrollTrigger.getById("about-studio-culture")?.kill();
      section.classList.remove(styles.motionReady);
    };
  }, [sectionRef, stageRef]);

  return null;
};

export default StudioCultureEffects;
