import { useLayoutEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const useAboutStudioEffects = (sectionRef, stageRef) => {
  useLayoutEffect(() => {
    const section = sectionRef.current;
    const stage = stageRef.current;
    if (!section || !stage) return undefined;

    const context = gsap.context(() => {
      const grid = stage.querySelector("[data-about-grid]");
      const upperLine = stage.querySelector("[data-about-upper-line]");
      const lowerLine = stage.querySelector("[data-about-lower-line]");
      const endpoints = gsap.utils.toArray("[data-about-upper-endpoint], [data-about-lower-endpoint]");
      const label = stage.querySelector("[data-about-label]");
      const statementLines = gsap.utils.toArray("[data-about-statement-line]");
      const copy = gsap.utils.toArray("[data-about-copy]");
      const link = stage.querySelector("[data-about-link]");
      const verticalAxis = stage.querySelector('[data-about-compass-axis="vertical"]');
      const horizontalAxis = stage.querySelector('[data-about-compass-axis="horizontal"]');
      const circle = stage.querySelector("[data-about-compass-circle]");
      const extension = stage.querySelector("[data-about-compass-extension]");
      const point = stage.querySelector("[data-about-compass-point]");
      const compassPaths = [verticalAxis, horizontalAxis, circle, extension].filter(Boolean);
      const visibleItems = [label, ...statementLines, ...copy, link].filter(Boolean);

      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        gsap.set(visibleItems, { autoAlpha: 1, x: 0, y: 0, clipPath: "inset(0 0% 0 0)" });
        gsap.set([grid, upperLine, lowerLine], { autoAlpha: 1, scaleX: 1 });
        gsap.set(endpoints, { autoAlpha: 1, scale: 1 });
        gsap.set(compassPaths, { strokeDashoffset: 0 });
        gsap.set(point, { autoAlpha: 1, scale: 1 });
        return;
      }

      gsap.set(grid, { autoAlpha: 0.18 });
      gsap.set([upperLine, lowerLine], { autoAlpha: 1, scaleX: 0, transformOrigin: "left center" });
      gsap.set(endpoints, { autoAlpha: 0, scale: 0.55, transformOrigin: "center" });
      gsap.set(label, { autoAlpha: 0, y: 10 });
      gsap.set(statementLines, { autoAlpha: 0, x: -30, clipPath: "inset(0 100% 0 0)" });
      gsap.set([...copy, link], { autoAlpha: 0, y: 20 });
      gsap.set(compassPaths, { strokeDasharray: 1, strokeDashoffset: 1 });
      gsap.set(point, { autoAlpha: 0, scale: 0, transformOrigin: "center" });

      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: () => `+=${Math.round(window.innerHeight * 1.5)}`,
          pin: true,
          scrub: 0.9,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });

      timeline
        .to(grid, { autoAlpha: 1, duration: 0.16, ease: "none" }, 0.02)
        .to(verticalAxis, { strokeDashoffset: 0, duration: 0.18, ease: "none" }, 0.1)
        .to(horizontalAxis, { strokeDashoffset: 0, duration: 0.15, ease: "none" }, 0.18)
        .to(circle, { strokeDashoffset: 0, duration: 0.22, ease: "none" }, 0.25)
        .to(extension, { strokeDashoffset: 0, duration: 0.12, ease: "none" }, 0.3)
        .to(point, { autoAlpha: 1, scale: 1, duration: 0.1, ease: "power2.out" }, 0.38)
        .to(upperLine, { scaleX: 1, duration: 0.25, ease: "none" }, 0.24)
        .to(endpoints[0], { autoAlpha: 1, scale: 1, duration: 0.12, ease: "power2.out" }, 0.44)
        .to(label, { autoAlpha: 1, y: 0, duration: 0.2, ease: "power3.out" }, 0.4)
        .to(statementLines, { autoAlpha: 1, x: 0, clipPath: "inset(0 0% 0 0)", duration: 0.34, stagger: 0.1, ease: "power3.out" }, 0.48)
        .to(copy[0], { autoAlpha: 1, y: 0, duration: 0.26, ease: "power3.out" }, 0.7)
        .to(copy[1], { autoAlpha: 1, y: 0, duration: 0.26, ease: "power3.out" }, 0.79)
        .to(link, { autoAlpha: 1, y: 0, duration: 0.2, ease: "power3.out" }, 0.89)
        .to(lowerLine, { scaleX: 1, duration: 0.22, ease: "none" }, 0.85)
        .to(endpoints[1], { autoAlpha: 1, scale: 1, duration: 0.12, ease: "power2.out" }, 1.04)
        .addLabel("hold", 1.08)
        .to(link, { autoAlpha: 0, y: -14, duration: 0.14, ease: "none" }, 1.34)
        .to(copy, { autoAlpha: 0, y: -18, duration: 0.18, stagger: 0.05, ease: "none" }, 1.39)
        .to([lowerLine, endpoints[1]], { autoAlpha: 0, scaleX: 0, duration: 0.16, ease: "none" }, 1.48)
        .to(statementLines, { autoAlpha: 0, x: 24, clipPath: "inset(0 0 0 100%)", duration: 0.22, stagger: 0.08, ease: "none" }, 1.54)
        .to(upperLine, { scaleX: 0, duration: 0.16, ease: "none" }, 1.75)
        .to([label, endpoints[0]], { autoAlpha: 0, y: -8, duration: 0.12, ease: "none" }, 1.77)
        .to(point, { autoAlpha: 0, scale: 0, duration: 0.08, ease: "none" }, 1.82)
        .to(circle, { strokeDashoffset: 1, duration: 0.16, ease: "none" }, 1.85)
        .to(horizontalAxis, { strokeDashoffset: 1, duration: 0.12, ease: "none" }, 1.93)
        .to([verticalAxis, extension], { strokeDashoffset: 1, duration: 0.14, ease: "none" }, 1.99);

      Promise.resolve(document.fonts?.ready).then(() => ScrollTrigger.refresh());
    }, section);

    return () => context.revert();
  }, [sectionRef, stageRef]);
};

export default useAboutStudioEffects;
