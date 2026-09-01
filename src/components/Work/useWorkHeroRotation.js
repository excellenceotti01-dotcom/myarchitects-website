import { useCallback, useEffect, useRef, useState } from "react";

const ROTATION_INTERVAL = 5500;

const useWorkHeroRotation = (projectCount, projects, { initialIndex = 0, initiallyPaused = false } = {}) => {
  const [activeIndex, setActiveIndex] = useState(initialIndex);
  const [previousIndex, setPreviousIndex] = useState(null);
  const [progress, setProgress] = useState(0);
  const activeIndexRef = useRef(initialIndex);
  const elapsedRef = useRef(0);
  const startedAtRef = useRef(null);
  const frameRef = useRef(0);
  const pauseReasonsRef = useRef(initiallyPaused ? new Set(["restoration"]) : new Set());
  const reducedMotionRef = useRef(false);
  const tickRef = useRef(null);

  const stopFrame = useCallback(() => {
    if (frameRef.current) cancelAnimationFrame(frameRef.current);
    frameRef.current = 0;
  }, []);

  const applyIndex = useCallback((nextIndex) => {
    const priorIndex = activeIndexRef.current;
    if (nextIndex !== priorIndex) {
      setPreviousIndex(priorIndex);
      setActiveIndex(nextIndex);
      activeIndexRef.current = nextIndex;
      window.setTimeout(() => setPreviousIndex(null), 620);
    }
  }, []);

  const advance = useCallback(() => {
    applyIndex((activeIndexRef.current + 1) % projectCount);
    elapsedRef.current = 0;
    setProgress(0);
    startedAtRef.current = performance.now();
  }, [applyIndex, projectCount]);

  useEffect(() => {
    tickRef.current = (now) => {
      if (pauseReasonsRef.current.size || document.hidden || reducedMotionRef.current) return;
      if (startedAtRef.current === null) startedAtRef.current = now;
      const elapsed = elapsedRef.current + now - startedAtRef.current;
      if (elapsed >= ROTATION_INTERVAL) advance();
      else setProgress(elapsed / ROTATION_INTERVAL);
      frameRef.current = requestAnimationFrame(tickRef.current);
    };
  }, [advance]);

  const beginFrame = useCallback(() => {
    if (frameRef.current || pauseReasonsRef.current.size || document.hidden || reducedMotionRef.current) return;
    startedAtRef.current = performance.now();
    frameRef.current = requestAnimationFrame(tickRef.current);
  }, []);

  const pause = useCallback((reason) => {
    if (reducedMotionRef.current || pauseReasonsRef.current.has(reason)) return;
    if (!pauseReasonsRef.current.size && startedAtRef.current !== null) {
      elapsedRef.current = Math.min(ROTATION_INTERVAL, elapsedRef.current + performance.now() - startedAtRef.current);
      setProgress(elapsedRef.current / ROTATION_INTERVAL);
      stopFrame();
      startedAtRef.current = null;
    }
    pauseReasonsRef.current.add(reason);
  }, [stopFrame]);

  const resume = useCallback((reason) => {
    if (!pauseReasonsRef.current.delete(reason) || pauseReasonsRef.current.size) return;
    beginFrame();
  }, [beginFrame]);

  const selectProject = useCallback((index) => {
    stopFrame();
    pauseReasonsRef.current.clear();
    applyIndex(index % projectCount);
    elapsedRef.current = 0;
    setProgress(0);
    startedAtRef.current = null;
    beginFrame();
  }, [applyIndex, beginFrame, projectCount, stopFrame]);

  const releaseRestoration = useCallback(() => resume("restoration"), [resume]);

  useEffect(() => {
    reducedMotionRef.current = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!reducedMotionRef.current) beginFrame();

    const handleVisibility = () => {
      if (document.hidden) pause("visibility");
      else resume("visibility");
    };
    document.addEventListener("visibilitychange", handleVisibility);
    return () => {
      stopFrame();
      document.removeEventListener("visibilitychange", handleVisibility);
    };
  }, [beginFrame, pause, resume, stopFrame]);

  useEffect(() => {
    const image = new Image();
    image.src = projects[(activeIndex + 1) % projectCount].image;
    image.decode?.().catch(() => undefined);
  }, [activeIndex, projectCount, projects]);

  return { activeIndex, previousIndex, progress, pause, resume, selectProject, releaseRestoration };
};

export default useWorkHeroRotation;
