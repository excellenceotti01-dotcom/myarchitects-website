import { useLayoutEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const useProcessStageDetailEffects = (sectionRef) => {
  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) return undefined;
    let refreshFrame = 0;

    const context = gsap.context(() => {
      const stage = section.querySelector("[data-process-detail-stage]");
      const copies = gsap.utils.toArray("[data-process-detail-copy]", section);
      const images = gsap.utils.toArray("[data-process-detail-image]", section);
      const markers = gsap.utils.toArray("[data-process-detail-marker]", section);
      const dots = markers.map((marker) => marker.querySelector("i"));
      const line = section.querySelector("[data-process-detail-line]");
      const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      const active = "#f1f0e8";
      const muted = "rgba(241, 240, 232, 0.48)";
      const dotOutline = "rgba(241, 240, 232, 0.4)";

      gsap.set(copies.slice(1), { autoAlpha: 0, y: 20 });
      gsap.set(images.slice(1), { autoAlpha: 0, y: 18 });
      gsap.set(images[0], { autoAlpha: 1, y: 0 });
      gsap.set(copies[0], { autoAlpha: 1, y: 0 });
      gsap.set(markers, { color: muted });
      gsap.set(markers[0], { color: active });
      gsap.set(dots, { backgroundColor: "transparent", borderColor: dotOutline });
      gsap.set(dots[0], { backgroundColor: active, borderColor: active });
      gsap.set(line, { autoAlpha: 1 });

      if (reduced) return;

      const timeline = gsap.timeline({
        scrollTrigger: {
          id: "process-stage-detail",
          trigger: section,
          start: "top top",
          end: () => `+=${Math.round(window.innerHeight * 4.2)}`,
          pin: stage,
          scrub: 0.65,
          pinSpacing: true,
          invalidateOnRefresh: true,
        },
      });

      [1, 2, 3, 4].forEach((index) => {
        const at = 0.34 + ((index - 1) * 0.25);
        timeline
          .to([copies[index - 1], images[index - 1]], { autoAlpha: 0, y: -14, duration: 0.1, ease: "none" }, at)
          .to(images[index], { autoAlpha: 1, y: 0, duration: 0.13, ease: "none" }, at + 0.06)
          .to(copies[index], { autoAlpha: 1, y: 0, duration: 0.12, ease: "none" }, at + 0.1)
          .to(markers[index - 1], { color: muted, duration: 0.06, ease: "none" }, at + 0.06)
          .to(markers[index], { color: active, duration: 0.06, ease: "none" }, at + 0.1)
          .to(dots[index], { backgroundColor: active, borderColor: active, duration: 0.06, ease: "none" }, at + 0.1);
      });

      refreshFrame = requestAnimationFrame(() => ScrollTrigger.refresh());
    }, section);

    return () => { cancelAnimationFrame(refreshFrame); context.revert(); };
  }, [sectionRef]);
};

export default useProcessStageDetailEffects;
