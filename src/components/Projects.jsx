import { motion } from 'framer-motion';
import Tilt from 'react-parallax-tilt';
import { PROJECTS } from '../data/projects';
import { useAntigravity } from '../hooks/useAntigravity';

const GitHubIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
  </svg>
);

const ExternalIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6"/>
    <polyline points="15 3 21 3 21 9"/>
    <line x1="10" y1="14" x2="21" y2="3"/>
  </svg>
);

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.5, ease: 'easeOut', delay },
});

const ProjectCard = ({ project, featured = false }) => (
  <Tilt
    tiltMaxAngleX={featured ? 2 : 5}
    tiltMaxAngleY={featured ? 2 : 5}
    transitionSpeed={2000}
    scale={1.01}
    style={{ height: '100%', display: 'flex' }}
  >
    <div className={`project-card${featured ? ' project-card-featured' : ''}`}>
      <div className="project-header">
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexWrap: 'wrap' }}>
          <h3 className="project-title">{project.title}</h3>
          {featured && <span className="project-badge">⭐ Featured</span>}
        </div>
        <div className="project-links">
          <a
            href={project.github}
            target="_blank" rel="noopener noreferrer"
            className="project-link"
            aria-label={`${project.title} GitHub`}
          >
            <GitHubIcon />
          </a>
          {project.demo && (
            <a
              href={project.demo}
              target="_blank" rel="noopener noreferrer"
              className="project-link"
              aria-label={`${project.title} live demo`}
            >
              <ExternalIcon />
            </a>
          )}
        </div>
      </div>

      <p className="project-desc">{project.description}</p>

      <div className="project-tags">
        {project.tags.map(t => <span key={t} className="tag">{t}</span>)}
      </div>
    </div>
  </Tilt>
);

const Projects = () => {
  const controls = useAntigravity();
  const featured = PROJECTS.find(p => p.featured);
  const regular  = PROJECTS.filter(p => !p.featured);

  return (
    <motion.div animate={controls}>
      <section id="projects" className="section">
        <div className="section-inner">
          <motion.p className="section-tag" {...fadeUp(0)}>// what I've built</motion.p>
          <motion.h2 className="section-title" {...fadeUp(0.05)}>
            My Recent <span className="accent">Works</span>
          </motion.h2>
          <motion.p className="section-sub" {...fadeUp(0.1)}>
            A selection of projects that reflect my skills and approach to problem-solving.
          </motion.p>

          {/* Featured project — full width */}
          {featured && (
            <motion.div style={{ marginTop: 48 }} {...fadeUp(0.15)}>
              <ProjectCard project={featured} featured />
            </motion.div>
          )}

          {/* Regular projects grid */}
          <div className="projects-grid" style={{ marginTop: 24 }}>
            {regular.map((p, i) => (
              <motion.div key={p.title} {...fadeUp(0.1 + i * 0.1)} style={{ display: 'flex' }}>
                <ProjectCard project={p} />
              </motion.div>
            ))}
          </div>

          {/* Edit hint */}
          <motion.p
            style={{ marginTop: 32, color: 'var(--muted-2)', fontSize: '0.8rem', fontFamily: 'var(--mono)', textAlign: 'center' }}
            {...fadeUp(0.4)}
          >
            {'// Edit src/data/projects.js to add or update projects'}
          </motion.p>
        </div>
      </section>
    </motion.div>
  );
};

export default Projects;
