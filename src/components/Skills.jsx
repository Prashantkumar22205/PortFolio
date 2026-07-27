import { motion } from 'framer-motion';
import {
  DiJavascript1, DiReact, DiNodejs, DiMongodb, DiGit, DiHtml5, DiCss3, DiPython,
} from 'react-icons/di';
import {
  SiExpress, SiPostman, SiCloudinary, SiDocker, SiTailwindcss,
  SiBootstrap, SiVite, SiCplusplus, SiMysql, SiGithub,
  SiVercel, SiRender, SiRedux, SiGoogle,
} from 'react-icons/si';
import { ShieldCheck, FileText, KeyRound, Globe, BrainCircuit, Code, Terminal, Workflow, Cloud } from 'lucide-react';
import { useAntigravity } from '../hooks/useAntigravity';

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.5, ease: 'easeOut', delay },
});

const SKILL_GROUPS = [
  {
    label: 'Frontend Development',
    skills: [
      { icon: <DiReact />,        name: 'React.js' },
      // { icon: <SiRedux />,        name: 'Redux / Context API' },
      { icon: <DiJavascript1 />,  name: 'JavaScript (ES6+)' },
      { icon: <DiHtml5 />,        name: 'HTML5' },
      { icon: <DiCss3 />,         name: 'CSS3' },
      { icon: <SiTailwindcss />,  name: 'Tailwind CSS' },
      { icon: <SiBootstrap />,    name: 'Bootstrap' },
      { icon: <SiVite />,         name: 'Vite' },
    ],
  },
  {
    label: 'Backend & Database',
    skills: [
      { icon: <DiNodejs />,          name: 'Node.js' },
      { icon: <SiExpress />,         name: 'Express.js' },
      { icon: <DiMongodb />,         name: 'MongoDB' },
      { icon: <SiMysql />,           name: 'SQL / MySQL' },
      { icon: <Globe size={32} />,   name: 'RESTful APIs' },
      { icon: <KeyRound size={32} />,    name: 'JWT Auth' },
      { icon: <ShieldCheck size={32} />, name: 'Passport.js' },
      { icon: <SiCloudinary />,      name: 'Cloudinary' },
    ],
  },
  {
    label: 'AI Integrations & Tools',
    skills: [
      { icon: <BrainCircuit size={32} />, name: 'Google Gemini API' },
      { icon: <FileText size={32} />,     name: 'Puppeteer (PDF Export)' },
      { icon: <SiGoogle />,               name: 'Google OAuth 2.0' },
    ],
  },
  {
    label: 'Programming Languages',
    skills: [
      { icon: <DiJavascript1 />, name: 'JavaScript' },
      { icon: <SiCplusplus />,   name: 'C++' },
      { icon: <DiPython />,      name: 'Python' },
      { icon: <span style={{ fontFamily: 'monospace', fontSize: '2.2rem', fontWeight: 800, color: '#94a3b8' }}>C</span>, name: 'C' },
    ],
  },
  {
    label: 'DevOps, Cloud & Developer Tools',
    skills: [
      { icon: <DiGit />,             name: 'Git' },
      { icon: <SiGithub />,          name: 'GitHub' },
      { icon: <SiPostman />,         name: 'Postman' },
      // { icon: <SiDocker />,          name: 'Docker' },
      { icon: <Cloud size={32} />,   name: 'AWS (Basic)' },
      { icon: <SiVercel />,          name: 'Vercel' },
      { icon: <SiRender />,          name: 'Render' },
      { icon: <Code size={32} />,    name: 'VS Code' },
      // { icon: <Workflow size={32} />, name: 'GitHub Actions' },
    ],
  },
];

const LEARNING = [
  'CI/CD Pipelines (GitHub Actions)',
  'Docker & Containerization',
  'AWS Services (EC2, S3)',
  'System Design & Microservices Architecture',
];

const Skills = () => {
  const controls = useAntigravity();

  return (
    <motion.div animate={controls}>
      <section id="skills" className="section">
        <div className="section-inner">
          <motion.p className="section-tag" {...fadeUp(0)}>// what I work with</motion.p>
          <motion.h2 className="section-title" {...fadeUp(0.05)}>
            My <span className="accent">Skillset & Tools</span>
          </motion.h2>
          <motion.p className="section-sub" {...fadeUp(0.1)}>
            Technologies, frameworks, and developer tools I use to build robust, scalable applications.
          </motion.p>

          <div className="skills-wrap">
            {SKILL_GROUPS.map(({ label, skills }, gi) => (
              <motion.div key={label} {...fadeUp(0.1 + gi * 0.06)}>
                <div className="skill-group-title">{label}</div>
                <div className="skills-grid">
                  {skills.map(({ icon, name }) => (
                    <div className="skill-card" key={name}>
                      <span className="skill-icon">{icon}</span>
                      <span className="skill-name">{name}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}

            {/* Currently Learning */}
            <motion.div {...fadeUp(0.4)}>
              <div className="skill-group-title">Currently Expanding Skills</div>
              <div className="learning-badges">
                {LEARNING.map(item => (
                  <span key={item} className="learning-badge">
                    🚀 {item}
                  </span>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </motion.div>
  );
};

export default Skills;
