# STRUCTURE

## Directory Layout

```text
/
├── .planning/                  # GSD planning and codebase documents
├── public/                     # Static assets that bypass Vite's asset pipeline
├── src/
│   ├── assets/                 # Local media assets (images, SVGs)
│   ├── components/             # Reusable UI components and page sections
│   │   ├── About.jsx
│   │   ├── Contact.jsx
│   │   ├── Footer.jsx
│   │   ├── Hero.jsx
│   │   ├── Navbar.jsx
│   │   ├── Particle.jsx
│   │   ├── Projects.jsx
│   │   └── Skills.jsx
│   ├── App.css                 # Application-specific styles
│   ├── App.jsx                 # Root layout component
│   ├── index.css               # Global styles and CSS variables
│   └── main.jsx                # React DOM entry point
├── eslint.config.js            # Linter configuration
├── index.html                  # HTML template
├── package.json                # Dependencies and scripts
└── vite.config.js              # Vite configuration
```

## Component Organization
All React components are kept flat in the `src/components/` directory. Given the scope of a portfolio site, this flat structure is adequate, though sub-directories for individual sections (e.g., `components/Hero/`) could be used if components become more complex.
