# Project Notes — andre-portfolio (Noir Kinetic)

## Current request
User: "hover diimplement di satu halaman" → extend the hover image-swap (Developer → Weekend cap & glasses photo) effect across the ENTIRE page (all sections), not just the hero.

## Key asset URLs (webdev static storage, use exactly as-is)
- Dev photo (without cap/glasses): /manus-storage/andre-profile-img-without_6e47e8ca.webp
- Weekend photo (with cap & glasses): /manus-storage/andre-profile-img-with_3f7bf32d.webp
- Local originals: /home/ubuntu/upload/andre-profile-img-without.webp, /home/ubuntu/upload/andre-profile-img-with.webp
- Project mockup images: project-invite_8162f19b.png, project-web_6efabdbf.png, project-brand_b5d041e3.png (in WorkGallery.tsx)
- Logo: /manus-storage/... (see Nav/Cursor components)

## Architecture
- Style: Noir Kinetic (dark brutalist grayscale), fonts: Archivo (display), Space Mono (labels), serif accent. Global CSS custom animations in client/src/index.css: photo-in, fade-up keyframes, .text-stroke, .line-rise (JSX uses style={{ "--line-delay" }}), .reveal (IntersectionObserver-based reveal, hook useRevealObserver in hooks/useKinetic.ts).
- Hero.tsx: has mode switcher (Developer/Weekend), photo-inside-clipPath card, tilt effect, FluidHeroBg.
- FluidHeroBg.tsx: WebGL fluid/smoke background (gray smoke, pointer-reactive), used in Hero.
- Sections: Hero, WorkGallery (pinned horizontal scroll with wheel capture), CaseStudies, Philosophy, Experience (timeline + skills), Testimonials (Embla carousel), Contact, Marquee strips between sections, Nav (scroll-aware), Cursor (custom cursor).
- Components live in client/src/components/. Home.tsx wires all sections. App.tsx ThemeProvider defaultTheme="dark".
- Latest checkpoints: cfd5b1cd (pinned gallery + mode toggle), bea41ea3 (fluid bg + hero hover swap). Live domain: andrefolio-f6gtj9q8.manus.space (auto-publish on checkpoint).

## Approach for site-wide hover swap
Create a reusable component SwapImage (or prop-driven approach) that renders Dev photo and swaps to Weekend photo on hover with photo-in animation; use it wherever Andre's photo appears (hero, about/experience section portrait if any). In current build only the hero has the photo — check Experience/About sections for other imagery. The swap should be consistent across sections: when ANY swap image is hovered, all of them switch (shared state via context) OR per-image hover — user said "hover diimplement di satu halaman" = one page = site-wide. Shared hover state (context) is more dramatic and consistent: hovering one Andre photo turns all Andre photos into Weekend mode. Implement via React context: HoverModeContext in Hero, provider in Home.tsx, consumer component SwapPhoto.

## Style reminder
- Use font-label/font-display classes, uppercase mono labels with tracking-[0.3em], grayscale images with filter: grayscale(100%) contrast(1.05-1.2).
- Transitions: cubic-bezier(0.23,1,0.32,1), durations 300-700ms.
