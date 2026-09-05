import { useLayoutEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import HeroNavbar from "../components/hero/HeroNavbar";
import StudioSections from "../components/Home/StudioSections/StudioSections";
import WorkHero from "../components/Work/WorkHero";
import ProjectIndex from "../components/Work/ProjectIndex";
import { consumePendingWorkReturnContext } from "../utils/workReturnContext";

const Work = () => {
  const location = useLocation();
  const isInitialEntry = location.key === "default";
  // A native Back operation creates a fresh pending context from the detail
  // route. It must take precedence over state retained by an older Work
  // history entry from a previous return.
  const [restorationContext] = useState(() => (
    isInitialEntry ? null : consumePendingWorkReturnContext() ?? location.state?.workReturnContext
  ));
  const [isRestoring, setIsRestoring] = useState(Boolean(restorationContext));

  useLayoutEffect(() => {
    if (!restorationContext) return undefined;
    const restorePosition = () => window.scrollTo({ top: restorationContext.workScrollY ?? 0, left: 0, behavior: "auto" });
    window.history.scrollRestoration = "manual";
    restorePosition();

    // Keep Work content visually withheld while the new route settles. Both
    // restoration passes happen before it is revealed, eliminating a visible
    // intermediate Hero/Index frame and its subsequent jump.
    let secondFrame = 0;
    const firstFrame = requestAnimationFrame(() => {
      restorePosition();
      secondFrame = requestAnimationFrame(() => {
        restorePosition();
        setIsRestoring(false);
      });
    });

    return () => {
      cancelAnimationFrame(firstFrame);
      cancelAnimationFrame(secondFrame);
    };
  }, [restorationContext]);

  return (
    <>
      <HeroNavbar visible />
      <div aria-busy={isRestoring} style={isRestoring ? { visibility: "hidden" } : undefined}>
        <main>
          <WorkHero restorationContext={restorationContext} />
          <ProjectIndex restorationContext={restorationContext} />
        </main>
        <StudioSections />
      </div>
    </>
  );
};

export default Work;
