import { useCallback, useEffect, useRef, useState } from "react";
import { ArrowRight } from "@phosphor-icons/react/dist/csr/ArrowRight";
import { X } from "@phosphor-icons/react/dist/csr/X";

import { budgetOptions, contactMethods, inquiryCategories, timelineOptions } from "../../data/inquiry.data";
import { useInquiry } from "../../context/inquiryContext";
import styles from "./InquiryOverlay.module.css";

const emptyDetails = { location: "", size: "", timeline: "", budget: "", description: "" };
const emptyContact = { name: "", email: "", phone: "", method: "Email" };

const InquiryOverlay = () => {
  const { isOpen, closeInquiry } = useInquiry();
  const [stage, setStage] = useState("intent");
  const [category, setCategory] = useState(null);
  const [details, setDetails] = useState(emptyDetails);
  const [contact, setContact] = useState(emptyContact);
  const panelRef = useRef(null);
  const closeRef = useRef(null);

  const reset = useCallback(() => {
    setStage("intent");
    setCategory(null);
    setDetails(emptyDetails);
    setContact(emptyContact);
  }, []);

  const dismiss = useCallback(() => {
    closeInquiry();
    window.setTimeout(reset, 420);
  }, [closeInquiry, reset]);

  useEffect(() => {
    if (!isOpen) return undefined;

    const onKeyDown = (event) => { if (event.key === "Escape") dismiss(); };
    const scrollbar = window.innerWidth - document.documentElement.clientWidth;
    const { overflow, paddingRight } = document.body.style;

    // Hiding the scrollbar widens the viewport. Body padding holds flowed content
    // still; centred fixed elements need half that width back to stay put.
    const navbar = document.querySelector("[data-hero-navbar]");
    const navbarMargin = navbar?.style.marginLeft ?? "";

    document.body.style.overflow = "hidden";
    if (scrollbar > 0) {
      document.body.style.paddingRight = `${scrollbar}px`;
      if (navbar) navbar.style.marginLeft = `-${scrollbar / 2}px`;
    }
    window.dispatchEvent(new CustomEvent("myarchitects:carousel-gesture", { detail: { active: true } }));
    window.addEventListener("keydown", onKeyDown);
    const focusFrame = requestAnimationFrame(() => closeRef.current?.focus({ preventScroll: true }));

    return () => {
      cancelAnimationFrame(focusFrame);
      window.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = overflow;
      document.body.style.paddingRight = paddingRight;
      if (navbar) navbar.style.marginLeft = navbarMargin;
      window.dispatchEvent(new CustomEvent("myarchitects:carousel-gesture", { detail: { active: false } }));
    };
  }, [isOpen, dismiss]);

  const activeImage = category ?? inquiryCategories[0];

  const selectCategory = (item) => {
    setCategory(item);
    setStage("details");
  };

  const submitDetails = (event) => { event.preventDefault(); setStage("contact"); };
  const submitInquiry = (event) => { event.preventDefault(); setStage("confirmed"); };

  const updateDetails = (field) => (event) => setDetails((current) => ({ ...current, [field]: event.target.value }));
  const updateContact = (field) => (event) => setContact((current) => ({ ...current, [field]: event.target.value }));

  return (
    <div className={`${styles.overlay} ${isOpen ? styles.open : ""}`} aria-hidden={!isOpen}>
      <button type="button" className={styles.scrim} onClick={dismiss} tabIndex={-1} aria-label="Close inquiry" />

      <div
        ref={panelRef}
        className={styles.panel}
        role="dialog"
        aria-modal="true"
        aria-labelledby="inquiry-heading"
      >
        <button ref={closeRef} type="button" className={styles.close} onClick={dismiss}>
          <span>Close</span>
          <X size={16} weight="light" aria-hidden="true" />
        </button>

        <div className={styles.inner}>
          <div className={styles.copyColumn}>
            {stage === "intent" && (
              <div className={styles.stagePane} key="intent">
                <p className={styles.eyebrow}>Begin a project</p>
                <h2 id="inquiry-heading" className={styles.heading}>How can we help bring your vision to life?</h2>
                <p className={styles.lede}>Select the type of project you are planning so we can tailor the experience to you.</p>

                <div className={styles.categories}>
                  {inquiryCategories.map((item) => (
                    <button type="button" className={styles.category} key={item.id} onClick={() => selectCategory(item)}>
                      <span className={styles.categoryLabel}>{item.label}</span>
                      <span className={styles.categoryNote}>{item.note}</span>
                      <ArrowRight className={styles.categoryArrow} size={18} weight="light" aria-hidden="true" />
                    </button>
                  ))}
                </div>
              </div>
            )}

            {stage === "details" && (
              <div className={styles.stagePane} key="details">
                <p className={styles.context}>{category?.label}</p>
                <h2 id="inquiry-heading" className={styles.heading}>Tell us about your project.</h2>
                <p className={styles.lede}>A few details help us understand the ambition, scale and rhythm of the work ahead.</p>

                <form className={styles.form} onSubmit={submitDetails}>
                  <div className={styles.fieldRow}>
                    <label className={styles.field}>
                      <span>Location</span>
                      <input type="text" value={details.location} onChange={updateDetails("location")} placeholder="City or site address" required />
                    </label>
                    <label className={styles.field}>
                      <span>Project size</span>
                      <input type="text" value={details.size} onChange={updateDetails("size")} placeholder="Approximate area or units" />
                    </label>
                  </div>

                  <div className={styles.fieldRow}>
                    <label className={styles.field}>
                      <span>Timeline</span>
                      <select value={details.timeline} onChange={updateDetails("timeline")} required>
                        <option value="" disabled>Select a timeline</option>
                        {timelineOptions.map((option) => <option key={option} value={option}>{option}</option>)}
                      </select>
                    </label>
                    <label className={styles.field}>
                      <span>Budget range</span>
                      <select value={details.budget} onChange={updateDetails("budget")} required>
                        <option value="" disabled>Select a range</option>
                        {budgetOptions.map((option) => <option key={option} value={option}>{option}</option>)}
                      </select>
                    </label>
                  </div>

                  <label className={`${styles.field} ${styles.fieldWide}`}>
                    <span>Project description</span>
                    <textarea rows={3} value={details.description} onChange={updateDetails("description")} placeholder="What are you imagining?" required />
                  </label>

                  <div className={styles.actions}>
                    <button type="button" className={styles.back} onClick={() => setStage("intent")}>Back</button>
                    <button type="submit" className={styles.advance}>Continue <ArrowRight size={16} weight="light" aria-hidden="true" /></button>
                  </div>
                </form>
              </div>
            )}

            {stage === "contact" && (
              <div className={styles.stagePane} key="contact">
                <p className={styles.context}>{category?.label}</p>
                <h2 id="inquiry-heading" className={styles.heading}>Where should we reach you?</h2>
                <p className={styles.lede}>We will review what you have shared and come back to you personally.</p>

                <form className={styles.form} onSubmit={submitInquiry}>
                  <div className={styles.fieldRow}>
                    <label className={styles.field}>
                      <span>Name</span>
                      <input type="text" value={contact.name} onChange={updateContact("name")} placeholder="Your full name" required />
                    </label>
                    <label className={styles.field}>
                      <span>Email</span>
                      <input type="email" value={contact.email} onChange={updateContact("email")} placeholder="you@studio.com" required />
                    </label>
                  </div>

                  <div className={styles.fieldRow}>
                    <label className={styles.field}>
                      <span>Phone number</span>
                      <input type="tel" value={contact.phone} onChange={updateContact("phone")} placeholder="Optional" />
                    </label>
                    <label className={styles.field}>
                      <span>Preferred contact method</span>
                      <select value={contact.method} onChange={updateContact("method")}>
                        {contactMethods.map((option) => <option key={option} value={option}>{option}</option>)}
                      </select>
                    </label>
                  </div>

                  <div className={styles.actions}>
                    <button type="button" className={styles.back} onClick={() => setStage("details")}>Back</button>
                    <button type="submit" className={styles.advance}>Submit Inquiry <ArrowRight size={16} weight="light" aria-hidden="true" /></button>
                  </div>
                </form>
              </div>
            )}

            {stage === "confirmed" && (
              <div className={styles.stagePane} key="confirmed">
                <p className={styles.context}>{category?.label}</p>
                <h2 id="inquiry-heading" className={styles.heading}>Thank you. Your project conversation has begun.</h2>
                <p className={styles.lede}>We have received your inquiry and will be in touch shortly to arrange an initial conversation.</p>
                <div className={styles.actions}>
                  <button type="button" className={styles.advance} onClick={dismiss}>Close</button>
                </div>
              </div>
            )}
          </div>

          <div className={styles.mediaColumn} aria-hidden="true">
            {inquiryCategories.map((item) => (
              <img
                key={item.id}
                className={`${styles.media} ${item.id === activeImage.id ? styles.mediaActive : ""}`}
                src={item.image}
                alt=""
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default InquiryOverlay;
