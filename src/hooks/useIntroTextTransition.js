import { useLayoutEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export const introTextMotion = {
  entrance: {
    label: { autoAlpha: 0, x: -18 },
    heading: { autoAlpha: 0, y: 60 },
    description: { autoAlpha: 0, y: 20 },
    prompt: { autoAlpha: 0, y: 12 },
  },
  exit: {
    label: { autoAlpha: 0, x: -54, duration: 0.45, ease: "none" },
    heading: { autoAlpha: 0, y: -60, duration: 0.45, ease: "none" },
    description: { autoAlpha: 0, y: -40, duration: 0.45, ease: "none" },
    prompt: { autoAlpha: 0, y: -28, duration: 0.45, ease: "none" },
  },
};

const getElements = (section, selectors) => Object.fromEntries(
  Object.entries(selectors).map(([role, selector]) => [role, selector ? section.querySelector(selector) : null]),
);

// Each standalone intro owns its text with one reversible scrubbed timeline.
// Its explicit visible base state means scrollbar jumps cannot depend on a
// one-time IntersectionObserver entrance having previously fired.
export const useIntroTextTransition = (sectionRef, selectors) => {
  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) return undefined;

    const context = gsap.context(() => {
      const { label, heading, description, prompt } = getElements(section, selectors);
      const textItems = [label, heading, description, prompt].filter(Boolean);

      gsap.set(textItems, { autoAlpha: 1, x: 0, y: 0, pointerEvents: "auto" });

      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: () => `+=${window.innerHeight * 1.7}`,
          pin: true,
          scrub: 0.8,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });

      timeline.addLabel("text-exit", 0.3);
      if (heading) timeline.to(heading, introTextMotion.exit.heading, "text-exit");
      if (description) timeline.to(description, introTextMotion.exit.description, "text-exit");
      if (prompt) timeline.to(prompt, introTextMotion.exit.prompt, "text-exit");
      if (label) timeline.to(label, introTextMotion.exit.label, "text-exit");
      timeline.set(textItems, { autoAlpha: 0, pointerEvents: "none" }, "text-exit+=0.45");
    }, section);

    return () => context.revert();
  }, [sectionRef, selectors]);
};
