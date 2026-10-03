import { useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import InstagramIcon from "@mui/icons-material/Instagram";
import ArrowOutwardIcon from "@mui/icons-material/ArrowOutward";
import "../assets/styles/Footer.scss";

gsap.registerPlugin(ScrollTrigger);

function Footer() {
  const footerRef = useRef(null);

  useLayoutEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return undefined;

    let removeMagneticHandlers = () => {};
    const context = gsap.context(() => {
      const entrance = gsap.timeline({
        scrollTrigger: { trigger: footerRef.current, start: "top 76%", once: true },
      });
      entrance.from(".contact-main .section-kicker", { autoAlpha: 0, x: -16, duration: 0.42, ease: "power2.out" })
        .from(".contact-main .section-heading", { autoAlpha: 0, y: 34, clipPath: "inset(0 0 100% 0)", duration: 0.75, ease: "power3.out" }, "-=0.12")
        .from(".contact-email", { autoAlpha: 0, y: 12, duration: 0.42, ease: "power2.out" }, "-=0.22")
        .from(".contact-primary", { autoAlpha: 0, x: 20, duration: 0.5, ease: "power3.out" }, "-=0.38")
        .from(".contact-socials a", { autoAlpha: 0, y: 12, scale: 0.92, duration: 0.35, stagger: 0.07, ease: "power2.out" }, "-=0.2")
        .from(".contact-bottom", { autoAlpha: 0, y: 10, duration: 0.38, ease: "power2.out" }, "-=0.06");

      const primary = footerRef.current.querySelector(".contact-primary");
      const moveX = gsap.quickTo(primary, "x", { duration: 0.35, ease: "power3.out" });
      const moveY = gsap.quickTo(primary, "y", { duration: 0.35, ease: "power3.out" });
      const pointerMove = (event) => {
        if (event.pointerType !== "mouse" || !window.matchMedia("(min-width: 761px)").matches) return;
        const bounds = primary.getBoundingClientRect();
        const x = event.clientX - bounds.left - bounds.width / 2;
        const y = event.clientY - bounds.top - bounds.height / 2;
        moveX(gsap.utils.clamp(-6, 6, x * 0.12));
        moveY(gsap.utils.clamp(-5, 5, y * 0.16));
      };
      const pointerLeave = () => gsap.to(primary, { x: 0, y: 0, duration: 0.55, ease: "elastic.out(1, 0.45)", overwrite: true });
      primary.addEventListener("pointermove", pointerMove);
      primary.addEventListener("pointerleave", pointerLeave);
      removeMagneticHandlers = () => {
        primary.removeEventListener("pointermove", pointerMove);
        primary.removeEventListener("pointerleave", pointerLeave);
      };
    }, footerRef);

    return () => {
      removeMagneticHandlers();
      context.revert();
    };
  }, []);

  return (
    <footer className="contact-section" id="contact" ref={footerRef} aria-labelledby="contact-title">
      <div className="contact-section__inner section-wrap">
        <div className="contact-main">
          <p className="section-kicker">Contact</p>
          <h2 className="section-heading" id="contact-title">Let’s make the next move <em>count.</em></h2>
          <p className="contact-email">muthupriya09022003@gmail.com</p>
        </div>

        <div className="contact-links" aria-label="Contact and social links">
          <a className="contact-primary" href="mailto:muthupriya09022003@gmail.com">
            <span>Email Muthupriya</span><ArrowOutwardIcon aria-hidden="true" />
          </a>
          <div className="contact-socials">
            <a href="https://www.linkedin.com/in/muthupriya-s-9160b4291?utm_source=share_via&utm_content=profile&utm_medium=member_android" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn profile">
              <LinkedInIcon aria-hidden="true" />
            </a>
            <a href="https://wa.me/91824806739" target="_blank" rel="noopener noreferrer" aria-label="WhatsApp chat">
              <WhatsAppIcon aria-hidden="true" />
            </a>
            <a href="https://www.instagram.com/thekey2biz?stkn=MWZjeDE3YWg1eGcyMA==" target="_blank" rel="noopener noreferrer" aria-label="Instagram profile">
              <InstagramIcon aria-hidden="true" />
            </a>
          </div>
        </div>
      </div>
      <div className="contact-bottom section-wrap">
        <p>Muthupriya S | Digital Marketing Manager | AI &amp; Growth Strategist</p>
        <a href="#home">Back to top <span aria-hidden="true">↑</span></a>
      </div>
    </footer>
  );
}

export default Footer;
