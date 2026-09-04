import { useLayoutEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const setDashed = (path) => {
  const length = path?.getTotalLength?.();
  if (!Number.isFinite(length) || length <= 0) return;
  gsap.set(path, { strokeDasharray: length, strokeDashoffset: length });
};

const useProcessHeroEffects = (sectionRef) => {
  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) return undefined;

    let refreshFrame = 0;
    let active = true;

    const context = gsap.context(() => {
      const stage = section.querySelector("[data-process-stage]");
      const label = section.querySelector("[data-process-label]");
      const words = gsap.utils.toArray("[data-process-headline-word]", section);
      const copy = section.querySelector("[data-process-copy]");
      const planPaths = gsap.utils.toArray("path[data-process-plan-path]", section);
      const planCircles = gsap.utils.toArray("[data-process-plan-circle]", section);
      const mainPath = section.querySelector("[data-process-main-path]");
      const nodes = gsap.utils.toArray("[data-process-node]", section);
      const measurePaths = gsap.utils.toArray("[data-process-measure-path], [data-process-detail-path]", section);
      const details = section.querySelector("[data-process-details]");
      const secondary = section.querySelector("[data-process-secondary]");
      const stageItems = gsap.utils.toArray("[data-process-stage-item]", section);
      const stageBars = gsap.utils.toArray("[data-process-stage-progress]", section);
      const scrollCue = section.querySelector("[data-process-scroll-cue]");
      const scrollArrow = scrollCue?.querySelector("i");
      const overview = section.querySelector("[data-process-overview]");
      const overviewLabel = section.querySelector("[data-process-overview-label]");
      const overviewLines = gsap.utils.toArray("[data-process-overview-line]", section);
      const overviewCopy = section.querySelector("[data-process-overview-copy]");
      const overviewRows = gsap.utils.toArray("[data-process-overview-row]", section);
      const overviewRules = gsap.utils.toArray("[data-process-overview-rule]", section);
      const overviewPath = section.querySelector("[data-process-overview-path]");
      const overviewCrosshair = section.querySelector("[data-process-overview-crosshair]");
      const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      const activeColor = "#f1f0e8";
      const mutedColor = "rgba(241, 240, 232, 0.62)";

      // Set the full dash offset before the first paint. Only paths receive dash
      // measurements; circular drafting marks reveal separately by opacity.
      planPaths.forEach(setDashed);
      setDashed(mainPath);
      measurePaths.forEach(setDashed);
      setDashed(overviewPath);

      gsap.set([label, ...words, copy, scrollCue], { autoAlpha: 0, y: 24 });
      gsap.set(words, { clipPath: "inset(0 0 100% 0)" });
      gsap.set(planCircles, { autoAlpha: 0 });
      gsap.set(nodes, { autoAlpha: 0, scale: 0.68, transformOrigin: "center" });
      gsap.set([details, secondary], { autoAlpha: 0 });
      gsap.set(stageItems, { autoAlpha: 0.86, y: 0, color: mutedColor });
      gsap.set(stageItems[0], { color: activeColor });
      gsap.set(stageBars, { scaleX: 0, transformOrigin: "left center" });
      gsap.set([overviewLabel, ...overviewLines, overviewCopy, ...overviewRows, overviewCrosshair], { autoAlpha: 0, y: 24 });
      gsap.set(overviewLines, { clipPath: "inset(0 0 100% 0)" });
      gsap.set(overviewRules, { scaleX: 0, transformOrigin: "left center" });

      const settle = () => {
        gsap.set([label, ...words, copy, scrollCue, details, secondary, ...stageItems, ...nodes, ...planCircles], {
          autoAlpha: 1,
          y: 0,
          scale: 1,
          clipPath: "inset(0 0 0% 0)",
        });
        gsap.set([...planPaths, mainPath, ...measurePaths], { strokeDashoffset: 0 });
        gsap.set(stageBars, { scaleX: 0 });
        gsap.set(stageBars[4], { scaleX: 1 });
        gsap.set(stageItems, { color: mutedColor });
        gsap.set(stageItems[4], { color: activeColor });
        gsap.set(overview, { yPercent: 0 });
        gsap.set([overviewLabel, ...overviewLines, overviewCopy, ...overviewRows, overviewCrosshair], { autoAlpha: 1, y: 0, clipPath: "inset(0 0 0% 0)" });
        gsap.set(overviewRules, { scaleX: 1 });
        gsap.set(overviewPath, { strokeDashoffset: 0 });
      };

      if (reducedMotion) {
        settle();
        return;
      }

      const entrance = gsap.timeline({ defaults: { ease: "power3.out" } });
      entrance
        .to(label, { autoAlpha: 1, y: 0, duration: 0.28 })
        .to(words, { autoAlpha: 1, y: 0, clipPath: "inset(0 0 0% 0)", duration: 0.42, stagger: 0.16 }, 0.12)
        .to(copy, { autoAlpha: 1, y: 0, duration: 0.42 }, 1.26)
        .to(stageItems, { autoAlpha: 1, duration: 0.24, stagger: 0.05 }, 1.3)
        .to(scrollCue, { autoAlpha: 1, y: 0, duration: 0.28 }, 1.42);

      if (scrollArrow) {
        gsap.to(scrollArrow, { y: 5, autoAlpha: 0.52, duration: 1.45, ease: "sine.inOut", repeat: -1, yoyo: true });
      }

      const drawing = gsap.timeline({
        scrollTrigger: {
          id: "process-hero-drawing",
          trigger: section,
          start: "top top",
          end: () => `+=${Math.round(window.innerHeight * 4.55)}`,
          pin: stage,
          pinSpacing: true,
          scrub: 0.65,
          invalidateOnRefresh: true,
          anticipatePin: 1,
          // Keep the panel tied to this single pinned Hero trigger.
          onUpdate: (self) => {
            const panelProgress = gsap.utils.clamp(0, 1, (self.progress - 0.54) / 0.24);
            overview.style.transform = `translateY(${100 * (1 - panelProgress)}%)`;
          },
        },
      });

      const planBatches = [planPaths.slice(0, 4), planPaths.slice(4, 8), planPaths.slice(8)];
      planBatches.forEach((paths, index) => {
        drawing.to(paths, { strokeDashoffset: 0, duration: 0.15, stagger: 0.025, ease: "none" }, 0.12 + (index * 0.11));
      });

      drawing
        .to(planCircles, { autoAlpha: 1, duration: 0.12, stagger: 0.05, ease: "none" }, 0.34)
        .to(mainPath, { strokeDashoffset: 0, duration: 0.38, ease: "none" }, 0.42);

      const nodeTimes = [0.47, 0.57, 0.67, 0.77, 0.87];
      nodeTimes.forEach((at, index) => {
        const currentItem = stageItems[index];
        const previousItem = stageItems[index - 1];
        const currentBar = stageBars[index];
        drawing
          .to(nodes[index], { autoAlpha: 1, scale: 1.18, duration: 0.038, ease: "power2.out" }, at)
          .to(nodes[index], { scale: 1, duration: 0.052, ease: "power2.inOut" }, at + 0.038)
          .to(currentItem, { color: activeColor, duration: 0.02, ease: "none" }, at)
          .to(currentBar, { scaleX: 1, duration: 0.072, ease: "none" }, at + 0.012);

        if (previousItem) drawing.to(previousItem, { color: mutedColor, duration: 0.02, ease: "none" }, at);
      });

      drawing
        .to([secondary, details], { autoAlpha: 1, duration: 0.08, ease: "none" }, 0.72)
        .to(measurePaths, { strokeDashoffset: 0, duration: 0.16, stagger: 0.012, ease: "none" }, 0.74)
        .to(stageItems, { autoAlpha: 1, duration: 0.08, ease: "none" }, 0.82)
        // Stage 05 stays active through the handoff; it is never reset to Stage 01.
        .to({}, { duration: 0.16 }, 0.98)
        .to([label, ...words, copy, scrollCue], { autoAlpha: 0, y: -22, duration: 0.12, ease: "none" }, 1.16)
        .to(overviewLabel, { autoAlpha: 1, y: 0, duration: 0.09, ease: "none" }, 1.54)
        .to(overviewLines, { autoAlpha: 1, y: 0, clipPath: "inset(0 0 0% 0)", duration: 0.13, stagger: 0.07, ease: "none" }, 1.61)
        .to(overviewCopy, { autoAlpha: 1, y: 0, duration: 0.12, ease: "none" }, 1.83)
        .to(overviewRows, { autoAlpha: 1, y: 0, duration: 0.09, stagger: 0.06, ease: "none" }, 1.91)
        .to(overviewRules, { scaleX: 1, duration: 0.1, stagger: 0.06, ease: "none" }, 1.91)
        .to(overviewPath, { strokeDashoffset: 0, duration: 0.27, ease: "none" }, 2.01)
        .to(overviewCrosshair, { autoAlpha: 1, y: 0, duration: 0.08, ease: "none" }, 2.17)
        .to({}, { duration: 0.18 }, 2.25);

      refreshFrame = requestAnimationFrame(() => ScrollTrigger.refresh());
      document.fonts?.ready.then(() => {
        if (active) ScrollTrigger.refresh();
      });
    }, section);

    return () => {
      active = false;
      cancelAnimationFrame(refreshFrame);
      context.revert();
    };
  }, [sectionRef]);
};

export default useProcessHeroEffects;
