import { useLayoutEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import Intro from "../Intro/Intro";
import Projects from "../Projects/Projects";
import { introTextMotion } from "../../../hooks/useIntroTextTransition";
import styles from "./SelectedWorkStage.module.css";

gsap.registerPlugin(ScrollTrigger);

const SelectedWorkStage = () => {
  const stageRef = useRef(null);
  const carouselReadinessRef = useRef(false);
  const [carouselReady, setCarouselReady] = useState(false);
  const [reducedMotion] = useState(() => (
    typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches
  ));

  useLayoutEffect(() => {
    const stage = stageRef.current;
    if (!stage || reducedMotion) return undefined;

    const context = gsap.context(() => {
      const spline = stage.querySelector("[data-cinematic-scene]");
      const indicator = stage.querySelector("[data-intro-indicator]");
      const heading = stage.querySelector("[data-intro-heading]");
      const copy = stage.querySelector("[data-intro-copy]");
      const cue = stage.querySelector("[data-intro-cue]");
      const carousel = stage.querySelector("[data-selected-work-carousel]");
      const setCarouselReadiness = (ready) => {
        if (carouselReadinessRef.current === ready) return;
        carouselReadinessRef.current = ready;
        setCarouselReady(ready);
      };

      gsap.set([indicator, heading, copy, cue], { autoAlpha: 1, x: 0, y: 0, pointerEvents: "auto" });
      gsap.set(carousel, { yPercent: 100, pointerEvents: "none" });

      const transition = gsap.timeline({
        scrollTrigger: {
          trigger: stage,
          start: "top top",
          end: () => `+=${window.innerHeight * 1.7}`,
          pin: stage.querySelector(`.${styles.stickyViewport}`),
          scrub: 0.8,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          onUpdate: ({ progress }) => {
            const carouselSettled = progress >= 0.88;
            gsap.set(carousel, { pointerEvents: carouselSettled ? "auto" : "none" });
            setCarouselReadiness(carouselSettled);
          },
        },
      });

      transition
        .addLabel("transition-start", 0.3)
        .to(heading, introTextMotion.exit.heading, "transition-start")
        .to(copy, introTextMotion.exit.description, "transition-start")
        .to(cue, introTextMotion.exit.prompt, "transition-start")
        .to(indicator, introTextMotion.exit.label, "transition-start")
        .to(spline, {
          autoAlpha: 0.04,
          scale: 0.94,
          y: "3vh",
          duration: 0.58,
          ease: "none",
        }, "transition-start")
        .to(carousel, { yPercent: 0, duration: 0.55, ease: "power2.out" }, "transition-start+=0.15");
    }, stage);

    return () => context.revert();
  }, [reducedMotion]);

  return (
    <section ref={stageRef} className={`${styles.stage} ${reducedMotion ? styles.reducedMotion : ""}`} aria-label="Selected work">
      <div className={styles.stickyViewport}>
        <Intro stageMode splineSuspended={reducedMotion} />
        <Projects stageMode interactive={carouselReady || reducedMotion} />
      </div>
    </section>
  );
};

export default SelectedWorkStage;
