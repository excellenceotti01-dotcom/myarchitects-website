import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";

import Hero from "../components/hero/Hero";
import SelectedWorkStage from "../components/Home/SelectedWorkStage/SelectedWorkStage";
import Process from "../components/Home/Process/Process";
import StudioSections from "../components/Home/StudioSections/StudioSections";

gsap.registerPlugin(ScrollTrigger);

const Home = () => {
  const lenisRef = useRef(null);
  const unlockPageRef = useRef(() => {});
  const [heroReady, setHeroReady] = useState(false);
  const handleHeroRevealComplete = useCallback(() => setHeroReady(true), []);

  useLayoutEffect(() => {
    const resetInitialScroll = () => {
      window.history.scrollRestoration = "manual";
      window.scrollTo(0, 0);
      ScrollTrigger.clearScrollMemory?.();
    };

    resetInitialScroll();
    const frameId = requestAnimationFrame(resetInitialScroll);
    return () => cancelAnimationFrame(frameId);
  }, []);

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
      window.history.scrollRestoration = "manual";
      window.scrollTo(0, 0);
      [html, body].forEach((element) => {
        element.classList.add("is-intro-locked");
        element.style.overflow = "hidden";
        element.style.overflowX = "hidden";
        element.style.overflowY = "hidden";
        element.style.touchAction = "none";
        element.style.overscrollBehavior = "none";
      });
    };
    const preventScroll = (event) => event.preventDefault();
    const preventKeys = (event) => {
      if (["ArrowDown", "ArrowUp", "PageDown", "PageUp", "Home", "End", " "].includes(event.key)) {
        event.preventDefault();
      }
    };
    let frameId;

    const animate = (time) => {
      lenis.raf(time);
      frameId = requestAnimationFrame(animate);
    };

    lenisRef.current = lenis;
    lenis.scrollTo(0, { immediate: true, force: true });
    lenis.on("scroll", ScrollTrigger.update);
    const handleCarouselGesture = ({ detail }) => {
      if (detail?.active) lenis.stop();
      else lenis.start();
    };
    window.addEventListener("myarchitects:carousel-gesture", handleCarouselGesture);
    lenis.stop();
    lockPage();
    unlockPageRef.current = restorePageStyles;
    window.addEventListener("wheel", preventScroll, { passive: false });
    window.addEventListener("touchmove", preventScroll, { passive: false });
    window.addEventListener("keydown", preventKeys);
    frameId = requestAnimationFrame(animate);

    requestAnimationFrame(() => ScrollTrigger.refresh());

    return () => {
      cancelAnimationFrame(frameId);
      lenis.off("scroll", ScrollTrigger.update);
      lenis.destroy();
      window.removeEventListener("myarchitects:carousel-gesture", handleCarouselGesture);
      window.removeEventListener("wheel", preventScroll);
      window.removeEventListener("touchmove", preventScroll);
      window.removeEventListener("keydown", preventKeys);
      restorePageStyles();
      unlockPageRef.current = () => {};
    };
  }, []);

  useEffect(() => {
    if (!heroReady) return;

    lenisRef.current?.scrollTo(0, { immediate: true, force: true });
    unlockPageRef.current();
    lenisRef.current?.start();
    requestAnimationFrame(() => ScrollTrigger.refresh());
  }, [heroReady]);

  return (
    <>
      <Hero onRevealComplete={handleHeroRevealComplete} />
      <SelectedWorkStage />
      <Process />
      <StudioSections />
    </>
  );
};

export default Home;
