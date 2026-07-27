# CONCERNS

## Technical Debt & Code Quality
- **Styling Inconsistencies:** The frequent use of inline styles across components (e.g., in `Hero.jsx`) reduces maintainability. This should be migrated to CSS modules, Tailwind CSS, or at least centralized in CSS classes.
- **Hardcoded External Assets:** `Hero.jsx` references a raw GitHub user content URL for an image (`home-main.svg`). If the upstream repo is removed or modified, this image will break. The asset should be downloaded to `src/assets/` and imported locally.
- **Global State / Prop Drilling:** While acceptable for a small portfolio, if the site expands to include dynamic data (like blog posts or fetch requests), state management might become messy.

## Performance
- **Heavy Animation Libraries:** The use of `react-tsparticles`, `framer-motion`, and other visual libraries could impact performance on lower-end devices or mobile.
- **Bundle Size:** No current optimization strategies (like lazy loading components or code splitting) are visible. `React.lazy` should be considered for off-screen sections (like Contact or Projects) to improve initial load time.

## Reliability
- **Error Boundaries:** Missing global Error Boundaries. If a component fails to render, the entire SPA could crash with a blank screen.
- **Testing:** Lack of any testing means visual regressions or logic bugs could easily slip into production.
