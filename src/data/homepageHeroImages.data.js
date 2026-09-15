import aerisMobile from "../assets/hero/aeris-hero-mobile.webp";
import aerisStandard from "../assets/hero/aeris-hero-standard.webp";
import aerisLarge from "../assets/hero/aeris-hero-large.webp";
import westcliffMobile from "../assets/hero/westcliff-health-care-hero-mobile.webp";
import westcliffStandard from "../assets/hero/westcliff-health-care-hero-standard.webp";
import westcliffLarge from "../assets/hero/westcliff-health-care-hero-large.webp";
import fiveBedroomMobile from "../assets/hero/proposed-five-bedroom-apartment-hero-mobile.webp";
import fiveBedroomStandard from "../assets/hero/proposed-five-bedroom-apartment-hero-standard.webp";
import fiveBedroomLarge from "../assets/hero/proposed-five-bedroom-apartment-hero-large.webp";
import renovationMobile from "../assets/hero/proposed-residential-renovation-hero-mobile.webp";
import renovationStandard from "../assets/hero/proposed-residential-renovation-hero-standard.webp";
import renovationLarge from "../assets/hero/proposed-residential-renovation-hero-large.webp";
import threeBedroomMobile from "../assets/hero/proposed-three-bedroom-apartments-hero-mobile.webp";
import threeBedroomStandard from "../assets/hero/proposed-three-bedroom-apartments-hero-standard.webp";
import threeBedroomLarge from "../assets/hero/proposed-three-bedroom-apartments-hero-large.webp";
import cityMobile from "../assets/hero/city-project-hero-mobile.webp";
import cityStandard from "../assets/hero/city-project-hero-standard.webp";
import cityLarge from "../assets/hero/city-project-hero-large.webp";
import landscapeMobile from "../assets/hero/proposed-landscape-garden-hero-mobile.webp";
import landscapeStandard from "../assets/hero/proposed-landscape-garden-hero-standard.webp";
import landscapeLarge from "../assets/hero/proposed-landscape-garden-hero-large.webp";
import gardenMobile from "../assets/hero/proposed-garden-1-hero-mobile.webp";
import gardenStandard from "../assets/hero/proposed-garden-1-hero-standard.webp";
import gardenLarge from "../assets/hero/proposed-garden-1-hero-large.webp";
import residentialDevelopmentMobile from "../assets/hero/proposed-residential-development-2-bedroom-hero-mobile.webp";
import residentialDevelopmentStandard from "../assets/hero/proposed-residential-development-2-bedroom-hero-standard.webp";
import residentialDevelopmentLarge from "../assets/hero/proposed-residential-development-2-bedroom-hero-large.webp";

const sources = (mobile, standard, large) => ({ mobile, standard, large });

export const homepageHeroImages = {
  1: sources(aerisMobile, aerisStandard, aerisLarge),
  2: sources(westcliffMobile, westcliffStandard, westcliffLarge),
  3: sources(fiveBedroomMobile, fiveBedroomStandard, fiveBedroomLarge),
  4: sources(renovationMobile, renovationStandard, renovationLarge),
  6: sources(threeBedroomMobile, threeBedroomStandard, threeBedroomLarge),
  7: sources(cityMobile, cityStandard, cityLarge),
  8: sources(landscapeMobile, landscapeStandard, landscapeLarge),
  9: sources(gardenMobile, gardenStandard, gardenLarge),
  10: sources(residentialDevelopmentMobile, residentialDevelopmentStandard, residentialDevelopmentLarge),
};
