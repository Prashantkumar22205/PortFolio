import { motion } from 'framer-motion';
import Tilt from 'react-parallax-tilt';
import { useAntigravity } from '../hooks/useAntigravity';
import photoImg from '../assets/photo.png';

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.6, ease: 'easeOut', delay },
});

const About = () => {
  const controls = useAntigravity();

  return (
    <motion.div animate={controls}>
      <section id="about" className="section">
        <div className="section-inner">
          <motion.p className="section-tag" {...fadeUp(0)}>// who am I</motion.p>
          <motion.h2 className="section-title" {...fadeUp(0.05)}>
            Let Me <span className="accent">Introduce</span> Myself
          </motion.h2>

          <div className="about-grid">
            {/* Left: text + stats */}
            <motion.div className="about-text" {...fadeUp(0.1)}>
              <p>
                I'm a <strong>passionate Full Stack Developer</strong> who enjoys building scalable
                web applications and solving real-world problems through technology. Currently in my{' '}
                <span className="highlight">4th year of B.Tech in Computer Science & Engineering</span>{' '}
                at ABES Engineering College, Ghaziabad — graduating in 2027.
              </p>
              <p>
                I have hands-on experience with the <span className="highlight">MERN stack</span>,
                backend API development, and building AI-powered applications using{' '}
                <span className="highlight">Google's Gemini API</span>. I care about writing clean,
                maintainable code and shipping things that actually work.
              </p>
              <p>
                When I'm not coding, I'm probably reading about system design, exploring new tools,
                or debugging something that "should definitely work." I'm always eager to learn and
                improve my software engineering craft.
              </p>

              <div className="about-stats">
                <div className="stat-card">
                  <div className="stat-num">4+</div>
                  <div className="stat-label">Projects shipped</div>
                </div>
                <div className="stat-card">
                  <div className="stat-num">15+</div>
                  <div className="stat-label">Technologies used</div>
                </div>
                <div className="stat-card">
                  <div className="stat-num">2027</div>
                  <div className="stat-label">Expected graduation</div>
                </div>
                <div className="stat-card">
                  <div className="stat-num">∞</div>
                  <div className="stat-label">Cups of chai consumed ☕</div>
                </div>
              </div>
            </motion.div>

            {/* Right: code card */}
            <motion.div style={{ display: 'flex', flexDirection: 'column', gap: 28 }} {...fadeUp(0.2)}>
              <Tilt tiltMaxAngleX={6} tiltMaxAngleY={6} transitionSpeed={2000} scale={1.01}>
                <div className="code-card">
                  <div className="code-card-header">
                    <span className="code-dot code-dot-red" />
                    <span className="code-dot code-dot-yellow" />
                    <span className="code-dot code-dot-green" />
                    <span className="code-filename">prashant.js</span>
                  </div>
                  <div className="code-body">
                    <div><span className="code-key">const</span> <span style={{color:'#f1f5f9'}}>prashant</span> = {'{'}</div>
                    <div>&nbsp;&nbsp;<span className="code-key">name</span>: <span className="code-str">"Prashant Kumar"</span>,</div>
                    <div>&nbsp;&nbsp;<span className="code-key">role</span>: <span className="code-str">"Full Stack Developer"</span>,</div>
                    <div>&nbsp;&nbsp;<span className="code-key">college</span>: <span className="code-str">"ABES Engg. College, GZB"</span>,</div>
                    <div>&nbsp;&nbsp;<span className="code-key">branch</span>: <span className="code-str">"B.Tech – CSE (4th Year)"</span>,</div>
                    <div>&nbsp;&nbsp;<span className="code-key">graduating</span>: <span className="code-num">2027</span>,</div>
                    <div>&nbsp;&nbsp;<span className="code-key">stack</span>: [<span className="code-str">"React"</span>, <span className="code-str">"Node"</span>, <span className="code-str">"MongoDB"</span>],</div>
                    <div>&nbsp;&nbsp;<span className="code-key">learning</span>: [<span className="code-str">"CI/CD"</span>, <span className="code-str">"Docker"</span>, <span className="code-str">"AWS"</span>],</div>
                    <div>&nbsp;&nbsp;<span className="code-key">openTo</span>: <span className="code-str">"Internships & Full-time"</span>,</div>
                    <div>&nbsp;&nbsp;<span className="code-key">funFact</span>: <span className="code-str">"Built AI that interviews me 😄"</span>,</div>
                    <div>{'}'}</div>
                    <br />
                    <div><span className="code-comment">// always open to cool projects</span></div>
                    <div><span className="code-key">export default</span> prashant;</div>
                  </div>
                </div>
              </Tilt>
            </motion.div>
          </div>
        </div>
      </section>
    </motion.div>
  );
};

export default About;
