import { useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import styles from "./ClosingStatement.module.css";

gsap.registerPlugin(ScrollTrigger);

const ClosingStatementEffects = ({ sectionRef, stageRef }) => {
  useEffect(() => {
    const section = sectionRef.current;
    const stage = stageRef.current;
    if (!section || !stage) return undefined;

    const desktop = window.matchMedia("(min-width: 721px)");
    let context;
    let refreshFrame = 0;

    const build = () => {
      context?.revert();
      ScrollTrigger.getById("about-closing-statement")?.kill();

      if (!desktop.matches) {
        section.classList.remove(styles.motionReady);
        return;
      }

      context = gsap.context(() => {
        const background = section.querySelector("[data-closing-background]");
        const vignette = section.querySelector("[data-closing-vignette]");
        const frame = section.querySelector("[data-closing-frame]");
        const lines = section.querySelectorAll("[data-closing-line]");
        const copy = section.querySelector("[data-closing-copy]");

        section.classList.add(styles.motionReady);
        gsap.set(background, { clipPath: "inset(46% 0 46% 0)", scale: 1.04 });
        gsap.set(vignette, { autoAlpha: 0.48 });
        gsap.set(lines, { autoAlpha: 0, y: 28 });
        gsap.set(copy, { autoAlpha: 0, y: 20 });
        gsap.set(frame, { autoAlpha: 0 });

        const timeline = gsap.timeline({
          scrollTrigger: {
            id: "about-closing-statement",
            trigger: section,
            start: "top top",
            end: () => `+=${window.innerHeight * 1.3}`,
            pin: stage,
            pinSpacing: true,
            scrub: 0.9,
            invalidateOnRefresh: true,
          },
        });

        timeline
          .to(background, { clipPath: "inset(0% 0 0% 0)", scale: 1, duration: 0.48, ease: "power2.out" }, 0)
          .to(vignette, { autoAlpha: 0.78, duration: 0.34, ease: "none" }, 0.1)
          .to(lines, { autoAlpha: 1, y: 0, duration: 0.2, stagger: 0.1, ease: "power2.out" }, 0.52)
          .to(copy, { autoAlpha: 1, y: 0, duration: 0.18, ease: "power2.out" }, 0.78)
          .to(frame, { autoAlpha: 1, duration: 0.2, ease: "none" }, 0.88)
          .to({}, { duration: 0.34 }, 1.1)
          .to(vignette, { autoAlpha: 1, duration: 0.22, ease: "none" }, 1.44);
      }, section);
    };

    build();
    const refresh = () => {
      ScrollTrigger.sort();
      ScrollTrigger.refresh();
    };
    const image = section.querySelector("img");
    Promise.all([document.fonts?.ready ?? Promise.resolve(), image?.decode?.().catch(() => undefined) ?? Promise.resolve()]).then(() => {
      refreshFrame = requestAnimationFrame(refresh);
    });

    desktop.addEventListener("change", build);
    return () => {
      cancelAnimationFrame(refreshFrame);
      desktop.removeEventListener("change", build);
      context?.revert();
      ScrollTrigger.getById("about-closing-statement")?.kill();
      section.classList.remove(styles.motionReady);
    };
  }, [sectionRef, stageRef]);

  return null;
};

export default ClosingStatementEffects;
