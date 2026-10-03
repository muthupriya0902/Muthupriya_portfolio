import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import AppBar from "@mui/material/AppBar";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import ArrowOutwardIcon from "@mui/icons-material/ArrowOutward";
import "../assets/styles/Navigation.scss";

gsap.registerPlugin(ScrollTrigger);

const navItems = [
  ["About", "about"],
  ["Projects", "projects"],
  ["Expertise", "expertise"],
  ["History", "history"],
];

function Navigation({ parentToChild, modeChange }) {
  const { mode } = parentToChild;
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const navRef = useRef(null);
  const navHiddenRef = useRef(false);
  const navigationScrollRef = useRef(false);
  const navigationFrameRef = useRef(0);
  const pendingSectionRef = useRef(null);

  useLayoutEffect(() => {
    const nav = navRef.current;
    if (!nav) return undefined;

    const updateNavbarOffset = () => {
      document.documentElement.style.setProperty(
        "--navbar-offset",
        `${nav.getBoundingClientRect().height}px`,
      );
    };

    const resizeObserver = "ResizeObserver" in window
      ? new ResizeObserver(updateNavbarOffset)
      : null;
    resizeObserver?.observe(nav);
    updateNavbarOffset();
    window.addEventListener("resize", updateNavbarOffset);

    return () => {
      resizeObserver?.disconnect();
      window.removeEventListener("resize", updateNavbarOffset);
      document.documentElement.style.removeProperty("--navbar-offset");
    };
  }, []);

  const scrollToTarget = useCallback((sectionElement, behavior) => {
    cancelAnimationFrame(navigationFrameRef.current);
    navigationScrollRef.current = true;

    const nav = navRef.current;
    if (navHiddenRef.current && nav) {
      navHiddenRef.current = false;
      const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (reducedMotion) gsap.set(nav, { yPercent: 0 });
      else gsap.to(nav, { yPercent: 0, duration: 0.34, ease: "power2.out", overwrite: true });
    }

    sectionElement.scrollIntoView({ behavior, block: "start" });

    let previousScrollY = window.scrollY;
    let stableFrames = 0;
    const startedAt = performance.now();
    const waitForScrollToSettle = () => {
      const currentScrollY = window.scrollY;
      stableFrames = Math.abs(currentScrollY - previousScrollY) < 0.5 ? stableFrames + 1 : 0;
      previousScrollY = currentScrollY;

      if ((performance.now() - startedAt >= 220 && stableFrames >= 8) || performance.now() - startedAt >= 5000) {
        navigationScrollRef.current = false;
        return;
      }

      navigationFrameRef.current = window.requestAnimationFrame(waitForScrollToSettle);
    };

    navigationFrameRef.current = window.requestAnimationFrame(waitForScrollToSettle);
  }, []);

  useLayoutEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return undefined;

    const context = gsap.context(() => {
      gsap.from(".site-nav__brand, .site-nav__link, .site-nav__contact, .site-nav__tools", {
        autoAlpha: 0,
        y: -7,
        duration: 0.42,
        stagger: 0.045,
        ease: "power2.out",
        clearProps: "all",
      });
    });

    return () => context.revert();
  }, []);

  useEffect(() => {
    const nav = navRef.current;
    if (!nav || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return undefined;

    const trigger = ScrollTrigger.create({
      onUpdate: (self) => {
        const desktop = window.matchMedia("(min-width: 761px)").matches;
        const hasFocus = nav.contains(document.activeElement);
        const shouldHide = desktop && self.scroll() > window.innerHeight * 0.72 && self.direction > 0 && !mobileOpen && !hasFocus && !navigationScrollRef.current;
        const pageProgress = gsap.utils.clamp(0, 1, self.scroll() / Math.max(1, ScrollTrigger.maxScroll(window)));
        nav.classList.toggle("site-nav--scrolled", self.scroll() > 12);
        nav.style.setProperty("--page-progress", `${pageProgress}`);

        if (shouldHide !== navHiddenRef.current) {
          navHiddenRef.current = shouldHide;
          gsap.to(nav, { yPercent: navHiddenRef.current ? -110 : 0, duration: 0.34, ease: "power2.out", overwrite: true });
        }
      },
    });

    return () => {
      trigger.kill();
      navHiddenRef.current = false;
      navigationScrollRef.current = false;
      gsap.set(nav, { clearProps: "transform" });
      nav.classList.remove("site-nav--scrolled");
      nav.style.removeProperty("--page-progress");
    };
  }, [mobileOpen]);

  useEffect(() => {
    if (!("IntersectionObserver" in window)) return undefined;

    const sections = ["home", ...navItems.map(([, id]) => id), "contact"]
      .map((id) => document.getElementById(id))
      .filter(Boolean);
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) setActiveSection(entry.target.id);
      });
    }, { rootMargin: "-32% 0px -58% 0px", threshold: 0 });

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const scrollToCurrentHash = () => {
      const section = decodeURIComponent(window.location.hash.slice(1));
      if (!section) return;

      const sectionElement = document.getElementById(section);
      if (!sectionElement) return;

      scrollToTarget(sectionElement, "instant");
      setActiveSection(section);
    };

    const frame = window.requestAnimationFrame(scrollToCurrentHash);
    window.addEventListener("popstate", scrollToCurrentHash);
    window.addEventListener("hashchange", scrollToCurrentHash);

    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener("popstate", scrollToCurrentHash);
      window.removeEventListener("hashchange", scrollToCurrentHash);
    };
  }, [scrollToTarget]);

  const scrollToSection = (event, section) => {
    event?.preventDefault();
    const sectionElement = document.getElementById(section);
    if (!sectionElement) return;

    if (window.location.hash !== `#${section}`) {
      window.history.pushState(null, "", `#${section}`);
    }

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const behavior = reducedMotion ? "instant" : "smooth";
    setActiveSection(section);

    if (mobileOpen) {
      pendingSectionRef.current = { sectionElement, behavior };
      setMobileOpen(false);
      return;
    }

    scrollToTarget(sectionElement, behavior);
  };

  const themeLabel = `Switch to ${mode === "dark" ? "light" : "dark"} mode`;

  return (
    <>
      <AppBar ref={navRef} component="nav" id="navigation" className={`site-nav ${mobileOpen ? "site-nav--menu-open" : ""}`} position="fixed" elevation={0}>
        <div className="site-nav__inner section-wrap">
          <a className="site-nav__brand" href="#home" onClick={(event) => scrollToSection(event, "home")} aria-label="Muthupriya S, home">
            <span className="site-nav__monogram" aria-hidden="true">M</span>
            <span className="site-nav__brand-name">Muthupriya S</span>
          </a>

          <div className="site-nav__links" aria-label="Main navigation">
            {navItems.map(([label, section]) => (
              <a
                className="site-nav__link"
                href={`#${section}`}
                key={section}
                onClick={(event) => scrollToSection(event, section)}
                aria-current={activeSection === section ? "location" : undefined}
              >
                {label}
              </a>
            ))}
            <a className="site-nav__contact" href="#contact" onClick={(event) => scrollToSection(event, "contact")} aria-current={activeSection === "contact" ? "location" : undefined}>
              Contact <ArrowOutwardIcon aria-hidden="true" />
            </a>
          </div>

          <div className="site-nav__tools">
            <IconButton
              className="site-nav__theme"
              onClick={modeChange}
              aria-label={themeLabel}
              title={themeLabel}
              size="small"
            >
              {mode === "dark" ? <LightModeIcon /> : <DarkModeIcon />}
            </IconButton>
            <IconButton
              className="site-nav__menu-toggle"
              onClick={() => setMobileOpen((open) => !open)}
              aria-label={mobileOpen ? "Close navigation menu" : "Open navigation menu"}
              aria-expanded={mobileOpen}
              aria-controls="mobile-navigation"
              size="small"
            >
              {mobileOpen ? <CloseIcon /> : <MenuIcon />}
            </IconButton>
          </div>
        </div>
      </AppBar>

      <Drawer
        className="site-drawer"
        anchor="top"
        open={mobileOpen}
        transitionDuration={window.matchMedia("(prefers-reduced-motion: reduce)").matches ? 0 : { enter: 270, exit: 210 }}
        onClose={() => setMobileOpen(false)}
        SlideProps={{
          onExited: () => {
            const pending = pendingSectionRef.current;
            if (!pending) return;
            pending.sectionElement.scrollIntoView({ behavior: pending.behavior, block: "start" });
            pendingSectionRef.current = null;
          },
        }}
        ModalProps={{ keepMounted: true }}
        PaperProps={{ id: "mobile-navigation", className: `site-drawer__paper ${mode}-mode` }}
      >
        <div className="site-drawer__top">
          <span>Menu</span>
          <IconButton onClick={() => setMobileOpen(false)} aria-label="Close navigation menu" size="small">
            <CloseIcon />
          </IconButton>
        </div>
        <nav className="site-drawer__nav" aria-label="Mobile navigation">
          {navItems.map(([label, section], index) => (
            <a
              href={`#${section}`}
              key={section}
              onClick={(event) => scrollToSection(event, section)}
              aria-current={activeSection === section ? "location" : undefined}
            >
              <span className="site-drawer__index">0{index + 1}</span>
              <span>{label}</span>
              <ArrowOutwardIcon aria-hidden="true" />
            </a>
          ))}
          <a href="#contact" onClick={(event) => scrollToSection(event, "contact")}>
            <span className="site-drawer__index">05</span>
            <span>Contact</span>
            <ArrowOutwardIcon aria-hidden="true" />
          </a>
        </nav>
      </Drawer>
    </>
  );
}

export default Navigation;
