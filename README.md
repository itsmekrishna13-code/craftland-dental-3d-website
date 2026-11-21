# Craftland Dental — 3D Website

A modern dental clinic website with interactive 3D scenes, built with React, Vite, and Three.js.

## Live site

**https://craftland-dental-3d-website.vercel.app**

Deployed on Vercel from this repository. Every push to `main` is deployed automatically.

## What's inside

- Interactive 3D dental scenes (React Three Fiber + Drei)
- Before / after smile gallery with a drag slider
- Clinic tour, treatments, technology, doctors, and testimonials sections
- Booking and FAQ sections
- Framer Motion animations and a custom loading screen
- Responsive layout with Tailwind CSS 4

## Tech stack

React 19 · TypeScript · Vite 7 · Three.js · React Three Fiber · Drei · Framer Motion · Tailwind CSS 4

## Run locally

```bash
npm install
npm run dev
```

Open http://localhost:5173

## Build for production

```bash
npm run build
npm run preview
```

The production build is emitted to `dist/`. The Vite config uses `vite-plugin-singlefile`, so JS and CSS are inlined into a single `index.html`; gallery images are copied from `public/images/gallery/`.

## Project structure

```
src/
  App.tsx                  page composition
  components/              UI sections and shared components
    three/DentalScenes.tsx 3D scenes
  data/content.ts          site copy and content
public/images/gallery/     before / after images
```
