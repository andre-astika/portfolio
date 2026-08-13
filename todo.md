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
