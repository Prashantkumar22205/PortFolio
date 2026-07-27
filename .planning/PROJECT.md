# PROJECT CONTEXT

## What This Is
A modern, personalized portfolio website for Prashant Kumar, built to showcase skills, projects, and professional experience. It serves as a digital resume and a demonstration of frontend development capabilities.

## Technical Foundation
- **Framework:** React 19 (Single Page Application)
- **Build Tool:** Vite
- **Styling:** Vanilla CSS (`index.css`, `App.css`) and Inline Styles
- **Key Libraries:** `framer-motion` (animations), `react-tsparticles` (interactive backgrounds), `typewriter-effect` (dynamic text).

## Core Sections (Architecture)
The application layout is a scrolling single-page stack orchestrated by `App.jsx`:
1. **Navbar:** Fixed navigation header.
2. **Hero:** Introduction with dynamic typing and particle background.
3. **About:** Personal background and mission.
4. **Skills:** Technical proficiencies and tools.
5. **Projects:** Showcase of past work/portfolio pieces.
6. **Contact:** Ways to get in touch.
7. **Footer:** Links and copyright.

## Current State & Concerns
- The codebase is functional but relies heavily on **inline styles**, which could be harder to maintain as the project grows.
- Some assets are currently hardcoded to **external GitHub URLs** (like in the Hero section), which is a risk if those external files are removed.
- There is currently **0% test coverage** and no error boundaries implemented.
- The project is fully static on the frontend with no backend integration or CMS (Content Management System) attached.

## Next Steps for Customization
To continue personalizing and upgrading this project, you can focus on:
1. **Content:** Replacing placeholder text in `About.jsx`, `Skills.jsx`, and `Projects.jsx` with your actual information.
2. **Styling Refactor:** Moving inline styles into clean CSS classes or transitioning to a framework like Tailwind CSS.
3. **Asset Management:** Downloading hardcoded external images and serving them locally from the `src/assets/` directory.

---
*Last updated: 2026-06-01 after codebase mapping*
