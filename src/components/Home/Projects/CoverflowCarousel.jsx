import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import { CaretLeft } from "@phosphor-icons/react/dist/csr/CaretLeft";
import { CaretRight } from "@phosphor-icons/react/dist/csr/CaretRight";

import styles from "./CoverflowCarousel.module.css";

const DRAG_THRESHOLD = 8;

const wrap = (value, length) => ((value % length) + length) % length;

const nearestOffset = (index, position, length) => {
  let offset = index - position;
  offset -= Math.round(offset / length) * length;
  return offset;
};

const CoverflowCarousel = ({ projects, interactive }) => {
  const carouselRef = useRef(null);
  const cardRefs = useRef([]);
  const rafRef = useRef(null);
  const settleRef = useRef(null);
  const positionRef = useRef(0);
  const targetRef = useRef(0);
  const pitchRef = useRef(420);
  const draggingRef = useRef(false);
  const suppressClickRef = useRef(false);
  const gestureRef = useRef("idle");
  const dragStartRef = useRef({ x: 0, y: 0, position: 0 });
  const [activeIndex, setActiveIndex] = useState(0);

  const paint = useCallback(() => {
    const position = positionRef.current;
    const pitch = pitchRef.current;

    cardRefs.current.forEach((card, index) => {
      if (!card) return;

      const offset = nearestOffset(index, position, projects.length);
      const distance = Math.abs(offset);
      const translateX = offset * pitch;
      const translateY = distance * 18;
      const translateZ = -distance * pitch * 0.56;
      const rotateY = -offset * 34;
      const scale = Math.max(0.76, 1 - distance * 0.12);
      const opacity = Math.max(0.1, 1 - distance * 0.58);

      card.style.transform = `translate3d(${translateX}px, ${translateY}px, ${translateZ}px) rotateY(${rotateY}deg) scale(${scale})`;
      card.style.opacity = opacity;
      card.style.zIndex = String(100 - Math.round(distance * 10));
      card.dataset.active = String(distance < 0.35);
      card.setAttribute("aria-hidden", String(distance > 1.75));
    });
  }, [projects.length]);

  const settle = useCallback(() => {
    const difference = targetRef.current - positionRef.current;
    if (Math.abs(difference) < 0.002) {
      positionRef.current = targetRef.current;
      paint();
      rafRef.current = null;
      return;
    }

    positionRef.current += difference * 0.17;
    paint();
    rafRef.current = requestAnimationFrame(settleRef.current);
  }, [paint]);

  useEffect(() => {
    settleRef.current = settle;
  }, [settle]);

  const moveTo = useCallback((nextIndex) => {
    const current = positionRef.current;
    const delta = nearestOffset(nextIndex, current, projects.length);
    targetRef.current = current + delta;
    setActiveIndex(wrap(Math.round(targetRef.current), projects.length));

    if (!rafRef.current) rafRef.current = requestAnimationFrame(settleRef.current);
  }, [projects.length]);

  useLayoutEffect(() => {
    const element = carouselRef.current;
    if (!element) return undefined;

    const measure = () => {
      const cardWidth = Math.min(Math.max(element.clientWidth * 0.56, 300), 860);
      pitchRef.current = cardWidth * 0.7;
      paint();
    };

    const resizeObserver = new ResizeObserver(measure);
    resizeObserver.observe(element);
    measure();

    return () => resizeObserver.disconnect();
  }, [paint]);

  useEffect(() => {
    const adjacent = [activeIndex, wrap(activeIndex - 1, projects.length), wrap(activeIndex + 1, projects.length)];
    adjacent.forEach((index) => {
      const image = new Image();
      image.src = projects[index].image;
    });
  }, [activeIndex, projects]);

  useEffect(() => () => {
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    if (gestureRef.current === "horizontal") {
      window.dispatchEvent(new CustomEvent("myarchitects:carousel-gesture", { detail: { active: false } }));
    }
  }, []);

  const finishGesture = (event) => {
    if (!draggingRef.current) return;

    const wasHorizontal = gestureRef.current === "horizontal";
    event?.currentTarget?.releasePointerCapture?.(event.pointerId);
    draggingRef.current = false;
    gestureRef.current = "idle";

    if (wasHorizontal) {
      window.dispatchEvent(new CustomEvent("myarchitects:carousel-gesture", { detail: { active: false } }));
      moveTo(wrap(Math.round(positionRef.current), projects.length));
    }
  };

  const handlePointerDown = (event) => {
    if (!interactive) return;

    event.currentTarget.setPointerCapture(event.pointerId);
    draggingRef.current = true;
    suppressClickRef.current = false;
    gestureRef.current = "pending";
    dragStartRef.current = { x: event.clientX, y: event.clientY, position: positionRef.current };
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    rafRef.current = null;
  };

  const handlePointerMove = (event) => {
    if (!draggingRef.current) return;

    const delta = event.clientX - dragStartRef.current.x;
    const deltaY = event.clientY - dragStartRef.current.y;

    if (gestureRef.current === "pending") {
      if (Math.max(Math.abs(delta), Math.abs(deltaY)) < DRAG_THRESHOLD) return;

      if (Math.abs(delta) <= Math.abs(deltaY)) {
        gestureRef.current = "vertical";
        return;
      }

      gestureRef.current = "horizontal";
      suppressClickRef.current = true;
      window.dispatchEvent(new CustomEvent("myarchitects:carousel-gesture", { detail: { active: true } }));
    }

    if (gestureRef.current !== "horizontal") return;
    if (event.cancelable) event.preventDefault();
    positionRef.current = dragStartRef.current.position - delta / pitchRef.current;
    targetRef.current = positionRef.current;
    paint();
  };

  const handleCardClick = (index) => {
    if (!interactive || suppressClickRef.current) {
      suppressClickRef.current = false;
      return;
    }
    if (index !== activeIndex) moveTo(index);
  };

  const handleKeyDown = (event) => {
    if (!interactive) return;
    if (event.key === "ArrowLeft") {
      event.preventDefault();
      moveTo(wrap(activeIndex - 1, projects.length));
    }
    if (event.key === "ArrowRight") {
      event.preventDefault();
      moveTo(wrap(activeIndex + 1, projects.length));
    }
  };

  const activeProject = projects[activeIndex];

  return (
    <section
      ref={carouselRef}
      className={`${styles.carousel} ${interactive ? styles.interactive : styles.inactive}`}
      aria-label="Selected projects carousel"
      aria-roledescription="carousel"
      onKeyDown={handleKeyDown}
      tabIndex={interactive ? 0 : -1}
    >
      <div
        className={styles.stage}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={finishGesture}
        onPointerCancel={finishGesture}
        onLostPointerCapture={finishGesture}
      >
        {projects.map((project, index) => (
          <button
            key={project.id}
            ref={(element) => { cardRefs.current[index] = element; }}
            className={styles.card}
            type="button"
            onClick={() => handleCardClick(index)}
            disabled={!interactive}
            aria-label={index === activeIndex ? `${project.title}, active project` : `View ${project.title}`}
            aria-current={index === activeIndex ? "true" : undefined}
          >
            <img
              src={project.image}
              alt={project.title}
              className={styles.image}
              loading={Math.abs(index - activeIndex) <= 1 ? "eager" : "lazy"}
              decoding="async"
            />
            <span className={styles.cardShade} aria-hidden="true" />
          </button>
        ))}
      </div>

      <div className={styles.metadata} aria-live="polite">
        <div className={styles.projectSummary}>
          <p className={styles.eyebrow}>Selected Project {String(activeIndex + 1).padStart(2, "0")} / {String(projects.length).padStart(2, "0")}</p>
          <div className={styles.headingRow}>
            <div className={styles.headingCopy}>
              <h3>{activeProject.title}</h3>
          <p className={styles.subtitle}>{activeProject.category} <span aria-hidden="true">—</span> {activeProject.location}</p>
            </div>
            <div className={styles.controls} aria-label="Project carousel controls">
              <button type="button" onClick={() => moveTo(wrap(activeIndex - 1, projects.length))} disabled={!interactive} aria-label="Previous project">
                <CaretLeft weight="bold" aria-hidden="true" />
              </button>
              <button type="button" onClick={() => moveTo(wrap(activeIndex + 1, projects.length))} disabled={!interactive} aria-label="Next project">
                <CaretRight weight="bold" aria-hidden="true" />
              </button>
            </div>
          </div>
          <dl className={styles.facts}>
            <div><dt>Location</dt><dd>{activeProject.location}</dd></div>
            <div><dt>Year</dt><dd>{activeProject.year}</dd></div>
          </dl>
        </div>
      </div>
    </section>
  );
};

export default CoverflowCarousel;
