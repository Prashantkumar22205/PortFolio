# CONVENTIONS

## Coding Style
- **Component Definition:** React functional components using arrow functions (e.g., `const Hero = () => {}`) or standard functions (e.g., `function App() {}`).
- **File Naming:** PascalCase is strictly used for React components (`.jsx`). Global CSS files are lowercase (`index.css`), and component-specific or app-level CSS is PascalCase (`App.css`).
- **Styling Method:** Heavy use of inline styles (`style={{ ... }}`) combined with CSS classes. CSS variables are favored for themes and colors (e.g., `var(--imp-text-color)`).

## Linting
- Project relies on `eslint` configured via `eslint.config.js` leveraging the new flat config structure. It includes specific rules for React hooks (`eslint-plugin-react-hooks`) and fast refresh (`eslint-plugin-react-refresh`).

## Formatting
- No explicit Prettier configuration is found, which suggests relying on ESLint defaults or IDE formatting.
