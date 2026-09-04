import residentialImage from "../assets/images/Work/Large exterior image.png";
import commercialImage from "../assets/images/Work/Image 03.png";
import hospitalityImage from "../assets/images/Work/Image 02.png";
import interiorImage from "../assets/images/Work/Image 01.png";
import developmentImage from "../assets/images/Work/Image 04.png";
import otherImage from "../assets/images/Work/Small detail image.png";

export const inquiryCategories = [
  { id: "residential", label: "Residential", note: "Homes, extensions and private residences", image: residentialImage, alt: "Waterfront residence at dusk" },
  { id: "commercial", label: "Commercial", note: "Workplaces, retail and mixed use", image: commercialImage, alt: "Commercial architectural interior" },
  { id: "hospitality", label: "Hospitality", note: "Hotels, restaurants and guest experience", image: hospitalityImage, alt: "Hospitality space overlooking water" },
  { id: "interior-design", label: "Interior Design", note: "Interior architecture and material design", image: interiorImage, alt: "Refined interior architectural space" },
  { id: "development", label: "Development", note: "Multi unit and larger scale projects", image: developmentImage, alt: "Large scale residential development" },
  { id: "other", label: "Other", note: "Tell us what you are planning", image: otherImage, alt: "Architectural detail at dusk" },
];

export const timelineOptions = [
  "Still exploring",
  "Within 3 months",
  "3 – 6 months",
  "6 – 12 months",
  "More than a year",
];

export const budgetOptions = [
  "To be defined",
  "Under £250k",
  "£250k – £500k",
  "£500k – £1m",
  "£1m – £2.5m",
  "Above £2.5m",
];

export const contactMethods = ["Email", "Phone", "Either"];
