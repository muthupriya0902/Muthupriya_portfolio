import { useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "../assets/styles/ParallaxBackground.scss";

gsap.registerPlugin(ScrollTrigger);

const blobSpeeds = [0.6, 0.8, 1.0, 1.2, 1.4, 1.6, 1.8, 1.1, 1.5, 0.9];

function ParallaxBackground() {
  const backgroundRef = useRef(null);

  useLayoutEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return undefined;
    }

    const context = gsap.context(() => {
      const blobs = gsap.utils.toArray(".parallax-background__blob");
      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger: document.documentElement,
          start: "top top",
          end: "max",
          scrub: 0.6,
          invalidateOnRefresh: true,
        },
      });

      blobs.forEach((blob) => {
        const speed = Number(blob.dataset.speed);
        timeline.to(
          blob,
          {
            y: () => -window.innerHeight * 0.14 * speed,
            ease: "none",
          },
          0
        );
      });
    }, backgroundRef);

    return () => context.revert();
  }, []);

  return (
    <div
      ref={backgroundRef}
      className="parallax-background"
      aria-hidden="true"
    >
      {blobSpeeds.map((speed, index) => (
        <span
          className={`parallax-background__blob parallax-background__blob--${index + 1}`}
          data-speed={speed}
          key={index}
        />
      ))}
    </div>
  );
}

export default ParallaxBackground;
