import { useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "../assets/styles/About.scss";

gsap.registerPlugin(ScrollTrigger);

const growthPath = [
  { title: "Discover", details: "SEO · Google Ads · Meta Ads" },
  { title: "Connect", details: "Social media · WhatsApp API" },
  { title: "Understand", details: "Data analysis · Power BI" },
  { title: "Automate", details: "AI tools · Marketing automation" },
];

function About() {
  const sectionRef = useRef(null);

  useLayoutEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return undefined;

    const context = gsap.context(() => {
      gsap.from(".about-copy .section-kicker", {
        autoAlpha: 0, x: -16, duration: 0.45, ease: "power2.out",
        scrollTrigger: { trigger: sectionRef.current, start: "top 76%", once: true },
      });
      gsap.from(".about-copy .section-heading", {
        autoAlpha: 0, yPercent: 18, clipPath: "inset(0 0 100% 0)", duration: 0.8, ease: "power3.out",
        scrollTrigger: { trigger: sectionRef.current, start: "top 70%", once: true },
      });
      gsap.fromTo(".about-copy .section-intro", { autoAlpha: 0.35, y: 16 }, {
        autoAlpha: 1, y: 0, ease: "none",
        scrollTrigger: { trigger: sectionRef.current, start: "top 62%", end: "top 34%", scrub: 0.6 },
      });
      gsap.from(".growth-path__item", {
        autoAlpha: 0, x: 22, duration: 0.54, stagger: 0.14, ease: "power2.out",
        scrollTrigger: { trigger: ".growth-path", start: "top 74%", once: true },
      });
    }, sectionRef);

    return () => context.revert();
  }, []);

  return (
    <section className="about-section" id="about" ref={sectionRef} aria-labelledby="about-title">
      <div className="about-section__inner section-wrap">
        <div className="about-copy">
          <p className="section-kicker">The approach</p>
          <h2 className="section-heading" id="about-title">Growth is a <em>connected</em> practice.</h2>
          <p className="section-intro">
            I create data-driven digital marketing strategies to improve online visibility and drive business growth.
          </p>
        </div>

        <ol className="growth-path" aria-label="A connected approach to digital growth">
          {growthPath.map((step, index) => (
            <li className="growth-path__item" key={step.title}>
              <span className="growth-path__index" aria-hidden="true">0{index + 1}</span>
              <div className="growth-path__copy">
                <h3>{step.title}</h3>
                <p>{step.details}</p>
              </div>
              <span className="growth-path__arrow" aria-hidden="true">↗</span>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

export default About;
