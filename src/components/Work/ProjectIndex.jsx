import { Link } from "react-router-dom";
import { Fragment, useEffect, useMemo, useRef, useState } from "react";

import { workIndexProjects } from "../../data/projects.data";
import ProjectIndexEffects from "./ProjectIndexEffects";
import styles from "./ProjectIndex.module.css";
import { saveWorkReturnContext } from "../../utils/workReturnContext";

const filters = ["All", "Residential", "Commercial", "Hospitality", "Landscape"];
const desktopQuery = "(min-width: 1200px)";

const ProjectIndex = ({ restorationContext }) => {
  const [filter, setFilter] = useState(restorationContext?.source === "project-index" ? restorationContext.filter : "All");
  const [page, setPage] = useState(restorationContext?.source === "project-index" ? restorationContext.page : 0);
  const [isDesktop, setIsDesktop] = useState(() => window.matchMedia(desktopQuery).matches);
  const [isFiltering, setIsFiltering] = useState(false);
  const filterTimerRef = useRef(0);
  const pageSize = isDesktop ? 4 : 6;
  const filteredProjects = useMemo(
    () => (filter === "All" ? workIndexProjects : workIndexProjects.filter((project) => project.category === filter)),
    [filter],
  );
  const totalPages = Math.max(1, Math.ceil(filteredProjects.length / pageSize));
  const projects = filteredProjects.slice(page * pageSize, (page + 1) * pageSize);
  const applyFilter = (nextFilter) => {
    if (nextFilter === filter || isFiltering) return;
    setIsFiltering(true);
    window.clearTimeout(filterTimerRef.current);
    filterTimerRef.current = window.setTimeout(() => {
      setFilter(nextFilter);
      setPage(0);
      requestAnimationFrame(() => setIsFiltering(false));
    }, 140);
  };

  const rememberIndexReturn = (project) => {
    saveWorkReturnContext({
      source: "project-index",
      activeProjectId: project.id,
      filter,
      page,
      workScrollY: window.scrollY,
    });
  };

  useEffect(() => () => window.clearTimeout(filterTimerRef.current), []);

  useEffect(() => {
    const mediaQuery = window.matchMedia(desktopQuery);
    const updatePageSize = (event) => {
      setIsDesktop(event.matches);
      setPage(0);
    };
    mediaQuery.addEventListener("change", updatePageSize);
    return () => mediaQuery.removeEventListener("change", updatePageSize);
  }, []);

  return (
    <section className={styles.indexSection} aria-labelledby="project-index-heading" data-project-index data-navbar-theme="light">
      <div className={styles.stage} data-index-stage>
      <div className={styles.marks} aria-hidden="true">
        <span className={`${styles.guide} ${styles.guideVerticalLeft}`} />
        <span className={`${styles.guide} ${styles.guideVerticalRight}`} />
        <span className={`${styles.guide} ${styles.guideHorizontal}`} />
        <span className={`${styles.cross} ${styles.crossTopLeft}`} />
        <span className={`${styles.cross} ${styles.crossTopRight}`} />
        <span className={`${styles.cross} ${styles.crossBottomLeft}`} />
        <span className={`${styles.cross} ${styles.crossBottomRight}`} />
      </div>

      <div className={styles.container}>
        <header className={styles.intro} data-index-intro>
          <div>
            <h2 id="project-index-heading">Selected projects,<br />across scales.</h2>
            <p>Explore a growing collection of spaces shaped through context, material and use.</p>
          </div>
          <div className={styles.pagination} aria-label="Project archive pagination">
            <p aria-live="polite"><strong>{String(page + 1).padStart(2, "0")}</strong> <span>/ {String(totalPages).padStart(2, "0")}</span></p>
            <div className={styles.paginationControls}>
              <button type="button" onClick={() => setPage((value) => value - 1)} disabled={page === 0} aria-label="Previous project page">
                <span className={styles.arrowGlyph} aria-hidden="true">&larr;</span>
                <svg className={styles.chevron} viewBox="0 0 20 20" aria-hidden="true" focusable="false"><path d="M13.5 3.5 6.5 10l7 6.5" /></svg>
              </button>
              <button type="button" onClick={() => setPage((value) => value + 1)} disabled={page === totalPages - 1} aria-label="Next project page">
                <span className={styles.arrowGlyph} aria-hidden="true">&rarr;</span>
                <svg className={styles.chevron} viewBox="0 0 20 20" aria-hidden="true" focusable="false"><path d="m6.5 3.5 7 6.5-7 6.5" /></svg>
              </button>
            </div>
          </div>
        </header>

        <div className={styles.filterRow} data-index-filters aria-label="Filter projects">
          {filters.map((item, index) => (
            <span key={item} className={styles.filterGroup}>
              {index > 0 && <span className={styles.separator} aria-hidden="true">/</span>}
              <button type="button" className={filter === item ? styles.filterActive : ""} aria-pressed={filter === item} onClick={() => applyFilter(item)}>{item}</button>
            </span>
          ))}
        </div>

        {projects.length ? (
          <div className={`${styles.projectGrid} ${styles[`count${projects.length}`]} ${isFiltering ? styles.isFiltering : ""}`} data-index-grid data-page={page}>
            {projects.map((project, index) => (
              <article className={`${styles.project} ${styles[`position${index + 1}`]}`} data-index-project key={project.id}>
                <Link to={project.slug} state={{ returnContext: { source: "project-index", activeProjectId: project.id, filter, page } }} onClick={() => rememberIndexReturn(project)} className={styles.imageFrame} aria-label={`View ${project.title}`}>
                  <img src={project.image} alt={project.alt} loading="lazy" decoding="async" />
                  <span className={styles.projectShade} aria-hidden="true" />
                  <span className={styles.viewProject}>View project <span aria-hidden="true">{"\u2197"}</span></span>
                </Link>
                <div className={styles.metadata}>
                  <div><span>{project.number}</span><h3>{project.title}</h3></div>
                  <p>{[project.location, project.category, project.year].filter(Boolean).map((item, metadataIndex, metadata) => <Fragment key={`${item}-${metadataIndex}`}>{item}{metadataIndex < metadata.length - 1 && <i aria-hidden="true">/</i>}</Fragment>)}</p>
                </div>
              </article>
            ))}
          </div>
        ) : <p className={styles.empty}>No projects are currently listed under {filter}.</p>}
      </div>
      </div>
      <ProjectIndexEffects filter={filter} page={page} />
    </section>
  );
};

export default ProjectIndex;
