import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const ProjectIndexEffects = ({ filter, page }) => {
  const initializedRef = useRef(false);

  useEffect(() => {
    const section = document.querySelector("[data-project-index]");
    const stage = section?.querySelector("[data-index-stage]");
    if (!section || !stage || !window.matchMedia("(min-width: 961px)").matches || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return undefined;

    const context = gsap.context(() => {
      const intro = section.querySelector("[data-index-intro]");
      const filters = section.querySelector("[data-index-filters]");
      const projects = section.querySelectorAll("[data-index-project]");
      gsap.set(intro, { autoAlpha: 0, y: 20 });
      gsap.set(filters, { autoAlpha: 0, y: 12 });
      gsap.set(projects, { autoAlpha: 0, y: 16, clipPath: "inset(8% 0 0 0)" });

      gsap.timeline({
        scrollTrigger: {
          id: "work-project-index-board",
          trigger: section,
          start: "top top",
          end: () => `+=${window.innerHeight * 0.48}`,
          pin: stage,
          pinSpacing: true,
          scrub: 0.8,
          invalidateOnRefresh: true,
        },
      })
        .to(intro, { autoAlpha: 1, y: 0, duration: 0.22, ease: "power2.out" }, 0)
        .to(filters, { autoAlpha: 1, y: 0, duration: 0.16, ease: "power2.out" }, 0.12)
        .to(projects, { autoAlpha: 1, y: 0, clipPath: "inset(0% 0 0 0)", duration: 0.28, stagger: 0.055, ease: "power2.out" }, 0.2)
        .to({}, { duration: 0.34 }, 0.62);
    }, section);

    const refreshFrame = requestAnimationFrame(() => ScrollTrigger.refresh());
    return () => {
      cancelAnimationFrame(refreshFrame);
      context.revert();
      ScrollTrigger.getById("work-project-index-board")?.kill();
    };
  }, []);

  useEffect(() => {
    if (!initializedRef.current) {
      initializedRef.current = true;
      return;
    }
    const section = document.querySelector("[data-project-index]");
    const projects = section?.querySelectorAll("[data-index-project]");
    if (!projects?.length || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return undefined;
    const context = gsap.context(() => {
      gsap.fromTo(projects, { autoAlpha: 0.2, y: -5 }, { autoAlpha: 1, y: 0, duration: 0.28, stagger: 0.045, ease: "power2.out", clearProps: "clipPath" });
    }, section);
    return () => context.revert();
  }, [filter, page]);

  return null;
};

export default ProjectIndexEffects;
