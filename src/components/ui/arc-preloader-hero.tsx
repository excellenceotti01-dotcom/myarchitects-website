"use client";

import * as React from "react";
import {
  animate,
  AnimatePresence,
  motion,
  useMotionValue,
  useReducedMotion,
  useTransform,
} from "motion/react";

import styles from "./arc-preloader-hero.module.css";

const cn = (...classes: Array<string | undefined>) => classes.filter(Boolean).join(" ");

/* ── types ───────────────────────────────────────────────────── */

export type ArcRevealGreeting = {
  /** Greeting text in the target script */
  text: string;
  /** Optional `lang` attribute applied to the span (helps screen readers / font rendering) */
  lang?: string;
};

export interface ArcRevealHeroProps {
  /** Greetings cycled before the arc reveal. */
  greetings?: ArcRevealGreeting[];
  /** How long each greeting is held on screen (ms). */
  greetingHold?: number;
  /** Duration of the curved curtain reveal (ms). */
  revealDuration?: number;
  /** Outer `<section>` class. Receives the *post-reveal* surface. */
  className?: string;
  /** Class for the intro (pre-reveal) overlay surface. */
  introClassName?: string;
  /** Class for the cycled greeting `<span>`. */
  greetingClassName?: string;
  /** Class for the wrapper around `children` (the revealed content). */
  revealClassName?: string;
  /** Optional `sessionStorage` key — leave unset to replay on every mount. */
  storageKey?: string;
  /** Content shown after the curtain reveal (the "landing"). */
  children?: React.ReactNode;
  /** Called only after the curved reveal and the overlay exit have completed. */
  onRevealComplete?: () => void;
  /** Called as the curtain starts so revealed media can prepare behind it. */
  onRevealStart?: () => void;
}

/* ── defaults ────────────────────────────────────────────────── */

const DEFAULT_GREETINGS: ArcRevealGreeting[] = [
  { text: "Vision." },
  { text: "Context." },
  { text: "Form." },
  { text: "Space." },
  { text: "Material." },
  { text: "Detail." },
  { text: "Crafted." },
  { text: "MYArchitect Design." },
];

type Phase = "intro" | "reveal" | "done";

/* ── component ───────────────────────────────────────────────── */

export function ArcRevealHero({
  greetings = DEFAULT_GREETINGS,
  greetingHold = 760,
  revealDuration = 1500,
  className,
  introClassName,
  greetingClassName,
  revealClassName,
  storageKey,
  children,
  onRevealComplete,
  onRevealStart,
}: ArcRevealHeroProps) {
  const prefersReducedMotion = useReducedMotion();
  const hasReportedComplete = React.useRef(false);
  const hasReportedRevealStart = React.useRef(false);

  const [phase, setPhase] = React.useState<Phase>("intro");
  const [index, setIndex] = React.useState(0);

  // Drive the arc shape from a single 0→1 progress.
  // The curve is a quadratic bezier with a fixed concavity (control point
  // sits 25 viewBox units below the chord), translated upward over time:
  //   t=0 → chord at y=110 (off-screen below)  → no curtain visible
  //   t=1 → chord at y=-30 (off-screen above)  → full-screen curtain
  const progress = useMotionValue(0);
  const arcPath = useTransform(progress, (p: number) => {
    const edge = 110 - p * 140;
    const control = edge + 25;
    return `M 0 ${edge} Q 50 ${control} 100 ${edge} L 100 110 L 0 110 Z`;
  });

  // Honor reduced-motion + replay-suppression on mount.
  React.useEffect(() => {
    if (prefersReducedMotion) {
      if (!hasReportedRevealStart.current) {
        hasReportedRevealStart.current = true;
        onRevealStart?.();
      }
      setPhase("done");
      return;
    }
    if (storageKey && typeof window !== "undefined") {
      try {
        if (window.sessionStorage.getItem(storageKey) === "done") {
          setPhase("done");
        }
      } catch {
        /* sessionStorage can throw in private mode — fall through */
      }
    }
  }, [onRevealStart, prefersReducedMotion, storageKey]);

  // Greeting cycle.
  React.useEffect(() => {
    if (phase !== "intro") return;
    const isLast = index >= greetings.length - 1;
    if (isLast) {
      const t = window.setTimeout(() => {
        if (!hasReportedRevealStart.current) {
          hasReportedRevealStart.current = true;
          onRevealStart?.();
        }
        setPhase("reveal");
      }, greetingHold + 220);
      return () => window.clearTimeout(t);
    }
    const t = window.setTimeout(() => setIndex((i) => i + 1), greetingHold);
    return () => window.clearTimeout(t);
  }, [phase, index, greetingHold, greetings.length, onRevealStart]);

  // Drive the curtain reveal.
  React.useEffect(() => {
    if (phase !== "reveal") return;
    const controls = animate(progress, 1, {
      duration: revealDuration / 1000,
      ease: [0.85, 0, 0.15, 1],
      onComplete: () => {
        if (storageKey && typeof window !== "undefined") {
          try {
            window.sessionStorage.setItem(storageKey, "done");
          } catch {
            /* ignore */
          }
        }
        setPhase("done");
      },
    });
    return () => controls.stop();
  }, [phase, progress, revealDuration, storageKey]);

  const showOverlay = phase !== "done";
  const current = greetings[Math.min(index, greetings.length - 1)];
  const notifyRevealComplete = () => {
    if (phase !== "done" || hasReportedComplete.current) return;
    hasReportedComplete.current = true;
    onRevealComplete?.();
  };

  return (
    <section aria-label="Hero" className={cn(styles.root, className)}>
      <div className={cn(styles.revealedContent, revealClassName)}>{children}</div>

      <AnimatePresence onExitComplete={notifyRevealComplete}>
        {showOverlay && (
          <motion.div
            key="arc-reveal-overlay"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.18, ease: [0.4, 0, 0.2, 1] }}
            className={cn(styles.overlay, introClassName)}
          >
            {/* Cycled greeting */}
            <div className={styles.greetingWrap}>
              <AnimatePresence mode="wait">
                {phase === "intro" && current && (
                  <motion.span
                    key={`${index}-${current.text}`}
                    lang={current.lang}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.42, ease: [0.22, 1, 0.36, 1] }}
                    className={cn(styles.greeting, greetingClassName)}
                  >
                    {current.text}
                  </motion.span>
                )}
              </AnimatePresence>
            </div>

            {/* Rising curved curtain */}
            <svg className={styles.curtain} viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden>
              <motion.path d={arcPath} style={{ fill: "var(--color-bg-primary)" }} />
            </svg>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

export default ArcRevealHero;
