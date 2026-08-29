import { useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const PrinciplesEffects = ({ sectionRef, stageRef, onActiveChange }) => {
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return undefined;

    let refreshFrame = 0;
    let alive = true;
    const desktopQuery = window.matchMedia("(min-width: 721px)");
    const setFromProgress = (progress) => {
      if (progress < 0.2) onActiveChange(0);
      else if (progress < 0.4) onActiveChange(1);
      else if (progress < 0.6) onActiveChange(2);
      else if (progress < 0.8) onActiveChange(3);
      else onActiveChange(4);
    };
    const createTimeline = () => {
      ScrollTrigger.getById("about-principles-pinned-stage")?.kill();
      const timeline = gsap.timeline({
        scrollTrigger: {
          id: "about-principles-pinned-stage",
          trigger: section,
          start: "top top",
          end: () => `+=${window.innerHeight * 5.2}`,
          pin: stageRef.current,
          pinSpacing: true,
          scrub: 0.9,
          snap: { snapTo: [0, 0.2, 0.4, 0.6, 0.8, 1], delay: 0.12, duration: { min: 0.2, max: 0.55 }, ease: "power1.inOut" },
          invalidateOnRefresh: true,
          onRefresh: (self) => setFromProgress(self.progress),
        },
      });
      timeline.to({}, { duration: 1, onUpdate: () => setFromProgress(timeline.progress()) });
      return timeline;
    };
    let timeline = desktopQuery.matches ? createTimeline() : undefined;
    const refreshTimeline = () => {
      timeline?.scrollTrigger?.kill();
      timeline?.kill();
      timeline = desktopQuery.matches ? createTimeline() : undefined;
      ScrollTrigger.refresh();
    };
    desktopQuery.addEventListener("change", refreshTimeline);

    const refresh = () => { ScrollTrigger.sort(); ScrollTrigger.refresh(); };
    const images = [...section.querySelectorAll("img")];
    Promise.all([document.fonts?.ready ?? Promise.resolve(), ...images.map((image) => image.decode?.().catch(() => undefined) ?? Promise.resolve())]).then(() => {
      if (alive) refreshFrame = requestAnimationFrame(refresh);
    });

    return () => {
      alive = false;
      cancelAnimationFrame(refreshFrame);
      desktopQuery.removeEventListener("change", refreshTimeline);
      timeline?.scrollTrigger?.kill();
      timeline?.kill();
    };
  }, [onActiveChange, sectionRef, stageRef]);

  return null;
};

export default PrinciplesEffects;
