# Project Notes — andre-portfolio (Noir Kinetic)

## CURRENT REQUESTS (in progress)
1. User: "shape pada Header section aku masih kurang suka" → redesign photo clip-path shape (currently polygon(14% 0, 100% 2%, 100% 100%, 0 97%)). Propose cleaner single-cut-corner: polygon(0 0, calc(100% - 3.5rem) 0, 100% 3.5rem, 100% 100%, 0 100%). Apply via AndrePhoto.tsx default + Hero clipPath prop.
2. User: "Hover effect based on referensi tadi belum diimplement" — VERIFIED ON LIVE SITE: canvas WebGL exists, but portrait hover swap did NOT fire in my automated mouseenter test. Likely because the hover handler listens on the card wrapper but my dispatched event didn't match, OR the live checkpoint predates the swap code. CHECK: live checkpoint version vs dev. The simulated test found the portrait image but swap=false after mouseenter on card. IMPORTANT: the mouseenter target must be the exact element with onMouseEnter={setFlip(true)} (the group div in AndrePhoto). My test dispatched on a guessed ancestor. Need to dispatch on the exact .group element.
   - If still failing after correct target: inspect browserConsole.log on live for FluidHeroBg/WebGL errors.

## Asset URLs (webdev static storage, exact)
- Dev photo: /manus-storage/andre-profile-img-without_6e47e8ca.webp
- Weekend photo: /manus-storage/andre-profile-img-with_3f7bf32d.webp
- Logo: /manus-storage/logo-crosshair_5d137a18.png
- Projects: project-invite_8162f19b.png, project-web_6efabdbf.png, project-brand_b5d041e3.png

## Architecture (unchanged)
- Noir Kinetic dark brutalist grayscale. Fonts Archivo + Space Mono + serif accent.
- FluidHeroBg.tsx = WebGL smoke bg in Hero (pointer-reactive; ambient splats every 2200ms).
- AndrePhoto.tsx = shared context provider at Home.tsx; hover one portrait flips ALL (flip state + weekend ctx); "W" key toggle; tilt prop; default clipPath polygon(14% 0, 100% 2%, 100% 100%, 0 97%).
- Hero.tsx = ModeSwitch pill + AndrePhoto with tilt; WorkGallery pinned horizontal scroll; Experience has 2nd AndrePhoto.
- Live: andrefolio-f6gtj9q8.manus.space, auto-publish on checkpoint.
- Checkpoints: 4d08c886 (site-wide swap), bea41ea3 (fluid bg).
- tsc must pass. Notes: FluidHeroBg had 2 null-coalesce fixes.

## Latest verification
- Hero now uses the uploaded landscape plain and Weekend assets, with both image layers aligned to a right-shifted object position (`58%` mobile / `38%` desktop) so the face sits farther right while the copy remains readable.
- Browser preview confirmed the landscape assets render. Weekend mode switched successfully and the selected Weekend tab computed to dark ink (`oklch(0.16 0.008 80)`) on the light pill.
- Work wheel capture is scoped to the carousel viewport instead of the section header; project image cards use `aspect-[4/3]`.
- `npx tsc --noEmit` passes. The reusable `/home/ubuntu/skills/kinetic-portfolio/SKILL.md` was initialized, written, and passed `quick_validate.py`.
