import { useLayoutEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { Flip } from "gsap/Flip";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import { teamMembers } from "../../../data/team.data";
import { introTextMotion } from "../../../hooks/useIntroTextTransition";
import MYArchitectsCharacterField from "../MYArchitectsCharacterField/MYArchitectsCharacterField";
import styles from "./TeamSection.module.css";

gsap.registerPlugin(ScrollTrigger, Flip);

const TeamSection = () => {
  const sectionRef = useRef(null);
  const cardsRef = useRef(null);
  const flipStateRef = useRef(null);
  const [activeMemberId, setActiveMemberId] = useState(null);
  const activeMember = teamMembers.find((member) => member.id === activeMemberId) || null;

  const selectMember = (memberId) => {
    const commitSelection = () => {
      const cards = cardsRef.current?.querySelectorAll("[data-team-card]");
      if (cards?.length) flipStateRef.current = Flip.getState(cards);
      setActiveMemberId((current) => current === memberId ? null : memberId);
    };

    const currentDetails = cardsRef.current?.querySelector("[data-team-details]");
    if (currentDetails && activeMemberId !== memberId) {
      gsap.to(currentDetails, { autoAlpha: 0, x: -10, duration: 0.16, ease: "power2.in", onComplete: commitSelection });
      return;
    }

    commitSelection();
  };

  useLayoutEffect(() => {
    const state = flipStateRef.current;
    if (!state) return undefined;

    const context = gsap.context(() => {
      const transition = Flip.from(state, {
        duration: 0.58,
        ease: "power3.inOut",
        absolute: false,
        nested: true,
      });
      const details = cardsRef.current?.querySelector("[data-team-details]");
      if (details) transition.fromTo(details, { autoAlpha: 0, x: 18 }, { autoAlpha: 1, x: 0, duration: 0.34, ease: "power3.out" }, 0.16);
    }, cardsRef.current);

    flipStateRef.current = null;
    return () => context.revert();
  }, [activeMemberId]);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) return undefined;

    const context = gsap.context(() => {
      const label = section.querySelector("[data-team-label]");
      const heading = section.querySelector("[data-team-heading]");
      const copy = section.querySelector("[data-team-copy]");
      const cards = gsap.utils.toArray("[data-team-card]");
      const cardGroup = cardsRef.current;
      const textItems = [label, heading, copy].filter(Boolean);

      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        gsap.set([...textItems, cardGroup, ...cards], { autoAlpha: 1, x: 0, y: 0, yPercent: 0, pointerEvents: "auto" });
        return;
      }

      gsap.set(label, introTextMotion.entrance.label);
      gsap.set(heading, introTextMotion.entrance.heading);
      gsap.set(copy, introTextMotion.entrance.description);
      gsap.set(cards, { autoAlpha: 0, yPercent: 115, pointerEvents: "auto" });

      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: () => `+=${window.innerHeight * 1.7}`,
          pin: true,
          scrub: 0.8,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });

      timeline
        .addLabel("entrance", 0.08)
        .to(label, { autoAlpha: 1, x: 0, duration: 0.48, ease: "power3.out" }, "entrance")
        .to(heading, { autoAlpha: 1, y: 0, duration: 0.72, ease: "power3.out" }, "entrance+=0.06")
        .to(copy, { autoAlpha: 1, y: 0, duration: 0.62, ease: "power3.out" }, "entrance+=0.16")
        .to(cards, { autoAlpha: 1, yPercent: 0, duration: 0.72, stagger: 0.06, ease: "power3.out" }, "entrance+=0.1")
        .addLabel("settled", 0.9)
        .addLabel("exit", 1.32)
        .to(heading, introTextMotion.exit.heading, "exit")
        .to(copy, introTextMotion.exit.description, "exit")
        .to(label, introTextMotion.exit.label, "exit")
        .to(cardGroup, { autoAlpha: 0, yPercent: 105, duration: 0.48, ease: "none" }, "exit+=0.05")
        .set([...textItems, cardGroup, ...cards], { pointerEvents: "none" }, "exit+=0.55");
    }, section);

    return () => context.revert();
  }, []);

  return (
    <section id="about" ref={sectionRef} className={styles.section} aria-labelledby="team-heading">
      <MYArchitectsCharacterField sectionRef={sectionRef} interactionExclusionRef={cardsRef} />

      <header className={styles.intro}>
        <p className={styles.label} data-team-label>Meet the Team</p>
        <h2 id="team-heading" className="type-display-section" data-team-heading>Meet the Team</h2>
        <p className={styles.copy} data-team-copy>Two perspectives, united by a shared commitment to thoughtful, enduring architecture.</p>
      </header>

      <div ref={cardsRef} className={`${styles.cards} ${activeMember ? styles.hasSelection : ""}`} data-crossword-exclusion aria-label="Team members">
        {teamMembers.map((member) => {
          const selected = activeMemberId === member.id;
          const hasSelection = activeMemberId !== null;
          return (
            <article key={member.id} className={`${styles.card} ${selected ? styles.selected : ""} ${hasSelection && !selected ? styles.inactive : ""}`} data-team-card>
              <button
                className={styles.cardButton}
                type="button"
                aria-pressed={selected}
                aria-expanded={selected}
                aria-controls="team-member-details"
                onClick={() => selectMember(member.id)}
              >
                <div className={styles.portrait}>
                  {member.portrait && <img src={member.portrait} alt="" />}
                </div>
              </button>
            </article>
          );
        })}
        {activeMember && (
          <aside id="team-member-details" className={styles.details} data-team-details>
            <p className={styles.role}>{activeMember.role}</p>
            <h3>{activeMember.name}</h3>
            <p className={styles.description}>{activeMember.description}</p>
            {activeMember.socials.length > 0 && (
              <nav className={styles.socials} aria-label={`${activeMember.name} social links`}>
                {activeMember.socials.map((social) => <a key={social.label} href={social.href}>{social.label}</a>)}
              </nav>
            )}
          </aside>
        )}
      </div>
    </section>
  );
};

export default TeamSection;
