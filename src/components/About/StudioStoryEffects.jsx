import { useLayoutEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import styles from "./StudioStory.module.css";

gsap.registerPlugin(ScrollTrigger);

const StudioStoryEffects = ({ sectionRef }) => {
  useLayoutEffect(() => {
    let section;
    let context;
    let refreshFrame = 0;
    let isActive = true;

    const initialise = () => {
      section = sectionRef.current;
      if (!section || !isActive) return;

      context = gsap.context(() => {
      const stage = section.querySelector("[data-story-stage]");
      const feature = section.querySelector("[data-story-feature]");
      const landscape = section.querySelector("[data-story-landscape]");
      const detail = section.querySelector("[data-story-detail]");
      const headingLines = section.querySelectorAll("[data-story-heading-line]");
      const copy = section.querySelector("[data-story-copy]");
      const marks = section.querySelector("[data-story-marks]");

      section.classList.add(styles.motionReady);
      gsap.set(feature, { autoAlpha: 0, y: 92, scale: 1.06, clipPath: "inset(0 0 100% 0)" });
      gsap.set(landscape, { autoAlpha: 0, x: -42, y: -48, clipPath: "inset(0 100% 0 0)" });
      gsap.set(detail, { autoAlpha: 0, y: 74, clipPath: "inset(100% 0 0 0)" });
      gsap.set(headingLines, { yPercent: 112 });
      gsap.set(copy, { autoAlpha: 0, y: 28 });
      gsap.set(marks, { autoAlpha: 0.18 });

      const timeline = gsap.timeline({
        scrollTrigger: {
          id: "about-studio-story",
          trigger: section,
          start: "top top",
          end: () => `+=${window.innerHeight * 1.3}`,
          pin: stage,
          pinSpacing: true,
          scrub: true,
          invalidateOnRefresh: true,
          refreshPriority: 1,
        },
      });

      timeline
        .addLabel("settle", 0)
        .to(marks, { autoAlpha: 0.58, duration: 0.08, ease: "none" }, "settle")
        .addLabel("featureReveal", 0)
        .to(feature, { autoAlpha: 1, y: 0, scale: 1, clipPath: "inset(0 0 0% 0)", duration: 0.2, ease: "power2.out" }, "featureReveal")
        .addLabel("landscapeReveal", 0.16)
        .to(landscape, { autoAlpha: 1, x: 0, y: 0, clipPath: "inset(0 0% 0 0)", duration: 0.18, ease: "power2.out" }, "landscapeReveal")
        .addLabel("detailReveal", 0.23)
        .to(detail, { autoAlpha: 1, y: 0, clipPath: "inset(0% 0 0 0)", duration: 0.18, ease: "power2.out" }, "detailReveal")
        .addLabel("headlineReveal", 0.34)
        .to(headingLines, { yPercent: 0, duration: 0.16, stagger: 0.08, ease: "power3.out" }, "headlineReveal")
        .addLabel("copyReveal", 0.5)
        .to(copy, { autoAlpha: 1, y: 0, duration: 0.18, ease: "power2.out" }, "copyReveal")
        .addLabel("parallax", 0.62)
        .to(feature, { yPercent: -2.4, duration: 0.2, ease: "none" }, "parallax")
        .to(landscape, { yPercent: -4.5, duration: 0.2, ease: "none" }, "parallax")
        .to(detail, { yPercent: 3.2, duration: 0.2, ease: "none" }, "parallax")
        .addLabel("completedHold", 0.82)
        .to({}, { duration: 0.18 }, "completedHold");
      }, section);

      const refresh = () => {
        ScrollTrigger.sort();
        ScrollTrigger.refresh();
      };
      const images = [...section.querySelectorAll("img")];
      const assetsReady = [document.fonts?.ready ?? Promise.resolve(), ...images.map((image) => image.decode?.().catch(() => undefined) ?? Promise.resolve())];
      Promise.all(assetsReady).then(() => {
        if (isActive) refreshFrame = requestAnimationFrame(refresh);
      });
    };

    const initialiseFrame = requestAnimationFrame(initialise);

    return () => {
      isActive = false;
      cancelAnimationFrame(initialiseFrame);
      cancelAnimationFrame(refreshFrame);
      context?.revert();
      section?.classList.remove(styles.motionReady);
    };
  }, [sectionRef]);

  return null;
};

export default StudioStoryEffects;
