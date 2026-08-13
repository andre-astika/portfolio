# Andre Astika — Portfolio: Design Brainstorm

## Candidate Approaches

### 1. "Monochrome Editorial" — Swiss/Editorial Print Revival
A dark canvas treated like a premium print magazine: oversized serif-display type, hairline rules, numbered sections, asymmetric grid, grayscale photography with grain. Feels like flipping through a high-end design journal in black and white.
Probability: 0.06

### 2. "Noir Kinetic" — Brutalist Kinetic Dark Web
Raw dark brutalism: massive condensed all-caps type, marquee tickers, drag-to-explore, hard edges, no rounded corners, cursor-follow effects, parallax layers. Energetic, out-of-the-box, trend-forward (think 2025 award-winning dark portfolios).
Probability: 0.04

### 3. "Obsidian Glass" — Soft-Lux Glassmorphic Dark
Deep black surfaces with frosted glass cards, subtle silver gradients, floating 3D-like orbs, smooth spring animations. Sleek, futuristic, but more polished-saas than out-of-the-box.
Probability: 0.03

## CHOSEN: "Noir Kinetic" (with editorial typography spine)

The user explicitly asked for out-of-the-box, animation-heavy, scroll effects, parallax, creative, modern, fresh, trendy. Noir Kinetic is the strongest fit; we sharpen it with editorial typography so it never feels gimmicky.

### Design Movement
Dark Brutalism × Kinetic Typography — inspired by 2024–2025 Awwwards-style dark portfolios (e.g., agencies like Locomotive, dark editorial sites). Big type as texture, motion as material.

### Core Principles
1. **Type is the interface.** Oversized, screen-filling headlines (clamp(3rem–12rem)) carry the visual weight; content is sparse and deliberate.
2. **Grayscale with attitude.** Strict black → dark grey → grey → light grey → white ladder. No color crutches — contrast, scale, and motion do the work.
3. **Scroll is the story.** Every section enters through motion: parallax layers, horizontal-scroll project gallery, reveal-on-scroll, magnetic hovers.
4. **Precision within chaos.** Kinetic moments are anchored by a strict grid, hairline rules, and a fixed typographic rhythm so it reads crafted, not noisy.

### Color Philosophy
The palette is the CV itself: black, dark grey, grey, light grey, white. Emotion: understated confidence — "the designer who doesn't need color to be noticed."
- Ink: #080808 / oklch(0.13) — main background
- Charcoal: #141414 — card/elevated surfaces
- Slate: #1f1f1f — hover/pressed
- Mist grey: #a3a3a3 — secondary text
- Light: #e5e5e5 — primary text
- White: #ffffff — accents, highlights, hover text
- One "silver" highlight tone used sparingly (gradient text white→grey).

### Layout Paradigm
Asymmetric editorial grid. Hero is left-anchored giant type with the portrait cut out on the right. Sections alternate alignment (left/right) like magazine spreads. A **horizontal-scrolling project gallery** breaks the vertical flow. A fixed left rail holds section index numbers. Oversized section index numbers (01, 02…) sit behind content (z-index -1) like magazine folios.

### Signature Elements
1. **Giant outline/fill alternating display type** (ANDRE — one word filled, one word outlined) — the logo/wordmark itself.
2. **Marquee ticker strips** — diagonal or horizontal, repeating keywords (WEB DESIGN ✦ DEV ✦ GRAPHIC ✦).
3. **Hairline + crosshair marks** — small "+" or "✦" ticks at corners and intersections, echoing his CV motif.

### Interaction Philosophy
Every interaction replies physically: magnetic buttons (follow cursor within radius), custom cursor dot that expands over links/projects, project cards that tilt/raise with a spotlight gradient tracking the pointer, images that scale on hover with parallax. Nothing clicks without feedback.

### Animation
- Hero: staggered line rise reveal (clip-path masks), name types/uncovers, portrait cutout fades + parallax on mouse move.
- Scroll: IntersectionObserver-driven reveals (translateY 40px + opacity, 600ms cubic-bezier(0.23,1,0.32,1)); giant background numbers slide in from side.
- Horizontal project gallery: transform translateX driven by vertical scroll (pin + scrub feel via CSS/JS, no heavy libs needed — framer-motion is available).
- Marquee: infinite CSS translateX loops, alternating directions.
- Testimonial carousel: Embla carousel, fade + slide with progress bar.
- Custom cursor: lerp-follow dot (requestAnimationFrame), scales up on hoverables.
- All gated behind prefers-reduced-motion.

### Typography System
- Display: "Archivo" (900, tight tracking) for huge headlines — brutalist, condensed-available.
- Accent serif: "Cormorant Garamond" italic for contrast moments (quotes, philosophy lines) — nods to his CV's script flourish.
- Mono: "Space Grotesk" or "IBM Plex Mono" for labels, indexes, metadata ("(RESUME)", "FRONTEND DEVELOPER ✦").
- Hierarchy: mono labels (12px uppercase tracking-widest) → display headlines → serif accent → body (16px/1.6, grey).

### Brand Essence
"Andre Astika — designer-developer who ships bold, precise digital experiences for brands that want to stand out, not blend in."
Personality: assured, kinetic, meticulous.

### Brand Voice
Direct, confident, lowercase-ish minimal copy with occasional punch lines.
Examples:
- "I design interfaces that don't wait to be noticed."
- "Pixel-precise. Deadline-obsessed. Zero fluff."
CTAs: "Start a project", "See the work", "Say hi".

### Wordmark & Logo
"ANDRE" in Archivo Black with the final "E" in outline stroke, plus a "✦" crosshair mark. Favicon: silver crosshair/star glyph on black.

### Content Plan (from CV + old site)
- Hero: ANDRE ASTIKA / Frontend Developer · Website & Graphic Designer · Bali, Indonesia. Tagline from old site refined.
- About: 3+ yrs, 10–20 projects/year, Jupitr Agency, freelance since 2022, international clients.
- Experience timeline: Jupitr Agency (Frontend Dev, QA, Lead Frontend, Senior WP), Cabaretti, Freelance.
- Skills: WordPress CMS, Next.js, Headless CMS, Frontend Architecture, UI/UX, QA tooling, Photoshop.
- Projects (3 featured, from old site + plausible case-study cards):
  1. Invitation Branding Suite (logo + card + e-invite site, 2026)
  2. Logo & Invitation Website (2026)
  3. Agency Client Websites (10–20/yr, case-study style)
- Case study previews: typography article, UX design, color theory (from old site blog titles).
- Testimonials: 3 quotes from old site (kept as stated there, attributed generically as "Agency Client").
- Contact: en.andre.st@gmail.com, 08814823595, Denpasar, Bali, Indonesia, andre.jupitragency.com.
- Socials: Instagram, Dribbble, Behance links (mailto/site given; use icons; email + web confirmed).

## Style Decisions

- Every major section must contain at least one unmistakable kinetic signature: an oversized clipped numeral, outline display word, ticker strip, crosshair mark, or type/image collision.
- Project imagery must stay grayscale, high-contrast, tightly cropped, and editorial/process-driven; avoid polished generic mockups that could belong to any portfolio template.
- Brand copy must avoid generic growth/quality claims and use clipped confident language instead, e.g. "Pixel-precise. Deadline-obsessed. Zero fluff."
- Sharper project presentation: horizontal/editorial with type/image collisions, harsher contrast, magazine-style metadata.
- Brand voice in visible copy: direct, clipped, slightly defiant. Hero tagline rewritten to "Interfaces that don't wait to be noticed."
