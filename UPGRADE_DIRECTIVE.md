# Project Directive: Website Repository Upgrade

**Target Agent:** JCode (Terminal)
**Backend Model:** DeepSeek-V4-Flash
**Context Window:** 1M tokens (Context caching enabled)

## 🎯 Core Objectives

You are an expert web developer tasked with modernizing, optimizing, and enhancing this website repository. Your goal is to upgrade the tech stack, improve performance (Lighthouse score >90), ensure accessibility (WCAG 2.1 AA), and refactor legacy code to modern best practices—all while preserving existing functionality.

## 🛠️ Execution Rules & Constraints

1. **Atomic Commits:** Make small, focused git commits after each logical step.
2. **Preserve Functionality:** Do not break existing APIs. If a breaking change is unavoidable, stop and ask for permission.
3. **Background Tasks:** Use your background bash capability for long-running commands like `npm install` or test suites.
4. **Verification:** Always run the test suite after modifying code. If no tests exist, generate basic unit tests for the components you modify.
5. **Context:** Leverage your semantic memory. Do not ask me to repeat information already provided in this file or in the codebase.

## 🚀 Implementation Plan (Execute Step-by-Step)

### Phase 1: Audit & Analysis

1. Read `package.json` and analyze the current tech stack.
2. Run `npm audit` to identify security vulnerabilities.
3. Use background bash to run `npx lighthouse-ci` (or similar) to get a baseline performance score.
4. Generate a brief `AUDIT_REPORT.md` summarizing the current state, technical debt, and upgrade targets.

### Phase 2: Core Modernization

1. **Dependencies:** Upgrade all dependencies to their latest stable versions. Resolve any breaking changes.
2. **Framework Migration:** If using an outdated framework (e.g., React 16, Vue 2), migrate to the modern version (e.g., React 18, Vue 3). Convert class components to functional components with hooks.
3. **State Management:** Modernize state management (e.g., migrate Redux to Zustand or Context API if appropriate).
4. **Styling:** If using legacy CSS, migrate to a modern utility-first framework (Tailwind CSS) or CSS Modules.

### Phase 3: Performance & Optimization

1. **Bundle Analysis:** Run `npm run build` and analyze the bundle size. Implement code splitting and lazy loading for non-critical components.
2. **Asset Optimization:** Compress images, implement responsive images (srcset), and lazy load below-the-fold media.
3. **Rendering:** Implement Server-Side Rendering (SSR) or Static Site Generation (SSG) if applicable to the framework.
4. **Caching:** Add service worker configuration for offline caching (if applicable).

### Phase 4: Quality Assurance & Testing

1. **Linting:** Ensure ESLint and Prettier are configured and run cleanly.
2. **Testing:** Write Jest unit tests for critical utility functions and React Testing Library tests for main components.
3. **Accessibility:** Audit components for ARIA labels, keyboard navigation, and semantic HTML.

### Phase 5: Documentation & Finalization

1. Update `README.md` with new setup instructions, scripts, and architecture changes.
2. Create a `MIGRATION_GUIDE.md` detailing the changes made for future reference.
3. Output a final summary of all upgrades, performance score improvements, and remaining technical debt.

## 🔧 Tool Usage Instructions

- **DeepSeek API:** Use `reasoning_effort="high"` for architectural decisions during Phase 1 & 2.
- **Swarm Mode:** If Phase 2 & 3 are taking too long, consider spawning a swarm (`jcode swarm --agents=3 --strategy=parallel`) to work on different component directories simultaneously.
- **Code Review:** Before finalizing, use a GitHub Action or AI review tool prompt to review your own pull request.
