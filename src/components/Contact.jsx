import { AiFillGithub } from "react-icons/ai";
import { FaLinkedinIn } from "react-icons/fa";

const Contact = () => {
  return (
    <section id="contact" className="section" style={{ textAlign: 'center', paddingBottom: 150 }}>
      <h1 style={{ fontSize: '2.6em', paddingBottom: '20px' }}>FIND ME ON</h1>
      <p style={{ color: "white" }}>
        Feel free to <span className="purple">connect </span>with me
      </p>
      <ul style={{ listStyleType: 'none', display: 'flex', justifyContent: 'center', gap: 25, paddingTop: 20 }}>
        <li>
          <a
            href="https://github.com/Prashantkumar22205"
            target="_blank"
            rel="noreferrer"
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: 45,
              height: 45,
              backgroundColor: 'white',
              borderRadius: '50%',
              color: 'var(--imp-text-color)',
              fontSize: '1.4em',
              transition: 'all 0.3s ease'
            }}
            onMouseEnter={e => {
              e.currentTarget.style.backgroundColor = 'var(--imp-text-color)';
              e.currentTarget.style.color = 'white';
              e.currentTarget.style.boxShadow = '0 0 10px var(--imp-text-color)';
            }}
            onMouseLeave={e => {
              e.currentTarget.style.backgroundColor = 'white';
              e.currentTarget.style.color = 'var(--imp-text-color)';
              e.currentTarget.style.boxShadow = 'none';
            }}
          >
            <AiFillGithub />
          </a>
        </li>
        <li>
          <a
            href="https://www.linkedin.com/in/prashant-kumar-868308296"
            target="_blank"
            rel="noreferrer"
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: 45,
              height: 45,
              backgroundColor: 'white',
              borderRadius: '50%',
              color: 'var(--imp-text-color)',
              fontSize: '1.4em',
              transition: 'all 0.3s ease'
            }}
            onMouseEnter={e => {
              e.currentTarget.style.backgroundColor = 'var(--imp-text-color)';
              e.currentTarget.style.color = 'white';
              e.currentTarget.style.boxShadow = '0 0 10px var(--imp-text-color)';
            }}
            onMouseLeave={e => {
              e.currentTarget.style.backgroundColor = 'white';
              e.currentTarget.style.color = 'var(--imp-text-color)';
              e.currentTarget.style.boxShadow = 'none';
            }}
          >
            <FaLinkedinIn />
          </a>
        </li>
      </ul>
      <div style={{ paddingTop: 40 }}>
        <p style={{ color: 'var(--text-muted)' }}>Email me at: <a href="mailto:prashantkumar100185@gmail.com" className="purple" style={{ textDecoration: 'none', fontWeight: 600 }}>prashantkumar100185@gmail.com</a></p>
      </div>
    </section>
  );
};

export default Contact;
