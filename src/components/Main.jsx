import { useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import avatar from "../assets/images/avatar.png";
import ribbonArtwork from "../assets/images/bg-dark.png";
import "../assets/styles/Main.scss";

gsap.registerPlugin(ScrollTrigger);

function Main() {
  const heroRef = useRef(null);

  useLayoutEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return undefined;

    const context = gsap.context(() => {
      const intro = gsap.timeline({ defaults: { ease: "power3.out" }, delay: 0.08 });
      intro.from(".hero-copy .hero-name", {
        autoAlpha: 0,
        y: 12,
        duration: 0.48,
        clearProps: "all",
      })
        .from(".hero-copy h1 .hero-title-line", {
          yPercent: 110,
          autoAlpha: 0,
          duration: 0.82,
          stagger: 0.13,
          clearProps: "all",
        }, "-=0.12")
        .from(".hero-copy .hero-role, .hero-copy .hero-actions", {
          autoAlpha: 0,
          y: 18,
          duration: 0.55,
          stagger: 0.12,
          clearProps: "all",
        }, "-=0.18")
        .from(".hero-portrait", {
          autoAlpha: 0,
          y: 34,
          rotate: 0,
          duration: 0.82,
          ease: "power3.out",
          clearProps: "all",
        }, 0.24)
        .from(".hero-ribbon", {
          autoAlpha: 0,
          scale: 0.96,
          duration: 1,
          ease: "power2.out",
          clearProps: "all",
        }, 0.3);

      const heroExit = gsap.timeline({
        scrollTrigger: {
          trigger: heroRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 0.65,
        },
      });
      heroExit.to(".hero-copy", { y: -44, autoAlpha: 0.16, ease: "none" }, 0)
        .to(".hero-portrait", { yPercent: -58, rotate: -1, scale: 0.96, ease: "none" }, 0)
        .to(".hero-ribbon", { xPercent: 3, yPercent: -54, ease: "none" }, 0);
    }, heroRef);

    return () => context.revert();
  }, []);

  return (
    <section className="hero-section" id="home" ref={heroRef} aria-labelledby="hero-title">
      <div className="hero-section__inner section-wrap">
        <div className="hero-copy">
          <p className="hero-name">Muthupriya S</p>
          <h1 id="hero-title"><span className="hero-title-line">Make every</span><br /><span className="hero-title-line hero-title-line--accent">signal count.</span></h1>
          <p className="hero-role">Digital Marketing Manager <i aria-hidden="true">/</i> AI &amp; Growth Strategist</p>
          <div className="hero-actions">
            <a className="hero-action hero-action--primary" href="#projects">
              Explore selected work <span aria-hidden="true">↘</span>
            </a>
            <a
              className="hero-action hero-action--secondary"
              href={`${process.env.PUBLIC_URL}/assets/resume.pdf`}
              download="Muthupriya_Resume.pdf"
              aria-label="Download Muthupriya's resume"
            >
              Download resume <span aria-hidden="true">↓</span>
            </a>
          </div>
        </div>

        <div className="hero-collage" role="group" aria-label="Portrait and campaign artwork">
          <img className="hero-ribbon" src={ribbonArtwork} alt="" aria-hidden="true" />
          <figure className="hero-portrait">
            <img src={avatar} alt="Muthupriya S" />
            <figcaption>Digital strategy · Campaigns · Growth</figcaption>
          </figure>
        </div>
      </div>
    </section>
  );
}

export default Main;
