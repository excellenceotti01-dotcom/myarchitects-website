import { useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import { processStages } from "../../../data/process.data";
import { introTextMotion } from "../../../hooks/useIntroTextTransition";
import MYArchitectsCharacterField from "../MYArchitectsCharacterField/MYArchitectsCharacterField";
import styles from "./Process.module.css";

gsap.registerPlugin(ScrollTrigger);

const ticks = Array.from({ length: 55 }, (_, index) => index);
const getWatchPoint = (angle, radius) => {
  const radians = (angle * Math.PI) / 180;
  return { x: 500 + Math.sin(radians) * radius, y: 500 - Math.cos(radians) * radius };
};

const ProcessNode = ({ stage, index }) => {
  const angle = index * 72;
  const nodeRadius = 14;
  const anchor = getWatchPoint(angle, 410);
  const exterior = getWatchPoint(angle, 452);
  const connectorEnd = getWatchPoint(angle, 452 - nodeRadius);
  const label = getWatchPoint(angle, 482);
  const textAnchor = Math.abs(exterior.x - 500) < 28 ? "middle" : exterior.x > 500 ? "start" : "end";
  const labelOffset = textAnchor === "middle" ? 0 : exterior.x > 500 ? 12 : -12;

  return (
    <g data-process-node className={styles.watchNode}>
      <line className={styles.nodeConnector} data-process-node-connector x1={anchor.x} y1={anchor.y} x2={connectorEnd.x} y2={connectorEnd.y} />
      <circle className={styles.nodeAnchor} data-process-node-anchor cx={anchor.x} cy={anchor.y} r="5" />
      <circle className={styles.nodeHalo} data-process-node-halo cx={exterior.x} cy={exterior.y} r="22" />
      <circle className={styles.nodeExterior} data-process-node-exterior cx={exterior.x} cy={exterior.y} r={nodeRadius} />
      <text className={styles.nodeWatchLabel} x={label.x + labelOffset} y={label.y} textAnchor={textAnchor} dominantBaseline="middle">
        <tspan>{stage.number}</tspan><tspan dx="7">{stage.title}</tspan>
      </text>
    </g>
  );
};

const Process = () => {
  const sectionRef = useRef(null);
  const stageRef = useRef(null);
  const introductionRef = useRef(null);
  const systemRef = useRef(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const introduction = introductionRef.current;
    const system = systemRef.current;
    const stage = stageRef.current;

    if (!section || !introduction || !system || !stage) return undefined;

    const context = gsap.context(() => {
      const introIndicator = introduction.querySelector("[data-process-indicator]");
      const introHeading = introduction.querySelector("[data-process-heading]");
      const introCopy = introduction.querySelector("[data-process-copy]");
      const introDirectional = introduction.querySelector("[data-process-directional]");
      const crossword = introduction.querySelector("[data-process-crossword]");
      const ring = system.querySelector("[data-process-ring]");
      const construction = system.querySelector("[data-process-construction]");
      const innerMechanism = system.querySelector("[data-process-inner-mechanism]");
      const processHand = system.querySelector("[data-process-hand]");
      const progressMarker = system.querySelector("[data-process-progress-marker]");
      const transitionLine = system.querySelector("[data-process-transition-line]");
      const nodes = gsap.utils.toArray("[data-process-node]");
      const content = gsap.utils.toArray("[data-process-content]");
      const tickMarks = gsap.utils.toArray("[data-process-tick]");

      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        gsap.set([introIndicator, introHeading, introCopy, introDirectional, ...content], { autoAlpha: 1, y: 0, x: 0 });
        nodes[0]?.classList.add(styles.active);
        gsap.set(system, { autoAlpha: 0, yPercent: 100 });
        gsap.timeline({
          scrollTrigger: {
            trigger: stage,
            start: "top top",
            end: "+=240%",
            pin: true,
            scrub: true,
            anticipatePin: 1,
          },
        })
          .to([introIndicator, introHeading, introCopy, introDirectional], { autoAlpha: 0, duration: 0.45, ease: "none" }, 0.15)
          .to(system, { autoAlpha: 1, yPercent: 0, duration: 0.35, ease: "none" }, 0.6);
        return;
      }

      gsap.set([introIndicator, introHeading, introCopy, introDirectional], { autoAlpha: 1, x: 0, y: 0, pointerEvents: "auto" });
      gsap.set(system, { autoAlpha: 0, yPercent: 105, pointerEvents: "none" });
      gsap.set(content, { autoAlpha: 0, y: 16 });
      nodes.forEach((node) => node.classList.remove(styles.active, styles.completed));

      let activeIndex = -1;
      let activeTick = -1;
      const setActiveStage = (nextIndex, animateLock) => {
        if (nextIndex === activeIndex) return;

        nodes.forEach((node, index) => {
          node.classList.toggle(styles.completed, index < nextIndex);
          node.classList.toggle(styles.active, index === nextIndex);
        });
        const exterior = nodes[nextIndex]?.querySelector("[data-process-node-exterior]");
        const halo = nodes[nextIndex]?.querySelector("[data-process-node-halo]");
        const connector = nodes[nextIndex]?.querySelector("[data-process-node-connector]");
        const anchor = nodes[nextIndex]?.querySelector("[data-process-node-anchor]");

        if (animateLock) {
          gsap.fromTo(exterior, { scale: 1.46, transformOrigin: "50% 50%" }, { scale: 1, duration: 0.36, ease: "power3.out", overwrite: true });
          gsap.fromTo(halo, { autoAlpha: 1, scale: 1.34, transformOrigin: "50% 50%" }, { autoAlpha: 0.48, scale: 1, duration: 0.36, ease: "power3.out", overwrite: true });
          gsap.fromTo([connector, anchor], { opacity: 1 }, { opacity: 0.88, duration: 0.36, ease: "power2.out", overwrite: true });
          gsap.fromTo(processHand, { rotation: -7, transformOrigin: "500px 500px" }, { rotation: 0, duration: 0.34, ease: "power3.out", overwrite: true });
        }

        activeIndex = nextIndex;
      };

      const updateTicks = (progress) => {
        const nextActiveTick = progress < 0
          ? -1
          : Math.min(tickMarks.length - 1, Math.floor(progress * (tickMarks.length - 1)));

        if (nextActiveTick === activeTick) return;

        tickMarks.forEach((tick, index) => {
          tick.classList.toggle(styles.tickActive, index <= nextActiveTick);
          tick.classList.toggle(styles.tickCurrent, index === nextActiveTick);
        });
        activeTick = nextActiveTick;
      };

      const processProgressStart = 0.82;
      const processProgressEnd = 3.82;
      const processExitStart = 4.16;
      let previousTimelineTime = 0;
      const renderProcessState = (timelineTime) => {
        if (timelineTime < processProgressStart) {
          gsap.set(content, { autoAlpha: 0, y: 16 });
          nodes.forEach((node) => node.classList.remove(styles.active, styles.completed));
          updateTicks(-1);
          activeIndex = -1;
          return;
        }

        if (timelineTime >= processExitStart) {
          gsap.set(content, { autoAlpha: 0, y: -20 });
          return;
        }

        const lifecycleProgress = Math.max(0, Math.min(1, (timelineTime - processProgressStart) / (processProgressEnd - processProgressStart)));
        const nextStage = Math.min(processStages.length - 1, Math.floor(lifecycleProgress * processStages.length));
        const shouldAnimateLock = activeIndex >= 0 && Math.abs(timelineTime - previousTimelineTime) < 0.12;

        gsap.set(innerMechanism, { rotation: lifecycleProgress * 28, transformOrigin: "50% 50%" });
        gsap.set(progressMarker, { rotation: lifecycleProgress * 288, transformOrigin: "50% 50%" });
        updateTicks(lifecycleProgress);
        setActiveStage(nextStage, shouldAnimateLock);
        gsap.set(content, { autoAlpha: 0, y: 16 });
        gsap.set(content[nextStage], { autoAlpha: 1, y: 0 });
      };
      let masterTimeline;

      masterTimeline = gsap.timeline({
        scrollTrigger: {
          trigger: stage,
          start: "top top",
          end: "+=620%",
          pin: true,
          scrub: 0.9,
          anticipatePin: 1,
          onUpdate: () => {
            const timelineTime = masterTimeline.time();
            renderProcessState(timelineTime);
            previousTimelineTime = timelineTime;
          },
        },
      })
        .addLabel("intro-view", 0)
        .addLabel("intro-exit", 0.1)
        .to(introHeading, introTextMotion.exit.heading, "intro-exit")
        .to(introCopy, introTextMotion.exit.description, "intro-exit")
        .to(introDirectional, introTextMotion.exit.prompt, "intro-exit")
        .to(introIndicator, introTextMotion.exit.label, "intro-exit")
        .to(crossword, { autoAlpha: 0.18, scale: 0.98, duration: 0.46, ease: "none" }, "intro-exit")
        .to(system, { autoAlpha: 1, yPercent: 0, pointerEvents: "auto", duration: 0.24, ease: "power2.out" }, 0.5)
        .addLabel("process-enter", 0.5)
        .addLabel("process-lock", 0.82)
        .addLabel("process-progress", processProgressStart)
        .addLabel("process-hold", processProgressEnd)
        .to(ring, { autoAlpha: 0.38, x: 80, scale: 0.96, duration: 0.2, ease: "none" }, processExitStart)
        .to(construction, { autoAlpha: 0.28, duration: 0.16, ease: "none" }, processExitStart)
        .to(content, { autoAlpha: 0, y: -20, duration: 0.16, ease: "none" }, processExitStart)
        .to(transitionLine, { autoAlpha: 1, scaleY: 1, duration: 0.2, ease: "none" }, processExitStart)
        .addLabel("process-exit", processExitStart);
    }, section);

    return () => context.revert();
  }, []);

  return (
    <section id="process" ref={sectionRef} className={styles.process} aria-labelledby="process-heading">
      <div ref={stageRef} className={styles.sharedStage}>
      <div ref={introductionRef} className={styles.introduction}>
        <MYArchitectsCharacterField sectionRef={introductionRef} />
        <p className={styles.indicator} data-process-indicator>Our Process</p>
        <div className={styles.introContent}>
          <h2 id="process-heading" className="type-display-section" data-process-heading>How We Work</h2>
          <p data-process-copy>From vision to reality, every project follows a considered sequence of discovery, definition, and craft.</p>
          <p className={styles.directional} data-process-directional>Design Process · Crafting Spaces</p>
        </div>
      </div>

      <div ref={systemRef} className={styles.system}>
        <div className={styles.stageContent} aria-live="polite">
          {processStages.map((stage) => (
            <article key={stage.id} className={styles.stageCopy} data-process-content>
              <p>{stage.number} — {stage.title}</p>
              <h3 className="type-display-stage">{stage.title}</h3>
              <span>{stage.description}</span>
            </article>
          ))}
        </div>

        <div className={styles.ringWrap} data-process-ring aria-label="Five stage design process">
          <svg className={styles.diagram} viewBox="0 0 1000 1000" aria-hidden="true">
            <defs>
              <filter id="process-soft-glow" x="-50%" y="-50%" width="200%" height="200%">
                <feGaussianBlur stdDeviation="5" result="blur" />
                <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
              </filter>
            </defs>
            <g data-process-construction>
              <circle className={styles.outerRing} cx="500" cy="500" r="410" />
              <circle className={styles.outerRing} cx="500" cy="500" r="386" strokeDasharray="3 11" />
              <circle className={styles.innerRing} cx="500" cy="500" r="332" />
              <circle className={styles.innerRing} cx="500" cy="500" r="252" strokeDasharray="2 12" />
              <circle className={styles.innerRing} cx="500" cy="500" r="174" />
              <path className={styles.registration} d="M183 322A360 360 0 0 1 498 90M817 678A360 360 0 0 1 502 910" />
              <line x1="90" y1="500" x2="910" y2="500" />
              <line x1="500" y1="90" x2="500" y2="910" />
              <line x1="210" y1="210" x2="790" y2="790" />
              <line x1="790" y1="210" x2="210" y2="790" />
              {ticks.map((tick) => {
                const tickInSegment = tick % 11;
                const major = tickInSegment === 0;
                const midpoint = tickInSegment === 5;
                const angle = tick * (360 / ticks.length);
                const start = major ? 43 : midpoint ? 56 : 64;
                const end = major ? 92 : midpoint ? 84 : 78;
                return <line key={tick} data-process-tick className={major ? styles.majorTick : midpoint ? styles.midTick : styles.tick} x1="500" y1={start} x2="500" y2={end} transform={`rotate(${angle} 500 500)`} />;
              })}
            </g>
            {processStages.map((stage, index) => <ProcessNode key={stage.id} stage={stage} index={index} />)}
            <circle className={styles.progressMarker} data-process-progress-marker cx="500" cy="90" r="7" filter="url(#process-soft-glow)" />
            <g data-process-inner-mechanism>
              <circle className={styles.pivotOuter} cx="500" cy="500" r="17" />
              <circle className={styles.pivotInner} cx="500" cy="500" r="4" />
              <path className={styles.registration} d="M475 500h-28m78 0h28M500 475v-28m0 78v28" />
              <path className={styles.registration} d="M398 500a102 102 0 0 1 204 0M500 398a102 102 0 0 1 0 204" />
              <line className={styles.registration} data-process-hand x1="500" y1="500" x2="500" y2="278" />
            </g>
          </svg>
        </div>
        <span className={styles.transitionLine} data-process-transition-line aria-hidden="true" />
      </div>
      </div>
    </section>
  );
};

export default Process;
