import { useState, useEffect } from 'react';
import { Home, User, Laptop, FileText, Mail } from 'lucide-react';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`sticky-nav ${scrolled ? 'scrolled' : ''}`}>
      <div style={{ fontSize: '1.8rem', fontWeight: 800, color: 'var(--imp-text-color)' }}>
        Pk.
      </div>
      <div className="nav-links">
        <a href="#"><Home size={18} /> Home</a>
        <a href="#about"><User size={18} /> About</a>
        <a href="#skills"><Laptop size={18} /> Skills</a>
        <a href="#projects"><Laptop size={18} /> Projects</a>
        <a href="https://docs.google.com/document/d/1jgTYHqvXY0nqd9CxneEFje58BvxKydf0/edit?usp=sharing&ouid=102185671022795345100&rtpof=true&sd=true" target="_blank" rel="noopener noreferrer"><FileText size={18} /> Resume</a>
        <a href="#contact" className="btn-primary" style={{ border: 'none', marginLeft: 10 }}>
          <Mail size={18} /> Contact
        </a>
      </div>
      <style>{`
        @media (max-width: 768px) {
          .nav-links { display: none; }
        }
      `}</style>
    </nav>
  );
};

export default Navbar;
