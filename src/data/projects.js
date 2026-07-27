/**
 * ─────────────────────────────────────────────────────────────
 *  PROJECTS DATA FILE  — edit this file to update your projects
 *
 *  To add a project:    copy an object and fill in the fields.
 *  To edit a project:   change any field value below.
 *  To remove a project: delete the object from the array.
 *
 *  Fields:
 *    title      : string  — project name
 *    featured   : boolean — shows as a hero card at the top
 *    description: string  — short description shown on the card
 *    tags       : array   — tech stack pill labels
 *    github     : string  — GitHub repo URL
 *    demo       : string | null — live demo URL (null = hide button)
 * ─────────────────────────────────────────────────────────────
 */

export const PROJECTS = [
  {
    title: "InterviewPilot AI",
    featured: true,
    description:
      "An AI-powered interview preparation platform that analyses your resume and job description to generate personalised interview questions, identify skill gaps, and create customised preparation roadmaps. Generates ATS-friendly resumes in PDF format and provides AI-driven interview reports using Google's Gemini API.",
    tags: [
      "React.js", "Node.js", "Express.js", "MongoDB",
      "Google Gemini API", "Puppeteer", "JWT", "Google OAuth",
      "Bootstrap", "Vite", "Render", "Vercel",
    ],
    github: "https://github.com/Prashantkumar22205/InterviewPilot-AI",
    demo: "https://interview-pilot-ai-peach.vercel.app/",
  },
  {
    title: "YelpCamp",
    featured: false,
    description:
      "A full-stack campground listing platform where users can discover, review, and manage campgrounds. Features secure authentication, image uploads via Cloudinary, interactive maps with MapTiler, and a full review system.",
    tags: [
      "Node.js", "Express.js", "MongoDB", "Mongoose",
      "EJS", "Passport.js", "Cloudinary", "MapTiler", "Bootstrap",
    ],
    github: "https://github.com/Prashantkumar22205/YelpCamp",
    demo: "https://yelpcamp-r3fv.onrender.com",
  },
  {
    title: "Personal Finance Tracker",
    featured: false,
    description:
      "A full-stack personal finance app to track income and expenses, categorise transactions, and visualise spending habits through interactive Recharts dashboards.",
    tags: [
      "React.js", "Node.js", "Express.js", "MongoDB",
      "Context API", "Recharts", "Bootstrap",
    ],
    github: "https://github.com/Prashantkumar22205/Personal-Finance-Tracker",
    demo: "https://personal-finance-tracker-iota-lyart.vercel.app/",
  },
  {
    title: "Backend Ledger",
    featured: false,
    description:
      "A secure RESTful backend for managing financial ledger entries. Demonstrates JWT auth, password hashing with bcrypt, MongoDB data modelling, middleware architecture, and full CRUD API design.",
    tags: [
      "Node.js", "Express.js", "MongoDB", "Mongoose",
      "JWT", "bcrypt.js", "REST API", "Postman",
    ],
    github: "https://github.com/Prashantkumar22205/backend-ledger",
    demo: null,
  },
];
