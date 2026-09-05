import briefBreakdownImage from "../assets/images/Process/Brief Breakdown.png";
import strategyImage from "../assets/images/Process/Strategy.jpeg";
import designImage from "../assets/images/Process/Design.jpeg";
import approvalImage from "../assets/images/Process/Approval.jpeg";
import constructionImage from "../assets/images/Process/Construction.jpeg";

export const processStages = [
  {
    id: "brief-breakdown",
    number: "01",
    title: "Brief Breakdown",
    description: "We examine the brief, site, priorities, budget and constraints to establish a clear understanding of the project.",
    position: { x: "50%", y: "4%" },
    image: briefBreakdownImage,
  },
  {
    id: "strategies",
    number: "02",
    title: "Strategies",
    description: "We define the guiding ideas, spatial priorities and practical approach that will shape every design decision.",
    position: { x: "88%", y: "29%" },
    image: strategyImage,
  },
  {
    id: "design-phase",
    number: "03",
    title: "Design Phase",
    description: "We translate the agreed strategy into a thoughtful architectural proposal, coordinating space, form, material and experience.",
    position: { x: "74%", y: "83%" },
    image: designImage,
  },
  {
    id: "approval",
    number: "04",
    title: "Approval",
    description: "We refine and document the proposal, incorporating feedback and preparing it for the required client and regulatory approvals.",
    position: { x: "26%", y: "83%" },
    image: approvalImage,
  },
  {
    id: "construction",
    number: "05",
    title: "Construction",
    description: "We carry the approved design into delivery, protecting its intent through coordination, detailing and construction oversight.",
    position: { x: "12%", y: "29%" },
    image: constructionImage,
  },
];
