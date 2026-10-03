import { useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import seoGrowthCampaign from "../assets/images/seo-growth-campaign.png";
import googleAdsLeadGeneration from "../assets/images/google-ads-lead-generation.png";
import socialMediaBrandBuilding from "../assets/images/social-media-brand-building.png";
import whatsappApiMarketing from "../assets/images/whatsapp-api-marketing.png";
import aiBusinessAutomation from "../assets/images/ai-business-automation.png";
import websiteDevelopment from "../assets/images/website-development.png";
import "../assets/styles/Project.scss";

gsap.registerPlugin(ScrollTrigger);

const projects = [
  {
    title: "SEO Growth Campaigns",
    description: "Improved website ranking and organic traffic through SEO strategies.",
    label: "SEO",
    image: seoGrowthCampaign,
  },
  {
    title: "Google Ads Lead Generation",
    description: "Generated quality leads through optimized Google Ads campaigns.",
    label: "Google Ads",
    image: googleAdsLeadGeneration,
  },
  {
    title: "Social Media Brand Building",
    description: "Increased engagement and brand awareness through social media marketing.",
    label: "Social Media",
    image: socialMediaBrandBuilding,
  },
  {
    title: "WhatsApp API Marketing",
    description: "Automated bulk messaging and customer communication using WhatsApp API.",
    label: "WhatsApp API",
    image: whatsappApiMarketing,
  },
  {
    title: "AI Business Automation",
    description: "AI-powered automation solutions for workflow optimization.",
    label: "AI",
    image: aiBusinessAutomation,
  },
  {
    title: "Website Development",
    description: "Created responsive websites and improved online business presence.",
    label: "Website",
    image: websiteDevelopment,
  },
];

function Project() {
  const sectionRef = useRef(null);

  useLayoutEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return undefined;

    const media = gsap.matchMedia(sectionRef);
    const context = gsap.context(() => {
      gsap.from(".project-section__header > *", {
        autoAlpha: 0, y: 26, duration: 0.62, stagger: 0.1, ease: "power3.out",
        scrollTrigger: { trigger: sectionRef.current, start: "top 73%", once: true },
      });

      gsap.utils.toArray(".project-feature").forEach((project, index) => {
        const direction = index % 2 === 0 ? -1 : 1;
        gsap.from(project, {
          autoAlpha: 0,
          x: direction * 24,
          y: 18,
          duration: 0.68,
          ease: "power3.out",
          scrollTrigger: { trigger: project, start: "top 82%", once: true },
        });
        gsap.from(project.querySelector(".project-feature__visual"), {
          clipPath: index % 2 === 0 ? "inset(0 0 100% 0)" : "inset(0 100% 0 0)",
          duration: 0.9,
          ease: "power3.inOut",
          scrollTrigger: { trigger: project, start: "top 79%", once: true },
        });
        gsap.from(project.querySelectorAll(".project-feature__meta span"), {
          autoAlpha: 0, y: 9, duration: 0.36, stagger: 0.08, ease: "power2.out",
          scrollTrigger: { trigger: project, start: "top 68%", once: true },
        });
        gsap.from(project.querySelector(".project-feature__copy h3, .project-feature__copy p"), {
          autoAlpha: 0, y: 14, duration: 0.48, stagger: 0.1, ease: "power2.out",
          scrollTrigger: { trigger: project, start: "top 65%", once: true },
        });
      });
    }, sectionRef);

    // Pointer values stay on the image element, so continuous cursor movement
    // never causes React renders. The animation loop eases back to rest on leave.
    const pointerMedia = window.matchMedia("(hover: hover) and (pointer: fine)");
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const pointerCleanups = [];
    if (pointerMedia.matches && !reducedMotion.matches) {
      sectionRef.current.querySelectorAll(".project-feature__visual").forEach((visual) => {
        const image = visual.querySelector("img");
        const state = { x: 0, y: 0, tiltX: 0, tiltY: 0, scale: 1, targetX: 0, targetY: 0, targetTiltX: 0, targetTiltY: 0, targetScale: 1, frame: 0 };
        const render = () => {
          state.frame = 0;
          state.x += (state.targetX - state.x) * 0.12;
          state.y += (state.targetY - state.y) * 0.12;
          state.tiltX += (state.targetTiltX - state.tiltX) * 0.12;
          state.tiltY += (state.targetTiltY - state.tiltY) * 0.12;
          state.scale += (state.targetScale - state.scale) * (state.targetScale === 1 ? 0.075 : 0.14);
          image.style.setProperty("--project-pointer-x", `${state.x.toFixed(2)}px`);
          image.style.setProperty("--project-pointer-y", `${state.y.toFixed(2)}px`);
          image.style.setProperty("--project-tilt-x", `${state.tiltX.toFixed(3)}deg`);
          image.style.setProperty("--project-tilt-y", `${state.tiltY.toFixed(3)}deg`);
          image.style.setProperty("--project-image-scale", state.scale.toFixed(4));
          const moving = Math.abs(state.targetX - state.x) + Math.abs(state.targetY - state.y) + Math.abs(state.targetTiltX - state.tiltX) + Math.abs(state.targetTiltY - state.tiltY) + Math.abs(state.targetScale - state.scale) > 0.01;
          if (moving) state.frame = requestAnimationFrame(render);
        };
        const schedule = () => { if (!state.frame) state.frame = requestAnimationFrame(render); };
        const onEnter = () => { visual.dataset.pointerActive = "true"; state.targetScale = 1.045; schedule(); };
        const onMove = (event) => {
          const bounds = visual.getBoundingClientRect();
          const nx = Math.max(-1, Math.min(1, (event.clientX - bounds.left) / bounds.width * 2 - 1));
          const ny = Math.max(-1, Math.min(1, (event.clientY - bounds.top) / bounds.height * 2 - 1));
          state.targetX = nx * 3;
          state.targetY = ny * 3;
          state.targetTiltY = nx * 1.1;
          state.targetTiltX = -ny * 1.1;
          schedule();
        };
        const onLeave = () => {
          delete visual.dataset.pointerActive;
          state.targetX = 0; state.targetY = 0; state.targetTiltX = 0; state.targetTiltY = 0; state.targetScale = 1;
          schedule();
        };
        visual.addEventListener("pointerenter", onEnter);
        visual.addEventListener("pointermove", onMove);
        visual.addEventListener("pointerleave", onLeave);
        pointerCleanups.push(() => {
          visual.removeEventListener("pointerenter", onEnter);
          visual.removeEventListener("pointermove", onMove);
          visual.removeEventListener("pointerleave", onLeave);
          if (state.frame) cancelAnimationFrame(state.frame);
        });
      });
    }

    media.add("(min-width: 901px)", () => {
      gsap.utils.toArray(".project-feature__visual img").forEach((image) => {
        gsap.to(image, {
          "--project-scroll-y": "-3%",
          ease: "none",
          scrollTrigger: {
            trigger: image.closest(".project-feature"),
            start: "top bottom",
            end: "bottom top",
            scrub: 0.8,
          },
        });
      });
    });

    return () => {
      context.revert();
      media.revert();
      pointerCleanups.forEach((cleanup) => cleanup());
    };
  }, []);

  return (
    <section className="project-section" id="projects" ref={sectionRef} aria-labelledby="projects-title">
      <div className="section-wrap">
        <header className="project-section__header">
          <p className="section-kicker">Selected work</p>
          <h2 className="section-heading" id="projects-title">Ideas put to <em>work.</em></h2>
          <p className="section-intro">A selection of campaigns and digital projects across search, social, automation and web.</p>
        </header>

        <div className="projects-grid">
          {projects.map((project, index) => (
            <article className={`project-feature project-feature--${index + 1}`} key={project.title}>
              <div className="project-feature__visual">
                <img src={project.image} alt={`${project.title} preview`} loading={index > 1 ? "lazy" : "eager"} />
              </div>
              <div className="project-feature__copy">
                <div className="project-feature__meta">
                  <span>{String(index + 1).padStart(2, "0")}</span>
                  <span>{project.label}</span>
                </div>
                <h3>{project.title}</h3>
                <p>{project.description}</p>
              </div>
            </article>
          ))}
        </div>
      </div>

    </section>
  );
}

export default Project;
