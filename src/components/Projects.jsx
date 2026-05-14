import { CgWebsite } from "react-icons/cg";
import { BsGithub } from "react-icons/bs";

const projects = [
  {
    title: 'YelpCamp',
    description: 'A full-stack campground review platform with complete CRUD functionality. Integrated image uploads via Cloudinary and interactive maps with MapTiler. Built with Node.js, Express.js, MongoDB, and EJS.',
    github: 'https://github.com/Prashantkumar22205/YelpCamp',
    demo: 'https://yelpcamp-r3fv.onrender.com',
  },
  {
    title: 'Music App Backend',
    description: 'A role-based authentication system for a music application supporting User and Artist roles. Developed secure REST APIs with Express.js and JWT authentication. Designed MongoDB data models and middleware for route protection.',
    github: 'https://github.com/Prashantkumar22205',
    demo: null,
  },
  {
    title: 'Backend Ledger',
    description: 'A backend-focused financial ledger application to manage and track transactions securely. Built with RESTful APIs and MongoDB, supporting CRUD operations for transactions, error handling, and validation.',
    github: 'https://github.com/Prashantkumar22205',
    demo: null,
  },
];

const Projects = () => {
  return (
    <section id="projects" className="section" style={{ textAlign: 'center', paddingTop: 80 }}>
      <h1 style={{ fontSize: '2.6em', paddingBottom: '20px' }}>
        My Recent <strong className="purple">Works</strong>
      </h1>
      <p style={{ color: "white" }}>
        Here are a few projects I've worked on recently.
      </p>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '40px', paddingTop: '50px', paddingBottom: '50px', maxWidth: 1200, margin: '0 auto' }}>
        {projects.map((p, index) => (
          <div key={index} className="project-card">
            <h3 style={{ paddingBottom: '20px' }}>{p.title}</h3>
            <p style={{ textAlign: "justify", paddingBottom: '20px', flex: 1, color: 'var(--text-muted)' }}>
              {p.description}
            </p>
            <div style={{ display: 'flex', gap: 15, justifyContent: 'center', marginTop: 'auto' }}>
              <a href={p.github} target="_blank" rel="noopener noreferrer" className="btn-primary">
                <BsGithub /> &nbsp; GitHub
              </a>
              {p.demo && (
                <a href={p.demo} target="_blank" rel="noopener noreferrer" className="btn-primary">
                  <CgWebsite /> &nbsp; Demo
                </a>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Projects;
