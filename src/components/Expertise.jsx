import { useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRobot, faCogs, faChartLine } from '@fortawesome/free-solid-svg-icons';
import Chip from '@mui/material/Chip';
import '../assets/styles/Expertise.scss';

gsap.registerPlugin(ScrollTrigger);

const labelsFirst = [
    "Digital Marketing",
    "SEO",
    "Google Ads",
    "Meta Ads",
    "Website Management"
];

const labelsSecond = [
    "Social Media Marketing",
    "Social Media Management",
    "Ads Campaign",
    "WhatsApp API Marketing",
    "Excel"
];

const labelsThird = [
    "Python",
    "Power BI",
    "Data Analysis",
    "AI Tools",
    "Marketing Automation"
];

function Expertise() {
    const sectionRef = useRef(null);

    useLayoutEffect(() => {
        if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return undefined;

        const context = gsap.context(() => {
            gsap.from(".skills-container > h1", {
                autoAlpha: 0,
                y: 30,
                duration: 0.7,
                ease: "power2.out",
                scrollTrigger: {
                    trigger: ".skills-container > h1",
                    start: "top 85%",
                    once: true,
                },
            });

            gsap.utils.toArray(".skill").forEach((skill) => {
                gsap.from(skill, {
                    autoAlpha: 0,
                    y: 20,
                    duration: 0.65,
                    ease: "power2.out",
                    scrollTrigger: {
                        trigger: skill,
                        start: "top 88%",
                        once: true,
                    },
                });
            });
        }, sectionRef);

        return () => context.revert();
    }, []);

    return (
    <div className="container" id="expertise" ref={sectionRef}>
        <div className="skills-container">
            <h1>Expertise</h1>
            <div className="skills-grid">
                <div className="skill">
                    <FontAwesomeIcon icon={faChartLine} size="3x"/>
                    <h3>Digital Marketing &amp; SEO</h3>
                    <p>I create data-driven digital marketing strategies to improve online visibility and drive business growth.</p>
                    <div className="flex-chips">
                        <span className="chip-title">Skills:</span>
                        {labelsFirst.map((label, index) => (
                            <Chip key={index} className='chip' label={label} />
                        ))}
                    </div>
                </div>

                <div className="skill">
                    <FontAwesomeIcon icon={faRobot} size="3x"/>
                    <h3>Social Media &amp; Growth</h3>
                    <p>I help brands build a strong social media presence and engage their audience effectively.</p>
                    <div className="flex-chips">
                        <span className="chip-title">Skills:</span>
                        {labelsSecond.map((label, index) => (
                            <Chip key={index} className='chip' label={label} />
                        ))}
                    </div>
                </div>

                <div className="skill">
                    <FontAwesomeIcon icon={faCogs} size="3x"/>
                    <h3>AI &amp; Marketing Automation</h3>
                    <p>I leverage AI tools and automation to streamline marketing processes and maximize results.</p>
                    <div className="flex-chips">
                        <span className="chip-title">Skills:</span>
                        {labelsThird.map((label, index) => (
                            <Chip key={index} className='chip' label={label} />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    </div>
    );
}

export default Expertise;
