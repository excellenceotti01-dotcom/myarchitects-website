import { useLayoutEffect } from "react";

import HeroNavbar from "../components/hero/HeroNavbar";
import AboutHero from "../components/About/AboutHero";
import AboutManifesto from "../components/About/AboutManifesto";
import StudioStory from "../components/About/StudioStory";
import Principles from "../components/About/Principles";
import StudioCulture from "../components/About/StudioCulture";

const About = () => {
  useLayoutEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <HeroNavbar visible />
      <main>
        <AboutHero />
        <AboutManifesto />
        <StudioStory />
        <Principles />
        <StudioCulture />
      </main>
    </>
  );
};

export default About;
