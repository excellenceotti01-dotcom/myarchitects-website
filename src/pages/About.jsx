import { useLayoutEffect } from "react";

import HeroNavbar from "../components/hero/HeroNavbar";
import AboutHero from "../components/About/AboutHero";
import AboutManifesto from "../components/About/AboutManifesto";
import StudioStory from "../components/About/StudioStory";
import Principles from "../components/About/Principles";
import StudioCulture from "../components/About/StudioCulture";
import StudioCapabilities from "../components/About/StudioCapabilities";
import ClosingStatement from "../components/About/ClosingStatement";
import StudioSections from "../components/Home/StudioSections/StudioSections";

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
        <StudioCapabilities />
        <ClosingStatement />
      </main>
      <StudioSections />
    </>
  );
};

export default About;
