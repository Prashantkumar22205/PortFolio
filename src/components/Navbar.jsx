import { useState, useEffect } from 'react';
import { Home, User, Cpu, FolderOpen, FileText, Mail } from 'lucide-react';

const RESUME_LINK = "https://drive.google.com/file/d/1wbFl0agMoyyWur_G9ftdMsAkx3zbR4w6/view?usp=sharing";

const NAV_LINKS = [
  { href: '#home',     icon: <Home size={14} />,       label: 'Home' },
  { href: '#about',    icon: <User size={14} />,       label: 'About' },
  { href: '#skills',   icon: <Cpu size={14} />,        label: 'Skills' },
  { href: '#projects', icon: <FolderOpen size={14} />, label: 'Projects' },
];

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const onResize = () => { if (window.innerWidth > 768) setMenuOpen(false); };
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  // Easter egg: triple-G antigravity
  useEffect(() => {
    let count = 0, timer, active = false;
    const onKey = (e) => {
      if (e.key.toLowerCase() !== 'g' || e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;
      count++;
      clearTimeout(timer);
      timer = setTimeout(() => { count = 0; }, 1000);
      if (count === 3) {
        active = !active;
        window.dispatchEvent(new CustomEvent('antigravity_toggle', { detail: { isAntigravity: active } }));
        count = 0;
      }
    };
    window.addEventListener('keydown', onKey);
    return () => { window.removeEventListener('keydown', onKey); clearTimeout(timer); };
  }, []);

  const closeMenu = () => setMenuOpen(false);

  return (
    <>
      <nav className={`navbar${scrolled ? ' scrolled' : ''}`} role="navigation" aria-label="Main navigation">
        <a href="#home" className="nav-logo" aria-label="Prashant Kumar — Home">Prashant</a>

        <div className="nav-links">
          {NAV_LINKS.map(({ href, icon, label }) => (
            <a key={href} href={href} className="nav-link">{icon} {label}</a>
          ))}
          <a href={RESUME_LINK} className="nav-link" target="_blank" rel="noopener noreferrer">
            <FileText size={14} /> Resume
          </a>
          <a href="#contact" className="nav-link nav-cta">
            <Mail size={14} /> Contact
          </a>
        </div>

        <button
          className={`hamburger${menuOpen ? ' open' : ''}`}
          onClick={() => setMenuOpen(o => !o)}
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={menuOpen}
        >
          <span /><span /><span />
        </button>
      </nav>

      <div className={`mobile-menu${menuOpen ? ' open' : ''}`} aria-hidden={!menuOpen}>
        {NAV_LINKS.map(({ href, icon, label }) => (
          <a key={href} href={href} className="nav-link" onClick={closeMenu}>{icon} {label}</a>
        ))}
        <a href={RESUME_LINK} className="nav-link" target="_blank" rel="noopener noreferrer" onClick={closeMenu}>
          <FileText size={14} /> Resume
        </a>
        <a href="#contact" className="nav-link nav-cta" onClick={closeMenu}>
          <Mail size={14} /> Contact
        </a>
      </div>
    </>
  );
};

export default Navbar;
