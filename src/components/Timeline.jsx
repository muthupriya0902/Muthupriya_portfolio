import { useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBriefcase } from '@fortawesome/free-solid-svg-icons';
import { VerticalTimeline, VerticalTimelineElement }  from 'react-vertical-timeline-component';
import 'react-vertical-timeline-component/style.min.css';
import '../assets/styles/Timeline.scss'

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
  {
    title: "Digital Marketing Executive",
    company: "Digicuz",
    date: "September 2025 - May 2026",
    description: "Improved on-page and off-page SEO, wrote blogs, and managed WordPress marketing activities.",
  },
];

function Timeline() {
  const sectionRef = useRef(null);

  useLayoutEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return undefined;

    const context = gsap.context(() => {
      const isMobile = window.matchMedia("(max-width: 767px)").matches;
      const items = gsap.utils.toArray(".vertical-timeline-element");
      const sequence = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 72%",
          end: "bottom 28%",
          toggleActions: "play none none none",
          once: true,
        },
      });

      sequence.fromTo(
        ".items-container > h1",
        { autoAlpha: 0, y: 20 },
        { autoAlpha: 1, y: 0, duration: 0.55, ease: "power2.out" },
        0
      );
      sequence.fromTo(
        ".vertical-timeline",
        { "--history-line-progress": 0 },
        { "--history-line-progress": 1, duration: 3.25, ease: "power1.inOut" },
        0.2
      );

      items.forEach((item, index) => {
        const milestone = item.querySelector(".vertical-timeline-element-icon");
        const card = item.querySelector(".vertical-timeline-element-content");
        const fromX = isMobile ? 24 : index % 2 === 0 ? -30 : 30;
        const position = 0.65 + index * 0.72;

        sequence.fromTo(
          milestone,
          { autoAlpha: 0, scale: 0.5 },
          { autoAlpha: 1, scale: 1, duration: 0.38, ease: "power2.out" },
          position
        );
        sequence.fromTo(
          card,
          { autoAlpha: 0, x: fromX, y: 16 },
          { autoAlpha: 1, x: 0, y: 0, duration: 0.5, ease: "power2.out" },
          position + 0.16
        );
      });

    }, sectionRef);

    return () => context.revert();
  }, []);

  return (
    <div id="history" ref={sectionRef}>
      <div className="items-container">
        <h1>Career History</h1>
        <VerticalTimeline animate={false}>
          {experiences.map((experience, index) => (
            <VerticalTimelineElement
              key={`${experience.company}-${experience.date}`}
              className="vertical-timeline-element--work"
              position={index % 2 === 0 ? "left" : "right"}
              contentStyle={{ background: "white", color: "rgb(39, 40, 34)" }}
              contentArrowStyle={{ borderRight: "7px solid white" }}
              date={experience.date}
              iconStyle={{ background: "#5000ca", color: "white" }}
              icon={<FontAwesomeIcon icon={faBriefcase} />}
            >
              <h3 className="vertical-timeline-element-title">{experience.title}</h3>
              <h4 className="vertical-timeline-element-subtitle">{experience.company}</h4>
              <p>{experience.description}</p>
            </VerticalTimelineElement>
          ))}
        </VerticalTimeline>
      </div>
    </div>
  );
}

export default Timeline;
