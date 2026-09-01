import { useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import styles from "./ProjectConcept.module.css";

gsap.registerPlugin(ScrollTrigger);

const ProjectConceptEffects = ({ sectionRef, stageRef }) => {
  useEffect(() => {
    const section = sectionRef.current;
    const stage = stageRef.current;
    if (!section || !stage) return undefined;
    const desktop = window.matchMedia("(min-width: 961px)");
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    let context;
    let buildFrame = 0;
    let refreshFrame = 0;
    let orderedRefreshTimer = 0;

    const build = () => {
      context?.revert();
      ScrollTrigger.getById("work-project-concept")?.kill();
      if (!desktop.matches || reduced.matches) return;
      context = gsap.context(() => {
        const main = section.querySelector("[data-concept-main]");
        const copy = section.querySelector("[data-concept-copy]");
        const detail = section.querySelector("[data-concept-detail]");
        const annotations = section.querySelectorAll("[data-concept-annotation]");
        const lines = section.querySelectorAll("[data-concept-annotation] ." + styles.annotationLine);
        const horizontalLines = Array.from(lines).filter((line) => line.offsetWidth >= line.offsetHeight);
        const verticalLines = Array.from(lines).filter((line) => line.offsetHeight > line.offsetWidth);

        gsap.set(main, { clipPath: "inset(0 0 100% 0)" });
        gsap.set(copy, { autoAlpha: 0, y: 22 });
        gsap.set(detail, { autoAlpha: 0, y: 20, clipPath: "inset(0 0 100% 0)" });
        gsap.set(annotations, { autoAlpha: 0 });
        gsap.set(horizontalLines, { scaleX: 0, transformOrigin: "left center" });
        gsap.set(verticalLines, { scaleY: 0, transformOrigin: "center bottom" });

        gsap.timeline({
          scrollTrigger: {
            id: "work-project-concept",
            // Pin the stable section wrapper. Pinning the stage while it is also
            // measured as the trigger lets its spacer become part of its own
            // geometry, which moves the completed stage below the viewport.
            trigger: section,
            start: "top top",
            end: () => `+=${window.innerHeight * 1.75}`,
            pin: section,
            pinSpacing: true,
            scrub: 0.8,
            invalidateOnRefresh: true,
          },
        })
          .to(main, { clipPath: "inset(0 0 0% 0)", duration: 0.34, ease: "power2.out" }, 0)
          .to(copy, { autoAlpha: 1, y: 0, duration: 0.22, ease: "power3.out" }, 0.18)
          .to(detail, { autoAlpha: 1, y: 0, clipPath: "inset(0 0 0% 0)", duration: 0.28, ease: "power2.out" }, 0.3)
          .to(horizontalLines, { scaleX: 1, duration: 0.18, stagger: 0.04, ease: "power2.out" }, 0.46)
          .to(verticalLines, { scaleY: 1, duration: 0.18, stagger: 0.04, ease: "power2.out" }, 0.46)
          .to(annotations, { autoAlpha: 1, duration: 0.16, stagger: 0.04, ease: "power2.out" }, 0.5)
          .to({}, { duration: 0.18 }, 0.68)
          .to(detail, { scale: 1.1, duration: 0.22, ease: "power2.inOut" }, 0.86)
          .to({}, { duration: 0.18 }, 1.08);
      }, section);
    };

    buildFrame = requestAnimationFrame(() => {
      build();
      const image = section.querySelector("[data-concept-main] img");
      Promise.all([document.fonts?.ready ?? Promise.resolve(), image?.decode?.().catch(() => undefined) ?? Promise.resolve()]).then(() => {
        refreshFrame = requestAnimationFrame(() => ScrollTrigger.refresh());
      });

      // The project hero creates its own ScrollTrigger after its route-load
      // entrance completes. Re-sort once that pin exists so this following
      // section is measured after the hero spacer, not before it.
      orderedRefreshTimer = window.setTimeout(() => {
        ScrollTrigger.sort();
        ScrollTrigger.refresh();
      }, 1500);
    });
    desktop.addEventListener("change", build);
    reduced.addEventListener("change", build);
    return () => {
      cancelAnimationFrame(buildFrame);
      cancelAnimationFrame(refreshFrame);
      window.clearTimeout(orderedRefreshTimer);
      desktop.removeEventListener("change", build);
      reduced.removeEventListener("change", build);
      context?.revert();
      ScrollTrigger.getById("work-project-concept")?.kill();
    };
  }, [sectionRef, stageRef]);
  return null;
};

export default ProjectConceptEffects;
