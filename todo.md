- [x] Inspect the Lumora reference hero background and identify reusable visual behaviors.
- [x] Keep the existing hero typography, controls, copy, and layout unchanged, except remove the hero portrait element.
- [x] Replace or layer only the hero background with a Lumora-inspired monochrome treatment.
- [x] Copy and upload the newly attached 16:9 plain and Weekend photos as durable web assets.
- [x] Use the newly attached plain 16:9 photo as the Hero background by default and crossfade to the newly attached cap-and-glasses 16:9 photo when hovering the Hero.
- [x] Keep the reference-style background interaction visibly tied to the Hero hover area, not only to a hidden image element.
- [x] Keep the reusable portrait hover behavior available in the About/Experience section after removing the hero portrait.
- [x] Verify desktop layout, mobile layout, actual hover crossfade, and TypeScript; confirm no browser-console errors.
- [x] Rebuild the Hero interaction as a pointer-following soft brush reveal instead of a binary crossfade.
- [x] Add a cursor ring and spring-like pointer smoothing while keeping the base photo visible.
- [x] Verify desktop and mobile layout plus no browser-console errors.
- [x] Save a checkpoint and deliver the updated project.

## Corrected Lumora mechanics

The supplied Lumora prompt describes the Hero as a full-bleed before/after photo with a “liquid cursor-reveal.” It uses two full-screen image layers: the base image remains visible, while a second image is revealed only inside a soft circular brush around the pointer. The pointer position is normalized to the Hero bounds, the reveal follows the pointer with spring-like easing, and the brush has a feathered edge rather than a hard clip. The interaction is therefore a moving mask/reveal, not a binary whole-background image swap. The prompt also calls for a small circular cursor indicator over the reveal point and for the effect to be disabled on touch/reduced-motion contexts.

Source: `/home/ubuntu/upload/pasted_content.txt`, user-provided Lumora recreation prompt, lines 177–183 and surrounding interaction specification.

## Reference findings

The Lumora hero uses a calm, cinematic background rather than a busy graphic: a pale smoky field, a large monochrome focal image, soft translucent horizontal light bands, blurred orb-like gradients, and a very large low-contrast wordmark/image texture behind the foreground copy. The composition feels editorial and atmospheric, with the content layered above the background. For Andre, retain the existing black/grayscale Noir Kinetic palette and typography; borrow only the background behavior by making the existing fluid layer calmer, more cinematic, and softly luminous. Keep the existing hero copy, mode switch, CTA, portrait placement, and nav unchanged.

Source reference: https://www.getlayers.ai/?layer=lumora (Lumora layer preview inspected Aug 13, 2026).

## Global Developer / Weekend theme

- [x] Inspect the existing shared Weekend state and current CSS token architecture.
- [x] Keep Developer as the existing dark theme.
- [x] Add a Weekend light theme across the entire page with coordinated backgrounds, text, borders, cards, controls, and motion overlays.
- [x] Make the Developer/Weekend button switch the global theme state, including keyboard behavior if already supported.
- [x] Verify the Hero and key section surfaces in both themes on desktop/mobile; TypeScript passes and browser console is clean.
- [x] Save a new checkpoint.

## Theme verification notes

The interactive dev preview was opened and the Weekend tab was clicked. The Hero switched from the near-black Developer palette to a light warm-paper background, the headline switched to dark ink, controls and borders became lighter-theme compatible, and the Weekend copy appeared. The existing photo background remains visible with a softer ink-on-paper treatment. This confirms the global state is wired to the mode button rather than only changing Hero copy.

Computed-style check confirmed the key Work and Philosophy section surfaces resolve to the Weekend card token and the major sections resolve to the Weekend ink color. The document body needed an explicit `:has(.weekend-theme)` background fallback so transparent sections cannot reveal the old dark body color; that fallback has been added.

After a fresh preview refresh, reselecting Weekend again reproduced the light-paper Hero with dark ink typography, pale controls, dark cursor ring, and Weekend copy. The mode remains a user-controlled global switch rather than a one-time render state.

## Latest Hero composition refinement

- [x] Copy and upload the newly attached landscape plain and Weekend photo pair as durable web assets.
- [x] Replace the current Hero background pair with the new landscape pair and shift the face composition further right.
- [x] Remove the Hero-only 01 section marker without changing the Hero description copy.
- [x] Make the active Weekend button black in the light theme.
- [x] Keep section numerals 02, 03, and later in the muted gray treatment used by Developer dark mode.
- [x] Verify desktop/mobile presentation, theme states, and TypeScript, then save a checkpoint.

## Work carousel sticky refinement

- [x] Inspect the current Work section wrapper, sticky region, track movement, and card image sizing.
- [x] Start sticky behavior at the project carousel/grid rather than at the Work section header.
- [x] Keep the carousel pinned while the project track scrolls left, then release only after the track reaches its end.
- [x] Change each Work project image frame to a 4:3 aspect ratio without breaking hover descriptions or responsive layout.
- [x] Verify desktop trackpad/wheel behavior and mobile presentation, then save a checkpoint.

## Display stroke refinement

- [x] Locate the shared `.text-stroke` rule and any inline stroke overrides.
- [x] Reduce stroke width while preserving the grayscale contrast in Developer and Weekend themes.
- [x] Verify the Hero outline heading at desktop size; TypeScript passes and no layout changes were introduced.
- [x] Save a checkpoint.

## Section numeral normalization

- [x] Locate the section marker styles for 02–07.
- [x] Use one shared numeral size so 02 matches the other section markers.
- [x] Verify the normalized numerals on the full-page desktop render; TypeScript passes.
- [x] Save a checkpoint.

## Hero 01 cleanup

- [x] Remove the remaining 01 background marker from Hero.
- [x] Verify Hero content and layout remain unchanged; TypeScript passes.
- [x] Save a checkpoint.

## Hero portrait positioning

- [x] Shift the landscape Hero image/object position farther right on desktop.
- [x] Preserve readable headline/description and safe mobile crop.
- [x] Verify the hover reveal and save a checkpoint.

## New Hero background replacement

- [x] Upload the newly attached plain and cap-and-glasses background images as durable web assets.
- [x] Wire the new pair into the Hero base and liquid reveal layers.
- [x] Preserve the current right-weighted composition and readable Hero copy.
- [x] Verify desktop/mobile presentation and save a checkpoint.

## Work card title scale

- [x] Reduce the title size inside each Work grid item on desktop and mobile.
- [x] Verify the smaller titles preserve card hierarchy and hover behavior.
- [x] Save a checkpoint after verification.

## Heading outline stroke refinement

- [x] Make outline heading strokes such as “THINK” visibly thinner.
- [x] Preserve readable contrast in Developer and Weekend themes.
- [x] Verify the change and save a checkpoint.

## HD Hero background and Weekend control

- [x] Upload the newly attached HD plain and cap-and-glasses Hero images as durable web assets.
- [x] Replace the current Hero base/reveal pair with the new HD assets.
- [x] Set the active Weekend button to black background with white text.
- [x] Verify desktop/mobile Hero framing and Weekend contrast, then save a checkpoint.

## Hero sparkle alignment

- [x] Enlarge the sparkle icon beside “Astika” to align with the heading height.
- [x] Preserve appropriate sparkle contrast in Developer dark and Weekend light modes.
- [x] Verify desktop/mobile Hero heading presentation and save a checkpoint.

## Header description width

- [x] Set the Hero/Header description max-width to 700px.
- [x] Keep the description aligned with the upper content and responsive on mobile.
- [x] Verify the result and save a checkpoint.

## Weekend Hero default image

- [x] Make the cap-and-glasses image the default Hero background in Weekend mode.
- [x] Keep the plain image as the default in Developer mode.
- [x] Preserve the liquid reveal behavior and verify both modes before checkpointing.

## Hero role-line cleanup

- [x] Remove “(Portfolio) —” from the Hero role line.
- [x] Preserve the remaining role text and spacing across responsive layouts.
- [x] Verify the change and save a checkpoint.

## Hero mode-label wording

- [x] Change the mode labels to “✦ Developer Mode” and “Weekend Mode ✦”.
- [x] Preserve active-state contrast and responsive button spacing.
- [x] Verify the updated labels and save a checkpoint.

## Weekend Hero base-rendering correction

- [x] Ensure Weekend mode visibly renders the cap-and-glasses image as the primary Hero image before hover.
- [x] Preserve Developer plain-image behavior and the alternate hover reveal.
- [x] Verify both mode states and save a corrective checkpoint.

## Hero role-line divider removal

- [x] Remove the horizontal line before the Hero role text.
- [x] Preserve the role text and responsive spacing.
- [x] Verify the Header layout and save a checkpoint.

## ASTIKA sparkle alignment

- [x] Keep the sparkle icon inline beside “ASTIKA” instead of allowing it to wrap below.
- [x] Match the sparkle’s visual size to the ASTIKA wordmark.
- [x] Use the dark-mode sparkle color treatment in Weekend/light mode.
- [x] Verify desktop/mobile theme states and save a checkpoint.

## Full-stack and file storage upgrade

- [x] Upgrade the static portfolio to the full-stack WebDev template.
- [x] Review the generated auth, database, backend, and storage scaffolding.
- [x] Document the file-storage upload and retrieval path for future portfolio assets.
- [x] Run validation and save a checkpoint after the upgrade.

## ASTIKA four-point sparkle icon

- [x] Replace the ASTIKA wordmark sparkle with the supplied four-point diamond sparkle.
- [x] Match its size, contrast, and alignment in both Developer and Weekend themes.
- [x] Verify desktop/mobile ASTIKA sparkle presentation and save a checkpoint.

## Original ASTIKA sparkle restoration

- [x] Remove the four-point replacement and restore the original default sparkle glyph beside ASTIKA.
- [x] Use the same original dark-mode sparkle treatment in Developer and Weekend modes.
- [x] Verify desktop/mobile presentation and save a corrective checkpoint.

## Outlined ASTIKA sparkle restoration

- [x] Replace the current solid ✦ glyph with the approved outlined four-point diamond sparkle beside ASTIKA.
- [x] Match the reference’s scale, inline placement, and light outline/gray fill treatment in Developer and Weekend modes.
- [x] Verify desktop/mobile presentation, run automated validation, and publish a checkpoint.

## Simplified ASTIKA sparkle alignment

- [x] Return the ASTIKA sparkle to a solid fill without an outline.
- [x] Reduce the sparkle so its visual height aligns with the ASTIKA letter height.
- [x] Verify the desktop/mobile wordmark alignment, run checks, and publish the refinement.

## Responsive Hero wordmark scale

- [x] Increase the ANDRE/ASTIKA Hero wordmark scale to match the approved reference hierarchy.
- [x] Keep ASTIKA slightly smaller than ANDRE and resize the solid diamond sparkle to match its cap height.
- [x] Tune desktop and mobile scales independently, verify with screenshots and checks, then publish.

## Confirmed ANDRE ASTIKA sparkle composition

- [x] Match the Hero wordmark composition to the supplied ANDRE / ASTIKA / ✦ reference.
- [x] Preserve the responsive desktop and mobile scaling requirements in the final implementation.

## Explicit Hero wordmark sizing

- [x] Set the desktop ANDRE wordmark to 139px and ASTIKA to 108px.
- [x] Replace the solid diamond SVG with the ✦ glyph and match its visual height to ASTIKA.
- [x] Define responsive mobile sizing, verify desktop/mobile screenshots and checks, then publish.

## Explicit ASTIKA sparkle CSS

- [x] Set `.hero-astika-sparkle` to a 90px font size and 1rem left margin.
- [x] Verify the requested spacing and responsive presentation on desktop and mobile, then publish.

## Section marker cleanup

- [x] Remove all visible section-number markers beginning with 02 across the public portfolio.
- [x] Preserve section structure and spacing, verify desktop/mobile presentation and checks, then publish.

## Manual Work carousel

- [x] Remove the sticky/pinned scroll lock from the Work gallery.
- [x] Enable manual horizontal dragging to browse project cards left and right.
- [x] Reduce card gaps and preserve 4:3 project image aspect ratios.
- [x] Verify desktop/mobile drag behavior and layout, run checks, then publish.

## Work card spacing and indices

- [x] Set the Work carousel gap to 1.5rem so cards no longer crowd or overlap.
- [x] Render Work project indices 01–03 with a stroke/outline treatment.
- [x] Verify desktop/mobile card layout and checks, then publish.

## Work index position and card separation

- [x] Position Work project indices with `left: -4rem` and `bottom: -5rem`.
- [x] Increase the Work carousel gap to 3rem so cards and index numerals do not overlap.
- [x] Verify desktop/mobile positioning and card separation, then publish.

## Work index clipping and actual card separation

- [x] Clip outlined Work project indices 01–03 within each card boundary.
- [x] Create visible 3rem separation between Work cards without any index or card overlap.
- [x] Verify desktop/mobile clipping and separation, run checks, then publish.

## True Work image ratio

- [x] Enforce a true 4:3 ratio on every Work project image container.
- [x] Verify the 4:3 imagery on desktop and mobile, run checks, then publish.

## Work image ratio 16:9

- [x] Change every Work project image container to a true 16:9 ratio.
- [x] Verify the 16:9 Work imagery on desktop and mobile, run checks, then publish.

## Work card link behavior

- [x] Remove navigation links from all Work cards except the final Brief Project card.
- [x] Preserve hover effects for every Work card and verify desktop/mobile interaction, then publish.

## Explicit Hero typography refinement

- [x] Change the Hero role line to “Website Developer · Website Designer · Graphic Designer”.
- [x] Set desktop ANDRE to 163px, ASTIKA to 125px, and ✦ to 125px.
- [x] Set both Developer and Weekend Hero descriptions to max-width 630px.
- [x] Verify both themes on desktop/mobile, run checks, then publish.

## ASTIKA sparkle CSS refinement

- [x] Set `.hero-astika-sparkle` to color `#ffffffb8`, no text stroke, 1.5rem left margin, and 105px font size.
- [x] Verify the revised sparkle on desktop and mobile, run automated checks, then publish.

## Weekend sparkle color correction

- [x] Preserve the requested base sparkle CSS and restore `.weekend-theme .hero-astika-sparkle { color: var(--ink); }`.
- [x] Verify the corrected Developer and Weekend color behavior, run checks, then publish.

## Weekend sparkle verification notes

Developer Mode renders the requested semi-transparent white sparkle beside ASTIKA. After switching to Weekend Mode in the browser, the Hero changes to the warm paper palette and the sparkle renders in the `var(--ink)` color, confirming the restored Weekend override is active.

## Marquee label update

- [x] Replace the marquee labels with Website Development, Website Design, Frontend Architecture, UI/UX Sense, Website Responsive, and Graphic Design, separated by ✦.
- [x] Verify marquee content and motion, run checks, then publish.

## Marquee verification notes

The browser preview shows the requested six labels in the specified order, repeated continuously with ✦ separators. A timed browser check confirmed the marquee track transform advanced from `translateX(-2023.5px)` to `translateX(-2080.01px)` over 400ms, confirming the animation remains active.

## Work heading refinement

- [x] Render the Work heading as a single line: “The Work ✦”.
- [x] Add `margin-bottom: 0.75rem` to the sparkle in the Work heading and verify responsive layout before publishing.

## Work instruction width refinement

- [x] Set “Drag left or right to browse the selected projects.” to `max-width: 170px`.
- [x] Verify the refined instruction width on desktop and mobile, run checks, then publish.

## GitHub project export

- [x] Inspect the available GitHub destination and prepare the full Andre portfolio source for export.
- [x] Create a private GitHub repository and push the complete project source.
- [x] Verify the repository contents and share the GitHub URL.

## GitHub repository rename

- [x] Rename `andre-astika/andre-portfolio` to `andre-astika/portfolio`.
- [x] Verify access to the renamed repository and update the local GitHub remote.

## GitHub web push investigation

- [x] Inspect repository permissions, default branch settings, and branch rules affecting edits from the GitHub web interface.
- [x] Explain the identified cause and provide steps to push or commit through GitHub.

## GitHub Pages hosting assessment

- [x] Inspect the full-stack runtime requirements and current GitHub Pages configuration.
- [x] Explain why GitHub Pages can or cannot host this project as-is and outline viable deployment paths.

## Static GitHub Pages deployment

- [x] Add a GitHub Pages-specific static build that uses the `/portfolio/` base path without affecting Manus hosting.
- [x] Add an automated GitHub Actions workflow to build and deploy the static portfolio to GitHub Pages.
- [x] Verify the static build and live GitHub Pages URL; document that backend Asset Library features are excluded.
- [x] Resolve the pnpm version conflict in the GitHub Pages workflow and rerun deployment.

## GitHub Pages deployment notes

Vite’s official GitHub Pages guide requires a repository-site base path of `/portfolio/`, a build that produces `dist`, and an Actions-based Pages workflow that uploads the `dist` artifact before deployment. Source: https://vite.dev/guide/static-deploy#github-pages

GitHub’s custom workflow documentation requires `pages: write` and `id-token: write` deployment permissions, an uploaded Pages artifact, and a `github-pages` deployment environment. Source: https://docs.github.com/en/pages/getting-started-with-github-pages/using-custom-workflows-with-github-pages

Static build verification: the locally served artifact rendered the full public portfolio at `/portfolio/`, including Hero, navigation, Work, case study, testimonial, and contact content. The browser title was “Andre Astika — Designer & Developer”; the backend-only Asset Library remains intentionally excluded from the static site.

GitHub Pages status: the authenticated GitHub Settings → Pages screen confirms the public URL `https://andre-astika.github.io/portfolio/` is active but still configured as “Deploy from a branch” using `main` and `/ (root)`. The source selector exposes “GitHub Actions”, which must be selected for the committed static deployment workflow to serve the `dist` artifact.
Final GitHub verification: the corrected workflow run `31722854179` completed successfully, including build, artifact upload, and deployment. The public Pages URL `https://andre-astika.github.io/portfolio/` loads the complete portfolio homepage. Repository access permits direct pushes to `main`; it has no branch protection or rulesets. The originally reported issue was the legacy Pages source pointing to the source-code root, not a push-permission restriction. The static Pages edition does not include the backend-only Asset Library, OAuth, tRPC API, or database functionality.

## How I Think heading sparkle

- [x] Add ✦ to the “How I Think” section heading and verify responsive rendering before publishing.

## How I Think sparkle treatment match

- [x] Match the How I Think sparkle’s size, color, and text spacing to the Work heading sparkle treatment.
- [x] Verify the matched heading sparkle on desktop and mobile, run checks, then publish.

Reference finding: the Work heading sparkle uses an inline 2xl/3xl scale, `text-white/40`, `margin-left: 1rem`, and `margin-bottom: 0.75rem`; the provided reference similarly shows a subdued gray sparkle with generous separation from the outlined wordmark.

## Case Studies card refinement

- [x] Make Case Studies cards fill the available height with `height: 100%`.
- [x] Convert Case Studies indices 01–03 to outlined numerals, positioned with `right: -3rem` and `bottom: -3rem`.
- [x] Verify the refined card layout on desktop and mobile, run checks, then publish.

## Case Studies index and mobile section width refinement

- [x] Set Case Studies indices 01–03 to `right: -2rem`, `bottom: -3rem`, and a 140px desktop font size.
- [x] Define an appropriately reduced Case Studies index scale for screens below 767px.
- [x] Make every portfolio section use its full available width below 767px without introducing horizontal overflow.
- [x] Verify desktop/mobile layouts, run automated checks, and publish the update.

## About Experience layout refinement

- [x] Remove the vertical timeline rule and square marker from the Experience list in “Behind the pixels”.
- [x] Set the Experience entry grid to `1fr 6fr` with a 1.5rem gap on tablet and desktop.
- [x] Verify the refined About layout on desktop and tablet, run automated checks, and publish the update.

## Philosophy sticky layout and testimonial removal

- [x] Make the Philosophy section’s left content column sticky on desktop and tablet while the principles list scrolls alongside it.
- [x] Remove the Kind Words testimonial section and its page-level rendering.
- [x] Verify the revised page on desktop and mobile, run automated checks, and publish the update.

## Philosophy interactive reading enhancements

- [x] Add a subtle scroll-progress bar for the Philosophy principles list.
- [x] Highlight the principle currently being read in the right column.
- [x] Add a concise CTA below Philosophy that links to the Contact section.
- [x] Verify the interactions on desktop and mobile, run automated checks, and publish the update.

## Philosophy active-state contrast correction

- [x] Render the actively read Philosophy principle in solid white without making other principles disappear.
- [x] Remove background changes from Philosophy principle hover states.
- [x] Verify the corrected states on desktop and mobile, run automated checks, and publish the update.

## Philosophy scroll visibility regression fix

- [x] Ensure all Philosophy principles remain visible after being scrolled past or re-entering the viewport.
- [x] Retain an active-reading emphasis without changing item visibility, opacity, or layout.
- [x] Verify scroll behavior on desktop and mobile, run automated checks, and publish the fix.

## About portrait hover blank-frame repair

- [x] Eliminate intermittent blank frames during the About portrait hover image transition.
- [x] Preserve the shared portrait hover behavior and responsive image composition.
- [x] Verify hover behavior on desktop and mobile, run automated checks, and publish the repair.

## GitHub latest-change deployment verification

- [x] Confirm the latest portfolio changes are present on GitHub `main`.
- [x] Verify the GitHub Pages workflow has deployed the latest commit.

## Global heading weight refinement

- [x] Replace font weight 900 with 800 across all portfolio headings.
- [x] Verify heading typography on desktop and mobile, run automated checks, and publish the update.

## Visible display heading weight correction

- [x] Identify the Hero and display heading styles that still render at weight 900.
- [x] Update all remaining display headings to a visible 800 weight without changing the established layout.
- [x] Verify the corrected desktop/mobile typography, run automated checks, and publish the update.

## Hero role letter-spacing adjustment

- [x] Set the Hero role line “Website Developer · Website Designer · Graphic Designer” to `letter-spacing: 0.315em`.
- [x] Add clear optical spacing between the K and A in the Hero “ASTIKA” wordmark.
- [x] Verify Hero typography on desktop and mobile, run automated checks, and publish the update.

## Hero sparkle alignment refinement

 - [x] Resize the ASTIKA sparkle so its height aligns with the ASTIKA wordmark.
 - [x] Position the sparkle so its right edge does not extend past the ANDRE wordmark’s E.
 - [x] Constrain the sparkle’s horizontal footprint while preserving its aligned visual height.
 - [x] Verify sparkle alignment on desktop and mobile, run automated checks, and publish the update.

Verification note: Desktop inspection confirms the horizontally constrained sparkle maintains ASTIKA’s visual height and ends inside the ANDRE wordmark width. At 390px mobile width, the sparkle remains inline, matches the ASTIKA cap height, and finishes at the wordmark boundary without wrapping.

## Hero sparkle restoration and SplashCursor integration

- [x] Restore the ASTIKA sparkle to its prior full-width form.
- [x] Retrieve the official React Bits JS-CSS SplashCursor source and required dependencies.
- [x] Add SplashCursor with the requested white color without conflicting with the existing Hero liquid reveal or custom cursor.
- [x] Verify desktop/mobile performance and interactions, run checks, then publish and synchronize the update.

Implementation note: the official `SplashCursor-JS-CSS` registry item provides one `SplashCursor.jsx` file with no package or registry dependencies. It renders a non-interactive fixed WebGL canvas and listens at window scope; it is mounted globally below the existing z-100 custom cursor, with `COLOR="#ffffff"` and `RAINBOW_MODE={false}` so the requested white effect is used instead of the registry default rainbow mode.

Desktop inspection note: the Hero sparkle is restored to its original full-width silhouette. SplashCursor renders a subtle white fluid trail on the dark Hero canvas, while the existing custom cursor ring remains above it and navigation stays interactive. No browser runtime or WebGL errors were recorded.

Verification note: at 390px width, the restored wordmark remains on one visual line with a properly proportioned sparkle and no overflow. The test suite passes 8/8 tests; TypeScript validation and the production build both complete successfully.

## Custom cursor center-dot removal

- [x] Remove the filled center dot from the custom cursor ring.
- [x] Preserve the outer ring, interactive label states, and pointer tracking.
- [x] Verify the cursor on desktop, run automated checks, then publish and synchronize the refinement.

Visual verification note: moving the pointer across the Hero shows the liquid reveal ring as an empty outlined circle, including above the portrait, with no center dot. The separate global cursor ring and interactive controls remain visible and responsive.

## Hero ring removal and SplashCursor theme color

- [x] Remove the Hero liquid cursor ring element entirely while retaining the liquid image reveal.
- [x] Render SplashCursor white in Developer mode and black in Weekend/light mode.
- [x] Verify both theme states, run automated checks, then publish and synchronize the correction.

Developer Mode inspection note: after a preview refresh, neither the Hero liquid cursor ring nor the global custom-cursor ring is visible; the Hero composition and liquid image reveal remain intact.

Weekend Mode inspection note: the mode switch changes the full Hero to the warm light palette and preserves the cursor-free surface; no circular Hero or global cursor indicator remains visible after the theme transition.

Splash verification note: in Weekend Mode, pointer movement and a Hero click trigger the SplashCursor from a fresh black-color instance. The fluid overlay remains non-interactive and no circular cursor chrome is rendered.

## Weekend SplashCursor visibility regression

- [x] Diagnose why the black SplashCursor effect is not visible in Weekend/light mode.
- [x] Restore a visible black SplashCursor on the light palette without adding cursor rings.
- [x] Verify both modes, run automated checks, then publish and synchronize the correction.

Diagnosis note: the original display shader derived canvas opacity from the splash RGB intensity. A pure black `#000000` input therefore produced both black RGB and zero alpha, making the effect transparent. Ink mode now uses a positive internal density but renders it as black with density-derived alpha.

Developer Mode validation note: after a full preview reload, the white SplashCursor integration remains mounted and no circular cursor indicator is rendered.

Verification note: automated preview interactions briefly retained a scrolled viewport after the mode-control click, so the Weekend ink effect will be rechecked from the top Hero position before publication.

Weekend Mode activation note: the Hero now switches correctly to the warm light palette with the cap-and-glasses portrait while keeping all cursor rings removed.

Final validation note: pointer movement over the light Hero creates a clearly visible black fluid splash. Developer Mode retains the white variant, no cursor rings return in either mode, and the suite passes 8/8 tests with clean TypeScript and production-build checks.

## ASTIKA sparkle responsive sizing

- [x] Set the Hero ASTIKA sparkle to 110px on desktop and tablet.
- [x] Set the Hero ASTIKA sparkle to 50px below the 767px mobile breakpoint.
- [x] Verify desktop/tablet/mobile sizing, run automated checks, then publish and synchronize the update.

Desktop and tablet inspection note: the ASTIKA sparkle renders at the requested 110px size, remains inline with the wordmark, and does not disrupt the Hero layout at 1440px or 768px widths.

Mobile verification note: at 390px width, the sparkle uses the requested 50px size, remains inline with ASTIKA, and causes no overflow. The validation suite passes 8/8 tests, TypeScript is clean, and the production build completes successfully.

## Weekend Work hover-description contrast

- [x] Set the Work grid hover description text to white in Weekend/light mode.
- [x] Preserve the existing image overlay, card layout, and Developer-mode hover appearance.
- [x] Verify hover contrast, run automated checks, then publish and synchronize the correction.

Weekend Mode activation note: the warm light palette and Weekend Hero state are active before the Work-card hover inspection.

Work inspection note: the Weekend Mode Work section is reachable through the primary navigation, with the dark image cards and their hover overlays ready for contrast verification.

Hover verification note: hovering the first Weekend Work card reveals both the project label and descriptive copy in white over the dark image gradient, restoring clear contrast without changing the card geometry.

## How I Think standalone articles

- [x] Create a professional Typography article at `/blog-1` from the first How I Think card.
- [x] Create a professional User Experience article at `/blog-2` from the second How I Think card.
- [x] Create a professional Color Theory article at `/blog-3` from the third How I Think card.
- [x] Link each How I Think “Read Study” card CTA to its corresponding standalone article.
- [x] Preserve Noir Kinetic design language, responsive layout, navigation, and Developer/Weekend themes across all article pages.
- [x] Verify all article routes and interactions, run automated checks, then publish and synchronize the update.
- [x] Verify the GitHub Pages static fallback serves `/blog-1`, `/blog-2`, and `/blog-3` through the deployed single-page app.

Verification note: desktop previews confirmed `/blog-1`, `/blog-2`, and `/blog-3`; mobile previews confirmed the Typography and UX article layouts at 390px. The Article Weekend Mode uses the warm light palette correctly, while direct routing, article-navigation links, test coverage, TypeScript validation, and the production build all complete successfully.

GitHub Pages verification note: the `build:pages` artifact contains both `dist/pages/index.html` and `dist/pages/404.html`; the fallback includes the `/blog-[1-3]` route handoff to the single-page app.

## Article URL and Hero refinement

- [x] Replace `/blog-1`, `/blog-2`, and `/blog-3` with the topic slugs `/typography`, `/user-experience`, and `/color-theory` across routes, cards, navigation, and GitHub Pages fallback handling.
- [x] Align the article Hero Editorial Index panel to the right content boundary from its border through its text content.
- [x] Ensure the active Weekend Mode button on article pages uses solid white text in light mode.
- [x] Verify topic URLs, Hero alignment, theme-button contrast, and automated checks, then publish and synchronize the update.

Visual verification note: the desktop `/typography` Hero places the Editorial Index against the right content boundary with a right-side rule and right-aligned label, index, and byline. After activating Weekend Mode, the active black Weekend button retains a solid white label against the light-paper page.

Validation note: desktop screenshots confirm each new article URL (`/typography`, `/user-experience`, and `/color-theory`) renders its corresponding Hero with the refined right-aligned Editorial Index; the Typography Hero remains composed at a 390px mobile viewport. `pnpm test` passes all 11 tests, `pnpm check` completes without TypeScript errors, `pnpm build` and `pnpm build:pages` complete, and the emitted GitHub Pages 404 fallback recognizes all three topic slugs.

## Article entry-position correction

- [x] Reset the scroll position to the top whenever a topic-based article route opens so the Hero is the first visible section.
- [x] Verify direct links and in-site article navigation begin at the Hero, run checks, then publish and synchronize the fix.

Verification note: after opening `/typography` directly in the development preview, the browser reports zero pixels above the viewport and renders the Typography Hero first, including the title, introductory text, and Editorial Index. The reset is keyed to `article.slug`, so the same behavior applies when the next-study link changes the active article. `pnpm test` passes all 12 tests, while TypeScript checking and the production build complete successfully.

## Instant article Hero entry and divider cleanup

- [x] Make article route entry appear at the Hero instantly, without any visible smooth-scroll movement.
- [x] Remove the horizontal divider beneath the Hero from every individual article page.
- [x] Verify instant Hero entry and divider removal across article routes, run checks, then publish and synchronize the refinement.

Verification note: the route reset temporarily disables the site-wide smooth-scroll rule only while setting the viewport to `(0, 0)`, then restores the prior scroll behavior immediately; there is no deferred animation-frame reset. Desktop previews of `/typography`, `/user-experience`, and `/color-theory` each show their Hero cleanly without the previous bottom divider. `pnpm test` passes all 12 tests, and both TypeScript checking and production build complete successfully.

## Weekend Mode Editorial Index correction

- [x] Render the Hero Editorial Index number in black for every individual article when Weekend/Light Mode is active.
- [x] Verify the index remains outlined light on Developer Mode, black on Weekend Mode, and publish the correction.

Verification note: the Typography Hero retains its light outlined `01` in Developer Mode. After activating Weekend Mode, the same index becomes a solid black `01` against the warm paper Hero; the scoped class applies identically to every article index. `pnpm test` passes all 12 tests, while TypeScript checking and the production build complete successfully.

## Article index visibility and navigation enhancements

- [x] Make the Hero Editorial Index reliably visible as black in Weekend/Light Mode across all individual articles.
- [x] Add a subtle, reduced-motion-safe entrance animation for the Hero Editorial Index number.
- [x] Add the active article’s reading duration to the article navigation.
- [x] Verify both themes, index motion, reading-duration navigation, and automated checks before publishing.

Verification note: the Typography navigation now shows `Thinking archive / 01 · 5 min read`. In Developer Mode, the `01` retains its outlined light treatment. Switching to Weekend Mode displays `01` as a solid black number against the paper Hero, using both a direct inline fallback and scoped CSS. The index enters with a short 580ms transform-and-opacity animation and respects reduced-motion preferences. `pnpm test` passes all 12 tests, and TypeScript checking plus production build complete successfully.

## Light Mode outline and article reading progress

- [x] Restore the Hero Editorial Index number to a black outline, not a solid fill, in Weekend/Light Mode.
- [x] Add a slim reading-progress bar at the top of article navigation that reflects the reader’s position through the article.
- [x] Verify outline contrast, progress behavior, responsiveness, and automated checks before publishing.

Verification note: Weekend Mode now renders the Typography Hero’s `01` as a clearly visible black outline, matching the requested editorial treatment rather than a solid fill. The slim progress indicator is pinned to the top edge of article navigation and scales horizontally with scrolling. The progress calculation has three unit tests for start, midpoint, and boundary conditions. The full suite passes 15 tests; TypeScript checking and production build complete successfully.

## Homepage theme-control clarity refinement

- [x] Increase the breathing room below the Developer/Weekend Mode control in the Hero.
- [x] Add a concise explanatory label beside the theme control to clarify that it changes the color theme.
- [x] Verify desktop and mobile layout, button interaction, and checks before publishing.

Verification note: on desktop, the `Switch color theme ↔` hint sits to the right of the Developer/Weekend control and the expanded lower margin cleanly separates it from the role label. At a 390px viewport, the hint wraps beneath the control rather than compressing the buttons. The suite passes all 16 tests, and TypeScript checking plus production build complete successfully.

## Streamlined homepage theme control

- [x] Reduce the lower spacing below the Developer/Weekend Mode control while preserving clear separation from the role label.
- [x] Remove the visible color-theme hint and add concise hover/focus tooltips to the Developer and Weekend mode buttons.
- [x] Verify desktop and mobile layout, tooltip accessibility, and checks before publishing.

Verification note: the visible `Switch color theme` hint has been removed. The Hero now uses a tighter lower margin beneath the mode control while retaining a clear gap before the role label. Desktop and 390px mobile previews keep both controls legible without layout overflow. Each button exposes a focusable shadcn/Radix tooltip with concise color-theme guidance. The full suite passes all 16 tests, and TypeScript checking plus production build complete successfully.

## Work section portfolio refresh

- [x] Replace the first Work item with Invitation Branding Suite, covering logo, invitation card, brand identity, and print applications, using the first supplied image in monochrome.
- [x] Replace the second Work item with E-Invitation Website, covering website design and WordPress implementation for a responsive invitation experience, using the second supplied image in monochrome.
- [x] Replace the third Work item with Agency Client Website, covering WordPress and Next.js website delivery, using the third supplied image in monochrome.
- [x] Replace the fourth Work item with Cultural Campaign Website, covering WordPress delivery, using the fourth supplied image in monochrome.
- [x] Preserve the final Brief Project card and its direct-contact content.
- [x] Verify desktop and mobile Work layout, hover descriptions, image treatment, and automated checks before publishing.

## Work gallery order and tonal refinement

- [x] Make the Invitation Branding Suite image visibly darker while preserving its monochrome treatment and detail.
- [x] Add Responsive Web to the Agency Client Website categories and description.
- [x] Add Responsive Web to the Cultural Campaign Website categories and description.
- [x] Reorder the Work cards as Agency Client Website, Cultural Campaign Website, E-Invitation Website, then Invitation Branding Suite; preserve the Brief Project card last.
- [x] Validate desktop and mobile balance, project order, image contrast, content, and automated checks before publishing.

Verification note: desktop and 390px mobile previews now begin the draggable Work gallery with Agency Client Website, followed by Cultural Campaign Website. Both cards maintain the existing monochrome card treatment and clean responsive framing. Invitation Branding Suite is retained as the fourth project with a deliberately darker `brightness(0.64)` monochrome filter to align its luminosity with the rest of the gallery. The refreshed regression suite passes 19 tests; TypeScript checking and production build complete successfully.

## Work image clarity and framing refinement

- [x] Replace the muted Invitation Branding Suite treatment with a crisp, higher-contrast dark monochrome presentation without an overlay-like effect.
- [x] Present every Work card featured image at a 4:3 aspect ratio with no image content cropped out.
- [x] Validate the updated tonal balance, full image framing, desktop/mobile layout, and automated checks before publishing.

Verification note: all Work featured-image containers use a 4:3 frame with `object-contain`, keeping source compositions visible rather than cropping them. Desktop and 390px mobile previews retain clear card spacing and full artwork framing. Invitation Branding Suite uses a direct grayscale, `brightness(0.82)`, and `contrast(1.48)` image filter for a darker, sharper monochrome result without adding an overlay. The suite passes all 19 tests; TypeScript checking and production build complete successfully.

## Work card cover-fit correction

- [x] Change Work featured images to `object-cover` inside their 4:3 frames to remove black top-and-bottom letterboxing.
- [x] Verify the first Work cards have no black image bands on desktop and mobile, then rerun automated checks before publishing.

Verification note: the 4:3 Work frames now use `object-cover`, removing the black letterboxing visible around the first project images. Desktop and 390px mobile previews show the featured artwork filling each frame edge-to-edge. The suite passes all 19 tests; TypeScript checking and production build complete successfully.

## Work hover zoom and public deployment synchronization

- [x] Add a subtle, smooth image zoom to Work cards on hover without disrupting the card layout.
- [x] Inspect the Manus and public URLs to identify why the public Work gallery still shows the older ratio and object fit.
- [x] Synchronize the current Work gallery to the public deployment and verify 4:3 `object-cover` behavior at the public URL.
- [x] Run automated checks and validate the interaction on desktop/mobile before publishing.

Inspection note: both the GitHub Pages URL (`https://andre-astika.github.io/portfolio/`) and Manus URL (`https://andrefolio-f6gtj9q8.manus.space/`) are reachable and expose the same public portfolio content in text extraction. The visual ratio difference therefore requires deployment-asset and version inspection rather than a routing fix.

Preview note: desktop and 390px mobile previews confirm the Work cards retain their 4:3, edge-to-edge cover framing. The zoom transition is applied to the image layer only, preserving card size and text layout.

Deployment note: the GitHub Pages URL had been serving commit `b7683d7`, while the current cover-fit and hover changes were present only in the Manus project history. The local history was rebased, then pushed to GitHub as commit `e8df896`. GitHub Actions run `32514638763` completed successfully for the static Pages deployment, bringing the public site in sync with the current Work gallery.

## Work image hover zoom removal

- [x] Remove the hover zoom and image-filter motion from Work card images while retaining 4:3 `object-cover` framing.
- [x] Update regression coverage, validate desktop/mobile framing, and rerun automated checks before publishing.

Verification note: desktop and 390px mobile previews retain the 4:3 edge-to-edge `object-cover` framing with no image zoom or filter change on hover. The updated regression suite passes all 20 tests; TypeScript checking and production build complete successfully.

## About section editorial refinement

- [x] Replace the workplace serif styling with Archivo, normal style, and `0.75rem` top margin.
- [x] Remove the sparkle’s top margin and reposition it to the top-right corner aligned with the portrait image.
- [x] Remove portrait hover behavior and show the Developer portrait in Developer mode and Weekend portrait in Weekend mode only.
- [x] Remove the portrait’s Weekend hover hint and lower the About — Behind the Pixels label to align with the chest composition.
- [x] Change the Jupitr Agency role to Lead WordPress Frontend Developer and correct all “Led” copy to “Lead” in About experience content.
- [x] Verify the revised About composition, theme modes, desktop/mobile responsiveness, and automated checks before publishing.

Verification note: the About portrait now uses the shared Developer/Weekend state directly with hover flip disabled. Its label sits at chest level, the corner sparkle sits at the portrait’s top-right, and no Weekend hover prompt remains. Desktop and 390px mobile preview layouts retain the revised composition. The suite passes all 22 tests; TypeScript checking and production build complete successfully.

## About section GitHub Pages synchronization

- [x] Rebase and push the completed About section refinement to `andre-astika/portfolio`.
- [x] Verify the GitHub Pages workflow succeeds and the public URL serves the updated About section.

Verification note: GitHub Actions run `32517230752` completed successfully for commit `071de493`. The public GitHub Pages URL now exposes the updated About content, including the static Developer-mode portrait and Lead WordPress Frontend Developer experience entry.

## About portrait position refinement

- [x] Set the portrait sparkle to `top: -0.5rem` and `right: -1rem`.
- [x] Lower the About — Behind the Pixels label until it aligns visually with the portrait chest.
- [x] Validate the revised composition on desktop and mobile, rerun automated checks, and synchronize the change to GitHub Pages.

Preview note: desktop and 390px mobile previews show the portrait sparkle at the refined top-right offset and the About label lowered to the chest area. The revised marker placement remains inside the portrait composition without crowding its clipped corner.

Deployment note: GitHub Actions run `32518915519` completed successfully for commit `c52cae25`. The public GitHub Pages URL is now serving the refined About section, including the lowered top-right sparkle and chest-aligned label.

## About portrait bottom caption refinement

- [x] Reposition “(About) — Behind the Pixels” beneath the portrait as a full-width horizontal caption bar matching the supplied reference, validate responsively, and synchronize it to GitHub Pages.

Verification note: the About caption now uses a bottom-anchored, full-width mono bar inside the portrait, matching the prior hover-caption treatment. Desktop and 390px mobile previews confirm that it follows the image width without overlapping adjacent content.

## About caption and Philosophy script refinement

- [x] Anchor the About caption flush to the bottom edge of the portrait, removing its visible border while preserving full image width.
- [x] Restyle the Philosophy statement with Pinyon Script and preserve white text in Developer Mode plus black text in Weekend Mode.
- [x] Validate both refinements on desktop and mobile, rerun automated checks, and synchronize them to GitHub Pages.

Verification note: the caption is now rendered inside the clipped portrait layer at its true bottom edge with no caption border. The Philosophy statement uses Pinyon Script with source `text-white`, which the scoped Weekend rule converts to black on the light-paper theme. Desktop and 390px mobile previews confirm the caption remains flush and the statement remains legible. The suite passes all 24 tests; TypeScript, production build, and GitHub Pages static build complete successfully.

## Scoped Philosophy script typography refinement

- [x] Apply Pinyon Script only to the phrase “Design is what remains” and retain the rest of the statement in the standard display typeface.
- [x] Tune the script phrase’s mobile font size and line-height for a balanced, readable Philosophy heading.
- [x] Verify Developer and Weekend themes on desktop/mobile, rerun checks, and synchronize the update to GitHub Pages.

Clarification: “when nothing else can be taken away.” must use the original display font and its existing theme-aware foreground color; it must not inherit Pinyon Script styling.

Verification note: Pinyon Script is now isolated to “Design is what remains” at `4rem` with `0.74` leading on mobile, stepping up only at wider breakpoints. The remaining phrase is an independent Archivo display span with `text-white`, which the existing Weekend override converts to the light-mode ink color. Mobile preview, 25 tests, TypeScript, and production build complete successfully.

## Navigation and footer branding simplification

- [x] Remove all AndreA wordmarks from the header and footer, retaining only the sparkle icon at the left of each area.
- [x] Remove the footer tagline “Pixel-precise. Deadline-obsessed. Zero fluff.” and retain only the copyright line on the right.
- [x] Validate desktop/mobile layout, rerun checks, and synchronize the minimal branding update to GitHub Pages.

Verification note: navigation now uses an accessible sparkle-only top anchor, while the footer displays a sparkle at left and the fixed 2026 copyright string at right. The footer no longer renders a wordmark, closing tagline, or decorative AndreA letters. Desktop and 390px mobile previews maintain spacing and alignment. The suite passes all 27 tests; TypeScript and production build complete successfully.

## Continuous Philosophy statement refinement

- [x] Join “Design is what remains” and “when nothing else can be taken away.” into one continuous inline statement while retaining Pinyon Script only for the opening phrase.
- [x] Validate desktop/mobile wrapping, rerun checks, and synchronize the refined statement to GitHub Pages.

Verification note: the two phrases are now adjacent inline spans separated only by a single semantic space. The script phrase remains unbroken, while the standard display remainder wraps naturally only where the viewport requires it. Desktop and 390px mobile previews confirm a continuous heading flow. The suite passes all 27 tests; TypeScript and production build complete successfully.

## Philosophy original typography restoration

- [x] Restore “Design is what remains” and “when nothing else can be taken away.” as the original two-line display statement without Pinyon Script.
- [x] Validate desktop/mobile typography, rerun checks, and synchronize the restoration to GitHub Pages.

Verification note: both phrases are restored as their original separate Archivo display lines with the original editorial scale and spacing. Pinyon Script is fully removed from the statement. Desktop and 390px mobile previews confirm the restored two-line composition. The suite passes all 27 tests; TypeScript and production build complete successfully.

## Contact privacy and location refinement

- [x] Replace the Contact phone number with non-private contact information.
- [x] Set the Contact location to “Denpasar, Bali”.
- [x] Set the footer copyright to “© 2026 Andre Astika — Bali, Indonesia”.
- [x] Validate desktop/mobile content, rerun checks, and synchronize the refinement to GitHub Pages.

Verification note: the Phone card and call link have been replaced by an Availability card plus a privacy-safe email action. Contact now shows Denpasar, Bali, and the footer shows © 2026 Andre Astika — Bali, Indonesia. Desktop and 390px mobile previews verify the grid remains legible. The suite passes all 29 tests; TypeScript and production build complete successfully.

## Contact inquiry form and Bali location refinement

- [x] Add a simple accessible inquiry form to the Contact section with name, email, project detail, and message fields.
- [x] Send the inquiry through a prefilled `mailto:` message without requiring external credentials or storing visitor data.
- [x] Update the Contact location value to “Bali, Indonesia”.
- [x] Validate desktop/mobile layout and form behavior, rerun checks, and synchronize the update to GitHub Pages.

Verification note: the inquiry form exposes labeled Name, Email, Project type, and Project details controls with required validation. Submission generates a prefilled mailto draft to the existing portfolio email address, keeping visitor data local to the email client. Desktop and 390px mobile previews confirm readable layout and all controls. The suite passes all 30 tests; TypeScript and production build complete successfully.

## Contact inquiry control refinement

- [x] Remove the redundant “Start a project” and “Or email me” buttons above the inquiry form.
- [x] Match the Project details textarea typography to the other inquiry inputs.
- [x] Change the Draft Email Inquiry button to an outline treatment on hover in both Developer and Weekend modes.
- [x] Replace the Availability card with a direct Email card that opens the portfolio email address.
- [x] Validate the refined contact controls across themes and breakpoints, rerun checks, and synchronize to GitHub Pages.

Verification note: the redundant email CTAs are removed and the form begins directly beneath the Contact heading. Project details now uses the same IBM Plex Mono label font family as the inquiry inputs. The Submit button is solid at rest and uses a bordered transparent outline on hover; its Weekend override uses the light-theme ink for both border and text. The Email grid card retains a `mailto:en.andre.st@gmail.com` direct action; Availability is removed. Desktop and 390px mobile previews plus 30 tests, TypeScript, and production build verify the refinement.

## Resend inquiry delivery, feedback, and anti-spam

- [x] Collect Resend credentials and verified sender details for server-side inquiry delivery.
- [x] Add required name/email validation, loading feedback, and success/error messaging to the Contact inquiry form.
- [x] Deliver inquiries through Resend to the owner inbox, with reply-to set to the visitor email.
- [x] Add layered anti-spam protections including a hidden honeypot, minimum completion time, and server-side rate limiting.
- [x] Test the client/server flow and security guards, then synchronize the live form to GitHub Pages.

Setup assistance: guide the user through Resend account access, sender or domain verification, and secure API-key creation before activating server-side delivery.

Resend setup progress (Aug 22, 2026): the account email was successfully changed and verified as `en.andre.st@gmail.com`; a one-time API key named `Andre Portfolio Contact Form` with Sending access was created. The key still needs to be entered through the secure project configuration card. Until a custom domain is verified, the permitted sender is `onboarding@resend.dev` and the recipient must remain the Resend account email. Resend’s send-email endpoint supports `from`, `to`, `reply_to`, HTML/text body, and an idempotency key, so the future server mutation can set visitor email only as reply-to.

Visual check (Aug 22, 2026): the Manus preview Contact section renders the `Securely sends to Andre` label and `Send inquiry` action in the established Noir Kinetic form treatment. The GitHub Pages build remains intentionally configured to use the previous mailto fallback because it has no server runtime.

Browser verification (Manus preview): the Contact form exposes the required Name, Email, Project type, and Project details fields alongside the `Securely sends to Andre` label. A user-approved test inquiry is ready to be submitted to the configured owner inbox.

Delivery verification: Resend recorded `Portfolio inquiry — Portfolio Delivery Test` to `en.andre.st@gmail.com` with status `Delivered`. The final test used the Resend temporary onboarding sender and a visitor reply-to address; it was accepted after normalizing an accidental trailing period in the configured sender address.

Publication verification: checkpoint `7aa66862` is live on Manus. GitHub commit `7aa6686` was pushed to `andre-astika/portfolio`; GitHub Pages workflow `32585989539` completed successfully. The public static site at `https://andre-astika.github.io/portfolio/` renders the Contact fallback label `Opens your email app` and `Draft email inquiry`, while the Manus-hosted site uses real Resend delivery.

## Unified Philosophy display phrase refinement

- [x] Combine the complete Philosophy statement into one continuous Archivo display phrase without Pinyon Script or a forced line break.
- [x] Validate responsive typography, rerun checks, and synchronize the unified phrase to GitHub Pages.

Verification note: the full Philosophy statement is rendered as a single display-text node, without a script font or structural line-break spans. Natural wrapping is left to the viewport. Desktop and mobile previews plus the 27-test suite, TypeScript, and production build completed successfully before the Contact refinement.

## Contact fallback GitHub Pages and email capitalization repair

- [x] Diagnose why the GitHub Pages form has no visible validation or action feedback.
- [x] Show validation and a clear fallback status on GitHub Pages before attempting mailto.
- [x] Capitalize the first letter of name, project type, and project details in the delivery email while preserving email casing.
- [x] Verify both hosting variants, run checks, and synchronize the repair to GitHub Pages.

Public-check progress: GitHub Pages workflow `32586715680` completed successfully and the latest static Contact interface is live. The next validation step is to trigger its required-field state and confirm the recovery mailto link is visible after a valid static submission.

Interactive public-check progress: the GitHub Pages Contact section displays the Name and Email inputs plus the fallback label in the current public deployment; the required-field state is being verified without submitting an email.

GitHub Pages validation result: submitting the empty public form now shows all three inline required-field messages and the visible summary `Please complete the highlighted required fields before continuing.` No email or mailto action was triggered during this invalid-state verification.

## GitHub Pages real inquiry delivery via Manus

- [x] Audit the Manus server endpoint and cross-origin protections for GitHub Pages delivery.
- [x] Route valid GitHub Pages inquiries to the secure Manus Resend endpoint without exposing credentials.
- [x] Verify a delivered inquiry originating from GitHub Pages, including capitalization and lowercase email formatting.
- [x] Publish the cross-host form delivery update to Manus and GitHub Pages.

Cross-host delivery verification: an inquiry request carrying `Origin: https://andre-astika.github.io` received the expected CORS response and returned HTTP 200 from the Manus inquiry procedure. Resend recorded `Portfolio inquiry — Github pages test` to `en.andre.st@gmail.com` with status `Delivered`; the test input used lowercase source text and uppercase email, validating the new content formatting path.

Public deployment check: GitHub Pages now displays `Securely sends via Andre's form` and `Send inquiry`, confirming the static client points to the live Manus delivery path rather than the prior mailto-only flow.

Browser delivery check: the published GitHub Pages Contact form exposes the real-send label, its required fields, and the `Send inquiry` action. A controlled browser submission is ready to confirm the visible success state.

Production delivery result: the published Manus endpoint returned HTTP 200 to a request from the GitHub Pages origin with the intended CORS headers. Resend then recorded `Portfolio inquiry — Github pages production test` as `Opened` by `en.andre.st@gmail.com`, confirming real delivery on the deployed cross-host path. The pre-publication validation and capitalization repair also passed 45 automated tests, TypeScript, and both production builds.

## Contact Web link update

- [x] Replace the Contact Web card target and label with the GitHub Pages portfolio URL.
- [x] Verify the change and publish it to GitHub Pages.

## Header and footer alignment

- [x] Match the header navigation sparkle size to the footer sparkle.
- [x] Use the shared header container and height structure for the footer.
- [x] Ensure header and footer containers use full width below 767px, then verify and publish.

## Header controls and footer spacing refinement

- [x] Make the active Developer Mode background fill the full button width.
- [x] Hide header menu links at tablet widths so only the sparkle and Let’s talk button remain.
- [x] Set footer section padding to 3rem 0 on every breakpoint and remove the shared footer container height.
- [x] Validate desktop, tablet, and mobile layouts, then publish the refinement.

## Tablet and mobile section layout refinement

- [x] Remove container max-width constraints at tablet and mobile breakpoints and shift the mobile Hero portrait to the right.
- [x] Apply specified mobile spacing and carousel geometry to Work and Case Studies.
- [x] Apply specified mobile spacing, principle layout, and CTA geometry to Philosophy.
- [x] Apply specified mobile spacing and tablet grid treatment to Experience and Contact.
- [x] Validate desktop, 1023px tablet, and mobile layouts, then publish the responsive refinement.

## Header and footer responsive completion

- [x] Remove max-width from all shared containers at tablet and mobile widths.
- [x] Set the Hero image crop to 80% on every device and apply Work mobile container padding exactly as specified.
- [x] Stack the mobile footer with 1.5rem vertical padding and use 18px sparkles in header/footer.
- [x] Validate and publish the completed responsive rules.

## Hero and Contact mobile spacing refinement

- [x] Apply requested mobile padding to header and Hero container, including the 300px role-label width.
- [x] Show the shortened Dev Mode label and revised role copy only on mobile.
- [x] Reduce Contact card padding on mobile and set the inquiry button typography and padding at all breakpoints.
- [x] Validate and publish the Hero and Contact refinement.

## GitHub Pages runtime crash recovery

- [x] Reproduce the published static-site crash and identify the null `getExtension` call.
- [x] Fix or guard the static build path that crashes at runtime.
- [x] Run regression checks and verify a healthy published GitHub Pages page.

Recovery verification: GitHub Pages workflow `32644012373` completed successfully. The published page loaded normally at `?v=bfe1708` in the connected browser, showing the complete portfolio content without the previous `getExtension` runtime crash.

## SplashCursor experience recovery

- [x] Keep SplashCursor active whenever WebGL is available while retaining a no-crash fallback when it is unavailable.
- [x] Verify the cursor effect can initialize and the static site still handles an unavailable WebGL context safely.
- [x] Publish the SplashCursor recovery.

## SplashCursor visual fidelity correction

- [x] Remove the CSS bubble fallback that changed the approved fluid SplashCursor appearance.
- [x] Retain the original fluid WebGL cursor in white for Developer and black ink for Weekend, while keeping a silent no-crash WebGL guard.
- [x] Validate the corrected cursor behavior, publish it, and synchronize GitHub Pages.
