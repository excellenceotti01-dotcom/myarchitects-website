import { lazy, Suspense, useCallback, useEffect, useRef, useState } from "react";
import { useNavigationType } from "react-router-dom";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";

import Hero from "../components/hero/Hero";
import HeroNavbar from "../components/hero/HeroNavbar";

const SelectedWorkStage = lazy(() => import("../components/Home/SelectedWorkStage/SelectedWorkStage"));
const Process = lazy(() => import("../components/Home/Process/Process"));
const AboutStudio = lazy(() => import("../components/Home/AboutStudio/AboutStudio"));
const StudioSections = lazy(() => import("../components/Home/StudioSections/StudioSections"));

gsap.registerPlugin(ScrollTrigger);

const Home = () => {
  const lenisRef = useRef(null);
  const navbarRef = useRef(null);
  const unlockPageRef = useRef(() => {});
  const [heroReady, setHeroReady] = useState(false);
  const handleHeroRevealComplete = useCallback(() => setHeroReady(true), []);
  const navigationType = useNavigationType();
  const shouldResetScroll = navigationType !== "POP";

  useEffect(() => {
    // Keep native restoration and Lenis in the same known initial state before
    // ScrollTrigger measures any pinned stages.
    const lenis = new Lenis({
      lerp: 0.09,
      smoothWheel: true,
    });
    const html = document.documentElement;
    const body = document.body;
    const savedStyles = [html, body].map((element) => ({
      element,
      overflow: element.style.overflow,
      overflowX: element.style.overflowX,
      overflowY: element.style.overflowY,
      touchAction: element.style.touchAction,
      overscrollBehavior: element.style.overscrollBehavior,
    }));
    let scrollGuardsActive = false;
    const preventScroll = (event) => event.preventDefault();
    const preventKeys = (event) => {
      if (["ArrowDown", "ArrowUp", "PageDown", "PageUp", "Home", "End", " "].includes(event.key)) {
        event.preventDefault();
      }
    };
    const setScrollGuards = (active) => {
      if (scrollGuardsActive === active) return;
      scrollGuardsActive = active;
      if (active) {
        window.addEventListener("wheel", preventScroll, { passive: false });
        window.addEventListener("touchmove", preventScroll, { passive: false });
        window.addEventListener("keydown", preventKeys);
        return;
      }
      window.removeEventListener("wheel", preventScroll);
      window.removeEventListener("touchmove", preventScroll);
      window.removeEventListener("keydown", preventKeys);
    };
    const restorePageStyles = () => {
      savedStyles.forEach(({ element, overflow, overflowX, overflowY, touchAction, overscrollBehavior }) => {
        element.style.overflow = overflow;
        element.style.overflowX = overflowX;
        element.style.overflowY = overflowY;
        element.style.touchAction = touchAction;
        element.style.overscrollBehavior = overscrollBehavior;
      });
      html.classList.remove("is-intro-locked");
      body.classList.remove("is-intro-locked");
    };
    const lockPage = () => {
      if (shouldResetScroll) window.scrollTo(0, 0);
      [html, body].forEach((element) => {
        element.classList.add("is-intro-locked");
        element.style.overflow = "hidden";
        element.style.overflowX = "hidden";
        element.style.overflowY = "hidden";
        element.style.touchAction = "none";
        element.style.overscrollBehavior = "none";
      });
      setScrollGuards(true);
    };
    const unlockPage = () => {
      setScrollGuards(false);
      restorePageStyles();
    };
    const updateLenis = (time) => lenis.raf(time * 1000);

    lenisRef.current = lenis;
  if (shouldResetScroll) lenis.scrollTo(0, { immediate: true, force: true });
    lenis.on("scroll", ScrollTrigger.update);
    gsap.ticker.add(updateLenis);
    const handleCarouselGesture = ({ detail }) => {
      if (detail?.active) lenis.stop();
      else lenis.start();
    };
    window.addEventListener("myarchitects:carousel-gesture", handleCarouselGesture);
    lenis.stop();
    lockPage();
    unlockPageRef.current = unlockPage;

    const refreshFrameId = requestAnimationFrame(() => ScrollTrigger.refresh());

    return () => {
      cancelAnimationFrame(refreshFrameId);
      lenis.off("scroll", ScrollTrigger.update);
      gsap.ticker.remove(updateLenis);
      lenis.destroy();
      window.removeEventListener("myarchitects:carousel-gesture", handleCarouselGesture);
      unlockPage();
      unlockPageRef.current = () => {};
    };
  }, [shouldResetScroll]);

  useEffect(() => {
    if (!heroReady) return;

    if (shouldResetScroll) lenisRef.current?.scrollTo(0, { immediate: true, force: true });
    unlockPageRef.current();
    lenisRef.current?.start();
    const refreshFrameId = requestAnimationFrame(() => ScrollTrigger.refresh());
    return () => cancelAnimationFrame(refreshFrameId);
  }, [heroReady, shouldResetScroll]);

  return (
    <>
      <Hero navbarRef={navbarRef} onRevealComplete={handleHeroRevealComplete} />
      <HeroNavbar ref={navbarRef} />
      {heroReady && (
        <Suspense fallback={null}>
          <AboutStudio />
          <Process />
          <SelectedWorkStage />
          <StudioSections />
        </Suspense>
      )}
    </>
  );
};

export default Home;
