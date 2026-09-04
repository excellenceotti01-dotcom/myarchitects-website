import { useLayoutEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const useProcessClosingEffects = (sectionRef) => {
  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) return undefined;
    let refreshFrame = 0;

    const context = gsap.context(() => {
      const stage = section.querySelector("[data-closing-stage]");
      const media = section.querySelector("[data-closing-media]");
      const lines = gsap.utils.toArray("[data-closing-line]", section);
      const copy = section.querySelector("[data-closing-copy]");
      const points = gsap.utils.toArray("[data-closing-point]", section);

      const setInitial = () => {
        gsap.set(media, { autoAlpha: 0, scale: 1.02, transformOrigin: "50% 50%" });
        gsap.set(lines, { yPercent: 112 });
        gsap.set(copy, { autoAlpha: 0, y: 22 });
        gsap.set(points, { autoAlpha: 0, y: 18 });
      };

      const revealed = () => {
        gsap.set([media, copy, ...points], { autoAlpha: 1, y: 0, scale: 1 });
        gsap.set(lines, { yPercent: 0 });
      };

      const media$ = gsap.matchMedia();

      media$.add("(prefers-reduced-motion: reduce)", revealed);

      media$.add("(min-width: 1101px) and (prefers-reduced-motion: no-preference)", () => {
        setInitial();

        const timeline = gsap.timeline({
          scrollTrigger: {
            id: "process-closing",
            trigger: section,
            start: "top top",
            end: () => `+=${Math.round(window.innerHeight * 1.7)}`,
            pin: stage,
            scrub: 0.65,
            pinSpacing: true,
            invalidateOnRefresh: true,
          },
        });

        timeline
          .to(media, { autoAlpha: 1, scale: 1, duration: 0.3, ease: "power2.out" }, 0)
          .to(lines, { yPercent: 0, duration: 0.22, stagger: 0.06, ease: "power3.out" }, 0.22)
          .to(copy, { autoAlpha: 1, y: 0, duration: 0.2, ease: "power2.out" }, 0.44)
          .to(points, { autoAlpha: 1, y: 0, duration: 0.2, stagger: 0.06, ease: "power2.out" }, 0.58)
          .to({}, { duration: 0.3 });
      });

      media$.add("(max-width: 1100px) and (prefers-reduced-motion: no-preference)", () => {
        setInitial();

        gsap.timeline({ scrollTrigger: { id: "process-closing", trigger: section, start: "top 74%", once: true } })
          .to(media, { autoAlpha: 1, scale: 1, duration: 1.1, ease: "power2.out" }, 0)
          .to(lines, { yPercent: 0, duration: 0.9, stagger: 0.08, ease: "power3.out" }, 0.12)
          .to(copy, { autoAlpha: 1, y: 0, duration: 0.8, ease: "power2.out" }, 0.42)
          .to(points, { autoAlpha: 1, y: 0, duration: 0.8, stagger: 0.09, ease: "power2.out" }, 0.58);
      });

      refreshFrame = requestAnimationFrame(() => ScrollTrigger.refresh());
    }, section);

    return () => { cancelAnimationFrame(refreshFrame); context.revert(); };
  }, [sectionRef]);
};

export default useProcessClosingEffects;
