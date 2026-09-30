import LinkedInIcon from '@mui/icons-material/LinkedIn';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import InstagramIcon from '@mui/icons-material/Instagram';
import EmailIcon from '@mui/icons-material/Email';
import avatar from '../assets/images/avatar.png';
import '../assets/styles/Main.scss';

function HeroLinks({ className }) {
  return (
    <div className={className}>
      <a
        className="social-link"
        href="https://www.linkedin.com/in/muthupriya-s-9160b4291?utm_source=share_via&utm_content=profile&utm_medium=member_android"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="LinkedIn profile"
        title="LinkedIn"
      >
        <LinkedInIcon aria-hidden="true" />
      </a>
      <a
        className="social-link"
        href="https://wa.me/91824806739"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="WhatsApp chat"
        title="WhatsApp"
      >
        <WhatsAppIcon aria-hidden="true" />
      </a>
      <a
        className="social-link"
        href="https://www.instagram.com/thekey2biz?stkn=MWZjeDE3YWg1eGcyMA=="
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Instagram profile"
        title="Instagram"
      >
        <InstagramIcon aria-hidden="true" />
      </a>
      <a
        className="social-link"
        href="mailto:muthupriya09022003@gmail.com"
        aria-label="Email Muthupriya"
        title="Email"
      >
        <EmailIcon aria-hidden="true" />
      </a>
      <a
        className="resume-button"
        href={`${process.env.PUBLIC_URL}/assets/resume.pdf`}
        download="Muthupriya_Resume.pdf"
        aria-label="Download Resume"
      >
        Resume
      </a>
    </div>
  );
}

function Main() {

  return (
    <div className="container">
      <div className="about-section">
        <div className="image-wrapper">
          <img src={avatar} alt="Muthupriya S" />
        </div>
        <div className="content">
          <HeroLinks className="social_icons" />
          <h1>Muthupriya S</h1>
          <p>Digital Marketing Manager | AI &amp; Growth Strategist</p>

          <HeroLinks className="mobile_social_icons" />
        </div>
      </div>
    </div>
  );
}

export default Main;
