import { useState, useEffect, useRef } from "react";
import { gsap } from "gsap";
import {
  Main,
  Timeline,
  Expertise,
  Project,
  Navigation,
  Footer,
} from "./components";
import FadeIn from './components/FadeIn';
import ParallaxBackground from './components/ParallaxBackground';
import './index.scss';

function App() {
    const [mode, setMode] = useState('dark');
    const wheelFrame = useRef(null);

    const handleModeChange = () => {
        if (mode === 'dark') {
            setMode('light');
        } else {
            setMode('dark');
        }
    }

    useEffect(() => {
        window.scrollTo({top: 0, left: 0, behavior: 'smooth'});
      }, []);

    useEffect(() => {
        if (!window.matchMedia("(pointer: fine)").matches) return undefined;

        let targetY = window.scrollY;
        let lastFrameTime = 0;
        let lastRenderedY = null;

        const animateScroll = (time) => {
            const currentY = window.scrollY;

            if (lastRenderedY !== null && Math.abs(currentY - lastRenderedY) > 2) {
                targetY = currentY;
                wheelFrame.current = null;
                lastFrameTime = 0;
                lastRenderedY = null;
                return;
            }

            const elapsed = lastFrameTime ? time - lastFrameTime : 16;
            lastFrameTime = time;
            const progress = 1 - Math.exp(-elapsed / 180);
            const nextY = currentY + (targetY - currentY) * progress;

            window.scrollTo(0, nextY);
            lastRenderedY = nextY;

            if (Math.abs(targetY - nextY) > 0.75) {
                wheelFrame.current = window.requestAnimationFrame(animateScroll);
            } else {
                window.scrollTo(0, targetY);
                wheelFrame.current = null;
                lastFrameTime = 0;
                lastRenderedY = null;
            }
        };

        const handleWheel = (event) => {
            if (event.ctrlKey || event.deltaY === 0) return;

            event.preventDefault();
            gsap.killTweensOf(window);

            const deltaMultiplier = event.deltaMode === WheelEvent.DOM_DELTA_LINE
                ? 16
                : event.deltaMode === WheelEvent.DOM_DELTA_PAGE
                    ? window.innerHeight
                    : 1;
            const scaledDelta = event.deltaY * deltaMultiplier * 0.72;
            const maxScroll = document.documentElement.scrollHeight - window.innerHeight;

            targetY = Math.max(0, Math.min(maxScroll, targetY + scaledDelta));

            if (wheelFrame.current === null) {
                targetY = Math.max(0, Math.min(maxScroll, window.scrollY + scaledDelta));
                lastRenderedY = window.scrollY;
                wheelFrame.current = window.requestAnimationFrame(animateScroll);
            }
        };

        window.addEventListener("wheel", handleWheel, { passive: false });

        return () => {
            window.removeEventListener("wheel", handleWheel);
            if (wheelFrame.current !== null) {
                window.cancelAnimationFrame(wheelFrame.current);
                wheelFrame.current = null;
            }
        };
    }, []);

    return (
    <div className={`main-container ${mode === 'dark' ? 'dark-mode' : 'light-mode'}`}>
        <ParallaxBackground />
        <Navigation parentToChild={{mode}} modeChange={handleModeChange}/>
        <FadeIn transitionDuration={700}>
            <Main/>
        </FadeIn>
        <Expertise/>
        <Timeline/>
        <Project/>
        <Footer />
    </div>
    );
}

export default App;
