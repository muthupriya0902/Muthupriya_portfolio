import React from "react";
import SchoolIcon from '@mui/icons-material/School';
import WorkIcon from '@mui/icons-material/Work';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import '../assets/styles/About.scss';

const hardSkills = ["Python", "Microsoft Office", "Digital Marketing", "Data Analysis"];
const interests = ["Power BI", "SEO", "Excel", "WordPress", "Website Development", "Ads Campaign", "Social Media Marketing"];
const softSkills = ["Leadership", "Master minded", "Communication", "Problem Solving"];
const workshops = ["Personality Development", "Hands-on Training on Digital Marketing"];
const certifications = [
  "Communicating with Impact",
  "Non-Formal Sanskrit Education",
  "NPTEL - Leadership & Team Effectiveness",
  "NPTEL - Management Information System"
];

function About() {
  return (
    <div className="about-details-container">
      <div className="about-details-grid">
        <div>
          <h1>About Me</h1>
          <p>
            I am S. Muthupriya, a Digital Marketing Manager with 3+ years of experience in Digital Marketing,
            SEO, Social Media Management, Google Ads, Meta Ads, WhatsApp API Marketing, and Website Management.
            I hold a B.Sc. in Computer Science and an MBA, which gives me a strong foundation in both technology
            and business strategy.
          </p>
          <p>
            I am passionate about creating data-driven marketing strategies, leveraging AI tools, and driving
            brand growth. I love exploring new technologies and finding innovative ways to help businesses reach
            their goals.
          </p>
          <div className="education-inline">
            <span><SchoolIcon/> B.Sc. Computer Science</span>
            <span><SchoolIcon/> MBA</span>
          </div>
        </div>
        <div className="quick-facts">
          <h3>Quick Facts</h3>
          <p><WorkIcon/> 3+ Years Experience</p>
          <p><LocationOnIcon/> Bengaluru, India</p>
          <p><EmailIcon/> muthupriya09022003@gmail.com</p>
          <p><PhoneIcon/> 8248068739</p>
          <p><LinkedInIcon/> LinkedIn Profile</p>
        </div>
      </div>

      <h2>My Skills</h2>
      <div className="about-card-grid">
        <div className="about-card">
          <h3>Hard Skills</h3>
          <ul>{hardSkills.map((item) => <li key={item}>{item}</li>)}</ul>
        </div>
        <div className="about-card">
          <h3>Area of Interest</h3>
          <ul>{interests.map((item) => <li key={item}>{item}</li>)}</ul>
        </div>
        <div className="about-card">
          <h3>Soft Skills</h3>
          <ul>{softSkills.map((item) => <li key={item}>{item}</li>)}</ul>
        </div>
      </div>

      <h2>Education &amp; Certifications</h2>
      <div className="about-card-grid">
        <div className="about-card">
          <h3>Education</h3>
          <ul>
            <li>B.Sc. Computer Science</li>
            <li>MBA</li>
          </ul>
        </div>
        <div className="about-card">
          <h3>Workshops</h3>
          <ul>{workshops.map((item) => <li key={item}>{item}</li>)}</ul>
        </div>
        <div className="about-card">
          <h3>Certifications</h3>
          <ul>{certifications.map((item) => <li key={item}>{item}</li>)}</ul>
        </div>
      </div>
    </div>
  );
}

export default About;
