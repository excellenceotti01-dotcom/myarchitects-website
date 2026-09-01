import { useEffect } from "react";
import { gsap } from "gsap";

const WorkHeroEffects = ({ sectionRef }) => {
  useEffect(() => {
    const section = sectionRef.current;
    if (!section || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return undefined;

    const context = gsap.context(() => {
      const lines = section.querySelectorAll("[data-work-line]");
      const copy = section.querySelector("[data-work-copy]");
      const counter = section.querySelector("[data-work-counter]");
      const featured = section.querySelector("[data-work-featured]");
      const caption = section.querySelector("[data-work-caption]");
      const index = section.querySelector("[data-work-index]");

      gsap.set(lines, { autoAlpha: 0, y: 28 });
      gsap.set([copy, counter], { autoAlpha: 0, y: 16 });
      gsap.set(featured, { autoAlpha: 0, clipPath: "inset(0 0 100% 0)" });
      gsap.set(caption, { autoAlpha: 0, y: 12 });
      gsap.set(index, { autoAlpha: 0, y: 14 });
      gsap.timeline()
        .to(lines, { autoAlpha: 1, y: 0, duration: 0.38, stagger: 0.1, ease: "power2.out" }, 0)
        .to(copy, { autoAlpha: 1, y: 0, duration: 0.28, ease: "power2.out" }, 0.28)
        .to(counter, { autoAlpha: 1, y: 0, duration: 0.22, ease: "power2.out" }, 0.39)
        .to(featured, { autoAlpha: 1, clipPath: "inset(0 0 0% 0)", duration: 0.56, ease: "power2.out" }, 0.18)
        .to(caption, { autoAlpha: 1, y: 0, duration: 0.25, ease: "power2.out" }, 0.68)
        .to(index, { autoAlpha: 1, y: 0, duration: 0.34, ease: "power2.out" }, 0.58);
    }, section);
    return () => context.revert();
  }, [sectionRef]);

  return null;
};

export default WorkHeroEffects;
