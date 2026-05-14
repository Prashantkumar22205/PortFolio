import { AiFillGithub } from "react-icons/ai";
import { FaLinkedinIn } from "react-icons/fa";

const Footer = () => {
  let date = new Date();
  let year = date.getFullYear();
  return (
    <footer style={{ backgroundColor: 'rgba(10, 4, 22, 0.9)', padding: '20px 0', marginTop: 'auto', borderTop: '1px solid rgba(199, 112, 240, 0.2)' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', padding: '0 5%', gap: 15 }}>
        <div style={{ color: 'white' }}>
          <h3>Designed and Developed by Prashant Kumar</h3>
        </div>
        <div style={{ color: 'white' }}>
          <h3>Copyright © {year} Pk</h3>
        </div>
        <ul style={{ listStyleType: 'none', display: 'flex', gap: 20, margin: 0, padding: 0 }}>
          <li>
            <a
              href="https://github.com/Prashantkumar22205"
              style={{ color: "white", fontSize: '1.4em' }}
              target="_blank" 
              rel="noopener noreferrer"
            >
              <AiFillGithub />
            </a>
          </li>
          <li>
            <a
              href="https://www.linkedin.com/in/prashant-kumar-868308296"
              style={{ color: "white", fontSize: '1.4em' }}
              target="_blank" 
              rel="noopener noreferrer"
            >
              <FaLinkedinIn />
            </a>
          </li>
        </ul>
      </div>
    </footer>
  );
};

export default Footer;
