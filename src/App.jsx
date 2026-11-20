import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Contact from './components/Contact';
import Footer from './components/Footer';
import Background from './components/Background';
import { ArrowUp } from 'lucide-react';
import useSmoothScroll from './hooks/useSmoothScroll';
import './index.css';

const Preloader = () => (
  <motion.div
    className="preloader"
    exit={{ opacity: 0 }}
    transition={{ duration: 0.5 }}
  >
    <div className="preloader-logo">Pk.</div>
    <div className="preloader-bar">
      <div className="preloader-fill" />
    </div>
  </motion.div>
);

function App() {
  const [loading, setLoading] = useState(true);
  const progressRef = useRef(null);
  const cursorRef = useRef(null);

  useSmoothScroll({ active: !loading, progressRef, cursorRef });

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 1400);
    return () => clearTimeout(t);
  }, []);

  return (
    <>
      <AnimatePresence>
        {loading && <Preloader key="preloader" />}
      </AnimatePresence>

      {!loading && (
        <div className="App" id="top">
          <a className="skip-link" href="#main-content">Skip to content</a>
          <div ref={progressRef} className="scroll-progress" aria-hidden="true" />
          <div ref={cursorRef} className="custom-cursor" aria-hidden="true" />
          <Background />
          <Navbar />
          <main id="main-content">
            <Hero />
            <div className="marquee" aria-label="Full stack, MERN, AI apps, backend, React"><div className="marquee-track">{Array.from({ length: 2 }, (_, index) => <span key={index}>FULL STACK <i>•</i> MERN <i>•</i> AI APPS <i>•</i> BACKEND <i>•</i> REACT <i>•</i>&nbsp;</span>)}</div></div>
            <section className="impact-strip" aria-label="Portfolio highlights">
              {[['04+', 'Projects shipped'], ['15+', 'Technologies used'], ['2027', 'Graduation year'], ['∞', 'Always learning']].map(([number, label], index) => <div className="impact-item" key={label}><span className="impact-index">0{index + 1}</span><strong>{number}</strong><span>{label}</span></div>)}
            </section>
            <About />
            <Skills />
            <Projects />
            <section className="section journey-section" id="journey"><div className="section-inner"><p className="section-tag">05 / THE ROAD AHEAD <span>Learning by building</span></p><h2 className="section-title">A practice of <em>progress.</em></h2><div className="journey-list"><article><b>NOW</b><div><h3>Building with MERN + AI</h3><p>Creating full stack projects and exploring AI integrations.</p></div></article><article><b>2027</b><div><h3>B.Tech, Computer Science</h3><p>Graduating from ABES Engineering College.</p></div></article><article><b>NEXT</b><div><h3>Ready for what’s next</h3><p>Open to internships and full-time roles.</p></div></article></div></div></section>
            <Contact />
          </main>
          <Footer />
          <a className="back-top" href="#top" aria-label="Back to top"><ArrowUp size={17} /></a>
        </div>
      )}
    </>
  );
}

export default App;
