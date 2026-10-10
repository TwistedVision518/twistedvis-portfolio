# TwistedVis Portfolio

The personal portfolio of **Pranav Praveen**, also known as TwistedVis. It presents his work as one connected system: custom ROM maintenance for the Nothing Phone (2a) family, Linux tooling, cybersecurity experiments, and release infrastructure.

## Stack

- [Astro](https://astro.build/) for the static site and SEO-friendly HTML
- [React](https://react.dev/) island for the interactive system trace
- [Framer Motion](https://motion.dev/) for pointer, state, and trace motion
- [Lenis](https://lenis.darkroom.engineering/) for smooth scrolling when motion is allowed
- Fontshare Cabinet Grotesk + General Sans, Google Fonts JetBrains Mono
- Netlify for deployment

## Local development

Requirements: Node.js 22.12+ and npm.

```bash
npm install
npm run dev
```

The site runs at `http://localhost:4321`.

Production build:

```bash
npm run build
npm run preview
```

Netlify uses the settings in `netlify.toml`: `npm run build` with `dist` as the publish directory.

Live site: [twistedvis-portfolio.netlify.app](https://twistedvis-portfolio.netlify.app)

## Content and research

- `docs/research.md` contains the GitHub research used to write the site, including verified limits and prompt-sourced details.
- `DESIGN.md` documents the visual system and motion rules.
- Primary project links point to the source repositories under [TwistedVision518](https://github.com/TwistedVision518) and the relevant Android organisations.

## Accessibility and performance

- Semantic sections and headings, visible focus styles, descriptive link text, and an accessible interactive trace.
- `prefers-reduced-motion` disables smooth scrolling, looping trace animation, cursor motion, and reveal transitions.
- Most of the page is static HTML. Only the system trace and pointer layer hydrate as a React island.
- No image-heavy hero asset or third-party analytics is loaded.

## Screenshot

The production screenshot is captured in `docs/screenshots/desktop.png` after the local browser QA pass.
