import discoverImage from "../assets/images/project-1.png";
import defineImage from "../assets/images/project-2.png";
import developImage from "../assets/images/project-3.png";
import refineImage from "../assets/images/project-4.png";
import realiseImage from "../assets/images/services-1.png";

export const processStages = [
  {
    id: "discover",
    number: "01",
    title: "Discover",
    description: "We listen closely to the site, the brief, and the ambitions that make each project distinct.",
    position: { x: "50%", y: "4%" },
    image: discoverImage,
  },
  {
    id: "define",
    number: "02",
    title: "Define",
    description: "A clear architectural direction brings together context, programme, materiality, and possibility.",
    position: { x: "88%", y: "29%" },
    image: defineImage,
  },
  {
    id: "develop",
    number: "03",
    title: "Develop",
    description: "Ideas are tested and refined into spaces that balance performance, atmosphere, and precision.",
    position: { x: "74%", y: "83%" },
    image: developImage,
  },
  {
    id: "refine",
    number: "04",
    title: "Refine",
    description: "Every junction, proportion, and material is considered until the whole feels inevitable.",
    position: { x: "26%", y: "83%" },
    image: refineImage,
  },
  {
    id: "realise",
    number: "05",
    title: "Realise",
    description: "We remain engaged through delivery, protecting the clarity of the idea as it becomes real.",
    position: { x: "12%", y: "29%" },
    image: realiseImage,
  },
];
