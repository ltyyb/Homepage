# Repository Guidelines

## Project Structure & Module Organization

Static Astro site with TypeScript and native CSS.

- `src/pages/index.astro`: homepage structure and community copy.
- `src/components/`: Astro components and SVG artwork.
- `src/scripts/home.ts`: interactions and motion controls.
- `src/styles/global.css`: design tokens, layout, and responsive rules; `rhythm.css`: illustration styles and animations.
- `public/`: static assets, including the community logo.
- `DESIGN.md`: visual guidelines; `README.md`: setup and maintenance instructions.

## Build, Test, and Development Commands

Use Node.js 22.23.4 or newer and npm.

- `npm ci`: install dependencies from `package-lock.json`.
- `npm run dev`: start local development at `http://127.0.0.1:4321/`.
- `npm run check`: run Astro and TypeScript diagnostics.
- `npm run build`: generate the static site in `dist/`.
- `npm run preview`: serve the built site locally.

## Coding Style & Naming Conventions

Use two-space indentation, single quotes in JavaScript/TypeScript, and semicolons. Follow the strict TypeScript configuration and type DOM queries explicitly. Name Astro components in PascalCase and scripts, styles, and pages in lowercase or kebab-case.

Prefer static Astro markup, native browser APIs, and CSS over new frameworks. Reuse existing CSS variables and motion controls. No formatter or lint command is configured; follow adjacent code.

## Design & Content Guidelines

Read `DESIGN.md` before visual changes. Preserve the dark canvas, thin borders, pill buttons, and restrained orange accents. Refer to 六同音游部 as a **社群**, never a **社团**. Do not invent member counts, events, group IDs, or application URLs. Keep application requirements linked to the existing documentation site.

## Testing Guidelines

No test framework, naming convention, or coverage threshold is configured. Run `npm run check` and `npm run build` for code changes.

For UI changes, inspect 320, 375, 768, and 1440 pixel widths. Check overflow, mode switching, navigation, FAQ expansion, keyboard focus, animation pause, and `prefers-reduced-motion`. Keep essential content accessible without JavaScript. Distinguish browser emulation from actual phone testing.

## Commit & Pull Request Guidelines

History uses typed Chinese subjects. Follow the requested single-line format: `feat : 添加主页交互`, `fix : 修复移动端溢出`, or `docs : 更新维护说明`. Separate configuration, functionality, and documentation into focused commits.

PRs should explain changes, report validation, link relevant issues, and include desktop/mobile screenshots for visual changes. Agents must not commit or push unless explicitly requested.

## Configuration & Deployment

Deploy `dist/` at the domain root while preserving the separately hosted `/docs/` route. Keep domain changes consistent across `astro.config.mjs`, canonical links, and Open Graph metadata. Never commit secrets, caches, or generated output.
