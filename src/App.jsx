import { useEffect, useLayoutEffect } from "react";
import { Route, Routes, useLocation, useNavigationType } from "react-router-dom";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import Home from "./pages/Home";
import About from "./pages/About";
import Work from "./pages/Work";
import ProjectDetail from "./pages/ProjectDetail";
import ProcessPage from "./pages/Process/ProcessPage";
import InquiryProvider from "./context/InquiryProvider";
import InquiryOverlay from "./components/Inquiry/InquiryOverlay";

function RouteScrollReset() {
  const location = useLocation();
  const navigationType = useNavigationType();
  const isInitialEntry = location.key === "default";
  const shouldReset = navigationType !== "POP" || isInitialEntry;

  const resetScroll = () => {
    window.history.scrollRestoration = "manual";
    ScrollTrigger.clearScrollMemory?.();
    document.documentElement.style.scrollBehavior = "auto";
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
  };

  useLayoutEffect(() => {
    if (shouldReset) resetScroll();
  }, [shouldReset, location.key]);

  useEffect(() => {
    if (shouldReset) resetScroll();
  }, [shouldReset, location.key]);

  return null;
}

function App() {
  return (
    <InquiryProvider>
      <RouteScrollReset />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/process" element={<ProcessPage />} />
        <Route path="/work" element={<Work />} />
        <Route path="/work/:projectSlug" element={<ProjectDetail />} />
      </Routes>
      <InquiryOverlay />
    </InquiryProvider>
  );
}

export default App;
