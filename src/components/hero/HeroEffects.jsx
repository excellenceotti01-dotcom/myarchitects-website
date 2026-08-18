import { useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import styles from "./HeroEffects.module.css";

gsap.registerPlugin(ScrollTrigger);

const REVEAL_TIMING = {
  imageSettle: 1,
  afterImage: 0.1,
  navbar: 0.8,
  afterNavbar: 0.15,
  headline: 0.8,
  afterHeadline: 0.15,
  supportingCopy: 0.55,
  afterSupportingCopy: 0.12,
  cta: 0.4,
  afterCta: 0.25,
  philosophyCard: 0.65,
  afterPhilosophyCard: 0.2,
  projectCard: 0.55,
};

const HeroEffects = ({ heroRef, navbarRef, introComplete, onRevealComplete }) => {
  const hasCompletedReveal = useRef(false);

  useLayoutEffect(() => {
    const hero = heroRef.current;

    if (!hero) return undefined;

    let removePointerMove = () => {};

    const context = gsap.context(() => {
      const image = hero.querySelector("[data-hero-image]");
      const navbar = navbarRef?.current ?? hero.querySelector("[data-hero-navbar]");
      const headline = hero.querySelector("[data-hero-headline]");
      const headlineWords = gsap.utils.toArray("[data-hero-word]", hero);
      const supportingCopy = hero.querySelector("[data-hero-supporting-copy]");
      const cta = hero.querySelector("[data-hero-cta]");
      const philosophyCard = hero.querySelector('[data-hero-card="philosophy"]');
      const projectCard = hero.querySelector('[data-hero-card="project"]');
      const philosophyFloat = hero.querySelector('[data-hero-card-float="philosophy"]');
      const projectFloat = hero.querySelector('[data-hero-card-float="project"]');
      const philosophyParallax = hero.querySelector('[data-hero-card-parallax="philosophy"]');
      const projectParallax = hero.querySelector('[data-hero-card-parallax="project"]');
      const revealItems = [navbar, headline, supportingCopy, cta].filter(Boolean);
      const cards = [philosophyCard, projectCard].filter(Boolean);
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        gsap.set(image, { scale: 1, y: 0 });
        gsap.set(revealItems, { autoAlpha: 1, y: 0 });
        gsap.set(headlineWords, { autoAlpha: 1, y: 0, rotateX: 0 });
        gsap.set(cards, { autoAlpha: 1, y: 0 });
        if (!introComplete) return;
        if (!hasCompletedReveal.current) {
          hasCompletedReveal.current = true;
          onRevealComplete?.();
        }
        ScrollTrigger.create({
          trigger: hero,
          start: "top top",
          end: "bottom top",
        });
        return;
      }

      gsap.set(revealItems, { autoAlpha: 0 });
      gsap.set(navbar, { y: -18 });
      gsap.set(headline, { autoAlpha: 1, transformOrigin: "left bottom" });
      gsap.set(headlineWords, { autoAlpha: 0, y: 42, rotateX: -58, transformOrigin: "left bottom" });
      gsap.set(supportingCopy, { y: 16 });
      gsap.set(cta, { y: 12 });
      gsap.set(cards, { autoAlpha: 0, y: 20 });
      gsap.set(image, { scale: 0.98, y: 10, transformOrigin: "center center" });

      if (!introComplete) return;

      const revealTimeline = gsap.timeline({
        onComplete: () => {
          if (!hasCompletedReveal.current) {
            hasCompletedReveal.current = true;
            onRevealComplete?.();
          }
        },
      });

      revealTimeline
        .to(image, {
          scale: 1,
          y: 0,
          duration: REVEAL_TIMING.imageSettle,
          ease: "power3.out",
        })
        .to({}, { duration: REVEAL_TIMING.afterImage })
        .to(navbar, { autoAlpha: 1, y: 0, duration: REVEAL_TIMING.navbar, ease: "power3.out" })
        .to({}, { duration: REVEAL_TIMING.afterNavbar })
        .to(headlineWords.length ? headlineWords : headline, { autoAlpha: 1, y: 0, rotateX: 0, duration: REVEAL_TIMING.headline, stagger: 0.045, ease: "power3.out" })
        .to({}, { duration: REVEAL_TIMING.afterHeadline })
        .to(philosophyCard, {
          autoAlpha: 1,
          y: 0,
          duration: REVEAL_TIMING.philosophyCard,
          ease: "power3.out",
          clearProps: "transform",
        })
        .to({}, { duration: REVEAL_TIMING.afterPhilosophyCard })
        .to(projectCard, {
          autoAlpha: 1,
          y: 0,
          duration: REVEAL_TIMING.projectCard,
          ease: "power3.out",
          clearProps: "transform",
        })
        .to(supportingCopy, { autoAlpha: 1, y: 0, duration: REVEAL_TIMING.supportingCopy, ease: "power3.out" })
        .to({}, { duration: REVEAL_TIMING.afterSupportingCopy })
        .to(cta, { autoAlpha: 1, y: 0, duration: REVEAL_TIMING.cta, ease: "power3.out" })
        .to({}, { duration: REVEAL_TIMING.afterCta })
        .add(() => {
          gsap.to(philosophyFloat, {
            y: -8,
            duration: 9,
            ease: "sine.inOut",
            repeat: -1,
            yoyo: true,
          });
          gsap.to(projectFloat, {
            y: -5,
            duration: 10,
            ease: "sine.inOut",
            repeat: -1,
            yoyo: true,
            delay: 2,
          });
        });

      const setPhilosophyParallaxX = gsap.quickTo(philosophyParallax, "x", {
        duration: 0.9,
        ease: "power3.out",
      });
      const setPhilosophyParallaxY = gsap.quickTo(philosophyParallax, "y", {
        duration: 0.9,
        ease: "power3.out",
      });
      const setProjectParallaxX = gsap.quickTo(projectParallax, "x", {
        duration: 1.1,
        ease: "power3.out",
      });
      const setProjectParallaxY = gsap.quickTo(projectParallax, "y", {
        duration: 1.1,
        ease: "power3.out",
      });
      const handlePointerMove = ({ clientX, clientY }) => {
        const x = (clientX / window.innerWidth - 0.5) * 16;
        const y = (clientY / window.innerHeight - 0.5) * 12;

        setPhilosophyParallaxX(x);
        setPhilosophyParallaxY(y);
        setProjectParallaxX(x * 0.8);
        setProjectParallaxY(y * 0.8);
      };

      hero.addEventListener("pointermove", handlePointerMove, { passive: true });
      removePointerMove = () => hero.removeEventListener("pointermove", handlePointerMove);

      const exitTimeline = gsap.timeline({
        scrollTrigger: {
          trigger: hero,
          start: "top top",
          end: "bottom top",
          scrub: 0.8,
        },
      });

      exitTimeline
        .to(headline, { x: -80, autoAlpha: 0, ease: "none" }, 0.12)
        .to(cta, { x: -60, autoAlpha: 0, ease: "none" }, 0.18)
        .to(philosophyCard, { y: -20, autoAlpha: 0, ease: "none" }, 0.2)
        .to(projectCard, { x: 80, autoAlpha: 0, ease: "none" }, 0.22)
        .to(image, { autoAlpha: 0, ease: "none" }, 0.58);

    }, hero);

    return () => {
      removePointerMove();
      context.revert();
    };
  }, [heroRef, navbarRef, introComplete, onRevealComplete]);

  return <div className={styles.effects} aria-hidden="true" />;
};

export default HeroEffects;
