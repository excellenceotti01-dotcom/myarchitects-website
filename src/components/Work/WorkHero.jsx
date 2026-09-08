import { Link } from "react-router-dom";
import { Fragment, useEffect, useMemo, useRef } from "react";

import { workIndexProjects } from "../../data/projects.data";
import WorkHeroEffects from "./WorkHeroEffects";
import useWorkHeroRotation from "./useWorkHeroRotation";
import styles from "./WorkHero.module.css";
import { saveWorkReturnContext } from "../../utils/workReturnContext";

const pad = (value) => String(value).padStart(2, "0");

const WorkHero = ({ restorationContext }) => {
  const sectionRef = useRef(null);
  const restoredIndex = useMemo(() => {
    const index = workIndexProjects.findIndex((project) => project.id === restorationContext?.activeProjectId);
    return index >= 0 ? index : 0;
  }, [restorationContext]);
  const { activeIndex, previousIndex, progress, pause, resume, selectProject, releaseRestoration } = useWorkHeroRotation(
    workIndexProjects.length,
    workIndexProjects,
    { initialIndex: restoredIndex, initiallyPaused: restorationContext?.source === "work-hero" },
  );

  const activeProject = workIndexProjects[activeIndex];
  const previousProject = previousIndex === null ? null : workIndexProjects[previousIndex];
  const activeProjectMetadata = [activeProject.location, activeProject.category, activeProject.year].filter(Boolean);
  const handleFocus = (event) => {
    if (event.target.closest("[data-pause-carousel]")) pause("focus");
  };

  const handleBlur = (event) => {
    if (!event.relatedTarget?.closest("[data-pause-carousel]")) resume("focus");
  };

  useEffect(() => {
    if (restorationContext?.source !== "work-hero") return undefined;
    const frame = requestAnimationFrame(() => {
      window.setTimeout(releaseRestoration, 320);
    });
    return () => cancelAnimationFrame(frame);
  }, [releaseRestoration, restorationContext]);

  const rememberHeroReturn = (project) => {
    saveWorkReturnContext({
      source: "work-hero",
      activeProjectId: project.id,
      workScrollY: window.scrollY,
    });
  };

  return (
    <section ref={sectionRef} className={styles.hero} aria-labelledby="work-hero-heading" data-work-hero data-navbar-theme="dark" onFocusCapture={handleFocus} onBlurCapture={handleBlur}>
      <div className={styles.marks} aria-hidden="true">
        <span className={`${styles.verticalGuide} ${styles.guideLeft}`} />
        <span className={`${styles.verticalGuide} ${styles.guideRight}`} />
        <span className={styles.horizontalGuide} />
        <span className={`${styles.cross} ${styles.crossTop}`} />
        <span className={`${styles.cross} ${styles.crossBottom}`} />
        <span className={styles.registration} />
      </div>

      <div className={styles.layout}>
        <div className={styles.intro}>
          <h1 id="work-hero-heading" className={styles.heading}>
            <span className={styles.lineClip}><span data-work-line>Spaces shaped</span></span>
            <span className={styles.lineClip}><span data-work-line>by how life</span></span>
            <span className={styles.lineClip}><span data-work-line>unfolds.</span></span>
          </h1>
          <p className={styles.copy} data-work-copy>
            A selection of residential, commercial, hospitality and landscape projects shaped by context, material and everyday experience.
          </p>
          <p className={styles.counter} data-work-counter><span key={`counter-${activeProject.id}`}>Selected work — {pad(activeIndex + 1)} / {pad(workIndexProjects.length)}</span></p>
        </div>

        <div className={styles.featured} data-work-featured>
          <div className={styles.imageFrame}>
            {previousProject && <img className={`${styles.projectImage} ${styles.outgoingImage}`} src={previousProject.image} alt="" aria-hidden="true" />}
            <Link className={styles.imageLink} to={activeProject.slug} state={{ returnContext: { source: "work-hero", activeProjectId: activeProject.id } }} onClick={() => rememberHeroReturn(activeProject)} aria-label={`View ${activeProject.title}`} data-pause-carousel onPointerEnter={() => pause("pointer")} onPointerLeave={() => resume("pointer")}>
              <img key={activeProject.id} className={styles.projectImage} src={activeProject.image} alt={activeProject.title} fetchPriority={activeIndex === 0 ? "high" : "auto"} decoding="async" />
              <span className={styles.viewProject}>View project <span aria-hidden="true">↗</span></span>
            </Link>
          </div>
          <div className={styles.caption} data-work-caption key={`caption-${activeProject.id}`}>
            <Link to={activeProject.slug} state={{ returnContext: { source: "work-hero", activeProjectId: activeProject.id } }} onClick={() => rememberHeroReturn(activeProject)} data-pause-carousel onPointerEnter={() => pause("pointer")} onPointerLeave={() => resume("pointer")}>{activeProject.title}</Link>
            <p>{activeProjectMetadata.map((item, index) => <Fragment key={`${item}-${index}`}>{item}{index < activeProjectMetadata.length - 1 && <span aria-hidden="true">—</span>}</Fragment>)}</p>
          </div>
        </div>

        <nav className={styles.index} data-work-index aria-label="Project index">
          {workIndexProjects.map((project, index) => {
            const active = index === activeIndex;
            return (
              <div key={project.id} className={`${styles.indexItem} ${active ? styles.active : ""}`}>
                {active ? (
                  <Link to={project.slug} state={{ returnContext: { source: "work-hero", activeProjectId: project.id } }} onClick={() => rememberHeroReturn(project)} aria-current="page" aria-label={`Open ${project.title}`} data-pause-carousel onPointerEnter={() => pause("pointer")} onPointerLeave={() => resume("pointer")}>
                    <span>{pad(index + 1)}</span><strong>{project.title}</strong>
                  </Link>
                ) : (
                  <button type="button" onClick={() => selectProject(index)} aria-label={`Preview ${project.title}`}>
                    <span>{pad(index + 1)}</span><strong>{project.title}</strong>
                  </button>
                )}
                {active && <i className={styles.progress} style={{ transform: `scaleX(${progress})` }} aria-hidden="true" />}
              </div>
            );
          })}
        </nav>
      </div>
      <WorkHeroEffects sectionRef={sectionRef} />
    </section>
  );
};

export default WorkHero;
