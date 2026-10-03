import { useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRobot, faCogs, faChartLine } from "@fortawesome/free-solid-svg-icons";
import "../assets/styles/Expertise.scss";

gsap.registerPlugin(ScrollTrigger);

const capabilities = [
  {
    title: "Digital Marketing & SEO",
    description: "I create data-driven digital marketing strategies to improve online visibility and drive business growth.",
    skills: ["Digital Marketing", "SEO", "Google Ads", "Meta Ads", "Website Management"],
    icon: faChartLine,
  },
  {
    title: "Social Media & Growth",
    description: "I help brands build a strong social media presence and engage their audience effectively.",
    skills: ["Social Media Marketing", "Social Media Management", "Ads Campaign", "WhatsApp API Marketing", "Excel"],
    icon: faRobot,
  },
  {
    title: "AI & Marketing Automation",
    description: "I leverage AI tools and automation to streamline marketing processes and maximize results.",
    skills: ["Python", "Power BI", "Data Analysis", "AI Tools", "Marketing Automation"],
    icon: faCogs,
  },
];

function Expertise() {
  const sectionRef = useRef(null);

  useLayoutEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return undefined;

    const context = gsap.context(() => {
      gsap.from(".expertise-header > *", {
        autoAlpha: 0, y: 20, duration: 0.55, stagger: 0.1, ease: "power2.out",
        scrollTrigger: { trigger: sectionRef.current, start: "top 74%", once: true },
      });
      gsap.utils.toArray(".capability-row").forEach((row, index) => {
        gsap.from(row, {
          autoAlpha: 0,
          x: index % 2 === 0 ? 30 : -30,
          duration: 0.68,
          ease: "power3.out",
          scrollTrigger: { trigger: row, start: "top 82%", once: true },
        });
        gsap.from(row.querySelectorAll(".capability-skills span"), {
          autoAlpha: 0, y: 8, duration: 0.3, stagger: 0.035, ease: "power2.out",
          scrollTrigger: { trigger: row, start: "top 72%", once: true },
        });
      });
    }, sectionRef);

    return () => context.revert();
  }, []);

  return (
    <section className="expertise-section" id="expertise" ref={sectionRef} aria-labelledby="expertise-title">
      <div className="expertise-section__inner section-wrap">
        <header className="expertise-header">
          <p className="section-kicker">Expertise</p>
          <h2 className="section-heading" id="expertise-title">Many levers.<br /><em>One direction.</em></h2>
          <p className="section-intro">From discovery to retention, each channel has a role in a connected growth strategy.</p>
        </header>

        <div className="capability-list">
          {capabilities.map((capability, index) => (
            <article className="capability-row" key={capability.title}>
              <span className="capability-index" aria-hidden="true">0{index + 1}</span>
              <div className="capability-main">
                <FontAwesomeIcon className="capability-icon" icon={capability.icon} aria-hidden="true" />
                <h3>{capability.title}</h3>
                <p>{capability.description}</p>
              </div>
              <div className="capability-skills" aria-label={`${capability.title} skills`}>
                {capability.skills.map((skill) => <span key={skill}>{skill}</span>)}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Expertise;
