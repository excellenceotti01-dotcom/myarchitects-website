import discoverImage from "../assets/images/project-1.png";
import defineImage from "../assets/images/project-2.png";
import developImage from "../assets/images/project-3.png";
import refineImage from "../assets/images/project-4.png";
import realiseImage from "../assets/images/services-1.png";

export const processStages = [
  {
    id: "brief-breakdown",
    number: "01",
    title: "Brief Breakdown",
    description: "We examine the brief, site, priorities, budget and constraints to establish a clear understanding of the project.",
    position: { x: "50%", y: "4%" },
    image: discoverImage,
  },
  {
    id: "strategies",
    number: "02",
    title: "Strategies",
    description: "We define the guiding ideas, spatial priorities and practical approach that will shape every design decision.",
    position: { x: "88%", y: "29%" },
    image: defineImage,
  },
  {
    id: "design-phase",
    number: "03",
    title: "Design Phase",
    description: "We translate the agreed strategy into a thoughtful architectural proposal, coordinating space, form, material and experience.",
    position: { x: "74%", y: "83%" },
    image: developImage,
  },
  {
    id: "approval",
    number: "04",
    title: "Approval",
    description: "We refine and document the proposal, incorporating feedback and preparing it for the required client and regulatory approvals.",
    position: { x: "26%", y: "83%" },
    image: refineImage,
  },
  {
    id: "construction",
    number: "05",
    title: "Construction",
    description: "We carry the approved design into delivery, protecting its intent through coordination, detailing and construction oversight.",
    position: { x: "12%", y: "29%" },
    image: realiseImage,
  },
];
