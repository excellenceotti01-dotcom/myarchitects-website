import { useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const ProjectDetailHeroEffects = ({ sectionRef, stageRef }) => {
  useEffect(() => {
    const section = sectionRef.current;
    const stage = stageRef.current;
    if (!section || !stage) return undefined;

    const desktop = window.matchMedia("(min-width: 961px)");
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let context;
    let refreshFrame = 0;
    let buildFrame = 0;

    const build = () => {
      context?.revert();
      ScrollTrigger.getById("work-project-detail-hero")?.kill();

      // Use the same breakpoint as the layout. A compact layout must keep its
      // completed static state instead of inheriting desktop pin transforms.
      if (!desktop.matches) {
        return;
      }

      context = gsap.context(() => {
        const media = section.querySelector("[data-detail-media]");
        const number = section.querySelector("[data-detail-number]");
        const lines = section.querySelectorAll("[data-detail-title-line]");
        const metadata = section.querySelector("[data-detail-meta]");
        const cue = section.querySelector("[data-detail-cue]");
        const overview = section.querySelector("[data-project-overview]");
        const overviewLines = section.querySelectorAll("[data-overview-statement-line]");
        const overviewParagraphs = section.querySelectorAll("[data-overview-paragraph]");
        const overviewFacts = section.querySelectorAll("[data-overview-fact]");
        const overviewDrafting = section.querySelector("[data-overview-drafting]");
        const image = media?.querySelector("img");
        const entranceTargets = [number, metadata, cue, ...lines];

        const createScrollTimeline = () => {
          const timeline = gsap.timeline({
            scrollTrigger: {
              id: "work-project-detail-hero",
              trigger: section,
              start: "top top",
              end: () => `+=${window.innerHeight * 3.1}`,
              pin: stage,
              pinSpacing: true,
              scrub: 0.9,
              invalidateOnRefresh: true,
            },
          });

          timeline
            .to(cue, { autoAlpha: 0, y: -12, duration: 0.12, ease: "none" }, 0)
            .to(media, { top: 0, right: 0, bottom: 0, left: 0, duration: 0.52, ease: "power2.inOut" }, 0.08)
            .to([number, ...lines, metadata], { autoAlpha: 0, x: -26, duration: 0.36, ease: "power2.inOut" }, 0.16)
            .to({}, { duration: 0.22 }, 0.6)
            .to(overview, { yPercent: 0, duration: 0.38, ease: "power2.inOut" }, 0.82)
            .to(overviewDrafting, { autoAlpha: 1, duration: 0.16, ease: "none" }, 1.04)
            .to(overviewLines, { autoAlpha: 1, y: 0, duration: 0.28, stagger: 0.06, ease: "power3.out" }, 1.1)
            .to(overviewParagraphs, { autoAlpha: 1, y: 0, duration: 0.22, stagger: 0.08, ease: "power2.out" }, 1.32)
            .to(overviewFacts, { autoAlpha: 1, y: 0, duration: 0.14, stagger: 0.035, ease: "power2.out" }, 1.46)
            .to({}, { duration: 0.25 }, 1.72);
          ScrollTrigger.refresh();
        };

        if (reduceMotion.matches) {
          gsap.set(media, { clipPath: "inset(0 0 0 0)" });
          gsap.set(entranceTargets, { autoAlpha: 1, y: 0 });
          gsap.set(overview, { yPercent: 0 });
          gsap.set([overviewLines, overviewParagraphs, overviewFacts, overviewDrafting], { autoAlpha: 1, y: 0 });
          createScrollTimeline();
        } else {
          gsap.set(media, { autoAlpha: 1, clipPath: "inset(0 100% 0 0)" });
          gsap.set(image, { scale: 1.035 });
          gsap.set(number, { autoAlpha: 0, y: 22 });
          gsap.set(lines, { autoAlpha: 0, y: 34 });
          gsap.set(metadata, { autoAlpha: 0, y: 18 });
          gsap.set(cue, { autoAlpha: 0, y: 12 });
          gsap.set(overview, { yPercent: 100 });
          gsap.set(overviewLines, { autoAlpha: 0, y: 30 });
          gsap.set(overviewParagraphs, { autoAlpha: 0, y: 22 });
          gsap.set(overviewFacts, { autoAlpha: 0, y: 16 });
          gsap.set(overviewDrafting, { autoAlpha: 0 });

          gsap.timeline({ onComplete: createScrollTimeline })
            .to(media, { clipPath: "inset(0 0% 0 0)", duration: 0.82, ease: "power3.out" }, 0)
            .to(image, { scale: 1, duration: 1.05, ease: "power2.out" }, 0)
            .to(number, { autoAlpha: 1, y: 0, duration: 0.42, ease: "power2.out" }, 0.24)
            .to(lines, { autoAlpha: 1, y: 0, duration: 0.42, stagger: 0.1, ease: "power3.out" }, 0.4)
            .to(metadata, { autoAlpha: 1, y: 0, duration: 0.3, ease: "power2.out" }, 0.76)
            .to(cue, { autoAlpha: 1, y: 0, duration: 0.24, ease: "power3.out" }, 1.02);
        }

      }, section);
    };

    // Let React Strict Mode discard its probe mount before this instance owns
    // GSAP state. This prevents its cleanup from killing the live trigger.
    buildFrame = requestAnimationFrame(() => {
      build();
      const mediaImage = section.querySelector("[data-detail-media] img");
      Promise.all([
        document.fonts?.ready ?? Promise.resolve(),
        mediaImage?.decode?.().catch(() => undefined) ?? Promise.resolve(),
      ]).then(() => {
        refreshFrame = requestAnimationFrame(() => {
          ScrollTrigger.sort();
          ScrollTrigger.refresh();
        });
      });
    });

    desktop.addEventListener("change", build);
    reduceMotion.addEventListener("change", build);
    return () => {
      cancelAnimationFrame(refreshFrame);
      cancelAnimationFrame(buildFrame);
      desktop.removeEventListener("change", build);
      reduceMotion.removeEventListener("change", build);
      context?.revert();
      ScrollTrigger.getById("work-project-detail-hero")?.kill();
    };
  }, [sectionRef, stageRef]);

  return null;
};

export default ProjectDetailHeroEffects;
