import { useLayoutEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);
const ProjectCreditsEffects = (sectionRef) => {
  useLayoutEffect(() => {
    const section = sectionRef.current; if (!section) return undefined;
    const context = gsap.context(() => {
      const label=section.querySelector("[data-credits-label]"), rows=section.querySelector("[data-credits-rows]"), rule=section.querySelector("[data-credits-rule]"), heading=section.querySelector("[data-credits-heading]"), previews=gsap.utils.toArray("[data-credits-preview]");
      if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
      gsap.set([label,rows,heading],{autoAlpha:0,y:18}); gsap.set(rule,{scaleX:0,transformOrigin:"left center"}); gsap.set(previews,{autoAlpha:0,y:22}); gsap.set(previews.map(p=>p.querySelector("span")),{clipPath:"inset(0 0 100% 0)"});
      gsap.timeline({scrollTrigger:{trigger:section,start:"top top",end:()=>`+=${innerHeight*1.4}`,pin:true,scrub:.8,invalidateOnRefresh:true}})
        .to(label,{autoAlpha:1,y:0,duration:.18},.18).to(rows,{autoAlpha:1,y:0,duration:.2},.26).to(rule,{scaleX:1,duration:.22},.38).to(heading,{autoAlpha:1,y:0,duration:.2},.48).to(previews,{autoAlpha:1,y:0,duration:.2,stagger:.08},.58).to(previews.map(p=>p.querySelector("span")),{clipPath:"inset(0 0 0% 0)",duration:.3,stagger:.08},.58).to({}, {duration:.32},.96);
    },section); return()=>context.revert();
  },[sectionRef]);
};
export default ProjectCreditsEffects;
