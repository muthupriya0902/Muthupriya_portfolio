import { useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBriefcase } from "@fortawesome/free-solid-svg-icons";
import "../assets/styles/Timeline.scss";

gsap.registerPlugin(ScrollTrigger);

const experiences = [
  {
    title: "Digital Marketing Manager",
    company: "BrixHive",
    date: "May 2026 - Present",
    description: "Managed Google and Meta Ads, SEO, social media marketing, and performance reporting to drive brand growth.",
  },
  {
    title: "Digital Marketing Executive",
    company: "Digicuz",
    date: "September 2025 - May 2026",
    description: "Improved on-page and off-page SEO, wrote blogs, and managed WordPress marketing activities.",
  },
  {
    title: "Digital Marketing Executive",
    company: "Revenoxsoft Technologies",
    date: "April 2025 - April 2026",
    description: "Managed social media, advertising, SEO, email, and WhatsApp API campaigns while organizing customer data.",
  },
  {
    title: "Digital Marketing Executive",
    company: "Nuage Compusys Technologies",
    date: "December 2024 - April 2025",
    description: "Built social media engagement, executed paid campaigns, and analyzed performance to support brand growth.",
  },
];

function Timeline() {
  const sectionRef = useRef(null);

  useLayoutEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return undefined;

    const context = gsap.context(() => {
      gsap.to(".career-timeline", {
        "--history-progress": 1,
        ease: "none",
        scrollTrigger: {
          trigger: ".career-timeline",
          start: "top 60%",
          end: "bottom 55%",
          scrub: 0.45,
        },
      });

      const entries = gsap.utils.toArray(".career-entry");
      entries.forEach((entry, index) => {
        gsap.from(entry, {
          autoAlpha: 0,
          x: index % 2 === 0 ? 22 : -22,
          y: 12,
          duration: 0.62,
          ease: "power3.out",
          scrollTrigger: { trigger: entry, start: "top 82%", once: true },
        });
        ScrollTrigger.create({
          trigger: entry,
          start: "top 58%",
          end: "bottom 42%",
          onToggle: (self) => {
            if (self.isActive) {
              entries.forEach((item) => item.classList.remove("is-active"));
              entry.classList.add("is-active");
            } else {
              entry.classList.remove("is-active");
            }
          },
        });
      });
    }, sectionRef);

    return () => context.revert();
  }, []);

  return (
    <section className="history-section" id="history" ref={sectionRef} aria-labelledby="history-title">
      <div className="section-wrap">
        <header className="history-header">
          <p className="section-kicker">Career history</p>
          <h2 className="section-heading" id="history-title">Built through <em>practice.</em></h2>
          <p className="section-intro">Roles across digital marketing, search, social media and automation.</p>
        </header>

        <ol className="career-timeline">
          {experiences.map((experience, index) => (
            <li className="career-entry" key={`${experience.company}-${experience.date}`}>
              <p className="career-entry__date">{experience.date}</p>
              <span className="career-entry__marker" aria-hidden="true">
                <FontAwesomeIcon icon={faBriefcase} />
              </span>
              <article className="career-entry__content">
                <span className="career-entry__index" aria-hidden="true">0{index + 1}</span>
                <h3>{experience.title}</h3>
                <h4>{experience.company}</h4>
                <p>{experience.description}</p>
              </article>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

export default Timeline;
