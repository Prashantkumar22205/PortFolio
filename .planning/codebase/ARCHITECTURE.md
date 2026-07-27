# ARCHITECTURE

## Overview
The project is a standard React Single Page Application (SPA) built with Vite. It follows a modular component-based architecture without complex state management (like Redux or Zustand) or routing (like React Router), opting instead for a scrolling single-page layout.

## Application Flow
- **Entry Point:** `src/main.jsx` initializes the React tree with `StrictMode` and mounts `<App />` to the DOM.
- **Root Component (`App.jsx`):** 
  - Manages a brief initial loading state (`load`) with a `useEffect` timer.
  - Controls page scroll lock during the loading phase.
  - Orchestrates the layout by rendering a fixed `Navbar`, a background `Particle` component, and sequentially stacking semantic sections (`<main>`) like `Hero`, `About`, `Skills`, `Projects`, and `Contact`.
  - Ends with a `Footer`.

## State Management
- Localized component state using React Hooks (`useState`, `useEffect`, `useCallback`). 
- The application relies heavily on props and local state, which is sufficient for a portfolio site without complex data flows.

## Styling Architecture
- Global CSS variables are defined in `index.css` (e.g., `--imp-text-color`).
- Component styling is achieved via a mix of CSS classes (defined in `App.css` and `index.css`) and inline `style={{}}` objects in JSX files.
