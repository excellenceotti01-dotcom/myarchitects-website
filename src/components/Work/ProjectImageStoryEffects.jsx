import { useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const ProjectImageStoryEffects = ({ sectionRef, stageRef }) => {
  useEffect(() => {
    const section = sectionRef.current;
    const stage = stageRef.current;
    if (!section || !stage) return undefined;
    const desktop = window.matchMedia("(min-width: 961px)");
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    let context;

    const build = () => {
      context?.revert();
      if (!desktop.matches || reduced.matches) return;
      context = gsap.context(() => {
        const images = gsap.utils.toArray("[data-story-image]");
        const copies = gsap.utils.toArray("[data-story-copy]");
        const counters = gsap.utils.toArray("[data-story-counter]");
        const main = { left: "37.5%", top: "15.4%", width: "62.5%", height: "84.6%" };
        const preview = { left: "0%", top: "82%", width: "35.7%", height: "18%" };

        gsap.set(images, { autoAlpha: 0, ...preview });
        gsap.set(images[0], { autoAlpha: 1, ...main });
        gsap.set(images[1], { autoAlpha: 1, ...preview });
        gsap.set(counters, { autoAlpha: 0 });
        gsap.set(counters[0], { autoAlpha: 1 });
        gsap.set(copies, { autoAlpha: 0, y: 18 });
        gsap.set(copies[0], { autoAlpha: 1, y: 0 });

        const timeline = gsap.timeline({
          scrollTrigger: {
            id: "work-project-image-story",
            trigger: section,
            start: "top top",
            end: () => `+=${Math.round(window.innerHeight * 4.1)}`,
            pin: section,
            pinSpacing: true,
            scrub: 0.85,
            invalidateOnRefresh: true,
          },
        });

        [1, 2, 3].forEach((index, scene) => {
          const at = 0.5 + scene * 0.62;
          timeline
            .to(images[index - 1], { autoAlpha: 0, duration: 0.24, ease: "none" }, at)
            .to(images[index], { autoAlpha: 1, ...main, duration: 0.42, ease: "power2.inOut" }, at)
            .to(counters[index - 1], { autoAlpha: 0, duration: 0.1, ease: "none" }, at)
            .to(counters[index], { autoAlpha: 1, duration: 0.14, ease: "none" }, at + 0.18);
          if (copies[index]) {
            timeline
              .to(copies[index - 1], { autoAlpha: 0, y: -10, duration: 0.2, ease: "none" }, at)
              .to(copies[index], { autoAlpha: 1, y: 0, duration: 0.28, ease: "power2.out" }, at + 0.08);
          }
          if (images[index + 1]) timeline.to(images[index + 1], { autoAlpha: 1, ...preview, duration: 0.28, ease: "power2.out" }, at + 0.18);
          timeline.to({}, { duration: 0.18 }, at + 0.43);
        });
      }, section);
    };

    build();
    const mainImage = section.querySelector("img");
    Promise.all([document.fonts?.ready ?? Promise.resolve(), mainImage?.decode?.().catch(() => undefined) ?? Promise.resolve()])
      .then(() => ScrollTrigger.refresh());
    desktop.addEventListener("change", build);
    reduced.addEventListener("change", build);
    return () => {
      desktop.removeEventListener("change", build);
      reduced.removeEventListener("change", build);
      context?.revert();
      ScrollTrigger.getById("work-project-image-story")?.kill();
    };
  }, [sectionRef, stageRef]);
  return null;
};

export default ProjectImageStoryEffects;
