# TESTING

## Current State
- **Testing Frameworks:** No testing frameworks (like Jest, Vitest, or Cypress) are currently configured or installed in `package.json`.
- **Test Coverage:** 0%. There are no `.test.jsx` or `.spec.jsx` files in the repository.
- **CI/CD:** No testing hooks are found in the build pipeline (`npm run build` only executes `vite build`).

## Recommendations
- **Unit Testing:** Integrate `Vitest` along with `React Testing Library` for component-level testing (e.g., verifying `Navbar` rendering, checking `Hero` section typing).
- **E2E Testing:** For a visual-heavy site with animations, Playwright or Cypress could ensure that interactions like hover states, navigation scrolling, and particle effects load without breaking the UI.
