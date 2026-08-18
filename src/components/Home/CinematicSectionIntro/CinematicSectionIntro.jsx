import { Component, lazy, Suspense, useEffect, useRef, useState } from "react";

import styles from "./CinematicSectionIntro.module.css";

const Spline = lazy(() => import("@splinetool/react-spline"));
const SCENE_URL = "https://prod.spline.design/dJqTIQ-tE3ULUPMi/scene.splinecode";

let activeSceneId = null;
const sceneSubscribers = new Set();

const setActiveScene = (nextId) => {
  if (activeSceneId === nextId) return;
  activeSceneId = nextId;
  sceneSubscribers.forEach((subscriber) => subscriber(nextId));
};

class SplineErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) return this.props.fallback;
    return this.props.children;
  }
}

const CinematicSectionIntro = ({ id, suspended = false }) => {
  const introRef = useRef(null);
  const [activeId, setActiveId] = useState(activeSceneId);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [supportsScene] = useState(() => {
    if (typeof navigator === "undefined") return false;

    const memory = navigator.deviceMemory;
    const cores = navigator.hardwareConcurrency;
    return !((memory && memory <= 2) || (cores && cores <= 2));
  });
  const [sceneError, setSceneError] = useState(false);
  const isSceneActive = activeId === id && supportsScene && !reducedMotion && !suspended && !sceneError;

  useEffect(() => {
    sceneSubscribers.add(setActiveId);
    return () => sceneSubscribers.delete(setActiveId);
  }, []);

  useEffect(() => {
    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const updatePreference = () => setReducedMotion(motionQuery.matches);

    updatePreference();
    motionQuery.addEventListener("change", updatePreference);
    return () => motionQuery.removeEventListener("change", updatePreference);
  }, []);

  useEffect(() => {
    const element = introRef.current;
    if (!element) return undefined;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setActiveScene(id);
        } else if (activeSceneId === id) {
          setActiveScene(null);
        }
      },
      { rootMargin: "12% 0px", threshold: 0.01 },
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, [id]);

  const fallback = <div className={styles.fallback} aria-hidden="true" />;

  return (
    <div ref={introRef} className={styles.background} data-cinematic-scene aria-hidden="true">
      {isSceneActive ? (
        <div className={styles.scene}>
          <SplineErrorBoundary fallback={fallback}>
            <Suspense fallback={fallback}>
              <Spline
                scene={SCENE_URL}
                renderOnDemand
                onError={() => setSceneError(true)}
              />
            </Suspense>
          </SplineErrorBoundary>
        </div>
      ) : fallback}
      <div className={styles.sceneTint} />
      <div className={styles.vignette} />
    </div>
  );
};

export default CinematicSectionIntro;
