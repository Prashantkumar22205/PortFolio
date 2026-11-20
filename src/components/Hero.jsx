import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { useAntigravity } from '../hooks/useAntigravity';
import profile from '../assets/pic3.png';
import SandPortrait from './SandPortrait';

const RESUME_LINK = "https://drive.google.com/file/d/1wbFl0agMoyyWur_G9ftdMsAkx3zbR4w6/view?usp=sharing";

const ROLES = [
  'Full Stack Developer',
  'MERN Stack Engineer',
  'Backend Developer',
  'AI App Builder',
];

const Hero = () => {
  const controls = useAntigravity();
  const [roleIndex, setRoleIndex] = useState(0);
  const [displayed, setDisplayed] = useState('');
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const target = ROLES[roleIndex];
    let timeout;
    if (!deleting && displayed.length < target.length) {
      timeout = setTimeout(() => setDisplayed(target.slice(0, displayed.length + 1)), 70);
    } else if (!deleting && displayed.length === target.length) {
      timeout = setTimeout(() => setDeleting(true), 1800);
    } else if (deleting && displayed.length > 0) {
      timeout = setTimeout(() => setDisplayed(displayed.slice(0, -1)), 40);
    } else {
      timeout = setTimeout(() => {
        setDisplayed('');
        setDeleting(false);
        setRoleIndex((i) => (i + 1) % ROLES.length);
      }, 0);
    }
    return () => clearTimeout(timeout);
  }, [displayed, deleting, roleIndex]);

  return (
    <motion.section animate={controls} id="home" className="hero">
      <div className="hero-stage">
      <div className="hero-grid">

        <motion.div
          className="hero-copy"
          initial={{ opacity: 1, x: 0 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
        >
          <div className="hero-badge">
            <span className="dot" /> Available for Internships & Full-time Roles
          </div>

          <h1 className="hero-name">
            Hi, I'm<br />
            Prashant Kumar <span className="wave" role="img" aria-label="waving hand">👋🏻</span>
          </h1>

          <p className="hero-role">
            {displayed}<span className="cursor" aria-hidden="true" />
          </p>

          <p className="hero-desc">
            A <strong>MERN Stack developer</strong> passionate about building scalable web apps and
            solving real-world problems with technology — including AI-powered ones.
            Currently in 4th year B.Tech (CSE) at{' '}
            <span className="accent">ABES Engineering College</span>, Ghaziabad.
          </p>

          <div className="hero-ctas">
            <a href="#projects" className="btn btn-primary">
              View My Work ↓
            </a>
            <a href={RESUME_LINK} target="_blank" rel="noopener noreferrer" className="btn btn-outline">
              <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"/>
              </svg>
              Download CV
            </a>
          </div>

          <div className="hero-socials">
            <a href="https://github.com/Prashantkumar22205" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
              <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/></svg>
            </a>
            <a href="https://www.linkedin.com/in/prashant-kumar-868308296" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
              <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
            </a>
            <a href="mailto:prashantkumar100185@gmail.com" aria-label="Email">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="18" height="18"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
            </a>
          </div>
        </motion.div>

        <motion.div
          className="hero-img-wrap"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: 'easeOut', delay: 0.15 }}
        >
          <div className="hero-ghost" aria-hidden="true">PRASHANT</div>
          <div className="hero-portrait-frame" aria-hidden="true" />
          <div className="portrait-stack">
            <img src={profile} alt="" aria-hidden="true" className="hero-photo-underlay" />
            <SandPortrait src={profile} alt="Prashant Kumar" className="hero-img sand-portrait" />
          </div>
          <div className="hero-chip chip-react">React</div><div className="hero-chip chip-node">Node.js</div>
          <div className="hero-chip chip-mongo">MongoDB</div><div className="hero-chip chip-express">Express</div><div className="hero-chip chip-gemini">Gemini AI</div>
          <div className="hero-stat hero-stat-one"><strong>4+</strong><span>Projects shipped</span></div>
          <div className="hero-stat hero-stat-two"><strong>MERN</strong><span>Full stack</span></div>
          <div className="orbit-badge" aria-label="Available for internships and full-time roles"><svg viewBox="0 0 100 100" aria-hidden="true"><defs><path id="badge-circle" d="M50,50 m-36,0 a36,36 0 1,1 72,0 a36,36 0 1,1 -72,0" /></defs><text><textPath href="#badge-circle">AVAILABLE FOR INTERNSHIPS • FULL-TIME ROLES • </textPath></text></svg><ArrowUpRight size={20} /></div>
        </motion.div>

      </div>
      <div className="hero-bottom"><span><i className="scroll-line" /> Scroll to discover</span><span>01 / PRESENCE</span></div>
      </div>
    </motion.section>
  );
};

export default Hero;
