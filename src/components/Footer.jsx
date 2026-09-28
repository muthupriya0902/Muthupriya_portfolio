import EmailIcon from '@mui/icons-material/Email';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import '../assets/styles/Footer.scss'

function Footer() {
  return (
    <footer>
      <div>
        <a href="mailto:muthupriya09022003@gmail.com" aria-label="Email S. Muthupriya"><EmailIcon/></a>
        <a
          href="https://www.linkedin.com/in/muthupriya-s-9160b4291?utm_source=share_via&utm_content=profile&utm_medium=member_android"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="LinkedIn profile"
        >
          <LinkedInIcon />
        </a>
      </div>
      <p>S. Muthupriya | Digital Marketing Manager | AI &amp; Growth Strategist</p>
    </footer>
  );
}

export default Footer;
