import { useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import seoGrowthCampaign from '../assets/images/seo-growth-campaign.png';
import googleAdsLeadGeneration from '../assets/images/google-ads-lead-generation.png';
import socialMediaBrandBuilding from '../assets/images/social-media-brand-building.png';
import whatsappApiMarketing from '../assets/images/whatsapp-api-marketing.png';
import aiBusinessAutomation from '../assets/images/ai-business-automation.png';
import websiteDevelopment from '../assets/images/website-development.png';
import '../assets/styles/Project.scss';

gsap.registerPlugin(ScrollTrigger);

const projects = [
    {
        title: "SEO Growth Campaigns",
        description: "Improved website ranking and organic traffic through SEO strategies.",
        label: "SEO",
        image: seoGrowthCampaign
    },
    {
        title: "Google Ads Lead Generation",
        description: "Generated quality leads through optimized Google Ads campaigns.",
        label: "Google Ads",
        image: googleAdsLeadGeneration
    },
    {
        title: "Social Media Brand Building",
        description: "Increased engagement and brand awareness through social media marketing.",
        label: "Social Media",
        image: socialMediaBrandBuilding
    },
    {
        title: "WhatsApp API Marketing",
        description: "Automated bulk messaging and customer communication using WhatsApp API.",
        label: "WhatsApp API",
        image: whatsappApiMarketing
    },
    {
        title: "AI Business Automation",
        description: "AI-powered automation solutions for workflow optimization.",
        label: "AI",
        image: aiBusinessAutomation
    },
    {
        title: "Website Development",
        description: "Created responsive websites and improved online business presence.",
        label: "Website",
        image: websiteDevelopment
    }
];

function Project() {
    const sectionRef = useRef(null);

    useLayoutEffect(() => {
        if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return undefined;

        const context = gsap.context(() => {
            gsap.from(".projects-container > h1", {
                autoAlpha: 0,
                y: 30,
                duration: 0.7,
                ease: "power2.out",
                scrollTrigger: {
                    trigger: ".projects-container > h1",
                    start: "top 85%",
                    once: true,
                },
            });

            gsap.utils.toArray(".project-media img").forEach((image, index) => {
                gsap.set(image, { clearProps: "transform" });
                gsap.from(image, {
                    autoAlpha: 0,
                    duration: 0.65,
                    delay: (index % 2) * 0.1,
                    ease: "power2.out",
                    scrollTrigger: {
                        trigger: image,
                        start: "top 88%",
                        once: true,
                    },
                });
            });
        }, sectionRef);

        return () => context.revert();
    }, []);

    return(
    <div className="projects-container" id="projects" ref={sectionRef}>
        <h1>Personal Projects</h1>
        <div className="projects-grid">
            {projects.map((project) => (
                <div className="project" key={project.title}>
                    <div className="project-media">
                        <img src={project.image} alt={`${project.title} thumbnail`} />
                    </div>
                    <div className="project-copy">
                        <h2>{project.title}</h2>
                        <p>{project.description}</p>
                    </div>
                </div>
            ))}
        </div>
    </div>
    );
}

export default Project;
